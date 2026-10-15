'use strict';

const MENU_BAR_ROLE = 'menubar';
const MENU_CONTEXT_TAG = 'WPP-MENU-CONTEXT';
const CONTEXT_ITEM_TAG = 'WPP-LIST-ITEM';
const BUTTON_ROLE = 'button';
const TOPBAR_NAVIGATION_ITEM_TAG = 'WPP-NAVIGATION-ITEM';
const MENU_ROLE = 'menu';
const MENU_ITEM = 'menuitem';
/**
 * Menu-item roles that carry their own selected state (`aria-checked`). A consumer that
 * renders a mutually-exclusive or multi-select group inside the dropdown sets one of these
 * on its `wpp-list-item`s; the menu leaves them alone instead of normalising to `menuitem`,
 * because `aria-checked` is not allowed on a plain `menuitem`.
 */
const SELECTABLE_MENU_ITEM_ROLES = ['menuitemradio', 'menuitemcheckbox'];
const GROUP_ROLE = 'group';
const PRESENTATION_ROLE = 'presentation';
const WPP_LIST_CLASSNAME = 'wpp-list';
const TAB_FOCUS_CLASS = 'tab-focus';
const MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT = 'wppMenuContextKeyboardActivation';

exports.BUTTON_ROLE = BUTTON_ROLE;
exports.CONTEXT_ITEM_TAG = CONTEXT_ITEM_TAG;
exports.GROUP_ROLE = GROUP_ROLE;
exports.MENU_BAR_ROLE = MENU_BAR_ROLE;
exports.MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT = MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT;
exports.MENU_CONTEXT_TAG = MENU_CONTEXT_TAG;
exports.MENU_ITEM = MENU_ITEM;
exports.MENU_ROLE = MENU_ROLE;
exports.PRESENTATION_ROLE = PRESENTATION_ROLE;
exports.SELECTABLE_MENU_ITEM_ROLES = SELECTABLE_MENU_ITEM_ROLES;
exports.TAB_FOCUS_CLASS = TAB_FOCUS_CLASS;
exports.TOPBAR_NAVIGATION_ITEM_TAG = TOPBAR_NAVIGATION_ITEM_TAG;
exports.WPP_LIST_CLASSNAME = WPP_LIST_CLASSNAME;
