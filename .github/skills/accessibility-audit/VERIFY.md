---
tool: accessibility-audit
---

# Verification: Accessibility Audit

## Dimensions

```yaml
dimensions:
  wcag-coverage:
    weight: 35
    threshold: 75
    failure_instruction: "The audit must check all five manual check categories: colour
      contrast (with actual measured ratios), keyboard navigation (all interactive
      elements), ARIA and semantics (all landmark regions, labels, and roles), focus
      management (modal/dialog and dynamic content), and motion and animation (prefers-
      reduced-motion). An audit that covers only automated tool output is incomplete —
      automated tools catch approximately 30% of WCAG issues. Document each manual
      check explicitly, even when it passes."

  finding-specificity:
    weight: 40
    threshold: 75
    failure_instruction: "Every issue must include: the specific WCAG criterion violated
      (number and name, e.g., '1.4.3 Contrast (Minimum)'), the impact level (Critical/
      Serious/Moderate/Minor), the exact element selector or location, the evidence
      (measured contrast ratio, missing attribute value, or keyboard test result), and
      a specific remediation action. Remediation must name the exact CSS property,
      token value, or HTML attribute to change — not general advice like 'improve
      contrast.'"

  remediation-actionability:
    weight: 25
    threshold: 70
    failure_instruction: "Every remediation instruction must be implementable by a
      developer without further clarification. Specify the exact token value, ARIA
      attribute, or CSS change required. Remediations that require the developer to
      'check the design system' or 'consult the designer' are not actionable — make
      the determination and state it explicitly in the audit."

accept_threshold: 76
```

## What the Verifier Checks

1. All 5 manual check categories covered (contrast, keyboard, ARIA, focus, motion)
2. Every issue has WCAG criterion, impact level, element location, evidence, and remediation
3. Colour contrast ratios are actual measured values (not estimates)
4. Every remediation names an exact change (property, value, or attribute)
5. Summary section with pass/fail counts and sign-off recommendation present
6. Components that passed all checks listed explicitly

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Manual check categories not covered (list which are missing)
- Issues without measured evidence (list by issue A-N)
- Remediations requiring further designer consultation (list them)
- The best output produced so far
