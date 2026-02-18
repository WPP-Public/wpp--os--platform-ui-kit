export interface StickyBarButtonItem {
  variant: 'primary' | 'secondary' | 'action-button';
  text: string;
}
export interface StickyBarTabItem {
  text: string;
  value: string;
  counter?: number;
  icon?: `wpp-icon-${string}`;
}
export type StickyBarVariants = 'small' | 'medium' | 'with-tabs';
export type VisibilityClasses = `visible` | `invisible` | '';
