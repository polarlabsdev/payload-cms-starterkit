import { Access } from 'payload';

export const isLoggedIn: Access = ({ req: { user } }) => {
  return Boolean(user);
};

export const isLoggedInOrPublished: Access = ({ req: { user } }) => {
  // If there is a user logged in,
  // let them retrieve all documents
  if (user) return true;

  // If there is no user,
  // restrict the documents that are returned
  // to only those where `_status` is equal to `published`
  // or where `_status` does not exist (to account for documents created
  // before enabling draft functionality)
  return {
    or: [
      {
        _status: {
          equals: 'published',
        },
      },
      {
        _status: {
          exists: false,
        },
      },
    ],
  };
};
