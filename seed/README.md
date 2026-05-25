# Database Seeding Guide

This guide covers how to seed a new PayloadCMS database with sample data and how to maintain the seeding system as the project evolves.

## Quick Start: Seeding a New Database

Follow these steps to seed a fresh database for development:

### Prerequisites

1. Ensure you have a local PostgreSQL database running
2. Your `.env` file should contain the correct `POSTGRES_URL` and `PAYLOAD_SECRET`
3. You must have at least one admin user created in the system

### Step-by-Step Instructions

1. **Reset the database and clear seed state:**

   ```bash
   npm run db:reset
   ```

   This command will:
   - Run `payload migrate:fresh` to reset the database schema
   - Delete the `seedState.json` file to start fresh

2. **Create an admin user (if none exists):**

   ```bash
   npm run dev
   ```

   - Visit `/admin` in your browser
   - Create your first admin user
   - Stop the dev server when done

3. **Run the seed script:**

   ```bash
   npm run db:seed
   ```

   This will populate your database with all the sample data from the fixture files.

4. **Regenerate media sizes (final step):**
   - Start the dev server: `npm run dev`
   - Go to `/admin/collections/media`
   - Click the "Regenerate All Media Sizes" button

Your database is now fully seeded and ready for development!

## How the Seed System Works

The seeding system is designed to be robust, resumable, and handle complex relationships between collections. Here's how it works:

### Core Architecture

The seed system consists of several key components:

#### 1. Fixture Files (`/fixtures/`)

- JSON exports from a previous database using the PayloadCMS import/export plugin
- **Critical**: Fixtures must be ordered by `createdAt` ascending (oldest first) to handle dependencies properly
- Each collection and global has its own fixture file

#### 2. Seed State Management (`seedState.json`)

The system maintains a persistent state file that tracks:

- **ID Mappings**: Maps old fixture IDs to new database IDs for relationship handling
- **Processed Records**: Tracks which individual records have been processed
- **Completed Collections/Globals**: Tracks which collections/globals are fully complete
- **Resume Capability**: Allows the seed process to resume if interrupted

#### 3. Relationship Handling

The system automatically updates relationship fields by:

- Mapping old IDs to new IDs using the state file
- Converting object relationships to ID references
- Handling special cases (e.g., all user relationships point to user ID 1)

#### 4. Dependency Order

Collections are seeded in dependency order:

1. **Independent collections first**: `media`, `story-categories`
2. **Dependent collections**: `stories`, `pages`
3. **Globals last**: `header`, `footer`, `stories-page` (may reference collections)

### Key Files Explained

#### `seed.ts` - Main Entry Point

- Orchestrates the entire seeding process
- Loads/saves seed state
- Handles cleanup and error recovery
- Calls `seedCollection()` and `seedGlobal()` in the correct order

#### `utils/seedState.ts` - State Management

- Persists seeding progress to `seedState.json`
- Enables resumable seeding operations
- Tracks ID mappings and completion status

#### `utils/seedCollection.ts` - Collection Seeding

- Handles individual collection seeding
- Processes relationship fields
- Supports both normal collections and upload collections (media/documents)
- Skips already-processed records

#### `utils/seedGlobal.ts` - Global Seeding

- Similar to collection seeding but for global configs
- Updates existing globals rather than creating new ones

#### `utils/relationMapper.ts` - Relationship Processing

- Recursively processes all fields in a document
- Uses relationship handlers to update ID references
- Handles both direct ID references and populated relationships

#### `utils/relationshipFields.ts` - Field Configuration

- Maps field names to their relationship handlers
- Defines which fields need relationship processing
- Extensible for new relationship types

#### `utils/relationHandlers/` - Specific Handlers

Each handler deals with a specific type of relationship:

- `userHandler.ts` - Maps all user relationships to user ID 1
- `mediaHandler.ts` - Maps media relationships using ID mapping
- `categoryHandler.ts` - Maps story category relationships
- `tagHandler.ts` - Maps FAQ tag relationships
- `storyHandler.ts` - Maps story relationships
- `documentHandler.ts` - Maps document relationships
- `pageHandler.ts` - Maps page relationships
- `relationToHandler.ts` - Handles polymorphic `relationTo` fields

## Maintaining the Seed System

As you add new collections, globals, or relationship fields to your PayloadCMS setup, you'll need to update the seeding system accordingly.

### Adding a New Collection

When you add a new collection to your PayloadCMS config:

#### 1. Generate and Add Fixture Data

Export the new collection data from your development/staging environment using the PayloadCMS admin panel:

1. Go to `/admin/collections/your-collection-name` in your browser
2. Click the **three dots menu (⋯)** next to the "Filters" button
3. Select **"Export"** from the dropdown menu
4. In the export dialog:
   - **Name**: Give it a descriptive name (e.g., "Your Collection Export")
   - **Fields**: Select all fields you want to include (usually select all)
   - **Sort**: Set to `createdAt` **ascending** (oldest first) - this is critical for dependency handling
   - **Format**: Choose **JSON** (not CSV)
5. Click "Export" and download the file
6. Save it as `fixtures/yourCollectionName.json` in your seed directory

**Important**: The fixture data must be sorted by `createdAt` ascending to ensure proper dependency handling during seeding.

#### 2. Update Type Definitions

In `utils/types.ts`, add your collection to the relevant interfaces:

```typescript
// Add to IdMap interface
export interface IdMap {
  // ... existing collections
  'your-collection': Record<number, number>;
}

// Add to ProcessedRecords interface
export interface ProcessedRecords {
  // ... existing collections
  'your-collection': Set<number>;
}

// Add to COLLECTION_FIXTURES
export const COLLECTION_FIXTURES = {
  // ... existing fixtures
  'your-collection': 'yourCollectionName.json',
} as const;
```

#### 3. Update Seed State Management

In `utils/seedState.ts`, update the `createInitialState()` function:

```typescript
const createInitialState = (): SeedState => ({
  idMap: {
    // ... existing collections
    'your-collection': {},
  },
  processedRecords: {
    // ... existing collections
    'your-collection': new Set<number>(),
  },
  // ... rest of state
});
```

Also update the `loadSeedState()` and `saveSeedState()` functions to handle the new collection.
_TODO: This shouldn't be necessary, too many places to edit when it is typed._

#### 4. Add Relationship Handlers (if needed)

If your collection has relationships to other collections (or others have relationships to the new one):

Create `utils/relationHandlers/yourCollectionHandler.ts`:

```typescript
import { RelationshipHandler, IdMap } from '../types';

export const handleYourCollectionRelationship: RelationshipHandler = (
  value: unknown,
  currentIdMap: IdMap,
): unknown => {
  // Handle null/undefined
  if (value === null || value === undefined) {
    return null;
  }

  // Handle direct ID
  if (typeof value === 'number') {
    const newId = currentIdMap['your-collection'][value];
    if (newId) {
      console.log(`  🔗 Mapping your-collection relationship: ${value} → ${newId}`);
      return newId;
    }
    return value;
  }

  // Handle object with id property
  if (value && typeof value === 'object' && 'id' in value) {
    const newId = currentIdMap['your-collection'][value.id as number];
    if (newId) {
      console.log(`  🔗 Mapping your-collection relationship: ${value.id} → ${newId}`);
      return newId;
    }
    return value.id;
  }

  return value;
};
```

#### 5. Register Relationship Fields

In `utils/relationshipFields.ts`, add mappings for any fields that reference your collection:

```typescript
export const RELATIONSHIP_FIELDS: Record<string, RelationshipHandler> = {
  // ... existing fields
  yourCollectionField: handleYourCollectionRelationship,
};

// If your collection can be referenced via relationTo fields:
export const COLLECTION_HANDLERS: Record<string, RelationshipHandler> = {
  // ... existing handlers
  'your-collection': handleYourCollectionRelationship,
};
```

#### 6. Add to Main Seed Script

In `seed.ts`, add the seeding call in the appropriate dependency order:

```typescript
// Add in the correct order based on dependencies
await seedCollection(
  'your-collection',
  path.join(FIXTURES_PATH, COLLECTION_FIXTURES['your-collection']),
  payload,
  state,
);
```

### Adding a New Global

For globals, the process is similar but simpler:

#### 1. Add Fixture Data

- Export the global data and save as `fixtures/yourGlobalName.json`

#### 2. Update Types

```typescript
export const GLOBAL_FIXTURES = {
  // ... existing globals
  'your-global': 'yourGlobalName.json',
} as const;
```

#### 3. Add to Seed Script

```typescript
await seedGlobal(
  'your-global',
  path.join(FIXTURES_PATH, GLOBAL_FIXTURES['your-global']),
  payload,
  state,
);
```

### Adding New Relationship Field Types

When you add new types of relationship fields:

1. **Create a handler** in `utils/relationHandlers/yourFieldHandler.ts`
2. **Export it** from `utils/relationHandlers/index.ts`
3. **Register it** in `utils/relationshipFields.ts`
4. **Test it** by running the seed script

### Best Practices

1. **Always test the full seed process** after making changes
2. **Keep fixture data up to date** - regenerate fixtures when your data model changes significantly
3. **Document new relationship patterns** - if you create complex relationship handlers, document them
4. **Maintain dependency order** - ensure collections are seeded in the correct order
5. **Handle edge cases** - make sure your relationship handlers can handle null values, arrays, and different data structures

### Troubleshooting

#### Common Issues:

1. **"No users found" error**: Create an admin user first via `/admin`
2. **Relationship mapping errors**: Check that collections are seeded in dependency order
3. **"Already processed" messages**: Delete `seedState.json` to start fresh
4. **Type errors**: Run `npm run generate:types` to update PayloadCMS types

#### Starting Fresh:

```bash
npm run db:reset  # Resets database and clears seed state
npm run db:seed   # Runs the complete seed process
```

#### Resuming Interrupted Seeding:

Just run `npm run db:seed` again - the system will resume where it left off using the `seedState.json` file.
