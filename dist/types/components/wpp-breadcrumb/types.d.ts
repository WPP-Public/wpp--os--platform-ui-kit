import { AriaProps } from '../../types/common';
export interface BreadcrumbItemState {
  label: string;
  path: string;
}
export interface BreadcrumbItemEventDetails {
  path: string;
  label: string;
}
export type WppBreadcrumbAriaProps = {
  navigation?: Pick<AriaProps, 'label' | 'labelledby'>;
};
export interface BreadcrumbLocaleInterface {
  navigationLabel: string;
  showMoreLabel: string;
}
