#!/bin/bash
# Design Token Validator — PostToolUse hook
# Validates that design token files follow the --category-variant-scale convention
# and do not contain hardcoded values.
#
# Also audits edited prototype-workspace TSX files for Fluent UI React v9
# discipline violations. Token/design-system failures are blocking; Fluent
# prototype findings are warnings so agents can fix them without blocking saves.
#
# Receives JSON on stdin with tool use context. Checks edited files in
# tokens/ or design-system/ directories for naming and value violations.
# Exit code 2 = blocking error (invalid tokens)
# Exit code 0 = pass or non-blocking Fluent warning

set -euo pipefail

INPUT=$(cat)

# Extract the file path from the tool use context
FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
tool = data.get('toolName', '')
# Only validate edit operations
if tool not in ('edit_file', 'create_file', 'write_to_file', 'replace_string_in_file'):
    sys.exit(0)
path = data.get('toolInput', {}).get('filePath', data.get('toolInput', {}).get('path', ''))
print(path)
" 2>/dev/null || echo "")

STAGED_PROTOTYPE_TSX=$(git diff --name-only --cached -- prototype-workspace 2>/dev/null | grep -E '\.tsx$' || true)

# Skip if no target file path and no staged prototype TSX files
if [[ -z "$FILE_PATH" && -z "$STAGED_PROTOTYPE_TSX" ]]; then
  exit 0
fi

IS_TOKEN_FILE=0
IS_PROTOTYPE_TSX=0

if [[ -n "$FILE_PATH" && "$FILE_PATH" =~ (tokens/|design-system/) ]] && [[ "$FILE_PATH" =~ \.(css|json)$ ]]; then
  IS_TOKEN_FILE=1
fi

if [[ -n "$FILE_PATH" && "$FILE_PATH" =~ (^|/)prototype-workspace/.*\.tsx$ ]]; then
  IS_PROTOTYPE_TSX=1
fi

if [[ "$IS_TOKEN_FILE" -eq 0 && "$IS_PROTOTYPE_TSX" -eq 0 && -z "$STAGED_PROTOTYPE_TSX" ]]; then
  exit 0
fi

ERRORS=""
WARNINGS=""

if [[ -f "$FILE_PATH" && "$IS_TOKEN_FILE" -eq 1 ]]; then
  # Check for hardcoded hex colors (not in comments or token definitions)
  HARDCODED_COLORS=$(grep -nE '#[0-9a-fA-F]{3,8}' "$FILE_PATH" | grep -v '^[[:space:]]*//' | grep -v '^[[:space:]]*\*' | grep -v '"value"' | grep -v 'token' || true)
  if [[ -n "$HARDCODED_COLORS" ]]; then
    ERRORS="${ERRORS}Hardcoded color values found (use tokens instead):\n${HARDCODED_COLORS}\n\n"
  fi

  # For CSS files: check custom property naming convention
  if [[ "$FILE_PATH" =~ \.css$ ]]; then
    BAD_NAMES=$(grep -nE '^[[:space:]]*--[a-zA-Z]' "$FILE_PATH" | grep -vE '^[[:space:]]*--[a-z]+-[a-z]+-' || true)
    if [[ -n "$BAD_NAMES" ]]; then
      ERRORS="${ERRORS}Token names must follow --category-variant-scale pattern:\n${BAD_NAMES}\n\n"
    fi
  fi

  # For JSON files: check structure
  if [[ "$FILE_PATH" =~ \.json$ ]]; then
    # Validate it's valid JSON
    if ! python3 -c "import json; json.load(open('$FILE_PATH'))" 2>/dev/null; then
      ERRORS="${ERRORS}Invalid JSON in token file: $FILE_PATH\n"
    fi
  fi
fi

audit_prototype_tsx() {
  local TARGET_FILE="$1"

  if [[ ! -f "$TARGET_FILE" ]]; then
    return
  fi

  # Fluent v9 prototype audit. Keep this best-effort and non-blocking.
  DISALLOWED_HEX=$(grep -nE '#[0-9a-fA-F]{3,8}' "$TARGET_FILE" | grep -viE '#(0078D4|106EBE|005A9E)\b' || true)
  if [[ -n "$DISALLOWED_HEX" ]]; then
    WARNINGS="${WARNINGS}${TARGET_FILE}: hardcoded hex values outside Azure brand blues (#0078D4, #106EBE, #005A9E):\n${DISALLOWED_HEX}\n\n"
  fi

  INLINE_STYLE=$(grep -nE 'style=[[:space:]]*\{\{[^}]' "$TARGET_FILE" || true)
  if [[ -n "$INLINE_STYLE" ]]; then
    WARNINGS="${WARNINGS}${TARGET_FILE}: inline style objects found; use makeStyles except for truly dynamic values:\n${INLINE_STYLE}\n\n"
  fi

  CSS_MODULES=$(grep -nE 'import .*\.module\.css' "$TARGET_FILE" || true)
  if [[ -n "$CSS_MODULES" ]]; then
    WARNINGS="${WARNINGS}${TARGET_FILE}: CSS Module imports found; prototype-workspace TSX must use makeStyles + Fluent tokens:\n${CSS_MODULES}\n\n"
  fi

  INLINE_SVG=$(grep -nE '<svg([[:space:]>])' "$TARGET_FILE" || true)
  if [[ -n "$INLINE_SVG" ]]; then
    WARNINGS="${WARNINGS}${TARGET_FILE}: inline SVG found; use @fluentui/react-icons for UI chrome or <img> for Azure/portal icons:\n${INLINE_SVG}\n\n"
  fi

  RAW_TEXT_ELEMENTS=$(grep -nE '<(p|span|h[1-6])([[:space:]>])|<div[^>]*>[[:space:]]*[^<{[:space:]][^<{]*' "$TARGET_FILE" || true)
  if [[ -n "$RAW_TEXT_ELEMENTS" ]]; then
    WARNINGS="${WARNINGS}${TARGET_FILE}: raw HTML typography found; use Fluent Text/Body1/Title components where practical:\n${RAW_TEXT_ELEMENTS}\n\n"
  fi
}

if [[ "$IS_PROTOTYPE_TSX" -eq 1 ]]; then
  audit_prototype_tsx "$FILE_PATH"
fi

if [[ -n "$STAGED_PROTOTYPE_TSX" ]]; then
  while IFS= read -r STAGED_FILE; do
    if [[ -n "$STAGED_FILE" && "$STAGED_FILE" != "$FILE_PATH" ]]; then
      audit_prototype_tsx "$STAGED_FILE"
    fi
  done <<EOF_STAGED
$STAGED_PROTOTYPE_TSX
EOF_STAGED
fi

if [[ -n "$ERRORS" ]]; then
  echo "{\"decision\": \"block\", \"reason\": \"Design token validation failed:\\n${ERRORS}\"}"
  exit 2
fi

if [[ -n "$WARNINGS" ]]; then
  echo "Fluent UI React v9 prototype audit warnings:"
  printf "%b" "$WARNINGS"
fi

exit 0
