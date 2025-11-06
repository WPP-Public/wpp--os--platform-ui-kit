import { Props, SingleTarget } from 'tippy.js';
import { Placement, Strategy, OffsetOptions, ReferenceElement } from '@floating-ui/dom';
export type MessageTypes = 'warning' | 'error' | 'information' | 'success';
export type Placements = 'top' | 'bottom' | 'right' | 'left';
export type HorizontalPlacements = Exclude<Placements, 'top' | 'bottom'>;
export type VerticalPlacements = Exclude<Placements, 'right' | 'left'>;
export type InputMessageTypes = Exclude<MessageTypes, 'information' | 'success' | 'brand'>;
export type BannerTypes = 'warning' | 'information';
export type ListPosition = 'fixed' | 'absolute';
export interface AriaProps {
  label?: string;
}
export interface DropdownConfig extends Partial<Props> {
  triggerElementWidth?: boolean;
}
export interface DropdownConfigFloating extends Omit<Omit<Omit<Partial<Props>, 'onClickOutside'>, 'appendTo'>, 'offset'> {
  triggerElementWidth?: boolean;
  appendToListWrapper?: boolean;
  isFrom?: string;
  placement?: Placement;
  offset?: number | [number, number];
  arrowOffset?: number;
  appendTo?: 'parent' | Element | (() => Element);
  onClickOutside?: (event: Event) => void;
  onHide?: () => void;
  onMount?: () => void;
  onShow?: () => void;
  trigger?: string;
  shouldNotFlipEl?: boolean;
  duration?: number | [number, number];
  animation?: boolean;
}
export interface TooltipConfig extends Partial<Props> {
}
export interface ListConfigTypes extends Partial<Props> {
  anchor: SingleTarget;
  triggerElementWidth?: boolean;
  showOnCreate?: boolean;
}
export declare enum FOCUS_TYPE {
  MOUSE = "focus",
  TAB = "tab-focus",
  NONE = "idle"
}
export interface FloatingUIConfigOptions {
  allowHTML?: boolean;
  placement?: Placement;
  strategy?: Strategy;
  offset?: OffsetOptions;
  arrowOffset?: number;
  onMount?: () => void;
  onHide?: () => void;
  onShow?: () => void;
  onClickOutside?: (event: Event) => void;
  shouldNotFlipEl?: boolean;
  showOnCreate?: boolean;
  appendTo?: 'parent' | Element | (() => Element);
  zIndex?: number;
  trigger?: string;
  triggerElementWidth?: boolean;
  appendToListWrapper?: boolean;
  dropdownWidth?: string;
  isFrom?: string;
  hideOnClick?: boolean | 'toggle';
  duration?: number | [number, number];
  animation?: boolean;
}
export interface ComputeFloatingUIParams {
  referenceEl: ReferenceElement | undefined;
  floatingEl: HTMLElement | undefined;
  arrowEl?: HTMLElement;
  configOptions?: FloatingUIConfigOptions;
  showStyles?: {
    [key: string]: string;
  };
  paddingOnSide?: number;
}
export interface HandlePortalAnimation {
  portalRef?: HTMLDivElement;
  animation?: boolean;
  duration?: number | [number, number];
  defaultComponentDuration?: [number, number];
}
