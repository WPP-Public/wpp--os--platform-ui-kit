export declare enum Z_INDEX {
  TOOLTIP = 1200,
  CONTEXT_MENU = 1150,
  TOAST = 1050,
  OVERLAY = 900,
  NAV_SIDEBAR = 899,
  STICKY_BAR = 890,
  COLOR_PICKER = 880,
  TIME_PICKER = 880,
  DATE_PICKER = 880,
  AUTOCOMPLETE = 880,
  MENU_LIST = 880,
  SEARCH = 880,
  POPOVER = 880,
  MODAL = 875,
  SIDE_MODAL = 870,
  TOPBAR = 860,
  CHAT = 100,
  BANNER = 1
}
export declare const ANIMATION_PROPERTY_NAME = "opacity";
export declare const DEFAULT_SHOW_DURATION_ANIMATION = 275;
export declare const DEFAULT_HIDE_DURATION_ANIMATION = 250;
export declare const DEFAULT_OFFSET = 8;
export declare const ARROW_VERTICAL_OFFSET = 4;
export declare const ARROW_HORIZONTAL_OFFSET = 6;
export declare const STATIC_SIDES: {
  [key: string]: string;
};
export declare const ROTATION_VALUES: {
  [key: string]: number;
};
export declare const DEFAULT_SHOW_STYLES: {
  opacity: number;
  visibility: string;
};
export declare const DEFAULT_HIDE_STYLES: {
  opacity: number;
  visibility: string;
};
export declare const PLACEMENTS: string[];
