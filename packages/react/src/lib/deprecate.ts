const warnedKeys = new Set<string>();

/**
 * Development-mode deprecation warning that fires once per `key` per session.
 * Silent in production builds so consumers never ship console noise.
 */
export function warnOnce(key: string, message: string): void {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') return;
  if (warnedKeys.has(key)) return;
  warnedKeys.add(key);
  // eslint-disable-next-line no-console
  console.warn(`[@bridger-kr/react] ${message}`);
}
