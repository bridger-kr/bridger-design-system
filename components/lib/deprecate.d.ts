// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/lib/deprecate.ts
// Regenerate: pnpm generate

/**
 * Development-mode deprecation warning that fires once per `key` per session.
 * Silent in production builds so consumers never ship console noise.
 */
export declare function warnOnce(key: string, message: string): void;
