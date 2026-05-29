import { EventEmitter } from '../../stencil-public-runtime';
import { TreeActionClickEventDetail, TreeChangeEventDetail, TreeItemSearchConfig, TreeLazyConfig, TreeLocaleType, TreeType } from './types';
export declare class WppTree {
  host: HTMLWppTreeElement;
  currentTreeData: TreeType[];
  selectedIds: (TreeType | null | string | number)[];
  focusedItemId: string | number | null;
  isKeyboardNavigating: boolean;
  /**
   * Tracks whether focus is currently on an internal action element within a tree item.
   * When true, Tab navigation follows W3C APG pattern for actionable content.
   * Per W3C ARIA APG Treeview: Tab moves into actions, arrow keys still navigate tree items.
   */
  isFocusOnAction: boolean;
  private resizeObserver;
  private resizeInProgress;
  private _locales;
  private pendingLoads;
  private isSearchResultFound;
  private isMouseInteraction;
  /**
   * Defines the tree data.
   */
  readonly data: TreeType[];
  /**
   * Indicates search value
   */
  readonly search?: string;
  /**
   * If several items could be selected.
   */
  readonly multiple: boolean;
  /**
   * Default selected ids list
   */
  readonly defaultSelectedIds: (string | number)[];
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<TreeLocaleType>;
  /**
   * Defines the component locale types.
   */
  readonly searchConfig: TreeItemSearchConfig;
  /**
   * Defines words highlight in tree-item's title after search.
   */
  readonly disableSearchHighlight: boolean;
  /**
   *  Defines animation for open/close wpp-tree-item.
   */
  readonly disableOpenCloseAnimation: boolean;
  /**
   * Defines truncation for wpp-tree-item
   */
  readonly withItemsTruncation: boolean;
  /**
   * Defines loading state
   */
  readonly loading?: boolean;
  /**
   * Accessible label for the tree component.
   * Provides a name for the tree that assistive technologies can announce.
   */
  readonly label?: string;
  /**
   * Defines number of loading skeleton items
   */
  readonly skeletonNumberItems?: number;
  /**
   * Lazy loading configuration for dynamically loading children.
   * When a node with `hasChildren: true` is expanded, skeleton loaders
   * are shown while children are fetched, then all children render at once.
   */
  readonly lazyConfig?: TreeLazyConfig;
  /**
   * Emitted when tree have changed it's state
   */
  wppChange: EventEmitter<TreeChangeEventDetail>;
  /**
   * Emitted when click on item actions(icons) was occurred
   */
  wppActionClick: EventEmitter<TreeActionClickEventDetail>;
  private renderSkeletonRows;
  onInputChange(searchText: string): void;
  updateDate(newData: TreeType[]): void;
  onUpdateLocales(newLocales: Partial<TreeLocaleType>): void;
  handleOpenItem(event: CustomEvent<TreeType>): Promise<void>;
  handleKeyDown(event: KeyboardEvent): void;
  private focusTreeItem;
  /**
   * Enters action mode for the given tree item.
   * Focuses the first actionable element (button, menu trigger, etc.) within the item.
   * Uses `setFocus()` on wpp-action-button to ensure the visible focus ring (tab-focus class).
   */
  private enterActionMode;
  /**
   * Focuses the first available action element, using the appropriate focus method.
   * Resolves action components to their focusable DOM elements via getFocusableElements,
   * then delegates to focusActionElement for the correct focus strategy.
   */
  private focusFirstAvailable;
  /**
   * Exits action mode and returns focus to the tree container.
   */
  private exitActionMode;
  /**
   * Activates the current action element in action mode (Enter/Space).
   * Dispatches a click on the correct trigger element:
   * - For iconsEnd (wpp-menu-context): clicks the trigger-element slot to open the dropdown.
   * - For simple iconEnd: clicks the icon element to fire wppActionClick.
   */
  private activateCurrentAction;
  /**
   * Focuses a resolved focusable element using the correct strategy:
   * - If the element is the inner <button> of a wpp-action-button (detected via
   *   getRootNode()), calls setFocus() on the action-button host for proper focus ring.
   * - Otherwise, calls .focus() + synthetic keyup Tab to trigger the component's
   *   built-in tab-focus CSS class (wpp-avatar, menu triggers, etc.).
   */
  private focusActionElement;
  /**
   * Collects actionable elements within a tree item.
   *
   * Uses `transformToVersionedTag` for tag selectors because component names
   * include version suffixes at runtime (e.g. `wpp-action-button-v3-4-0`).
   *
   * Returns:
   * - The `wpp-action-button` (wraps icon-end / iconsEnd content) if visible
   * - Any `wpp-menu-context` elements from the icon-start slot (separate from action-button)
   */
  private getActionElementsInItem;
  /**
   * Resolves each action component to the actual focusable DOM element.
   *
   * - wpp-action-button: returns the inner <button> (tabindex=-1, programmatically focusable).
   * - wpp-menu-context (scoped, no shadow DOM): returns the trigger element's inner button.
   */
  private getFocusableElements;
  /**
   * Checks whether all selectable (non-disabled, non-isNotSelectable) leaf descendants
   * are already selected. Used to determine the correct toggle direction when a parent
   * is in indeterminate state due to disabled children that can't be toggled.
   */
  private areAllSelectableChildrenSelected;
  /**
   * Checks whether the given element is currently focused (or its host is the active element).
   * Accounts for shadow DOM boundaries where activeElement is the host, not the inner element.
   */
  private isElementFocused;
  handleMouseDown(): void;
  handleSelectedItem(event: CustomEvent<TreeType>): void;
  recalculateTreeWidth(): Promise<void>;
  selectAll(): Promise<void>;
  clearAll(): Promise<void>;
  private markAllOpen;
  private markAllClosed;
  /**
   * Expands all tree nodes.
   * Disabled nodes and their descendants are skipped and remain unchanged.
   * If lazy loading is configured, children for open nodes with `hasChildren: true` will be preloaded.
   * Emits a `wppChange` event with the updated tree state.
   */
  expandAll(): Promise<void>;
  /**
   * Collapses all tree nodes.
   * Disabled nodes and their descendants are skipped and remain unchanged.
   * Emits a `wppChange` event with the updated tree state.
   */
  collapseAll(): Promise<void>;
  /**
   * Preloads children for all open nodes that require lazy loading.
   * Called on initial load, data updates, and after expandAll().
   * Only operates if `lazyConfig.loadChildren` is configured.
   * Emits `wppChange` events as children are loaded.
   */
  private preloadInitialOpenChildren;
  private toggleItemSelection;
  private clearSelectionExcept;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /**
   * Handle document-level mousedown to clear focus ring when clicking outside the tree
   */
  private handleDocumentMouseDown;
  private isMatchSearch;
  private multipleSelectionUpdate;
  private singleSelectionUpdate;
  private updateTreeWithSearch;
  private handleActionClick;
  private checkData;
  componentWillLoad(): void;
  private hostCssClasses;
  private renderIconsList;
  private renderTree;
  private handleContainerFocus;
  private handleContainerBlur;
  /**
   * Traverses upward through shadow DOM boundaries to determine
   * whether an element lives within this component's host.
   */
  private isDescendantOfHost;
  private getActiveDescendantId;
  render(): any;
}
