---
name: Refactor Proposal
about: Suggest codebase refactoring or architectural changes
labels: refactor
assignees: ''
---

## Area to Refactor

Markdown-to-HTML conversion logic.

## Motivation

Current approach uses complex regexes, which are hard to maintain and can miss edge cases.

## Proposed Approach

Replace regex-based parsing with a dedicated markdown parser library (e.g., `remark`, `markdown-it`).

## Risks / Considerations

- May require updating slide formatting and tests
- Potential for breaking changes in rendering

## Additional Context

A parser library will improve reliability and support for advanced markdown features.
