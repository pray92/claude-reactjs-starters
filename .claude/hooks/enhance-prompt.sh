#!/bin/bash
# UserPromptSubmit 훅: git 컨텍스트를 수집하여 프롬프트를 보강하고 사용자에게 선택권을 줌

# --- 전제조건 확인 ---
if ! command -v jq &>/dev/null; then
  exit 0
fi

# /dev/tty 접근 가능 여부 확인 (비대화형 환경에서는 건너뜀)
if ! exec 3>/dev/tty 2>/dev/null; then
  exit 0
fi
exec 3>&-

# --- stdin에서 훅 데이터 읽기 ---
HOOK_DATA=$(cat)
ORIGINAL_PROMPT=$(echo "$HOOK_DATA" | jq -r '.prompt // empty')

if [ -z "$ORIGINAL_PROMPT" ]; then
  exit 0
fi

# --- git 컨텍스트 수집 ---
CONTEXT_PARTS=()

# 현재 브랜치
BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$BRANCH" ]; then
  CONTEXT_PARTS+=("- 현재 브랜치: $BRANCH")
fi

# 변경된 파일 (staged + unstaged, 최대 10개)
CHANGED_FILES=$(
  { git diff --name-only HEAD 2>/dev/null; git diff --cached --name-only 2>/dev/null; } \
  | sort -u | grep -v '^$' | head -10
)
if [ -n "$CHANGED_FILES" ]; then
  FILES_INLINE=$(echo "$CHANGED_FILES" | tr '\n' ', ' | sed 's/,$//')
  CONTEXT_PARTS+=("- 변경된 파일: $FILES_INLINE")
fi

# 최근 커밋 3개
RECENT_COMMITS=$(git log --oneline -3 2>/dev/null)
if [ -n "$RECENT_COMMITS" ]; then
  CONTEXT_PARTS+=("- 최근 커밋:")
  while IFS= read -r line; do
    CONTEXT_PARTS+=("    $line")
  done <<< "$RECENT_COMMITS"
fi

# 컨텍스트가 없으면 보강할 내용 없음
if [ ${#CONTEXT_PARTS[@]} -eq 0 ]; then
  exit 0
fi

# --- 보강된 프롬프트 구성 ---
CONTEXT_TEXT=$(printf '%s\n' "${CONTEXT_PARTS[@]}")

ENHANCED_PROMPT="[프로젝트 컨텍스트]
$CONTEXT_TEXT

[사용자 요청]
$ORIGINAL_PROMPT"

# --- /dev/tty로 사용자에게 표시 ---
{
  echo ""
  echo "┌──────────────────────────────────────────────┐"
  echo "│          Prompt Enhancement Hook             │"
  echo "└──────────────────────────────────────────────┘"
  echo ""
  echo "$ENHANCED_PROMPT"
  echo ""
  echo "  [1] 보강된 프롬프트로 실행"
  echo "  [2] 원래 프롬프트 그대로 실행 (기본)"
  echo ""
  printf "선택 (1/2, 15초 내 미입력 시 원래 프롬프트 사용): "
} > /dev/tty

# --- /dev/tty에서 사용자 선택 읽기 ---
CHOICE=""
read -t 15 -r CHOICE < /dev/tty 2>/dev/null

echo "" > /dev/tty

# --- 결과 출력 ---
if [ "$CHOICE" = "1" ]; then
  jq -n --arg prompt "$ENHANCED_PROMPT" '{"prompt": $prompt}'
fi

exit 0
