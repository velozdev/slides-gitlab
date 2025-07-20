---
name: Task / Chore
about: Track non-feature, non-bug work (refactoring, upgrades, etc.)
labels: chore, linting
assignees: ''
---

## Task Description

Add a specific ESLint rule to enforce consistent use of arrow functions for component definitions.

## Motivation

Consistent function style improves readability and maintainability across the codebase.

## Acceptance Criteria

- ESLint rule is added to config
- All component definitions use arrow functions
- Linting passes without errors

## Additional Context

Consider using `eslint-plugin-react` and the `react/function-component-definition` rule.
