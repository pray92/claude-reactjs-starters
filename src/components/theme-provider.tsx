"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

// next-themes의 ThemeProvider를 래핑하는 컴포넌트
// attribute="class": .dark 클래스를 html 태그에 적용 (globals.css와 연동)
// defaultTheme="system": 시스템 테마를 기본값으로 사용
// enableSystem: 시스템 테마 자동 감지 활성화
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
