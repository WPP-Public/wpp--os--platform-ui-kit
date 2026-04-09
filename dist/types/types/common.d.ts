import { Props, SingleTarget } from 'tippy.js';
export type MessageTypes = 'warning' | 'error' | 'information' | 'success';
export type Placements = 'top' | 'bottom' | 'right' | 'left';
export type HorizontalPlacements = Exclude<Placements, 'top' | 'bottom'>;
export type VerticalPlacements = Exclude<Placements, 'right' | 'left'>;
export type InputMessageTypes = Exclude<MessageTypes, 'information' | 'success' | 'brand'>;
export type BannerTypes = 'warning' | 'information';
export type ListPosition = 'fixed' | 'absolute';
export interface AriaProps {
  label?: string;
  describedby?: string;
  pressed?: boolean;
  labelledby?: string;
  controls?: string;
  expanded?: boolean;
  haspopup?: string;
  tabIndex?: number;
  role?: string;
  hidden?: boolean;
  autocomplete?: string;
  activedescendant?: boolean;
}
export interface DropdownConfig extends Partial<Props> {
  triggerElementWidth?: boolean;
  tabIndex?: number;
}
export type TooltipConfig = Partial<Props>;
export interface ListConfigTypes extends Partial<Props> {
  anchor: SingleTarget;
  triggerElementWidth?: boolean;
  showOnCreate?: boolean;
  hideOnEsc?: boolean;
  hideOnPopperBlur?: boolean;
}
export declare enum FOCUS_TYPE {
  MOUSE = "focus",
  TAB = "tab-focus",
  NONE = "idle"
}
export interface HandlePortalAnimation {
  portalRef?: HTMLDivElement;
  animation?: boolean;
  duration?: number | [number, number];
  defaultComponentDuration?: [number, number];
}
