import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

const kakaoAuthorizeUrl = "https://kauth.kakao.com/oauth/authorize";

export function GET(request: NextRequest) {
  const clientId = process.env.KAKAO_REST_API_KEY;
  const origin = getAppOrigin(request);

  if (!clientId) {
    const url = new URL("/login", origin);
    url.searchParams.set("error", "KAKAO_REST_API_KEY가 Vercel에 설정되지 않았어요.");
    return NextResponse.redirect(url);
  }

  const redirectUri = `${origin}/api/auth/kakao/callback`;
  const state = randomBytes(24).toString("base64url");
  const authorizationUrl = new URL(kakaoAuthorizeUrl);

  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", redirectUri);
  authorizationUrl.searchParams.set("response_type", "code");
  authorizationUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizationUrl);
  response.cookies.set("dalsaegim_kakao_oauth_state", state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

function getAppOrigin(request: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
}
