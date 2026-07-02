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
}
export type FileUploadItemLocales = Pick<FileUploadLocales, 'sizeError' | 'formatError'>;
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
