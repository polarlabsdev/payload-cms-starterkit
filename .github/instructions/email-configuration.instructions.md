---
description: Email configuration with Zeptomail SMTP and React Email templates
applyTo: '{src/emailTemplates/**,src/payload.config.ts,src/lib/email*}'
---

# Email Configuration

This project uses **nodemailer** with **Zeptomail SMTP** for transactional emails (magic links, notifications, etc.).

## Configuration

**Location**: `src/payload.config.ts`

**Adapter**: `@payloadcms/email-nodemailer`

**Environment Variables**:

```env
SMTP_HOST=smtp.zeptomail.ca
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password
EMAIL_FROM=portal@yourdomain.com
EMAIL_FROM_NAME=Your Organization Name
```

**Important**: Port 587 uses STARTTLS (`secure: false` in config).

## Email Templates

**Technology**: React Email (`@react-email/components`, `@react-email/render`)

**Template Location**: `src/emailTemplates/`

Templates are React components using inline styles for email client compatibility. Use `React.createElement()` when rendering in `.ts` files.

**Example Usage**:

```typescript
import { render } from '@react-email/render';
import { MagicLinkEmail } from '@/emailTemplates/MagicLinkEmail';

const html = await render(
  React.createElement(MagicLinkEmail, { magicLink: url, logoUrl: LOGO_URL }),
);

await payload.sendEmail({
  to: email,
  subject: 'Your Subject',
  html: html,
});
```
