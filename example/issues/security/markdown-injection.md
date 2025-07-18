---
name: Security Issue
about: Report a security vulnerability (please use private channels if needed)
labels: security
assignees: ''
---

## Summary

The markdown parser does not sanitize input, allowing script injection via markdown files.

## Impact

Attackers could craft malicious markdown that executes JavaScript in viewers' browsers.

## Steps to Reproduce

1. Create a markdown file with `<script>alert('XSS')</script>`.
2. Load the file in the app.
3. The script executes in the slide viewer.

## Mitigation

Sanitize markdown input before rendering, using libraries like DOMPurify.

## Disclosure

**If this is a critical vulnerability, please do not disclose it publicly. Contact a maintainer directly or use a private channel.**
