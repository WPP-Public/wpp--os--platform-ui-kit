export type InlineEditMode = 'read' | 'edit';
export declare enum InlineEditModeEnum {
  READ = "read",
  EDIT = "edit"
}
export type InlineEditClosePopoverReason = 'apply' | 'cancel' | 'outsideClick';
export type InlineEditLocales = {
  defaultErrorMessage: string;
  /** Accessible name of the icon-only button that confirms the edit. */
  confirmButtonLabel: string;
  /** Accessible name of the icon-only button that cancels the edit. */
  cancelButtonLabel: string;
};
export type InlineEditChangeModeEventDetail = {
  mode: InlineEditMode;
  closePopover: () => void;
  reason?: InlineEditClosePopoverReason;
};
export type InlineEditConfirmDetail = {
  value: string;
  waitUntil: (p: Promise<unknown>) => void;
};
