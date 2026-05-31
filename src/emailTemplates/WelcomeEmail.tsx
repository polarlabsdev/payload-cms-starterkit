import * as React from 'react';
import { BaseEmailTemplate, type EmailLocale } from './BaseEmailTemplate';

interface WelcomeEmailProps {
  userName?: string;
  locale?: EmailLocale;
  logoUrl?: string;
}

type Translations = {
  preview: string;
  heading: string;
  body: string;
};

const translations: Record<EmailLocale, Translations> = {
  en: {
    preview: 'Welcome to our platform',
    heading: 'Welcome!',
    body: 'Thank you for joining us. We\'re excited to have you on board. If you have any questions, feel free to reach out to our support team.',
  },
  fr: {
    preview: 'Bienvenue sur notre plateforme',
    heading: 'Bienvenue!',
    body: 'Merci de nous avoir rejoints. Nous sommes ravis de vous avoir à bord. Si vous avez des questions, n\'hésitez pas à contacter notre équipe d\'assistance.',
  },
  es: {
    preview: 'Bienvenido a nuestra plataforma',
    heading: '¡Bienvenido!',
    body: 'Gracias por unirte a nosotros. Estamos emocionados de tenerte a bordo. Si tienes alguna pregunta, no dudes en comunicarte con nuestro equipo de soporte.',
  },
  ru: {
    preview: 'Добро пожаловать на нашу платформу',
    heading: 'Добро пожаловать!',
    body: 'Спасибо, что присоединились к нам. Мы рады видеть вас на борту. Если у вас есть вопросы, не стесняйтесь обратиться в нашу службу поддержки.',
  },
  ar: {
    preview: 'أهلا بك في منصتنا',
    heading: 'أهلا وسهلا!',
    body: 'شكراً لانضمامك إلينا. نحن سعداء بوجودك معنا. إذا كان لديك أي أسئلة، فلا تتردد في التواصل مع فريق الدعم الخاص بنا.',
  },
};

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName = 'there',
  locale = 'en',
  logoUrl,
}) => {
  const t = translations[locale] ?? translations.en;

  return (
    <BaseEmailTemplate
      preview={t.preview}
      heading={`${t.heading} ${userName}!`}
      bodyContent={<p>{t.body}</p>}
      footer={{
        text: 'If you did not create this account, please contact us at {email}',
        supportEmail: 'support@example.com',
      }}
      locale={locale}
      logoUrl={logoUrl}
    />
  );
};

export default WelcomeEmail;
