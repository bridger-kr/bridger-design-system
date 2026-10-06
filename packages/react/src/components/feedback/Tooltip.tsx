import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { forwardRef, useId, useState } from 'react';
import type { ComponentProps, ReactNode, Ref } from 'react';

export interface TooltipProps {
  label: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { label, position = 'top', children },
  ref,
) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root open={open} onOpenChange={setOpen}>
        <BaseTooltip.Trigger
          ref={ref as ComponentProps<typeof BaseTooltip.Trigger>['ref']}
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
                color: 'var(--dt-bg)', background: 'var(--dt-text-strong)', borderRadius: 'var(--dt-radius-chip)', boxShadow: 'var(--dt-shadow-overlay)',
                transition: 'opacity var(--dt-duration-fast) var(--dt-ease), visibility var(--dt-duration-fast) var(--dt-ease)',
              }}
            >
              {label}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
});
Tooltip.displayName = 'Tooltip';
