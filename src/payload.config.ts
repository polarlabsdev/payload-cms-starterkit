import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { plugins } from './plugins';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Header } from './globals/Header/config';
import { Footer } from './globals/Footer/config';
import { defaultLexical } from './fields/lexicals/defaultLexical';
import { ButtonBlock } from './blocks/Button/config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // use this blocks key to get Payload to recognize blocks
  // that aren't used in a collection (for example, a block that is used in lexical)
  blocks: [ButtonBlock],
  collections: [Users, Media, Pages],
  globals: [Header, Footer],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [...plugins],
});
