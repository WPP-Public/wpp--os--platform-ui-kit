import { EventEmitter } from '../../../stencil-public-runtime';
import { FOCUS_TYPE } from '../../../types/common';
import { FileItemType, FileUploadItemEventDetail, FileUploadResultFormaType, FileUploadItemLocales } from '../types';
/**
 * @part file-item - file item wrapper.
 * @part wrapper - component wrapper element
 * @part content - content wrapper element
 * @part file-name - file name text element
 * @part tooltip - tooltip wrapper content
 * @part loading - loading text element
 * @part percentage - percentage text element
 * @part cross-icon - cross icon element
 */
export declare class WppFileUploadItem {
  private _locales;
  private fileNameRef?;
  private tooltipRef?;
  private measureRef?;
  private loadingRef?;
  private observer;
  private pendingTruncation;
  private isTruncated;
  private readonly ELLIPSIS;
  private readonly MIN_WIDTH_THRESHOLD;
  host: HTMLWppFileUploadItemElement;
  thumbnailUrl: string | null;
  percentage: number;
  total: number;
  loaded: number;
  isLoadingFinished: boolean;
  measurementUnit: string;
  isPressed: boolean;
  focusType: FOCUS_TYPE;
  fileName: string;
  /**
   * Current file
   */
  file: FileItemType;
  /**
   * Represent what result format datepicker return, it can be base64, arrayBuffer, binaryString, by default it returns base64
   */
  readonly format: FileUploadResultFormaType;
  /**
   * Maximum label length (in characters) of single loading item
   *
   * @deprecated - this prop will be removed in 4.0.0 version. Truncation will be calculated based on available space.
   */
  readonly maxLabelLength?: number;
  /**
   * Represent current index in files list
   */
  readonly currentIndex: number;
  /**
   * Indicates locales for file upload component
   */
  readonly locales: FileUploadItemLocales;
  /**
   * Indicates if the file has been uploaded.
   *
   * @internal - This prop is controlled by wpp-chat-input
   */
  readonly uploaded?: boolean;
  /**
   * When true, this item inherits the parent uploader’s disabled state.
   * Interactive controls inside the item (e.g., the delete icon) must be non-interactive:
   * - removed from the tab order (tabindex = -1)
   * - marked as aria-disabled="true"
   * - click/keyboard handlers should no-op
   */
  readonly parentDisabled?: boolean;
  /** @internal */
  wppDelete: EventEmitter<FileUploadItemEventDetail>;
  /** @internal */
  wppClick: EventEmitter<FileUploadItemEventDetail>;
  /** @internal */
  fileLoaded: EventEmitter<{
    name: string;
    size: number;
  }>;
  onUpdateLocales(newLocales: Partial<FileUploadItemLocales>): void;
  private convertToAppropriateFormat;
  private setReaderFormat;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private scheduleTruncate;
  private truncateFileName;
  private computeAvailableWidth;
  private measure;
  private findLargestNumberOfCharacters;
  private updateFileNameAndMarkComputed;
  private handleFileReading;
  private generateThumbnail;
  private isFileLoading;
  private setCurrentIcon;
  private getErrorMessage;
  private isFileWithError;
  private setCurrentError;
  private getEventData;
  private handleCloseClick;
  private handleDeleteKeyDown;
  private handleDeleteKeyUp;
  private handleDeleteBlur;
  private handleClick;
  private blockCssClasses;
  private fileNameCssClasses;
  private hostCssClasses;
  private itemCssClasses;
  private crossIconClasses;
  render(): any;
}
