// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Avatar.tsx
// Regenerate: pnpm generate

const SIZE = { sm: 26, md: 34, lg: 44 };
/**
 * Avatar — image or initials in a rounded square. Optional status dot.
 * Deterministic tint from the name when no image is given.
 */
export function Avatar({ name = '', src, size = 'md', status, square = true, style, ...rest }) {
    const px = typeof size === 'number' ? size : (SIZE[size] ?? SIZE.md);
    const initials = name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join('').toUpperCase() || '·';
    const radius = square ? Math.round(px * 0.28) : px;
    const statusColor = status ? { online: 'var(--dt-success)', busy: 'var(--dt-danger)', away: 'var(--dt-warning)', offline: 'var(--dt-text-muted)' }[status] ?? undefined : undefined;
    return (<span {...rest} style={{ position: 'relative', display: 'inline-flex', flex: '0 0 auto', ...style }}>
      {src ? (<img src={src} alt={name} width={px} height={px} style={{ borderRadius: radius, objectFit: 'cover', border: '1px solid var(--dt-border)' }}/>) : (<span style={{
                width: px, height: px, borderRadius: radius, display: 'grid', placeItems: 'center',
                background: 'var(--dt-tint-accent)', color: 'var(--dt-accent-text)',
                fontSize: px * 0.38, fontWeight: 600, letterSpacing: '-0.02em',
            }}>{initials}</span>)}
      {statusColor ? (<span style={{
                position: 'absolute', right: -1, bottom: -1, width: px * 0.3, height: px * 0.3,
                borderRadius: 9999, background: statusColor, boxShadow: '0 0 0 2px var(--dt-surface)',
            }}/>) : null}
    </span>);
}
