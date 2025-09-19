export enum ModalCloseReason {
  outsideClick = 'outsideClick',
  cancelClick = 'cancelClick',
  escapePress = 'escapePress',
}

export interface ModalFormConfig {
  onSubmit?: (event: Event) => any
  onReset?: (event: Event) => any
}

export interface ModalCloseDetails {
  reason: ModalCloseReason
}
