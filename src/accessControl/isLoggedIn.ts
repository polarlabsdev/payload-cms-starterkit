import { Access, Where } from 'payload';
import { isAdminCheck } from '@/accessControl/isAdmin';
import { hasPermissionCheck, type PermissionString, type RoleName } from '@/accessControl/roles';

export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user);
};

/**
 * Access control for collections with draft/publish support.
 *
 *  "published only" includes documents with no `_status` field, for backward
 *  compatibility with content created before versioning was enabled.
 */
export const isPublishedOrHasAccess =
  (permission?: PermissionString): Access =>
  ({ req: { user } }) => {
    // Superadmin always gets full access
    if (user && isAdminCheck(user)) return true;

    // CMS users: check permission if required, otherwise allow all
    if (user?.collection === 'users') {
      return permission ? hasPermissionCheck(user.roles as RoleName[], permission) : true;
    }

    // Unauthenticated users on public collections
    // Show published docs only (+ pre-versioning docs without _status)
    if (!permission) {
      return {
        or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
      } as Where;
    }

    // Permission required but user is unauthenticated or lacks access
    return false;
  };