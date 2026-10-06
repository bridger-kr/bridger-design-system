// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DSLocaleProvider } from '../../locale/DSLocaleProvider';
import { Field } from './Field';
import { Input } from '../core/Input';

describe('Field', () => {
  it('binds the label to the control and links the hint via aria-describedby', () => {
    const { container } = render(
      <Field label="API key" hint="Shown once at creation">
        <Input />
      </Field>,
    );

    const input = container.querySelector('input');
    const label = container.querySelector('label');
    const hint = container.querySelector('[id$="-hint"]');

    expect(input).not.toBeNull();
    expect(label?.getAttribute('for')).toBe(input?.id);
    expect(input?.getAttribute('aria-describedby')).toBe(hint?.id);
    expect(input?.getAttribute('aria-invalid')).toBeNull();
  });

  it('marks the control invalid and adds the error to aria-describedby', () => {
    const { container } = render(
      <Field label="API key" hint="Shown once at creation" error="Required field">
        <Input />
      </Field>,
    );

    const input = container.querySelector('input');
    const error = screen.getByText('Required field');
    const describedBy = input?.getAttribute('aria-describedby') ?? '';

    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(describedBy).toContain(error.id);
    expect(container.querySelector('.dt-field-group')?.getAttribute('data-invalid')).toBe('');
  });

  it('marks required controls and shows a non-text-required marker', () => {
    const { container } = render(
      <Field label="Endpoint" required>
        <Input />
      </Field>,
    );

    const input = container.querySelector('input');
    expect(input?.getAttribute('aria-required')).toBe('true');
    expect(input?.required).toBe(true);
  });

  it('supports a render prop for controls that need the ids explicitly', () => {
    render(
      <Field label="Endpoint" id="endpoint" hint="https only">
        {(control) => <input {...control} />}
      </Field>,
    );

    const input = screen.getByLabelText('Endpoint');
    expect(input.id).toBe('endpoint');
    expect(input.getAttribute('aria-describedby')).toBe('endpoint-hint');
  });

  it('matches the ko snapshot', () => {
    const { container } = render(
      <Field id="spec" label="Spec file" hint="JSON or YAML" error="Required field" required>
        <input />
      </Field>,
    );
    expect(container.firstElementChild).toMatchSnapshot();
  });

  it('matches the en snapshot', () => {
    const { container } = render(
      <DSLocaleProvider locale="en">
        <Field id="spec" label="Spec file" hint="JSON or YAML" error="Required field" required>
          <input />
        </Field>
      </DSLocaleProvider>,
    );
    expect(container.firstElementChild).toMatchSnapshot();
  });
});
