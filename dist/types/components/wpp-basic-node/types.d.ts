import { AriaProps } from '../../types/common';
export interface BasicNodeAction {
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface BasicNodeLocales {
  playAction: string;
  stopAction: string;
  reRunAction: string;
  filterAction: string;
  uploadFileAction: string;
  /**
   * Visually hidden text announced by screen readers before the error message, identifying the node in error.
   */
  errorAnnouncement: string;
  /**
   * Accessible label of the button that closes the error inline message.
   */
  dismissErrorAction: string;
}
export type BasicNodeAriaProps = Pick<AriaProps, 'label'>;
