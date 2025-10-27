import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { PaginationChangeEventDetail, PaginationLocales } from './types';
/**
 * @part body - Main content wrapper
 * @part per-page-label - per-page label text element
 * @part pre-page-select - per-page select element
 * @part per-page-item - per-page item element
 * @part divider - divider element
 * @part range - pagination range text element
 * @part page-select - page select element
 */
export declare class WppPagination {
  private _locales;
  /**
   * Defines the total number of items.
   */
  readonly count: number;
  /**
   * Defines the menu items.
   */
  readonly itemsPerPage: number[];
  /**
   * Defines a menu item that serves as the initial value.
   */
  selectedItemPerPage?: number;
  /**
   * Defines a threshold for pages to display. When the number of pages to display exceeds this value, the component displays a numeric selector instead of the page list.
   */
  readonly pageSelectThreshold: number;
  /**
   * Defines the active page number.
   */
  activePageNumber: number;
  /**
   * Dropdown config, under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly dropdownConfig: DropdownConfig;
  /**
   * Indicates locales for pagination component
   */
  readonly locales: Partial<PaginationLocales>;
  /**
   * Emitted when selected page or number of items per page changes
   */
  wppChange: EventEmitter<PaginationChangeEventDetail>;
  onUpdateLocales(newLocales: Partial<PaginationLocales>): void;
  componentWillLoad(): void;
  private handleItemsPerPageNumberChange;
  private handleSelectedPageChange;
  private getPageRange;
  private hostCssClasses;
  render(): any;
}
