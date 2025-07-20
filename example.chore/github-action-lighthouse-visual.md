---
name: Task / Chore
about: Track non-feature, non-bug work (refactoring, upgrades, etc.)
labels: chore, testing, ci
assignees: ''
---

## Task Description

Add a GitHub Action to perform visual regression testing using Lighthouse on every pull request.

## Motivation

Automated visual regression testing helps catch UI changes and performance regressions before merging code.

## Acceptance Criteria

- Lighthouse runs on PRs and reports scores
- Fails PR if scores drop below threshold
- Stores visual snapshots for review

## Additional Context

See [Lighthouse CI GitHub Action](https://github.com/GoogleChrome/lighthouse-ci) for implementation details.
