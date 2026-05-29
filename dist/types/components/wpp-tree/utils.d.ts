import { TreeType } from './types';
export declare const areAllChildrenSelected: (treeData: TreeType[]) => boolean;
export declare const areAnyChildrenSelected: (treeData: TreeType[]) => boolean;
export declare const areAnyChildrenDisabled: (treeData: TreeType[]) => boolean;
export declare const findTreeItemById: (treeData: TreeType[], id: string) => TreeType | undefined;
export declare const updateTreeById: (tree: TreeType[], id: string | number | (string | number)[], newItem: any) => TreeType[];
export declare const updateTreeByIds: (tree: TreeType[], idsList: (string | number)[], newItemParamsCb: (item: Partial<TreeType>) => Partial<TreeType>, passedCheckOnParent?: boolean) => TreeType[];
export declare const findSelectedItems: (tree: TreeType[]) => (TreeType | null)[];
export declare const convertToOriginalItems: (treeArr: (TreeType | null)[]) => any[];
export declare const markChildrenAs: (tree: TreeType[], treeItemCb: (item: TreeType) => Partial<TreeType>) => TreeType[];
export declare const isHaveFoundChildren: (tree: TreeType[], search: string, matcherFn: (item: TreeType, search: string) => boolean) => boolean;
export declare const recalculateIndeterminateTreeState: (treeData: TreeType[]) => TreeType[];
export declare const extractExtraProps: (tree: TreeType) => Record<string, any>;
/**
 * Get all visible (not hidden, and parent is open) items in a flat list for keyboard navigation
 */
export declare const getAllVisibleItems: (tree: TreeType[]) => TreeType[];
/**
 * Find an item by ID in the tree
 */
export declare const findItemById: (tree: TreeType[], id: string | number) => TreeType | undefined;
/**
 * Find the parent of an item by its ID
 */
export declare const findParentOfItem: (tree: TreeType[], targetId: string | number, parent?: TreeType | null) => TreeType | null;
/**
 * Get siblings of an item
 */
export declare const getSiblings: (tree: TreeType[], targetId: string | number) => TreeType[];
/**
 * Calculate aria-setsize and aria-posinset for an item
 */
export declare const getPositionInfo: (tree: TreeType[], targetId: string | number) => {
  setSize: number;
  posInSet: number;
} | null;
