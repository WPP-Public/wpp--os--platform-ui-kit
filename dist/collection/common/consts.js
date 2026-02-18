/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
// Z-INDEX HIERARCHY
// 900: Header (OS Bar)
// 890: Sticky Bar (Top Bar)
// 880: Overlays (dropdowns, pickers, popovers, etc.)
// 1150: Context Menu (as we have these in the header)
// 1200: Tooltips
export var Z_INDEX;
(function (Z_INDEX) {
  Z_INDEX[Z_INDEX["TOOLTIP"] = 1200] = "TOOLTIP";
  Z_INDEX[Z_INDEX["TOAST"] = 1050] = "TOAST";
  Z_INDEX[Z_INDEX["OVERLAY"] = 900] = "OVERLAY";
  Z_INDEX[Z_INDEX["TOPBAR"] = 899] = "TOPBAR";
  Z_INDEX[Z_INDEX["NAV_SIDEBAR"] = 899] = "NAV_SIDEBAR";
  Z_INDEX[Z_INDEX["STICKY_BAR"] = 890] = "STICKY_BAR";
  Z_INDEX[Z_INDEX["COLOR_PICKER"] = 880] = "COLOR_PICKER";
  Z_INDEX[Z_INDEX["TIME_PICKER"] = 880] = "TIME_PICKER";
  Z_INDEX[Z_INDEX["DATE_PICKER"] = 880] = "DATE_PICKER";
  Z_INDEX[Z_INDEX["AUTOCOMPLETE"] = 880] = "AUTOCOMPLETE";
  Z_INDEX[Z_INDEX["MENU_LIST"] = 880] = "MENU_LIST";
  Z_INDEX[Z_INDEX["SEARCH"] = 880] = "SEARCH";
  Z_INDEX[Z_INDEX["POPOVER"] = 880] = "POPOVER";
  Z_INDEX[Z_INDEX["CONTEXT_MENU"] = 880] = "CONTEXT_MENU";
  Z_INDEX[Z_INDEX["MODAL"] = 875] = "MODAL";
  Z_INDEX[Z_INDEX["SIDE_MODAL"] = 870] = "SIDE_MODAL";
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
