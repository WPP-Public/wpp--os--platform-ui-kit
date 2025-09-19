import { Component, Element, Event, EventEmitter, h, Prop, State, Fragment, Watch, Method, VNode } from '@stencil/core'
import { BaseComponent } from '../../interfaces/base-component'

import { Instance, Props } from 'tippy.js'
import {
  SelectLabelConfig,
  SelectLocaleInterface,
  SelectOption,
  SelectSize,
  SelectTypes,
  SelectValue,
} from '../wpp-select/types'
import { menuListConfig } from '../../common/menuListConfig'
import { AriaProps, DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common'
import { DEFAULT_DROPDOWN_CONFIG, LOCALES_DEFAULTS, MULTIPLE_SELECT_SINGLE_VALUE_ERROR } from './config'
import { ListItemChangeEventDetail, ListValue } from '../wpp-list-item/types'
import { InputChangeEventDetail, WppInputCustomEvent, WppListItemCustomEvent } from '../../components'
import { isEqual } from 'lodash'
import version from '../../../versioned-components/version'
import { getSlotEmptyStates, isEventTargetContained, transformToVersionedTag } from '../../utils/utils'
import { renderSingleSelect } from './components/wpp-single-select/wpp-single-select'
import { renderMultipleSelect } from './components/wpp-multiple-select/wpp-multiple-select'
import { renderTextSelect } from './components/wpp-text-select/wpp-text-select'
import { renderCombinedSelect } from './components/wpp-combined-select/wpp-combined-select'
import { ListItemInterface, SelectChangeEventDetails } from './types'
import { BaseFormControl } from '../../interfaces/base-form-control'
import { InlineMessage } from '../../interfaces/inline-message'

const MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH = 10
const TRUNCATION_DELAY = 100

/**
 * @slot icon-start - can contain an icon that will be placed before the main content, e.g. a search icon.
 */
@Component({
  tag: 'wpp-select',
  styleUrl: 'wpp-select.scss',
  shadow: true,
})
export class WppSelect implements BaseComponent, BaseFormControl<SelectValue[] | SelectValue>, InlineMessage {
  // *** Specific to multiple-select ***
  private resizeObserver: ResizeObserver
  private hasReachedLimit: boolean = false

  protected canSelectAll: boolean = false
  protected canClearAll: boolean = false

  protected listRef?: HTMLDivElement
  // ************************************

  private LIB_COMPONENTS_PREFIX = 'wpp-'
  protected versionToCompare: string
  protected tippyInstance?: Instance<Props>

  protected anchorRef?: HTMLDivElement
  protected portalRef?: HTMLDivElement
  protected inputRef?: HTMLDivElement
  protected overflowContainerRef?: HTMLDivElement

  @Element() host: HTMLWppSelectElement

  @State() isOpen: boolean = false

  @State() searchText: string = ''

  @State() internalList: ListItemInterface[]

  @State() renderedText: string

  @State() emittedValue: SelectValue | null

  @State() hasIconStartSlot: boolean = false

  @State() shouldShowSearch: boolean = false

  @State() focusType: FOCUS_TYPE

  @State() isRenderMessageInTooltip: boolean = false

  // *** Specific to multiple-select ***
  @State() withScroll: boolean = false

  @State() checkedItems: number = 0

  @State() disabledItems: number = 0

  @State() textOverflows: boolean = false
  // ************************************

  // *** Specific to combined-select ***
  @State() isContainerFocused: boolean = false
  // ************************************

  // *** Specific to text-select ***
  @State() shouldTruncate: boolean = false
  // *******************************

  /**
   * Defines the input value.
   */
  @Prop({ mutable: true }) value: SelectValue | SelectValue[]

  /**
   * List of items in the dropdown.
   */
  @Prop() readonly list: ListItemInterface[] = []

  /**
   * Defines the input type.
   */
  @Prop({ reflect: true }) readonly type: SelectTypes = 'single'

  /**
   * If `true` the search field will appear. The default value 'auto' displays the search
   * only when the number of items displayed is >= 10.
   */
  @Prop({ reflect: true }) readonly withSearch: boolean | 'auto' = 'auto'

  /**
   * If the input is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the input is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If `true`, the input should be focused on page load
   */
  @Prop({ reflect: true }) readonly autoFocus: boolean = false

  /**
   * If the component is loading.
   */
  @Prop() readonly loading: boolean = false

  /**
   * If `true` the dropdown has controls folder, meaning that the "Select All" and "Clear All" button will appear at the bottom of the dropdown.
   * This property works just for the multiple select.
   */
  @Prop({ reflect: true }) readonly withFolder: boolean = false

  /**
   * Used to control whether or not the selected value from a text-select should be truncated with an ellipsis (three dots)
   * to fit within a specified width. If set to false, the selected value from the text-select may appear on
   * multiple lines. If set to true (which is the default), the content will always be on 1 line and will be truncated.
   */
  @Prop() readonly truncate: boolean = true

  /**
   * Defines the maximum number of items the user can select in a dropdown. If the maximum number is reached, the other items are disabled.
   * This property can be used only on the "multiple" select.
   */
  @Prop() readonly maximumSelectedItems?: number

  /**
   * Defines the input placeholder.
   */
  @Prop() readonly placeholder?: string

  /**
   * Defines the input name.
   */
  @Prop() readonly name?: string

  /**
   * Indicates the configuration of the label.
   */
  @Prop({ mutable: true }) labelConfig?: SelectLabelConfig

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Defines the input size.
   */
  @Prop() readonly size: SelectSize = 'm'

  /**
   * If true, wouldn't update `select` when the list changes.
   */
  @Prop() readonly enableStaticOptions: boolean = false

  /**
   * Defines multiple select, maximum selected items to show.
   */
  @Prop() readonly maxItemsToDisplay: number = 2

  /**
   * Defines the dropdown width. The width of the dropdown cannot be smaller than the width of the trigger element.
   */
  @Prop() readonly dropdownWidth: 'auto' | string = 'auto'

  /**
   * Defines the displayed input value. If provided overrides the existing displayed value.
   * This property should be used only in custom single selects.
   */
  @Prop({ mutable: true }) displayValue: string

  /**
   * Defines if the dropdown of the select is opened or not. This property is used to control the direction of chevron icon (opened / closed).
   * This property should be used only in custom single selects.
   */
  @Prop() readonly isDropdownOpen: boolean = false

  /**
   * Contains the component `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Defines the input message. The message is placed right below the select.
   */
  @Prop() readonly message?: string

  /**
   * Defines the input message type, which can be "error" or "warning". This property
   * has to be used together with "message".
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines the input message maximum length. The message will get truncated after
   * limit is reached. This property has to be used together with "message".
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * Defines the component locale types.
   */
  @Prop() readonly locales: SelectLocaleInterface = LOCALES_DEFAULTS

  /**
   * If 'true', instead of displaying comma-separated values, the input should show the text "All selected"
   * when all options in the multi-select are selected.
   */
  @Prop() readonly showSelectAllText: boolean = true

  /**
   * Defines the combined input value.
   */
  @Prop({ mutable: true }) inputValue: string

  /**
   * Defines the dropdown configuration of the tooltip of the select's message. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * Render error/warning/info message in tooltip instead of an inline message below a select element
   */
  @Prop() readonly messageInTooltip: boolean = false

  /**
   * Emitted when an input value changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<SelectChangeEventDetails>

  /**
   * Emitted when the input is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the input loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  @Watch('value')
  onUpdateValue() {
    if (this.type === 'multiple' && !Array.isArray(this.value)) {
      throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR)
    }

    // Every time this.value changes the text in the anchor is changed.
    this.renderedText = ''
    this.emittedValue = this.value

    // We filter the whole list passed to the component, not just the renderedList,
    // because we can select items programatically that are not currently visible
    if (this.type === 'multiple') {
      this.checkListAgainstValueMultiple()
    } else {
      this.checkListAgainstValueSingle()
    }

    if (this.type === 'text') {
      if (this.truncate) {
        this.checkTruncationInTextSelect()
      }
    } else {
      requestAnimationFrame(() => {
        this.checkIfTextOverflows()
      })
    }
  }

  @Watch('emittedValue')
  onUpdateEmittedValue() {
    // Every time this.emittedValue is changed, we emit it, except when it is equal to this.value. The user will change
    // the value of the component on his side and this.onUpdateValue is triggered.
    if (isEqual(this.value, this.emittedValue)) return

    this.value = this.type === 'multiple' ? [...this.emittedValue] : this.emittedValue

    this.wppChange.emit({
      value: this.value,
      selectedItems: this.getSelectedItems(),
      ...(this.name !== undefined && { name: this.name }),
      ...(this.type === 'combined'
        ? { inputValue: this.inputValue || '' }
        : this.shouldShowSearch && { inputValue: this.searchText }),
    })
  }

  private getSelectedItems = () => {
    if (this.type === 'multiple') {
      const selectedItems = this.internalList.filter((item: ListItemInterface) =>
        this.emittedValue.some((emittedValueItem: ListValue) => isEqual(emittedValueItem, item.value)),
      )

      return selectedItems
    } else {
      const selectedItem: ListItemInterface = this.internalList.find((listItem: ListItemInterface) =>
        isEqual(listItem.value, this.emittedValue),
      ) as ListItemInterface

      return [selectedItem]
    }
  }

  @Watch('list')
  onUpdateList() {
    // When "enableStaticOptions=true", only the initial list is taken into consideration.
    if (this.enableStaticOptions) return

    this.renderedText = ''

    if (this.type === 'multiple') {
      this.onUpdateListMultiple()
    } else {
      this.onUpdateListSingle()
    }

    // Every time "this.list" changes, we check if we can still render search input.
    this.setShouldShowSearch()
  }

  @Watch('searchText')
  onUpdateSearchText() {
    if (this.searchText === '') {
      this.internalList.forEach((listItem: ListItemInterface) => {
        listItem.highlight = ''
        listItem.hidden = false
      })

      return
    }

    // When search changes, we also set "highlight=this.searchText" in order to
    // highlight characters in each label.
    const searchTextLowerCase = this.searchText.toLowerCase().trim()

    this.internalList.forEach((listItem: ListItemInterface) => {
      listItem.highlight = this.searchText
      listItem.hidden = !listItem.label.toLowerCase().includes(searchTextLowerCase)
    })
  }

  @Watch('loading')
  onUpdateLoading() {
    if (!this.loading) {
      setTimeout(() => {
        this.updateScrollState()
      }, 50)
    }
  }

  @Watch('maximumSelectedItems')
  onUpdateMaximumSelectedItems() {
    this.canSelectAll = this.maximumSelectedItems ? false : true

    if (this.maximumSelectedItems) {
      if (this.checkedItems === this.maximumSelectedItems) {
        this.hasReachedLimit = false

        this.disableOtherElements()
        this.setRenderedTextMultiple()

        return
      } else if (this.checkedItems > this.maximumSelectedItems) {
        this.hasReachedLimit = false

        const values = (this.value as any[]).slice(0, this.maximumSelectedItems)

        this.emittedValue = values

        return
      }
    }

    this.enablePreviousElements()
    this.setRenderedTextMultiple()
  }

  @Watch('messageInTooltip')
  @Watch('message')
  @Watch('messageType')
  onUpdateMessage() {
    this.checkMessageInTooltip()
  }

  /**
   * Sets focus on the select and opens the dropdown.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.handleClick(true)
  }

  componentWillLoad() {
    this.versionToCompare = (version as string).slice(1).split('-').join('')

    this.checkMessageInTooltip()

    // Specific "componentWillLoad()" behaviour based on type of component.
    if (this.type === 'multiple') {
      if (!Array.isArray(this.value)) {
        throw new Error(MULTIPLE_SELECT_SINGLE_VALUE_ERROR)
      }

      // Search is controlled by the component, so initially all items should have "hidden: false"
      this.internalList = [
        ...this.list.map((item: ListItemInterface) => ({
          ...item,
          selectable: true,
          multiple: true,
          hidden: false,
          checked: false,
        })),
      ]

      if (this.value.length > 0) {
        this.checkListAgainstValueMultiple()
      } else {
        this.canClearAll = false
        this.canSelectAll = true
      }
    } else {
      this.internalList = [
        ...this.list.map((listItem: ListItemInterface) => ({ ...listItem, hidden: false, checked: false })),
      ]

      if (this.value) {
        this.checkListAgainstValueSingle()
      }
    }
  }

  componentDidLoad() {
    setTimeout(() => {
      if (this.displayValue === undefined) {
        this.createTippyInstance()
      }

      if (
        this.anchorRef &&
        this.autoFocus &&
        document.activeElement?.tagName.toLowerCase() !== transformToVersionedTag(`${this.LIB_COMPONENTS_PREFIX}select`)
      ) {
        // If multiple select elements on a page have the "this.autoFocus=true" property,
        // we should open only the first select with this property.
        this.handleClick(true)
      }

      if (this.type !== 'text') {
        this.resizeObserver = new ResizeObserver(this.checkIfTextOverflows)

        if (this.resizeObserver && this.anchorRef) {
          this.resizeObserver.observe(this.anchorRef)
        }
      } else {
        if (this.truncate) {
          this.checkTruncationInTextSelect()
        }
      }
    })
  }

  connectedCallback() {
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance()
    }
  }

  disconnectedCallback() {
    if (this.tippyInstance) {
      this.tippyInstance.destroy()
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private checkMessageInTooltip = () => {
    const oldValue = this.isRenderMessageInTooltip

    const shouldRenderInTooltip = !!(
      this.messageInTooltip &&
      this.message &&
      (this.messageType === 'error' || this.messageType === 'warning')
    )

    if (oldValue !== shouldRenderInTooltip) {
      this.isRenderMessageInTooltip = shouldRenderInTooltip

      setTimeout(() => {
        if (this.portalRef && this.anchorRef) {
          if (this.tippyInstance) this.tippyInstance.destroy()

          this.createTippyInstance()
        }
      }, 100)
    } else {
      this.isRenderMessageInTooltip = shouldRenderInTooltip
    }
  }

  private checkTruncationInTextSelect = () => {
    this.shouldTruncate = false

    setTimeout(() => {
      const textEl = this.host.shadowRoot?.querySelector('#select-text')

      if (textEl) {
        this.shouldTruncate = textEl.clientWidth > this.host.clientWidth
      }
    }, TRUNCATION_DELAY)
  }

  private onUpdateListSingle = () => {
    // This function is called when "this.list" has been updated in the single select.
    this.internalList = [
      ...this.list.map((listItem: ListItemInterface) => {
        const hidden: boolean = !listItem.label.includes(this.searchText)
        const checked: boolean = isEqual(listItem.value, this.value)

        if (checked) {
          this.renderedText = listItem.label
        }

        return {
          ...listItem,
          checked,
          hidden,
        }
      }),
    ]
  }

  private onUpdateListMultiple = () => {
    // This function is called when "this.list" has been updated in the multiple select.
    // We count again all checked and visible items and all disabled or hidden items.
    let checkedItems = 0
    let disabledItems = 0

    this.internalList = [
      ...this.list.map((listItem: ListItemInterface) => {
        const hidden: boolean = !listItem.label.includes(this.searchText)
        const checked: boolean = !!this.value.find((valueItem: any) => isEqual(listItem.value, valueItem))

        if (listItem.disabled) {
          disabledItems++
        } else if (checked) {
          checkedItems++
        }

        return {
          ...listItem,
          hidden,
          checked,
          selectable: true,
          multiple: true,
        }
      }),
    ]

    this.updateItemsAfterChangeMultiple(checkedItems, disabledItems)
  }

  private updateItemsAfterChangeMultiple = (checkedItems: number, disabledItems: number) => {
    this.checkedItems = checkedItems
    this.disabledItems = disabledItems

    this.setRenderedTextMultiple()

    if (this.maximumSelectedItems) {
      if (this.checkedItems >= this.maximumSelectedItems) {
        this.disableOtherElements()
      } else {
        this.enablePreviousElements()
      }
    }

    if (this.internalList.length === 0) {
      this.canSelectAll = false
      this.canClearAll = false
    } else {
      this.canSelectAll = this.maximumSelectedItems
        ? false
        : this.checkedItems < this.internalList.length - this.disabledItems
      this.canClearAll = this.checkedItems >= 1
    }
  }

  private checkListAgainstValueSingle = () => {
    // Check items against value provided to component and set renderedText in input. This function is called for single-select.
    this.internalList.forEach((listItem: ListItemInterface) => {
      const checked: boolean = isEqual(listItem.value, this.value)

      if (checked) {
        this.renderedText = listItem.label
      }

      listItem.checked = checked
    })
  }

  private checkListAgainstValueMultiple = () => {
    // Every time value changes, we make updates to the list and count again
    // the "checked and visible" items and "disabled or hidden" ones.
    let checkedItems = 0
    let disabledItems = 0

    this.internalList.forEach((listItem: ListItemInterface) => {
      const checked: boolean = !!this.value.find((item: any) => isEqual(listItem.value, item))

      if (listItem.disabled) {
        disabledItems++
      } else if (checked) {
        checkedItems++
      }

      listItem.checked = checked
    })

    this.updateItemsAfterChangeMultiple(checkedItems, disabledItems)
  }

  protected renderList = (): HTMLElement => {
    if (!this.isOpen) {
      return <Fragment />
    }

    if (this.loading) {
      return (
        <div class="loading-container">
          <wpp-spinner />
          <wpp-typography type="s-body">{this.locales.loadingText}</wpp-typography>
        </div>
      )
    }

    if (this.internalList.length === 0) {
      return (
        <wpp-typography class="nothing-found" type="s-body">
          {this.locales.emptyText}
        </wpp-typography>
      )
    }

    let hiddeItemsCount: number = 0

    return (
      <Fragment>
        {this.internalList.map((item: ListItemInterface) => {
          const { label, hidden, ...rest } = item

          if (hidden) {
            hiddeItemsCount++

            if (hiddeItemsCount === this.internalList.length) {
              return (
                <wpp-typography class="nothing-found" type="s-body">
                  {this.locales.emptyText}
                </wpp-typography>
              )
            }

            return null
          }

          return (
            <wpp-list-item
              onWppChangeListItem={this.handleClickListItem}
              key={label}
              {...rest}
              id={item.id !== undefined ? `${this.LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined}
            >
              <p slot="label">{label}</p>

              {item?.slots && this.renderSlotsInListItem(item.slots, Boolean(label)).map((slotNode: any) => slotNode)}
            </wpp-list-item>
          )
        })}
      </Fragment>
    )
  }

  private renderSlotsInListItem = (slots: any[], isLabelExists: boolean): (VNode | null)[] =>
    slots
      .map(slotElement => {
        if (!slotElement) return null
        const { type, props, slot, children } = slotElement

        if (props.slot === 'label' && isLabelExists) return null

        if (!type.startsWith(this.LIB_COMPONENTS_PREFIX)) {
          const { children: text, ...restProps } = props
          const Tag = type

          return (<Tag {...restProps}>{text}</Tag>) as VNode
        }

        if (!children) return h(transformToVersionedTag(type), { slot, ...props }) as VNode

        const slotNode = h(transformToVersionedTag(type), { slot, ...props }) as VNode

        slotNode.$children$ = Array.isArray(children)
          ? (this.renderSlotsInListItem(Array.from(children), isLabelExists) as VNode[])
          : (this.renderSlotsInListItem([children], isLabelExists) as VNode[])

        return slotNode
      })
      .filter(item => item !== null)

  private disableOtherElements = () => {
    if (this.hasReachedLimit) return

    let disabledItems = 0

    // This function is called when items in the list are checked
    // and "maximumSelectedItems" property is defined.
    this.internalList.forEach((listItem: ListItemInterface) => {
      if (listItem.hasBeenInternallyDisabled || listItem.disabled || !(listItem.disabled || listItem.checked)) {
        disabledItems++
      }

      listItem.hasBeenInternallyDisabled = listItem.hasBeenInternallyDisabled
        ? true
        : listItem.disabled || listItem.checked
        ? null
        : true
      listItem.disabled = listItem.disabled ? listItem.disabled : !listItem.checked
    })

    this.disabledItems = disabledItems
    this.hasReachedLimit = true
  }

  private enablePreviousElements = () => {
    if (!this.hasReachedLimit) return

    let disabledItems = 0

    // This function is called to revert the effects of "this.disableOtherElements"
    this.internalList.forEach((listItem: ListItemInterface) => {
      if (listItem.hasBeenInternallyDisabled) {
        listItem.disabled = false
        listItem.hasBeenInternallyDisabled = null
      }

      if (this.disabled) {
        disabledItems++
      }
    })

    this.disabledItems = disabledItems
    this.hasReachedLimit = false
  }

  protected checkIfTextOverflows = () => {
    if (this.inputRef) {
      this.inputRef.style.width = this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto'
      this.textOverflows = this.inputRef.scrollWidth > this.inputRef.clientWidth
    }
  }

  private setRenderedTextMultiple = () => {
    const labels: string[] = []
    let numberOfExtraItems = 0

    // We need to parse this.value in order to get the labels in the exact order they
    // were selected.
    this.value.forEach((valueItem: any) => {
      const listItem: ListItemInterface | undefined = this.internalList.find((listItem: ListItemInterface) =>
        isEqual(valueItem, listItem.value),
      )

      if (listItem) {
        if (labels.length >= this.maxItemsToDisplay) {
          numberOfExtraItems++
        } else {
          labels.push(listItem.label)
        }
      }
    })

    if (numberOfExtraItems > 0) {
      this.renderedText = `${labels.join(', ')}, +${numberOfExtraItems}`
    } else {
      this.renderedText = labels.join(', ')
    }
  }

  protected onShowDropdown = (instance: Instance<Props>): false | void => {
    if (!this.anchorRef) return false

    if (this.type === 'text') {
      this.onShowDropdownText(instance)
    } else {
      // Set width of dropdown based on "dropdownWidth" property and "this.anchorRef"
      if (this.dropdownWidth !== 'auto') {
        instance.popper.style.width = `${Math.max(this.anchorRef.clientWidth, parseInt(this.dropdownWidth, 10))}px`
      } else {
        instance.popper.style.width = `${this.anchorRef.clientWidth}px`
      }
    }

    if (this.dropdownConfig?.onShow) {
      if (this.dropdownConfig.onShow(instance) === false) {
        return false
      }

      this.dropdownConfig?.onShow(instance)
    }

    this.isOpen = true
  }

  private onShowDropdownText = (instance: Instance<Props>) => {
    if (!this.anchorRef) return

    if (this.dropdownWidth === 'auto') {
      if (this.anchorRef.clientWidth < 350) {
        instance.setProps({ maxWidth: '350px' })

        instance.popper.style.width = 'auto'
      } else {
        instance.setProps({ maxWidth: `${this.anchorRef.clientWidth}px` })
        instance.popper.style.width = `${this.anchorRef.clientWidth}px`
      }
    } else {
      const widthValue = Math.max(this.anchorRef.clientWidth, parseInt(this.dropdownWidth))

      instance.setProps({ maxWidth: `${widthValue}px` })
      instance.popper.style.width = `${widthValue}px`
    }
  }

  protected onHiddenDropdown = (instance: Instance<Props>) => {
    this.isOpen = false

    this.searchText = ''

    if (this.dropdownConfig?.onHidden) {
      this.dropdownConfig?.onHidden(instance)
    }
  }

  protected createTippyInstance = () => {
    if (!this.anchorRef || !this.portalRef) return

    this.tippyInstance = menuListConfig({
      anchor: this.anchorRef,
      content: this.portalRef,
      ...DEFAULT_DROPDOWN_CONFIG,
      ...this.dropdownConfig,
      onShow: (instance: Instance<Props>) => {
        if (this.disabled) return false

        this.setShouldShowSearch()

        // Re-position in case it was not position correctly initially.
        setTimeout(() => {
          instance.popperInstance?.update()
        }, 0)

        return this.onShowDropdown(instance)
      },
      onShown: (instance: Instance<Props>) => {
        this.updateScrollState()

        if (['single', 'multiple'].includes(this.type)) {
          this.focusSearchInput()
        } else {
          this.focusFirstListItem()
        }

        if (this.dropdownConfig?.onShown) {
          this.dropdownConfig?.onShown(instance)
        }
      },
      onHide: (instance: Instance<Props>) => {
        this.onBlur()

        if (this.dropdownConfig?.onHide) {
          return this.dropdownConfig.onHide(instance)
        }
      },
      onHidden: this.onHiddenDropdown,
      onClickOutside: (instance: Instance<Props>, event: Event) => {
        if (this.tippyInstance && !isEventTargetContained(this.host, event)) {
          this.tippyInstance.hide()
        }

        if (this.dropdownConfig?.onClickOutside) {
          this.dropdownConfig.onClickOutside(instance, event)
        }
      },
    })
  }

  private focusFirstListItem = () => {
    if (!this.portalRef) return

    const listItem: HTMLWppListItemElement | null =
      this.portalRef.querySelector<HTMLWppListItemElement>('.wpp-list-item')

    if (!listItem) return

    listItem.setFocus()
  }

  private focusSearchInput = () => {
    if (!this.portalRef) return

    const inputEl: HTMLWppInputElement | null = this.portalRef.querySelector('.select-portal-search-input')

    setTimeout(() => {
      if (!inputEl) return

      inputEl.setFocus()
    }, 0)
  }

  protected handleSearch = (event: WppInputCustomEvent<InputChangeEventDetail>) => {
    const searchValue: string | undefined = event.detail.value

    if (searchValue === undefined) {
      this.searchText = ''

      return
    }

    this.searchText = searchValue
  }

  protected handleClickListItem = (event: WppListItemCustomEvent<ListItemChangeEventDetail>) => {
    const listItemValue: ListValue | undefined = event.detail.value

    if (listItemValue === undefined) return

    if (this.type === 'multiple') {
      this.onClickListItemMultiple(listItemValue)
    } else {
      this.onClickListItemSingle(listItemValue)
    }
  }

  private onClickListItemSingle = (listItemValue: ListValue) => {
    if (isEqual(this.value, listItemValue)) {
      this.tippyInstance?.hide()

      return
    } else {
      this.emittedValue = listItemValue

      // Hide dropdown only when user clicked a new item.
      this.tippyInstance?.hide()
    }
  }

  private onClickListItemMultiple = (listItemValue: ListValue) => {
    const valueItem = this.value.find((item: any) => isEqual(item, listItemValue))

    if (valueItem) {
      this.emittedValue = [...this.value.filter((item: SelectOption) => !isEqual(item, listItemValue))]
    } else {
      this.emittedValue = [...this.value, listItemValue]
    }
  }

  private updateScrollState = () => {
    if (!this.listRef) return

    this.withScroll = this.listRef.scrollHeight > this.listRef.clientHeight
  }

  protected handleSelectAll = () => {
    // We select all the items that are not disabled. Even hidden ones.
    const valueOfItems: any[] = []

    this.internalList.forEach((listItem: ListItemInterface) => {
      if (!listItem.disabled) {
        valueOfItems.push(listItem.value)
      }

      listItem.checked = listItem.disabled ? listItem.checked : true
    })

    this.emittedValue = [...valueOfItems]
  }

  protected handleClearAll = () => {
    // We un-check all items that are not disabled. Even hidden ones.
    const valueOfItems: any[] = []

    this.internalList.forEach((listItem: ListItemInterface) => {
      if (listItem.checked && listItem.disabled) {
        valueOfItems.push(listItem.value)
      }

      listItem.checked = listItem.disabled ? listItem.checked : false
    })

    this.emittedValue = [...valueOfItems]
  }

  protected setShouldShowSearch = () => {
    if (!this.host) return false

    if (this.type === 'text') {
      this.shouldShowSearch = false

      return
    }

    this.shouldShowSearch =
      (this.host?.getAttributeNames().includes('with-search') && !['auto', false].includes(this.withSearch)) ||
      (this.withSearch === 'auto' && this.list.length >= MINIMUM_ITEMS_COUNT_TO_DISPLAY_SEARCH)
  }

  protected handleClick = (shouldFocus?: boolean) => {
    if (!this.tippyInstance || this.disabled || this.displayValue !== undefined) return

    if (shouldFocus) {
      this.focusType = FOCUS_TYPE.TAB

      this.anchorRef?.focus()
    }

    if (this.tippyInstance.state.isVisible) {
      this.tippyInstance.hide()
    } else {
      this.tippyInstance.show()
    }
  }

  protected updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      icon: '[slot="icon-start"]',
    })

    this.hasIconStartSlot = !emptyStates.icon
  }

  protected onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.focusType = FOCUS_TYPE.TAB
    }
  }

  protected onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.tippyInstance?.show()
    }
  }

  protected onKeyDownPortal = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      this.tippyInstance?.hide()
      this.anchorRef?.focus()

      this.focusType = FOCUS_TYPE.TAB
    }
  }

  protected onFocus = (event: FocusEvent): void => {
    this.wppFocus.emit(event)
  }

  protected onBlur = (event?: FocusEvent): void => {
    if (event?.relatedTarget && this.portalRef && this.portalRef.contains(event.relatedTarget as Element)) {
      return
    }

    this.focusType = FOCUS_TYPE.NONE
    this.wppBlur.emit(event)
  }

  protected hasErrorsOrWarnings = (type: 'error' | 'warning') =>
    this.message ? this.message.length > 0 && this.messageType === type : false

  protected iconStartCssClasses = () => ({
    'icon-start': true,
    'slot-hidden': !this.hasIconStartSlot,
    disabled: this.disabled,
  })

  protected labelCssClasses = () => ({
    disabled: this.disabled,
  })

  render() {
    if (this.type === 'single') {
      return renderSingleSelect.call(this, true, this.size, this.isRenderMessageInTooltip)
    }

    if (this.type === 'multiple') {
      return renderMultipleSelect.call(this)
    }

    if (this.type === 'text') {
      return renderTextSelect.call(this)
    }

    return renderCombinedSelect.call(this)
  }
}
