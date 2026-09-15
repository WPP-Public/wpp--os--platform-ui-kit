import { MessageTypes } from '../../types/common';
import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
export type FileValidatorHandler = (file: FileItemType) => string | null;
interface FileMetaData {
  sizeError?: boolean;
  formatError?: boolean;
  validatorError?: string;
  disabled?: boolean;
  deletable?: boolean;
  isLoading?: boolean;
}
export interface FileBasedItemType extends File, FileMetaData {
  result?: string | ArrayBuffer | null;
}
export type AcceptConfig = Record<string, string[]>;
export type FileItemType = FileBasedItemType | (FileMetaData & {
  name: string;
  url: string;
  size: number;
  type: string;
  lastModified?: number;
  result?: string | ArrayBuffer | null;
});
export interface FileUploadEventDetail extends BaseFormControlEventDetail<FileItemType[]> {
  hasError: boolean;
  errorFiles: FileItemType[];
  name?: string;
}
export interface FileUploadItemEventDetail {
  name: string;
  size: number;
  index: number;
}
export interface FileUploadErrorEventDetails {
  errorFiles: FileItemType[];
  errorMessage: string;
  name?: string;
}
export interface FileUploadLocales {
  label: string;
  text: string;
  info: (accept: string, size: number) => string;
  sizeError: string;
  formatError: string;
  singleFileLimitError: string;
  multipleFileLimitError: string;
  /**
   * Screen-reader announcement made when a file is added successfully.
   * Defaults to '<fileName> added'.
   */
  fileAdded?: (fileName: string) => string;
  /**
   * Screen-reader announcement made when a file is removed from the list.
   * Defaults to '<fileName> removed'.
   */
  fileRemoved?: (fileName: string) => string;
  /**
   * Accessible name of the per-file delete control.
   * Defaults to 'Remove file <fileName>'.
   */
  removeFile?: (fileName: string) => string;
}
export type FileUploadItemLocales = Pick<FileUploadLocales, 'sizeError' | 'formatError' | 'removeFile'>;
/**
 * Locales once `LOCALES_DEFAULTS` has filled in every key the consumer left out. Internal use
 * only - `FileUploadLocales` stays the public shape so a consumer can keep annotating a complete
 * translation object without having to supply the accessibility strings.
 */
export type ResolvedFileUploadLocales = Required<FileUploadLocales>;
export type ResolvedFileUploadItemLocales = Required<FileUploadItemLocales>;
export declare enum ScrollState {
  scroll = "scroll"
}
export type FileUploadResultFormaType = 'base64' | 'binaryString' | 'arrayBuffer';
/**
 * Visual variant of a single `wpp-file-upload-item`.
 * - `default`: the compact single-line chip used by the standalone uploader.
 * - `chat`: the taller two-line thumbnail card used by chat parts (file name + type/progress).
 */
export type FileUploadItemVariant = 'default' | 'chat';
/**
 * Human-readable file type category shown as the subtitle of the chat variant.
 */
export type FileTypeLabel = 'Image' | 'Document' | 'Zip' | 'Spreadsheet' | 'Text' | 'Video' | 'Audio' | 'Data' | 'Presentation';
export type FileUploadMessageType = Exclude<MessageTypes, 'information' | 'success' | 'warning' | 'brand'>;
export type FileUploadTabElements = 'wrapper' | 'item';
export {};
