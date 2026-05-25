---
description: Next.js 15 App Router architecture, server components, and data fetching
applyTo: '{src/app/**,src/middleware.ts,src/components/**,src/blocks/**}'
---

# Next.js 15 Project Patterns

## Data Fetching with PayloadCMS

**Always use `payloadSafeApi.ts` utilities for frontend data fetching**:

```typescript
import { findCollectionSafe, findGlobalSafe } from '@/lib/payloadSafeApi';

const result = await findCollectionSafe({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  locale: 'en',
});
```

**Critical**: PayloadCMS Local API bypasses access control by default. These utilities enforce permissions and pass authenticated user.

**When to bypass**: Server-side scripts, migrations. Use `getPayload({ config })` directly.

## Next.js 15 Specifics

**Caching**: Nothing cached by default. Opt-in with `export const revalidate = 3600` or `dynamic = 'force-static'`.

**Params**: Must await params in Next.js 15:

```typescript
const { slug } = await params; // Required
```

## Project Patterns

### Route Structure

`src/app/(frontend)/[locale]/` - All frontend routes

- `[[...slugArray]]/page.tsx` - Catch-all for pages
- `[slug]/page.tsx` - Dynamic routes
- All routes include `[locale]` for i18n

### Metadata

Use `generateMeta` utility:

```typescript
import { generateMeta } from '@/lib/seoMetadata';
import type { NextMetadataFunc } from '@/lib/sharedTypes';

const generateMetadata: NextMetadataFunc<T> = async ({ params }) => {
  const page = await getPageData();
  return generateMeta({ doc: page });
};
```

### Shared Types

`src/lib/sharedTypes.ts` - Common types:

- `NextPageProps<T>` - Page component props with awaited params
- `NextMetadataFunc<T>` - Metadata generator function
- `NextRouteHandler<T>` - Route handler with typed params

### Admin Context

Wrap pages in `CurrentCollectionHelper` for AdminBar context:

```typescript
import { CurrentCollectionHelper } from '@/components/admin/CurrentCollectionHelper';

<CurrentCollectionHelper collectionSlug="pages" collectionObject={pageData}>
  {children}
</CurrentCollectionHelper>
```

### Blocks

Use `RenderBlocks` for layout blocks:

```typescript
import { RenderBlocks } from '@/blocks/RenderBlocks';
<RenderBlocks blocks={pageData.layout} />
```

Block structure: `src/blocks/BlockName/`

- `config.ts` - Payload block config
- `index.tsx` - Exports config + component
- `components/` - React components

### Route Handlers

Get authenticated user for access control:

```typescript
import { headers } from 'next/headers';
import { getPayload } from 'payload';

const payload = await getPayload({ config });
const { user } = await payload.auth({ headers: await headers() });

// Pass user to queries
await payload.find({ collection: 'x', overrideAccess: false, user });
```

### Images

**Always use `OptimizedImage`** for PayloadCMS media:

```typescript
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Media } from '@/payload-types';

<OptimizedImage
  media={mediaField}
  context="hero" // or 'card', 'thumbnail', etc.
  defaultAlt="Fallback text"
/>
```

Automatically selects best image size, applies focal point, and optimizes loading.

### Links

**Use `linkField` for all link configurations** and `CustomLink` component for rendering:

```typescript
import type { CustomLinkType } from '@/fields/link/config';
import { CustomLink } from '@/components/ui/CustomLink';

// In PayloadCMS config
import { linkField } from '@/fields/link/config';
fields: [
  linkField({ name: 'cta', showButton: true }),
]

// In components
<CustomLink link={data.cta} />
```

Handles both manual URLs and internal relations (pages/stories).

### Path Aliases

Always use `@/` for imports:

```typescript
import type { Page } from '@/payload-types';
import config from '@/payload.config';
```

### Redirects

**Every content page.tsx must call `checkRedirect` before any data fetching.** This performs a single DB query against the `redirects` collection and issues a 301/302 if an active match is found.

```typescript
import { checkRedirect } from '@/lib/checkRedirect';

const MyPage = async ({ params }) => {
  const { slug, locale } = await params;

  // Must be first — before any data fetching
  await checkRedirect(`/${slug}`, locale);

  const data = await getPageData(slug, locale);
  // ...
};
```

- Pass the **locale-stripped path** (e.g. `/about`, `/stories/my-story`)
- Pass `locale` from the route params so the redirect destination is locale-prefixed correctly
- Skip for non-content routes (admin, auth-error, static routes)
- Redirects are managed in the CMS admin under **Navigation → Redirects**

### Search Hotkey

Use `getSearchHotkeyLabel()` from `@/lib/searchHotkey` whenever you need to display the search keyboard shortcut. This ensures consistent platform-aware display (`⌘ Cmd + K` / `Ctrl + K`) across all surfaces.

```typescript
import { getSearchHotkeyLabel } from '@/lib/searchHotkey';

const hotkey = getSearchHotkeyLabel();
// { modifier: '⌘ Cmd', key: 'K', full: '⌘ Cmd + K' }
```
