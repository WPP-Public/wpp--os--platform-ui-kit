import { AutocompleteOption } from '../wpp-autocomplete/types';
import { TooltipProps } from '../wpp-tooltip/types';
import { DropdownConfig } from '../../types/common';
export type ListValue = string | number | AutocompleteOption;
export interface ListItemChangeEventDetail {
  value?: ListValue | AutocompleteOption;
  checked: boolean;
  label?: string;
  isSelectBasedEvent?: boolean;
  isAutocompleteBasedEvent?: boolean;
  target: HTMLElement;
}
export interface ListItemState {
  hover: boolean;
  active: boolean;
}
export interface TooltipConfig {
  leftSlot?: TooltipProps;
  rightSlot?: TooltipProps;
}
export type ContainerStateType = 'hidden' | 'shown' | 'tooltipTrigger';
export type SlotItemNode = {
  type: string;
  props: Record<string, any>;
  children?: SlotItemNode[] | null;
};
export type ListItemProps = {
  label?: string;
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
  slots?: SlotItemNode[];
};
