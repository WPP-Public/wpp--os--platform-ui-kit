export type PopoverShouldCloseOnOutsideClickHandler = (event: Event) => boolean;
export interface PopoverLocalesInterface {
  searchInputPlaceholder: string;
  clearText?: string;
}
export interface PopoverClearEventDetail {
  clear: boolean;
}
export interface PopoverInputChangeEventDetail {
  value: string;
  name: string;
}
