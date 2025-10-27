import { EventEmitter } from '../../stencil-public-runtime';
import { TreeActionClickEventDetail, TreeChangeEventDetail, TreeItemSearchConfig, TreeLocaleType, TreeType } from './types';
export declare class WppTree {
  host: HTMLWppTreeElement;
  currentTreeData: TreeType[];
  selectedIds: (TreeType | null | string | number)[];
  private resizeObserver;
  private resizeInProgress;
  private _locales;
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
   * Emitted when tree have changed it's state
   */
  wppChange: EventEmitter<TreeChangeEventDetail>;
  /**
   * Emitted when click on item actions(icons) was occurred
   */
  wppActionClick: EventEmitter<TreeActionClickEventDetail>;
  onInputChange(searchText: string): void;
  updateDate(newData: TreeType[]): void;
  onUpdateLocales(newLocales: Partial<TreeLocaleType>): void;
  handleOpenItem(event: CustomEvent<TreeType>): void;
  handleSelectedItem(event: CustomEvent<TreeType>): void;
  recalculateTreeWidth(): Promise<void>;
  selectAll(): Promise<void>;
  clearAll(): Promise<void>;
  private toggleItemSelection;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private isSearchResultFound;
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
  private renderSkeletonLoading;
  render(): any;
}
