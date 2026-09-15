export interface PaginationPageChangeEventDetail {
  page: number;
  itemsPerPage?: number;
}
export interface ItemsPerPageChangeEventDetail {
  itemsPerPage: number;
}
export interface PaginationChangeEventDetail {
  page: number;
  itemsPerPage: number;
}
export interface PaginationLocales {
  itemsPerPage: string;
  of: string;
  items: string;
  /**
   * Accessible name for the pagination navigation landmark. Defaults to 'Pagination'.
   */
  paginationLabel: string;
  /**
   * Accessible name for the previous-page control. Defaults to 'Previous page'.
   */
  previousPage: string;
  /**
   * Accessible name for the next-page control. Defaults to 'Next page'.
   */
  nextPage: string;
  /**
   * Accessible name for the page-number input shown above the page-select threshold.
   * Defaults to 'Page number'.
   */
  pageInputLabel: string;
  /**
   * Accessible name for a page button. Defaults to 'Page <number>'.
   */
  pageLabel: (page: number) => string;
}
export type PaginatonSelectTabElements = 'left-chevron' | 'right-chevron' | 'input';
