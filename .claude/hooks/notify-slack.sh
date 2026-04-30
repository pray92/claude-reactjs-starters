#!/bin/bash

# 프로젝트 루트의 .env 파일에서 환경변수 로드
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
if [ -f "$PROJECT_DIR/.env" ]; then
  export $(grep -v '^#' "$PROJECT_DIR/.env" | xargs)
fi

# Slack 웹훅 URL
WEBHOOK_URL="${SLACK_WEBHOOK_URL}"

if [ -z "$WEBHOOK_URL" ]; then
  exit 0
fi

# stdin에서 hook 데이터 읽기
HOOK_DATA=$(cat)
HOOK_EVENT=$(echo "$HOOK_DATA" | jq -r '.hook_event_name // empty')

# 이벤트 타입에 따라 메시지 구성
case "$HOOK_EVENT" in
  "Notification")
    TITLE="🔔 Claude Code: 권한 요청"
    MESSAGE="Claude가 권한 승인을 기다리고 있습니다. 확인해주세요!"
    ;;
  "Stop")
    TITLE="✅ Claude Code: 작업 완료"
    MESSAGE="Claude가 작업을 완료했습니다."
    ;;
  *)
    TITLE="📌 Claude Code 알림"
    MESSAGE="이벤트: $HOOK_EVENT"
    ;;
esac

# 프로젝트 디렉토리 이름 추출
PROJECT=$(echo "$HOOK_DATA" | jq -r '.cwd // empty' | xargs basename 2>/dev/null || echo "unknown")

# Slack으로 전송 (비동기, 오류 무시)
curl -s -X POST "$WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d "{
    \"text\": \"$TITLE\",
    \"blocks\": [
      {
        \"type\": \"header\",
        \"text\": {
          \"type\": \"plain_text\",
          \"text\": \"$TITLE\"
        }
      },
      {
        \"type\": \"section\",
        \"text\": {
          \"type\": \"mrkdwn\",
          \"text\": \"$MESSAGE\n\n📂 프로젝트: \`$PROJECT\`\"
        }
      }
    ]
  }" > /dev/null 2>&1

exit 0
