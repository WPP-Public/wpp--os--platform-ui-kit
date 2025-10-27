import { EventEmitter } from '../../../../stencil-public-runtime';
import { NavigationItemEventDetail } from '../../types';
export declare class WppNavigationItem {
  /**
   * Indicates navigation item label
   */
  readonly menuExpanded: boolean;
  /**
   * Indicates navigation item label
   */
  readonly label?: string;
  /**
   * Indicates navigation item value
   */
  readonly value: string;
  /**
   * Indicates navigation item path
   */
  readonly path?: string;
  /**
   * If `true`, the navigation item is nested item in list context, don't need to pass this prop, it pass automatically from Topbar component
   */
  readonly nestedItem: boolean;
  /**
   * If `true`, the component is active
   */
  readonly active: boolean;
  /**
   * If `true`, the component has only icon menu with nested items
   */
  readonly menu: boolean;
  /**
   * If `true`, the component has nested items
   */
  extended: boolean;
  /**
   * If `true`, the component will render only a chevron icon without label.
   */
  readonly chevronOnly: boolean;
  /**
   * If `true`, the navigation link will be have native behaviour `a` tag.
   * If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop
   * This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page
   */
  readonly nativeLink: boolean;
  /**
   * Emitted when navigation item was clicked
   */
  wppActiveNavItemChanged: EventEmitter<NavigationItemEventDetail>;
  private onClick;
  private navItemCssClasses;
  private hostCssClasses;
  private linkItem;
  private listItem;
  private menuItem;
  private extendedItem;
  private renderItem;
  render(): any;
}
