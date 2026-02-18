import { Components } from '../../components';
export declare enum SideModalCloseReason {
  outsideClick = "outsideClick",
  cancelClick = "cancelClick",
  escapePress = "escapePress",
  crossClick = "crossClick"
}
export interface SideModalCloseDetails {
  reason: SideModalCloseReason;
}
export interface SideModalFormConfig {
  onSubmit?: (event: Event) => any;
  onReset?: (event: Event) => any;
}
/**
 * These types are created to impose restrictions on the configurations that can be passed
 * to the buttons in `actions` section of side-modal.
 * This ensures buttons are created with appropiate data.
 */
export type FirstActionConfig = {
  label: string;
  variant: 'primary' | 'destructive';
  onClick: () => void;
  [key: `data-${string}`]: string;
} & Partial<Omit<Components.WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
export type SecondActionConfig = {
  label: string;
  variant: 'secondary' | 'destructive-secondary';
  onClick: () => void;
  [key: `data-${string}`]: string;
} & Partial<Omit<Components.WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
export type ThirdActionConfig = {
  label: string;
  variant: 'destructive' | 'primary';
  icon: string;
  onClick: () => void;
  [key: `data-${string}`]: string;
} & Partial<Omit<Components.WppActionButton, 'autoFocus' | 'variant'>>;
export type HeaderActionConfig = {
  icon: string;
  onClick: () => void;
  ariaLabel?: string;
};
export type HeaderActionsConfig = [] | [HeaderActionConfig] | [HeaderActionConfig, HeaderActionConfig] | [HeaderActionConfig, HeaderActionConfig, HeaderActionConfig] | [HeaderActionConfig, HeaderActionConfig, HeaderActionConfig, HeaderActionConfig];
export type ActionConfig = [] | [FirstActionConfig] | [SecondActionConfig] | [ThirdActionConfig] | [FirstActionConfig, SecondActionConfig] | [SecondActionConfig, FirstActionConfig] | [FirstActionConfig, ThirdActionConfig] | [ThirdActionConfig, FirstActionConfig] | [SecondActionConfig, ThirdActionConfig] | [ThirdActionConfig, SecondActionConfig] | [FirstActionConfig, SecondActionConfig, ThirdActionConfig] | [SecondActionConfig, FirstActionConfig, ThirdActionConfig] | [FirstActionConfig, ThirdActionConfig, SecondActionConfig] | [ThirdActionConfig, FirstActionConfig, SecondActionConfig] | [SecondActionConfig, ThirdActionConfig, FirstActionConfig] | [ThirdActionConfig, SecondActionConfig, FirstActionConfig];
export type SideModalLocalesType = {
  closeIconLabel: string;
  backHeaderButtonLabel: string;
};
