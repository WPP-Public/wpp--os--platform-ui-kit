export type PillValue = string | number;
export type PillType = 'multiple' | 'single' | 'display' | 'draggable';
export type PillSize = 'm';
export type PillState = 'hover' | 'active';
export type PillTabElements = 'wrapper' | 'icon-close' | 'icon-draggable';
export interface PillChangeEventDetail {
  value: PillValue;
  checked: boolean;
}
