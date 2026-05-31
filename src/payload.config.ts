import { postgresAdapter } from '@payloadcms/db-postgres';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';
import path from 'path';
import { buildConfig } from 'payload';
import { en } from '@payloadcms/translations/languages/en';
import { fr } from '@payloadcms/translations/languages/fr';
import { es } from '@payloadcms/translations/languages/es';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { plugins, createPostgresPoolConfig } from './plugins';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Stories } from './collections/Stories';
import { Videos } from './collections/Videos';
import { StoryCategories } from './collections/StoryCategories';
import { Header } from './globals/Header/config';
import { Footer } from './globals/Footer/config';
import { AnnouncementBar } from './globals/AnnouncementBar/config';
import { StoriesPage } from './globals/StoriesPage/config';
import { defaultLexical } from './fields/lexicals/defaultLexical';
import { ButtonBlock } from './blocks/Button/config';
import { HeroBlock } from '@/blocks/Hero/config';
import { StoryCardsBlock } from '@/blocks/StoryCards/config';
import { IconRowBlock } from '@/blocks/IconRow/config';
import { StandardContentBlock } from '@/blocks/StandardContentBlock/config';
import { WideImageBlock } from '@/blocks/WideImageBlock/config';
import { ImageGridBlock } from '@/blocks/ImageGridBlock/config';
import { SimpleRichTextBlock } from '@/blocks/SimpleRichTextBlock/config';
import { YoutubeEmbedBlock } from '@/blocks/YoutubeEmbed/config';
import { InfoBlock } from '@/blocks/InfoBlock/config';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const emailConfig = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || '',
      defaultFromName: process.env.EMAIL_FROM_NAME || '',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    })
  : undefined;

export default buildConfig({
  ...(emailConfig && { email: emailConfig }),
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
  // This is just for the admin panel
  i18n: {
    supportedLanguages: { en, fr, es },
  },
  // This is for the actual content stored in the db
  // This needs to match the locales in i18n/routing.ts
  // You need to also create the corresponding json files in /messages
  localization: {
    locales: ['en', 'fr', 'es', 'ru', 'ar'],
    defaultLocale: 'en',
  },
  // use this blocks key to get Payload to recognize blocks
  // that aren't used in a collection (for example, a block that is used in lexical)
  blocks: [
    ButtonBlock,
    HeroBlock,
    StoryCardsBlock,
    IconRowBlock,
    StandardContentBlock,
    WideImageBlock,
    ImageGridBlock,
    SimpleRichTextBlock,
    YoutubeEmbedBlock,
    InfoBlock,
  ],
  collections: [Users, Media, Pages, Stories, StoryCategories, Videos],
  globals: [Header, Footer, AnnouncementBar, StoriesPage],
  editor: defaultLexical,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: createPostgresPoolConfig(),
    push: false,
  }),
  sharp,
  plugins: [...plugins],
});
