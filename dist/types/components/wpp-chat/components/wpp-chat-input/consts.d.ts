import type { ChatInputDefaultModel, ChatInputLocaleInterface, FileUploadConfig } from './types';
export declare const DEFAULT_FILE_UPLOAD_CONFIG: FileUploadConfig;
export declare const MAX_INPUT_AREA_HEIGHT = 240;
export declare const MIN_TEXTAREA_HEIGHT = 52;
/**
 * How long the send/stop button takes to collapse out of the actions bar.
 * Should be kept in sync with `--chat-input-action-transition-duration` from the `scss` file.
 */
export declare const PRIMARY_ACTION_TRANSITION_MS = 200;
/**
 * Reserved `ChatInputAction.id` that auto-wires an actions-menu entry to the
 * same file picker used by `enableAttach`. Consumers can still listen for the
 * `wppActionsMenuItemClick` event on top of the built-in behavior.
 */
export declare const UPLOAD_ACTION_ID = "upload";
export declare const UPLOAD_ICON = "wpp-icon-attach";
/**
 * Sits between the model name and the selected reasoning level in the selector trigger
 * (`Gemini 3.5 Flash\u30FBHigh`). This is U+30FB KATAKANA MIDDLE DOT, taken verbatim from the
 * Figma text node — it carries its own wide side bearings, which is why the design shows visual
 * gaps without any space characters. Do NOT "fix" it to a bullet plus spaces; that reads the
 * same but is not what the design specifies.
 *
 * Not a locale string: it is punctuation, and the same glyph is used in every language.
 */
export declare const MODEL_REASONING_SEPARATOR = "\u30FB";
/**
 * Levels used when a model is selected and the user has not chosen one for it yet:
 * "Reasoning: Auto, with fallback to Medium. Verbosity: Medium." (Mustafa, 23 Sep 2026).
 *
 * Matched against the ids the consumer supplies in `reasoningOptions` / `verbosityOptions`,
 * first hit wins. A model offering none of these ids gets no default rather than an arbitrary
 * guess, so nothing is pre-selected. These literals are the platform's `ReasoningLevel` /
 * `LlmOutputVerbosity` enum values — the only place the component assumes anything about an
 * option's meaning.
 */
export declare const DEFAULT_REASONING_IDS: string[];
export declare const DEFAULT_VERBOSITY_IDS: string[];
/**
 * Geometry for a level submenu, which the design bottom-aligns with the model menu rather than
 * with the row that opens it.
 *
 * Popper's skidding offset moves the popup along the trigger's cross axis, so for a `right-end`
 * placement the submenu's bottom lands `skidding` pixels below the trigger row's bottom. Both
 * popups carry 8px of their own padding, so a skidding equal to the gap between the row and the
 * menu's bottom edge puts the last level in line with the menu's last row. `*_FALLBACK_SKIDDING`
 * is that gap when the menu is not a popup at all and there is nothing to measure against.
 */
export declare const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
export declare const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
export declare const LOCALES_DEFAULTS: ChatInputLocaleInterface;
export declare const getDefaultModelOptions: (locales: ChatInputLocaleInterface) => ChatInputDefaultModel[];
