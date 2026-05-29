import { FileUploadConfig } from './types';
import { ChatInputLocaleInterface } from './types';
export declare const DEFAULT_FILE_UPLOAD_CONFIG: FileUploadConfig;
export declare const MAX_INPUT_AREA_HEIGHT = 240;
export declare const MIN_TEXTAREA_HEIGHT = 52;
/**
 * Reserved `ChatInputAction.id` that auto-wires an actions-menu entry to the
 * same file picker used by `enableAttach`. Consumers can still listen for the
 * `wppActionsMenuItemClick` event on top of the built-in behavior.
 */
export declare const UPLOAD_ACTION_ID = "upload";
export declare const LOCALES_DEFAULTS: ChatInputLocaleInterface;
