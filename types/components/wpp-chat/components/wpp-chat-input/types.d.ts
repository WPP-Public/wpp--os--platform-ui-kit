import { AcceptConfig, FileItemType, FileUploadResultFormaType } from '../../../wpp-file-upload/types';
export interface ChatInputFileUploadLocales {
  sizeError: string;
  formatError: string;
  limitError: string;
}
export interface SendEventDetail {
  message: string;
  attachments?: FileItemType[];
}
export interface FileUploadConfig {
  format?: FileUploadResultFormaType;
  maxLabelLength?: number;
  multiple: boolean;
  maxFiles: number;
  size: number;
  accept: string[];
  acceptConfig: AcceptConfig;
  validator?: (file: FileItemType) => string | null;
  showOnlyNewErrors: boolean;
  controlled: boolean;
  locales: ChatInputFileUploadLocales;
}
/**
 * ChatInputSize defines the available size variants for the chat input.
 *
 * 's' - Simple variant with a minimized preview state (expands on click)
 * 'm' - Default (full) variant
 */
export type ChatInputSize = 's' | 'm';
export type MessageChangeEventDetail = {
  value: string;
};
