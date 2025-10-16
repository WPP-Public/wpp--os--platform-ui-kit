import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core'
import { Instance } from 'tippy.js'
import isEqual from 'lodash/isEqual'
import {
  autoFocusElement,
  isEventTargetContained,
  selectDropdownWidth,
  transformToVersionedTag,
} from '../../utils/utils'
import { menuListConfig } from '../../common/menuListConfig'
import { BaseComponent } from '../../interfaces/base-component'
import { InlineMessage } from '../../interfaces/inline-message'
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common'
import {
  SearchChangeEventDetail,
  SearchLabelConfig,
  SearchLocales,
  SearchGetOptionIdHandler,
  SearchGetOptionLabelHandler,
  SearchDefaultOption,
  SearchOption,
} from './types'
import { ListItemChangeEventDetail } from '../wpp-list-item/types'
import { Z_INDEX } from '../../common/consts'
import { BLUR_TIME, DROPDOWN_ANIMATION_TIME, LOCALES_DEFAULTS } from './const'

import { LoadMoreHandler, CancellablePromise } from '../wpp-autocomplete/types'

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15

/**
 * @slot - Should contain a list of `wpp-list-item` elements that represents the current options list. The default slot, without the name attribute.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part dropdown-header - Dropdown header
 * @part options - Options list container
 * @part anchor - Search input tooltip
 */
@Component({
  tag: 'wpp-search',
  styleUrl: 'wpp-search.scss',
  shadow: true,
})
export class WppSearch implements BaseComponent, InlineMessage {
  private inputEl?: HTMLInputElement
  private triggerEl?: HTMLDivElement
  private dropdownEl?: HTMLDivElement
  private valuesContainerEl?: HTMLDivElement
  private valuesResizeObserver?: ResizeObserver
  private optionElements?: HTMLWppListItemElement[]
  private shownOptionElements?: HTMLWppListItemElement[]
  private tippyInstance?: Instance
  private infiniteLoadingPromise?: CancellablePromise<void>
  private optionsListEl?: HTMLDivElement
  private placeholderEl?: HTMLWppTypographyElement
  private hasActiveEllipses?: boolean = false
  private observer: MutationObserver
  private _locales: SearchLocales = LOCALES_DEFAULTS

  // Used instead of Tippy's `state.isShown`, which is not updated when transitioning
  private isDropdownShown: boolean = false

  @Element() host: HTMLWppSearchElement

  @State() isFocused: boolean = false

  @State() searchValue: string = ''

  @State() isEmptyOptions: boolean = true

  @State() isInfiniteLoading: boolean = false

  @State() focusType: FOCUS_TYPE

  @State() isInComponent: boolean = false

  /**
   * Defines the search name.
   */
  @Prop() readonly name?: string

  /**
   * If the component is loading.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the component should be focused on page load
   */
  @Prop() readonly autoFocus: boolean = false

  /**
   * Defines the input placeholder.
   */
  @Prop() readonly placeholder?: string

  /**
   * Defines the selected items.
   */
  @Prop({ mutable: true }) value: SearchOption[] = []

  /**
   * Helper that gets ID values from the search options.
   */
  @Prop() readonly getOptionId: SearchGetOptionIdHandler = item => (item as SearchDefaultOption).id

  /**
   * Helper that gets a label from the search options.
   */
  @Prop() readonly getOptionLabel: SearchGetOptionLabelHandler = item => (item as SearchDefaultOption).label

  /**
   * If `true`, the input is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Defines the input message.
   */
  @Prop() readonly message?: string

  /**
   * Defines the input message type.
   */
  @Prop() readonly messageType?: InputMessageTypes

  /**
   * Defines the input message maximum length.
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * Defines the input size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Indicates locales for search component
   */
  @Prop() readonly locales: Partial<SearchLocales> = {}

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: SearchLabelConfig

  /**
   * If `true`, search automatically filters options on search instead of relying on updates of the slotted options list.
   * This prop shouldn't change after the component is rendered.
   */
  @Prop() readonly simpleSearch: boolean = false

  /**
   * Defines the dropdown width.
   */
  @Prop() readonly dropdownWidth: 'auto' | string = 'auto'

  /**
   * If `true`, the search will highlight options
   */
  @Prop() readonly highlight: boolean = true

  /**
   * If `true`, the dropdown will be opened on click
   */
  @Prop() readonly openDropdownOnClick: boolean = false

  /**
   * If `true`, search will show the dropdown with options
   */
  @Prop() readonly showOptions: boolean = true

  /**
   * If the autocomplete options list has infinite scroll.
   * This overrides the `simpleSearch` prop and considers it as `false`.
   * This prop shouldn't change after the component is rendered.
   */
  @Prop() readonly infinite: boolean = false

  /**
   * If infinite scroll can request more pages to load.
   */
  @Prop() readonly infiniteLastPage: boolean = true

  /**
   * Helper that requests to load more options on infinite scroll.
   * This request is considered done when the returned `Promise` is settled.
   * This prop is required when `infinite` is set to `true`.
   */
  @Prop() readonly loadMore?: LoadMoreHandler

  /**
   * Emitted when the search value changes
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<SearchChangeEventDetail>

  /**
   * Emitted when the search receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the search loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<void>

  /**
   * Emitted when the search value changes
   */
  @Event({ bubbles: false, composed: false }) wppSearchValueChange: EventEmitter<string>

  @Listen('wppChangeListItem', { capture: true })
  handleOptionToggle(event: CustomEvent<ListItemChangeEventDetail>) {
    this.value = event.detail.checked
      ? [event.detail.value as SearchOption]
      : this.value.filter(option => this.getOptionId(option) !== this.getOptionId(event.detail.value as SearchOption))

    this.optionElements?.forEach(option => {
      option.checked = this.isOptionChecked(option)
    })

    this.searchValue = ''

    this.wppChange.emit({
      value: this.value,
      reason: event.detail.checked ? 'selectOption' : 'removeOption',
      name: this.name,
    })
  }

  @Watch('value')
  onNextValueChange() {
    this.hideDropdown()
    this.blurInput()

    this.optionElements?.forEach(option => {
      option.checked = this.isOptionChecked(option)
    })
  }

  @Watch('searchValue')
  onSearchValueChange(initSearchValue: string) {
    const searchValue = initSearchValue.trim()

    if (!this.hasSimpleSearch()) {
      this.wppSearchValueChange.emit(searchValue)

      this.optionElements?.forEach(option => {
        option.checked = this.isOptionChecked(option)

        if (this.highlight) option.highlight = this.searchValue
      })

      return
    }

    if (!searchValue && !this.openDropdownOnClick) {
      this.optionElements?.forEach(option => {
        option.hidden = true
      })
      this.shownOptionElements = []
      this.isEmptyOptions = false

      return []
    }

    this.shownOptionElements = []

    this.optionElements?.forEach(option => {
      option.hidden = this.isOptionHidden(option)
      option.checked = this.isOptionChecked(option)

      if (this.highlight) {
        option.highlight = searchValue
      }

      if (!option.hidden) {
        this.shownOptionElements!.push(option)
      }
    })

    this.isEmptyOptions = !this.shownOptionElements.length

    this.wppSearchValueChange.emit(searchValue)
  }

  @Watch('dropdownConfig')
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  @Watch('loading')
  onLoadingChange(loading: boolean) {
    setTimeout(() => {
      this.handleOptionsChange()
    }, 0)

    if (loading) {
      this.scrollOptionsToTop()

      if (this.isInfiniteLoading) {
        this.isInfiniteLoading = false

        if (this.infiniteLoadingPromise) {
          this.infiniteLoadingPromise.cancelled = true
        }
      }
    }
  }

  @Watch('isInComponent')
  updateIsInComponent(value: boolean) {
    if (!value) this.handleBlur()
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<SearchLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  /**
   * Sets focus on native input
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputEl?.focus()
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }
    this.optionElements = this.getOptionElements()
    this.updateOptions()
  }

  componentDidLoad() {
    // Watches the size of values container, which changes when
    // search is focused and `limitLines` prop is set
    this.valueResizeObserver()
    this.createTippyInstance()
    autoFocusElement(this.autoFocus, this.inputEl)

    this.observer = new MutationObserver(() => {
      this.handleOptionsChange()
    })

    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    })
  }

  disconnectedCallback() {
    if (this.valuesResizeObserver) this.valuesResizeObserver.disconnect()
    if (this.observer) this.observer.disconnect()
    this.tippyInstance?.destroy()
  }

  connectedCallback() {
    this.valueResizeObserver()

    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance()
    }
  }

  private valueResizeObserver = () => {
    if (this.valuesContainerEl) {
      this.valuesResizeObserver = new ResizeObserver(() => {
        if (this.isDropdownShown) {
          this.tippyInstance?.popperInstance?.forceUpdate()
        }
      })

      if (this.valuesResizeObserver) {
        this.valuesResizeObserver.observe(this.valuesContainerEl)
      }
    }
  }

  private createTippyInstance = () => {
    if (this.triggerEl && this.dropdownEl) {
      this.tippyInstance = menuListConfig({
        anchor: this.triggerEl,
        content: this.dropdownEl,
        zIndex: Z_INDEX.SEARCH,
        ...this.dropdownConfig,
        duration: DROPDOWN_ANIMATION_TIME,
        trigger: 'manual',
        maxWidth: 'none',
        hideOnClick: false,
        popperOptions: {
          ...this.dropdownConfig?.popperOptions,
          modifiers: [
            ...(this.dropdownConfig?.popperOptions?.modifiers || []),
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top'],
              },
            },
          ],
        },
        onClickOutside: (_, event: Event) => {
          if (!isEventTargetContained(this.host, event)) {
            this.hideDropdown()
          }
        },
        onHidden: () => {
          this.isInComponent = false
        },
      })
    }
  }

  private hasClearButton = (): boolean => !!this.value.length && !this.isDropdownShown

  private hasSearchButton = (): boolean => true

  private hasSimpleSearch = (): boolean => this.simpleSearch && !this.infinite

  private canLoadMore = () => this.infinite && !this.infiniteLastPage && this.loadMore && !this.isInfiniteLoading

  private requestLoadMore = () => {
    if (this.loadMore) {
      this.isInfiniteLoading = true

      const promise: CancellablePromise<void> = this.loadMore().finally(() => {
        if (!promise.cancelled) {
          this.isInfiniteLoading = false
          this.infiniteLoadingPromise = undefined
        }
      })

      this.infiniteLoadingPromise = promise
    }
  }

  private isOptionHidden = (option: HTMLWppListItemElement) => {
    if (!this.hasSimpleSearch()) {
      return false
    }

    const trimmedSearch = this.searchValue.trim().toLocaleLowerCase()

    if (!trimmedSearch) return false

    if (trimmedSearch.length > 0) {
      const optionValue = option.value

      if (!optionValue) {
        return false
      }

      const optionLabel = (this.getOptionLabel(optionValue as SearchOption) || '').toLocaleLowerCase()

      return !optionLabel.includes(trimmedSearch)
    }

    return false
  }

  private isOptionChecked = (option: HTMLWppListItemElement): boolean => {
    if (option.value && this.value.length) {
      const checkedID = this.getOptionId(option.value as SearchOption)

      return this.getOptionId(this.value[0]) === checkedID
    }

    return false
  }

  private scrollOptionsToTop = () => {
    if (this.optionsListEl) {
      this.optionsListEl.scrollTop = 0
    }
  }

  private isOptionNodesChanged = (nextOptions: HTMLWppListItemElement[]) =>
    nextOptions.length !== this.optionElements?.length ||
    !nextOptions.every((el, index) => this.optionElements?.[index] === el)

  private getOptionElements = (): HTMLWppListItemElement[] =>
    Array.from(this.host.querySelectorAll<HTMLWppListItemElement>(transformToVersionedTag('wpp-list-item')))

  private focusInput = () => {
    this.inputEl?.focus()
  }

  private blurInput = () => {
    this.inputEl?.blur()
  }

  private showDropdown = () => {
    if (!this.isDropdownShown) {
      this.isDropdownShown = true
      this.tippyInstance?.show()
    }
  }

  private hideDropdown = () => {
    if (this.isDropdownShown) {
      this.tippyInstance?.hide()
      this.isDropdownShown = false
    }
  }

  private updateOptions = () => {
    this.shownOptionElements = []
    this.optionElements?.forEach(option => {
      option.selectable = true
      option.hidden = this.isOptionHidden(option)
      option.checked = this.isOptionChecked(option)

      if (this.highlight) {
        option.highlight = this.searchValue
      }

      if (!option.hidden) {
        this.shownOptionElements!.push(option)
      }
    })

    this.isEmptyOptions = !this.shownOptionElements.length
  }

  private handleTriggerContainerMouseDown = (event: Event) => {
    if (!this.disabled) {
      // Prevent input blur when the component is used
      if (event.target !== this.inputEl) {
        event.preventDefault()
      }
    }
  }

  private handleTriggerClick = () => {
    if (!this.isFocused) {
      this.focusInput()
    }
  }

  private handleMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private handleInputMouseDown = () => {
    if (this.openDropdownOnClick) {
      this.showDropdown()
    }
  }

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private handleInput = () => {
    this.focusType = FOCUS_TYPE.NONE

    this.searchValue = this.inputEl?.value || ''

    if (this.searchValue) {
      this.showDropdown()
    } else if (!this.value.length && !this.openDropdownOnClick) {
      this.hideDropdown()
    }
  }

  private handleFocus = (event: FocusEvent) => {
    this.isInComponent = true

    if (!this.isFocused) {
      this.isFocused = true

      if (this.value.length) {
        this.showDropdown()
      }

      if (this.canLoadMore() && this.isEmptyOptions && !this.loading) {
        this.requestLoadMore()
      }
    }

    this.wppFocus.emit(event)
  }

  private handleOptionsScroll = (event: UIEvent) => {
    if (this.canLoadMore()) {
      const container = event.target as HTMLDivElement
      const scrolledToBottom = container.scrollHeight - container.clientHeight - container.scrollTop

      if (scrolledToBottom < INFINITE_SCROLL_THRESHOLD) {
        this.requestLoadMore()
      }
    }
  }

  // We allow input blur only when the dropdown is hidden or the component got disabled.
  // Outside clicks will close the dropdown first.
  private handleBlur = () => {
    if (this.isInComponent) return

    this.focusType = FOCUS_TYPE.NONE

    if (this.disabled) {
      this.hideDropdown()
    }

    if (!this.isDropdownShown) {
      this.isFocused = false

      // Need setTimeout method to wait until closing animation is finished
      setTimeout(() => {
        this.searchValue = ''
      }, BLUR_TIME)
    } else {
      this.focusInput()
    }

    this.wppBlur.emit()
  }
  private isEllipsisActive = (e: HTMLElement) => e.offsetWidth < e.scrollWidth

  // For some reason this handler is not triggered by the browser
  // while Tippy instance is being created. Though it is covered
  // after the dropdown is opened, since Tippy moves the dropdown node.
  private handleOptionsChange = () => {
    const placeholderContent = this.placeholderEl?.shadowRoot?.querySelector('[part="typography"]')

    this.hasActiveEllipses = placeholderContent ? this.isEllipsisActive(placeholderContent as HTMLElement) : false

    const currentNodes = this.getOptionElements()
    const isNodesChanged = this.isOptionNodesChanged(currentNodes)

    if (isNodesChanged) {
      this.optionElements = currentNodes
      this.updateOptions()
    }
  }

  private handleClearClick = (event: Event) => {
    event.stopPropagation()
    event.preventDefault()

    this.value = []

    this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name })
  }

  private hostCssClasses = () => ({
    'wpp-search': true,
    'wpp-disabled': this.disabled,
  })

  private searchWrapperCssClasses = () => ({
    'search-wrapper': true,
  })

  private triggerCssClasses = () => ({
    trigger: true,
    'with-value': this.value.length > 0 || this.searchValue.length > 0,
    disabled: this.disabled,
    focused: this.isFocused,
    [`${this.messageType}`]: !!this.messageType,
    [`size-${this.size}`]: !!this.size,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  private inputCssClasses = () => ({
    'search-input': true,
    hidden: !this.isFocused && this.value.length > 0,
  })

  private labelCssClasses = () => ({
    label: true,
    focused: this.isFocused,
  })

  private dropdownListCssClasses = () => ({
    'dropdown-list': true,
    hidden: !this.showOptions,
  })

  private tooltipCSSClasses = () => ({
    'with-tooltip': true,
    visible: !this.isFocused && this.value.length > 0,
  })

  private hostStyle = () => {
    const style: Record<string, string> = {
      '--wpp-list-item-width': '100%',
    }

    return style
  }

  private getInputValue = () => this.searchValue

  private renderInputPlaceholder = () => {
    if ((this.isFocused && !this.searchValue) || this.isDropdownShown || !this.value.length) return null

    return (
      <wpp-typography
        type="s-body"
        class="input-placeholder"
        ref={placeholderEl => (this.placeholderEl = placeholderEl)}
      >
        {this.getOptionLabel(this.value[0])}
      </wpp-typography>
    )
  }

  private getDropdownWidth = () => {
    if (this.dropdownWidth === 'auto') {
      return this.triggerEl ? `${this.triggerEl.offsetWidth}px` : `${this.host.offsetWidth}px`
    }

    return selectDropdownWidth(this.dropdownWidth, this.triggerEl, this.host)
  }

  private renderDropdownContent = () => {
    if (!this.showOptions || !this.isFocused) return null
    if (this.isFocused && !this.searchValue.trim() && !this.openDropdownOnClick) return null

    if (this.value.length && !this.isFocused) return null

    if (this.loading) {
      return (
        <div class="loading">
          <wpp-spinner slot="left" />
          <wpp-typography type="s-body" slot="label">
            {this._locales.loading}
          </wpp-typography>
        </div>
      )
    }

    if (this.isEmptyOptions) {
      return (
        <Fragment>
          <wpp-list-item class="nothing-found-wrapper">
            <wpp-typography type="s-body" class="nothing-found" slot="label">
              {this._locales.nothingFound}
            </wpp-typography>
          </wpp-list-item>
        </Fragment>
      )
    }

    return (
      <Fragment>
        {!!this._locales.dropdownHeader && (
          <wpp-list-item class="dropdown-header" part="dropdown-header">
            <wpp-typography type="s-strong" slot="label">
              {this._locales.dropdownHeader}
            </wpp-typography>
          </wpp-list-item>
        )}
        <slot />
        <div>
          {this.isInfiniteLoading && (
            <div class="infinite-loader">
              <wpp-spinner />
            </div>
          )}
        </div>
      </Fragment>
    )
  }

  render() {
    const style = {
      '--custom-dropdown-width': this.getDropdownWidth(),
    }

    return (
      <Host
        style={this.hostStyle()}
        class={this.hostCssClasses()}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onMouseDown={this.handleMouseDown}
        onKeyUp={this.handleKeyUp}
        aria-disabled={this.disabled}
        aria-required={this.required}
        exportparts="input, dropdown, dropdown-header, options"
      >
        <div class={this.searchWrapperCssClasses()} onMouseDown={this.handleTriggerContainerMouseDown}>
          {this.labelConfig?.text && (
            <wpp-label
              class={this.labelCssClasses()}
              htmlFor={this.name}
              disabled={this.disabled}
              optional={!this.required}
              config={this.labelConfig}
              tooltipConfig={this.labelTooltipConfig}
            />
          )}

          <div
            ref={triggerEl => (this.triggerEl = triggerEl)}
            class={this.triggerCssClasses()}
            onClick={this.handleTriggerClick}
          >
            <div ref={valuesEl => (this.valuesContainerEl = valuesEl)} class="values">
              {this.hasSearchButton() && <wpp-icon-search />}

              {this.hasActiveEllipses ? (
                <wpp-tooltip
                  part="anchor"
                  value={this.value.length ? this.getOptionLabel(this.value[0]) : undefined}
                  class={this.tooltipCSSClasses()}
                >
                  {this.renderInputPlaceholder()}
                </wpp-tooltip>
              ) : (
                this.renderInputPlaceholder()
              )}

              <input
                part="input"
                ref={inputEl => (this.inputEl = inputEl)}
                class={this.inputCssClasses()}
                id={this.name}
                name={this.name}
                type="text"
                value={this.getInputValue()}
                disabled={this.disabled}
                placeholder={this.placeholder}
                required={this.required}
                autocomplete="off"
                onInput={this.handleInput}
                onClick={this.handleInputMouseDown}
                tabIndex={this.disabled ? -1 : 0}
                title=""
              />
            </div>

            <div class="trigger-actions">
              {this.hasClearButton() && <wpp-icon-cross onClick={this.handleClearClick} />}
            </div>
          </div>

          {!!this.message && (
            <wpp-inline-message
              class="inline-message"
              showTooltipFrom={this.maxMessageLength}
              message={this.message}
              type={this.messageType}
            />
          )}
        </div>

        <div class="dropdown" part="dropdown" ref={dropdownEl => (this.dropdownEl = dropdownEl)} style={style}>
          <div
            ref={optionsListEl => (this.optionsListEl = optionsListEl)}
            part="options"
            class={this.dropdownListCssClasses()}
            onScroll={this.handleOptionsScroll}
          >
            {this.renderDropdownContent()}
          </div>
        </div>
      </Host>
    )
  }
}
