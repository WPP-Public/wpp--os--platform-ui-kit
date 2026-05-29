export interface TreeItemIconsType {
  icon: string;
  name: string;
}
export type TreeItemEndContentType = 'avatar' | 'avatarGroup' | 'tag' | 'text';
export interface TreeItemEndContentProps {
  contentType: TreeItemEndContentType;
  props?: any;
}
export interface TreeType {
  title: string;
  search?: string;
  id: number | string;
  children?: TreeType[];
  hasChildren?: boolean;
  loadingChildren?: boolean;
  selected?: boolean;
  isNotSelectable?: boolean;
  loadingActions?: boolean;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  iconStart?: TreeItemIconsType;
  iconEnd?: TreeItemIconsType;
  iconsStart?: TreeItemIconsType[];
  iconsEnd?: TreeItemIconsType[];
  hidden?: boolean;
  open?: boolean;
  endContent?: TreeItemEndContentProps;
  [key: string]: any;
}
export interface SkeletonProps {
  variant?: 'rectangle' | 'circle';
  width?: string | number;
  height?: string | number;
  /** Number of skeleton rows to show while loading children */
  count?: number;
}
/**
 * Response from the loadChildren function.
 * Returns all children for a node at once.
 */
export interface TreeLoadChildrenResponse {
  items: TreeType[];
}
/**
 * Configuration for lazy loading tree nodes.
 *
 * When a node with `hasChildren: true` is expanded:
 * 1. Skeleton loading indicators are shown
 * 2. `loadChildren` is called to fetch the children
 * 3. All children are rendered at once when the data arrives
 *
 * Note: This is NOT for infinite scroll/pagination.
 * Tree is meant for structured navigation, not large datasets.
 * If you have 100s of items, use autocomplete with backend search instead.
 */
export interface TreeLazyConfig {
  /**
   * Async function to load children for a node.
   * Called when a node with `hasChildren: true` is expanded.
   * Should return all children at once.
   */
  loadChildren: (item: TreeType) => Promise<TreeLoadChildrenResponse>;
  /**
   * Skeleton configuration for loading state.
   * Shows skeleton rows while children are being fetched.
   */
  skeleton?: SkeletonProps;
}
export interface TreeLocaleType {
  nothingFound: string;
  loadingTree: string;
}
export type TransformSearchQuery = (search: string) => string;
export interface TreeItemSearchConfig {
  /**
   * Options for highlighting matched items.
   */
  highlightOptions?: TreeItemHighlightOptions;
  /**
   * A function to transform the search query before processing.
   */
  transformSearchQuery?: TransformSearchQuery;
  /**
   * A function to determine whether the search query matches.
   * This function receives the tree item such that more advanced searches can be done.
   */
  isMatchingSearch?: (item: TreeType, search: string) => boolean;
}
export interface TreeItemHighlightOptions {
  clipBy?: number;
  matchExactly?: boolean;
}
export type TreeChangeEventDetail = {
  treeState: TreeType[];
  currentItem?: TreeType;
  selectedItems?: (TreeType | null)[];
  selectedOriginalItems?: Partial<TreeType>[];
  reason: 'open' | 'select' | 'search' | 'clear';
};
export type TreeActionClickEventDetail = {
  id: string | number;
  name: string;
  item: TreeType;
  place: 'start' | 'end';
};
