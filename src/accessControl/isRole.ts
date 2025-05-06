import { Role, ROLE_HIERARCHY } from '@/collections/Users';
import { Access, FieldAccess } from 'payload';

type RoleAccess = (requiredRole: Role) => Access;
type RoleFieldAccess = (requiredRole: Role) => FieldAccess;

const hasRoleOrAbove = (userRole: Role, requiredRole: Role): boolean => {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole);
  const requiredIndex = ROLE_HIERARCHY.indexOf(requiredRole);
  return userIndex >= requiredIndex;
};

export const isRole: RoleAccess = (requiredRole) => {
  return ({ req: { user } }) => {
    return Boolean(user && user.role && hasRoleOrAbove(user.role, requiredRole));
  };
};

export const isRoleField: RoleFieldAccess = (requiredRole) => {
  return ({ req: { user } }) => {
    return Boolean(user && user.role && hasRoleOrAbove(user.role, requiredRole));
  };
};
