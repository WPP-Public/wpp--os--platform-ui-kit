import { AriaProps } from '../../types/common';
export interface BasicNodeAction {
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface BasicNodeLocales {
  playAction: string;
  stopAction: string;
  filterAction: string;
  uploadFileAction: string;
}
export type BasicNodeAriaProps = Pick<AriaProps, 'label'>;
