import { EventEmitter } from '../../../../stencil-public-runtime';
import { PaginationPageChangeEventDetail } from '../../types';
import { FOCUS_TYPE } from '../../../../types/common';
interface FocusType {
  'left-chevron': FOCUS_TYPE;
  'right-chevron': FOCUS_TYPE;
  input: FOCUS_TYPE;
}
/**
 * @part input - Pagination input element
 * @part icon-left - icon left element
 * @part page-select - page select wrapper element
 * @part page-item - page item element
 * @part page-numeric - page numeric wrapper element
 * @part divider - divider element
 * @part total - total text element
 * @part icon-right - icon right element
 */
export declare class WppPaginationSelect {
  focusType: FocusType;
  /**
   * Defines the total number of items.
   */
  readonly count: number;
  /**
   * Defines a threshold for pages to display. When the number of pages to display exceeds this value, the component displays a numeric selector instead of the page list.
   */
  readonly pageSelectThreshold: number;
  /**
   * Defines the active page number.
   */
  activePageNumber: number;
  /**
   * Emitted active page number
   */
  wppChange: EventEmitter<PaginationPageChangeEventDetail>;
  private getPageItems;
  private getUpdatedFocusInfo;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private handlePageNumberChange;
  private handlePageClick;
  private handleLeftArrowClick;
  private handleRightArrowClick;
  private leftArrowCssClasses;
  private rightArrowCssClasses;
  private hostCssClasses;
  render(): any;
}
export {};
