// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { X } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { Icon } from '../../lib/icon';

describe('button interaction styles', () => {
  it('keeps the loading label accessible, centers its spinner, and avoids hover lift', () => {
    const css = readFileSync(resolve(process.cwd(), 'packages/react/src/styles.css'), 'utf8');
    expect(css).toMatch(/\.dt-button\s*\{[^}]*position:\s*relative/);
    expect(css).toMatch(/\.dt-button\[aria-busy='true'\] \.dt-button-content\s*\{\s*opacity:\s*0;/);
    expect(css).not.toMatch(/\.dt-button\[aria-busy[^}]*visibility:\s*hidden/);
    expect(css).toMatch(/:is\(\.dt-button[^}]*:focus-visible\s*\{\s*outline:\s*3px solid var\(--dt-accent\)/);
    expect(css).not.toMatch(/\.dt-button-(?:solid|outline)[^{]*:hover\s*\{[^}]*transform:/);
    expect(css).toMatch(/prefers-reduced-motion: reduce[\s\S]*\.dt-button-solid,[\s\S]*transition: none !important/);
  });
});

import {
  Badge,
  BUTTON_SIZE,
  BUTTON_VARIANT,
  Button,
  Card,
  CardButton,
  CardLink,
  CardTone,
  Chip,
  FilterChip,
  Input,
  MetricAccent,
  Panel,
  Section,
  StatusPill,
  SurfaceTone,
  Tabs,
  cx,
  metricAccentColor,
} from './index';

describe('core exports', () => {
  it('exports all core components as forwardRef objects with displayName', () => {
    for (const component of [Badge, Button, Card, Chip, Panel, FilterChip, Input, Section, StatusPill, Tabs]) {
      expect(component).toBeDefined();
      expect((component as { $$typeof?: symbol }).$$typeof).toBe(Symbol.for('react.forward_ref'));
      expect((component as { displayName?: string }).displayName).toBeTruthy();
    }
  });

  it('renders a Button with minimal props', () => {
    render(<Button>저장</Button>);

    const button = screen.getByRole('button', { name: '저장' });
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
  });

  it('forwards refs to the rendered DOM element', () => {
    const buttonRef = createRef<HTMLButtonElement>();
    const inputRef = createRef<HTMLInputElement>();
    const cardRef = createRef<HTMLDivElement>();
    render(
      <>
        <Button ref={buttonRef}>저장</Button>
        <Input ref={inputRef} label="이메일" />
        <Card ref={cardRef}>카드</Card>
      </>,
    );

    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
    expect(cardRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it('exports enum-like surface contracts used by apps', () => {
    render(
      <>
        <Card tone={CardTone.Raised}>상태</Card>
        <Panel tone={SurfaceTone.Raised}>패널</Panel>
      </>,
    );

    // `raised` collapses to the flat plane in v2; surface tokens live in `.dt-card-*` CSS
    expect(screen.getByText('상태').className).toContain('dt-card-plain');
    expect(screen.getByText('패널').className).toContain('bg-[var(--dt-surface-raised)]');
    expect(metricAccentColor(MetricAccent.Success)).toBe('text-[var(--dt-success)]');
    expect(cx('a', false, 'b')).toBe('a b');
  });

  it('maps Card variants to surface classes and keeps legacy names as aliases', () => {
    render(
      <>
        <Card variant="plain">기본</Card>
        <Card variant="sunken">움푹</Card>
        <Card tone={CardTone.Default}>레거시 기본</Card>
        <Card tone={CardTone.Muted}>레거시 뮤트</Card>
        <Card tone={CardTone.Panel}>레거시 패널</Card>
        <Card variant={CardTone.Muted}>레거시 변형</Card>
        <Card>초기값</Card>
      </>,
    );

    expect(screen.getByText('기본').className).toContain('dt-card-plain');
    expect(screen.getByText('움푹').className).toContain('dt-card-sunken');
    expect(screen.getByText('레거시 기본').className).toContain('dt-card-plain');
    expect(screen.getByText('레거시 뮤트').className).toContain('dt-card-sunken');
    expect(screen.getByText('레거시 패널').className).toContain('dt-card-plain');
    expect(screen.getByText('레거시 변형').className).toContain('dt-card-sunken');
    expect(screen.getByText('초기값').className).toContain('dt-card-plain');
  });

  it('keeps Card non-actionable and exposes native action variants', () => {
    render(
      <>
        <Card>기본 카드</Card>
        <CardButton>실행</CardButton>
        <CardLink href="/tools">도구 열기</CardLink>
        <Card padding={8}>여백</Card>
      </>,
    );

    const defaultCard = screen.getByText('기본 카드');
    const cardButton = screen.getByRole('button', { name: '실행' });
    const cardLink = screen.getByRole('link', { name: '도구 열기' });

    expect(defaultCard.tagName).toBe('DIV');
    expect(defaultCard.className).toContain('dt-card');
    expect(defaultCard.style.padding).toBe('20px');
    expect(screen.getByText('여백').style.padding).toBe('8px');
    expect(cardButton.getAttribute('type')).toBe('button');
    expect(cardButton.className).toContain('dt-card-action');
    expect(cardLink.getAttribute('href')).toBe('/tools');
    expect(cardButton.querySelector('style')).toBeNull();
  });

  it('activates CardButton with Enter and Space while respecting disabled state', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CardButton onClick={onClick}>도구 실행</CardButton>);

    const action = screen.getByRole('button', { name: '도구 실행' });
    action.focus();
    expect(document.activeElement).toBe(action);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);

    render(<CardButton disabled onClick={onClick}>비활성 도구</CardButton>);
    await user.click(screen.getByRole('button', { name: '비활성 도구' }));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('maps every Badge tone to its status class (status-only, never decorative)', () => {
    render(
      <>
        <Badge>중립</Badge>
        <Badge tone="accent">강조</Badge>
        <Badge tone="info">정보</Badge>
        <Badge tone="success">성공</Badge>
        <Badge tone="warning">경고</Badge>
        <Badge tone="danger">위험</Badge>
      </>,
    );

    expect(screen.getByText('중립').className).toContain('dt-badge');
    expect(screen.getByText('강조').className).toContain('dt-badge-accent');
    expect(screen.getByText('정보').className).toContain('dt-badge-info');
    expect(screen.getByText('성공').className).toContain('dt-badge-success');
    expect(screen.getByText('경고').className).toContain('dt-badge-warning');
    expect(screen.getByText('위험').className).toContain('dt-badge-danger');
  });

  it('Button maps every public variant and size to semantic CSS hooks', () => {
    render(
      <>
        <Button variant={BUTTON_VARIANT.Solid} tone="danger" size={BUTTON_SIZE.Small}>
          삭제
        </Button>
        <Button variant={BUTTON_VARIANT.Outline} size={BUTTON_SIZE.Large}>
          연결
        </Button>
      </>,
    );

    const danger = screen.getByRole('button', { name: '삭제' });
    const secondary = screen.getByRole('button', { name: '연결' });
    expect(danger.className).toContain('dt-button-solid');
    expect(danger.getAttribute('data-tone')).toBe('danger');
    expect(danger.className).toContain('dt-button-sm');
    expect(secondary.className).toContain('dt-button-outline');
    expect(secondary.className).toContain('dt-button-lg');
  });

  it('Button keeps the native type and forwards only consumer-supplied inline style', () => {
    const style = { height: 20 };
    render(<Button style={style}>저장</Button>);

    const el = screen.getByRole('button', { name: '저장' });
    expect(el.tagName).toBe('BUTTON');
    expect(el.getAttribute('type')).toBe('button');
    expect(el.className).toContain('dt-button-solid');
    expect(el.className).toContain('dt-button-md');
    expect(el.style.height).toBe('20px');
  });

  it('Button renders as another element through the base-ui render prop', () => {
    render(<Button render={<a href="/pricing" />}>요금</Button>);

    const link = screen.getByRole('link', { name: '요금' });
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/pricing');
    expect(link.className).toContain('dt-button');
    expect(link.className).toContain('dt-button-solid');
  });

  it('warns once when a deprecated Button variant alias is used', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(
      <>
        <Button variant="primary">기본</Button>
        <Button variant="primary">기본 두번째</Button>
      </>,
    );

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toContain('variant="primary"');
    expect(screen.getByRole('button', { name: '기본' }).className).toContain('dt-button-solid');
    warn.mockRestore();
  });

  it('pins package icons to the icon canon — size scale, 1.75 stroke, currentColor, a11y', () => {
    const { container } = render(
      <>
        <Icon icon={X} />
        <Icon icon={X} size="sm" />
        <Icon icon={X} label="닫기" />
      </>,
    );
    const svgs = container.querySelectorAll('svg');

    expect(svgs[0].getAttribute('width')).toBe('16');
    expect(svgs[0].getAttribute('stroke-width')).toBe('1.75');
    expect(svgs[0].getAttribute('stroke')).toBe('currentColor');
    expect(svgs[0].getAttribute('aria-hidden')).toBe('true');
    expect(svgs[1].getAttribute('width')).toBe('14');
    expect(svgs[2].getAttribute('role')).toBe('img');
    expect(svgs[2].getAttribute('aria-label')).toBe('닫기');
  });

  it('names icon-only Buttons accessibly and hides their icon glyph', () => {
    render(<Button icon={<X />} aria-label="닫기" />);
    const action = screen.getByRole('button', { name: '닫기' });
    const glyph = action.querySelector('svg');

    expect(glyph).not.toBeNull();
    expect(glyph?.closest('[aria-hidden="true"]')).not.toBeNull();

    // @ts-expect-error icon-only buttons require aria-label
    void (<Button icon={<X />} />);
    // @ts-expect-error icon-only buttons require aria-label
    void (<Button iconRight={<X />} />);
    // @ts-expect-error icon props cannot render a label-less button
    void (<Button icon={<X />} iconRight={<X />} />);
  });

  it('defines token-backed Button size floors and disabled state in CSS', () => {
    const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
    const stylesheet = readFileSync(resolve(packageRoot, 'src/styles.css'), 'utf8');

    expect(stylesheet).toMatch(/\.dt-button\s*\{[^}]*min-height:\s*var\(--dt-space-5\)/s);
    expect(stylesheet).toMatch(/\.dt-button-sm\s*\{[^}]*min-height:\s*var\(--dt-space-5\)/s);
    expect(stylesheet).toMatch(/\.dt-button-md\s*\{[^}]*min-height:\s*calc\(var\(--dt-space-5\) \+ var\(--dt-space-1\)\)/s);
    expect(stylesheet).toMatch(/\.dt-button-lg\s*\{[^}]*min-height:\s*calc\(var\(--dt-space-5\) \+ var\(--dt-space-2\)\)/s);
    expect(stylesheet).toMatch(/\.dt-button:disabled\s*\{[^}]*cursor:\s*not-allowed[^}]*opacity:\s*0\.55/s);
    expect(stylesheet).toMatch(/\.dt-button-solid\[data-tone='danger'\]\s*\{[^}]*border-color:\s*var\(--dt-danger\)[^}]*background:\s*var\(--dt-danger\)/s);
  });

  it('defines Card tones, action targets, and chip floors in CSS', () => {
    const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
    const stylesheet = readFileSync(resolve(packageRoot, 'src/styles.css'), 'utf8');

    expect(stylesheet).toMatch(/\.dt-card\s*\{[^}]*border:\s*1px solid var\(--dt-border\)/s);
    expect(stylesheet).toMatch(/\.dt-card-muted[^{]*\{\s*background:\s*var\(--dt-surface-sunken\)/s);
    expect(stylesheet).toMatch(/\.dt-card-raised\s*\{\s*background:\s*var\(--dt-surface-raised\)/s);
    expect(stylesheet).toMatch(/\.dt-card-action\s*\{[^}]*min-height:\s*var\(--dt-space-5\)/s);
    expect(stylesheet).toMatch(/\.dt-filter-chip\s*\{[^}]*min-height:\s*var\(--dt-space-5\)/s);
  });

  it('locks §11 anti-slop invariants in the stylesheet (EDD-232)', () => {
    const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
    const stylesheet = readFileSync(resolve(packageRoot, 'src/styles.css'), 'utf8');

    expect(stylesheet).not.toMatch(/backdrop-filter/);
    expect(stylesheet).not.toMatch(/radial-gradient|linear-gradient/);
    // The only permitted looping animation is the Spinner.
    const infiniteLoops = stylesheet.match(/\binfinite\b/g) ?? [];
    expect(infiniteLoops).toHaveLength(1);
    // `!important` is reserved for the prefers-reduced-motion override blocks
    // that must beat consumer inline transitions.
    const outsideReducedMotion = stylesheet.replace(/@media \(prefers-reduced-motion[^}]*\{[\s\S]*?\n\}/g, '');
    expect(outsideReducedMotion).not.toMatch(/!important/);
  });

  it('exports chip, section, and segmented tabs as additive contracts', () => {
    render(
      <>
        <Chip tone="accent" size="sm">MCP</Chip>
        <Section variant="proof" tone="grid">증거</Section>
        <Tabs variant="pill" tabs={[{ id: 'a', label: 'A' }]} />
      </>,
    );

    expect(screen.getByText('MCP').className).toContain('dt-chip-accent');
    const section = screen.getByText('증거').closest('section');
    expect(section?.className).toContain('dt-section-sunken');
    expect(document.querySelector('.dt-tabs-list-segmented')).toBeTruthy();
  });

  it('renders static chips as spans and actionable chips as native buttons', () => {
    render(
      <>
        <Chip>상태</Chip>
        <Chip onClick={() => undefined}>재시도</Chip>
      </>,
    );

    const staticChip = screen.getByText('상태');
    const actionChip = screen.getByRole('button', { name: '재시도' });

    expect(staticChip.tagName).toBe('SPAN');
    expect(staticChip.className).not.toContain('dt-chip-interactive');
    expect(actionChip.getAttribute('type')).toBe('button');
    expect(actionChip.className).toContain('dt-chip-interactive');
    expect(actionChip.getAttribute('style') ?? '').not.toContain('min-height');
    const packageRoot = process.cwd().endsWith('packages/react') ? process.cwd() : resolve(process.cwd(), 'packages/react');
    const stylesheet = readFileSync(resolve(packageRoot, 'src/styles.css'), 'utf8');
    expect(stylesheet).toContain('min-height: var(--dt-space-5)');
    expect(stylesheet).toContain('min-width: var(--dt-space-5)');
  });

  it('activates actionable chips with Enter and Space and blocks disabled actions', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Chip onClick={onClick}>재시도</Chip>);

    const action = screen.getByRole('button', { name: '재시도' });
    action.focus();
    expect(document.activeElement).toBe(action);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledTimes(2);

    render(<Chip disabled onClick={onClick}>사용 불가</Chip>);
    await user.click(screen.getByRole('button', { name: '사용 불가' }));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('uses stylesheet state hooks without injecting Tabs styles', () => {
    render(<Tabs tabs={[{ id: 'weather', label: '날씨' }]} />);

    const list = document.querySelector('.dt-tabs-list');
    expect(list?.className).toContain('dt-tabs-list-underline');
    expect(document.querySelector('.dt-tabs-tab')?.className).toContain('dt-tabs-tab-underline');
    expect(document.querySelector('.dt-tabs-list style')).toBeNull();
  });

  it('gives FilterChip toggle and remove controls canonical target hooks', () => {
    const { container } = render(
      <>
        <FilterChip label="날씨" />
        <FilterChip label="지역" removable />
      </>,
    );

    const toggle = screen.getByRole('button', { name: '날씨' });
    const removableGroup = screen.getByRole('button', { name: '지역' }).parentElement;

    expect(toggle.className).toContain('dt-filter-chip');
    expect(removableGroup?.className).toContain('dt-filter-chip-group');
    expect(removableGroup?.querySelector('.dt-filter-chip-remove')).toBeTruthy();
    expect(container.querySelector('style')).toBeNull();
  });

  it('marks input controls and pulses live statuses by default', () => {
    render(
      <>
        <Input label="엔드포인트" disabled />
        <StatusPill status="connected">연결됨</StatusPill>
      </>,
    );

    const inputControl = screen.getByLabelText('엔드포인트');
    expect(inputControl.className).toContain('dt-input-control');
    expect((inputControl as HTMLInputElement).disabled).toBe(true);
    expect(screen.getByText('연결됨').parentElement?.querySelector('.dt-status-pulse')).toBeTruthy();
  });

  it('gives every labeled control a unique useId-backed id', () => {
    render(
      <>
        <Input label="이메일" />
        <Input label="이메일" />
      </>,
    );

    const inputs = screen.getAllByLabelText('이메일');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]?.id).toBeTruthy();
    expect(inputs[1]?.id).toBeTruthy();
    expect(inputs[0]?.id).not.toBe(inputs[1]?.id);
  });

  it('scopes Input className to the root and input styles to slotProps.input', () => {
    render(
      <Input
        label="엔드포인트"
        className="row-span"
        slotProps={{ input: { className: 'mono-field' } }}
      />,
    );

    const input = screen.getByLabelText('엔드포인트');
    const root = input.closest('.dt-input');
    expect(root?.className).toContain('row-span');
    expect(input.className).toContain('mono-field');
  });

  it('renders status motion without injecting a style tag', () => {
    const { container } = render(<StatusPill status="reconnecting">재연결 중</StatusPill>);

    expect(container.querySelector('style')).toBeNull();
  });
});

describe('Button loading contract (DS #30)', () => {
  it('shows a spinner, sets aria-busy, and blocks duplicate activation', () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>저장</Button>);

    const button = screen.getByRole('button', { name: '저장' });
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(button.querySelector('.dt-button-spinner')).toBeTruthy();
    expect(button.querySelector('.dt-button-content')).toBeTruthy();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
