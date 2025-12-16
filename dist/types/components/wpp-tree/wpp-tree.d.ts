import { EventEmitter } from '../../stencil-public-runtime';
import { TreeActionClickEventDetail, TreeChangeEventDetail, TreeItemSearchConfig, TreeLazyConfig, TreeLocaleType, TreeType } from './types';
export declare class WppTree {
  host: HTMLWppTreeElement;
  currentTreeData: TreeType[];
  selectedIds: (TreeType | null | string | number)[];
  private resizeObserver;
  private resizeInProgress;
  private _locales;
  private pendingLoads;
  private isSearchResultFound;
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
   * Note: "isMatchSearch" is deprecated, use "isMatchingSearch" instead, which uses
   * the tree-item object.
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
  handleSelectedItem(event: CustomEvent<TreeType>): void;
  recalculateTreeWidth(): Promise<void>;
  selectAll(): Promise<void>;
  clearAll(): Promise<void>;
  private toggleItemSelection;
  private clearSelectionExcept;
  componentDidLoad(): void;
  disconnectedCallback(): void;
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
  render(): any;
}
