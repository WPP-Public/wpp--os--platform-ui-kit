import { EventEmitter } from '../../../../stencil-public-runtime';
import { FOCUS_TYPE } from '../../../../types/common';
import { PaginationPageChangeEventDetail } from '../../types';
/**
 * @part number - number text element
 */
export declare class WppPaginationItem {
  private themeSubscription;
  host: HTMLWppPaginationItemElement;
  focusType: FOCUS_TYPE;
  /**
   * Indicates current page number
   */
  readonly number: number;
  /**
   * If `true`, the component is selected
   */
  readonly selected: boolean;
  /**
   * Emitted active page number
   */
  wppPageChange: EventEmitter<PaginationPageChangeEventDetail>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private handleClick;
  private hostCssClasses;
  render(): any;
}
