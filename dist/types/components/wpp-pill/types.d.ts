export type PillValue = string | number;
export type PillType = 'multiple' | 'single' | 'display' | 'draggable';
export type PillSize = 'm';
export type PillState = 'hover' | 'active';
export type PillTabElements = 'wrapper' | 'icon-close' | 'icon-draggable';
export interface PillChangeEventDetail {
  value: PillValue;
  checked: boolean;
}
export interface PillLocaleInterface {
  /**
   * Accessible name of the close icon button, rendered for `removable` pills. `{label}` is replaced with the pill's
   * `label`, so each close button names the pill it removes.
   */
  removePillLabel: string;
  /** Accessible name of the drag icon button, rendered for `draggable` pills. */
  dragPillLabel: string;
  /** `aria-roledescription` of a `draggable` pill. `ariaProps.roleDescription` takes precedence when set. */
  draggablePillRoleDescription: string;
}
