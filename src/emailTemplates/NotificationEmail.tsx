import * as React from 'react';
import { BaseEmailTemplate, type EmailLocale } from './BaseEmailTemplate';

interface NotificationEmailProps {
  title: string;
  message: string;
  locale?: EmailLocale;
  logoUrl?: string;
  ctaButton?: {
    label: string;
    href: string;
  };
}

type Translations = {
  footerText: string;
};

const translations: Record<EmailLocale, Translations> = {
  en: {
    footerText: 'If you have any questions, please contact us at {email}',
  },
  fr: {
    footerText: 'Si vous avez des questions, veuillez nous contacter à {email}',
  },
  es: {
    footerText: 'Si tienes alguna pregunta, contáctanos en {email}',
  },
  ru: {
    footerText: 'Если у вас есть вопросы, свяжитесь с нами по адресу {email}',
  },
  ar: {
    footerText: 'إذا كان لديك أي أسئلة، يرجى الاتصال بنا على {email}',
  },
};

/**
 * Generic notification email template.
 * Use this for any transactional emails (updates, alerts, confirmations, etc.)
 *
 * Example:
 * ```
 * <NotificationEmail
 *   title="Password Changed"
 *   message="Your password has been successfully updated."
 *   locale="en"
 * />
 * ```
 */
export const NotificationEmail: React.FC<NotificationEmailProps> = ({
  title,
  message,
  locale = 'en',
  logoUrl,
  ctaButton,
}) => {
  const t = translations[locale] ?? translations.en;

  return (
    <BaseEmailTemplate
      preview={title}
      heading={title}
      bodyContent={<p>{message}</p>}
      ctaButton={ctaButton}
      footer={{
        text: t.footerText,
        supportEmail: 'support@example.com',
      }}
      locale={locale}
      logoUrl={logoUrl}
    />
  );
};

export default NotificationEmail;
