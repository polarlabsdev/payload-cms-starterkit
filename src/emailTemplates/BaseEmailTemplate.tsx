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

export type EmailLocale = 'en' | 'fr' | 'es' | 'ru' | 'ar';

interface BaseEmailTemplateProps {
  preview: string;
  heading: string;
  bodyContent: React.ReactNode;
  ctaButton?: {
    label: string;
    href: string;
  };
  footer?: {
    text: string;
    supportEmail?: string;
  };
  locale?: EmailLocale;
  logoUrl?: string;
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

export const BaseEmailTemplate: React.FC<BaseEmailTemplateProps> = ({
  preview,
  heading,
  bodyContent,
  ctaButton,
  footer,
  locale = 'en',
  logoUrl = 'https://placehold.co/200x60/2b2b2b/fef8f0?text=Logo',
}) => {
  const isRtl = isRtlLocale(locale);

  return (
    <Html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <Head>
        {/* Declare that we support both colour schemes so clients don't auto-invert */}
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        {/* Force our colours with !important for clients that respect <style> in <head> */}
        <style>{forcedColorStyles}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={main} className="email-body">
        <Container style={container} className="email-container">
          <Section style={logoSection}>
            <Img src={logoUrl} alt="Logo" width="200" height="60" style={logo} />
          </Section>

          <Section style={content}>
            <Text style={headingStyle} className="email-heading">
              {heading}
            </Text>

            <div className="email-paragraph" style={paragraph}>
              {bodyContent}
            </div>

            {ctaButton && (
              <Section style={buttonContainer}>
                <Button href={ctaButton.href} style={button} className="email-btn">
                  {ctaButton.label}
                </Button>
              </Section>
            )}

            {ctaButton && <Hr style={hr} className="email-hr" />}

            {footer && (
              <Text style={footerStyle} className="email-footer">
                {footer.supportEmail ? (
                  <>
                    {footer.text.replace('{email}', '')}
                    <Link
                      href={`mailto:${footer.supportEmail}`}
                      style={footerLink}
                      className="email-link"
                    >
                      {footer.supportEmail}
                    </Link>
                  </>
                ) : (
                  footer.text
                )}
              </Text>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// ============================================================================
// STYLES
// ============================================================================

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

const headingStyle = {
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

const footerStyle = {
  color: colors.mutedForeground,
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  marginBottom: '12px',
};

const footerLink = {
  color: colors.primary,
  textDecoration: 'underline' as const,
};
