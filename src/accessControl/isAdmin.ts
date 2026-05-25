import { RoleName, isSuperUser } from '@/accessControl/roles';
import { Config } from '@/payload-types';
import { Access } from 'payload';

/**
 * Check if a user is a superadmin from the Users collection
 * Returns false if user is from any other collection
 */
export const isAdminCheck = (user: Config['user']): boolean => {
  if (!user) {
    return false;
  }

  // Only users from the 'users' collection can be admins
  if (user.collection && user.collection !== 'users') {
    return false;
  }

  // Check legacy role field first (for backward compatibility during migration)
  if ('role' in user && user.role === 'admin') {
    return true;
  }

  // Check if user has superadmin role
  if (user.roles && Array.isArray(user.roles) && user.roles.length > 0) {
    return isSuperUser(user.roles as RoleName[]);
  }

  return false;
};

/**
 * Access control function to check if user is a superadmin
 */
export const isAdmin = (): Access => {
  return ({ req: { user } }) => {
    return !!user && isAdminCheck(user);
  };
};
