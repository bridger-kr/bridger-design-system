import { expect, test } from '@playwright/test';

/**
 * DS #44 — the theme contract must render the OS theme with zero JavaScript.
 * The fixture pages link packages/tokens/css/index.css directly and contain no
 * scripts; `javaScriptEnabled: false` additionally proves nothing is injected.
 */

// Computed colors serialize in their authored notation: hex -> rgb(), oklch -> oklch().
const LIGHT_BG = 'rgb(255, 255, 255)'; // --dt-bg light arm: #ffffff
const DARK_BG = 'oklch(0.145 0 0)'; // --dt-bg dark arm

test.describe('OS dark, no stored preference', () => {
  test.use({ colorScheme: 'dark', javaScriptEnabled: false });

  test('renders dark tokens without JavaScript', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toHaveCSS('background-color', DARK_BG);
    await expect(page.locator('body')).toHaveCSS('color', 'oklch(0.97 0 0)'); // --dt-text dark arm
  });

  test('deprecated .dark alias stays dark under an OS-dark default', async ({ page }) => {
    await page.goto('/class.html');
    await expect(page.locator('body')).toHaveCSS('background-color', DARK_BG);
  });
});

test.describe('explicit pins beat the OS', () => {
  test.use({ javaScriptEnabled: false });

  test('data-theme=light wins over a dark OS', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/light.html');
    await expect(page.locator('body')).toHaveCSS('background-color', LIGHT_BG);
  });

  test('data-theme=dark wins over a light OS', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/dark.html');
    await expect(page.locator('body')).toHaveCSS('background-color', DARK_BG);
  });
});

test.describe('OS light, no stored preference', () => {
  test.use({ colorScheme: 'light', javaScriptEnabled: false });

  test('renders light tokens without JavaScript', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toHaveCSS('background-color', LIGHT_BG);
  });
});
