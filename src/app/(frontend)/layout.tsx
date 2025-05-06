import { ReactNode } from 'react';
import { autoClassName } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import './styles.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Header } from '@/globals/Header';
import { Theme } from '@/providers/ThemeProvider/types';
import { Footer } from '@/globals/Footer';
import { CollectionProvider } from '@/providers/CollectionProvider';

type LayoutProps = {
  children: ReactNode;
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const Layout: React.FC<LayoutProps> = async ({ children }: LayoutProps) => {
  const defaultTheme = process.env.DEFAULT_THEME as Theme;

  return (
    <html lang="en">
      <body
        className={autoClassName(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
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
      </body>
    </html>
  );
};

export default Layout;
