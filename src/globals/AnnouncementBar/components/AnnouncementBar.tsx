import { findGlobalSafe } from '@/lib/payloadSafeApi';
import { AnnouncementBarComponent } from './AnnouncementBarComponent';

export const AnnouncementBar = async () => {
  const data = await findGlobalSafe({ slug: 'announcement-bar' });
  return <AnnouncementBarComponent data={data} />;
};
