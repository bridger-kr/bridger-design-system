import { Tooltip as BaseTooltip } from '@base-ui-components/react/tooltip';
import type { ReactNode } from 'react';
import { useId, useState } from 'react';

export interface TooltipProps {
  label: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

export function Tooltip({ label, position = 'top', children }: TooltipProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root open={open} onOpenChange={setOpen}>
        <BaseTooltip.Trigger
          render={
            <span
              className="dt-tooltip-trigger"
              style={{ display: 'inline-flex' }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
            />
          }
        >
          {children}
        </BaseTooltip.Trigger>
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={position}
            sideOffset={7}
            className="dt-tooltip-positioner"
            style={{ zIndex: 'var(--dt-z-index-popover)' }}
          >
            <BaseTooltip.Popup
              id={tooltipId}
              role="tooltip"
              className="dt-tooltip-popup"
              style={{
                whiteSpace: 'nowrap', pointerEvents: 'none', padding: '6px 9px', fontSize: 12, fontWeight: 500, lineHeight: 1.2,
                color: 'var(--dt-paper)', background: 'var(--dt-ink-strong)', borderRadius: 'var(--dt-radius-sm)', boxShadow: 'var(--dt-shadow-md)',
                transition: 'opacity var(--dt-motion-fast), visibility var(--dt-motion-fast)',
              }}
            >
              {label}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
