import { JumpValues, VideoPlayerLocales } from './types';
export declare const JUMP_VALUES_DEFAULTS: JumpValues;
/**
 * Gap between emptying the announcement region and writing the next message (ms), so even a message
 * worded like the last one is a fresh change. Within one frame the browser can merge the two into none.
 */
export declare const ANNOUNCEMENT_RESET_DELAY = 100;
export declare const LOCALES_DEFAULTS: VideoPlayerLocales;
