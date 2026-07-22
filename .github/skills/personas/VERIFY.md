---
tool: personas
---

# Verification: Personas

## Dimensions

```yaml
dimensions:
  research-grounding:
    weight: 40
    threshold: 75
    failure_instruction: "Every pain point in every persona must cite a source: a theme
      ID from findings-synthesis.md or a direct participant quote. Personas built from
      assumptions without source citations are not acceptable. Behavioural axis ratings
      must be justified by observed behaviour — not assumed based on job title. If a
      persona segment cannot be supported by 2+ participant sessions or data sources,
      remove or merge it."

  completeness:
    weight: 35
    threshold: 72
    failure_instruction: "Every persona must include all seven sections: Identity, Goals,
      Pain Points, Behaviours (axis spectrums), Tools and Context, Scenario Narrative,
      and Design Implications. A persona missing the Scenario Narrative or Design
      Implications sections is incomplete and cannot be used by the design team. The
      Scenario Narrative must be 150–200 words of flowing prose — not bullet points."

  differentiation:
    weight: 25
    threshold: 70
    failure_instruction: "If 2+ personas are present, they must be meaningfully distinct.
      Each persona must have at least 2 pain points that do not appear in any other
      persona. If two personas have the same goals and pain points, merge them into one.
      Design Implications must differ between personas — identical implications across
      personas indicate the personas are not genuinely distinct segments."

accept_threshold: 76
```

## What the Verifier Checks

1. Every persona has all 7 required sections
2. Every pain point cites a source (theme ID or participant quote)
3. Scenario Narrative is prose (not bullets), 150–200 words
4. Behavioural axes include at least 4 spectrums per persona
5. If 2+ personas exist, each has at least 2 unique pain points
6. Design Implications are distinct per persona

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Personas with missing sections (list by persona name and section)
- Pain points without source citations (list by persona and pain point)
- Personas that are not differentiated
- The best output produced so far
