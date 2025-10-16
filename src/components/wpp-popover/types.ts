export type PopoverShouldCloseOnOutsideClickHandler = (event: Event) => boolean

export interface PopoverLocalesInteface {
  searchInputPlaceholder: string
}

export interface PopoverInputChangeEventDetail {
  value: string
  name: string
}
