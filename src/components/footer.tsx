import Link from "next/link"
import { Code2, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// 네비게이션 링크 그룹
const navigationLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
]

// 외부 리소스 링크 그룹
const resourceLinks = [
  { href: "https://nextjs.org/docs", label: "Next.js 문서" },
  { href: "https://ui.shadcn.com", label: "shadcn/ui" },
  { href: "https://tailwindcss.com", label: "Tailwind CSS" },
]

// 사이트 푸터 컴포넌트 (서버 컴포넌트)
// - 상단: 브랜드 + 네비게이션 + 리소스 링크
// - 하단: 저작권 정보
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">

        {/* 상단 섹션 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">

          {/* 브랜드 설명 */}
          <div className="sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
              <Code2 className="h-5 w-5" />
              <span>Next Starters</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Next.js 기반의 모던 웹 스타터킷.
              <br />
              빠르게 개발을 시작하세요.
            </p>
          </div>

          {/* 네비게이션 링크 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">네비게이션</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 리소스 링크 */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">리소스</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <Separator className="my-8" />

        {/* 하단 저작권 섹션 */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Next Starters. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-sm text-muted-foreground">
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:underline"
              >
                Next.js
              </a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
