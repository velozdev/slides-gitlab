---
name: Task / Chore
about: Track non-feature, non-bug work (refactoring, upgrades, etc.)
labels: chore, accessibility, ci
assignees: ''
---

## Task Description

Add a GitHub Action to run axe-linter for automated accessibility checks on every pull request.

## Motivation

Automated accessibility testing helps catch issues early and maintain compliance.

## Acceptance Criteria

- axe-linter runs on PRs
- Reports accessibility violations as comments or fails PR
- Integrates with existing CI workflow

## Additional Context

See [axe-linter GitHub Action](https://github.com/dequelabs/axe-linter-action) for details.
