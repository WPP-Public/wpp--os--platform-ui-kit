export declare const MENU_BAR_ROLE = "menubar";
export declare const MENU_CONTEXT_TAG = "WPP-MENU-CONTEXT";
export declare const CONTEXT_ITEM_TAG = "WPP-LIST-ITEM";
export declare const LIST_ITEM = "listitem";
export declare const OPTION_ROLE = "option";
export declare const BUTTON_ROLE = "button";
export declare const TOPBAR_NAVIGATION_ITEM_TAG = "WPP-NAVIGATION-ITEM";
export declare const MENU_ROLE = "menu";
export declare const MENU_ITEM = "menuitem";
/**
 * Menu-item roles that carry their own selected state (`aria-checked`). A consumer that
 * renders a mutually-exclusive or multi-select group inside the dropdown sets one of these
 * on its `wpp-list-item`s; the menu leaves them alone instead of normalising to `menuitem`,
 * because `aria-checked` is not allowed on a plain `menuitem`.
 */
export declare const SELECTABLE_MENU_ITEM_ROLES: string[];
export declare const GROUP_ROLE = "group";
export declare const PRESENTATION_ROLE = "presentation";
export declare const WPP_LIST_CLASSNAME = "wpp-list";
export declare const TAB_FOCUS_CLASS = "tab-focus";
export declare const MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT = "wppMenuContextKeyboardActivation";
