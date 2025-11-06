import { EventEmitter } from '../../../stencil-public-runtime';
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
  thumbnailUrl: string | null;
  percentage: number;
  total: number;
  loaded: number;
  isLoadingFinished: boolean;
  measurementUnit: string;
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
   */
  readonly maxLabelLength: number;
  /**
   * Represent current index in files list
   */
  readonly currentIndex: number;
  /**
   * Indicates locales for file upload component
   */
  readonly locales: FileUploadItemLocales;
  /** @internal */
  wppDelete: EventEmitter<FileUploadItemEventDetail>;
  /** @internal */
  wppClick: EventEmitter<FileUploadItemEventDetail>;
  private convertToAppropriateFormat;
  private setReaderFormat;
  componentWillLoad(): void;
  private handleFileReading;
  private generateThumbnail;
  private isFileLoading;
  private setCurrentIcon;
  private getErrorMessage;
  private isFileWithError;
  private setCurrentError;
  private getEventData;
  private handleCloseClick;
  private handleClick;
  private blockCssClasses;
  private fileNameCssClasses;
  private hostCssClasses;
  private itemCssClasses;
  render(): any;
}
