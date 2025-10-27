import { EventEmitter } from '../../../../stencil-public-runtime';
import { NavSidebarItemEventDetail } from '../../types';
/**
 * @slot icon-start - May contain an icon that will be placed before the main content, e.g. a plus icon
 * @slot icon-end - May contain an icon that will be placed after the main content, e.g. a plus icon
 * @slot - Should contain `wpp-navigation-sidebar-item` if first level item need to have sub items. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part icon-chevron - icon chevron element
 * @part extended-item - extended item element
 * @part link-item - link item element
 * @part tooltip - tooltip wrapper content
 * @part title - title text element
 * @part divider - divider element
 */
export declare class WppNavSidebarItem {
  host: HTMLWppNavSidebarItemElement;
  hasIconStartSlot: boolean;
  /**
   * If `true`, navigation item expanded
   */
  expanded: boolean;
  /**
   * If `true`, navigation item should have sub items
   */
  readonly extended: boolean;
  /**
   * Indicates max title length for item with sub items
   */
  readonly maxTitleLengthWithSubItems: number;
  /**
   * Indicates max title length for item without sub items
   */
  readonly maxTitleLengthWithoutSubItems: number;
  /**
   * Indicates navigation item label
   */
  readonly label: string;
  /**
   * Indicates navigation item path
   */
  readonly path: string;
  /**
   * Indicates navigation item group title
   */
  readonly groupTitle: string;
  /**
   * Indicates navigation item is sub items, this prop don't need to pass in item, it pass automaticly from Navigation sidebar component
   */
  readonly nestedItem: boolean;
  /**
   * If `true`, show divide line in item
   */
  readonly divide: boolean;
  /**
   * If `true`, item active
   */
  readonly active: boolean;
  /**
   * If `true`, the navigation link will be have native behaviour `a` tag.
   * If app using `client side render` you need to leave `nativeLink` false, if `server side render`, then better to use this prop
   * This is not dynamic prop, so in Storybook when change value of this prop, need you to refresh the page
   */
  readonly nativeLink: boolean;
  /**
   * Specifies where to open the linked document.
   * Allows all valid values for the native "target" attribute: _self, _blank, _parent, _top, etc.
   *
   * _self: The current browsing context. (Default)
   * _blank: Usually a new tab, but users can configure browsers to open a new window instead.
   * _parent: The parent browsing context of the current one. If no parent, behaves as _self.
   * _top: The topmost browsing context. To be specific, this means the "highest" context that's an ancestor of the current one. If no ancestors, behaves as _self.
   */
  readonly target?: string;
  /**
   * Emitted when the item path changes, return object like { path: '/home', label: 'Home' }
   */
  wppClickSidebarItem: EventEmitter<NavSidebarItemEventDetail>;
  /** @internal */
  wppClickExpandedItem: EventEmitter<NavSidebarItemEventDetail>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  handleExpandedChange(newValue: boolean): void;
  private updateSlotData;
  private handleClickLinkItem;
  private handleClickExpandedItem;
  private navigationWrapperCssClasses;
  private labelCssClasses;
  private iconEndCssClasses;
  private subItemWrapperCssClasses;
  private hostCssClasses;
  private item;
  private extendedItem;
  private linkItem;
  private renderSubItemsWrapper;
  private renderItemWithTooltip;
  private renderItem;
  render(): any;
}
