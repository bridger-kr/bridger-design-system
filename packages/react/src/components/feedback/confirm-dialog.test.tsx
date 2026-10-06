// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DS_MESSAGES_EN, DS_MESSAGES_KO } from '../../locale/messages';
import { DSLocaleProvider } from '../../locale/DSLocaleProvider';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('names the target and impact for destructive confirms in ko', () => {
    render(
      <ConfirmDialog
        open
        danger
        title="Delete this key?"
        target="weather_getForecast"
        impact="Calls using this key stop working immediately."
      />,
    );

    expect(screen.getByText('weather_getForecast')).toBeTruthy();
    expect(screen.getByText('Calls using this key stop working immediately.')).toBeTruthy();
    const confirm = screen.getByRole('button', { name: DS_MESSAGES_KO.confirmDialog.confirmDanger });
    expect(confirm.getAttribute('data-tone')).toBe('danger');
    expect(screen.getByRole('button', { name: DS_MESSAGES_KO.confirmDialog.cancel })).toBeTruthy();
  });

  it('switches defaults to en under DSLocaleProvider', () => {
    render(
      <DSLocaleProvider locale="en">
        <ConfirmDialog open danger title="Delete this key?" target="weather_getForecast" />
      </DSLocaleProvider>,
    );

    expect(screen.getByRole('button', { name: DS_MESSAGES_EN.confirmDialog.confirmDanger })).toBeTruthy();
    expect(screen.getByRole('button', { name: DS_MESSAGES_EN.confirmDialog.cancel })).toBeTruthy();
  });

  it('fires onConfirm and onClose through the footer actions', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();
    const { unmount } = render(
      <ConfirmDialog open title="Deploy now?" onConfirm={onConfirm} onClose={onClose} />,
    );

    fireEvent.click(screen.getByRole('button', { name: DS_MESSAGES_KO.confirmDialog.confirm }));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: DS_MESSAGES_KO.confirmDialog.cancel }));
    expect(onClose).toHaveBeenCalled();
    unmount();
  });

  it('matches the ko snapshot', () => {
    render(
      <ConfirmDialog
        open
        danger
        title="Delete this key?"
        target="weather_getForecast"
        impact="Calls using this key stop working immediately."
      />,
    );
    expect(document.querySelector('.dt-confirm-dialog')).toMatchSnapshot();
  });

  it('matches the en snapshot', () => {
    render(
      <DSLocaleProvider locale="en">
        <ConfirmDialog
          open
          danger
          title="Delete this key?"
          target="weather_getForecast"
          impact="Calls using this key stop working immediately."
        />
      </DSLocaleProvider>,
    );
    expect(document.querySelector('.dt-confirm-dialog')).toMatchSnapshot();
  });
});
