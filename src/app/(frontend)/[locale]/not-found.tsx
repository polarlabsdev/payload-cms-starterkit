import { getTranslations } from 'next-intl/server';
import { NotFoundContent } from '@/components/NotFoundContent';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <NotFoundContent
      notFoundLabel={t('notFound')}
      didYouMeanLabel={t('didYouMean')}
      noSuggestionsLabel={t('noSuggestions')}
      goHomeLabel={t('goHome')}
      searchLabel={t('search')}
      searchHintLabel={t.raw('searchHint') as string}
    />
  );
}
