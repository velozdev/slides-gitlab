---
name: Security Issue
about: Report a security vulnerability (please use private channels if needed)
labels: security
assignees: ''
---

## Summary

The app does not enforce a strong Content Security Policy (CSP), making it vulnerable to XSS and data injection attacks.

## Impact

Attackers could inject malicious scripts, steal user data, or hijack sessions.

## Steps to Reproduce

1. Open the app in a browser.
2. Use browser dev tools to inject a script tag into the DOM.
3. Observe that the script executes without restriction.

## Mitigation

Implement a strict CSP header (e.g., `default-src 'self'; script-src 'self'; object-src 'none';`) and audit all inline scripts.

## Disclosure

**If this is a critical vulnerability, please do not disclose it publicly. Contact a maintainer directly or use a private channel.**
