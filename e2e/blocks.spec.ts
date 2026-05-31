import { test, expect } from '@playwright/test';

// All tests in this file target the seeded `e2e-blocks-page` fixture which
// contains one of each major block type on a single published page.

test.describe('Hero block', () => {
  test('minimal hero renders the page title', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Blocks Test Page/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('minimal hero renders the body text', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(
      page.getByText('This page is seeded for automated block rendering tests.'),
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Simple rich text block', () => {
  test('renders the block title heading', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Rich Text Heading/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the body copy', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('E2E rich text body content.')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Standard content block', () => {
  test('renders the header text', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Standard Content/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the body copy', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('E2E standard content body.')).toBeVisible({ timeout: 10_000 });
  });

  test('renders an image', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    // The standard-content block always renders an img element beside the text
    const images = page.locator('img[src*="pexels-anete"]');
    await expect(images.first()).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Icon row block', () => {
  test('renders the section title', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Icon Row/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders all three item titles', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('E2E Icon Item One')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('E2E Icon Item Two')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('E2E Icon Item Three')).toBeVisible({ timeout: 10_000 });
  });

  test('renders item descriptions', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('First icon row item for e2e testing.')).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Info block', () => {
  test('renders the info block content', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('E2E info block content.')).toBeVisible({ timeout: 10_000 });
  });

  test('renders the action link', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('link', { name: /E2E Info Action/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('action link navigates to the correct destination', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await page.getByRole('link', { name: /E2E Info Action/i }).click();
    await expect(page).toHaveURL(/\/about/, { timeout: 10_000 });
  });
});

test.describe('Story cards block', () => {
  test('renders the story cards section title', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Story Cards/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders story card links', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    // Story cards render "Read Story" links to individual story pages
    await expect(page.getByRole('link', { name: /Read Story/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the bottom CTA button', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('link', { name: /E2E Stories Button/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('CTA button links to the stories listing page', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    const cta = page.getByRole('link', { name: /E2E Stories Button/i });
    await expect(cta).toHaveAttribute('href', /\/stories/);
  });
});

test.describe('Wide image block', () => {
  test('renders the wide image heading', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Wide Image/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders an img element for the wide image', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    const images = page.locator('img[src*="fingerprints"]');
    await expect(images.first()).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('YouTube embed block', () => {
  test('renders the YouTube embed section title', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E YouTube Embed/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the YouTube iframe or embed element', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    // YouTube embeds render a click-to-load preview image, not an immediate iframe
    await expect(page.getByRole('img', { name: /YouTube video preview/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Image grid block', () => {
  test('renders the image grid section title', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByRole('heading', { name: /E2E Image Grid/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders all three grid item headers', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('E2E Grid Item One')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('E2E Grid Item Two')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('E2E Grid Item Three')).toBeVisible({ timeout: 10_000 });
  });

  test('renders subheadings for each grid item', async ({ page }) => {
    await page.goto('/e2e-blocks-page');
    await expect(page.getByText('Subheader one')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Subheader two')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Subheader three')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Blocks showcase page', () => {
  test('is publicly accessible and renders the hero title', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Blocks Showcase/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the simple rich text section', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Simple Rich Text Block/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the standard content section', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Standard Content Block/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the icon row section', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Icon Row Block/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the image grid section', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Image Grid Block/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the wide image section', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Wide Image Block/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders both story cards sections', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /Story Cards Block/i }).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders the YouTube embed section', async ({ page }) => {
    await page.goto('/blocks-showcase');
    await expect(page.getByRole('heading', { name: /YouTube Embed Block/i })).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Home page — updated blocks', () => {
  test('hero renders the main heading', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Build faster with a production-ready foundation/i }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('standard content block renders its header', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /A foundation you can build on/i })).toBeVisible(
      { timeout: 10_000 },
    );
  });

  test("icon row renders what's included heading", async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /What's included/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('icon row renders all three item titles', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Content Blocks' })).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByRole('heading', { name: 'Auth & Roles' })).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByRole('heading', { name: 'i18n Ready' })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('story cards section renders the section heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Latest Stories/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('wide image section renders its heading', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /Open source and ready to deploy/i }),
    ).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('About page — updated blocks', () => {
  test('hero renders the about heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /About this starterkit/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('standard content block renders its header', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /Built for real projects/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('icon row renders core principles heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /Core principles/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('icon row renders all three principle titles', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('Type-safe')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Performance-first')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Composable')).toBeVisible({ timeout: 10_000 });
  });

  test('image grid renders the team section heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /The team behind it/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('rich text section renders how to use heading', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /How to use this repo/i })).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Contact page — updated blocks', () => {
  test('hero renders the contact heading', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Get in touch/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('info block renders the contact message', async ({ page }) => {
    await page.goto('/contact');
    await expect(
      page.getByText("Send us an email and we'll get back to you within one business day."),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('icon row renders other ways to reach us heading', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: /Other ways to reach us/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('icon row renders all three channel titles', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: 'GitHub' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('heading', { name: 'Discord' })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('heading', { name: 'Documentation' })).toBeVisible({
      timeout: 10_000,
    });
  });
});
