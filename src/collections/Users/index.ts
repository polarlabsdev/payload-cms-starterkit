import type { CollectionConfig } from 'payload';
import { isAdminOrSelf } from './access/isAdminOrSelf';
import { isRole, isRoleField } from '@/accessControl/isRole';

// The order of roles here is very important as it defines the hierarchy
// that we use in the access control checks. The idea is that anything
// a lower role can do, a higher role can also do. For example,
// a contributor can create and edit their own content, but an editor
// can edit all content.
// The roles are ordered from lowest to highest.
export const ROLE_HIERARCHY = [
  'reader', // can only read content
  'contributor', // can create and edit their own content
  'editor', // can manage everything except system settings
  'admin', // can manage everything
] as const;
export type Role = (typeof ROLE_HIERARCHY)[number];

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'createdAt', 'updatedAt'],
  },
  access: {
    create: isRole('admin'),
    delete: isRole('admin'),
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      saveToJWT: true,
      options: ROLE_HIERARCHY.map((role) => {
        return {
          label: role.charAt(0).toUpperCase() + role.slice(1),
          value: role,
        };
      }),
      access: {
        create: isRoleField('admin'),
        update: isRoleField('admin'),
      },
    },
  ],
  timestamps: true,
};
