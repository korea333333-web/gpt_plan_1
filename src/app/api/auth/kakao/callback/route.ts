import { NextRequest, NextResponse } from "next/server";
import { createKakaoSessionToken, type KakaoSession } from "@/lib/kakao-session";

type KakaoTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type KakaoUserResponse = {
  id: number;
  properties?: {
    nickname?: string;
    profile_image?: string;
  };
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
};

const kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
const kakaoUserUrl = "https://kapi.kakao.com/v2/user/me";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("dalsaegim_kakao_oauth_state")?.value;
  const origin = request.nextUrl.origin;

  if (!code || !state || !expectedState || state !== expectedState) {
    return redirectWithError(origin, "카카오 로그인 상태값이 맞지 않아요. 다시 시도해 주세요.");
  }

  const clientId = process.env.KAKAO_REST_API_KEY;

  if (!clientId) {
    return redirectWithError(origin, "KAKAO_REST_API_KEY가 설정되지 않았어요.");
  }

  const redirectUri = `${origin}/api/auth/kakao/callback`;
  const token = await requestKakaoToken(code, clientId, redirectUri);

  if (!token.access_token) {
    return redirectWithError(
      origin,
      token.error_description ?? token.error ?? "카카오 토큰을 받을 수 없어요.",
    );
  }

  const user = await requestKakaoUser(token.access_token);
  const nickname =
    user.kakao_account?.profile?.nickname ??
    user.properties?.nickname ??
    `kakao-${user.id}`;
  const profileImage =
    user.kakao_account?.profile?.profile_image_url ?? user.properties?.profile_image;
  const session: KakaoSession = {
    provider: "kakao",
    id: `${user.id}`,
    nickname,
    profileImage,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 14,
  };
  const response = NextResponse.redirect(origin);

  response.cookies.delete("dalsaegim_kakao_oauth_state");
  response.cookies.set("dalsaegim_kakao_session", createKakaoSessionToken(session), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

async function requestKakaoToken(
  code: string,
  clientId: string,
  redirectUri: string,
): Promise<KakaoTokenResponse> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
  });

  if (process.env.KAKAO_CLIENT_SECRET) {
    body.set("client_secret", process.env.KAKAO_CLIENT_SECRET);
  }

  const response = await fetch(kakaoTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
  });

  return response.json() as Promise<KakaoTokenResponse>;
}

async function requestKakaoUser(accessToken: string): Promise<KakaoUserResponse> {
  const response = await fetch(kakaoUserUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error("카카오 사용자 정보를 가져오지 못했어요.");
  }

  return response.json() as Promise<KakaoUserResponse>;
}

function redirectWithError(origin: string, message: string) {
  const url = new URL("/login", origin);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}
