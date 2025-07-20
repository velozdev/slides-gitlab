---
name: Performance Issue
about: Report slowdowns, bottlenecks, or resource usage problems
labels: performance
assignees: ''
---

## Summary

Improve app performance by enabling optimal web compression (e.g., Brotli) and using HTTP/2 protocol for static asset delivery.

## Steps to Reproduce / Scenario

- Load the app over a slow network.
- Observe asset loading times and protocol used.

## Expected Performance

Faster asset delivery, reduced bandwidth usage, and improved page load times.

## Actual Performance

Assets may be served over HTTP/1.1 and without optimal compression, leading to slower loads.

## Environment
- OS: Any
- Browser: Any
- App Version: Any

## Additional Context

Modern web servers support Brotli compression and HTTP/2 for better performance. Consider updating deployment configuration.
