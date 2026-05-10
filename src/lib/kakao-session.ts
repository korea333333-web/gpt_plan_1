import { createHmac, timingSafeEqual } from "crypto";

export type KakaoSession = {
  provider: "kakao";
  id: string;
  nickname: string;
  profileImage?: string;
  expiresAt: number;
};

const textEncoder = new TextEncoder();

export function createKakaoSessionToken(session: KakaoSession): string {
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function parseKakaoSessionToken(token: string | undefined): KakaoSession | null {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");

  if (!payload || !signature || !safeEqual(signature, sign(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as KakaoSession;

    if (session.provider !== "kakao" || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = textEncoder.encode(a);
  const right = textEncoder.encode(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

function getSessionSecret(): string {
  const secret =
    process.env.KAKAO_SESSION_SECRET ??
    process.env.KAKAO_CLIENT_SECRET ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!secret) {
    throw new Error("KAKAO_SESSION_SECRET or KAKAO_CLIENT_SECRET must be configured.");
  }

  return secret;
}
