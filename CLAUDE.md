# Claude Instructions

Read [.github/copilot-instructions.md](.github/copilot-instructions.md) at the start of every session. It contains code style, workflow rules, and a table mapping work areas to additional instruction files.

When working in a specific area, look up and read the relevant instruction file before proceeding — do not guess at conventions:

| Area | Instruction file |
| ---- | ---------------- |
| Auth, access control, roles, permissions, `req.user` | [.github/instructions/auth-system.instructions.md](.github/instructions/auth-system.instructions.md) |
| Database seeding, resetting, fixtures, seedState | [.github/instructions/database-seeding.instructions.md](.github/instructions/database-seeding.instructions.md) |
| Email sending, Zeptomail SMTP, React Email templates | [.github/instructions/email-configuration.instructions.md](.github/instructions/email-configuration.instructions.md) |
| App Router, data fetching, blocks, route handlers, metadata, images, links, middleware | [.github/instructions/nextjs.instructions.md](.github/instructions/nextjs.instructions.md) |
| Collections, globals, hooks, fields, admin UI, migrations, PayloadCMS config | [.github/instructions/payloadcms.instructions.md](.github/instructions/payloadcms.instructions.md) |
| E2E tests in `e2e/` | [.github/instructions/playwright-e2e.instructions.md](.github/instructions/playwright-e2e.instructions.md) |
