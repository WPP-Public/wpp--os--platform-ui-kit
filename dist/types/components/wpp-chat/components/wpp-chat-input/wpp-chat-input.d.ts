import { EventEmitter } from '../../../../stencil-public-runtime';
import { FileItemType, FileUploadEventDetail, FileUploadItemEventDetail } from '../../../wpp-file-upload/types';
import { ActionsMenuToggleEventDetail, ChatInputAction, ChatInputActionItemClickEventDetail, ChatInputAriaProps, ChatInputAttributes, ChatInputLocaleInterface, ChatInputSize, FileUploadConfig, MessageChangeEventDetail, SendEventDetail } from './types';
import { MessageTypes } from '../../../../types/common';
/**
 * @slot alert - Optional alert (for example wpp-chat-alert) rendered at the top of the chat input frame. Dismissing it hides the alert without affecting the rest of the input.
 * @part alert - Wrapper around the alert slot.
 * @slot references - Optional references (for example wpp-chat-reference) stacked above the textarea inside the input area.
 * @part references - Wrapper around the references slot.
 */
export declare class WppChatInput {
  host: HTMLWppChatInputElement;
  private resizeObserver;
  private inputRef?;
  private textareaRef?;
  private inputAreaRef?;
  private scrollTimeout;
  private debouncedHandleInput;
  private readonly inputAreaId;
  private readonly textareaAutoId;
  private readonly minimizedDescId;
  private expandedListenersAbort?;
  private recognition;
  private themeSubscription;
  private aiModelBtn;
  /**
   * Size of the component.
   */
  readonly size: ChatInputSize;
  /**
   * Placeholder text for the input field.
   * @deprecated: Prefer locales.placeholder. This property will be removed in version 5.0.0.
   */
  readonly placeholder: string;
  /**
   * Whether the attach button is enabled.
   * @deprecated - the `upload` action will always be available in the actions menu. This property will be removed in version 5.0.0.
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
   * If `true`, displays a stop action for an in-progress AI response.
   */
  readonly isGenerating: boolean;
  /**
   * Configuration object for file upload functionality.
   *
   * @deprecated This top-level prop will be removed in components-library v5.0.0.
   * The same options will be moved into a richer attachments configuration owned
   * by the upload action entry (so consumers can scope `accept`, `size`,
   * `maxFiles`, `validator`, etc. per-action rather than globally on the
   * chat-input). For now keep using this prop; a migration codemod will be
   * provided alongside the v5.0.0 release.
   */
  readonly fileUploadConfig?: Partial<FileUploadConfig>;
  /**
   * Maximum number of allowed characters.
   * @deprecated - This property is no longer valid. This property will be removed in version 5.0.0.
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
   * Defines the entries shown in the consolidated actions menu (the
   * `wpp-icon-plus` dropdown rendered at the start of the left toolbar).
   * By default, the menu always renders the `upload` action.
   * Use this to consolidate auxiliary actions (translate,
   * pinboard, upload, etc.) behind a single "plus" affordance.
   */
  readonly actions: ChatInputAction[];
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
  /**
   * Defines the aria-label of the text area.
   * @deprecated: Prefer ariaProps.textarea.label
   * This property will be removed in version 5.0.0.
   */
  readonly textareaAriaLabel?: string;
  /**
   * Defines the Id of the text area.
   * @deprecated: Prefer htmlAttributes.textarea.id
   * This property will be removed in version 5.0.0.
   */
  readonly textareaId?: string;
  /**
   * Defines the name of the text area.
   * @deprecated: Prefer htmlAttributes.textarea.name
   * This property will be removed in version 5.0.0.
   */
  readonly textareaName?: string;
  /**
   * Grouped element htmlAttributes (textarea + file input).
   * New API — replaces textareaId/textareaName.
   */
  readonly htmlAttributes?: ChatInputAttributes;
  /**
   * Typed ARIA overrides. Only supported htmlAttributes exposed.
   */
  readonly ariaProps?: ChatInputAriaProps;
  /**
   * Locales (visual strings). Will be merged into _locales.
   */
  readonly locales: Partial<ChatInputLocaleInterface>;
  successAttachmentsList: FileItemType[];
  errorAttachmentsList: FileItemType[];
  toastMessage: string;
  toastType: MessageTypes;
  showToast: boolean;
  areAttachmentsVisible: boolean;
  hasSelectSlot: boolean;
  hasAlertSlot: boolean;
  isAlertDismissed: boolean;
  hasReferencesSlot: boolean;
  isChatInputExpanded: boolean;
  minimizedPressed: boolean;
  isFileDialogOpen: boolean;
  internalValue: string;
  actionsMenuOpen: boolean;
  isFocused: boolean;
  isAudioRecording: boolean;
  /**
   * Emitted when the user clicks the "Send" button.
   */
  readonly wppSend: EventEmitter<SendEventDetail>;
  /**
   * Emitted when the user clicks the "Stop" button while an AI response is generating.
   */
  readonly wppStop: EventEmitter<void>;
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
  /**
   * Emitted when the internal actions menu (triggered by the `wpp-icon-plus`
   * button) opens or closes. Only fires when `actions` is non-empty.
   */
  readonly wppActionsMenuToggle: EventEmitter<ActionsMenuToggleEventDetail>;
  /**
   * Emitted when the user clicks an entry in the consolidated actions menu.
   * The detail payload is the `ChatInputAction` object that was clicked.
   * Fires for every entry, including the reserved `'upload'` entry (which is
   * additionally wired to open the file picker automatically).
   */
  readonly wppActionsMenuItemClick: EventEmitter<ChatInputActionItemClickEventDetail>;
  private reInitValue;
  onAttachmentsChange(newValue: FileItemType[]): void;
  onTextValueChange(value: string): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private setupSpeechRecognition;
  private startSpeechRecognition;
  private stopSpeechRecognition;
  private addExpandedListeners;
  private removeExpandedListeners;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private get _locales();
  private checkInteractedItem;
  private onExpandedKeyDown;
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
  private getPlaceholderText;
  private getMinimizedAriaLabel;
  private getMinimizedDescriptionText;
  private getTextareaLabel;
  private getActionsToolbarLabel;
  private getLeftActionsLabel;
  private getRightActionsLabel;
  private getSendButtonLabel;
  private getStopButtonLabel;
  private getAttachButtonLabel;
  private getActionsMenuButtonLabel;
  private getAudioRecordButtonLabel;
  private getAudioStopRecordButtonLabel;
  private actionsMenuDropdownConfig;
  private handleActionsMenuItemClick;
  private checkAttachmentsVisibility;
  private configureSelectSlot;
  private updateSlotData;
  private handleAlertSlotChange;
  private handleReferencesSlotChange;
  handleAlertClose(event: CustomEvent): void;
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
  private handleStop;
  private handlePaste;
  /**
   * Handles image file pasting from clipboard items.
   * Returns true if files were handled, false otherwise.
   */
  private handleFilePaste;
  private handleInput;
  private emitMessageChangedEvent;
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
  private onMinimizedKeyDown;
  private onMinimizedKeyUp;
  private onWindowFocus;
  private clearDialogState;
  private handleOnFocus;
  private handleClickAudioRecording;
  private shouldDisplaySend;
  private renderMicrophoneBtn;
  private renderActionsMenu;
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
