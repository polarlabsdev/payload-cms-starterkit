import { linkField } from '@/fields/link/config';
import { anyone } from '@/accessControl/anyone';
import { hasPermission } from '@/accessControl/hasPermission';
import { getBrandColorOptions } from '@/lib/colors';
import { GlobalConfig } from 'payload';

export const AnnouncementBar: GlobalConfig = {
  slug: 'announcement-bar',
  access: {
    read: anyone,
    update: hasPermission('website:announcements:update'),
  },
  admin: {
    group: 'Navigation',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show Announcement Bar',
      defaultValue: false,
      admin: {
        description: 'Enable or disable the announcement bar',
      },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Announcement Text',
      maxLength: 125,
      admin: {
        description: 'Keep this short - maximum 125 characters',
      },
    },
    {
      name: 'showLink',
      type: 'checkbox',
      label: 'Show Link',
      defaultValue: false,
      admin: {
        description: 'Toggle to show or hide the link/button in the bar',
      },
    },
    linkField({
      name: 'link',
      label: 'Read More Link',
      showButton: true,
      overrides: {
        admin: {
          condition: (data: unknown) => Boolean((data as { showLink?: boolean })?.showLink),
        },
      },
    }),
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      defaultValue: 'White',
      options: getBrandColorOptions(),
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Banner Color',
      defaultValue: 'Teal',
      options: getBrandColorOptions(),
    },
  ],
};
