#!/bin/bash
# Accessibility Checker — PostToolUse hook
# Checks HTML/JSX/TSX files for common accessibility issues.
# Non-blocking: returns warnings with WCAG references.
#
# Exit code 0 = pass (with optional warnings via systemMessage)

set -euo pipefail

INPUT=$(cat)

# Extract the file path from the tool use context
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
tool = data.get('toolName', '')
if tool not in ('edit_file', 'create_file', 'write_to_file', 'replace_string_in_file'):
    sys.exit(0)
path = data.get('toolInput', {}).get('filePath', data.get('toolInput', {}).get('path', ''))
print(path)
" 2>/dev/null || echo "")

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Only check HTML, JSX, and TSX files
if [[ ! "$FILE_PATH" =~ \.(html|jsx|tsx)$ ]]; then
  exit 0
fi

if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

WARNINGS=""

# Check for images without alt text
MISSING_ALT=$(grep -nE '<img[^>]+>' "$FILE_PATH" | grep -v 'alt=' || true)
if [[ -n "$MISSING_ALT" ]]; then
  WARNINGS="${WARNINGS}[WCAG 1.1.1] Images missing alt attribute:\n${MISSING_ALT}\n\n"
fi

# Check for click handlers without keyboard equivalents
CLICK_NO_KEY=$(grep -nE 'onClick' "$FILE_PATH" | grep -v 'onKeyDown\|onKeyUp\|onKeyPress\|button\|Button\|<a \|<input\|<select\|<textarea\|role=' || true)
if [[ -n "$CLICK_NO_KEY" ]]; then
  WARNINGS="${WARNINGS}[WCAG 2.1.1] Click handlers may need keyboard equivalents (onKeyDown):\n${CLICK_NO_KEY}\n\n"
fi

# Check for missing form labels
INPUTS_NO_LABEL=$(grep -nE '<input[^>]+>' "$FILE_PATH" | grep -v 'aria-label\|aria-labelledby\|id=.*label\|type="hidden"\|type="submit"\|type="button"' || true)
if [[ -n "$INPUTS_NO_LABEL" ]]; then
  WARNINGS="${WARNINGS}[WCAG 1.3.1] Form inputs may be missing labels (add aria-label or aria-labelledby):\n${INPUTS_NO_LABEL}\n\n"
fi

# Check for heading hierarchy issues (h1 followed by h3, etc.)
HEADINGS=$(grep -noE '<h[1-6]' "$FILE_PATH" | sed 's/.*<h//' || true)
PREV_LEVEL=0
HEADING_ISSUES=""
while IFS= read -r level; do
  if [[ -n "$level" ]] && [[ "$PREV_LEVEL" -gt 0 ]] && [[ "$level" -gt $((PREV_LEVEL + 1)) ]]; then
    HEADING_ISSUES="${HEADING_ISSUES}  Heading level jumped from h${PREV_LEVEL} to h${level}\n"
  fi
  if [[ -n "$level" ]]; then
    PREV_LEVEL=$level
  fi
done <<< "$HEADINGS"
if [[ -n "$HEADING_ISSUES" ]]; then
  WARNINGS="${WARNINGS}[WCAG 1.3.1] Heading hierarchy issues:\n${HEADING_ISSUES}\n"
fi

if [[ -n "$WARNINGS" ]]; then
  # Non-blocking: output as system message
  echo "{\"systemMessage\": \"⚠️ Accessibility warnings in ${FILE_PATH}:\\n${WARNINGS}\"}"
fi

exit 0
