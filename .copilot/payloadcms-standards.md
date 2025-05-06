# PayloadCMS v3 & Next.js 15 - Agent Guidelines

## Architecture Understanding

1. **Core Concept**: PayloadCMS v3 integrates directly into Next.js applications as a unified full-stack system.
2. **Configuration-Driven**: All aspects of the CMS are defined through a central `payload.config.ts` file.
3. **Database Agnostic**: Support MongoDB (via Mongoose) or PostgreSQL/SQLite (via Drizzle).
4. **3-Tier API**: Always use the most appropriate API for the context:
   - Local API for server-side operations (fastest, bypasses HTTP)
   - REST API for standard external HTTP access
   - GraphQL API for complex, specific data requirements

Basic configuration example:

```typescript
// payload.config.ts
import { buildConfig } from 'payload/config';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import Users from './collections/Users';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  admin: { user: 'users' },
  collections: [Users],
  db: mongooseAdapter({ url: process.env.MONGODB_URI || '' }),
  editor: lexicalEditor({}),
});
```

## Local API Usage Rules

1. **Access Method**:
   - Use `getPayload({ config })` in Server Components and standalone scripts
   - Access via `req.payload` in hooks, access control, and custom endpoints
2. **Operation Structure**: Always provide the required collection name and any necessary parameters
3. **Performance Rule**: Specify only needed fields using `select` and control relationship depth
4. **Access Control**: Use `overrideAccess: false` when respecting defined access control is needed

Server Component example:

```typescript
// app/products/page.tsx
import React from 'react';
import { getPayload } from 'payload';
import config from '../../payload.config';

const ProductsPage = async () => {
  const payload = await getPayload({ config });
  
  const products = await payload.find({
    collection: 'products',
    where: { active: { equals: true } },
    select: ['title', 'price'], // Only needed fields
    depth: 1, // Control relationship depth
  });

  return <div>{/* Render products */}</div>;
};
```

Hook example:

```typescript
// collections/Orders.ts (hook definition)
import { CollectionAfterChangeHook } from 'payload/types';

const afterChangeHook: CollectionAfterChangeHook = async ({ 
  req: { payload }, 
  doc 
}) => {
  // Update inventory after order
  await payload.update({
    collection: 'inventory',
    id: doc.product.id,
    data: { stockLevel: { decrement: doc.quantity } },
  });
};
```

## Collection Configuration Rules

1. **Logical Organization**: Define each collection in its own file, export, and import into main config
2. **Naming Convention**: Use descriptive, plural slugs for collections (e.g., 'posts', 'products')
3. **Required Properties**: Always define `slug`, `fields`, and appropriate `access` controls
4. **Admin UI Enhancement**: Configure `admin.useAsTitle`, `defaultColumns`, and `listSearchableFields`
5. **Field Strategy**: Group related fields using `group`, `tabs`, or `collapsible` for complex schemas
6. **Collection vs Global Rule**: Use Collections for repeatable content and Globals for singleton content

Collection example:

```typescript
// collections/Products.ts
import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'active'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: false,
    }
  ],
};

export default Products;
```

Global example:

```typescript
// globals/SiteSettings.ts
import { GlobalConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'footerText',
      type: 'richText',
    },
  ],
};

export default SiteSettings;
```

## Field Type Selection Rules

1. **Data Fields**: For storing information, use appropriate types (text, number, relationship, etc.)
2. **Presentational Fields**: For organizing Admin UI, use row, collapsible, tabs without storing data
3. **Virtual Fields**: For computed data like `join`, display calculated information from other sources
4. **Rich Text Rule**: For formatted content, use Lexical editor with well-defined node structure

Organized fields example:

```typescript
// collections/Pages.ts (partial)
import { CollectionConfig } from 'payload/types';

const Pages: CollectionConfig = {
  // ...
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'content', type: 'richText' },
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                { name: 'metaTitle', type: 'text' },
                { name: 'metaDescription', type: 'textarea' },
              ]
            }
          ]
        }
      ]
    }
  ]
};
```

## Relationship Field Rules

1. **Cardinality Setting**: Use `hasMany: false` for one-to-one, `hasMany: true` for one-to-many
2. **Multiple Collections**: Use array syntax for `relationTo` when linking to different collections
3. **Filtering Rule**: Use `filterOptions` for context-dependent relationship options
4. **Performance Optimization**: Define appropriate `depth` when querying to avoid over-fetching

Relationship examples:

```typescript
// collections/BlogPosts.ts (partial)
import { CollectionConfig } from 'payload/types';

const BlogPosts: CollectionConfig = {
  // ...
  fields: [
    // One-to-one relationship
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    
    // One-to-many relationship
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    
    // Polymorphic relationship
    {
      name: 'relatedContent',
      type: 'relationship',
      relationTo: ['blog-posts', 'products'],
      hasMany: true,
    },
    
    // Filtered relationship
    {
      name: 'recommendedProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ siblingData }) => {
        if (!siblingData.categories?.length) return true;
        
        return {
          categories: {
            in: siblingData.categories
          }
        };
      },
    }
  ]
};
```

## Next.js Integration Rules

1. **Server Components Rule**: Access Local API directly in Server Components for data fetching
2. **Route Handlers Rule**: Use Local API in API routes for mutations while respecting access control
3. **Caching Awareness**: In Next.js 15, explicitly opt into caching with appropriate strategies
4. **Revalidation Strategy**: Implement granular cache invalidation using on-demand revalidation

Server Component example:

```typescript
// app/blog/[slug]/page.tsx
import React from 'react';
import { getPayload } from 'payload';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import config from '../../../payload.config';

// Cache payload instance
const getPayloadInstance = cache(async () => {
  return await getPayload({ config });
});

export const revalidate = 3600; // Revalidate every hour

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const payload = await getPayloadInstance();
  
  const posts = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: params.slug } },
    depth: 1,
  });
  
  if (!posts.docs[0]) return notFound();
  
  return (
    <article>
      <h1>{posts.docs[0].title}</h1>
      {/* Render content */}
    </article>
  );
};
```

Revalidation example:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { collection, slug, tag } = await request.json();
  
  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag });
  } else if (collection && slug) {
    const path = `/${collection}/${slug}`;
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }
  
  return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
}
```

## Hooks Implementation Rules

1. **Lifecycle Selection**: Choose the appropriate hook for your operation:
   - `beforeValidate`/`beforeChange`: For data transformation or validation
   - `afterChange`/`afterRead`: For side effects after operations complete
   - `beforeDelete`/`afterDelete`: For handling cleanup or preventing deletion
2. **Context Passing**: Use the `context` parameter to pass data between hooks
3. **Transaction Rule**: Maintain atomicity by performing related operations within the same hook
4. **Async Operation**: Always return promises or use async/await for asynchronous hook operations

Hooks examples:

```typescript
// collections/Products.ts (partial)
import { CollectionConfig } from 'payload/types';
import slugify from 'slugify';

// Generate slug from title
const generateSlug = async ({ data, operation }) => {
  if (operation === 'create' && data.title) {
    data.slug = slugify(data.title.toLowerCase());
  }
  return data;
};

// Prevent deletion if product has orders
const checkRelatedOrders = async ({ req: { payload }, id }) => {
  const orders = await payload.find({
    collection: 'orders',
    where: { 'items.product': { equals: id } },
    limit: 1,
  });
  
  if (orders.totalDocs > 0) {
    throw new Error('Cannot delete product with orders');
  }
  
  return true;
};

const Products: CollectionConfig = {
  // ...
  hooks: {
    beforeValidate: [generateSlug],
    beforeDelete: [checkRelatedOrders],
  },
};
```

## Error Handling Rules

1. **Validation Handling**: Catch and handle payload validation errors specifically
2. **Custom Error Messages**: Provide clear error messages for user-facing errors
3. **Transaction Awareness**: Use `disableTransaction: false` to ensure operations roll back on error
4. **Error Propagation**: Let payload errors propagate in server contexts, but handle gracefully in UI

Error handling example:

```typescript
// endpoints/processOrder.ts
import { Endpoint } from 'payload/types';
import { APIError } from 'payload/errors';

export const processOrder: Endpoint = async (req, res) => {
  const { payload } = req;
  
  try {
    // Validate request
    if (!req.body.items?.length) {
      throw new APIError('No items in order', 400);
    }
    
    // Create order with transaction
    const order = await payload.create({
      collection: 'orders',
      data: req.body,
      disableTransaction: false, // Ensure atomicity
    });
    
    return res.status(200).json({ success: true, order });
  } catch (error) {
    // Handle known errors
    if (error instanceof APIError) {
      return res.status(error.status || 400).json({
        success: false,
        message: error.message,
      });
    }
    
    // Generic error
    return res.status(500).json({
      success: false,
      message: 'An error occurred',
    });
  }
};
```

## Development Best Practices

1. **Version Control**: Lock package versions to avoid unexpected breaking changes
2. **Component Directive**: Add 'use client' to any custom admin components using React hooks or browser APIs
3. **Testing Strategy**: Create tests for access control, hooks, and API endpoints
4. **Migration Planning**: Plan database migrations carefully, especially with relational databases
5. **Documentation Requirement**: Document custom field types, hooks, and access control patterns

Custom admin component example:

```typescript
// components/admin/StockLevelIndicator.tsx
'use client';

import React from 'react';
import { useField } from 'payload/components/forms';

const StockLevelIndicator: React.FC = () => {
  const { value } = useField<number>({ path: 'inventory.stockLevel' });
  
  return (
    <div className={`stock-indicator ${value === 0 ? 'out-of-stock' : 'in-stock'}`}>
      <span>{value}</span>
    </div>
  );
};

export default StockLevelIndicator;
```

## Common Pitfalls Avoidance

1. **Development Performance**: Don't judge performance based on Next.js development server
2. **Relationship Depth**: Avoid deep nesting that loads excessive data
3. **Rich Text Rendering**: Build frontend serializers for rich text content
4. **Beta Features**: Exercise caution with features marked as experimental
5. **Database Selection**: Choose MongoDB for flexible schemas or PostgreSQL/SQLite for strict relational data

Rich text serializer example:

```tsx
// components/RichText.tsx
import React from 'react';
import { Serialize } from '@payloadcms/next-richtext-lexical';

const customRenderers = {
  Paragraph: ({ children }) => <p className="mb-4">{children}</p>,
  Heading: ({ children, level }) => {
    if (level === 1) return <h1 className="text-3xl">{children}</h1>;
    return <h2 className="text-2xl">{children}</h2>;
  },
};

const RichText = ({ content }) => {
  return <Serialize content={content} customRenderers={customRenderers} />;
};

export default RichText;
```