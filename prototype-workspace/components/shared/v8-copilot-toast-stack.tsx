/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCopilot } from './v8-copilot-provider';
import { CopilotToast } from './v8-copilot-toast';
import type { CopilotToast as CopilotToastData } from './v8-copilot-types';
import './v8-copilot-toast-stack.css';

/* ===========================================
   Copilot Toast Stack
   Manages collapsed / expanded display of
   toast notifications from CopilotProvider
   =========================================== */

/** Default auto-dismiss timeout (ms) per variant */
const VARIANT_AUTO_DISMISS: Record<string, boolean> = {
  progress: false,
  completed: true,
  'input-required': false,
  error: false,
  generic: false,
};

const DEFAULT_TIMEOUT = 5000;

export interface CopilotToastStackProps {
  /** Max visible cards when collapsed (default: 3) */
  maxVisible?: number;
  /** Custom className */
  className?: string;
  /** Offset from viewport top in px (default: 48) */
  offsetTop?: number;
  /** Offset from viewport right in px (default: 24) */
  offsetRight?: number;
  /** When true, uses position:absolute instead of fixed so the stack scopes to a positioned ancestor */
  contained?: boolean;
}

export function CopilotToastStack({
  maxVisible = 3,
  className = '',
  offsetTop,
  offsetRight,
  contained = false,
}: CopilotToastStackProps) {
  const { toasts, dismissToast } = useCopilot();
  const [expanded, setExpanded] = useState(false);
  const [enteringIds, setEnteringIds] = useState<Set<string>>(new Set());
  const [exitingIds, setExitingIds] = useState<Set<string>>(new Set());
  const stackRef = useRef<HTMLDivElement>(null);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const autoDismissTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Detect new toasts synchronously during render so the entering class
  // is present on the very first paint (no flash of final state).
  const newIdsThisRender = toasts
    .map((t) => t.id)
    .filter((id) => !seenIdsRef.current.has(id));

  // After render: mark new IDs as seen, add to enteringIds state,
  // then schedule removal of the entering class after animation.
  useEffect(() => {
    if (newIdsThisRender.length === 0) return;

    // Mark as seen so next render won't re-detect them
    newIdsThisRender.forEach((id) => seenIdsRef.current.add(id));

    setEnteringIds((prev) => {
      const next = new Set(prev);
      newIdsThisRender.forEach((id) => next.add(id));
      return next;
    });

    const timer = setTimeout(() => {
      setEnteringIds((prev) => {
        const next = new Set(prev);
        newIdsThisRender.forEach((id) => next.delete(id));
        return next;
      });
    }, 310);

    return () => clearTimeout(timer);
  }, [newIdsThisRender.join(',')]);

  // Clean up seenIdsRef when toasts are removed
  useEffect(() => {
    const currentIds = new Set(toasts.map((t) => t.id));
    seenIdsRef.current.forEach((id) => {
      if (!currentIds.has(id)) seenIdsRef.current.delete(id);
    });
  }, [toasts]);

  // Auto-dismiss logic
  useEffect(() => {
    toasts.forEach((toast) => {
      if (autoDismissTimers.current.has(toast.id)) return;

      const shouldAutoDismiss = toast.autoDismiss ?? VARIANT_AUTO_DISMISS[toast.variant] ?? false;
      if (!shouldAutoDismiss) return;

      const timeout = toast.autoDismissTimeout ?? DEFAULT_TIMEOUT;
      const timer = setTimeout(() => {
        handleDismiss(toast.id);
        autoDismissTimers.current.delete(toast.id);
      }, timeout);

      autoDismissTimers.current.set(toast.id, timer);
    });

    // Clean up timers for removed toasts
    const currentIds = new Set(toasts.map((t) => t.id));
    autoDismissTimers.current.forEach((timer, id) => {
      if (!currentIds.has(id)) {
        clearTimeout(timer);
        autoDismissTimers.current.delete(id);
      }
    });
  }, [toasts]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      autoDismissTimers.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Click outside to collapse
  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (stackRef.current && !stackRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };

    // Defer so the expand-click itself doesn't immediately collapse
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  const handleDismiss = useCallback(
    (id: string) => {
      setExitingIds((prev) => new Set(prev).add(id));

      setTimeout(() => {
        dismissToast(id);
        setExitingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 210);
    },
    [dismissToast],
  );

  const handleStackClick = useCallback(() => {
    if (!expanded && toasts.length > 1) {
      setExpanded(true);
    }
  }, [expanded, toasts.length]);

  const handleToastClick = useCallback(
    (toast: CopilotToastData) => {
      toast.onClick?.(toast);
    },
    [],
  );

  const getAnimationState = (id: string): 'entering' | 'exiting' | 'idle' => {
    if (exitingIds.has(id)) return 'exiting';
    if (enteringIds.has(id) || newIdsThisRender.includes(id)) return 'entering';
    return 'idle';
  };

  if (toasts.length === 0) return null;

  const containerStyle: React.CSSProperties = {};
  if (offsetTop !== undefined) containerStyle.top = `${offsetTop}px`;
  if (offsetRight !== undefined) containerStyle.right = `${offsetRight}px`;

  const classNames = [
    'ap-copilot-toast-stack',
    toasts.length > 0 && 'ap-copilot-toast-stack--has-toasts',
    contained && 'ap-copilot-toast-stack--contained',
    className,
  ].filter(Boolean).join(' ');

  /* ---------- Unified render — styles driven by `expanded` ---------- */
  const visibleToasts = expanded ? toasts : toasts.slice(0, maxVisible);
  const hiddenCount = expanded ? 0 : Math.max(0, toasts.length - maxVisible);
  const hasEntering = enteringIds.size > 0 || newIdsThisRender.length > 0;

  const wrapperClassNames = [
    'ap-copilot-toast-stack__cards',
    expanded ? 'ap-copilot-toast-stack__cards--expanded' : 'ap-copilot-toast-stack__cards--collapsed',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={containerStyle} ref={stackRef}>
      <div
        className={wrapperClassNames}
        onClick={!expanded ? handleStackClick : undefined}
      >
        {hiddenCount > 0 && (
          <span className="ap-copilot-toast-stack__count">
            {toasts.length}
          </span>
        )}
        {visibleToasts.map((toast, index) => {
          const isTop = index === 0;
          const isEntering = getAnimationState(toast.id) === 'entering';

          // Background card transition delays mirror the CSS tokens:
          // --copilot-toast-stack-narrow-delay (default 150ms).
          // Transform starts at 0, width/margin start at narrowDelay.
          const narrowDelayMs = 50; // keep in sync with --copilot-toast-stack-narrow-delay
          const transitionDelay = `50ms, ${narrowDelayMs}ms, ${narrowDelayMs}ms`;

          let itemStyle: React.CSSProperties;
          if (expanded) {
            itemStyle = { position: 'relative', zIndex: 1, transitionDelay };
          } else if (isTop) {
            itemStyle = { zIndex: maxVisible, transitionDelay };
          } else {
            const stackOffset = index * 6;
            const widthShrink = index * 16;
            itemStyle = {
              transform: `translateY(${stackOffset}px)`,
              width: `calc(100% - ${widthShrink}px)`,
              marginLeft: `${widthShrink / 2}px`,
              zIndex: maxVisible - index,
              transitionDelay,
            };
          }

          const itemClassNames = [
            'ap-copilot-toast-stack__item',
            !expanded && isTop && 'ap-copilot-toast-stack__item--top',
            !expanded && !isTop && `ap-copilot-toast-stack__item--${index}`,
          ].filter(Boolean).join(' ');

          return (
            <div key={toast.id} className={itemClassNames} style={itemStyle}>
              <CopilotToast
                toast={toast}
                onClose={handleDismiss}
                onClick={expanded || isTop ? handleToastClick : undefined}
                animationState={getAnimationState(toast.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
