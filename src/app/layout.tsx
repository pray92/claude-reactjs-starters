import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

// Geist 폰트 설정 (sans-serif)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

// Geist Mono 폰트 설정 (코드 블록용)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Next.js Starter Kit",
    template: "%s | Next.js Starter Kit",
  },
  description:
    "Next.js v15 App Router + TypeScript + Tailwind CSS + shadcn/ui로 구성된 모던 웹 스타터킷",
  keywords: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // suppressHydrationWarning: next-themes가 다크모드 적용 시 발생하는 hydration 경고 억제
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* attribute="class": .dark 클래스로 다크모드 제어 (globals.css와 연동)
            defaultTheme="system": 시스템 테마를 기본값으로 사용
            enableSystem: 시스템 테마 자동 감지 활성화 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* TooltipProvider: shadcn Tooltip 컴포넌트가 작동하려면 전체 앱을 감싸야 함 */}
          <TooltipProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            {/* Sonner 토스트 알림 컴포넌트 */}
            <Toaster richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
