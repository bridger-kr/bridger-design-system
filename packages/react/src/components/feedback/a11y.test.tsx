// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Alert, Dialog, Drawer, Skeleton, Spinner, Toast, Tooltip } from './index';

afterEach(() => {
  cleanup();
});

describe('feedback a11y', () => {
  it('Dialog links its title via aria-labelledby', () => {
    render(
      <Dialog open title="설정 확인">
        <p>본문</p>
      </Dialog>,
    );
    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    const labelledby = dialog?.getAttribute('aria-labelledby');
    expect(labelledby).toBeTruthy();
    // the referenced id must exist in the DOM and contain the title text
    const labelEl = labelledby ? document.body.querySelector(`[id="${labelledby}"]`) : null;
    expect(labelEl?.textContent).toContain('설정 확인');
  });

  it('Dialog falls back to aria-label when no title', () => {
    render(
      <Dialog open aria-label="무제 대화상자">
        <p>본문</p>
      </Dialog>,
    );
    const dialog = document.body.querySelector('[role="dialog"]');
    expect(
      dialog?.getAttribute('aria-label') || dialog?.getAttribute('aria-labelledby'),
    ).toBeTruthy();
  });

  it('Drawer always has an accessible name', () => {
    render(
      <Drawer open title="로그">
        <p>스트림</p>
      </Drawer>,
    );
    const region =
      document.body.querySelector('[role="dialog"]') ||
      document.body.querySelector('[aria-label]') ||
      document.body.querySelector('[aria-labelledby]');
    expect(region).not.toBeNull();
    expect(
      region?.getAttribute('aria-label') || region?.getAttribute('aria-labelledby'),
    ).toBeTruthy();
  });

  it('Tooltip exposes a role=tooltip element and links it on focus', async () => {
    render(
      <Tooltip label="도움말">
        <button>hover</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'hover' }).parentElement;
    expect(trigger).toBeInstanceOf(HTMLElement);
    if (!(trigger instanceof HTMLElement)) {
      throw new TypeError('Tooltip trigger wrapper missing');
    }
    fireEvent.mouseEnter(trigger);
    await waitFor(() => expect(document.body.querySelector('[role="tooltip"]')).not.toBeNull());
    const tip = document.body.querySelector('[role="tooltip"]');
    expect(tip?.getAttribute('id')).toBeTruthy();
  });

  it('feedback motion classes render through package stylesheet hooks', () => {
    const { container } = render(
      <>
        <Toast message="저장됨" />
        <Spinner />
        <Skeleton />
      </>,
    );

    expect(container.querySelector('.dt-toast')).not.toBeNull();
    expect(container.querySelector('.dt-spinner-svg')).not.toBeNull();
    expect(container.querySelector('.dt-skeleton')).not.toBeNull();
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

  it('Alert inherits the consumer word-break contract for Korean messages', () => {
    const { container } = render(
      <Alert tone="danger" title="호출 실패">
        게이트웨이가 오류 응답을 반환했습니다.
      </Alert>,
    );

    const content = container.querySelector('.dt-alert > div');
    if (!(content instanceof HTMLElement)) throw new TypeError('Alert content wrapper missing');
    expect(content.style.wordBreak).toBe('');
  });

  it('Toast dismiss icon is aria-hidden', () => {
    const { container } = render(<Toast message="저장됨" onDismiss={() => {}} />);
    const svg = container.querySelector('svg[aria-hidden="true"]');
    expect(svg).not.toBeNull();
  });
});
