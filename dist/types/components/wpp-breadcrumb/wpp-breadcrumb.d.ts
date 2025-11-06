import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { BreadcrumbItemState, BreadcrumbItemEventDetails } from './types';
/**
 * @part item-text - item text element
 * @part item-tooltip - item tooltip element
 * @part menu - menu context element
 * @part menu-item - menu item element
 * @part menu-item-label - menu item label text element
 * @part icon-more - icon more element
 * @part slash - slash element
 */
export declare class WppBreadcrumb {
  private readonly maxItems;
  host: HTMLWppBreadcrumbElement;
  /**
   * Defines an array of breadcrumb items.
   */
  readonly items: BreadcrumbItemState[];
  /**
   * Defines the maximum label length (in characters) of a single item.
   */
  readonly maxLabelLength: number;
  /**
   * If the alternative truncation mode is enabled (items are truncated evenly with an ellipsis in the middle of the title).
   */
  readonly middleTruncation: boolean;
  /**
   * If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected.
   */
  readonly nativeLink: boolean;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * Emitted when route changes, return object like { path: '/home', label: 'Home' }
   */
  readonly wppChange: EventEmitter<BreadcrumbItemEventDetails>;
  private get rootItem();
  private get hiddenItems();
  private get visibleItems();
  private get hiddenItemsSnapshot();
  private createRouteChangeTrigger;
  private createItemElement;
  private createMenuElement;
  private hostCssClasses;
  render(): any;
}
