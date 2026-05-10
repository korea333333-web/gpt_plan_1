import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "달새김",
  description: "음력과 양력 기념일을 잊지 않도록 미리 알려주는 가족 기념일 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
