/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
// ┌─────────────────────────────────────────────────────────────┐
// │                    Z-INDEX HIERARCHY                        │
// ├─────────────────────────────────────────────────────────────┤
// │  1200  │  Tooltips                                          │
// │  1050  │  Toasts                                            │
// │   940  │  Dropdowns (pickers, popovers, context-menu, etc.) │
// │   930  │  Modal                                             │
// │   920  │  Side Modal                                        │
// │   910  │  Overlay (backdrop)                                │
// │   900  │  OS Bar (managed by WPP Open platform, NOT ours)   │
// │   860  │  Sticky Bar                                        │
// │   851  │  Top Bar menus                                     │
// │   850  │  Top Bar / Nav Sidebar                             │
// │   100  │  Chat                                              │
// │     1  │  Banner                                            │
// └─────────────────────────────────────────────────────────────┘
export var Z_INDEX;
(function (Z_INDEX) {
  Z_INDEX[Z_INDEX["TOOLTIP"] = 1200] = "TOOLTIP";
  Z_INDEX[Z_INDEX["TOAST"] = 1050] = "TOAST";
  Z_INDEX[Z_INDEX["COLOR_PICKER"] = 940] = "COLOR_PICKER";
  Z_INDEX[Z_INDEX["TIME_PICKER"] = 940] = "TIME_PICKER";
  Z_INDEX[Z_INDEX["DATE_PICKER"] = 940] = "DATE_PICKER";
  Z_INDEX[Z_INDEX["AUTOCOMPLETE"] = 940] = "AUTOCOMPLETE";
  Z_INDEX[Z_INDEX["MENU_LIST"] = 940] = "MENU_LIST";
  Z_INDEX[Z_INDEX["SEARCH"] = 940] = "SEARCH";
  Z_INDEX[Z_INDEX["POPOVER"] = 940] = "POPOVER";
  Z_INDEX[Z_INDEX["CONTEXT_MENU"] = 940] = "CONTEXT_MENU";
  Z_INDEX[Z_INDEX["MODAL"] = 930] = "MODAL";
  Z_INDEX[Z_INDEX["SIDE_MODAL"] = 920] = "SIDE_MODAL";
  Z_INDEX[Z_INDEX["OVERLAY"] = 910] = "OVERLAY";
  Z_INDEX[Z_INDEX["OS_BAR"] = 900] = "OS_BAR";
  Z_INDEX[Z_INDEX["STICKY_BAR"] = 860] = "STICKY_BAR";
  Z_INDEX[Z_INDEX["TOPBAR_MENU"] = 851] = "TOPBAR_MENU";
  Z_INDEX[Z_INDEX["TOPBAR"] = 850] = "TOPBAR";
  Z_INDEX[Z_INDEX["NAV_SIDEBAR"] = 850] = "NAV_SIDEBAR";
  Z_INDEX[Z_INDEX["CHAT"] = 100] = "CHAT";
  Z_INDEX[Z_INDEX["BANNER"] = 1] = "BANNER";
})(Z_INDEX || (Z_INDEX = {}));
export const ANIMATION_PROPERTY_NAME = 'opacity';
export const DEFAULT_SHOW_DURATION_ANIMATION = 275;
export const DEFAULT_HIDE_DURATION_ANIMATION = 250;
export const DEFAULT_OFFSET = 8;
export const ARROW_VERTICAL_OFFSET = 4;
export const ARROW_HORIZONTAL_OFFSET = 6;
export const STATIC_SIDES = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};
export const ROTATION_VALUES = {
  left: 270,
  bottom: 180,
  right: 90,
  top: 0,
};
export const DEFAULT_SHOW_STYLES = {
  opacity: 1,
  visibility: 'visible',
};
export const DEFAULT_HIDE_STYLES = {
  opacity: 0,
  visibility: 'hidden',
};
export const PLACEMENTS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
  'left-start',
  'left-end',
  'right-start',
  'right-end',
];
