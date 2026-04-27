"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

// 네비게이션 링크 목록
const navLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
]

// 모바일 환경에서 표시되는 슬라이드 메뉴 컴포넌트
// shadcn Sheet 컴포넌트 활용 - 접근성 및 애니메이션 내장
export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* @base-ui/react는 asChild 대신 render prop 사용 */}
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="메뉴 열기" />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-left text-lg font-bold">
            Next Starters
          </SheetTitle>
        </SheetHeader>

        {/* 네비게이션 링크 목록 */}
        <nav className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 하단 테마 토글 */}
        <div className="mt-auto flex items-center justify-between px-4 py-4 border-t">
          <span className="text-sm text-muted-foreground">테마 전환</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  )
}
