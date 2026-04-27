import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Code2, Layers, Package, Wrench } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// SEO 메타데이터 (페이지별로 정의하면 layout.tsx의 template과 합쳐짐)
export const metadata: Metadata = {
  title: "소개",
  description: "Next.js 스타터킷에 포함된 기술 스택과 구성에 대해 알아보세요.",
}

// 기술 스택 데이터
const techStack = [
  {
    icon: Code2,
    name: "Next.js 15",
    description: "App Router 기반의 풀스택 React 프레임워크",
    badge: "프레임워크",
  },
  {
    icon: Layers,
    name: "TypeScript",
    description: "타입 안전성을 제공하는 JavaScript 슈퍼셋",
    badge: "언어",
  },
  {
    icon: Package,
    name: "Tailwind CSS + shadcn/ui",
    description: "유틸리티 CSS 프레임워크와 접근성 기반 컴포넌트 라이브러리",
    badge: "스타일링",
  },
  {
    icon: Wrench,
    name: "next-themes + usehooks-ts",
    description: "다크모드 관리와 실무 유틸리티 훅 라이브러리",
    badge: "유틸리티",
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">

      {/* 뒤로가기 링크 */}
      {/* @base-ui/react Button은 asChild 미지원 - buttonVariants를 Link에 직접 적용 */}
      <div className="mb-8">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          홈으로
        </Link>
      </div>

      {/* 페이지 헤더 */}
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">
          스타터킷 소개
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Next.js Starter Kit
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          프로덕션 환경에 바로 적용 가능한 Next.js 스타터킷입니다.
          검증된 기술 스택과 모범 사례를 기반으로 구성되어,
          새로운 프로젝트를 빠르게 시작할 수 있습니다.
        </p>
      </div>

      <Separator className="mb-12" />

      {/* 기술 스택 섹션 */}
      <section className="mb-12">
        <h2 className="mb-2 text-2xl font-bold text-foreground">기술 스택</h2>
        <p className="mb-8 text-muted-foreground">
          신중하게 선별된 기술 스택으로 개발 생산성을 높이세요.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {techStack.map((tech) => (
            <Card key={tech.name} size="sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <tech.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <Badge variant="outline">{tech.badge}</Badge>
                </div>
                <CardTitle>{tech.name}</CardTitle>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mb-12" />

      {/* 포함된 컴포넌트 섹션 */}
      <section className="mb-12">
        <h2 className="mb-2 text-2xl font-bold text-foreground">포함된 shadcn/ui 컴포넌트</h2>
        <p className="mb-6 text-muted-foreground">
          어떤 웹 프로젝트에서든 필요한 핵심 컴포넌트를 미리 설치했습니다.
        </p>
        <Card>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              {[
                "Button", "Badge", "Card", "Separator", "Sheet",
                "Dialog", "Tooltip", "Sonner", "Input", "Label",
                "Textarea", "Avatar", "Skeleton", "Tabs", "Dropdown Menu",
              ].map((component) => (
                <Badge key={component} variant="secondary">
                  {component}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 시작하기 CTA */}
      <div className="rounded-2xl border bg-muted/30 px-8 py-10 text-center">
        <h3 className="text-xl font-bold text-foreground">바로 시작하세요</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          이 스타터킷을 클론하고 여러분만의 프로젝트를 만들어보세요.
        </p>
        <div className="mt-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants())}
          >
            GitHub에서 보기
          </a>
        </div>
      </div>

    </div>
  )
}
