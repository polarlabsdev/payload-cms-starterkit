export const BRAND_COLORS = {
  White: '#FCFBF8',
  Black: '#2B2B2B',
  Yellow: '#FFC367',
  Red: '#F55F5C',
  Purple: '#6A4C93',
  Blue: '#3D7EAB',
  Pink: '#B22F75',
  Teal: '#1D8590',
  'Dark Purple': '#441736',
  Orange: '#8A4A22',
  'Dark Green': '#143D35',
  'Dark Red': '#810503',
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
