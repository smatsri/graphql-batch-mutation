# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.1.x   | :x:                |
| 1.0.x   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within graphql-batch-mutation, please send an email to [maintainer email]. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Considerations

When using this package, be aware of:

1. **Input Validation**: Always validate GraphQL queries and variables before passing them to the batch mutation builder
2. **Query Size**: Consider implementing size limits for batch operations to prevent DoS attacks
3. **Variable Type Safety**: Use the provided type system to ensure type safety of your GraphQL variables

## Dependencies

This package has minimal dependencies to reduce security risks. We regularly update our dependencies to patch any known vulnerabilities.
