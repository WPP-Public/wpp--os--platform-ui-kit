import type { AcceptConfig, FileItemType, FileUploadResultFormaType } from '../../../wpp-file-upload/types';
import type { AriaProps } from '../../../../types/common';
export interface ChatInputLocaleInterface {
  placeholder: string;
  minimizedDescription: string;
  actionsToolbarLabel: string;
  leftActionsGroupLabel: string;
  rightActionsGroupLabel: string;
  sendLabel: string;
  /** Localized label used by the stop action when `isGenerating` is true. */
  stopLabel: string;
  attachLabel: string;
  voiceLabel: string;
  attachmentsLabel: string;
  messageInputLabel: string;
  actionsMenuLabel: string;
  audioRecordButtonLabel: string;
  audioStopRecordButtonLabel: string;
  audioLanguage: string;
  modelSelectorBtnLabel: string;
  modelAutoOptionLabel: string;
  modelAutoOptionCaption: string;
  modelPremiumOptionLabel: string;
  modelPremiumOptionCaption: string;
  modelSelectorListItemLabel: string;
  modelReasoningLabel: string;
  modelVerbosityLabel: string;
}
export type ChatInputAriaProps = {
  minimizedTrigger?: Pick<AriaProps, 'label' | 'describedby' | 'controls' | 'expanded'>;
  textarea?: Pick<AriaProps, 'label' | 'describedby'> & {
    invalid?: 'true' | 'false';
  };
  sendButton?: Pick<AriaProps, 'label'>;
  /** Override the accessible label for the stop action shown while `isGenerating` is true. */
  stopButton?: Pick<AriaProps, 'label'>;
  attachButton?: Pick<AriaProps, 'label' | 'pressed'>;
  actionsMenuButton?: Pick<AriaProps, 'label' | 'expanded' | 'haspopup'>;
  audioRecordButton?: Pick<AriaProps, 'label'>;
  audioStopRecordButton?: Pick<AriaProps, 'label'>;
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
export type ActionsMenuToggleEventDetail = {
  open: boolean;
};
/**
 * Describes a single entry rendered inside the consolidated actions menu
 * (the `wpp-icon-plus` dropdown). The component renders a `wpp-list-item`
 * per entry; the `icon` must correspond to a valid wpp-icon component name
 * (e.g. `'wpp-icon-attach'`, `'wpp-icon-pinned'`).
 *
 * The reserved id `'upload'` automatically wires the item to the same file
 * picker that `enableAttach` uses, so consumers do not need extra plumbing
 * to add an "Upload file" entry.
 */
export interface ChatInputAction {
  id: string;
  icon: string;
  label: string;
  disabled?: boolean;
}
export type ChatInputActionItemClickEventDetail = ChatInputAction;
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
  /**
   * Accessible label of an attachment's delete control.
   */
  removeFile?: (name: string) => string;
  /**
   * Accessible name of the progress indicator shown while an attachment is processing.
   */
  uploadProgress?: (name: string) => string;
}
export interface SendEventDetail {
  message: string;
  attachments?: FileItemType[];
  /**
   * The model the message was sent with. Optional only so the existing payload stays
   * backwards compatible — the component always populates it.
   */
  model?: ChatInputSelectableModel;
  /**
   * The reasoning level in force when the message was sent. Omitted entirely when the
   * selected model offers no `reasoningOptions` or nothing is selected yet.
   */
  reasoning?: ChatInputModelConfigOption;
  /**
   * The verbosity level in force when the message was sent. Omitted entirely when the
   * selected model offers no `verbosityOptions` or nothing is selected yet.
   */
  verbosity?: ChatInputModelConfigOption;
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
/**
 * A single selectable level inside the Reasoning or Verbosity submenu.
 *
 * Both the `label` and the optional `caption` are supplied by the consumer, because the
 * wording is per-LLM data owned by the platform — the component renders whatever it is
 * given and hard-codes none of it. An option without a `caption` renders a single-line row.
 */
export interface ChatInputModelConfigOption {
  id: string;
  label: string;
  caption?: string;
}
/**
 * Which of the two level submenus a piece of plumbing belongs to. The pair is fixed by the
 * design — a model offers reasoning levels, verbosity levels, or both — so it is an explicit
 * union rather than an open string.
 */
export type ChatInputModelOptionsKind = 'reasoning' | 'verbosity';
export interface ChatInputModel {
  id: string | number;
  label: string;
  logo: string;
  /**
   * Reasoning levels offered by this model. When non-empty, selecting this model adds a
   * "Reasoning" row to the model dropdown that opens a submenu of these options; omit it
   * (or pass an empty array) and no Reasoning row is rendered.
   */
  reasoningOptions?: ChatInputModelConfigOption[];
  /**
   * Verbosity levels offered by this model. Behaves exactly like `reasoningOptions` but
   * drives the "Verbosity" row. Only supply it for models that actually support verbosity
   * — omitting it is how a model opts out of the row.
   */
  verbosityOptions?: ChatInputModelConfigOption[];
}
export interface ChatInputDefaultModel extends ChatInputModel {
  caption: string;
}
/**
 * A model option surfaced by the selector: either a built-in default option
 * (`ChatInputDefaultModel`) or a dev-provided `ChatInputModel`.
 *
 * Declared as a single named alias (rather than an inline `ChatInputModel | ChatInputDefaultModel`
 * union in the `@Event()` type) because Stencil's Angular output target only aliases the first
 * member of a union of complex types when generating the proxy, leaving the rest unresolved.
 */
export type ChatInputSelectableModel = ChatInputModel | ChatInputDefaultModel;
export type ChatInputSelectedModel = 'auto' | 'premium' | ChatInputModel;
/**
 * Resulting state of the model's option selection, emitted by both `wppReasoningSelect`
 * and `wppVerbositySelect` so a consumer never has to mirror the component's internals:
 * whichever level was just picked, the payload always describes the full selection.
 *
 * `reasoning` / `verbosity` are `null` when the model offers no such options, or when the
 * consumer has not selected a level yet.
 */
export interface ChatInputModelOptionsEventDetail {
  model: ChatInputModel;
  reasoning: ChatInputModelConfigOption | null;
  verbosity: ChatInputModelConfigOption | null;
}
export interface ChatInputMicEventDetail {
  /** `true` when the microphone just started listening, `false` when it stopped. */
  isRecording: boolean;
}
