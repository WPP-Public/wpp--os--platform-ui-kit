import type { ChatNodeDefaultModel, ChatNodeLocales, ChatNodeMessageAction } from './types';
export declare const LOCALES_DEFAULTS: ChatNodeLocales;
/**
 * The built-in default model options ("Auto" / "Premium") always rendered at the top of
 * the model-selector dropdown, mirroring wpp-chat-input. The logos are hosted brand assets.
 */
export declare const getDefaultModelOptions: (locales: ChatNodeLocales) => ChatNodeDefaultModel[];
/**
 * Levels used when a model is selected and the user has not chosen one for it yet:
 * "Reasoning: Auto, with fallback to Medium. Verbosity: Medium." (Mustafa, 23 Sep 2026).
 * Matched against the ids the consumer supplies, first hit wins; a model offering none of them
 * gets no default rather than an arbitrary guess. These literals are the platform's
 * `ReasoningLevel` / `LlmOutputVerbosity` enum values.
 */
export declare const DEFAULT_REASONING_IDS: string[];
export declare const DEFAULT_VERBOSITY_IDS: string[];
/**
 * Geometry for a level submenu, which the design aligns with the bottom of the model menu rather
 * than with the row that opens it. Popper's skidding offset moves the popup along the trigger's
 * cross axis, so for a `right-end` placement a skidding equal to the gap between the row and the
 * menu's bottom edge puts the last level in line with the menu's last row. The fallback is that
 * gap when the menu is not a popup and there is nothing to measure against.
 */
export declare const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
export declare const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
/**
 * The footer actions rendered below an assistant message when a dev passes no `messageActions`.
 * The node has no quote action — unlike wpp-chat-conversation, its single-row chat bar has no
 * place to show the resulting quote, so the design drops it here (confirmed by design, Sep 2026).
 */
export declare const getDefaultMessageActions: (locales: ChatNodeLocales) => ChatNodeMessageAction[];
/**
 * How long a message's copy confirmation (checkmark + "Copied" label) stays visible before the
 * button reverts to its idle state.
 */
export declare const COPIED_CONFIRMATION_TIMEOUT = 3000;
/** Icon rendered beside a message's token count when the message does not override it. */
export declare const DEFAULT_TOKEN_COUNT_ICON = "wpp-icon-premium";
export declare const DEFAULT_MESSAGE_ACTIONS: ChatNodeMessageAction[];
