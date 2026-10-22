import { FocusArtefactAction, FocusArtefactLocales } from './types';
export declare const LOCALES_DEFAULTS: FocusArtefactLocales;
export declare const DEFAULT_TITLE_ICON = "wpp-icon-document";
export declare const PIN_ACTION_ID = "pin";
export declare const COPY_ACTION_ID = "copy";
export declare const COPIED_ICON = "wpp-icon-done";
export declare const COPIED_CONFIRMATION_TIMEOUT = 3000;
export declare const MIN_WIDTH = 440;
export declare const RESIZE_KEYBOARD_STEP = 10;
export declare const RESIZE_KEY_WIDTHS: Map<string, (width: number) => number | string>;
export declare const PINNED_ICON = "wpp-icon-pinned";
export declare const MENU_LIST_STYLE: {
  display: string;
  flexDirection: string;
  gap: string;
};
/**
 * The actions always rendered in the header, in the order of the design.
 */
export declare const getDefaultActions: (locales: FocusArtefactLocales) => FocusArtefactAction[];
