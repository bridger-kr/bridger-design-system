// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import { Alert, Dialog, Drawer, Toast, Tooltip } from './index';

describe('feedback a11y', () => {
  it('Dialog links its title via aria-labelledby', () => {
    const { container } = render(
      <Dialog open title="설정 확인">
        <p>본문</p>
      </Dialog>,
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    const labelledby = dialog?.getAttribute('aria-labelledby');
    expect(labelledby).toBeTruthy();
    // the referenced id must exist in the DOM and contain the title text
    const labelEl = labelledby ? container.querySelector(`[id="${labelledby}"]`) : null;
    expect(labelEl?.textContent).toContain('설정 확인');
  });

  it('Dialog falls back to aria-label when no title', () => {
    const { container } = render(
      <Dialog open aria-label="무제 대화상자">
        <p>본문</p>
      </Dialog>,
    );
    const dialog = container.querySelector('[role="dialog"]');
    expect(
      dialog?.getAttribute('aria-label') || dialog?.getAttribute('aria-labelledby'),
    ).toBeTruthy();
  });

  it('Drawer always has an accessible name', () => {
    const { container } = render(
      <Drawer open title="로그">
        <p>스트림</p>
      </Drawer>,
    );
    const region =
      container.querySelector('[role="dialog"]') ||
      container.querySelector('[aria-label]') ||
      container.querySelector('[aria-labelledby]');
    expect(region).not.toBeNull();
    expect(
      region?.getAttribute('aria-label') || region?.getAttribute('aria-labelledby'),
    ).toBeTruthy();
  });

  it('Tooltip exposes a role=tooltip element and links it on focus', () => {
    const { container } = render(
      <Tooltip label="도움말">
        <button>hover</button>
      </Tooltip>,
    );
    const tip = container.querySelector('[role="tooltip"]');
    expect(tip).not.toBeNull();
    const tipId = tip?.getAttribute('id');
    expect(tipId).toBeTruthy();
    const trigger = container.querySelector('span') as HTMLElement;
    fireEvent.focus(trigger);
    const described = container.querySelector(`[aria-describedby="${tipId}"]`);
    expect(described).not.toBeNull();
  });

  it('Alert dismiss button has an accessible label and hidden icon', () => {
    const { container } = render(
      <Alert tone="info" onDismiss={() => {}}>
        메시지
      </Alert>,
    );
    const closeBtn = container.querySelector('button[aria-label]');
    expect(closeBtn).not.toBeNull();
    const svg = closeBtn?.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('Toast dismiss icon is aria-hidden', () => {
    const { container } = render(<Toast message="저장됨" onDismiss={() => {}} />);
    const svg = container.querySelector('svg[aria-hidden="true"]');
    expect(svg).not.toBeNull();
  });
});
