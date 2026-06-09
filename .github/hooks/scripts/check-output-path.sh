#!/bin/bash
# Output Organizer — PreToolUse hook
# Enforces the output directory structure for design artifacts.
# Returns permissionDecision: ask if a file is being created outside expected directories.
#
# Expected structure:
#   research/    → Discover phase
#   strategy/    → Define phase
#   ideation/    → Ideate phase
#   designs/     → Design phase
#   prototypes/  → Prototype phase
#   tests/       → Test phase
#   handoff/     → Deliver phase

set -euo pipefail

INPUT=$(cat)

# Extract tool info
RESULT=$(echo "$INPUT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
tool = data.get('toolName', '')
# Only check file creation/edit tools
if tool not in ('edit_file', 'create_file', 'write_to_file'):
    print('SKIP')
    sys.exit(0)
path = data.get('toolInput', {}).get('filePath', data.get('toolInput', {}).get('path', ''))
print(path)
" 2>/dev/null || echo "SKIP")

if [[ "$RESULT" == "SKIP" ]] || [[ -z "$RESULT" ]]; then
  exit 0
fi

FILE_PATH="$RESULT"

# Skip config files and hidden directories (these are always allowed)
if [[ "$FILE_PATH" =~ ^\. ]] || [[ "$FILE_PATH" =~ /\. ]]; then
  exit 0
fi

# Skip if file already exists (only enforce on new file creation)
if [[ -f "$FILE_PATH" ]]; then
  exit 0
fi

# Check if the file is in an expected output directory
ALLOWED_DIRS="research/|strategy/|ideation/|designs/|prototypes/|tests/|handoff/"

if echo "$FILE_PATH" | grep -qE "($ALLOWED_DIRS)"; then
  exit 0
fi

# File is outside expected directories — ask for permission
cat << EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "File '${FILE_PATH}' is outside the standard output directories (research/, strategy/, ideation/, designs/, prototypes/, tests/, handoff/). Are you sure you want to create it here?"
  }
}
EOF

exit 0
