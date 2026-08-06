import { AriaProps, Components } from '../../components';
export declare enum SidePanelCloseReason {
  crossClick = "crossClick",
  escapePress = "escapePress"
}
export interface SidePanelCloseDetails {
  reason: SidePanelCloseReason;
}
export interface SidePanelResizeDetails {
  width: number;
}
/**
 * Base configuration shared by both action buttons.
 * The `variant`, `size` and `inverted` props are managed internally and therefore excluded.
 */
type BaseActionConfig = {
  label: string;
  onClick: () => void;
  [key: `data-${string}`]: string;
} & Partial<Omit<Components.WppButton, 'autoFocus' | 'variant' | 'inverted' | 'size'>>;
/**
 * Configuration for the left (secondary) action button.
 */
export type SecondaryActionConfig = BaseActionConfig;
/**
 * Configuration for the right (primary) action button.
 */
export type PrimaryActionConfig = BaseActionConfig;
/**
 * The side panel always renders exactly 2 buttons in the actions section:
 * a secondary button on the left and a primary button on the right.
 */
export type SidePanelActionsConfig = [SecondaryActionConfig, PrimaryActionConfig];
export type SidePanelLocalesType = {
  closeIconLabel: string;
  resizeHandleLabel: string;
};
export type SidePanelAriaProps = Pick<AriaProps, 'role' | 'label'>;
export {};
