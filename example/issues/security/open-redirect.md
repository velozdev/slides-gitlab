---
name: Security Issue
about: Report a security vulnerability (please use private channels if needed)
labels: security
assignees: ''
---

## Summary

The app's redirect logic allows open redirects, which could be abused for phishing.

## Impact

Users could be redirected to malicious external sites, risking credential theft or malware infection.

## Steps to Reproduce

1. Visit a link like `/redirect?url=https://evil.com`.
2. The app redirects to the external site without validation.

## Mitigation

Validate and restrict redirect URLs to trusted domains only.

## Disclosure

**If this is a critical vulnerability, please do not disclose it publicly. Contact a maintainer directly or use a private channel.**
