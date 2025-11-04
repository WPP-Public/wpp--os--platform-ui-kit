import { EventEmitter } from '../../stencil-public-runtime';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { FOCUS_TYPE, DropdownConfig } from '../../types/common';
import { FileItemType, FileUploadEventDetail, FileUploadResultFormaType, FileUploadLocales, ScrollState, FileUploadMessageType, FileUploadItemEventDetail, AcceptConfig, FileValidatorHandler, FileUploadErrorEventDetails } from './types';
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
  private _locales;
  private inputId;
  private labelId;
  private lastKeyWasTab;
  host: HTMLWppFileUploadElement;
  private hasTabFocus;
  scrollState: ScrollState | false;
  focusType: FocusType;
  isFileDrag: boolean;
  errorList: FileItemType[];
  successList: FileItemType[];
  isLimitReached: boolean;
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
   * Accept file format, you can pass any format you want download, by default is `.jpg, .jpeg, .png`
   *
   * @deprecated - this prop will be deleted in 4.0.0 version as it is not flexible enough to handle different
   * cases with files validations, for example based on mimetype and extension at the same time.
   * This property handle only a few extensions: ['.jpg', '.jpeg', '.png', '.txt', '.text', '.doc', '.docx', '.mov'],
   * and list will NOT be extended.
   *
   * If you want to use this prop, use "acceptConfig" property instead.
   * Note: "acceptConfig" property will have a higher priority in case if both "acceptConfig" and "accept" props will be provided
   */
  readonly accept: string[];
  /**
   * Configuration for accepted file formats. This property allows you to specify supported file types
   * using an object where the key is the MIME type and the value is an array of file extensions.
   *
   * Example:
   * {
   *   'image/png': ['.png'],
   *   'text/html': ['.htm', '.html']
   * }
   *
   * To allow all file types, pass an empty object (`{}`) or leave the property undefined.
   *
   * Note: This property offers greater flexibility compared to the deprecated `accept` property,
   * allowing validation based on MIME types and extensions simultaneously.
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
   * Maximum label length (in characters) of single item
   *
   * @deprecated - this prop will be removed in 4.0.0 version. Truncation will be calculated based on available space.
   */
  readonly maxLabelLength?: number;
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
   * Method to reset FileUpload
   */
  reset(): Promise<void>;
  private reInitValue;
  protected onDisabledChange(disabled: boolean): void;
  onValueChange(newValue: FileItemType[]): void;
  onUpdateLocales(newLocales: Partial<FileUploadLocales>): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
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
  private handleDrop;
  private handleDragOver;
  private handleDragEnter;
  private handleDragLeave;
  private handleChange;
  private handleListScroll;
  private getAcceptExtensions;
  private isMaximumFilesSet;
  private isMaximumFilesReached;
  private getMessageText;
  private uploadWrapperCssClasses;
  private listWrapperCssClasses;
  private hostCssClasses;
  render(): any;
}
export {};
