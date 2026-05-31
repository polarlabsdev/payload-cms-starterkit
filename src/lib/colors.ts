export const BRAND_COLORS = {
  White: '#F8FAFC',
  Black: '#111827',
  Yellow: '#F59E0B',
  Red: '#DC2626',
  Purple: '#4F46E5',
  Blue: '#2563EB',
  Pink: '#DB2777',
  Teal: '#0EA5E9',
  'Dark Purple': '#312E81',
  Orange: '#EA580C',
  'Dark Green': '#065F46',
  'Dark Red': '#7F1D1D',
} as const;

export const TAILWIND_THEME_COLORS = {
  Background: 'bg-background',
  Foreground: 'bg-foreground',
  Card: 'bg-card',
  'Card Foreground': 'bg-card-foreground',
  Primary: 'bg-primary',
  'Primary Foreground': 'bg-primary-foreground',
  Secondary: 'bg-secondary',
  'Secondary Foreground': 'bg-secondary-foreground',
  Muted: 'bg-muted',
  'Muted Foreground': 'bg-muted-foreground',
  Accent: 'bg-accent',
  'Accent Foreground': 'bg-accent-foreground',
  Destructive: 'bg-destructive',
  'Destructive Foreground': 'bg-destructive-foreground',
  Success: 'bg-success',
  'Success Foreground': 'bg-success-foreground',
  Warning: 'bg-warning',
  'Warning Foreground': 'bg-warning-foreground',
  Border: 'bg-border',
} as const;

export const THEME_COLORS = {
  background: 'background',
  foreground: 'foreground',
  card: 'card',
  cardForeground: 'card-foreground',
  primary: 'primary',
  secondary: 'secondary',
  accent: 'accent',
  destructive: 'destructive',
  success: 'success',
  warning: 'warning',
  muted: 'muted',
} as const;

export type BrandColorKey = keyof typeof BRAND_COLORS;
export type TailwindThemeColorKey = keyof typeof TAILWIND_THEME_COLORS;
export type ThemeColorKey = keyof typeof THEME_COLORS;

export const getBrandColorOptions = () => {
  return Object.entries(BRAND_COLORS).map(([name, _value]) => ({
    label: name,
    value: name,
  }));
};

export const getTailwindThemeColorOptions = () => {
  return Object.entries(TAILWIND_THEME_COLORS).map(([name, _value]) => ({
    label: name,
    value: name,
  }));
};
