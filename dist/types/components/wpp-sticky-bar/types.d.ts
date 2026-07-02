export interface StickyBarButtonItem {
  variant: 'primary' | 'secondary' | 'action-button';
  text: string;
  disabled?: boolean;
  loading?: boolean;
  iconStart?: `wpp-icon-${string}`;
  iconEnd?: `wpp-icon-${string}`;
}
export interface StickyBarTabItem {
  text: string;
  value: string;
  counter?: number;
  icon?: `wpp-icon-${string}`;
}
export type StickyBarVariants = 'small' | 'medium' | 'with-tabs';
export type VisibilityClasses = `visible` | `invisible` | '';
