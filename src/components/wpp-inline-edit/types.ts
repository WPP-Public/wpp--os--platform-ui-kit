export type InlineEditMode = 'read' | 'edit'

export enum InlineEditModeEnum {
  READ = 'read',
  EDIT = 'edit',
}

export type InlineEditClosePopoverReason = 'apply' | 'cancel' | 'outsideClick'

export type InlineEditLocales = {
  defaultErrorMessage: string
}

export type InlineEditChangeModeEventDetail = {
  mode: InlineEditMode
  closePopover: () => void
  reason?: InlineEditClosePopoverReason
}

export type InlineEditConfirmDetail = {
  value: string
  waitUntil: (p: Promise<unknown>) => void
}
