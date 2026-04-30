# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

테스트 프레임워크는 설치되어 있지 않습니다.

## 기술 스택 핵심 사항

- **Next.js 16 + React 19** (App Router, React Compiler 활성화 — `reactCompiler: true`)
- **Tailwind CSS v4** — `tailwind.config` 파일 없음. 모든 테마/색상 설정은 `src/app/globals.css`의 `@theme inline` 블록과 CSS 변수로 관리
- **shadcn/ui v4** — `@base-ui/react` 기반 (Radix UI 대체). 스타일은 `base-nova`. 컴포넌트 추가 시 `npx shadcn add <component>` 사용
- **다크모드** — `next-themes`의 `.dark` 클래스 방식. `globals.css`에서 `:root` (라이트)와 `.dark` (다크) 두 세트의 CSS 변수로 토큰 정의 (oklch 색공간, neutral 팔레트)
- **아이콘** — `lucide-react` (components.json에서 iconLibrary로 설정)
- **토스트** — `sonner` (`layout.tsx`에 `<Toaster richColors />` 전역 설치됨, `toast()` 바로 사용 가능)
- **유틸리티 훅** — `usehooks-ts` 설치됨
- **폰트** — Geist Sans (`--font-geist-sans`) + Geist Mono (`--font-geist-mono`)

## 아키텍처

### 컴포넌트 분리 원칙

서버/클라이언트 컴포넌트가 명확히 분리됩니다.

**서버 컴포넌트** (기본, `"use client"` 없음):
- 모든 페이지 (`page.tsx`, `not-found.tsx`)
- `layout.tsx`, `Header`, `Footer`

**클라이언트 컴포넌트** (`"use client"` 필수):
- `ThemeProvider`, `ThemeToggle` — next-themes 훅 사용
- `NavLink` — `usePathname()` 사용
- `MobileNav` — `useState()` + `usePathname()` 사용

### 레이아웃 구조

`src/app/layout.tsx`가 전체 앱을 감쌉니다:

```
ThemeProvider (next-themes, attribute="class", defaultTheme="system")
  └─ TooltipProvider (shadcn Tooltip 전역 필수)
       ├─ Header (sticky top-0 z-50)
       ├─ main (flex-1)
       └─ Footer
       └─ Toaster (sonner, richColors)
```

### 새 페이지 추가

`src/app/<경로>/page.tsx` 생성. 페이지별 메타데이터는 파일 내 `export const metadata` 로 선언합니다. 루트 레이아웃의 title template(`"%s | Next.js Starter Kit"`)이 자동 적용됩니다.

## shadcn/ui 사용 가이드

### 설치된 컴포넌트 (추가 설치 없이 바로 사용 가능)

`avatar`, `badge`, `button`, `card`, `dialog`, `dropdown-menu`, `input`, `label`, `separator`, `sheet`, `skeleton`, `sonner`, `tabs`, `textarea`, `tooltip`

### buttonVariants() 패턴 — Link에 버튼 스타일 적용

`asChild` prop이 지원되지 않으므로 `buttonVariants()`를 className에 직접 전달합니다:

```tsx
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

<Link href="/about" className={cn(buttonVariants({ size: "lg" }))}>
<Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
```

### render prop 패턴 — 트리거 컴포넌트에 커스텀 요소 적용

`asChild` 대신 `render` prop을 사용합니다:

```tsx
import { SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

<SheetTrigger render={<Button variant="ghost" size="icon" />}>
  <Menu className="h-5 w-5" />
</SheetTrigger>
```

## 코딩 컨벤션

### cn() 유틸리티

className 결합 시 항상 `cn()` 사용 (`clsx` + `tailwind-merge` 조합):

```tsx
import { cn } from "@/lib/utils"
className={cn("base-class", condition && "conditional-class")}
```

### 아이콘 크기 컨벤션

```tsx
<Icon className="h-4 w-4" />   // 기본 (버튼 내부, 텍스트 인라인)
<Icon className="h-5 w-5" />   // 강조 (헤더, 네비게이션)
```

### 데이터 배열 + map 렌더링 패턴

컴포넌트를 동적으로 렌더링할 때는 데이터 배열을 분리하고 `.map()`으로 렌더링합니다:

```tsx
const items = [
  { icon: Code2, title: "제목", description: "설명" },
]

{items.map((item) => (
  <item.icon className="h-4 w-4" />
))}
```

### 경로 별칭

`@/` → `src/` (tsconfig paths 설정)

## 주의사항 (DO NOT)

- **`tailwind.config.ts` 파일 생성 금지** — Tailwind v4는 `globals.css`에서 모든 테마를 관리
- **`@radix-ui/*` 직접 import 금지** — `@base-ui/react` 기반이므로 shadcn/ui 컴포넌트를 통해 사용
- **`asChild` prop 사용 금지** — `@base-ui/react`는 `asChild`를 지원하지 않음. `buttonVariants()` 또는 `render` prop 사용
- **서버 컴포넌트에서 훅/이벤트 사용 금지** — React 훅(`useState`, `useEffect` 등)이나 이벤트 핸들러가 필요하면 `"use client"` 추가
- **`error.tsx`, `loading.tsx` 미구현 상태** — 현재 프로젝트에 없으므로 필요 시 새로 생성
