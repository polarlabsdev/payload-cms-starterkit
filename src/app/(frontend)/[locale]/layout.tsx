import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import './styles.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing, isRtlLocale } from '@/i18n/routing';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Header } from '@/globals/Header';
import { Theme } from '@/providers/ThemeProvider/types';
import { Footer } from '@/globals/Footer';
import { CollectionProvider } from '@/providers/CollectionProvider';
import { DirectionProvider } from '@/components/ui/direction';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const Layout: React.FC<LayoutProps> = async ({ children, params }) => {
  const defaultTheme = process.env.DEFAULT_THEME as Theme;
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = isRtlLocale(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextIntlClientProvider>
          <DirectionProvider dir={dir}>
            <ThemeProvider defaultTheme={defaultTheme}>
              <CollectionProvider>
                <Header />
                <main>
                  <div className="fixed bottom-4 right-4">
                    <ThemeToggle />
                  </div>
                  {children}
                </main>
                <Footer />
              </CollectionProvider>
            </ThemeProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default Layout;