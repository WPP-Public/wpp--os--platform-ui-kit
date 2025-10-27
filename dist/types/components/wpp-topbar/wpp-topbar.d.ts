import { EventEmitter } from '../../stencil-public-runtime';
import { NavigationState, TopbarChangeEventDetail } from './types';
/**
 * @slot app - May contain descriptive app data (e.g., icon, name, and so on)
 *
 * @part wrapper - Wrapper element
 * @part navigation - Navigation items
 * @part body - Main content wrapper
 * @part topbar-item - topbar item wrapper element
 * @part divider - divider element
 */
export declare class WppTopbar {
  private resizeObserver;
  host: HTMLWppTopbarElement;
  truncated: boolean;
  itemsToShow: number;
  hasAppSlot: boolean;
  hasRightSlot: boolean;
  activeItems: string[];
  topbarItemsWidth: number[];
  /**
   * Defines the navigation items, e.g. `navigation=[{ label: 'Home', value: 'home' }]`
   */
  readonly navigation: NavigationState[];
  /**
   * Defines the initially active topbar item.
   */
  readonly value: string;
  /**
   * If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected.
   */
  readonly nativeLink: boolean;
  /**
   * Defines the z-index of the WppTopbar.
   */
  readonly zIndex: number;
  /**
   * Emitted when topbar item was changed, return object like { value: 'home', path: '/home', label: 'Home' }
   */
  wppChange: EventEmitter<TopbarChangeEventDetail>;
  navigationChanged(newNavigation: NavigationState[]): void;
  valueChanged(newValue: string): void;
  private getItemsWidth;
  private findInTree;
  private getDisplayData;
  private topbarItemClick;
  private updateSlotData;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private wrapperCssClasses;
  private headerCssClasses;
  private navigationCssClasses;
  private hostCssClasses;
  render(): any;
}
