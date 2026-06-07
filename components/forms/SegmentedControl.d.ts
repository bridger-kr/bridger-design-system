import * as React from 'react';

export interface SegmentOption { value: string; label: string; }
export interface SegmentedControlProps {
  options: Array<string | SegmentOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/** Inset segmented control for 2–4 short, exclusive options. */
export function SegmentedControl(props: SegmentedControlProps): React.JSX.Element;
