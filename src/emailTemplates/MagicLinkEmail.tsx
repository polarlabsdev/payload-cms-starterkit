import * as React from 'react';
import { isRtlLocale } from '@/i18n/routing';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Img,
  Hr,
  Link,
} from '@react-email/components';

export type MagicLinkEmailLocale = 'en' | 'fr' | 'es' | 'ru' | 'ar';
export type MagicLinkEmailAudience = 'portal' | 'partner';

interface MagicLinkEmailProps {
  magicLink: string;
  logoUrl?: string;
  locale?: MagicLinkEmailLocale;
  audience?: MagicLinkEmailAudience;
}

// Dark theme colors from tailwind config
const colors = {
  background: '#2b2b2b', // hsl(0, 0%, 17%)
  foreground: '#fef8f0', // hsl(36, 100%, 97%)
  primary: '#e8755e', // hsl(1, 85%, 66%)
  primaryForeground: '#fdf9f7', // hsl(43, 47%, 98%)
  muted: '#f2f2f2', // hsl(0, 0%, 95%)
  mutedForeground: '#f5f0ea', // hsl(43, 40%, 94%)
};

// Forced color overrides injected into <head> — prevents email clients (Canary Mail, Apple Mail,
// Outlook iOS, etc.) from auto-inverting or overriding our intentional dark-theme colors.
const forcedColorStyles = `
  :root { color-scheme: light dark; }
  body,
  .email-body,
  .email-container { background-color: ${colors.background} !important; color: ${colors.mutedForeground} !important; }
  .email-heading  { color: ${colors.foreground} !important; }
  .email-paragraph,
  .email-footer   { color: ${colors.mutedForeground} !important; }
  .email-footer-muted { color: ${colors.muted} !important; }
  .email-link     { color: ${colors.primary} !important; }
  .email-btn      { background-color: ${colors.primary} !important; color: ${colors.primaryForeground} !important; }
  .email-hr       { border-color: ${colors.muted} !important; }
`;

type Translations = {
  preview: string;
  heading: string;
  bodyIntro: string;
  expiresNote: string;
  sessionNote: string;
  sessionAfter: string;
  buttonLabel: string;
  footerText: string;
  securityNote: string;
};

const translations: Record<MagicLinkEmailLocale, Translations> = {
  en: {
    preview: 'Your secure sign-in link for the Rainbow Railroad Client Portal',
    heading: 'Sign in to the Client Portal',
    bodyIntro: 'Click the button below to securely sign in to the Rainbow Railroad Client Portal.',
    expiresNote: 'This link will expire in 15 minutes',
    sessionNote: 'Once signed in, your session will remain active for 12 hours.',
    sessionAfter: 'After that you can request a new link to continue accessing the portal.',
    buttonLabel: 'Sign In to Portal',
    footerText:
      "If you didn't request this email, please ignore it and report it to {email}. This link will only work once and expires shortly.",
    securityNote: 'For security reasons, never share this link with anyone else.',
  },
  fr: {
    preview: 'Votre lien de connexion sécurisé pour le Portail Client Rainbow Railroad',
    heading: 'Connexion au Portail Client',
    bodyIntro:
      'Cliquez sur le bouton ci-dessous pour vous connecter en toute sécurité au Portail Client Rainbow Railroad.',
    expiresNote: 'Ce lien expirera dans 15 minutes',
    sessionNote: 'Une fois connecté, votre session restera active pendant 12 heures.',
    sessionAfter:
      'Après cela, vous pouvez demander un nouveau lien pour continuer à accéder au portail.',
    buttonLabel: 'Se connecter au Portail',
    footerText:
      "Si vous n'avez pas demandé cet e-mail, veuillez l'ignorer et le signaler à {email}. Ce lien ne fonctionnera qu'une seule fois et expire bientôt.",
    securityNote:
      "Pour des raisons de sécurité, ne partagez jamais ce lien avec d'autres personnes.",
  },
  es: {
    preview: 'Tu enlace seguro de acceso al Portal de Clientes de Rainbow Railroad',
    heading: 'Acceder al Portal de Clientes',
    bodyIntro:
      'Haz clic en el botón de abajo para acceder de forma segura al Portal de Clientes de Rainbow Railroad.',
    expiresNote: 'Este enlace caducará en 15 minutos',
    sessionNote: 'Una vez iniciada la sesión, permanecerá activa durante 12 horas.',
    sessionAfter:
      'Después de eso, puedes solicitar un nuevo enlace para continuar accediendo al portal.',
    buttonLabel: 'Acceder al Portal',
    footerText:
      'Si no solicitaste este correo, ignóralo e infórmalo a {email}. Este enlace solo funcionará una vez y expirará pronto.',
    securityNote: 'Por razones de seguridad, nunca compartas este enlace con nadie más.',
  },
  ru: {
    preview: 'Ваша безопасная ссылка для входа в Клиентский Портал Rainbow Railroad',
    heading: 'Войти в Клиентский Портал',
    bodyIntro: 'Нажмите кнопку ниже для безопасного входа в Клиентский Портал Rainbow Railroad.',
    expiresNote: 'Эта ссылка истечёт через 15 минут',
    sessionNote: 'После входа ваша сессия будет оставаться активной в течение 12 часов.',
    sessionAfter: 'После этого вы можете запросить новую ссылку для продолжения доступа к порталу.',
    buttonLabel: 'Войти в Портал',
    footerText:
      'Если вы не запрашивали это письмо, проигнорируйте его и сообщите об этом на {email}. Эта ссылка сработает только один раз и вскоре истечёт.',
    securityNote: 'В целях безопасности никогда не передавайте эту ссылку другим людям.',
  },
  ar: {
    preview: 'رابط الدخول الآمن إلى بوابة عملاء Rainbow Railroad',
    heading: 'الدخول إلى بوابة العملاء',
    bodyIntro: '.انقر على الزر أدناه للدخول بشكل آمن إلى بوابة عملاء Rainbow Railroad',
    expiresNote: 'ستنتهي صلاحية هذا الرابط خلال 15 دقيقة',
    sessionNote: '.بعد الدخول، ستظل جلستك نشطة لمدة 12 ساعة',
    sessionAfter: '.بعد ذلك، يمكنك طلب رابط جديد لمواصلة الوصول إلى البوابة',
    buttonLabel: 'الدخول إلى البوابة',
    footerText:
      '.إذا لم تطلب هذا البريد الإلكتروني، تجاهله وأبلغ عنه على {email}. هذا الرابط يعمل مرة واحدة فقط وينتهي قريبًا',
    securityNote: '.لأسباب أمنية، لا تشارك هذا الرابط مع أي شخص آخر',
  },
};

export const EMAIL_SUBJECTS: Record<MagicLinkEmailLocale, string> = {
  en: 'Your Portal Sign-In Link',
  fr: 'Votre lien de connexion au Portail',
  es: 'Tu enlace de acceso al Portal',
  ru: 'Ваша ссылка для входа в Портал',
  ar: 'رابط الدخول إلى البوابة',
};

const partnerTranslations: Record<MagicLinkEmailLocale, Translations> = {
  en: {
    preview: 'Your secure sign-in link for the Rainbow Railroad Partner Portal',
    heading: 'Sign in to the Partner Portal',
    bodyIntro: 'Click the button below to securely sign in to the Rainbow Railroad Partner Portal.',
    expiresNote: 'This link will expire in 15 minutes',
    sessionNote: 'Once signed in, your session will remain active for 6 hours.',
    sessionAfter: 'After that you can request a new link to continue accessing the portal.',
    buttonLabel: 'Sign In to Partner Portal',
    footerText:
      "If you didn't request this email, please ignore it and report it to {email}. This link will only work once and expires shortly.",
    securityNote: 'For security reasons, never share this link with anyone else.',
  },
  fr: {
    preview: 'Votre lien de connexion sécurisé pour le Portail Partenaire Rainbow Railroad',
    heading: 'Connexion au Portail Partenaire',
    bodyIntro:
      'Cliquez sur le bouton ci-dessous pour vous connecter en toute sécurité au Portail Partenaire Rainbow Railroad.',
    expiresNote: 'Ce lien expirera dans 15 minutes',
    sessionNote: 'Une fois connecté, votre session restera active pendant 6 heures.',
    sessionAfter:
      'Après cela, vous pouvez demander un nouveau lien pour continuer à accéder au portail.',
    buttonLabel: 'Se connecter au Portail Partenaire',
    footerText:
      "Si vous n'avez pas demandé cet e-mail, veuillez l'ignorer et le signaler à {email}. Ce lien ne fonctionnera qu'une seule fois et expire bientôt.",
    securityNote:
      "Pour des raisons de sécurité, ne partagez jamais ce lien avec d'autres personnes.",
  },
  es: {
    preview: 'Tu enlace seguro de acceso al Portal de Socios de Rainbow Railroad',
    heading: 'Acceder al Portal de Socios',
    bodyIntro:
      'Haz clic en el botón de abajo para acceder de forma segura al Portal de Socios de Rainbow Railroad.',
    expiresNote: 'Este enlace caducará en 15 minutos',
    sessionNote: 'Una vez iniciada la sesión, permanecerá activa durante 6 horas.',
    sessionAfter:
      'Después de eso, puedes solicitar un nuevo enlace para continuar accediendo al portal.',
    buttonLabel: 'Acceder al Portal de Socios',
    footerText:
      'Si no solicitaste este correo, ignóralo e infórmalo a {email}. Este enlace solo funcionará una vez y expirará pronto.',
    securityNote: 'Por razones de seguridad, nunca compartas este enlace con nadie más.',
  },
  ru: {
    preview: 'Ваша безопасная ссылка для входа в Партнёрский Портал Rainbow Railroad',
    heading: 'Войти в Партнёрский Портал',
    bodyIntro: 'Нажмите кнопку ниже для безопасного входа в Партнёрский Портал Rainbow Railroad.',
    expiresNote: 'Эта ссылка истечёт через 15 минут',
    sessionNote: 'После входа ваша сессия будет оставаться активной в течение 6 часов.',
    sessionAfter: 'После этого вы можете запросить новую ссылку для продолжения доступа к порталу.',
    buttonLabel: 'Войти в Партнёрский Портал',
    footerText:
      'Если вы не запрашивали это письмо, проигнорируйте его и сообщите об этом на {email}. Эта ссылка сработает только один раз и вскоре истечёт.',
    securityNote: 'В целях безопасности никогда не передавайте эту ссылку другим людям.',
  },
  ar: {
    preview: 'رابط الدخول الآمن إلى بوابة شركاء Rainbow Railroad',
    heading: 'الدخول إلى بوابة الشركاء',
    bodyIntro: '.انقر على الزر أدناه للدخول بشكل آمن إلى بوابة شركاء Rainbow Railroad',
    expiresNote: 'ستنتهي صلاحية هذا الرابط خلال 15 دقيقة',
    sessionNote: '.بعد الدخول، ستظل جلستك نشطة لمدة 6 ساعات',
    sessionAfter: '.بعد ذلك، يمكنك طلب رابط جديد لمواصلة الوصول إلى البوابة',
    buttonLabel: 'الدخول إلى بوابة الشركاء',
    footerText:
      '.إذا لم تطلب هذا البريد الإلكتروني، تجاهله وأبلغ عنه على {email}. هذا الرابط يعمل مرة واحدة فقط وينتهي قريبًا',
    securityNote: '.لأسباب أمنية، لا تشارك هذا الرابط مع أي شخص آخر',
  },
};

const PARTNER_EMAIL_SUBJECTS: Record<MagicLinkEmailLocale, string> = {
  en: 'Your Partner Portal Sign-In Link',
  fr: 'Votre lien de connexion au Portail Partenaire',
  es: 'Tu enlace de acceso al Portal de Socios',
  ru: 'Ваша ссылка для входа в Партнёрский Портал',
  ar: 'رابط الدخول إلى بوابة الشركاء',
};

export const EMAIL_SUBJECTS_BY_AUDIENCE: Record<
  MagicLinkEmailAudience,
  Record<MagicLinkEmailLocale, string>
> = {
  portal: EMAIL_SUBJECTS,
  partner: PARTNER_EMAIL_SUBJECTS,
};

export const MagicLinkEmail: React.FC<MagicLinkEmailProps> = ({
  magicLink,
  logoUrl = 'https://placehold.co/200x60/2b2b2b/fef8f0?text=Logo',
  locale = 'en',
  audience = 'portal',
}) => {
  const t =
    (audience === 'partner' ? partnerTranslations[locale] : translations[locale]) ??
    translations.en;
  const isRtl = isRtlLocale(locale);

  // Split footerText around {email} placeholder to render the mailto link inline
  const [footerBefore, footerAfter] = t.footerText.split('{email}');

  return (
    <Html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <Head>
        {/* Declare that we support both colour schemes so clients don't auto-invert */}
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        {/* Force our colours with !important for clients that respect <style> in <head> */}
        <style>{forcedColorStyles}</style>
      </Head>
      <Preview>{t.preview}</Preview>
      <Body style={main} className="email-body">
        <Container style={container} className="email-container">
          <Section style={logoSection}>
            <Img src={logoUrl} alt="Rainbow Railroad" width="200" height="60" style={logo} />
          </Section>

          <Section style={content}>
            <Text style={heading} className="email-heading">
              {t.heading}
            </Text>

            <Text style={paragraph} className="email-paragraph">
              {t.bodyIntro} <strong>{t.expiresNote}</strong> for your security.{' '}
              <strong>{t.sessionNote}</strong> {t.sessionAfter}
            </Text>

            <Section style={buttonContainer}>
              <Button href={magicLink} style={button} className="email-btn">
                {t.buttonLabel}
              </Button>
            </Section>

            <Hr style={hr} className="email-hr" />

            <Text style={footer} className="email-footer">
              {footerBefore}
              <Link
                href="mailto:info@rainbowrailroad.org"
                style={footerLink}
                className="email-link"
              >
                info@rainbowrailroad.org
              </Link>
              {footerAfter}
            </Text>

            <Text style={footerMuted} className="email-footer-muted">
              {t.securityNote}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default MagicLinkEmail;

// Styles
const main = {
  backgroundColor: colors.background,
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
  backgroundColor: colors.background,
};

const logoSection = {
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const content = {
  padding: '0 20px',
};

const heading = {
  fontSize: '32px',
  fontWeight: '700',
  color: colors.foreground,
  lineHeight: '1.3',
  marginBottom: '20px',
  textAlign: 'center' as const,
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: colors.mutedForeground,
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: colors.primary,
  borderRadius: '12px',
  color: colors.primaryForeground,
  fontSize: '18px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 48px',
  lineHeight: '1.5',
};

const hr = {
  borderColor: colors.muted,
  margin: '32px 0',
};

const footer = {
  color: colors.mutedForeground,
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginBottom: '12px',
};

const footerMuted = {
  color: colors.muted,
  fontSize: '12px',
  lineHeight: '20px',
  textAlign: 'center' as const,
  fontStyle: 'italic' as const,
};

const footerLink = {
  color: colors.primary,
  textDecoration: 'underline' as const,
};
