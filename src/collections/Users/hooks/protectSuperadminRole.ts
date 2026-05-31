import { FieldHook } from 'payload';
import { User } from '@/payload-types';
import { isAdminCheck } from '@/accessControl/isAdmin';

/**
 * Hook to protect the superadmin role from being assigned by non-admins.
 * Only users who are admins (legacy role or superadmin) can add or remove the superadmin role.
 *
 * Special case: The first user ever created is allowed to have superadmin role
 * to enable initial system setup.
 *
 * Based on PayloadCMS official guide for role protection:
 * https://payloadcms.com/posts/guides/setting-up-auth-and-role-based-access-control-in-nextjs-payload
 */
export const protectSuperadminRole: FieldHook<{ id: string } & User> = async ({
  req,
  data,
  operation,
  originalDoc,
}) => {
  const currentUser = req.user;
  const requestedRoles = data?.roles || [];

  // Check if superadmin is being requested
  const hasSuperadminInRequest = requestedRoles.includes('superadmin');

  // Check if the current user is an admin (includes legacy role check)
  const currentUserIsAdmin = currentUser && isAdminCheck(currentUser as User);

  // Special case: Allow first user creation with superadmin role
  // This enables initial system setup when no users exist
  if (operation === 'create' && hasSuperadminInRequest && !currentUserIsAdmin) {
    const existingUsers = await req.payload.find({
      collection: 'users',
      limit: 1,
    });

    // If no users exist, this is the first user - allow superadmin
    if (existingUsers.totalDocs === 0) {
      return requestedRoles;
    }
  }

  // If superadmin role is being assigned/kept but current user is not an admin, block it
  if (hasSuperadminInRequest && !currentUserIsAdmin) {
    // Filter out superadmin from the requested roles
    return requestedRoles.filter((role: string) => role !== 'superadmin');
  }

  // If current user is admin, allow whatever they want
  if (currentUserIsAdmin) {
    return requestedRoles;
  }

  // For update operations, check if superadmin is being removed
  if (operation === 'update' && originalDoc?.roles) {
    const originalRoles = Array.isArray(originalDoc.roles) ? originalDoc.roles : [];
    const hadSuperadmin = originalRoles.includes('superadmin');

    // If the original had superadmin, preserve it (non-admins can't remove it)
    if (hadSuperadmin && !hasSuperadminInRequest) {
      const rolesSet = new Set(requestedRoles);
      rolesSet.add('superadmin');
      return [...rolesSet.values()];
    }
  }

  return requestedRoles;
};
