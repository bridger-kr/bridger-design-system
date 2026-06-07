import * as React from 'react';

export interface SectionCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Right-aligned action (usually a ghost Button). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Console section panel — title, description, action, body. No eyebrow kicker:
 * the title is a plain noun-phrase heading, the section's own content does the
 * rest. Lay items flat inside; never card-in-card.
 * @startingPoint section="Console" subtitle="Titled console section panel" viewport="700x260"
 */
export function SectionCard(props: SectionCardProps): React.JSX.Element;
