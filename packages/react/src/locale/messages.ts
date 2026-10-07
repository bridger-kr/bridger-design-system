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
} as const;

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

export const DS_MESSAGES_KO: DSMessageCatalog = {
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

export const DS_MESSAGES_EN: DSMessageCatalog = {
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

export const DS_MESSAGES: Record<DSLocale, DSMessageCatalog> = {
  ko: DS_MESSAGES_KO,
  en: DS_MESSAGES_EN,
};
