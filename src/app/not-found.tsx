import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <div className="mt-10">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
