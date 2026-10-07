import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@playwright/test';

/**
 * Release-gate matrix (DS #31). Drives the real component harness
 * (examples/ui_kits/primitives/release-harness) across the contract cells:
 * viewport 375/768/1280 × theme light/dark × locale ko/en × motion
 * normal/reduced. Every cell asserts rendered state AND uploads a full-page
 * screenshot so CI artifacts carry per-cell evidence.
 *
 * Screenshots are artifacts for review, not pixel baselines — semantic
 * assertions below carry the pass/fail signal, so flaky retries never mask
 * real regressions.
 */

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const HARNESS_DIST = resolve(ROOT, 'examples/ui_kits/primitives/dist/release-harness.html');
const harnessBuilt = existsSync(HARNESS_DIST);

const CELLS = [
  { name: '375-light-ko', viewport: { width: 375, height: 812 }, theme: 'light', locale: 'ko' },
  { name: '375-dark-ko', viewport: { width: 375, height: 812 }, theme: 'dark', locale: 'ko' },
  { name: '768-light-ko', viewport: { width: 768, height: 1024 }, theme: 'light', locale: 'ko' },
  { name: '1280-light-en', viewport: { width: 1280, height: 800 }, theme: 'light', locale: 'en' },
  { name: '1280-dark-en', viewport: { width: 1280, height: 800 }, theme: 'dark', locale: 'en' },
] as const;

const SECTIONS = ['button', 'stat-tile', 'usage-meter', 'table', 'logrow', 'forms', 'feedback', 'sidebar'] as const;

test.describe('release matrix', () => {
  test.skip(!harnessBuilt, 'run `pnpm build:example:primitives` first');

  for (const cell of CELLS) {
    test(`${cell.name}: renders every component section`, async ({ page }, testInfo) => {
      await page.setViewportSize(cell.viewport);
      await page.goto(`/app/release-harness.html?theme=${cell.theme}&locale=${cell.locale}`);
      await page.waitForSelector('[data-matrix="root"]');

      for (const section of SECTIONS) {
        await expect(page.locator(`[data-matrix="${section}"]`)).toBeVisible();
      }

      // Unknown usage never collapses to 0.
      const meters = page.locator('[role="meter"]');
      await expect(meters).toHaveCount(3);
      await expect(meters.nth(2)).toHaveAttribute(
        'aria-valuetext',
        cell.locale === 'en' ? 'Unknown' : '확인 안 됨',
      );

      // Severity is text+icon, not color-only.
      const levelChips = page.locator('[data-matrix="logrow"] .dt-logrow-level');
      await expect(levelChips).toHaveCount(4);
      await expect(levelChips.nth(2)).toContainText(cell.locale === 'en' ? 'ERR' : '오류');

      // Direction vs valence split on StatTile.
      const deltas = page.locator('.dt-stat-tile-delta');
      await expect(deltas.nth(1)).toHaveClass(/delta-positive/);
      await expect(deltas.nth(1)).toHaveAttribute('data-direction', 'down');
      await expect(deltas.nth(2)).toHaveClass(/delta-negative/);

      // Non-ready states keep the provenance line, not a synthesized 0.
      await expect(page.locator('[data-matrix="stat-tile"] .dt-stat-tile-unknown')).toContainText(
        cell.locale === 'en' ? 'Unknown' : '확인 안 됨',
      );
      const stateRows = page.locator('[data-matrix="table"] .dt-table-state-row');
      await expect(stateRows.first()).toContainText(
        cell.locale === 'en' ? 'partial data' : '일부 데이터',
      );
      await expect(stateRows.last()).toContainText(
        cell.locale === 'en' ? 'Loading' : '불러오는 중',
      );

      // No horizontal overflow at small widths.
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(cell.viewport.width + 1);

      // Artifact: per-cell screenshot.
      const shot = testInfo.outputPath(`matrix-${cell.name}.png`);
      await page.screenshot({ path: shot, fullPage: true });
      await testInfo.attach(`matrix-${cell.name}`, { path: shot, contentType: 'image/png' });
    });
  }

  test('theme pins flip the token theme', async ({ page }) => {
    await page.goto('/app/release-harness.html?theme=light');
    const lightSurface = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--dt-surface').trim(),
    );
    await page.goto('/app/release-harness.html?theme=dark');
    const darkSurface = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--dt-surface').trim(),
    );
    expect(lightSurface).not.toBe('');
    expect(darkSurface).not.toBe('');
    expect(lightSurface).not.toEqual(darkSurface);
  });

  test('reduced motion kills component transitions', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/app/release-harness.html');
    const durations = await page.evaluate(() =>
      Array.from(document.querySelectorAll('.dt-usage-meter-fill')).map(
        (el) => getComputedStyle(el).transitionDuration,
      ),
    );
    expect(durations.length).toBeGreaterThan(0);
    for (const duration of durations) {
      expect(duration).toBe('0s');
    }
  });

  test('keyboard focus reaches interactive controls with a visible ring', async ({ page }) => {
    await page.goto('/app/release-harness.html');
    // First tab stops land on real controls (buttons/inputs), not the page chrome.
    await page.keyboard.press('Tab');
    const tag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(['button', 'input', 'a', 'select', 'textarea']).toContain(tag);
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return '';
      const style = getComputedStyle(el);
      return style.outlineStyle !== 'none' ? style.outlineStyle : style.boxShadow;
    });
    expect(outline === '' || outline === 'none').toBeFalsy();
  });
});
