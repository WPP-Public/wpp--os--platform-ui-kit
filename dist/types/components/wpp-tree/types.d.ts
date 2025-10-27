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
export interface TreeLocaleType {
  nothingFound: string;
}
export type TransformSearchQuery = (search: string) => string;
export interface TreeItemSearchConfig {
  /**
   * @deprecated Use `isMatchingSearch` instead.
   * Indicates whether the search query matches.
   */
  isMatchSearch?: (title: string, search: string) => boolean;
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
   * Use this instead of "isMatchSearch".
   * This function is passing the tree item such that more advanced searches can be done.
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
