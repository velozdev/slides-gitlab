---
name: Feature Request
about: Suggest a new feature or enhancement
labels: enhancement, accessibility
assignees: ''
---

## Summary

Improve accessibility by ensuring heading elements in slides are rendered in a sequentially-descending order, while preserving the original markdown creator's intent and style.

## Motivation

Screen readers and accessibility tools expect headings to follow a logical order (e.g., h1 > h2 > h3). Out-of-order headings can confuse users and reduce accessibility compliance.

## Proposed Solution

When rendering markdown, automatically adjust heading levels to maintain sequential order (e.g., convert a `###` following a `#` to an `h2`), but apply the original heading's style (e.g., h3 styling on the h2 element). Optionally, provide a warning or visual indicator for out-of-order headings.

## Alternatives Considered

- Leave headings as-is and document best practices
- Only warn users without auto-correcting

## Additional Context

This approach balances accessibility with author intent, and can be extended to other markdown elements for improved compliance.
