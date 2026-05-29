'use strict';

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
exports.Z_INDEX = void 0;
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
})(exports.Z_INDEX || (exports.Z_INDEX = {}));
const ANIMATION_PROPERTY_NAME = 'opacity';
const DEFAULT_SHOW_DURATION_ANIMATION = 275;
const DEFAULT_HIDE_DURATION_ANIMATION = 250;

exports.ANIMATION_PROPERTY_NAME = ANIMATION_PROPERTY_NAME;
exports.DEFAULT_HIDE_DURATION_ANIMATION = DEFAULT_HIDE_DURATION_ANIMATION;
exports.DEFAULT_SHOW_DURATION_ANIMATION = DEFAULT_SHOW_DURATION_ANIMATION;
