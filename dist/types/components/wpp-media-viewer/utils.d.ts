import { MediaViewerErrorReason, MediaViewerLocales } from './types';
/** Replaces each `{name}` placeholder in a locale string with its value. */
export declare const fillTemplate: (template: string, values: Record<string, string | number>) => string;
export declare const fileNameFromUrl: (url: string) => string;
export declare const fileExtension: (fileName: string) => string;
/** A size prop value as CSS: a number is pixels, a string is used as written. */
export declare const toCssLength: (value: number | string) => string;
export declare const ERROR_LOCALE_KEYS: Record<MediaViewerErrorReason, keyof MediaViewerLocales>;
