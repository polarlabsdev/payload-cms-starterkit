import { PermissionString, RoleName, hasPermissionCheck } from '@/accessControl/roles';
import { Access, FieldAccess } from 'payload';
import { isAdminCheck } from './isAdmin';

type PermissionAccess = (permission: PermissionString) => Access;
type PermissionFieldAccess = (permission: PermissionString) => FieldAccess;

/**
 * Check if the current user has a specific permission
 * Checks the user's roles array and returns true if any role includes the permission
 * Superadmin always has all permissions, use isAdminCheck to handle legacy admin role
 */
export const hasPermission: PermissionAccess = (permission) => {
  return ({ req: { user } }) => {
    // Superadmin has all permissions
    if (user && isAdminCheck(user)) {
      return true;
    }

    if (!user?.roles || !Array.isArray(user.roles) || user.roles.length === 0) {
      return false;
    }

    return hasPermissionCheck(user.roles as RoleName[], permission);
  };
};

/**
 * Field-level permission check
 * Superadmin always has all permissions
 */
export const hasPermissionField: PermissionFieldAccess = (permission) => {
  return ({ req: { user } }) => {
    // Superadmin has all permissions
    if (user && isAdminCheck(user)) {
      return true;
    }

    if (!user?.roles || !Array.isArray(user.roles) || user.roles.length === 0) {
      return false;
    }

    return hasPermissionCheck(user.roles as RoleName[], permission);
  };
};
