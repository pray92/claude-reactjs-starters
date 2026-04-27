import Link from "next/link"
import { Code2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"

// 네비게이션 링크 목록
const navLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
]

// 반응형 헤더 컴포넌트 (서버 컴포넌트)
// - 데스크톱: 로고 + 네비게이션 + 테마 토글
// - 모바일: 로고 + 햄버거 메뉴(Sheet)
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-foreground hover:text-foreground/80 transition-colors"
        >
          <Code2 className="h-5 w-5" />
          <span>Next Starters</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* 우측 액션 영역 */}
        <div className="flex items-center gap-2">
          {/* 데스크톱: 테마 토글만 표시 */}
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
          {/* 모바일: 햄버거 메뉴 (테마 토글 포함) */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>

      </div>
    </header>
  )
}
