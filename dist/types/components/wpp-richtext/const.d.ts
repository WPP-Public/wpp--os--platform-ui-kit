import { RichtextLocales } from './types';
export declare const KEYBOARD_FOCUS_EVENT = "keyboard-focus";
export declare const KEYBOARD_FOCUS_CLASS = "tab-focus";
export declare const LOCALES_DEFAULTS: RichtextLocales;
/**
 * Toolbar actions that toggle a formatting state (bold on/off, list on/off,
 * ...). These expose `aria-pressed` reflecting their active state per the
 * WAI-ARIA Toolbar pattern. Command actions (undo/redo/image/...) are omitted
 * so they never advertise a false toggle state (WCAG 4.1.2).
 */
export declare const TOOLBAR_TOGGLE_ACTIONS: Set<string>;
/**
 * Font-size options for the toolbar picker, in the order they are rendered. The renderer and the
 * menu's keyboard handler both index into this, so it has to stay a single ordered source of truth.
 */
export declare const FONT_SIZE_OPTIONS: {
  value: string;
  label: string;
}[];
