import { Access } from 'payload';

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') {
      return true;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  // Reject everyone else
  return false;
};
