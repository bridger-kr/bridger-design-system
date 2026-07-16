// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
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
    const el = Alert({
      tone: AlertTone.Warning,
      title: '주의',
      children: '게이트웨이 응답 지연. 네트워크 확인 필요.',
    });

    expect(el.props.role).toBe('status');
    expect(el.props.style).toMatchObject({
      alignItems: 'flex-start',
      background: 'var(--dt-tint-warning)',
      borderRadius: '20px',
      color: 'var(--dt-ink-strong)',
      minHeight: 62,
      padding: '13px 15px',
      width: 'min(100%, 380px)',
    });
  });

  it('uses adaptive strong contrast for every semantic tone', () => {
    const toneBackgrounds = [
      [AlertTone.Info, 'var(--dt-tint-cobalt)'],
      [AlertTone.Success, 'var(--dt-tint-success)'],
      [AlertTone.Warning, 'var(--dt-tint-warning)'],
      [AlertTone.Danger, 'var(--dt-tint-danger)'],
    ] as const;

    for (const [tone, background] of toneBackgrounds) {
      const el = Alert({ tone, title: '상태', children: '게이트웨이 상태를 확인했습니다.' });
      expect(el.props.style).toMatchObject({
        background,
        color: 'var(--dt-ink-strong)',
      });
    }
  });

  it('supports opt-in motion while keeping the default static', () => {
    const staticAlert = Alert({ title: '안내', children: '게이트웨이 응답 정상.' });
    const liveAlert = Alert({
      tone: AlertTone.Success,
      title: '완료',
      children: '도구 노출이 적용되었습니다.',
      motion: 'pulse',
    });

    expect(staticAlert.props.className).toBe('dt-alert');
    expect(staticAlert.props.style.transition).toBeUndefined();
    expect(liveAlert.props.className).toBe('dt-alert dt-alert-motion-pulse');
  });

  it('does not attach hover or press motion to static alerts', () => {
    const stylesheet = readFileSync(resolve(process.cwd(), 'packages/react/src/styles.css'), 'utf8');

    expect(stylesheet).not.toContain('.dt-alert:hover');
    expect(stylesheet).not.toContain('.dt-alert:active');
  });

  it('uses package stylesheet classes for feedback motion', () => {
    expect(Toast({ message: '저장됨' }).props.className).toBe('dt-toast');
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
    const alert = Alert({ title: '안내', onDismiss: () => undefined });
    const closeButton = alert.props.children[2];

    expect(closeButton.props.className).toContain('dt-close-control');
  });
});
