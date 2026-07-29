---
name: claude-prompt-engineer
description: >
  Enforces official Anthropic Claude prompt engineering standards: XML tags (<instructions>, <context>, <rules>, <thinking>),
  prefilling assistant responses, and zero-ambiguity structured outputs.
argument-hint: "[strict]"
license: MIT
---

# Official Anthropic Claude Prompt Engineering Skill

Derived directly from Anthropic's official Claude Prompt Engineering guidelines and best practices.

## Core Anthropic Prompt Engineering Rules

### 1. XML Boundary Markers
Use XML tags to separate instructions from context, inputs, and output constraints:
- `<instructions>` — Core task definition.
- `<context>` — Grounding data, niche context, and web context.
- `<rules>` — Hard constraints, ban lists, and requirements.
- `<output_format>` — Exact JSON schema specifications.

### 2. Thinking & Reasoning (`<thinking>`)
For complex or creative generations:
- Instruct the model to reason step-by-step within `<thinking>` tags before producing final structured outputs.

### 3. Response Prefilling
End user prompts with the beginning of the expected response (e.g. `[`) to force the LLM to output pure JSON without conversational preamble.
