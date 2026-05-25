import { Field } from 'payload';

export const anchorLinkField: Field = {
  name: 'displayId',
  type: 'ui',
  admin: {
    components: {
      Field: '@/components/BlockIdDisplay',
    },
  },
};
