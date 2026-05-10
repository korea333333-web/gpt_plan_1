# Kakao OAuth 설정

달새김의 카카오 로그인은 Supabase Kakao Provider를 쓰지 않고 앱 서버에서 직접 OAuth를 처리한다.
Supabase Provider가 `account_email` 등을 자동 요청해 `KOE205`가 발생할 수 있기 때문이다.

## Kakao Developers

카카오 앱의 `앱 > 플랫폼 키` 화면에서 아래 값을 확인한다.

- `REST API 키`: Vercel `KAKAO_REST_API_KEY`
- `클라이언트 시크릿 > 카카오 로그인 코드`: Vercel `KAKAO_CLIENT_SECRET`

카카오 로그인 리다이렉트 URI에 아래 주소를 등록한다.

```txt
https://gpt-plan-1.vercel.app/api/auth/kakao/callback
https://gpt-plan-1-iu24pnqt5-kikuke-s-projects.vercel.app/api/auth/kakao/callback
```

기존 Supabase callback 주소는 직접 카카오 로그인에는 사용하지 않는다.

## Vercel Environment Variables

```txt
KAKAO_REST_API_KEY=카카오 REST API 키
KAKAO_CLIENT_SECRET=카카오 로그인 클라이언트 시크릿
KAKAO_SESSION_SECRET=임의의 긴 랜덤 문자열
```

`KAKAO_CLIENT_SECRET`은 육안으로 `l`과 `I`를 구분하기 어려우므로 복사/붙여넣기로만 입력한다.
