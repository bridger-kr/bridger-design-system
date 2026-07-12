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
    expect(liveAlert.props.className).toBe('dt-alert dt-alert-motion-pulse');
  });

  it('uses package stylesheet classes for feedback motion', () => {
    expect(Toast({ message: '저장됨' }).props.className).toBe('dt-toast');
  });
});
