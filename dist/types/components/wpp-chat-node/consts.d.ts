import type { ChatNodeDefaultModel, ChatNodeLocales, ChatNodeMessageAction } from './types';
export declare const LOCALES_DEFAULTS: ChatNodeLocales;
/**
 * The built-in default model options ("Auto" / "Premium") always rendered at the top of
 * the model-selector dropdown, mirroring wpp-chat-input. The logos are hosted brand assets.
 */
export declare const getDefaultModelOptions: (locales: ChatNodeLocales) => ChatNodeDefaultModel[];
export declare const getDefaultMessageActions: (locales: ChatNodeLocales) => ChatNodeMessageAction[];
export declare const DEFAULT_MESSAGE_ACTIONS: ChatNodeMessageAction[];
