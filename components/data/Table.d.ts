// GENERATED FILE — DO NOT EDIT.
// Source: packages/react/src/components/data/Table.tsx
// Regenerate: pnpm generate

import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import type { DataTrustProps } from './DataTrust';
export type TableAlign = 'left' | 'center' | 'right';
export type TableRow = Record<string, ReactNode>;
export interface TableColumn<Row extends TableRow = TableRow> {
    readonly key: Extract<keyof Row, string>;
    readonly header: ReactNode;
    readonly align?: TableAlign;
    readonly nowrap?: boolean;
    readonly render?: (value: Row[Extract<keyof Row, string>], row: Row) => ReactNode;
}
export interface TableButtonRowAction<Row extends TableRow> {
    readonly kind: 'button';
    readonly label: (row: Row) => string;
    readonly onActivate: (row: Row) => void;
    readonly disabled?: (row: Row) => boolean;
}
export interface TableLinkRowAction<Row extends TableRow> {
    readonly kind: 'link';
    readonly label: (row: Row) => string;
    readonly href: (row: Row) => string;
}
export type TableRowAction<Row extends TableRow> = TableButtonRowAction<Row> | TableLinkRowAction<Row>;
export interface TableProps<Row extends TableRow = TableRow> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'style'>, DataTrustProps {
    readonly columns?: readonly TableColumn<Row>[];
    readonly rows?: readonly Row[];
    readonly rowKey?: (row: Row, index: number) => string | number;
    /**
     * Semantic whole-row action. Replaces `onRowClick`; every action requires an
     * accessible label and renders as a native button or link in a valid cell.
     * Actionable rows must not contain nested interactive controls.
     */
    readonly rowAction?: TableRowAction<Row>;
    readonly empty?: ReactNode;
    /** Header cell for the row-action column; defaults to the ambient locale. */
    readonly rowActionHeader?: ReactNode;
    readonly style?: CSSProperties;
}
/** @deprecated TableProps now carries the DataTrustProps fields directly. */
export interface TableTrustProps extends TableProps<TableRow> {
}
export declare const Table: <Row extends TableRow = TableRow>(props: TableProps<Row> & {
    ref?: Ref<HTMLDivElement>;
}) => ReactElement;
