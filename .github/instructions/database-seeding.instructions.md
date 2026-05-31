---
description: Database Seeding & State Management guide (resetting, seeding, fixtures, relationship mapping)
applyTo: '{seed/**,e2e/**}'
---

# Database Seeding & State Management

This guide covers how the database seeding system is structured, how to run seeding/reset operations, and how to maintain the system as the schema evolves.

## Seeding for Development & Testing

Seeding is critical for local development and E2E testing (Playwright). The system is designed to be **resumable** (using a state file to track progress) and capable of maintaining complex database relationships when inserting fixtures.

### Quick Start Commands

- **Reset database and start fresh:**
  ```bash
  npm run db:reset
  ```
  *What it does:* Runs `payload migrate:fresh` to drop/recreate schemas, and deletes `seed/seedState.json` to clear tracking history.

- **Seed the database:**
  ```bash
  npm run db:seed
  ```
  *What it does:* Initializes Payload, validates/creates a default superadmin user, and seeds fixtures in dependency order.

## How the Seeding System Works

The code resides in the `seed/` directory.

### 1. Fixture Files (`seed/fixtures/`)
JSON files exported from previous databases containing initial records.
> [!IMPORTANT]
> Fixtures must be sorted by `createdAt` in ascending order (oldest first) so that dependencies are seeded before the objects referencing them.

### 2. State Management (`seed/seedState.json`)
The seeding script updates and reads `seedState.json` to keep track of:
- **`idMap`**: Mapping between the old ID in the JSON fixture and the new auto-incremented database ID (e.g., `"media": {"1": 12, "2": 13}`).
- **`processedRecords`**: Record IDs that have already been imported successfully.
- **`completedCollections`** & **`completedGlobals`**: Mark which schemas are fully completed so they can be skipped on rerun/resume.

### 3. Relationship Processing (`seed/utils/relationMapper.ts`)
When a document is seeded, it may contain references to other documents (e.g., a story referencing a category). The `updatePayloadRelations` helper:
- Recursively processes all fields of a document.
- Finds fields designated as relationships in `seed/utils/relationshipFields.ts`.
- Uses handlers in `seed/utils/relationHandlers/` to map old fixture IDs to the new database IDs using the `idMap` in `seedState.json`.

### 4. Dependency Order
To ensure references exist before mapping them, collections are seeded in this order:
1. **Independent collections**: `media`, `videos`, `story-categories`
2. **Dependent collections**: `stories`, `pages`
3. **Globals**: `header`, `footer`, `stories-page`

## Maintaining the Seeding System

When you add new collections, globals, or relationships, update the seeding system to prevent import failures.

### Adding a New Collection
1. **Export Fixture:** Export data as a JSON array from the Payload admin panel, sorted by `createdAt` ascending, and save to `seed/fixtures/new-collection.json`.
2. **Register Fixture:** Add the mapping to `COLLECTION_FIXTURES` in `seed/utils/types.ts`.
3. **Update State Types:** Add the collection slug to the `IdMap` and `ProcessedRecords` interfaces in `seed/utils/types.ts` and default state structure in `seed/utils/seedState.ts`.
4. **Wire into Seeding Order:** Call `seedCollection('new-collection', ...)` at the appropriate place in `seed/seed.ts`.

### Registering Relationship Fields
If a field references another collection (e.g., `author` field referencing `users`):
1. **Create Handler:** Create a handler in `seed/utils/relationHandlers/yourHandler.ts` that resolves the old ID to the new database ID using `currentIdMap['your-collection'][oldId]`.
2. **Export & Register:** Register the handler in `seed/utils/relationshipFields.ts` under the field name (for standard fields) or the collection slug (for polymorphic `relationTo` fields).
