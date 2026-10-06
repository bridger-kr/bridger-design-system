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
    expect(el.style.alignItems).toBe('flex-start');
    expect(el.style.background).toBe('var(--dt-tint-warning)');
    expect(el.style.borderRadius).toBe('var(--dt-radius-card)');
    expect(el.style.color).toBe('var(--dt-text-strong)');
    expect(el.style.minHeight).toBe('62px');
    expect(el.style.padding).toBe('13px 15px');
  });

  it('uses adaptive strong contrast for every semantic tone', () => {
    const toneBackgrounds = [
      [AlertTone.Info, 'var(--dt-tint-cobalt)'],
      [AlertTone.Success, 'var(--dt-tint-success)'],
      [AlertTone.Warning, 'var(--dt-tint-warning)'],
      [AlertTone.Danger, 'var(--dt-tint-danger)'],
    ] as const;

    for (const [tone, background] of toneBackgrounds) {
      const { unmount } = render(<Alert tone={tone} title="상태">게이트웨이 상태를 확인했습니다.</Alert>);
      const el = screen.getByRole('status');
      expect(el.style.background).toBe(background);
      expect(el.style.color).toBe('var(--dt-text-strong)');
      unmount();
    }
  });

  it('keeps alerts static — the motion prop and pulse classes are removed', () => {
    render(<Alert title="안내">게이트웨이 응답 정상.</Alert>);

    const el = screen.getByRole('status');
    expect(el.className).toBe('dt-alert');
    expect(el.className).not.toContain('dt-alert-motion');
    expect(el.style.transition).toBe('');
  });

  it('does not attach hover or press motion to static alerts', () => {
    const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
    const stylesheet = readFileSync(resolve(packageRoot, 'src/styles.css'), 'utf8');

    expect(stylesheet).not.toContain('.dt-alert:hover');
    expect(stylesheet).not.toContain('.dt-alert:active');
  });

  it('uses package stylesheet classes for feedback motion', () => {
    render(<Toast message="저장됨" />);
    expect(screen.getByText('저장됨').closest('.dt-toast')).toBeTruthy();
  });

  it('uses the declared overlay and modal layers for dialogs', () => {
    render(<Dialog open title="확인">내용</Dialog>);

    expect(document.querySelector('[data-dt-dialog-overlay]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-overlay)');
    expect(document.querySelector('[data-dt-dialog-content]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-modal)');
  });

  it('uses declared layers and a shared 40px close target for drawers', () => {
    render(<Drawer open title="세부 정보">내용</Drawer>);

    expect(document.querySelector('[data-dt-drawer-overlay]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-overlay)');
    expect(document.querySelector('[data-dt-drawer-content]')?.getAttribute('style')).toContain('z-index: var(--dt-z-index-modal)');
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
