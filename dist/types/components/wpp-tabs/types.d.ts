import { AriaProps } from '../../types/common';
export interface TabsChangeEventDetail {
  itemId: string;
  value: string;
}
export interface TabChangeEventDetail {
  value: string;
}
export type WppTabsAriaProps = {
  tablist?: Pick<AriaProps, 'label' | 'labelledby'>;
};
export type WppTabAriaProps = {
  tab?: Pick<AriaProps, 'label' | 'describedby' | 'controls'>;
};
export interface TabsLocaleInterface {
  tablistLabel: string;
}
