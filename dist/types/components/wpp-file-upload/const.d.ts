import { FileTypeLabel, FileUploadLocales } from './types';
export declare const EXTENSION_TO_TYPE: {
  [key: string]: string;
};
export declare const returnIconFromExtension: (fileExtension: string, thumbnailUrl: string | null) => any;
/**
 * Maps a file extension to a human-readable file type category label.
 * Used as the subtitle in the chat variant of `wpp-file-upload-item`.
 */
export declare const returnFileTypeLabel: (fileExtension: string) => FileTypeLabel;
export declare const LOCALES_DEFAULTS: FileUploadLocales;
