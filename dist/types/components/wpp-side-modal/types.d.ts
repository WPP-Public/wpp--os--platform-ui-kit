import { WppActionButton } from '../wpp-action-button/wpp-action-button';
import { WppButton } from '../wpp-button/wpp-button';
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
} & Partial<Omit<WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
export type SecondActionConfig = {
  label: string;
  variant: 'secondary' | 'destructive-secondary';
  onClick: () => void;
} & Partial<Omit<WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
export type ThirdActionConfig = {
  label: string;
  variant: 'destructive' | 'primary';
  icon: string;
  onClick: () => void;
} & Partial<Omit<WppActionButton, 'autoFocus' | 'variant'>>;
export type ActionConfig = [] | [FirstActionConfig] | [SecondActionConfig] | [ThirdActionConfig] | [FirstActionConfig, SecondActionConfig] | [SecondActionConfig, FirstActionConfig] | [FirstActionConfig, ThirdActionConfig] | [ThirdActionConfig, FirstActionConfig] | [SecondActionConfig, ThirdActionConfig] | [ThirdActionConfig, SecondActionConfig] | [FirstActionConfig, SecondActionConfig, ThirdActionConfig] | [SecondActionConfig, FirstActionConfig, ThirdActionConfig] | [FirstActionConfig, ThirdActionConfig, SecondActionConfig] | [ThirdActionConfig, FirstActionConfig, SecondActionConfig] | [SecondActionConfig, ThirdActionConfig, FirstActionConfig] | [ThirdActionConfig, SecondActionConfig, FirstActionConfig];
