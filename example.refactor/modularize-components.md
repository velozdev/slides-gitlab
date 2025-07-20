---
name: Refactor Proposal
about: Suggest codebase refactoring or architectural changes
labels: refactor
assignees: ''
---

## Area to Refactor

Slide rendering and markdown parsing logic in the main viewer component.

## Motivation

The current implementation mixes parsing, rendering, and UI logic, making it harder to test, maintain, and extend.

## Proposed Approach

Break out markdown parsing, slide rendering, and UI controls into separate modules/components. Use dependency injection for easier testing.

## Risks / Considerations

- May require updating imports and props throughout the app
- Potential for merge conflicts during refactor

## Additional Context

This will improve readability, testability, and future feature development.
