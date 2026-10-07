// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/locale/messages.ts
// Regenerate: pnpm generate

/**
 * Default UI strings for @bridger-kr/react.
 *
 * Korean is the default product language (DESIGN.md §3.2); English is the
 * parity locale. Components resolve every built-in string from this catalog
 * through `useDSMessages()`, so a `DSLocaleProvider` — or per-call prop
 * overrides — is the only way copy changes. Component source stays free of
 * locale literals.
 */
export declare const DS_LOCALE: {
    readonly Korean: "ko";
    readonly English: "en";
};
export type DSLocale = (typeof DS_LOCALE)[keyof typeof DS_LOCALE];
export interface DSMessageCatalog {
    common: {
        /** Accessible name for dismiss/close buttons. */
        close: string;
        /** Accessible name for busy indicators. */
        loading: string;
    };
    brand: {
        /** Accessible name for the BrandLogo wordmark, keyed by `lang`. */
        wordmark: Record<DSLocale, string>;
    };
    code: {
        copy: string;
        copied: string;
        failed: string;
    };
    combobox: {
        placeholder: string;
        empty: string;
    };
    commandPalette: {
        placeholder: string;
        footerHint: string;
        inputLabel: string;
        listboxLabel: string;
    };
    confirmDialog: {
        confirm: string;
        /** Confirm label used by the danger variant when none is provided. */
        confirmDanger: string;
        cancel: string;
    };
    fileUpload: {
        /** Accent verb inside the dropzone prompt. */
        chooseFile: string;
        /** Remainder of the dropzone prompt after `chooseFile`. */
        dropHint: string;
        /** Mono spec line under the prompt. */
        specHint: string;
        /** Status line shown for an uploaded file. */
        uploaded: string;
        /** Accessible name for the remove-file button. */
        remove: string;
    };
    filterChip: {
        /** Accessible name for the chip remove button, given the chip label. */
        removeAriaLabel: (label: string) => string;
    };
    link: {
        /** Visually-hidden cue appended to external links; Link wraps it in parentheses. */
        externalCue: string;
    };
    slider: {
        /** Fallback accessible name when neither `label` nor `ariaLabel` is given. */
        valueLabel: string;
    };
    pagination: {
        nav: string;
        previous: string;
        next: string;
    };
    table: {
        /** Header cell for the row-action column. */
        rowActions: string;
    };
    /** Shared data-trust contract (DataTrustProps on data components). */
    dataTrust: {
        /** Readout shown when a value is unknown — never rendered as `0`. */
        unknown: string;
        /** Label preceding the last-confirmed timestamp. */
        asOf: string;
        /** Label preceding the data source. */
        source: string;
        /** State lines for non-ready data states. */
        state: Record<'loading' | 'empty' | 'partial' | 'stale' | 'error' | 'unauthorized', string>;
    };
    logRow: {
        /** Severity text shown next to the level icon — never color-only. */
        level: Record<'ok' | 'warn' | 'error' | 'info', string>;
    };
    consoleShell: {
        /** Landmark label for the primary navigation rail/drawer. */
        navLabel: string;
        /** Accessible name of the mobile navigation trigger. */
        openNav: string;
        /** Accessible names of the desktop rail collapse/expand toggle. */
        collapseNav: string;
        expandNav: string;
        /** Skip-link text jumping to the main content region. */
        skipToContent: string;
        /** Workspace-switch lifecycle lines; error keeps the previous context. */
        workspace: Record<'pending' | 'success' | 'error', string>;
    };
    toolCard: {
        emptyDescription: string;
        state: {
            available: string;
            managed: string;
            locked: string;
        };
    };
}
export declare const DS_MESSAGES_KO: DSMessageCatalog;
export declare const DS_MESSAGES_EN: DSMessageCatalog;
export declare const DS_MESSAGES: Record<DSLocale, DSMessageCatalog>;
