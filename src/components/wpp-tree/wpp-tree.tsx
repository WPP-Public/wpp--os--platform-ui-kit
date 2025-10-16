import { Component, Prop, h, Event, EventEmitter, Watch, State, Element, Host, Listen, Method } from '@stencil/core'
import {
  TreeActionClickEventDetail,
  TreeChangeEventDetail,
  TreeItemIconsType,
  TreeItemSearchConfig,
  TreeLocaleType,
  TreeType,
} from './types'
import { debounce, transformToVersionedTag, uuidv4 } from '../../utils/utils'
import {
  findSelectedItems,
  isHaveFoundChildren,
  markChildrenAs,
  recalculateIndeterminateTreeState,
  convertToOriginalItems,
  updateTreeById,
  updateTreeByIds,
} from './utils'
import { LOCALES_DEFAULTS } from './const'

@Component({
  tag: 'wpp-tree',
  styleUrl: 'wpp-tree.scss',
  shadow: true,
})
export class WppTree {
  @Element() host: HTMLWppTreeElement

  @State() currentTreeData: TreeType[]
  @State() selectedIds: (TreeType | null | string | number)[] = []

  private resizeObserver: ResizeObserver
  private resizeInProgress: boolean = false
  private _locales: TreeLocaleType = LOCALES_DEFAULTS

  /**
   * Defines the tree data.
   */
  @Prop() readonly data!: TreeType[]

  /**
   * Indicates search value
   */
  @Prop() readonly search?: string = ''

  /**
   * If several items could be selected.
   */
  @Prop({ reflect: true }) readonly multiple: boolean = false

  /**
   * Default selected ids list
   */
  @Prop({ reflect: true }) readonly defaultSelectedIds: (string | number)[] = []

  /**
   * Defines the component locale types.
   */
  @Prop() readonly locales: Partial<TreeLocaleType> = {}

  /**
   * Defines the component locale types.
   * Note: "isMatchSearch" is deprecated, use "isMatchingSearch" instead, which uses
   * the tree-item object.
   */
  @Prop() readonly searchConfig: TreeItemSearchConfig = {
    isMatchSearch: undefined,
    highlightOptions: {},
    transformSearchQuery: undefined,
    isMatchingSearch: undefined,
  }

  /**
   * Defines words highlight in tree-item's title after search.
   */
  @Prop() readonly disableSearchHighlight: boolean = false

  /**
   *  Defines animation for open/close wpp-tree-item.
   */
  @Prop() readonly disableOpenCloseAnimation: boolean = false

  /**
   * Defines truncation for wpp-tree-item
   */
  @Prop() readonly withItemsTruncation: boolean = false

  /**
   * Defines loading state
   */
  @Prop() readonly loading?: boolean = false

  /**
   * Defines number of loading skeleton items
   */

  @Prop() readonly skeletonNumberItems?: number = 5

  /**
   * Emitted when tree have changed it's state
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<TreeChangeEventDetail>

  /**
   * Emitted when click on item actions(icons) was occurred
   */
  @Event({ bubbles: false, composed: false }) wppActionClick: EventEmitter<TreeActionClickEventDetail>

  @Watch('search')
  onInputChange(searchText: string) {
    if (!searchText.trim()) {
      const treeState = this.currentTreeData.map(item => ({
        ...item,
        hidden: false,
        open: false,
        ...(item.children?.length && {
          children: markChildrenAs(item.children, item => ({
            hidden: false,
            ...(item.children?.length && { open: false }),
          })),
        }),
      }))

      this.isSearchResultFound = true
      const selectedItems = findSelectedItems(treeState)

      this.wppChange.emit({
        treeState,
        selectedItems,
        selectedOriginalItems: convertToOriginalItems(selectedItems),
        reason: 'search',
      })

      return
    }
    this.isSearchResultFound = false
    const treeState = this.updateTreeWithSearch(this.currentTreeData, searchText)
    const selectedItems = findSelectedItems(treeState)

    this.wppChange.emit({
      treeState,
      selectedItems,
      selectedOriginalItems: convertToOriginalItems(selectedItems),
      reason: 'search',
    })
  }

  @Watch('data')
  updateDate(newData: TreeType[]) {
    this.currentTreeData = newData
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<TreeLocaleType>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  @Listen('wppTreeItemOpenChange', { capture: true })
  handleOpenItem(event: CustomEvent<TreeType>) {
    event.stopPropagation()
    const item = event.detail

    const treeState = updateTreeById(this.currentTreeData, item.id, item)
    const selectedItems = findSelectedItems(treeState)

    this.wppChange.emit({
      treeState,
      currentItem: item,
      selectedItems,
      selectedOriginalItems: convertToOriginalItems(selectedItems),
      reason: 'open',
    })
  }

  @Listen('wppTreeItemSelectChange', { capture: true })
  handleSelectedItem(event: CustomEvent<TreeType>) {
    event.stopPropagation()

    const newItemState = event.detail
    const updatedTreeWithCurrentItem = updateTreeById(this.currentTreeData, newItemState.id, newItemState)

    if (this.multiple) {
      this.multipleSelectionUpdate(updatedTreeWithCurrentItem, newItemState)
    } else {
      this.singleSelectionUpdate(updatedTreeWithCurrentItem, newItemState)
    }
  }

  @Method()
  async recalculateTreeWidth(): Promise<void> {
    if (this.host) {
      const contentRect = this.host.getBoundingClientRect()

      this.host.style.setProperty('--wpp-tree-item-width', `${contentRect.width - 8}px`)
    }
  }

  @Method()
  async selectAll(): Promise<void> {
    if (!this.multiple) return

    this.toggleItemSelection(
      ({ isNotSelectable, disabled }) => ({
        ...(!isNotSelectable && !disabled && { selected: true }),
      }),
      'select',
    )
  }

  @Method()
  async clearAll(): Promise<void> {
    if (!this.multiple) return

    this.toggleItemSelection(
      () => ({
        selected: false,
        indeterminate: false,
      }),
      'clear',
    )
  }

  private toggleItemSelection = (
    toggleFunction: (item: Partial<TreeType>) => Partial<TreeType>,
    reason: 'open' | 'select' | 'search' | 'clear',
  ) => {
    // Get the IDs of all first-level items in the tree.
    const allItemsIDs = this.currentTreeData.map(item => item.id)

    const finalTree = recalculateIndeterminateTreeState(
      updateTreeByIds(this.currentTreeData, allItemsIDs, toggleFunction),
    )

    this.wppChange.emit({
      treeState: finalTree,
      selectedItems: findSelectedItems(finalTree),
      selectedOriginalItems: convertToOriginalItems(findSelectedItems(finalTree)),
      reason,
    })
  }

  componentDidLoad() {
    // NOTE: defaultSelectedIds should be provided only when default selection logic is applied. Recalculating tree state
    // here may break your custom selection logic
    if (this.defaultSelectedIds.length > 0) {
      this.currentTreeData = recalculateIndeterminateTreeState(
        updateTreeByIds(this.currentTreeData, this.defaultSelectedIds, ({ isNotSelectable, disabled }) => ({
          ...(!isNotSelectable && !disabled && { selected: true }),
        })),
      )
    }
    if (this.disableOpenCloseAnimation) {
      this.host.style.setProperty('--wpp-tree-item-switcher-transition-duration', '50ms')
    }

    this.resizeObserver = new ResizeObserver(
      debounce(entries => {
        if (this.resizeInProgress) return

        try {
          this.resizeInProgress = true

          for (const entry of entries) {
            if (entry.target === this.host.parentElement) {
              this.host.style.setProperty('--wpp-tree-item-width', `${entry.contentRect.width - 8}px`)
            }
          }
        } catch (error) {
          console.error('Error in ResizeObserver callback:', error)
        } finally {
          this.resizeInProgress = false
        }
      }, 50),
    )

    if (this.host.parentElement && this.resizeObserver) {
      this.resizeObserver.observe(this.host.parentElement)
    }
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private isSearchResultFound: boolean = true

  private isMatchSearch = (item: TreeType, search: string) => {
    if (this.searchConfig?.isMatchingSearch) return this.searchConfig?.isMatchingSearch(item, search)
    if (this.searchConfig?.isMatchSearch) return this.searchConfig.isMatchSearch(item.title, search)

    const titleTerm = item.title.toLowerCase().split(' ').filter(Boolean)
    const searchTerm = search.toLowerCase().split(' ').filter(Boolean)

    return titleTerm.some(substr => searchTerm.some(search => substr.includes(search)))
  }

  private multipleSelectionUpdate = (tree: TreeType[], item: TreeType) => {
    const { id, selected, children, indeterminate } = item

    let updatedTree

    if (children?.length && (selected || indeterminate)) {
      updatedTree = updateTreeById(tree, id, {
        children: markChildrenAs(children, ({ disabled }) => ({ ...(!disabled && { selected: true }) })),
      })
    }

    if (children?.length && !selected && !indeterminate) {
      updatedTree = updateTreeById(tree, id, {
        children: markChildrenAs(children, () => ({ selected: false })),
      })
    }

    const treeState = recalculateIndeterminateTreeState(updatedTree || tree)
    const selectedItems = findSelectedItems(treeState)

    this.wppChange.emit({
      treeState,
      currentItem: item,
      selectedItems,
      selectedOriginalItems: convertToOriginalItems(selectedItems),
      reason: 'select',
    })
  }

  private singleSelectionUpdate = (tree: TreeType[], item: TreeType) => {
    const { id, selected } = item
    let treeWithUnselectedPreviousItem
    const updatedTree = updateTreeById(tree, id, {
      selected,
    })

    if (selected) {
      treeWithUnselectedPreviousItem = updateTreeById(updatedTree, this.selectedIds[0] as string, {
        selected: false,
      })

      this.selectedIds = [id]
    } else {
      this.selectedIds = []
    }

    const treeState = treeWithUnselectedPreviousItem || updatedTree
    const selectedItems = findSelectedItems(treeState)

    this.wppChange.emit({
      treeState,
      currentItem: item,
      selectedItems,
      selectedOriginalItems: convertToOriginalItems(selectedItems),
      reason: 'select',
    })
  }

  private updateTreeWithSearch = (tree: TreeType[], search: string): TreeType[] =>
    tree.map((item: TreeType) => {
      const isMatch = this.isMatchSearch(item, search)

      if (!this.isSearchResultFound && isMatch) this.isSearchResultFound = true

      if (item.children?.length) {
        // If found parent item has match, we don't need to recursive call this.updateTreeWithSearch function anymore.
        // Instead we should mark all of his children as visible( hidden: false)
        // and if some children items has match - mark their parents as open.
        if (isMatch) {
          const haveMatchedChildrenHost = isHaveFoundChildren(item.children, search, this.isMatchSearch)
          const children = markChildrenAs(item.children, item => {
            if (item.children?.length) {
              const haveMatchedChildren = isHaveFoundChildren(item.children, search, this.isMatchSearch)

              return { hidden: false, open: haveMatchedChildren }
            }

            return { hidden: false }
          })

          return { ...item, children, open: haveMatchedChildrenHost, hidden: false }
        }
        const haveMatchedChildren = isHaveFoundChildren(item.children, search, this.isMatchSearch)
        const children = this.updateTreeWithSearch(item.children, search)

        return {
          ...item,
          children,
          open: haveMatchedChildren,
          hidden: !haveMatchedChildren && !isMatch,
        }
      } else {
        return { ...item, hidden: !isMatch }
      }
    })

  private handleActionClick({
    item,
    name,
    place,
  }: {
    item: TreeType
    name: string
    place: 'start' | 'end'
  }): (event: Event) => void {
    return (event: Event) => {
      event.stopPropagation()
      if (!item.loadingActions) {
        this.wppActionClick.emit({
          id: item.id!,
          item,
          name,
          place,
        })
      }
    }
  }

  private checkData = (treeData: TreeType[]) => {
    if (!this.multiple) {
      if (findSelectedItems(treeData).length > 1) {
        throw new Error(
          'Several selected items found in provided data. There is could be only one selected item in single mode, otherwise, use multiple mode.',
        )
      }
      if (this.defaultSelectedIds.length > 1) {
        throw new Error(
          'Several items found in provided defaultSelectedIds prop. There is could be only one selected item in single mode, otherwise, use multiple mode. ',
        )
      }
    }

    return treeData
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }
    this.currentTreeData = this.checkData(this.data)
  }

  private hostCssClasses = () => ({
    'wpp-tree': true,
  })

  private renderIconsList = (item: TreeType, icons: TreeItemIconsType[], place: 'start' | 'end' = 'end') => (
    <div slot={`icon-${place}`} key={uuidv4()}>
      <wpp-menu-context
        dropdownConfig={{
          trigger: 'click',
          interactiveDebounce: 15,
          interactiveBorder: 25,
          offset: [0, 0],
        }}
      >
        <wpp-icon-more
          class={{
            'menu-trigger': true,
            disabled: !!item.disabled,
          }}
          style={{ padding: '4px', color: 'var(--wpp-grey-color-800)' }}
          direction="horizontal"
          slot="trigger-element"
        />
        <div>
          {icons.map(({ icon, name }) => (
            <wpp-list-item key={name} value={name} onClick={this.handleActionClick({ item, name, place })}>
              {h(transformToVersionedTag(icon), { slot: 'left' })}
              <span slot="label">{name}</span>
            </wpp-list-item>
          ))}
        </div>
      </wpp-menu-context>
    </div>
  )

  private renderTree = (treeData: TreeType[], level: number = 1) =>
    treeData.map(item => {
      if (item.children) {
        return (
          <wpp-tree-item
            text={item.title}
            item={item}
            level={level}
            multiple={this.multiple}
            search={this.search}
            highlightOptions={this.searchConfig.highlightOptions}
            transformSearchQuery={this.searchConfig.transformSearchQuery}
            disableSearchHighlight={this.disableSearchHighlight}
            disableOpenCloseAnimation={this.disableOpenCloseAnimation}
            withItemsTruncation={this.withItemsTruncation}
            endContent={item.endContent}
          >
            {item.iconStart?.icon &&
              h(transformToVersionedTag(item.iconStart.icon), {
                slot: 'icon-start',
                part: 'icon-start',
                onclick: this.handleActionClick({ item, name: item.iconStart.name, place: 'start' }),
              })}
            {item.iconsStart && this.renderIconsList(item, item.iconsStart, 'start')}
            {item.iconsEnd && this.renderIconsList(item, item.iconsEnd)}
            {!item.iconsEnd &&
              item.iconEnd?.icon &&
              h(transformToVersionedTag(item.iconEnd.icon), {
                slot: 'icon-end',
                part: 'icon-end',
                onclick: this.handleActionClick({ item, name: item.iconEnd.name, place: 'end' }),
              })}
            <div slot="content" class="content-container" part="content">
              {item.open && this.renderTree(item.children, level + 1)}
            </div>
          </wpp-tree-item>
        )
      }

      return (
        <wpp-tree-item
          text={item.title}
          item={item}
          level={level}
          multiple={this.multiple}
          search={this.search}
          highlightOptions={this.searchConfig.highlightOptions}
          transformSearchQuery={this.searchConfig.transformSearchQuery}
          disableSearchHighlight={this.disableSearchHighlight}
          disableOpenCloseAnimation={this.disableOpenCloseAnimation}
          withItemsTruncation={this.withItemsTruncation}
          endContent={item.endContent}
        >
          {item.iconStart?.icon &&
            h(transformToVersionedTag(item.iconStart.icon), {
              slot: 'icon-start',
              part: 'icon-start',
              onclick: this.handleActionClick({ item, name: item.iconStart.name, place: 'start' }),
            })}
          {item.iconsStart && this.renderIconsList(item, item.iconsStart, 'start')}
          {item.iconsEnd && this.renderIconsList(item, item.iconsEnd)}
          {!item.iconsEnd &&
            item.iconEnd?.icon &&
            h(transformToVersionedTag(item.iconEnd.icon), {
              slot: 'icon-end',
              part: 'icon-end',
              onclick: this.handleActionClick({ item, name: item.iconEnd.name, place: 'end' }),
            })}
        </wpp-tree-item>
      )
    })

  private renderSkeletonLoading = () =>
    [...Array(this.skeletonNumberItems)].map(_ => (
      <div class="skeleton-item">
        <wpp-skeleton variant="rectangle" width="100%" animation={true} />
      </div>
    ))

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="tree-container, tree-empty-text">
        {!this.loading && (
          <div class="container" part="tree-container">
            {this.currentTreeData && this.isSearchResultFound ? (
              this.renderTree(this.currentTreeData)
            ) : (
              <p class="empty-tree-text" part="tree-empty-text">
                {this._locales.nothingFound}
              </p>
            )}
          </div>
        )}

        {this.loading && <div class="skeleton-wrapper">{this.renderSkeletonLoading()}</div>}
      </Host>
    )
  }
}
