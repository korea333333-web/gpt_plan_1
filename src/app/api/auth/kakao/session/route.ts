import { NextRequest, NextResponse } from "next/server";
import { parseKakaoSessionToken } from "@/lib/kakao-session";

export function GET(request: NextRequest) {
  const session = parseKakaoSessionToken(
    request.cookies.get("dalsaegim_kakao_session")?.value,
  );

  return NextResponse.json({ session });
}
