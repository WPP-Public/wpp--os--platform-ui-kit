import { AriaProps } from '../../types/common';
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
import { PillValue } from '../wpp-pill/types';
export type PillGroupValue = PillValue | PillValue[];
export type PillGroupChangeEvent = BaseFormControlEventDetail<PillGroupValue> & {
  name?: string;
};
export type PillGroupLabelConfig = LabelConfig;
export type WppPillGroupAriaProps = Pick<AriaProps, 'label' | 'roleDescription'>;
export type PillGroupReorderListEvent = {
  draggedIndex: number;
  toIndex: number;
};
export type PillGroupAnnouncement = (label: string, position: number, total: number) => string;
export interface PillGroupLocaleInterface {
  /** `aria-roledescription` of a `draggable` group. `ariaProps.roleDescription` takes precedence when set. */
  sortableList: string;
  /** Announced when a pill is grabbed with the keyboard (Enter / Space on its drag handle). */
  pillGrabbed: PillGroupAnnouncement;
  /** Announced after a grabbed pill is moved with the arrow keys. */
  pillMoved: PillGroupAnnouncement;
  /** Announced when a grabbed pill is dropped (Enter / Space again, or Tab). */
  pillDropped: PillGroupAnnouncement;
  /** Announced when a move is cancelled with Escape and the pill returns to its original position. */
  moveCancelled: PillGroupAnnouncement;
}
