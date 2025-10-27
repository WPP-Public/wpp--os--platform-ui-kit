import { EventEmitter } from '../../../../stencil-public-runtime';
import { NavigationItemEventDetail, NavigationState } from '../../types';
export declare class WppTopbarItem {
  isMenuExpanded: boolean;
  /**
   * Indicates navigation items
   */
  readonly navigation: NavigationState;
  /**
   * If `true`, the component placed on the first level of topbar
   */
  readonly firstLevel: boolean;
  /**
   * If `true`, the component has menu icon
   */
  readonly menu: boolean;
  /**
   * If `true`, the component is active
   */
  readonly active: boolean;
  /**
   * Indicates list of values of the items that are active, where each value represents particular navigation item
   */
  activeItems: string[];
  /**
   * If `true`, the navigation link will be have native behaviour `a` tag.
   * If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop
   * This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page
   */
  readonly nativeLink: boolean;
  /**
   * Emitted when topbar item was changed
   */
  wppActiveTopbarItemChange: EventEmitter<NavigationItemEventDetail>;
  private getEmittedNavigationData;
  private topbarItemClick;
  private menuItemClick;
  private getMenuLevelData;
  private hostCssClasses;
  render(): any;
}
