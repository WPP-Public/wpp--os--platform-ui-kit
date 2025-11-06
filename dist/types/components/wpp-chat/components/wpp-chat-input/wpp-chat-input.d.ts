import { EventEmitter } from '../../../../stencil-public-runtime';
import { FileItemType, FileUploadEventDetail, FileUploadItemEventDetail } from '../../../wpp-file-upload/types';
import { FileUploadConfig, SendEventDetail } from './types';
import { MessageTypes } from '../../../../types/common';
export declare class WppChatInput {
  host: HTMLWppChatInputElement;
  private resizeObserver;
  private inputRef?;
  private textareaRef?;
  private inputAreaRef?;
  private scrollTimeout;
  private MIN_TEXTAREA_HEIGHT;
  private MAX_INPUT_AREA_HEIGHT;
  /**
   * Placeholder text for the input field.
   */
  readonly placeholder: string;
  /**
   * Whether the attach button is enabled.
   */
  readonly enableAttach: boolean;
  /**
   * Whether the mic button is enabled.
   * @internal - This prop will be of use in the future, but for now, it's not used.
   */
  readonly enableMic: boolean;
  /**
   * If `true`, the chat input is disabled.
   */
  readonly disabled: boolean;
  /**
   * Configuration object for file upload functionality.
   */
  readonly fileUploadConfig?: Partial<FileUploadConfig>;
  /**
   * Maximum number of allowed characters.
   */
  readonly charactersLimit?: number;
  /**
   * Defines the files list
   */
  attachments: FileItemType[];
  /**
   * If set to true, displays `Select` in left actions. The Select must placed in the `.select` slot.
   */
  readonly withSelect: boolean;
  message: string;
  successAttachmentsList: FileItemType[];
  errorAttachmentsList: FileItemType[];
  toastMessage: string;
  toastType: MessageTypes;
  showToast: boolean;
  isAnyFileUploading: boolean;
  areAttachmentsVisible: boolean;
  hasSelectSlot: boolean;
  /**
   * Emitted when the user clicks the "Send" button.
   */
  readonly wppSend: EventEmitter<SendEventDetail>;
  /**
   * Emitted when the user clicks the "Mic" button.
   * @internal - This prop will be of use in the future, but for now, it's not used.
   */
  readonly wppMic: EventEmitter<void>;
  /**
   * Emitted when the value of the input changes.
   */
  readonly wppChange: EventEmitter<FileUploadEventDetail>;
  /**
   * Emitted when the file-upload item was deleted.
   * @internal
   */
  readonly wppFileUploadItemDelete: EventEmitter<FileUploadItemEventDetail>;
  /**
   * Emitted when the file-upload item was clicked.
   * @internal
   */
  readonly wppFileUploadItemClick: EventEmitter<FileUploadItemEventDetail>;
  private reInitValue;
  onAttachmentsChange(newValue: FileItemType[]): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private forceRecalculateHeight;
  private calculateTextHeight;
  private get mergedFileUploadConfig();
  private checkAttachmentsVisibility;
  private updateSlotData;
  private handleScroll;
  private disconnectObserver;
  private initializeObserver;
  private scrollToTopOfAttachments;
  private scrollToBottomOfAttachments;
  private displayToast;
  private handleSend;
  private scrollInputAreaToBottom;
  private handleInput;
  private adjustTextareaHeight;
  private isFileWithError;
  private handleDeleteItem;
  private handleClickItem;
  private handleFileSelection;
  private handleChange;
  private isMaximumFilesSet;
  private validateFileSize;
  private isAcceptConfigFilled;
  private getAcceptExtensions;
  private validateFileType;
  private customValidation;
  private handleFileLoad;
  private displayErrorListByShowingOption;
  private generateUniqueName;
  private handleClick;
  private handleToastClick;
  private get isSendDisabled();
  private hostCssClasses;
  private chatToastClasses;
  private chatInputContainerClasses;
  private inputAreaClasses;
  private attachmentsWrapperClasses;
  private textInputClasses;
  private actionsBarClasses;
  private leftActionsClasses;
  private selectClasses;
  private rightActionsClasses;
  render(): any;
}
