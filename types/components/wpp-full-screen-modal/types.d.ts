export declare enum FullScreenModalCloseReason {
  outsideClick = "outsideClick",
  cancelClick = "cancelClick",
  escapePress = "escapePress"
}
export interface FullScreenModalFormConfig {
  onSubmit?: (event: Event) => any;
  onReset?: (event: Event) => any;
}
export interface FullScreenModalCloseDetails {
  reason: FullScreenModalCloseReason;
}
