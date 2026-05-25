---
description: PayloadCMS v3 backend architecture for collections, globals, hooks, and access control
applyTo: '{src/collections/**,src/globals/**,src/payload.config.ts,src/hooks/**,src/fields/**,src/plugins.ts}'
---

# PayloadCMS v3 Project Patterns

## Core Setup

**Database**: Drizzle ORM with PostgreSQL

- Auto-migration disabled (`push: false`)
- Schema changes require manual migrations
- Note when planning changes that migrations are needed
- [Migrations Docs](https://payloadcms.com/docs/database/migrations) - consult for creating and running migrations

**Config**: `src/payload.config.ts` imports all collections/globals

- [Config Overview](https://payloadcms.com/docs/configuration/overview) - reference for config structure and options

**Access Control**: See `auth-system.instructions.md` for permission patterns

## Project Structure

**Collections**: `src/collections/CollectionName/`

- `config.ts` - Collection config
- `access/` - Custom access control (optional)
- `components/` - Admin UI components (optional)

**Globals**: `src/globals/GlobalName/`

- `config.ts` - Global config
- `components/` - Admin UI components (optional)

**Fields**: `src/fields/fieldName/`

- Reusable field generator functions
- Export TypeScript types for frontend

**Hooks**: `src/hooks/payload/`

- Individual reusable hooks
- Import into collection/global configs

**Blocks**: `src/blocks/BlockName/`

- `config.ts` - Block configuration
- `index.tsx` - Re-exports
- `components/` - React components

### TypeScript

**Type-Safe Collections**:

```typescript
// Pass slug as generic for defaultPopulate type safety
export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  defaultPopulate: {
    title: true, // Type-safe field names
    slug: true,
  },
};
```

**Generated Types**:

```typescript
import type { Page, Story } from '@/payload-types';
// Never manually create - always generated
```

### Reusable Field Generators

Create typed functions for common field patterns:

```typescript
// src/fields/slugField/index.ts
import type { TextField, PermissionString } from 'payload';

type SlugFieldGenerator = (
  sourceField: string,
  options: { editPermission: PermissionString; inSidebar?: boolean },
) => TextField;

export const genSlugField: SlugFieldGenerator = (sourceField, options) => {
  // Return configured field
};
```

**Export types for frontend**:

```typescript
// In src/fields/link/config.ts
export type CustomLinkType = {
  linkType?: 'manual' | 'relation';
  url?: string;
  relationTo?: /* ... */;
  label?: string | null;
  // ...
};
```

**Key field generators**:

- `genSlugField` - Auto-slug with permission control
- `linkField` - Links with manual/internal options (see `CustomLinkType`)
- `themeAwareImageField` - Light/dark image variants
- SEO, lexical editors - in `src/fields/`

**When adding new field types**: [Fields Reference](https://payloadcms.com/docs/fields/overview) - shows all available field types and their properties

### Admin UI

**Grouping** (`admin.group`):

- `'Content'` - Public content (Pages, Stories)
- `'Portal'` - Portal collections
- `'Navigation'` - Header, Footer
- `'System'` - Users, Media

**Sidebar Fields**: Use `admin.position: 'sidebar'` for metadata (title, slug, publishedAt)

**Custom Components**:

```typescript
admin: {
  components: {
    beforeList: ['@/collections/Pages/HomePageInfo'],
  },
}
```

**IMPORTANT — Admin components must use a default export.** Payload resolves component paths by default export only. Always write:

```tsx
// ✅ Correct
export default function MyComponent() { … }

// ❌ Wrong — will throw "does not contain a default export"
export const MyComponent = () => { … }
```

This applies to every component slot: `Field`, `beforeList`, `beforeListTable`, `Description`, `edit.*`, and any other `admin.components` value.

### Database Naming

Use `dbName` for snake_case columns:

```typescript
{
  name: 'navItems',
  dbName: 'nav_items',
  type: 'array',
}
```

### Localization

Add `localized: true` for multi-language content:

```typescript
{
  name: 'title',
  type: 'text',
  localized: true,
}
```

### Access Control

For complex logic, create functions in `access/` directory:

```typescript
// src/collections/PortalUsers/access/canEditPortalUsersOrSelf.ts
export const canEditPortalUsersOrSelf = (permission: string): Access => {
  return ({ req: { user } }) => {
    // Custom logic
  };
};
```

### Hooks Patterns

**Auto-populate fields**:

```typescript
hooks: {
  beforeChange: [({ data, operation }) => {
    if (operation === 'create' && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    return data;
  }],
}
```

**Access Payload in hooks**:

```typescript
afterChange: [async ({ doc, req }) => {
  await req.payload.update({
    collection: 'other',
    id: doc.relatedId,
    data: { /* ... */ },
  });
}],
```

**When working with hooks**: [Hooks Overview](https://payloadcms.com/docs/hooks/overview) - reference for hook lifecycle, arguments, and patterns

**Validation errors in hooks**: Throw `ValidationError` from `'payload'` to surface field-level errors in the admin UI:

```typescript
import { ValidationError } from 'payload';
import type { CollectionBeforeChangeHook } from 'payload';

export const myValidationHook: CollectionBeforeChangeHook = async ({ data }) => {
  if (someInvalidCondition) {
    throw new ValidationError({
      errors: [{ path: 'fieldName', message: 'Descriptive error message.' }],
    });
  }
  return data;
};
```

**Redirects collection** (`src/plugins.ts`): Uses `useAsTitle: 'from'` so the admin list view is searchable by the source URL.

## Key Documentation

**Consult these when**:

### Collections & Globals

- [Collections](https://payloadcms.com/docs/configuration/collections) - defining new collections, config options
- [Globals](https://payloadcms.com/docs/configuration/globals) - singleton content configuration

### Fields & Relationships

- [Fields Overview](https://payloadcms.com/docs/fields/overview) - all field types and properties
- [Relationship Fields](https://payloadcms.com/docs/fields/relationship) - polymorphic relations, filtering, depth control
- [Blocks](https://payloadcms.com/docs/fields/blocks) - flexible content blocks architecture

### Hooks & Lifecycle

- [Collection Hooks](https://payloadcms.com/docs/hooks/collections) - beforeChange, afterChange, etc.
- [Field Hooks](https://payloadcms.com/docs/hooks/fields) - field-level transformation
- [Context](https://payloadcms.com/docs/hooks/context) - passing data between hooks

### Access & Permissions

- [Access Control](https://payloadcms.com/docs/access-control/overview) - document and field-level security
- [Functions](https://payloadcms.com/docs/access-control/functions) - access control function patterns

### Queries & API

- [Local API](https://payloadcms.com/docs/local-api/overview) - server-side database operations
- [Queries](https://payloadcms.com/docs/queries/overview) - where conditions, sorting, pagination

### Admin Customization

- [Admin Config](https://payloadcms.com/docs/admin/overview) - customizing admin panel
- [Custom Components](https://payloadcms.com/docs/admin/components) - React components in admin UI
