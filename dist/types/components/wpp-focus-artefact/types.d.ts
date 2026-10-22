import { AriaProps } from '../../types/common';
export interface FocusArtefactAction {
  /** Identifier of the action. */
  id: 'quote' | 'pin' | 'copy' | 'download';
  /** Icon of the action. */
  icon: `wpp-icon-${string}`;
  /** Tooltip and accessible label of the action. */
  label: string;
  /** Set in the `wppActionClick` detail of the pin action: whether the pin is on after the click. */
  isActive?: boolean;
}
export interface FocusArtefactMenuAction {
  /** Stable identifier of the action, used to identify it in the `wppActionClick` event. */
  id: string;
  /** Text of the menu item. */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: `wpp-icon-${string}`;
  /** Disables the menu item. */
  disabled?: boolean;
}
/**
 * Detail of the `wppActionClick` event: the clicked header action (with the state the pin ends in) or
 * "More actions" menu item. A single named type, as the Angular wrapper generator only imports the first
 * type of an inline union.
 */
export type FocusArtefactActionClickDetail = FocusArtefactAction | FocusArtefactMenuAction;
export interface FocusArtefactVersion {
  /** Stable identifier of the version. */
  id: string;
  /** Text shown for the version, e.g. `Version 1`. */
  label: string;
}
/**
 * Width of the artefact: a number of pixels, or a percentage of its parent, e.g. `'40%'`.
 */
export type FocusArtefactWidth = number | `${number}%`;
/**
 * Detail of the `wppResize` event: the width the artefact was resized to, in the unit its `width` was given in
 * (pixels, unless it was a percentage of its parent).
 */
export interface FocusArtefactResizeDetail {
  width: FocusArtefactWidth;
}
export interface FocusArtefactLocales {
  quoteAction: string;
  pinAction: string;
  unpinAction: string;
  copyAction: string;
  copiedAction: string;
  downloadAction: string;
  moreActionsLabel: string;
  closeAction: string;
  resizeHandleLabel: string;
  versionSelectorLabel: string;
  bodyLabel: string;
}
export type FocusArtefactAriaProps = Pick<AriaProps, 'label' | 'labelledby' | 'describedby'>;
