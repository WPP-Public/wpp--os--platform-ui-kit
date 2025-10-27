import { EventEmitter } from '../../../../stencil-public-runtime';
import { FileItemType, FileUploadEventDetail, FileUploadItemEventDetail } from '../../../wpp-file-upload/types';
import { ChatInputSize, FileUploadConfig, MessageChangeEventDetail, SendEventDetail } from './types';
import { MessageTypes } from '../../../../types/common';
export declare class WppChatInput {
  host: HTMLWppChatInputElement;
  private resizeObserver;
  private inputRef?;
  private textareaRef?;
  private inputAreaRef?;
  private scrollTimeout;
  private debouncedHandleInput;
  /**
   * Size of the component.
   */
  readonly size: ChatInputSize;
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
  /**
   * Text value used to set the input message content.
   * When user input occurs, a `wppMessageChanged` event is emitted. The new value should be assigned to this property
   * to maintain synchronization with the input field.
   */
  readonly textValue: string;
  /**
   * If set to `true`, enable debounce for onInput event.
   */
  readonly debounceEnabled: boolean;
  /**
   * Debounce delay in milliseconds.
   */
  readonly debounceDelay: number;
  /**
   * Defines the z-index of the WppChatInput.
   */
  readonly zIndex: number;
  successAttachmentsList: FileItemType[];
  errorAttachmentsList: FileItemType[];
  toastMessage: string;
  toastType: MessageTypes;
  showToast: boolean;
  areAttachmentsVisible: boolean;
  hasSelectSlot: boolean;
  isChatInputExpanded: boolean;
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
  /**
   * Emitted when the message in the input message changes.
   */
  readonly wppMessageChanged: EventEmitter<MessageChangeEventDetail>;
  internalValue: string;
  private reInitValue;
  onAttachmentsChange(newValue: FileItemType[]): void;
  onTextValueChange(value: string): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private handleDocumentClick;
  onSizeChange(newValue: ChatInputSize, oldValue: ChatInputSize): void;
  private handleFileLoaded;
  /**
   * Maximize the input area when the user clicks on it.
   */
  private handleSizeToggle;
  /**
   * Minimize the input area when it loses focus.
   */
  private handleSimpleBlur;
  private forceRecalculateHeight;
  private calculateTextHeight;
  private get mergedFileUploadConfig();
  private checkAttachmentsVisibility;
  private updateSlotData;
  private handleScroll;
  private disconnectObserver;
  private initializeObserver;
  /**
   * Scrolls the attachments list to the specified file type.
   * @param fileType 'error' for error files, 'success' for success files (or '' for any file)
   */
  private scrollToAttachment;
  private displayToast;
  private handleSend;
  private handlePaste;
  /**
   * Handles image file pasting from clipboard items.
   * Returns true if files were handled, false otherwise.
   */
  private handleFilePaste;
  private handleInput;
  private debouncedAdjustTextareaHeight;
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
  private onKeyDown;
  private get isSendDisabled();
  private hostCssClasses;
  private chatToastClasses;
  private chatInputContainerClasses;
  private inputAreaClasses;
  private attachmentsWrapperClasses;
  private textInputClasses;
  private inputAreaWrapperClasses;
  private minimizedInput;
  private inputValue;
  private actionsBarClasses;
  private leftActionsClasses;
  private selectClasses;
  private rightActionsClasses;
  render(): any;
}
