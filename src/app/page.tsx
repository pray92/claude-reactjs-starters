import Link from "next/link"
import { ArrowRight, Zap, Shield, Palette, Moon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// 기능 카드 데이터
const features = [
  {
    icon: Zap,
    title: "고성능",
    description:
      "Next.js App Router와 React Server Components를 활용하여 최적의 성능을 제공합니다. 빠른 로딩과 원활한 사용자 경험을 보장합니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description:
      "TypeScript로 작성되어 개발 단계에서 오류를 사전에 방지합니다. 안전하고 예측 가능한 코드를 작성할 수 있습니다.",
  },
  {
    icon: Palette,
    title: "모던 스타일링",
    description:
      "Tailwind CSS와 shadcn/ui로 일관성 있는 디자인 시스템을 구축합니다. 빠르게 아름다운 UI를 만들 수 있습니다.",
  },
  {
    icon: Moon,
    title: "다크모드",
    description:
      "next-themes를 활용한 다크모드를 기본 지원합니다. 시스템 설정을 자동으로 감지하여 사용자 선호에 맞게 표시됩니다.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* Hero 섹션 */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            더 빠르게 웹을{" "}
            <span className="text-muted-foreground">시작하세요</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Next.js, TypeScript, Tailwind CSS, shadcn/ui로 구성된 프로덕션 레디
            스타터킷. 바로 개발을 시작하세요.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* @base-ui/react Button은 asChild 미지원 - buttonVariants를 Link에 직접 적용 */}
            <Link
              href="/about"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              시작하기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              문서 보기
            </a>
          </div>
        </div>
      </section>

      {/* Features 섹션 */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              스타터킷 특징
            </h2>
            <p className="mt-4 text-muted-foreground">
              검증된 기술 스택으로 생산성을 극대화하세요.
            </p>
          </div>

          {/* 2x2 그리드 (모바일: 1열, 데스크톱: 2열) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <feature.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-2xl border bg-muted/30 px-8 py-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              시작할 준비가 되셨나요?
            </h2>
            <p className="mt-4 text-muted-foreground">
              이 스타터킷을 기반으로 여러분의 아이디어를 현실로 만들어보세요.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/about"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                스타터킷 알아보기
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
