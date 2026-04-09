import { EventEmitter } from '../../stencil-public-runtime';
import { NavSidebarItemEventDetail } from './types';
/**
 * @slot - May contain only the `wpp-nav-sidebar-item` component. The default slot, without the name attribute.
 *
 * @part nav-sidebar - Sidebar navigation wrapper
 * @part body - Main content wrapper
 */
export declare class WppNavSidebar {
  host: HTMLWppNavSidebarElement;
  /**
   * Defines the current active path. Input any valid path that matches the `path` property of the sidebar items. Invalid values will have no effect and will not change the active item.
   * @remarks Use this property to programmatically set the active item in the navigation sidebar.
   */
  readonly activePath?: string;
  /**
   * If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected.
   */
  readonly nativeLink: boolean;
  /**
   * Defines the z-index of the WppNavSidebar.
   */
  readonly zIndex: number;
  /**
   * Emitted when app routes change, return object like { path: '/home', label: 'Home' }
   */
  wppChange: EventEmitter<NavSidebarItemEventDetail>;
  handleActivePathChange(newValue: string): void;
  handleItemClick(event: CustomEvent<NavSidebarItemEventDetail>): void;
  handleExpandedClick(event: CustomEvent<NavSidebarItemEventDetail>): void;
  componentWillLoad(): void;
  private calculateOsBarHeight;
  private closeExpandedItemOnItemClick;
  private closeInactiveExpandedItem;
  private setActiveItem;
  private asideCssClasses;
  private hostCssClasses;
  render(): any;
}
