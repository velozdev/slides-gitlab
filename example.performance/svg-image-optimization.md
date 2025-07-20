---
name: Performance Issue
about: Report slowdowns, bottlenecks, or resource usage problems
labels: performance
assignees: ''
---

## Summary

Optimize SVG usage by preferring `<img src="...">` for SVGs instead of inline SVG in HTML to reduce DOM size and improve rendering performance.

## Steps to Reproduce / Scenario

- Load a slide deck with many inline SVG elements.
- Inspect DOM size and rendering speed.

## Expected Performance

Smaller DOM, faster rendering, and lower memory usage.

## Actual Performance

Large DOM tree and slower rendering when many SVGs are inlined.

## Environment
- OS: Any
- Browser: Any
- App Version: Any

## Additional Context

Using `<img src="...">` for SVGs can offload rendering to the browser and reduce DOM complexity.
