---
name: Security Issue
about: Report a security vulnerability (please use private channels if needed)
labels: security
assignees: ''
---

## Summary

The app allows weak passwords and does not enforce multi-factor authentication (MFA).

## Impact

Accounts are vulnerable to brute-force attacks and unauthorized access.

## Steps to Reproduce

1. Register with a short or common password.
2. Log in without any second factor.

## Mitigation

Enforce strong password policies and require MFA for all users.

## Disclosure

**If this is a critical vulnerability, please do not disclose it publicly. Contact a maintainer directly or use a private channel.**
