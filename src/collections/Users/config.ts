import type { CollectionConfig } from 'payload';
import type { PayloadRequest } from 'payload';
import { canEditUsersOrSelf } from './access/canEditUsersOrSelf';
import { hasPermission, hasPermissionField } from '@/accessControl/hasPermission';
import { isLoggedIn } from '@/accessControl/isLoggedIn';
import { ROLE_HIERARCHY, ROLES } from '@/accessControl/roles';
import { protectSuperadminRole } from './hooks/protectSuperadminRole';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Auth',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'createdAt', 'updatedAt'],
  },
  access: {
    create: hasPermission('system:users:create'),
    delete: hasPermission('system:users:delete'),
    read: isLoggedIn,
    update: canEditUsersOrSelf('system:users:update'),
    admin: hasPermission('system:adminPanel:read') as ({ req }: { req: PayloadRequest }) => boolean,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    // TODO: DEPRECATED - Remove this field after all existing admin users have been assigned 'superadmin' in the new 'roles' field
    // This field is kept for backward compatibility during migration to prevent admin lockout
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
      admin: {
        hidden: true, // Hidden from admin UI
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['website-reader'],
      saveToJWT: true,
      options: Object.entries(ROLES)
        .filter(([key]) => key !== 'portal-user') // Exclude portal-user role (only for portal users)
        .map(([key, value]) => ({
          label: value.name,
          value: key,
        })),
      hooks: {
        beforeChange: [protectSuperadminRole],
      },
      access: {
        create: hasPermissionField('system:userRoles:create'),
        update: hasPermissionField('system:userRoles:update'),
      },
      admin: {
        description: 'User roles - multiple roles can be assigned. Permissions are additive.',
      },
    },
  ],
  timestamps: true,
};
