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
export const DS_LOCALE = {
    Korean: 'ko',
    English: 'en',
};
export const DS_MESSAGES_KO = {
    common: {
        close: '닫기',
        loading: '로딩 중',
    },
    brand: {
        wordmark: {
            ko: '브릿저',
            en: 'Bridger',
        },
    },
    code: {
        copy: '복사',
        copied: '복사됨',
        failed: '복사하지 못했어요',
    },
    combobox: {
        placeholder: '검색…',
        empty: '결과 없음',
    },
    commandPalette: {
        placeholder: '도구 · 액션 검색…',
        footerHint: '↑↓ 이동 · ↵ 실행 · esc 닫기',
        inputLabel: '도구 · 액션 검색',
        listboxLabel: '검색 결과',
    },
    confirmDialog: {
        confirm: '확인',
        confirmDanger: '삭제',
        cancel: '취소',
    },
    fileUpload: {
        chooseFile: '파일 선택',
        dropHint: '또는 끌어다 놓기',
        specHint: 'OpenAPI 스펙 · JSON 또는 YAML',
        uploaded: '업로드 완료',
        remove: '제거',
    },
    filterChip: {
        removeAriaLabel: (label) => `${label} 제거`,
    },
    link: {
        externalCue: '새 창',
    },
    slider: {
        valueLabel: '값',
    },
    pagination: {
        nav: '페이지',
        previous: '이전',
        next: '다음',
    },
    table: {
        rowActions: '행 작업',
    },
    dataTrust: {
        unknown: '확인 안 됨',
        asOf: '기준 시각',
        source: '출처',
        state: {
            loading: '불러오는 중…',
            empty: '표시할 데이터가 없어요',
            partial: '일부 데이터만 표시하고 있어요',
            stale: '오래된 데이터예요',
            error: '데이터를 불러오지 못했어요',
            unauthorized: '이 데이터를 볼 권한이 없어요',
        },
    },
    logRow: {
        level: { ok: '정상', warn: '경고', error: '오류', info: '정보' },
    },
    consoleShell: {
        navLabel: '기본 탐색',
        openNav: '탐색 열기',
        collapseNav: '탐색 접기',
        expandNav: '탐색 펼치기',
        skipToContent: '본문으로 건너뛰기',
        workspace: {
            pending: '워크스페이스 전환 중…',
            success: '워크스페이스를 전환했어요',
            error: '전환에 실패해 현재 워크스페이스를 유지합니다',
        },
    },
    toolCard: {
        emptyDescription: '설명 없음',
        state: {
            available: '사용 가능',
            managed: '관리형 키',
            locked: '키 등록',
        },
    },
};
export const DS_MESSAGES_EN = {
    common: {
        close: 'Close',
        loading: 'Loading',
    },
    brand: {
        wordmark: {
            ko: '브릿저',
            en: 'Bridger',
        },
    },
    code: {
        copy: 'Copy',
        copied: 'Copied',
        failed: 'Copy failed',
    },
    combobox: {
        placeholder: 'Search…',
        empty: 'No results',
    },
    commandPalette: {
        placeholder: 'Search tools and actions…',
        footerHint: '↑↓ move · ↵ run · esc close',
        inputLabel: 'Search tools and actions',
        listboxLabel: 'Search results',
    },
    confirmDialog: {
        confirm: 'Confirm',
        confirmDanger: 'Delete',
        cancel: 'Cancel',
    },
    fileUpload: {
        chooseFile: 'Choose a file',
        dropHint: 'or drag and drop',
        specHint: 'OpenAPI spec · JSON or YAML',
        uploaded: 'Upload complete',
        remove: 'Remove',
    },
    filterChip: {
        removeAriaLabel: (label) => `Remove ${label}`,
    },
    link: {
        externalCue: 'new window',
    },
    slider: {
        valueLabel: 'Value',
    },
    pagination: {
        nav: 'Pagination',
        previous: 'Previous',
        next: 'Next',
    },
    table: {
        rowActions: 'Actions',
    },
    dataTrust: {
        unknown: 'Unknown',
        asOf: 'As of',
        source: 'Source',
        state: {
            loading: 'Loading…',
            empty: 'No data to show',
            partial: 'Showing partial data',
            stale: 'Stale data',
            error: 'Failed to load data',
            unauthorized: 'You do not have access to this data',
        },
    },
    logRow: {
        level: { ok: 'OK', warn: 'WARN', error: 'ERR', info: 'INFO' },
    },
    consoleShell: {
        navLabel: 'Primary navigation',
        openNav: 'Open navigation',
        collapseNav: 'Collapse navigation',
        expandNav: 'Expand navigation',
        skipToContent: 'Skip to content',
        workspace: {
            pending: 'Switching workspace…',
            success: 'Workspace switched',
            error: 'Switch failed — keeping the current workspace',
        },
    },
    toolCard: {
        emptyDescription: 'No description',
        state: {
            available: 'Available',
            managed: 'Managed key',
            locked: 'Key setup',
        },
    },
};
export const DS_MESSAGES = {
    ko: DS_MESSAGES_KO,
    en: DS_MESSAGES_EN,
};
