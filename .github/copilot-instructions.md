# Copilot Instructions

These rules apply to every request in this repository.

## Code Style

- Constants at the top of files, `ALL_CAPS`, never inside functions
- Arrow functions and `const` patterns always — never `function` declarations
- Export functions inline: `export const someFunc = () => {}`
- Semicolons and ES6 syntax always
- Before writing something new, consider if it can be reused — abstract if so

## Tailwind / CSS

- Use `cn()` from `src/lib/utils.ts` for all `className` expressions
- Always use RTL-friendly logical CSS classes instead of physical directional ones:
  - Spacing: `ms-*`/`me-*`/`ps-*`/`pe-*` — not `ml-*`/`mr-*`/`pl-*`/`pr-*`
  - Positioning: `start-*`/`end-*` — not `left-*`/`right-*`
  - Borders: `border-s`/`border-e` and variants — not `border-l`/`border-r`
  - Text: `text-start`/`text-end` — not `text-left`/`text-right`
  - Floats: `float-start`/`float-end` — not `float-left`/`float-right`
  - **Exceptions**: physical classes are fine when position is determined by an explicit `side` prop, or when a UI element is intentionally pinned regardless of direction
- Directional icons (arrows, chevrons): add `rtl:rotate-180` so they flip in RTL

## UI Components

- Never build custom UI primitives. Use shadcn/ui first (`src/components/ui/`). If the component doesn't exist, generate it with `npx shadcn add`. Only hand-build if unavailable from shadcn, and place it in `src/components/ui/`.
- Always use the Next.js `<Image>` component — never a plain `<img>` tag

## PayloadCMS

- Always import collection/document types from `@payload-types` — never define your own
- Never write to `@payload-types` manually — run `npm run payload generate:types` to regenerate; wait a few seconds then recheck problems before escalating
- `Media` fields: use the `Media` type from `@payload-types`; cast fields typed `number | Media` as `as Media`
- Admin UI components registered in `admin.components` **must use `export default`** — named-only exports fail silently at runtime

## Locale / i18n

- Do not manually inject locale into hrefs — `next-intl` middleware handles locale routing automatically

## Workflow

- Package manager: `npm` — never `yarn` or `pnpm`
- Never build or run the dev server — that is the user's responsibility
- After completing any work, check the problems panel and fix all errors before considering work done. Do not skip this step.
- **No side quests**: do only what was asked. Do not uncomment unrelated code, add unrequested error handling, write tests, or add extra features. You may suggest improvements at the end of your response, but never implement them unless explicitly asked.

---

## Instruction Files

Look up the relevant file when working in these areas — do not guess at conventions:
| When you're working on... | Read this file |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Auth, access control, roles, permissions, `req.user` | `.github/instructions/auth-system.instructions.md` |
| Database seeding, resetting, fixtures, seedState | `.github/instructions/database-seeding.instructions.md` |
| Email sending, Zeptomail SMTP, React Email templates | `.github/instructions/email-configuration.instructions.md` |
| App Router, data fetching, blocks, route handlers, metadata, images, links, middleware | `.github/instructions/nextjs.instructions.md` |
| Collections, globals, hooks, fields, admin UI, migrations, PayloadCMS config | `.github/instructions/payloadcms.instructions.md` |
| E2E tests in `e2e/` | `.github/instructions/playwright-e2e.instructions.md` |
