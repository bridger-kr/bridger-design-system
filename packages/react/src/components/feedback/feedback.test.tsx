// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DS_MESSAGES_KO } from '../../locale/messages';
import {
  Alert,
  AlertTone,
  Dialog,
  Drawer,
  Toast,
  Tooltip,
} from './index';

describe('feedback component exports', () => {
  it('exports all feedback components', () => {
    expect(Alert).toBeDefined();
    expect(AlertTone.Info).toBe('info');
    expect(Dialog).toBeDefined();
    expect(Drawer).toBeDefined();
    expect(Toast).toBeDefined();
    expect(Tooltip).toBeDefined();
  });

  it('renders the alert tone contract as a semantic status panel', () => {
    const { container } = render(
      <Alert tone={AlertTone.Warning} title="Warning">
        Gateway response delayed. Check the network.
      </Alert>,
    );
    const el = container.querySelector('.dt-alert');

    expect(el?.getAttribute('role')).toBe('status');
    expect(el?.getAttribute('style')).toContain('background: var(--dt-tint-warning)');
    expect(el?.getAttribute('style')).toContain('min-height: 62px');
  });

  it('uses adaptive strong contrast for every semantic tone', () => {
    const toneBackgrounds = [
      [AlertTone.Info, 'var(--dt-tint-cobalt)'],
      [AlertTone.Success, 'var(--dt-tint-success)'],
      [AlertTone.Warning, 'var(--dt-tint-warning)'],
      [AlertTone.Danger, 'var(--dt-tint-danger)'],
    ] as const;

    for (const [tone, background] of toneBackgrounds) {
      const { container, unmount } = render(
        <Alert tone={tone} title="Status">
          Checked the gateway status.
        </Alert>,
      );
      const el = container.querySelector('.dt-alert');
      expect(el?.getAttribute('style')).toContain(`background: ${background}`);
      expect(el?.getAttribute('style')).toContain('color: var(--dt-ink-strong)');
      unmount();
    }
  });

  it('supports opt-in motion while keeping the default static', () => {
    const { container, rerender } = render(
      <Alert title="Notice">Gateway response normal.</Alert>,
    );
    const staticAlert = container.querySelector('.dt-alert');
    expect(staticAlert?.className).toBe('dt-alert');
    expect(staticAlert?.getAttribute('style')).not.toContain('transition');

    rerender(
      <Alert tone={AlertTone.Success} title="Done" motion="pulse">
        Tool exposure applied.
      </Alert>,
    );
    expect(container.querySelector('.dt-alert')?.className).toBe('dt-alert dt-alert-motion-pulse');
  });

  it('does not attach hover or press motion to static alerts', () => {
    const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
    const stylesheet = readFileSync(resolve(packageRoot, 'src/styles.css'), 'utf8');

    expect(stylesheet).not.toContain('.dt-alert:hover');
    expect(stylesheet).not.toContain('.dt-alert:active');
  });

  it('uses package stylesheet classes for feedback motion', () => {
    const { container } = render(<Toast message="Saved" />);

    expect(container.querySelector('.dt-toast')).not.toBeNull();
  });

  it('uses the declared overlay and modal layers for dialogs', () => {
    render(<Dialog open title="Confirm">Content</Dialog>);

    expect(document.querySelector('[data-dt-dialog-overlay]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-overlay)');
    expect(document.querySelector('[data-dt-dialog-content]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-modal)');
  });

  it('uses declared layers and a shared 40px close target for drawers', () => {
    render(<Drawer open title="Details">Content</Drawer>);

    expect(document.querySelector('[data-dt-drawer-overlay]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-overlay)');
    expect(document.querySelector('[data-dt-drawer-content]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-modal)');
    expect(document.querySelector(`[aria-label="${DS_MESSAGES_KO.common.close}"]`)?.className).toContain('dt-close-control');
  });

  it('uses the shared close target for dismissible alerts', () => {
    const { container } = render(<Alert title="Notice" onDismiss={() => undefined} />);
    const closeButton = container.querySelector('.dt-close-control');

    expect(closeButton).not.toBeNull();
    expect(closeButton?.getAttribute('aria-label')).toBe(DS_MESSAGES_KO.common.close);
  });
});
