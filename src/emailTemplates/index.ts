/**
 * Email Templates
 *
 * This folder contains reusable email templates built with react-email.
 * All templates support multiple languages via the `locale` prop.
 *
 * ## Available Templates
 *
 * - **BaseEmailTemplate**: Core reusable template (header, body, footer, styling)
 * - **WelcomeEmail**: User welcome/onboarding email
 * - **NotificationEmail**: Generic transactional email (updates, alerts, confirmations)
 *
 * ## Adding a New Template
 *
 * 1. Create a new file (e.g., `YourTemplate.tsx`)
 * 2. Import `BaseEmailTemplate` from `./BaseEmailTemplate`
 * 3. Define translations object with keys: en, fr, es, ru, ar
 * 4. Compose your template using `BaseEmailTemplate`
 * 5. Export as default
 *
 * Example:
 * ```typescript
 * import { BaseEmailTemplate, type EmailLocale } from './BaseEmailTemplate';
 *
 * const translations: Record<EmailLocale, { preview: string; heading: string; ... }> = {
 *   en: { preview: '...', heading: '...', ... },
 *   fr: { preview: '...', heading: '...', ... },
 *   // ... other locales
 * };
 *
 * export const YourTemplate = ({ locale = 'en' }) => (
 *   <BaseEmailTemplate preview={translations[locale].preview} ... />
 * );
 * ```
 *
 * ## Languages Supported
 *
 * - en (English)
 * - fr (French)
 * - es (Spanish)
 * - ru (Russian)
 * - ar (Arabic)
 *
 * When adding new templates, always include all 5 languages for consistency.
 */

export { BaseEmailTemplate, type EmailLocale } from './BaseEmailTemplate';
export { WelcomeEmail } from './WelcomeEmail';
export { NotificationEmail } from './NotificationEmail';
