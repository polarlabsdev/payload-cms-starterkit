---
description: Authentication & authorization system (dual auth, roles, permissions)
applyTo: '{src/collections/**,src/globals/**,src/fields/**,src/accessControl/**,src/lib/{portalAuth,payloadSafeApi}.ts,src/app/**/api/portal/auth/**,src/hooks/payload/**}'
---

# Authentication & Authorization System

This project uses a **multi-role, permission-based access control system** with domain scoping. This is the authoritative guide for all authentication and authorization concepts in this codebase.

## Dual Authentication System

This application implements **two separate authentication systems**:

### Admin Authentication (Users Collection)

**Purpose**: CMS administration and content management

**Collection**: `Users` (`src/collections/Users/config.ts`)

**Authentication Method**: Traditional username/password login

**Access**: Admin panel at `/admin`

**Roles**: `superadmin`, `website-admin`, `website-editor`, `portal-admin`, `portal-editor`, `portal-reader`

**Cookie**: Standard PayloadCMS authentication cookie

**Use Cases**:

- CMS administrators managing content
- Website editors creating/editing pages and stories
- Portal administrators managing portal users and content

### Portal Authentication (PortalUsers Collection)

**Purpose**: Passwordless authentication for portal users

**Collection**: `PortalUsers` (`src/collections/PortalUsers/config.ts`)

**Authentication Method**: Magic link (passwordless email authentication)

**Access**: Portal at `/portal`

**Roles**: `portal-user` (default), plus any admin roles assigned

**Cookie**: `portal-token` (separate from admin auth)

**Use Cases**:

- Portal users accessing protected resources
- Case management and portal-specific functionality
- Secure access without password management

**Complete Documentation**: See `.github/instructions/magic-link-authentication.instructions.md` for detailed implementation of the magic link authentication system, including:

- Request/verification flow
- JWT token structure
- Security audit logging
- Email configuration
- Request correlation system

**Key Differences**:

| Feature        | Admin (Users)                       | Portal (PortalUsers)              |
| -------------- | ----------------------------------- | --------------------------------- |
| Login Method   | Username/Password                   | Magic Link (Email)                |
| Cookie Name    | (default Payload)                   | `portal-token`                    |
| Collection     | `users`                             | `portal-users`                    |
| Auth Strategy  | Built-in                            | Custom (`authenticatePortalUser`) |
| Access Logs    | PayloadCMS default session tracking | Full audit trail                  |
| Session Length | 30 days (default)                   | 12 hours                          |

## Core Concepts

### Permission Structure

Permissions follow the pattern: `domain:resource:action`

- **domain**: The scope of access - `system`, `website`, or `portal`
  - `system`: CMS infrastructure (users, admin panel, etc.)
  - `website`: Public-facing website content (pages, stories, etc.)
  - `portal`: Authenticated user portal content (cases, portal pages, etc.)
- **resource**: The collection, global, or functionality being accessed
- **action**: The operation being performed - `create`, `read`, `update`, or `delete`

**Examples:**

- `website:pages:create` - Create pages on the website
- `system:users:update` - Update user records
- `portal:cases:read` - Read case data in the portal
- `system:adminPanel:read` - Access the admin panel UI

### Role System

**Key Principle:** Users can have **multiple roles simultaneously**, and permissions are **additive** - a user gains all permissions from all assigned roles.

**Role Definition Location:** `src/accessControl/roles.ts`

Each role object contains:

- `name`: Human-readable display name
- `description`: Purpose and scope of the role
- `permissions`: Array of permission strings (format: `domain:resource:action`)
- `isSuper`: Optional boolean - when `true`, bypasses all permission checks (superadmin only)

**Example Role Structure:**

```typescript
'website-editor': {
  name: 'Website Editor',
  description: 'Can create and edit website content',
  permissions: [
    'website:pages:create',
    'website:pages:read',
    'website:pages:update',
    'website:stories:create',
    // ... more permissions
  ],
}
```

### Domain Scoping Pattern

Use the `scope()` helper function in `roles.ts` to generate permissions efficiently:

- `scope('website', 'pages', 'all')` - Generates all CRUD permissions for website pages
- `scope('portal', 'cases', 'read')` - Generates only read permission for portal cases

## Access Control Implementation

### Collection-Level Access Control

**Implementation Location:** Collection config files (e.g., `src/collections/Pages/config.ts`)

**Pattern:**

```typescript
import { hasPermission } from '@/accessControl/hasPermission';

export const YourCollection: CollectionConfig = {
  slug: 'your-resource',
  access: {
    create: hasPermission('domain:your-resource:create'),
    read: hasPermission('domain:your-resource:read'),
    update: hasPermission('domain:your-resource:update'),
    delete: hasPermission('domain:your-resource:delete'),
  },
  // ... fields
};
```

### Field-Level Access Control

For sensitive fields that require granular permissions:

```typescript
import { hasPermissionField } from '@/accessControl/hasPermission';

{
  name: 'sensitiveField',
  type: 'text',
  access: {
    create: hasPermissionField('domain:resource:create'),
    update: hasPermissionField('domain:resource:update'),
    read: hasPermissionField('domain:resource:read'),
  },
}
```

### UI-Level Access Control

**For React Components:**

```typescript
import { hasPermissionCheck, isSuperUser } from '@/accessControl/roles';

// Check if user has specific permission
if (hasPermissionCheck(user.roles, 'system:adminPanel:read')) {
  // Show admin UI
}

// Check if user is superadmin
if (isSuperUser(user.roles)) {
  // Show superadmin-only features
}
```

## PayloadCMS Local API & Access Control

### Critical Behavior

**PayloadCMS Local API defaults to `overrideAccess: true`** - meaning it **bypasses all access control by default**. This is opposite to the REST/GraphQL APIs.

**Why This Matters:**

- Server-side operations (hooks, migrations, seeds) need full access - default makes sense
- Frontend operations (Server Components, API routes) need to respect access control - default is dangerous

### Safe API Utilities

**Implementation Location:** `src/lib/payloadSafeApi.ts`

These utilities enforce access control on the frontend:

**For Collections:**

```typescript
import { findCollectionSafe } from '@/lib/payloadSafeApi';

const result = await findCollectionSafe({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  limit: 1,
});

// Returns null if access denied, full result object if allowed
if (!result) {
  return notFound(); // Handle permission error
}
```

**For Globals:**

```typescript
import { findGlobalSafe } from '@/lib/payloadSafeApi';

const headerData = await findGlobalSafe({
  slug: 'header',
});

// Returns null if access denied
if (!headerData) {
  return null; // Handle gracefully
}
```

**What These Utilities Do:**

1. Set `overrideAccess: false` to enforce access control rules
2. Retrieve authenticated user from request headers via `payload.auth()`
3. Pass user to Local API operations
4. Support draft mode (bypasses access for admin preview)
5. Catch permission errors, log them, and return `null`

### When to Use Safe vs Direct API

**Use Safe Utilities (`findCollectionSafe`, `findGlobalSafe`):**

- ✅ Frontend Server Components
- ✅ API Route handlers that need access control
- ✅ Any data fetching where permissions should be respected

**Use Direct Local API:**

- ✅ Hooks (already within Payload's context)
- ✅ Access control functions (you're defining the rules)
- ✅ Migrations and seeds (need full access)
- ✅ Server-side scripts (administrative operations)

## Adding New Resources

When adding a new collection or global requiring access control:

1. **Update Resource Types** in `src/accessControl/roles.ts`:

   ```typescript
   type WebsiteResource = 'pages' | 'stories' | 'your-new-resource'; // Add here
   ```

2. **Add Permissions to Relevant Roles** in `src/accessControl/roles.ts`:

   ```typescript
   'website-admin': {
     name: 'Website Admin',
     permissions: [
       ...scope('website', 'your-new-resource', 'all'),
       // ... other permissions
     ],
   },
   ```

3. **Apply Access Control** in collection config:

   ```typescript
   import { hasPermission } from '@/accessControl/hasPermission';

   export const YourCollection: CollectionConfig = {
     slug: 'your-new-resource',
     access: {
       create: hasPermission('website:your-new-resource:create'),
       read: hasPermission('website:your-new-resource:read'),
       update: hasPermission('website:your-new-resource:update'),
       delete: hasPermission('website:your-new-resource:delete'),
     },
   };
   ```

4. **Run Migration:**
   ```bash
   npm run payload migrate
   ```

## Legacy System Compatibility

The codebase maintains backward compatibility with an older single-role system:

- **Deprecated `role` field:** Hidden field on users (do not use in new code)
- **`isAdminCheck(user)`:** Checks both legacy `role === 'admin'` AND new `superadmin` role
- **Purpose:** Allows existing admin users to continue working during transition

**For New Code:** Always use the `roles` array and permission system. Never reference the `role` field.

## Protected Roles

The `superadmin` role has special protections:

**Implementation:** `src/hooks/payload/protectSuperadminRole.ts` (field hook on Users collection)

**Rules:**

- First user created can be assigned superadmin (initial setup)
- Only admins (legacy or superadmin) can assign/remove superadmin role
- Prevents privilege escalation attacks

## Common Patterns

### Checking Admin Panel Access

```typescript
import { hasPermissionCheck } from '@/accessControl/roles';

const canAccessAdmin = hasPermissionCheck(user.roles, 'system:adminPanel:read');
```

### Conditional UI Rendering

```typescript
{user && hasPermissionCheck(user.roles as RoleName[], 'system:adminPanel:read') && (
  <AdminBar />
)}
```

### Frontend Data Fetching with Access Control

```typescript
const result = await findCollectionSafe({
  collection: 'portal-pages',
  where: { id: { equals: id } },
});

if (!result) {
  return notFound(); // Permission denied or not found
}
```

### Allowing Self-Edits

```typescript
import { canEditUsersOrSelf } from '@/accessControl/hasPermission';

access: {
  update: canEditUsersOrSelf('system:users:update'),
}
```

## Error Handling

Permission errors are handled gracefully:

- **Collections/Pages:** Return 404 (via `notFound()`)
- **Globals:** Return `null` and render fallback/skeleton UI
- **Blocks:** Return `null` to hide the block
- **All cases:** Log error to console for debugging
- **Safe utilities return `null` on permission errors** - handle gracefully downstream
- **Always use `roles` array**, never deprecated `role` field
- **Reference implementations** in `src/accessControl/` for details
