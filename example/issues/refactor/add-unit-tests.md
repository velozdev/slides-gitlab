---
name: Refactor Proposal
about: Suggest codebase refactoring or architectural changes
labels: refactor
assignees: ''
---

## Area to Refactor

Slide parsing and rendering functions.

## Motivation

There is limited automated test coverage, making it hard to catch bugs and regressions.

## Proposed Approach

Add unit tests for markdown parsing, slide splitting, and rendering logic. Use Jest or Vitest for test framework.

## Risks / Considerations

- Initial test writing may take time
- May uncover existing bugs

## Additional Context

Improved test coverage will increase reliability and confidence in future changes.
