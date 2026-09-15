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
export declare const LOCALES_DEFAULTS: ChatInputLocaleInterface;
export declare const getDefaultModelOptions: (locales: ChatInputLocaleInterface) => ChatInputDefaultModel[];
