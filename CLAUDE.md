# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

테스트 프레임워크는 설치되어 있지 않습니다.

## 기술 스택 핵심 사항

- **Next.js 16 + React 19** (App Router, React Compiler 활성화 — `reactCompiler: true`)
- **Tailwind CSS v4** — `tailwind.config` 파일 없음. 모든 테마/색상 설정은 `src/app/globals.css`의 CSS 변수로 관리
- **shadcn/ui v4** — `@base-ui/react` 기반 (Radix UI 대체). 스타일은 `base-nova`. 컴포넌트 추가 시 `npx shadcn add <component>` 사용
- **다크모드** — `next-themes`의 `.dark` 클래스 방식. `globals.css`에서 `:root` (라이트)와 `.dark` (다크) 두 세트의 CSS 변수로 토큰 정의

## 아키텍처

### 컴포넌트 분리 원칙

서버/클라이언트 컴포넌트가 명확히 분리됩니다.

- **서버 컴포넌트** (기본): `Header`, `Footer`, 모든 페이지
- **클라이언트 컴포넌트** (`"use client"` 필수): `ThemeToggle`, `MobileNav`, `NavLink`, `ThemeProvider` — 브라우저 API(훅, 이벤트)를 사용하는 경우

### 레이아웃 구조

`src/app/layout.tsx`가 전체 앱을 감쌉니다:

```
ThemeProvider (next-themes, attribute="class")
  └─ TooltipProvider (shadcn Tooltip 전역 필수)
       ├─ Header (sticky)
       ├─ main (flex-1)
       └─ Footer
       └─ Toaster (sonner)
```

### 새 페이지 추가

`src/app/<경로>/page.tsx` 생성. 페이지별 메타데이터는 파일 내 `export const metadata` 로 선언합니다.

### shadcn/ui 컴포넌트 사용 방식

`@base-ui/react` 기반이므로 `asChild` prop이 지원되지 않습니다. 버튼 스타일을 `Link`에 적용할 때는 `buttonVariants()`를 직접 className에 전달합니다:

```tsx
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

<Link href="/about" className={cn(buttonVariants({ size: "lg" }))}>
```

### 경로 별칭

`@/` → `src/` (tsconfig paths 설정)
