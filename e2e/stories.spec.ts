import { test, expect } from '@playwright/test';

test.describe('Stories page — listing', () => {
  test('shows "All Stories" heading with no category filter', async ({ page }) => {
    await page.goto('/stories');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/all stories/i, {
      timeout: 10_000,
    });
  });

  test('shows all published stories when no category is selected', async ({ page }) => {
    await page.goto('/stories');
    await expect(page.getByText('Getting Started with the Payload CMS Starterkit')).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText('E2E Story Published')).toBeVisible({ timeout: 10_000 });
    // Draft story must not appear in the public listing
    await expect(page.getByText('E2E Story Draft')).not.toBeVisible();
  });

  test('category filter via URL shows only matching stories', async ({ page }) => {
    // "guides" contains "Getting Started..." and "E2E Story Published"
    await page.goto('/stories?category=guides');
    await expect(page.getByText('E2E Story Published')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('Getting Started with the Payload CMS Starterkit')).toBeVisible({
      timeout: 10_000,
    });
    // "Modeling Content..." is in "engineering" — must not appear
    await expect(page.getByText('Modeling Content for Reusable Blocks')).not.toBeVisible();
  });

  test('category filter shows the category name as the page heading', async ({ page }) => {
    await page.goto('/stories?category=engineering');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/engineering/i, {
      timeout: 10_000,
    });
  });
});

test.describe('Stories page — sidebar category navigation', () => {
  test('desktop sidebar renders category links', async ({ page }) => {
    await page.goto('/stories');
    await expect(page.getByRole('heading', { name: /categories/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('clicking a sidebar category link filters stories and updates URL', async ({ page }) => {
    await page.goto('/stories');
    await page
      .getByRole('link', { name: /engineering/i })
      .first()
      .click();
    await expect(page).toHaveURL(/category=engineering/, { timeout: 10_000 });
    await expect(page.getByText('Modeling Content for Reusable Blocks')).toBeVisible({
      timeout: 10_000,
    });
  });
});

test.describe('Story detail page', () => {
  test('published story renders title and content', async ({ page }) => {
    await page.goto('/stories/e2e-story-published');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/E2E Story Published/i, {
      timeout: 10_000,
    });
  });

  test('draft story is not publicly accessible', async ({ page }) => {
    await page.goto('/stories/e2e-story-draft');
    // The page renders a 404 — confirm the 404 heading is shown rather than the story
    await expect(page.getByText('404')).toBeVisible({ timeout: 10_000 });
  });

  test('visiting a non-existent story slug shows 404', async ({ page }) => {
    await page.goto('/stories/this-story-does-not-exist');
    await expect(page.getByText('404')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Story detail page — body and metadata', () => {
  // The existing detail test only checks the h1. These tests verify the
  // richer content fields also render end-to-end through the DB → component pipeline.

  test('renders story summary text', async ({ page }) => {
    await page.goto('/stories/e2e-story-published');
    await expect(page.getByText('Published e2e story fixture.')).toBeVisible({ timeout: 10_000 });
  });

  test('renders story body text', async ({ page }) => {
    await page.goto('/stories/e2e-story-published');
    await expect(page.getByText('This story exists for access-control e2e coverage.')).toBeVisible({
      timeout: 10_000,
    });
  });

  test('renders category badge on story detail page', async ({ page }) => {
    // e2e-story-published has categories: [7] (Guides)
    await page.goto('/stories/e2e-story-published');
    // Scope to main to avoid matching the "Guides" footer link
    await expect(page.getByRole('main').getByText('Guides')).toBeVisible({ timeout: 10_000 });
  });

  test('renders published date on story detail page', async ({ page }) => {
    // publishedAt: "2026-05-27T10:45:00.000Z" → formatted as "May 27, 2026"
    await page.goto('/stories/e2e-story-published');
    await expect(page.getByText('May 27, 2026')).toBeVisible({ timeout: 10_000 });
  });
});

test.describe('Stories page — featured stories carousel', () => {
  // Story 1 "Getting Started..." has featured: true.
  // On page 1 with no category filter, it is fetched separately and rendered
  // in the carousel; it is excluded from the stories grid query.

  test('featured story appears in the carousel on the main stories page', async ({ page }) => {
    await page.goto('/stories');
    // The carousel renders the featured story title as an h3 slide heading
    await expect(
      page
        .getByRole('heading', { name: /Getting Started with the Payload CMS Starterkit/i })
        .first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  test('featured story does not appear as a regular grid card', async ({ page }) => {
    await page.goto('/stories');
    // The grid query uses featured: { not_equals: true }, so the featured story
    // must NOT have a "Read Story" card button in the grid.
    // We locate grid articles (StoryPreview renders <article> elements) and verify
    // none of them contain the "Read Story" link for the featured story.
    const gridArticles = page
      .locator('article')
      .filter({ hasText: 'Getting Started with the Payload CMS Starterkit' });
    await expect(gridArticles.getByRole('link', { name: /read story/i })).toHaveCount(0);
  });
});

test.describe('Stories page — empty category', () => {
  // The "product" story category has no stories assigned in the seed data.

  test('shows "No stories found." when the selected category has no stories', async ({ page }) => {
    await page.goto('/stories?category=product');
    await expect(page.getByText(/no stories found/i)).toBeVisible({ timeout: 10_000 });
  });

  test('still shows the category name as the heading when no stories are found', async ({
    page,
  }) => {
    await page.goto('/stories?category=product');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/product/i, {
      timeout: 10_000,
    });
  });
});

test.describe('Story card — external link', () => {
  // Seed fixture id 203: e2e-story-external (isExternalLink: true,
  // externalUrl: "https://example.com/e2e-external-article", category: announcements)

  test('external link story card shows "Read Article" button instead of "Read Story"', async ({
    page,
  }) => {
    await page.goto('/stories?category=announcements');
    const card = page.locator('article').filter({ hasText: 'E2E External Link Story' });
    await expect(card.getByRole('link', { name: /read article/i })).toBeVisible({
      timeout: 10_000,
    });
  });

  test('external link story card links to the external URL, not an internal story page', async ({
    page,
  }) => {
    await page.goto('/stories?category=announcements');
    const card = page.locator('article').filter({ hasText: 'E2E External Link Story' });
    const readArticleLink = card.getByRole('link', { name: /read article/i });
    await expect(readArticleLink).toHaveAttribute(
      'href',
      'https://example.com/e2e-external-article',
    );
  });
});
