export type InlineEditMode = 'read' | 'edit'

export type InlineEditClosePopoverReason = 'apply' | 'cancel' | 'outsideClick'

export type InlineEditChangeModeEventDetail = {
  mode: InlineEditMode
  closePopover: () => void
  reason?: InlineEditClosePopoverReason
}
