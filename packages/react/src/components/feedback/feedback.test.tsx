// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  Alert,
  AlertTone,
  Dialog,
  Drawer,
  Toast,
  Tooltip,
} from './index';

function stylesheetPath() {
  const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
  return resolve(packageRoot, 'src/styles.css');
}

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
    render(<Alert tone={AlertTone.Warning} title="주의">게이트웨이 응답 지연. 네트워크 확인 필요.</Alert>);

    const el = screen.getByRole('status');
    expect(el.className).toContain('dt-alert');
    expect(el.className).toContain('dt-alert-warning');
    expect(el.getAttribute('style') ?? '').not.toContain('background');
    const stylesheet = readFileSync(stylesheetPath(), 'utf8');
    expect(stylesheet).toContain('.dt-alert {');
    expect(stylesheet).toContain('min-height: 62px');
    expect(stylesheet).toContain('padding: 13px 15px');
    expect(stylesheet).toContain('.dt-alert-warning { background: var(--dt-tint-warning); }');
  });

  it('uses adaptive strong contrast for every semantic tone', () => {
    const toneClasses = [
      [AlertTone.Info, 'dt-alert-info', 'var(--dt-tint-cobalt)'],
      [AlertTone.Success, 'dt-alert-success', 'var(--dt-tint-success)'],
      [AlertTone.Warning, 'dt-alert-warning', 'var(--dt-tint-warning)'],
      [AlertTone.Danger, 'dt-alert-danger', 'var(--dt-tint-danger)'],
    ] as const;

    const stylesheet = readFileSync(stylesheetPath(), 'utf8');
    for (const [tone, className, background] of toneClasses) {
      const { unmount } = render(<Alert tone={tone} title="상태">게이트웨이 상태를 확인했습니다.</Alert>);
      const el = screen.getByRole('status');
      expect(el.className).toContain(className);
      expect(el.getAttribute('style') ?? '').not.toContain('background');
      expect(stylesheet).toContain(`.${className} { background: ${background}; }`);
      unmount();
    }
  });

  it('keeps alerts static — the motion prop and pulse classes are removed', () => {
    render(<Alert title="안내">게이트웨이 응답 정상.</Alert>);

    const el = screen.getByRole('status');
    expect(el.className).toContain('dt-alert');
    expect(el.className).not.toContain('dt-alert-motion');
    expect(el.className).not.toContain('dt-alert-pulse');
    expect(el.style.transition).toBe('');
  });

  it('does not attach hover or press motion to static alerts', () => {
    const stylesheet = readFileSync(stylesheetPath(), 'utf8');

    expect(stylesheet).not.toContain('.dt-alert:hover');
    expect(stylesheet).not.toContain('.dt-alert:active');
  });

  it('uses package stylesheet classes for feedback motion', () => {
    render(<Toast message="저장됨" />);
    expect(screen.getByText('저장됨').closest('.dt-toast')).toBeTruthy();
  });

  it('uses the declared overlay and modal layers for dialogs', () => {
    render(<Dialog open title="확인">내용</Dialog>);

    const overlay = document.querySelector('[data-dt-dialog-overlay]');
    const content = document.querySelector('[data-dt-dialog-content]');
    expect(overlay?.className).toContain('dt-dialog-overlay');
    expect(content?.className).toContain('dt-dialog-viewport');
    expect(overlay?.getAttribute('style') ?? '').not.toContain('z-index');
    expect(content?.getAttribute('style') ?? '').not.toContain('z-index');
    const stylesheet = readFileSync(stylesheetPath(), 'utf8');
    expect(stylesheet).toContain('.dt-dialog-overlay');
    expect(stylesheet).toContain('z-index: var(--dt-z-index-overlay)');
    expect(stylesheet).toContain('.dt-dialog-viewport');
    expect(stylesheet).toContain('z-index: var(--dt-z-index-modal)');
  });

  it('uses declared layers and a shared 40px close target for drawers', () => {
    render(<Drawer open title="세부 정보">내용</Drawer>);

    const overlay = document.querySelector('[data-dt-drawer-overlay]');
    const content = document.querySelector('[data-dt-drawer-content]');
    expect(overlay?.className).toContain('dt-drawer-overlay');
    expect(content?.className).toContain('dt-drawer-popup');
    expect(overlay?.getAttribute('style') ?? '').not.toContain('z-index');
    expect(content?.getAttribute('style') ?? '').not.toContain('z-index');
    const stylesheet = readFileSync(stylesheetPath(), 'utf8');
    expect(stylesheet).toContain('.dt-drawer-overlay');
    expect(stylesheet).toContain('z-index: var(--dt-z-index-overlay)');
    expect(stylesheet).toContain('.dt-drawer-popup');
    expect(stylesheet).toContain('z-index: var(--dt-z-index-modal)');
    expect(document.querySelector('[aria-label="닫기"]')?.className).toContain('dt-close-control');
  });

  it('uses the shared close target for dismissible alerts', () => {
    render(<Alert title="안내" onDismiss={() => undefined} />);

    expect(screen.getByRole('button', { name: '닫기' }).className).toContain('dt-close-control');
  });

  it('reflects controlled open state on Dialog rerender', () => {
    const { rerender } = render(<Dialog open={false} title="확인">내용</Dialog>);
    expect(document.querySelector('[data-dt-dialog-content]')).toBeNull();

    rerender(<Dialog open title="확인">내용</Dialog>);
    expect(document.querySelector('[data-dt-dialog-content]')).toBeTruthy();
  });
});
