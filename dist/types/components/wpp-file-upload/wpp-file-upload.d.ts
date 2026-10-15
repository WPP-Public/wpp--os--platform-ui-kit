import { EventEmitter } from '../../stencil-public-runtime';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { FOCUS_TYPE, DropdownConfig } from '../../types/common';
import { FileItemType, FileUploadEventDetail, FileUploadResultFormaType, FileUploadLocales, ScrollState, FileUploadMessageType, FileUploadItemEventDetail, AcceptConfig, FileValidatorHandler, FileUploadErrorEventDetails, FileProcessorHandler, FileUploadProcessingEventDetail } from './types';
import { LabelConfig } from '../wpp-label/types';
interface FocusType {
  wrapper: FOCUS_TYPE;
  item: FOCUS_TYPE;
}
/**
 * @slot - Should contain label and description of file upload.
 *
 * @part list-wrapper - file list wrapper
 * @part file-list - file list element.
 * @part file-upload-container - file upload wrapper.
 * @part file-item - file item element
 * @part slot-label - slot label element
 * @part slot-description - slot label element
 * @part icon-file - icon file element
 * @part content - main content wrapper
 * @part label - label text element
 * @part text - main text element
 * @part text-info - text info wrapper element
 * @part input - input element
 * @part message - message element
 */
export declare class WppFileUpload implements BaseFormControl<FileItemType[], FileUploadEventDetail> {
  private inputRef?;
  private itemRefs;
  private inputId;
  private labelId;
  private ctaId;
  private hintId;
  private messageId;
  private lastKeyWasTab;
  private themeSubscription;
  private fileStatuses;
  private controllers;
  private hasWarnedAboutControlledProcessor;
  private isChangeFlushScheduled;
  private disconnectTimeout?;
  host: HTMLWppFileUploadElement;
  private hasTabFocus;
  scrollState: ScrollState | false;
  focusType: FocusType;
  isFileDrag: boolean;
  isLabelHovered: boolean;
  errorList: FileItemType[];
  successList: FileItemType[];
  /**
   * All files in the order they were added. Rendering from this rather than
   * from `[...successList, ...errorList]` keeps a file in place when it settles
   * to an error asynchronously.
   */
  orderedFiles: FileItemType[];
  isLimitReached: boolean;
  liveAnnouncement: string;
  private focusItemAfterDelete;
  /**
   * Defines the input name.
   */
  readonly name?: string;
  /**
   * Defines the files list
   */
  value: FileItemType[];
  /**
   * If `true`, the component is disabled
   */
  readonly disabled: boolean;
  /**
   * If `true`, the component can take multiple files
   */
  readonly multiple: boolean;
  /**
   * Represent what result format datepicker return, it can be base64, arrayBuffer, binaryString, by default it returns base64
   */
  readonly format: FileUploadResultFormaType;
  /**
   * Configuration for accepted file formats: an object whose key is a MIME type and whose value is
   * an array of file extensions.
   *
   * Example:
   * {
   *   'image/png': ['.png'],
   *   'text/html': ['.htm', '.html']
   * }
   *
   * A key may also be a wildcard family such as `image/*`, which accepts the whole family the way
   * the native `accept` attribute does:
   * {
   *   'image/*': []
   * }
   *
   * Entries are combined as a union - a file only has to satisfy one of them. A single entry is an
   * intersection: when it lists extensions, a file must match the entry's type AND carry one of
   * those extensions. An entry with an empty array puts no extension restriction on the type, so
   * it matches on the MIME type alone.
   *
   * Matching ignores casing. A file the browser reports with no type is typed from its extension
   * where possible, and otherwise matched against the extensions the configuration lists.
   *
   * To allow all file types, pass an empty object (`{}`) or leave the property undefined.
   */
  readonly acceptConfig: AcceptConfig;
  /**
   * Indicates file upload message type
   */
  readonly messageType?: FileUploadMessageType;
  /**
   * Indicates file upload message
   */
  readonly message?: string;
  /**
   * Indicates file upload message maximum length
   */
  readonly maxMessageLength?: number;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * The max size of file that user can download, by default it`s 50 MB
   */
  readonly size: number;
  /**
   * Indicates locales for file upload component
   */
  readonly locales: Partial<FileUploadLocales>;
  /**
   * Defines custom validation function. It must return null if there's no errors, and string in case of any error
   */
  readonly validator: FileValidatorHandler;
  /**
   * If `true`, the file upload works as controlled component.
   */
  readonly controlled: boolean;
  /**
   * Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted.
   */
  readonly maxFiles: number;
  /**
   * If the input is required.
   */
  readonly required: boolean;
  /**
   * Indicates label config
   */
  labelConfig?: LabelConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * If `true`, the new errors (from a new unsuccessful upload) will replace the already existing ones in the list
   * By default, the new errors will be added to the error list
   */
  readonly showOnlyNewErrors: boolean;
  /**
   * Asynchronous processing applied to each newly added file - typically a call
   * to your backend to upload, scan or validate it.
   *
   * While a processor runs the file is shown in the loading state. Resolve with
   * nothing to mark the file done, resolve `{ error }` to fail it with a
   * message, or reject to fail it using the error's `message`. Report progress
   * with `context.onProgress(0-100)` and honour `context.signal` so work is
   * cancelled when the file is removed.
   *
   * Pass an array to run several steps in sequence over the same file. They
   * share one abort signal and stop at the first one that fails.
   *
   * Ignored when `controlled` is `true` - a controlled consumer already owns
   * the file state and should drive `status`, `progress` and `processingError`
   * through `value` instead.
   */
  readonly processor?: FileProcessorHandler | FileProcessorHandler[];
  /**
   * Emitted when file downloads, returns only those files, that not have any error
   */
  readonly wppChange: EventEmitter<FileUploadEventDetail>;
  /**
   * Emitted when the input is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the input loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when the file-upload item was deleted.
   */
  readonly wppFileUploadItemDelete: EventEmitter<FileUploadItemEventDetail>;
  /**
   * Emitted when the file-upload item was clicked.
   */
  readonly wppFileUploadItemClick: EventEmitter<FileUploadItemEventDetail>;
  /**
   * Emitted when the file upload enters an error state. Triggered when the maximum number of files is exceeded.
   */
  readonly wppError: EventEmitter<FileUploadErrorEventDetails>;
  /**
   * Emitted when a file starts being processed by `processor`.
   */
  readonly wppFileProcessingStart: EventEmitter<FileUploadProcessingEventDetail>;
  /**
   * Emitted when a file finishes being processed by `processor`, successfully or not.
   */
  readonly wppFileProcessingEnd: EventEmitter<FileUploadProcessingEventDetail>;
  /**
   * Method to reset FileUpload. Should be called only when the component is uncontrolled.
   */
  reset(): Promise<void>;
  private clearInputValue;
  private reInitValue;
  /**
   * Keeps files in the order they were first seen and appends anything new,
   * so an async status change never reorders the list.
   */
  private buildOrderedFiles;
  private getFileStatus;
  /**
   * Announces only terminal transitions. Progress updates are intentionally not
   * announced - they are exposed on a progressbar instead, so a screen reader
   * is not flooded on every percent.
   */
  private announceSettledFiles;
  protected onDisabledChange(disabled: boolean): void;
  onValueChange(newValue: FileItemType[]): void;
  componentDidLoad(): void;
  componentDidRender(): void;
  private get _locales();
  connectedCallback(): void;
  disconnectedCallback(): void;
  private onGlobalKeyDown;
  private onPointerDown;
  private onInputFocus;
  private onInputBlur;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private getUpdatedFocusInfo;
  private handleDeleteItem;
  private handleClickItem;
  private validateFileSize;
  private customValidation;
  private isAcceptConfigFilled;
  private validateFileType;
  private isFileWithError;
  private generateUniqueName;
  private displayErrorListByShowingOption;
  private handleFileLoad;
  private getFileErrorText;
  private getProcessors;
  /**
   * A file already carrying a terminal status is passed through untouched, the
   * same convention the shared upload pipeline uses between its own stages.
   */
  private shouldProcessFile;
  private isFileStillPresent;
  /** Re-assigns the list so Stencil re-renders after a file object was mutated. */
  private refreshFiles;
  private abortFile;
  private abortAllFiles;
  private processFiles;
  private runProcessors;
  /**
   * Only the fields a processor is allowed to return are copied across. A real
   * `File` exposes name/size/type as getters, so assigning them would throw.
   */
  private applyProcessorResult;
  private getProcessingEventData;
  /**
   * Files that settle in the same tick produce a single `wppChange`, so a
   * consumer bound to `hasError` is not re-rendered once per file.
   */
  private scheduleChangeFlush;
  private handleDrop;
  private handleDragOver;
  private handleDragEnter;
  private handleDragLeave;
  private handleChange;
  private handleListScroll;
  private getAcceptTokens;
  private getAcceptLabels;
  private isMaximumFilesSet;
  private isMaximumFilesReached;
  private getMessageText;
  private uploadWrapperCssClasses;
  private listWrapperCssClasses;
  private hostCssClasses;
  render(): any;
}
export {};
