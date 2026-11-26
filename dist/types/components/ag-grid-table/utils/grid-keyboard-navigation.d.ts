import type { GridApi } from 'ag-grid-community';
type NavigationApi = Pick<GridApi, 'ensureIndexVisible' | 'ensureColumnVisible' | 'setFocusedCell' | 'setFocusedHeader' | 'getAllDisplayedColumns' | 'getDisplayedRowCount' | 'getGridOption' | 'paginationGetCurrentPage' | 'paginationGetPageSize'>;
export declare const setupGridKeyboardNavigation: (container: HTMLElement, getApi: () => NavigationApi | undefined) => (() => void);
export {};
