"use client"

import Link from "next/link"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function LoginForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">로그인</CardTitle>
        <CardDescription>
          이메일과 비밀번호를 입력하여 로그인하세요
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.info("로그인을 시도하고 있습니다...")
          }}
        >
          <div className="flex flex-col gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">비밀번호</Label>
                <a
                  href="#"
                  className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                >
                  비밀번호 찾기
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" size="lg">
              로그인하기
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center gap-1 text-sm text-muted-foreground">
        아직 계정이 없으신가요?
        <Link href="/signup" className={cn(buttonVariants({ variant: "link" }), "px-0")}>
          회원가입
        </Link>
      </CardFooter>
    </Card>
  )
}
