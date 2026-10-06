// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'vitest-axe/matchers';

import {
  Badge,
  Button,
  Card,
  CardButton,
  CardLink,
  Chip,
  FilterChip,
  Input,
  Panel,
  Section,
  StatusPill,
  Tabs,
} from './index';

// Component mounts are fragments, not documents: run the WCAG rule set only
// and skip color-contrast, which needs real layout paint (covered by
// tests/contrast.test.ts).
async function expectNoViolations(html: Element | string) {
  const results = await axe(html, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    rules: { 'color-contrast': { enabled: false } },
  });
  const matcher = toHaveNoViolations(results);
  expect(matcher.pass, matcher.message()).toBe(true);
}

afterEach(() => {
  cleanup();
});

describe('core a11y', () => {
  it('has no axe violations across core primitives', async () => {
    const { container } = render(
      <>
        <Badge tone="accent">베타</Badge>
        <Button>저장</Button>
        <Button variant="secondary" icon={<svg aria-hidden="true" />}>보내기</Button>
        <Card>패널 내용</Card>
        <CardButton onClick={() => {}}>열기</CardButton>
        <CardLink href="/docs">문서</CardLink>
        <Chip>서울</Chip>
        <Chip variant="accent" onClick={() => {}}>필터</Chip>
        <FilterChip label="분야" count={12} />
        <FilterChip label="상태" active removable onToggle={() => {}} onRemove={() => {}} />
        <Input label="API 키" hint="64자" />
        <Panel tone="default">패널</Panel>
        <Section>본문</Section>
        <StatusPill status="success">정상</StatusPill>
        <Tabs tabs={[{ id: 'a', label: '개요' }, { id: 'b', label: '로그' }]} />
      </>,
    );

    await expectNoViolations(container);
  });

  it('Input binds its label programmatically', () => {
    const { container } = render(<Input label="엔드포인트" />);
    const input = container.querySelector('input');
    const label = container.querySelector('label');
    expect(input?.getAttribute('id')).toBeTruthy();
    expect(label?.getAttribute('for')).toBe(input?.getAttribute('id'));
  });

  it('Button activates on Enter and Space', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(<Button onClick={onClick}>저장</Button>);
    const button = container.querySelector('button') as HTMLElement;
    button.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('FilterChip toggles from the keyboard and exposes aria-pressed', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const { container } = render(<FilterChip label="분야" onToggle={onToggle} />);
    const chip = container.querySelector('button') as HTMLElement;
    expect(chip.getAttribute('aria-pressed')).toBe('false');
    chip.focus();
    await user.keyboard('{Enter}');
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('Tabs move the active tab with arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <Tabs
        tabs={[{ id: 'a', label: '개요' }, { id: 'b', label: '로그' }, { id: 'c', label: '설정' }]}
        onChange={onChange}
      />,
    );
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(3);
    (tabs[0] as HTMLElement).focus();
    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });
});
