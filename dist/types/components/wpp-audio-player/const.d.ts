import { AudioPlayerLocales } from './types';
export declare const SECONDS_IN_HOUR = 3600;
export declare const SECONDS_IN_MINUTE = 60;
export declare const DEFAULT_PLAYBACK_RATES: number[];
/** How far the skip buttons and the Left/Right arrow keys move the playback position, in seconds. */
export declare const AUDIO_SKIP_TIME_VALUE = 10;
/** How far the Up/Down arrow keys move the volume, on the 0–1 scale. */
export declare const VOLUME_SKIP_VALUE = 0.05;
/** ARIA roles whose element Space activates, so the play/pause shortcut leaves Space to them. */
export declare const SPACE_ACTIVATED_ROLES: string[];
export declare const LOCALES_DEFAULTS: AudioPlayerLocales;
