import { hasPermission } from '@/accessControl/hasPermission';
import { anyone } from '@/accessControl/anyone';
import { genSlugField } from '@/fields/slugField';
import { getBrandColorOptions } from '@/lib/colors';
import { CollectionConfig } from 'payload';

export const StoryCategories: CollectionConfig = {
  slug: 'story-categories',
  access: {
    create: hasPermission('website:story-categories:create'),
    delete: hasPermission('website:story-categories:delete'),
    read: anyone,
    update: hasPermission('website:story-categories:update'),
  },
  admin: {
    useAsTitle: 'name',
    group: 'Stories',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    genSlugField('name', { editPermission: 'website:slugs:update' }),
    {
      name: 'iconName',
      type: 'text',
      admin: {
        description:
          'Visit remixicon.com to see the available icons. Click one and copy its name and paste it here. For example: `facebook-fill`.',
      },
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      options: getBrandColorOptions(),
      admin: {
        description: 'Brand color for this category',
      },
    },
    {
      name: 'textColor',
      type: 'select',
      required: true,
      options: getBrandColorOptions(),
      admin: {
        description: 'Brand color for the text inside the badge',
      },
    },
  ],
};
