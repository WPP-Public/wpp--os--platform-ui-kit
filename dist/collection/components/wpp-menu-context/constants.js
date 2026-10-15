export const MENU_BAR_ROLE = 'menubar';
export const MENU_CONTEXT_TAG = 'WPP-MENU-CONTEXT';
export const CONTEXT_ITEM_TAG = 'WPP-LIST-ITEM';
export const LIST_ITEM = 'listitem';
export const OPTION_ROLE = 'option';
export const BUTTON_ROLE = 'button';
export const TOPBAR_NAVIGATION_ITEM_TAG = 'WPP-NAVIGATION-ITEM';
export const MENU_ROLE = 'menu';
export const MENU_ITEM = 'menuitem';
/**
 * Menu-item roles that carry their own selected state (`aria-checked`). A consumer that
 * renders a mutually-exclusive or multi-select group inside the dropdown sets one of these
 * on its `wpp-list-item`s; the menu leaves them alone instead of normalising to `menuitem`,
 * because `aria-checked` is not allowed on a plain `menuitem`.
 */
export const SELECTABLE_MENU_ITEM_ROLES = ['menuitemradio', 'menuitemcheckbox'];
export const GROUP_ROLE = 'group';
export const PRESENTATION_ROLE = 'presentation';
export const WPP_LIST_CLASSNAME = 'wpp-list';
export const TAB_FOCUS_CLASS = 'tab-focus';
export const MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT = 'wppMenuContextKeyboardActivation';
