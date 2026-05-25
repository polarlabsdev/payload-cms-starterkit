import { Access } from 'payload';
import { RoleName, hasPermissionCheck, PermissionString } from '@/accessControl/roles';
import { isAdminCheck } from '@/accessControl/isAdmin';

/**
 * Check if user can edit users or is editing their own data
 * @param permission - The permission required to edit users (e.g., 'system:users:update')
 */
export const canEditUsersOrSelf = (permission: PermissionString): Access => {
  return ({ req: { user } }) => {
    if (!user) {
      return false;
    }

    // Only allow users from the 'users' collection
    if (user.collection && user.collection !== 'users') {
      return false;
    }

    // Check if user is admin (legacy or superadmin)
    if (isAdminCheck(user)) {
      return true;
    }

    // Check if user has the required permission
    if (user.roles && Array.isArray(user.roles) && user.roles.length > 0) {
      if (hasPermissionCheck(user.roles as RoleName[], permission)) {
        return true;
      }
    }

    // Allow users to access their own data
    return {
      id: {
        equals: user.id,
      },
    };
  };
};

// Keep the old export for backward compatibility during migration
export const isAdminOrSelf = canEditUsersOrSelf('system:users:update');
