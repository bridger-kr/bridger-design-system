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
    pagination: {
        nav: string;
        previous: string;
        next: string;
    };
    table: {
        /** Header cell for the row-action column. */
        rowActions: string;
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
