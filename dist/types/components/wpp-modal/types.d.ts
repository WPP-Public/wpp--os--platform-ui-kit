import { Components } from '../../components';
export declare enum ModalCloseReason {
  outsideClick = "outsideClick",
  cancelClick = "cancelClick",
  escapePress = "escapePress"
}
export interface ModalFormConfig {
  onSubmit?: (event: Event) => any;
  onReset?: (event: Event) => any;
}
export interface ModalCloseDetails {
  reason: ModalCloseReason;
}
export type PrimaryButtonConfig = {
  label: string;
  variant: 'primary' | 'destructive';
  onClick: () => void;
  [key: `data-${string}`]: string;
} & Partial<Omit<Components.WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
export type SecondaryButtonConfig = {
  label: string;
  onClick: () => void;
  [key: `data-${string}`]: string;
} & Partial<Omit<Components.WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
export interface ModalActionsConfig {
  primaryButtonConfig: PrimaryButtonConfig;
  secondaryButtonConfig?: SecondaryButtonConfig;
}
