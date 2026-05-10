import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.delete("dalsaegim_kakao_session");
  response.cookies.delete("dalsaegim_kakao_oauth_state");

  return response;
}
