// ============================================================================
// PERMISSIONS SYSTEM
// ============================================================================
// Permissions follow the pattern: domain:resource:action
// - domain: system, website
// - resource: the collection/global name (users, pages, stories, etc.)
// - action: create, read, update, delete

type Domain = 'system' | 'website';

type SystemResource = 'users' | 'userRoles' | 'adminPanel';
type WebsiteResource =
  | 'pages'
  | 'stories'
  | 'media'
  | 'documents'
  | 'videos'
  | 'faqs'
  | 'faq-tags'
  | 'story-categories'
  | 'redirects'
  | 'search'
  | 'globals'
  | 'pagePublishDate'
  | 'storyPublishDate'
  | 'slugs'
  | 'userRoles'
  | 'announcements';

type Resource = SystemResource | WebsiteResource;

type Action = 'create' | 'read' | 'update' | 'delete';

export type PermissionString =
  | `system:${SystemResource}:${Action}`
  | `website:${WebsiteResource}:${Action}`;

/**
 * Helper function to generate permission strings for a given domain and resource
 * @param domain - The permission domain (system, website)
 * @param resource - The resource being accessed
 * @param actions - Either 'all' for all CRUD actions, or an array of specific actions
 */
const scope = (
  domain: Domain,
  resource: Resource,
  actions: Action[] | 'all' = 'all',
): PermissionString[] => {
  const acts = actions === 'all' ? (['create', 'read', 'update', 'delete'] as const) : actions;
  // @ts-expect-error - Template literal types are complex, this is intentionally bypassed
  return acts.map((action) => `${domain}:${resource}:${action}`);
};

// ============================================================================
// ROLES SYSTEM
// ============================================================================
// Roles are collections of permissions that can be assigned to users.
// Users can have multiple roles, and permissions are additive.

export const ROLES = {
  'website-reader': {
    name: 'Website Reader',
    description: 'Can read all website content',
    permissions: [
      ...scope('system', 'adminPanel', ['read']),
      ...scope('website', 'pages', ['read']),
      ...scope('website', 'stories', ['read']),
      ...scope('website', 'media', ['read']),
      ...scope('website', 'videos', ['read']),
      ...scope('website', 'story-categories', ['read']),
      ...scope('website', 'globals', ['read']),
    ],
  },
  'website-editor': {
    name: 'Website Editor',
    description: 'Can create and edit website content',
    permissions: [
      ...scope('system', 'adminPanel', ['read']),
      ...scope('website', 'pages', ['create', 'read', 'update']),
      ...scope('website', 'stories', ['create', 'read', 'update']),
      ...scope('website', 'media', ['create', 'read', 'update']),
      ...scope('website', 'videos', ['create', 'read', 'update']),
      ...scope('website', 'story-categories', ['create', 'read', 'update']),
      ...scope('website', 'globals', ['read', 'update']),
      ...scope('website', 'announcements', 'all'),
    ],
  },
  'website-admin': {
    name: 'Website Admin',
    description: 'Full control over website content, and create + read access on users',
    permissions: [
      ...scope('system', 'adminPanel', ['read']),
      ...scope('system', 'users', ['create', 'read']),
      ...scope('system', 'userRoles', ['create', 'read']),
      ...scope('website', 'pages', 'all'),
      ...scope('website', 'pagePublishDate', ['create', 'update']),
      ...scope('website', 'stories', 'all'),
      ...scope('website', 'storyPublishDate', ['create', 'update']),
      ...scope('website', 'media', 'all'),
      ...scope('website', 'videos', 'all'),
      ...scope('website', 'story-categories', 'all'),
      ...scope('website', 'search', 'all'),
      ...scope('website', 'slugs', ['update']),
      ...scope('website', 'globals', ['read', 'update']),
      ...scope('website', 'announcements', 'all'),
    ],
  },
  superadmin: {
    name: 'Superadmin',
    description: 'Full system access',
    permissions: [],
    isSuper: true,
  },
} as const;

export type RoleName = keyof typeof ROLES;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if user is a superuser
 */
export const isSuperUser = (roles: RoleName[]): boolean => {
  return roles.some((role) => {
    const roleConfig = ROLES[role];
    return roleConfig && 'isSuper' in roleConfig && roleConfig.isSuper === true;
  });
};

/**
 * Check if a set of roles includes a specific permission
 * O(1) lookup using Set for performance
 */
export const hasPermissionCheck = (roles: RoleName[], permission: PermissionString): boolean => {
  // Superadmin has all permissions
  if (isSuperUser(roles)) {
    return true;
  }

  // Build a set of all user permissions for O(1) lookup
  const userPermissions = new Set(roles.flatMap((role) => ROLES[role]?.permissions || []));

  // Check if permission exists in the set
  return userPermissions.has(permission);
};

// ============================================================================
// LEGACY SUPPORT
// ============================================================================
// The following are maintained for backward compatibility during migration.
// TODO: Remove after all existing admin users have been assigned 'superadmin' in the new 'roles' field

export const ROLE_HIERARCHY = [
  'reader', // can only read content
  'contributor', // can create and edit their own content
  'editor', // can manage everything except system settings
  'admin', // can manage everything
] as const;

export type Role = (typeof ROLE_HIERARCHY)[number];
