#!/bin/bash
# Design Token Validator — PostToolUse hook
# Validates that design token files follow the --category-variant-scale convention
# and do not contain hardcoded values.
#
# Receives JSON on stdin with tool use context. Checks edited files in
# tokens/ or design-system/ directories for naming and value violations.
# Exit code 2 = blocking error (invalid tokens)
# Exit code 0 = pass

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

# Skip if no file path or not a token/design-system file
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

if [[ ! "$FILE_PATH" =~ (tokens/|design-system/) ]]; then
  exit 0
fi

# Only check CSS and JSON files
if [[ ! "$FILE_PATH" =~ \.(css|json)$ ]]; then
  exit 0
fi

ERRORS=""

if [[ -f "$FILE_PATH" ]]; then
  # Check for hardcoded hex colors (not in comments or token definitions)
  HARDCODED_COLORS=$(grep -nE '#[0-9a-fA-F]{3,8}' "$FILE_PATH" | grep -v '^\s*//' | grep -v '^\s*\*' | grep -v '"value"' | grep -v 'token' || true)
  if [[ -n "$HARDCODED_COLORS" ]]; then
    ERRORS="${ERRORS}Hardcoded color values found (use tokens instead):\n${HARDCODED_COLORS}\n\n"
  fi

  # For CSS files: check custom property naming convention
  if [[ "$FILE_PATH" =~ \.css$ ]]; then
    BAD_NAMES=$(grep -nE '^\s*--[a-zA-Z]' "$FILE_PATH" | grep -vE '^\s*--[a-z]+-[a-z]+-' || true)
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

if [[ -n "$ERRORS" ]]; then
  echo "{\"decision\": \"block\", \"reason\": \"Design token validation failed:\\n${ERRORS}\"}"
  exit 2
fi

exit 0
