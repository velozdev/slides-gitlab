---
name: Task / Chore
about: Track non-feature, non-bug work (refactoring, upgrades, etc.)
labels: chore, testing, ci
assignees: ''
---

## Task Description

Add a GitHub Action to get Lighthouse scores for the app on every push to main.

## Motivation

Tracking Lighthouse scores over time helps monitor performance, accessibility, and best practices.

## Acceptance Criteria

- Action runs on main branch pushes
- Reports scores for performance, accessibility, SEO, and best practices
- Stores results as artifacts or comments on PRs

## Additional Context

See [Lighthouse CI GitHub Action](https://github.com/GoogleChrome/lighthouse-ci) for setup.
