# Payload CMS v3 + Next.js 15 Starter Kit

This project provides a comprehensive starter kit for building websites using Payload CMS v3 integrated with Next.js 15 (App Router). It serves as a foundation with common features, best practices, and a clear structure for efficient development.

## Features

*   **Payload CMS v3:** Integrated CMS for managing content.
*   **Next.js 15 App Router:** Modern React framework for the frontend.
*   **Postgres Database:** Powered by Supabase or managed Postgres.
*   **S3 Media Uploads:** Powered by Supabase or managed S3.
*   **Lexical Rich Text Editor:** Powerful and extensible rich text editing.
*   **Block-Based Page Building:** Dynamically render page layouts using predefined Blocks in the `Pages` collection.
*   **Access Control:** Granular control over collection and field access (see `src/accessControl`).
*   **Live Preview:** Real-time preview of draft content changes from the Payload admin panel.
*   **SEO Fields:** Basic SEO meta title and description fields included in the `Pages` collection.
*   **Shadcn/ui:** UI components are managed using Shadcn/ui.
*   **Tailwind CSS:** Utility-first CSS framework for styling.
*   **ESLint & Prettier:** Code linting and formatting configured.
*   **TypeScript:** Strong typing throughout the project.

## Project Structure

```
/
├── public/                     # Static assets
├── src/
│   ├── payload-types.ts        # Auto-generated Payload types
│   ├── payload.config.ts       # Main Payload CMS configuration
│   ├── accessControl/          # Reusable access control functions
│   ├── app/
│   │   ├── (frontend)/         # Next.js frontend routes & layout
│   │   ├── (payload)/          # Payload admin UI routes & layout
│   │   └── preview/            # Routes for Live Preview functionality
│   ├── blocks/                 # Definitions and React components for Page Blocks
│   ├── collections/            # Payload Collection definitions (e.g., Pages, Users, Media)
│   ├── components/             # Shared React components (UI, RichText, etc.)
│   ├── fields/                 # Reusable Payload Field definitions (e.g., slug, link, seo)
│   ├── globals/                # Payload Global definitions (e.g., Header, Footer)
│   ├── hooks/                  # Payload Hooks (e.g., populatePublishedAt)
│   ├── lib/                    # Utility functions and shared types
│   └── providers/              # React Context Providers (e.g., Theme, Collection)
├── next.config.mjs             # Next.js configuration
├── Dockerfile                  # Docker configuration (Optional)
├── docker-compose.yml          # Docker Compose configuration (Optional)
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

### Prerequisites

*   Node.js (v21 or later recommended)
*   npm
*   Postgres database (local or cloud-hosted like Supabase)

### Environment Variables

Create a `.env` file in the root of the project based on the `.env.template` file. If you add new env vars make sure to update the template for others & CI/CD.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd payload-cms-starterkit
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

1.  Start the development server (includes Next.js and Payload):
    ```bash
    npm run dev
    ```
2.  Access the frontend: [http://localhost:3000](http://localhost:3000)
3.  Access the Payload admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

    *   The first time you access the admin panel, you'll be prompted to create an initial admin user.

## Key Concepts

### Payload Configuration (`payload.config.ts`)

This is the heart of the Payload integration (`src/payload.config.ts`). It defines:

*   Collections and Globals available in the CMS.
*   Database adapter (`@payloadcms/db-postgres`).
*   Rich Text editor (`lexicalEditor`).
*   GraphQL and REST API settings.
*   Admin panel customization.
*   Plugins (if any).

### Collections & Globals

*   **Collections:** Define repeatable content structures (e.g., `Pages`, `Users`, `Media`). Found in `src/collections/`. Each collection has its own configuration file defining fields, hooks, access control, and admin UI settings.
*   **Globals:** Define singleton content structures (e.g., `Header`, `Footer`). Found in `src/globals/`. Useful for site-wide settings or content that doesn't repeat.

### Access Control

Access control functions are defined in `src/accessControl/`. These functions determine who can perform read, create, update, or delete operations on Collections and Globals, or access specific fields.

*   `anyone.ts`: Allows access to everyone (public).
*   `isLoggedIn.ts`: Allows access only to authenticated users.
*   `isRole.ts`: Allows access based on user roles (e.g., `admin`).

These functions are imported and used within the `access` properties of Collection and Global configurations. For example, in `src/collections/Users/index.ts`:

```typescript
// Example from src/collections/Users/index.ts
import { isRole } from '../../accessControl/isRole'
import { isLoggedIn } from '../../accessControl/isLoggedIn'
// ...
const Users: CollectionConfig = {
  // ...
  access: {
    read: isLoggedIn, // Logged in users can read user data
    create: isRole('admin'),     // Only admins can create new users
    update: isLoggedIn, // Logged in users can update their own data (or admins)
    delete: isRole('admin'),     // Only admins can delete users
    admin: isRole('admin'), // Only admins can access admin functions for users
  },
  // ...
}
```

For more details, see the [Payload Access Control Documentation](https://payloadcms.com/docs/access-control/overview).

### Block-Based Content (`Pages` Collection)

The `Pages` collection (`src/collections/Pages/index.ts`) uses a `blocks` field type. This allows content editors to build pages dynamically by adding, removing, and reordering predefined "Blocks".

*   **Block Definitions:** Each block is defined in `src/blocks/`. A block typically consists of:
    *   `config.ts`: Defines the Payload fields for the block.
    *   `Component.tsx` / `index.tsx`: The React component responsible for rendering the block on the frontend. Variations (like `Centered.tsx`, `LeftAligned.tsx` for the Hero block) can provide different layouts for the same block data.
*   **Rendering Blocks:** The `src/blocks/RenderBlocks.tsx` component iterates over the `layout` field (the array of blocks) on a Page document and renders the corresponding React component for each block. This is used in the frontend page template (`src/app/(frontend)/[slug]/page.tsx`).

This approach promotes abstract thinking and reusability. New page sections can often be created simply by defining a new Block, without needing to change the core page rendering logic.

Learn more about [Payload Blocks](https://payloadcms.com/docs/fields/blocks).

### Live Preview

This starter kit implements Payload's Live Preview feature:

1.  **Initialization:** Clicking the "Preview" button in the Payload admin panel for a document (like a Page) navigates the user to `/preview/init?url=/path/to/page&token=PAYLOAD_JWT`.
2.  **Listener:** The `src/components/LivePreviewListener.tsx` component (used in the frontend layout `src/app/(frontend)/layout.tsx`) detects the preview state (via cookies set during initialization).
3.  **Data Fetching:** When in preview mode, the listener uses Payload's utility functions to subscribe to changes for the specific document being previewed. It fetches draft versions of the data directly from the Payload API in real-time.
4.  **Rendering:** The fetched draft data is passed down to the page components, allowing instant visualization of unpublished changes.
5.  **Exiting:** Navigating to `/preview/exit` clears the preview cookies and returns the user to the standard published view.

Explore the [Payload Live Preview Documentation](https://payloadcms.com/docs/live-preview/overview) for more information.

### Deployment (Work in Progress)

We intend to deploy this project using:

*   **Vercel:** For hosting the Next.js application.
*   **Supabase:** For hosting the PostgreSQL database.

Configuration and documentation for this deployment strategy are still under development.

## Available Scripts

*   `npm run dev`: Starts the development server (Next.js + Payload).
*   `npm run build`: Builds the Next.js application and Payload admin panel for production.
*   `npm start`: Starts the production server (requires running `build` first).
*   `npm run payload`: Runs Payload-specific commands (e.g., `npm run payload migrate`).
*   `npm run generate:types`: Generates Payload TypeScript types based on your config (`src/payload-types.ts`).
*   `npm run payload generate:importmap`: Generates an import map for Payload collections and globals.
*   `npm run lint`: Lints the codebase using ESLint.

