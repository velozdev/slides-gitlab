---
name: Security Issue
about: Report a security vulnerability (please use private channels if needed)
labels: security
assignees: ''
---

## Summary

Sensitive user data (e.g., tokens, passwords) is stored in localStorage without encryption.

## Impact

Malicious scripts or browser extensions could access and exfiltrate sensitive data.

## Steps to Reproduce

1. Log in to the app.
2. Inspect localStorage for sensitive values.
3. Inject a script to read and send data externally.

## Mitigation

Store sensitive data in secure, httpOnly cookies or use browser storage encryption.

## Disclosure

**If this is a critical vulnerability, please do not disclose it publicly. Contact a maintainer directly or use a private channel.**
