"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

// next-themes의 useTheme 훅을 사용하여 다크모드를 토글하는 버튼 컴포넌트
// SSR 환경에서 mounted 상태를 체크하여 hydration mismatch를 방지
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="테마 전환"
    >
      {/* 라이트 모드일 때 Sun, 다크 모드일 때 Moon 아이콘 표시 */}
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
