import { Component, Host, h, Prop, Element, Event, EventEmitter, State, Watch } from '@stencil/core'
import highlightWords from 'highlight-words'

import { TransformSearchQuery, TreeItemEndContentProps, TreeType } from '../../types'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'
import { getSlotEmptyStates, transformToVersionedTag } from '../../../../utils/utils'
import { TreeItemHighlightOptions } from '../../types'
import { clickOnElementsWithHandlers, clickOnSwitcher } from './utils'
import { areAnyChildrenDisabled } from '../../utils'

@Component({
  tag: 'wpp-tree-item',
  styleUrl: 'wpp-tree-item.scss',
  shadow: true,
})
export class WppTreeItem {
  @Element() host: HTMLWppTreeItemElement

  @State() hasIconStartSlot: boolean = false

  @State() hasIconEndSlot: boolean = false

  @State() hasIconEndContextMenu: boolean = false

  @State() isMouseOnIconEnd: boolean = false

  @State() isCollapseTransitionEnd: boolean = true

  @State() isTextWrappable: boolean = false

  /**
   * Indicates current item title
   */
  @Prop({ reflect: true }) readonly text?: string
  /**
   * If 'true', it will be possible to have multiple selection
   */
  @Prop({ reflect: true }) readonly multiple: boolean = false

  /**
   * Indicates search param
   */
  @Prop() readonly search: string

  /**
   * Indicates current item props
   */
  @Prop() readonly item: TreeType

  /**
   * Indicates deep level of tree
   */
  @Prop({ reflect: true }) readonly level: number = 1

  /**
   * Indicates highlightOptions for text highlight after search
   */
  @Prop() readonly highlightOptions: TreeItemHighlightOptions

  /**
   * Helper that transforms a search query to a custom string, which is then passed to the "highlightWords" library
   * in order to match it to the provided tree item text. For example, "cars!" would be transformed to "cars"
   */
  @Prop() readonly transformSearchQuery?: TransformSearchQuery

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
   * Specifies the content to be displayed on the right side of the tree item.
   * The content can be one of the following types: `avatar`, `avatarGroup`, `tag`, or `text`.
   * Each type supports its own set of properties, which are passed through the `TreeItemEndContentProps` interface.
   *
   * Example usage:
   * - `avatar`: Display a single avatar, typically representing a user.
   * - `avatarGroup`: Show multiple avatars grouped together.
   * - `tag`: Render a status tag with customizable label and color.
   * - `text`: Show a text label with optional tooltip.
   */
  @Prop() readonly endContent?: TreeItemEndContentProps

  /**
   * Emitted updated item details
   */
  @Event() wppTreeItemOpenChange: EventEmitter<TreeType>

  /**
   * Emitted when updated item selectable state
   */
  @Event() wppTreeItemSelectChange: EventEmitter<TreeType>

  @Watch('item')
  onItemChange(next: TreeType, prev: TreeType) {
    if (prev.open !== next.open) {
      this.shouldRecalculateItemHeight = true
    }

    if (prev.hidden !== next.hidden && next.hidden) {
      // When item is hidden, we need to update height of parent element
      this.updateParentHeight(this.host)
    }
  }

  private shouldRecalculateItemHeight = false
  private defaultItemHeight = '32px'
  private itemHeight: string | null = null

  private getItemHeight = (): string => this.itemHeight || this.defaultItemHeight

  componentDidLoad() {
    setTimeout(() => {
      const title = (this.host.shadowRoot as ShadowRoot).querySelector('.title')

      if (title) {
        this.isTextWrappable = title.scrollWidth > title.clientWidth
      }
    }, 0)
  }

  componentDidUpdate() {
    if (this.shouldRecalculateItemHeight && !this.disableOpenCloseAnimation) {
      if (!this.item.open) {
        this.isCollapseTransitionEnd = false
        this.host.style.height = this.getItemHeight()
      } else {
        // TODO: fix that approach. Currently 50 ms delay makes it possible to see animation open/close on filtering by search.
        // delay in 0 ms makes it work without animation. Possible solution: may be recalculated based on number of
        // open children in tree, but that will cost us some performance
        setTimeout(() => {
          this.addHeightToHost(this.item)
        }, 50)
      }
      this.shouldRecalculateItemHeight = false
    }
  }

  private addHeightToHost = (el: TreeType) => {
    function traverse(node: TreeType): number {
      if (node.hidden === true) return 0

      if (!node.open) return 1

      let count = node.hidden === false || node.open ? 1 : 0

      if (node.children) {
        for (const child of node.children) {
          count += traverse(child)
        }
      }

      return count
    }

    const visibleItems = traverse(el)

    this.host.style.height = `${visibleItems * parseInt(this.getItemHeight())}px`
  }

  private updateParentHeight = (el: HTMLElement) => {
    if (el.tagName !== transformToVersionedTag('wpp-tree-item').toUpperCase() && el.slot !== 'content') {
      return
    }

    if (el.style.height.includes('px')) {
      el.style.height = 'auto'

      return
    }

    if (el.parentElement) {
      this.updateParentHeight(el.parentElement)
    }

    return
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      start: '[slot="icon-start"]',
      end: '[slot="icon-end"]',
    })
    const hasMenuContext = !!this.host.querySelector('.wpp-menu-context')

    this.hasIconStartSlot = !emptyStates.start
    this.hasIconEndSlot = !emptyStates.end
    this.hasIconEndContextMenu = hasMenuContext
  }

  private handleMouseDown = () => {
    if (this.item.disabled) return
    this.isMouseOnIconEnd = true
  }

  private handleMouseLeave = () => {
    this.isMouseOnIconEnd = false
  }

  private handleCheckboxClick = () => {
    if (this.item.children?.length) {
      const haveDisabledChildren = areAnyChildrenDisabled(this.item.children)

      if (this.item.indeterminate && haveDisabledChildren) {
        const nextState = { selected: false, indeterminate: false }

        return this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState })
      }
      if (!this.item.selected && haveDisabledChildren) {
        const nextState = { selected: false, indeterminate: true }

        return this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState })
      }
    }
    const nextState = this.item.indeterminate
      ? { selected: true, indeterminate: false }
      : { selected: !this.item.selected, indeterminate: false }

    this.wppTreeItemSelectChange.emit({ ...this.item, ...nextState })
  }

  private handleSwitcherClick = () => {
    if (this.item.disabled) return

    if (!this.disableOpenCloseAnimation) {
      if (!this.itemHeight) {
        this.itemHeight = this.host.shadowRoot?.querySelector('.tree-item')?.clientHeight + 'px'
      }
      // We need to set proper height value in px before animation start
      if (!this.host.style.height || this.host.style.height === 'auto') {
        this.host.style.height = this.item.open ? `${this.host.scrollHeight}px` : this.getItemHeight()
      }
    }

    this.wppTreeItemOpenChange.emit({ ...this.item, open: !this.item.open })
  }

  private handleItemClick = (e: MouseEvent): void => {
    if (this.item.disabled) return

    if (clickOnElementsWithHandlers(e)) {
      return
    }
    if (!clickOnSwitcher(e)) {
      if (this.item.children?.length) this.handleSwitcherClick()
    }
    if (!this.multiple && !this.item.isNotSelectable) {
      this.wppTreeItemSelectChange.emit({
        ...this.item,
        selected: !this.item.selected,
        ...(this.item.children?.length && { open: !this.item.open }),
      })
    }
  }

  private handleTransitionEnd = () => {
    this.host.style.height = 'auto'
    this.isCollapseTransitionEnd = true
  }

  private calculateItemOffset = (level: number, isParent: boolean) => {
    const levelDifference = 20
    const switcherOffset = 16

    if (level === 1) {
      return isParent ? '0px' : `${levelDifference + switcherOffset}px`
    }

    return isParent
      ? `${this.level * levelDifference - levelDifference}px`
      : `${this.level * levelDifference + switcherOffset}px`
  }

  private hostCssClasses = () => ({
    'wpp-tree-item': true,
    'wpp-hidden': !!this.item.hidden,
  })

  private treeItemClasses = () => ({
    'tree-item': true,
    open: !!this.item.open,
    multiple: this.multiple,
    selected: !!this.item.selected,
    disabled: !!this.item.disabled,
    parent: !!this.item?.children?.length,
    'with-truncation': this.withItemsTruncation,
    'with-text-wrap': this.isTextWrappable,
  })

  private titleClasses = () => ({
    title: true,
    disabled: !!this.item.disabled,
    'with-icon-end': this.hasIconEndContextMenu || this.hasIconEndSlot,
  })

  private iconStartCssClasses = () => ({
    'icon-start': true,
    'slot-hidden': !this.hasIconStartSlot,
  })

  private iconEndCssClasses = () => ({
    'icon-end': true,
    'slot-hidden': !this.hasIconEndSlot,
    margin: this.hasIconEndContextMenu,
    disabled: !!this.item.disabled,
  })

  private endContentCssClasses = (className?: string) => ({
    'end-content': true,
    ...(className ? { [className]: true } : {}),
    disabled: !!this.item.disabled,
  })

  private renderTitle = () => {
    const chunks = highlightWords({
      text: this.item.title,
      query: this.transformSearchQuery ? this.transformSearchQuery(this.search) : this.search,
      ...this.highlightOptions,
    })

    return (
      <span aria-label={this.item.title} class={this.titleClasses()} part="tree-item-title-wrapper">
        {this.disableSearchHighlight ? (
          <span aria-hidden="true" part="tree-item-title">
            {this.item.title}
          </span>
        ) : (
          chunks.map(({ text, match, key }) =>
            match ? (
              <span aria-hidden="true" class="highlight" key={key} part="tree-item-title-highlighted">
                {text}
              </span>
            ) : (
              <span aria-hidden="true" key={key} part="tree-item-title">
                {text}
              </span>
            ),
          )
        )}
      </span>
    )
  }

  private renderEndContent = () => {
    if (!this.endContent) return null

    const { contentType, props } = this.endContent
    const { className } = props

    switch (contentType) {
      case 'text':
        return (
          <wpp-typography
            type="s-body"
            tag="span"
            {...props}
            class={this.endContentCssClasses(className)}
            part="tree-item-end-text"
          >
            {props?.text}
          </wpp-typography>
        )
      case 'tag': {
        const { icon } = props

        return (
          <wpp-tag
            {...props}
            class={this.endContentCssClasses(className)}
            disabled={this.item.disabled}
            part="tree-item-end-tag"
          >
            {icon &&
              h(transformToVersionedTag(icon), {
                slot: 'icon-start',
                part: 'icon-start',
              })}
          </wpp-tag>
        )
      }
      case 'avatar':
        return (
          <wpp-avatar {...props} class={this.endContentCssClasses(className)} size="xs" part="tree-item-end-avatar" />
        )
      case 'avatarGroup':
        return (
          <wpp-avatar-group {...props} class={this.endContentCssClasses(className)} part="tree-item-end-avatar-group" />
        )
      default:
        return null
    }
  }

  render() {
    const isParent = !!this.item?.children?.length

    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="tree-item,tree-item-switcher,tree-item-checkbox,tree-item-title-wrapper,tree-item-title,tree-item-title-highlighted,tree-item-action-button"
        role="treeItem"
        {...(!this.disableOpenCloseAnimation && { onTransitionEnd: this.handleTransitionEnd })}
      >
        <div
          class={this.treeItemClasses()}
          style={{ paddingLeft: this.calculateItemOffset(this.level, isParent) }}
          onClick={this.handleItemClick}
          part="tree-item"
        >
          {isParent && (
            <div class="switcher" onClick={this.handleSwitcherClick} part="tree-item-switcher">
              <wpp-icon-triangle-fill data-open={this.item.open ? 'true' : 'false'} />
            </div>
          )}
          {this.multiple && !this.item.isNotSelectable && (
            <wpp-checkbox
              class="checkbox"
              indeterminate={this.item.indeterminate}
              checked={this.item.selected}
              controlled
              onWppChange={this.handleCheckboxClick}
              disabled={this.item.disabled}
              part="tree-item-checkbox"
            />
          )}
          <WrappedSlot name="icon-start" onSlotchange={this.updateSlotData} wrapperClass={this.iconStartCssClasses()} />
          {this.isTextWrappable && this.withItemsTruncation ? (
            <wpp-tooltip text={this.item.title} config={{ placement: 'right' }} class="tooltip">
              {this.renderTitle()}
            </wpp-tooltip>
          ) : (
            this.renderTitle()
          )}
          <wpp-action-button
            variant="secondary"
            disabled={this.item.disabled}
            onMouseEnter={this.handleMouseDown}
            onMouseLeave={this.handleMouseLeave}
            class={this.iconEndCssClasses()}
            loading={this.item.loadingActions}
            part="tree-item-action-button"
          >
            <slot name="icon-end" onSlotchange={this.updateSlotData} />
          </wpp-action-button>
          {this.renderEndContent()}
        </div>
        {((this.item.children && this.item.open) || !this.isCollapseTransitionEnd) && (
          <WrappedSlot name="content" onSlotchange={this.updateSlotData} />
        )}
      </Host>
    )
  }
}
