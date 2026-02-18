import { AcceptConfig, FileItemType, FileUploadResultFormaType } from '../../../wpp-file-upload/types';
import { AriaProps } from '../../../../types/common';
export interface ChatInputLocaleInterface {
  placeholder: string;
  minimizedDescription: string;
  actionsToolbarLabel: string;
  leftActionsGroupLabel: string;
  rightActionsGroupLabel: string;
  sendLabel: string;
  attachLabel: string;
  voiceLabel: string;
  attachmentsLabel: string;
  messageInputLabel: string;
}
export type ChatInputAriaProps = {
  minimizedTrigger?: Pick<AriaProps, 'label' | 'describedby' | 'controls' | 'expanded'>;
  textarea?: Pick<AriaProps, 'label' | 'describedby'> & {
    invalid?: 'true' | 'false';
  };
  sendButton?: Pick<AriaProps, 'label'>;
  attachButton?: Pick<AriaProps, 'label' | 'pressed'>;
  actionsToolbar?: {
    label?: string;
  };
  leftActionsGroup?: {
    label?: string;
  };
  rightActionsGroup?: {
    label?: string;
  };
};
export interface ChatInputAttributes {
  textarea?: {
    id?: string;
    name?: string;
    autocomplete?: string;
    maxLength?: number;
  };
  attachmentsInput?: {
    id?: string;
    name?: string;
    accept?: string;
    multiple?: boolean;
  };
}
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
  multiple: boolean;
  maxFiles: number;
  size: number;
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
