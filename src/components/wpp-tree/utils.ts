import { KNOWN_KEYS_OF_TREE_TYPE } from './const'
import { TreeType } from './types'

export const areAllChildrenSelected = (treeData: TreeType[]): boolean =>
  treeData.every(item => {
    if (item.children) {
      return areAllChildrenSelected(item.children)
    } else {
      return !!item.selected
    }
  })

export const areAnyChildrenSelected = (treeData: TreeType[]): boolean =>
  treeData.some(item => {
    if (item.children) {
      return areAnyChildrenSelected(item.children)
    } else {
      return !!item.selected || !!item.indeterminate
    }
  })

export const areAnyChildrenDisabled = (treeData: TreeType[]): boolean =>
  treeData.some(item => {
    if (item.children && !item.disabled) {
      return areAnyChildrenDisabled(item.children)
    } else {
      return !!item.disabled
    }
  })

export const findTreeItemById = (treeData: TreeType[], id: string): TreeType | undefined =>
  treeData.find(item => {
    if (item.id !== id && item.children?.length) {
      return findTreeItemById(item.children as TreeType[], id)
    }

    return item
  })

export const updateTreeById = (tree: TreeType[], id: string | number | (string | number)[], newItem: any): TreeType[] =>
  tree.map(item => {
    if (item.id !== id) {
      if (item.children?.length) {
        return { ...item, children: updateTreeById(item.children, id, newItem) }
      }

      return item
    }

    return { ...item, ...newItem }
  })

export const updateTreeByIds = (
  tree: TreeType[],
  idsList: (string | number)[],
  newItemParamsCb: (item: Partial<TreeType>) => Partial<TreeType>,
  passedCheckOnParent: boolean = false,
): TreeType[] =>
  tree.map(item => {
    if (item.children?.length) {
      return {
        ...item,
        children: updateTreeByIds(
          item.children,
          idsList,
          newItemParamsCb,
          idsList.includes(item.id) || passedCheckOnParent,
        ),
        ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)),
      }
    }

    return { ...item, ...((idsList.includes(item.id) || passedCheckOnParent) && newItemParamsCb(item)) }
  })

export const findSelectedItems = (tree: TreeType[]): (TreeType | null)[] =>
  tree
    .map(item => {
      if (!item.selected) {
        if (item.children?.length) {
          return findSelectedItems(item.children)
        } else {
          return null
        }
      } else {
        if (item.children?.length) {
          return [item].concat([findSelectedItems(item.children) as any])
        }

        return item
      }
    })
    .flat()
    .filter(Boolean)
    .flatMap(elem => elem)

export const convertToOriginalItems = (treeArr: (TreeType | null)[]) =>
  treeArr.map(
    ({
      search,
      children,
      selected,
      loadingActions,
      isNotSelectable,
      disabled,
      checked,
      indeterminate,
      iconStart,
      iconEnd,
      iconsStart,
      iconsEnd,
      hidden,
      open,
      ...itemWithoutConfig
    }: any) => itemWithoutConfig,
  )

export const markChildrenAs = (tree: TreeType[], treeItemCb: (item: TreeType) => Partial<TreeType>): TreeType[] =>
  tree.map(item => {
    if (item.children) {
      return { ...item, ...treeItemCb(item), children: markChildrenAs(item.children, treeItemCb) }
    }

    return { ...item, ...treeItemCb(item) }
  })

export const isHaveFoundChildren = (
  tree: TreeType[],
  search: string,
  matcherFn: (item: TreeType, search: string) => boolean,
): boolean =>
  tree.some(item => {
    const isMatch = matcherFn(item, search)

    if (!isMatch && item.children) {
      return isHaveFoundChildren(item.children, search, matcherFn)
    }

    return isMatch
  })

export const recalculateIndeterminateTreeState = (treeData: TreeType[]): TreeType[] =>
  treeData.reduce((acc, item) => {
    if (item.children) {
      const selected = !item.isNotSelectable && areAllChildrenSelected(item.children)
      const indeterminate = areAnyChildrenSelected(item.children)
      const children = recalculateIndeterminateTreeState(item.children)

      return [...acc, { ...item, selected, children, indeterminate: selected ? false : indeterminate }]
    }

    return [...acc, item]
  }, [] as TreeType[])

export const extractExtraProps = (tree: TreeType): Record<string, any> => {
  const extras: Record<string, any> = {}

  for (const key in tree) {
    if (!KNOWN_KEYS_OF_TREE_TYPE[key] && key.startsWith('data-')) {
      extras[key] = tree[key]
    }
  }

  return extras
}
