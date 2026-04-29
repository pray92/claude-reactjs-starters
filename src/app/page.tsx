import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Code2, Layers, Package, Wrench } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "홈",
  description: "Next.js 16 App Router 기반 모던 웹 스타터킷",
}

const features = [
  {
    icon: Code2,
    title: "Next.js 16 + React 19",
    description: "App Router와 React Compiler가 활성화된 최신 풀스택 프레임워크",
  },
  {
    icon: Layers,
    title: "TypeScript",
    description: "strict 모드로 타입 안전성을 보장하는 JavaScript 슈퍼셋",
  },
  {
    icon: Package,
    title: "Tailwind CSS v4 + shadcn/ui",
    description: "CSS 변수 기반 테마 시스템과 접근성 중심 컴포넌트 라이브러리",
  },
  {
    icon: Wrench,
    title: "다크모드 지원",
    description: "next-themes로 시스템 테마를 자동 감지하는 다크모드 내장",
  },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">

      {/* 히어로 섹션 */}
      <div className="mb-16 text-center">
        <Badge variant="secondary" className="mb-6">
          프로덕션 레디 스타터킷
        </Badge>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Next.js Starter Kit
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          검증된 기술 스택과 모범 사례를 기반으로 새로운 프로젝트를
          빠르게 시작하세요. 설정에 시간 낭비 없이 바로 개발에 집중할 수 있습니다.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/about"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            스타터킷 살펴보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            기술 스택 보기
          </Link>
        </div>
      </div>

      {/* 주요 기능 섹션 */}
      <div>
        <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
          포함된 기술 스택
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} size="sm">
              <CardHeader>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <feature.icon className="h-4 w-4 text-foreground" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

    </div>
  )
}
