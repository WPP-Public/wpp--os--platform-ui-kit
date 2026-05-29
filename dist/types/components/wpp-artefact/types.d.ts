import { AriaProps } from '../../types/common';
export type ArtefactSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export interface ArtefactAction {
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface ArtefactLocales {
  duplicateAction: string;
  downloadAction: string;
  deleteAction: string;
  pinAction: string;
}
export type ArtefactAriaProps = Pick<AriaProps, 'label'>;
