# Payload CMS v3 + Next.js 15 Starter Kit

A production-ready starter kit for building multilingual, block-based websites with Payload CMS v3 and Next.js 15 (App Router).

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| CMS | Payload CMS v3 |
| Database | PostgreSQL (local or Supabase) |
| Media storage | S3-compatible (Supabase Storage or any S3 provider) |
| Rich text | Lexical editor |
| UI components | shadcn/ui + Tailwind CSS |
| i18n | next-intl (en, ar, fr, es, ru) |
| Email | Nodemailer / Zeptomail SMTP + React Email |
| Error tracking | Sentry |
| E2E tests | Playwright |

## Features

- **Block-based page building** — compose pages from reusable blocks in the Payload admin
- **Granular access control** — `domain:resource:action` permission strings with four built-in roles
- **shadcn/ui + Tailwind CSS** — pre-wired component library with RTL-friendly logical CSS classes
- **S3 media uploads** — pluggable S3-compatible storage (Supabase Storage by default, falls back to local disk)
- **Live preview** — real-time draft preview from the Payload admin panel
- **SEO plugin** — meta title/description on Pages and Stories
- **Search plugin** — full-text search across content
- **Import/export plugin** — export and re-seed collections via JSON fixtures
- **Multilingual** — next-intl locale routing (en, ar, fr, es, ru); RTL-ready throughout
- **Announcement bar global** — site-wide configurable banner
- **Stories collection** — blog/news with categories
- **Altcha CAPTCHA** — spam protection on public-facing forms
- **React Email + Zeptomail SMTP** — transactional emails with pre-built templates
- **Sentry** — error tracking wired up on both client and server

## Project Structure

```
/
├── e2e/                        # Playwright end-to-end tests
├── messages/                   # next-intl translation files (en, ar, fr, es, ru)
├── seed/
│   ├── fixtures/               # JSON fixture files for seeding
│   ├── utils/                  # Seed utilities (relationship mapping, state, etc.)
│   ├── seed.ts                 # Main seed entry point
│   └── seedState.json          # Tracks seeded IDs — do not edit manually
├── src/
│   ├── accessControl/          # Reusable access control functions
│   ├── app/
│   │   ├── (frontend)/         # Next.js frontend routes and layout
│   │   ├── (payload)/          # Payload admin UI routes
│   │   └── preview/            # Live preview init/exit routes
│   ├── blocks/                 # Block configs + React components
│   ├── collections/            # Payload collections (Pages, Stories, StoryCategories, Media, Videos, Users)
│   ├── components/             # Shared React components
│   ├── emailTemplates/         # React Email templates
│   ├── fields/                 # Reusable Payload field definitions
│   ├── globals/                # Payload globals (Header, Footer, AnnouncementBar, StoriesPage)
│   ├── hooks/                  # Payload hooks
│   ├── i18n/                   # next-intl config and routing
│   ├── lib/                    # Utility functions
│   ├── migrations/             # Payload DB migrations
│   ├── providers/              # React context providers
│   ├── payload-types.ts        # Auto-generated — do not edit
│   ├── payload.config.ts       # Main Payload configuration
│   └── plugins.ts              # Payload plugins (SEO, search, storage, import/export)
├── .env.example                # Environment variable template
└── playwright.config.ts        # Playwright configuration
```

## Setup

### Prerequisites

- Node.js v21+
- npm
- PostgreSQL database (local or cloud-hosted)

> **MongoDB**: The repo ships with `@payloadcms/db-postgres`, but Payload supports MongoDB equally well. Swap the adapter in `src/payload.config.ts` and update `DATABASE_URI` in `.env` if you prefer Mongo.

### 1. Clone and install

```bash
git clone <repository-url>
cd payload-cms-starterkit
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URI` | ✅ | PostgreSQL connection string |
| `PAYLOAD_SECRET` | ✅ | Secret key for Payload (JWT signing, etc.) |
| `PREVIEW_SECRET` | ✅ | Secret for live preview token validation |
| `NEXT_PUBLIC_SERVER_URL` | ✅ | Full URL of the app (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_WEBSITE_NAME` | ✅ | Used in the UI and email templates |
| `DEFAULT_THEME` | ✅ | `light` or `dark` |
| `SUPABASE_STORAGE_BUCKET` | S3 only | Storage bucket name |
| `SUPABASE_STORAGE_REGION` | S3 only | Region (omit to use local file storage) |
| `SUPABASE_URL` | S3 only | Supabase project URL |
| `SUPABASE_STORAGE_ACCESS_KEY` | S3 only | S3 access key |
| `SUPABASE_STORAGE_SECRET_KEY` | S3 only | S3 secret key |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | Sentry DSN for error tracking |

> S3 storage is enabled automatically when `SUPABASE_STORAGE_REGION` is set. Without it, Payload falls back to local disk storage — fine for development.

### 3. Run migrations

Run migrations (or just skip straight to seeding — `db:seed` runs migrations automatically):

```bash
npm run db:seed
```

The seed script creates a superadmin user automatically if the database is empty. See [Database Seeding](#database-seeding-workflow) below.

## Development

```bash
npm run dev           # Start dev server with Turbopack (fast refresh)
npm run devsafe       # Clear .next cache, then start dev server (use when you hit stale-cache issues)
```

### Regenerate types

After changing any collection, global, or field config, regenerate Payload's TypeScript types:

```bash
npm run generate:types
```

Never edit `src/payload-types.ts` directly — it is overwritten on every run.

## Database Seeding Workflow

The recommended workflow for a clean local environment is:

```
db:reset → db:seed → regenerate media → run tests
```

### Step-by-step

1. **Reset the database** — drops all tables and clears seed state:
   ```bash
   npm run db:reset
   ```

2. **Seed the database**:
   ```bash
   npm run db:seed
   ```
   If the database has no users, the seed script automatically creates a superadmin. No manual admin setup needed.

3. **Regenerate media sizes** — start the dev server, go to `/admin/collections/media`, click **Regenerate All Media Sizes**.

### Seeded user accounts

After seeding, the following accounts are available:

| Email | Password | Role |
|---|---|---|
| `admin@seed.local` | `SeedAdmin1!` | Superadmin |
| `website-admin@seed.local` | `SeedWebAdmin1!` | Website Admin |
| `editor@seed.local` | `SeedEditor1!` | Website Editor |
| `reader@seed.local` | `SeedReader1!` | Website Reader |

> These are development-only credentials. Never use them in production.

The seed system is resumable. If it fails partway through, re-run `npm run db:seed` — it skips already-processed records using `seed/seedState.json`.

### Fixtures

Fixture files live in `seed/fixtures/`. They are JSON exports from a previous database (via the import/export plugin) and are used as starter content for development and testing. Replace them with project-specific data before production use.

> **Important:** Fixtures must be sorted by `createdAt` ascending so relationship dependencies resolve in the correct order.

### Updating fixtures

1. Make your content changes in the Payload admin.
2. Export the collection via the import/export plugin.
3. Replace the corresponding file in `seed/fixtures/`.
4. Delete `seed/seedState.json` if you want a clean re-seed next time.

## Testing

Playwright E2E tests live in `e2e/`. The suite covers auth flows, access control, blocks, locale switching, navigation, search, and more.

### Run tests

```bash
npm run test:e2e              # Headless, 2 workers
npm run test:e2e:ui           # Playwright UI mode (interactive, 1 worker)
npm run test:e2e:ui:headed    # Playwright UI mode with visible browser
```

Tests require a running server at port 3000. Playwright will use the production build (`npm run start`) and reuse an existing server if one is already listening. In CI, the server must be started separately before running tests.

> **Preferred workflow**: use `db:reset → db:seed → test:e2e` rather than manual browser testing. The seed state is deterministic, so tests always run against the same known data.

### Unit tests

```bash
npm run test:unit     # Vitest, runs tests in src/
```

## Key Concepts

### Collections and Globals

| Name | Type | Description |
|---|---|---|
| `Pages` | Collection | Block-based pages with SEO fields and live preview |
| `Stories` | Collection | Blog/news articles with categories |
| `StoryCategories` | Collection | Taxonomy for Stories |
| `Media` | Collection | Image and file uploads (S3-backed) |
| `Videos` | Collection | Video references |
| `Users` | Collection | Auth users with role-based permissions |
| `Header` | Global | Site header navigation config |
| `Footer` | Global | Site footer config |
| `AnnouncementBar` | Global | Site-wide announcement banner |
| `StoriesPage` | Global | Stories listing page configuration |

### Block-based page building

Pages use a `blocks` field to compose layouts from predefined blocks. Each block lives in `src/blocks/` with a `config.ts` (Payload fields) and a React component. `RenderBlocks.tsx` iterates over the page's `layout` array and renders the matching component for each entry.

Available blocks: `Hero`, `StandardContentBlock`, `SimpleRichTextBlock`, `InfoBlock`, `FloatingMedia`, `MediaInline`, `WideImageBlock`, `ImageGridBlock`, `IconRow`, `InlineItemBlock`, `StoryCards`, `YoutubeEmbed`, `InlineYoutubeEmbed`, `Button`, `ButtonInline`.

### Access control

Permissions follow the pattern `domain:resource:action` (e.g. `website:pages:update`). Four built-in roles are defined in `src/accessControl/roles.ts`:

| Role | Description |
|---|---|
| `superadmin` | Bypasses all permission checks — full system access |
| `website-admin` | Full CRUD on all content; can create and read users |
| `website-editor` | Create/read/update on content; cannot delete or manage users |
| `website-reader` | Read-only access to all content |

Users can hold multiple roles; permissions are additive. The `superadmin` role uses an `isSuper: true` flag rather than listing individual permissions — it short-circuits all access checks.

Access control functions in `src/accessControl/` (`anyone`, `isLoggedIn`, `isAdmin`, `hasPermission`) are imported directly into collection and global configs. `hasPermission` accepts a `PermissionString` and checks it against the requesting user's effective permission set.

### Live preview

1. Click **Preview** in the Payload admin for a Page document.
2. The app routes to `/preview/init`, setting a preview cookie.
3. `LivePreviewListener` subscribes to real-time draft changes from the Payload API.
4. Navigate to `/preview/exit` to leave preview mode.

### i18n

`next-intl` handles locale routing via middleware. Message files are in `messages/` (en, ar, fr, es, ru). Do not inject locale into `href` attributes manually — the middleware handles locale prefixing automatically.

### S3 media

The S3 storage plugin is conditionally enabled based on the presence of `SUPABASE_STORAGE_REGION`. The `Media` collection's `adminThumbnail` builds direct public Supabase Storage URLs, bypassing Payload's API proxy (which is incompatible with `disablePayloadAccessControl`). If you switch to a different storage provider, revisit `src/collections/Media/config.ts`.

## AI Agent Instructions

This repo includes instruction files for AI coding assistants:

- **`.github/copilot-instructions.md`** — always-active rules for GitHub Copilot covering code style, Tailwind conventions, UI component choices, PayloadCMS patterns, and workflow rules
- **`CLAUDE.md`** — references the same instruction files for Claude-based agents
- **`.github/instructions/*.instructions.md`** — topic-specific deep-dives (auth, seeding, email, Next.js App Router, PayloadCMS, Playwright) that agents load on demand based on the files they're editing

Agents working in this repo should be able to operate safely and follow project conventions without manual guidance.

## Deployment

The app is designed to deploy as a Docker container or on Vercel with a managed PostgreSQL database. See `Dockerfile` for container configuration. Ensure all required environment variables are set in your deployment environment.
