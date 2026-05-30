'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LanguageSelect: React.FC<{ className?: string }> = ({ className }) => {
  const t = useTranslations('LanguageSelect');
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: newLocale },
    );
  };

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={locale}>
      <SelectTrigger className={className ?? 'w-[280px]'}>
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('label')}</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="es">Español</SelectItem>
          <SelectItem value="ru">Русский</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
