"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Tooltip,
} from "@fluentui/react-components";
import { Copy16Regular, Checkmark16Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CopyButtonProps {
  /** The text to copy to the clipboard. */
  text: string;
  /** Tooltip shown before copying. @default "Copy to clipboard" */
  tooltipLabel?: string;
  /** Tooltip shown after copying. @default "Copied!" */
  copiedLabel?: string;
  /** Fluent Button size. @default "small" */
  size?: "small" | "medium" | "large";
  /** Fluent Button appearance. @default "subtle" */
  appearance?: "subtle" | "outline" | "primary" | "secondary" | "transparent";
  /** Extra className applied to the button root. */
  className?: string;
  /** Show text label next to icon. @default false */
  showLabel?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Reusable copy-to-clipboard button with checkmark feedback.
 * Use wherever users need to copy a snippet, command, or prompt. */
export default function CopyButton({
  text,
  tooltipLabel = "Copy to clipboard",
  copiedLabel = "Copied!",
  size = "small",
  appearance = "subtle",
  className,
  showLabel = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available (e.g., non-HTTPS context)
    }
  };

  return (
    <Tooltip content={copied ? copiedLabel : tooltipLabel} relationship="label">
      <Button
        className={className}
        appearance={appearance}
        size={size}
        icon={copied ? <Checkmark16Regular /> : <Copy16Regular />}
        onClick={handleCopy}
        aria-label={tooltipLabel}
      >
        {showLabel ? (copied ? copiedLabel : "Copy") : undefined}
      </Button>
    </Tooltip>
  );
}
