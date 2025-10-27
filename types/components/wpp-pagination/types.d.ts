export interface PaginationPageChangeEventDetail {
  page: number;
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
}
export type PaginatonSelectTabElements = 'left-chevron' | 'right-chevron' | 'input';
