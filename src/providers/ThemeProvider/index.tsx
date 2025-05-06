'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { Theme, ThemeContextType, ThemeProviderProps } from './types';
import { themeIsValid } from './types';
import { canUseDOM } from '@/lib/utils';

// ----------------------
// UTILS
// ----------------------
const themeLocalStorageKey = 'payload-theme';

const checkDarkModePreferred = (): boolean => {
  const mediaQuery = '(prefers-color-scheme: dark)';
  const mql = window.matchMedia(mediaQuery);
  return mql.matches;
};

// ----------------------
// CREATE CONTEXT
// ----------------------
// This context will be used to provide the theme to the entire application
const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
};

const ThemeContext = createContext(initialContext);

// ----------------------
// CREATE PROVIDER
// ----------------------
// This provider will be used to wrap the entire application
// and provide the theme to all components and allow components to change the theme.
export const ThemeProvider = ({ defaultTheme = 'light', children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(
    canUseDOM() ? (document.documentElement.getAttribute('data-theme') as Theme) : defaultTheme,
  );

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey);
      const darkModePreferred = checkDarkModePreferred();

      if (darkModePreferred) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setThemeState('dark');
      } else {
        document.documentElement.setAttribute('data-theme', '');
      }
    } else {
      setThemeState(themeToSet);
      window.localStorage.setItem(themeLocalStorageKey, themeToSet);
      document.documentElement.setAttribute('data-theme', themeToSet);
    }
  }, []);

  useEffect(() => {
    let themeToSet: Theme = defaultTheme;
    const preference = window.localStorage.getItem(themeLocalStorageKey);

    if (themeIsValid(preference)) {
      themeToSet = preference;
    } else {
      const darkModePreferred = checkDarkModePreferred();

      if (darkModePreferred) {
        themeToSet = 'dark';
      }
    }

    document.documentElement.setAttribute('data-theme', themeToSet);
    setThemeState(themeToSet);
  }, [defaultTheme]);

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => useContext(ThemeContext);
