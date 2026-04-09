import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { LabelConfig } from '../wpp-label/types';
import { ContainerStateType, ListValue, TooltipConfig } from '../wpp-list-item/types';
import { DropdownConfig } from '../../types/common';
export type SelectOption = Record<string, any>;
export interface SelectDefaultOption extends SelectOption {
  id: SelectOptionId;
  label: string;
}
export type SelectOptionId = string | number;
export type GetSelectOptionIdHandler = (item: SelectOption) => SelectOptionId;
export type GetSelectOptionLabelHandler = (item: SelectOption) => string;
export type SelectValue = any | number | null | SelectOption;
export type SelectChangeEventDetail = (BaseFormControlEventDetail<SelectValue[] | SelectValue> & {
  name?: string;
}) | (CombinedSelectControl<SelectValue[] | SelectValue> & {
  name?: string;
});
export type SelectTypes = 'single' | 'multiple' | 'text' | 'combined';
export type SelectSize = 'm' | 's';
export type SelectTabElements = 'input' | 'listItem';
export interface CombinedSelectControl<T> {
  readonly value: T;
  readonly inputValue: string;
}
export interface SelectOptionChangeEventDetail {
  value: SelectValue;
  label: string;
  target: HTMLElement;
}
export interface SelectLocaleInterface {
  emptyText?: string;
  clearAllText?: string;
  selectAllText?: string;
  searchInputPlaceholder?: string;
  allSelectedText?: string;
  selectLabel?: string;
  loadingText?: string;
  clearText?: string;
  applyText?: string;
}
export type SelectLabelConfig = LabelConfig;
export interface SelectChangeEventDetails {
  value: SelectValue;
  name?: string;
  inputValue?: string;
  selectedItems?: ListItemInterface[];
}
export interface ListItemInterface {
  label: string;
  id?: string | number;
  value?: ListValue;
  checked?: boolean;
  active?: boolean;
  selectable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  highlight?: string;
  containerState?: ContainerStateType;
  isExtended?: boolean;
  tooltipConfig?: TooltipConfig;
  labelTooltipConfig?: DropdownConfig;
  nonInteractive?: boolean;
  checkboxName?: string;
  slots?: any[];
  hidden?: boolean;
  hasBeenInternallyDisabled?: boolean | null;
  [key: string]: any;
}
