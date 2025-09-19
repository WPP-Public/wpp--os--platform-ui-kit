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
  VNode,
  Watch,
} from '@stencil/core'
import {
  autoFocusElement,
  debounce,
  isEventTargetContained,
  selectDropdownWidth,
  transformToVersionedTag,
} from '../../utils/utils'
import { Instance } from 'tippy.js'
import isEqual from 'lodash/isEqual'
import { menuListConfig } from '../../common/menuListConfig'
import { BaseComponent } from '../../interfaces/base-component'
import { InlineMessage } from '../../interfaces/inline-message'
import { DropdownConfig, FOCUS_TYPE, InputMessageTypes } from '../../types/common'
import {
  AutocompleteChangeEventDetail,
  AutocompleteDefaultOption,
  AutocompleteExtendedOption,
  AutocompleteLabelConfig,
  AutocompleteLocales,
  AutocompleteOption,
  AutocompleteTypes,
  CancellablePromise,
  GetOptionIdHandler,
  GetOptionLabelHandler,
  LoadMoreHandler,
} from './types'
import { ListItemChangeEventDetail } from '../wpp-list-item/types'
import { Z_INDEX } from '../../common/consts'
import { DROPDOWN_ANIMATION_TIME, PILL_MARGIN } from './consts'
import { getTempNodeWidthBasedOnLabel } from './utils'

// Load more will be triggered 15px before scroll ends
const INFINITE_SCROLL_THRESHOLD = 15

/**
 * @slot - Should contain a list of `wpp-autocomplete-option` elements that represents the current options list. The default slot, without the name attribute.
 *
 * @part input - Autocomplete input element
 * @part dropdown - Dropdown container
 * @part options - Options list container
 * @part selected-values - Dropdown values for selected values
 */
@Component({
  tag: 'wpp-autocomplete',
  styleUrl: 'wpp-autocomplete.scss',
  shadow: true,
})
export class WppAutocomplete implements BaseComponent, InlineMessage {
  private inputEl?: HTMLInputElement
  private triggerEl?: HTMLDivElement
  private dropdownEl?: HTMLDivElement
  private valuesContainerEl?: HTMLDivElement
  private optionsListEl?: HTMLDivElement
  private valuesResizeObserver?: ResizeObserver
  private optionElements?: HTMLWppListItemElement[]
  private shownOptionElements?: HTMLWppListItemElement[]
  private tippyInstance?: Instance
  private isScrollToInputRequested: boolean = false
  private infiniteLoadingPromise?: CancellablePromise<void>
  private hasChecked?: boolean = false
  private mutationObserver: MutationObserver
  private handleOptionsTimer: NodeJS.Timeout | null
  // Used instead of Tippy's `state.isShown`, which is not updated when transitioning
  private isDropdownShown: boolean = false
  private resizeInPogress: boolean = false
  private selectedPillsWrapperRef?: HTMLDivElement
  private headerWrapperRef?: HTMLDivElement
  private withPills: boolean = false
  private LIB_COMPONENTS_PREFIX = 'wpp-'

  @Element() host: HTMLWppAutocompleteElement

  @State() isFocused: boolean = false

  @State() searchValue: string = ''

  @State() isEmptyOptions: boolean = true

  @State() isInfiniteLoading: boolean = false

  @State() focusType: FOCUS_TYPE

  @State() hiddenSelectedOptionsNumber: number = 0

  @State() isShowMore: boolean = true

  @State() activePillsTruncationState: boolean[] = []

  @State() activePillsTruncationLabelState: boolean[] = []

  @State() suggestionListTruncationState: boolean[] = []

  @State() componentSuggestions: AutocompleteOption[] | AutocompleteExtendedOption[] = []

  @State() lastSelectedElement: HTMLWppListItemElement | null = null

  /**
   * Defines the autocomplete name.
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
   * If the autocomplete options list has infinite scroll.
   * This overrides the `simpleSearch` prop and considers it as `false`.
   * This prop shouldn't change after the component is rendered.
   */
  @Prop() readonly infinite: boolean = false

  /**
   * Title displayed above the suggestions list when the input is focused or clicked.
   */
  @Prop() readonly suggestionsTitle?: string = 'Suggestions'

  /**
   * List of suggestion options to display when the input is focused or clicked.
   */
  @Prop() readonly suggestions: AutocompleteOption[] | AutocompleteExtendedOption[] = []

  /**
   * If infinite scroll can request more pages to load.
   */
  @Prop() readonly infiniteLastPage: boolean = true

  /**
   * Maximum number of options that can be selected. Allowed only in case when 'multiple' prop is set to 'true'.
   * Zero or fewer means there is no limit on number of selected items.
   */
  @Prop() readonly limitSelectedItems: number = 0

  /**
   * Defines the input placeholder.
   */
  @Prop() readonly placeholder?: string

  /**
   * Defines the selected items.
   */
  @Prop({ mutable: true }) value: AutocompleteOption[] = []

  /**
   * Helper that gets ID values from the autocomplete options.
   */
  @Prop() readonly getOptionId: GetOptionIdHandler = item => (item as AutocompleteDefaultOption).id

  /**
   * Helper that gets a label from the autocomplete options.
   */
  @Prop() readonly getOptionLabel: GetOptionLabelHandler = item => (item as AutocompleteDefaultOption).label

  /**
   * Helper that requests to load more options on infinite scroll.
   * This request is considered done when the returned `Promise` is settled.
   * This prop is required when `infinite` is set to `true`.
   */
  @Prop() readonly loadMore?: LoadMoreHandler

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
   * Defines the autocomplete type.
   */
  @Prop() readonly type?: AutocompleteTypes = 'regular'

  /**
   * Defines the input size.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Indicates locales for autocomplete component
   */
  @Prop() readonly locales: AutocompleteLocales = {
    nothingFound: 'Nothing found',
    beginTyping: 'Begin typing',
    more: 'more',
    showMore: 'more',
    showLess: 'Show less',
    selected: count => `${count} selected`,
    loading: 'Loading...',
    createNewElement: 'Create new element',
  }

  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Tooltip config for WppPill's, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly pillTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
    placement: 'right',
  }

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: AutocompleteLabelConfig

  /**
   * If `true`, the autocomplete will give possibility to select multiple options
   */
  @Prop() readonly multiple: boolean = false

  /**
   * If `true`, the autocomplete will show the "Create new element" button. 'displayBtnWhenListEmpty' prop controls when it will be displayed.
   */
  @Prop() readonly showCreateNewElement: boolean = false

  /**
   * Controls when the "Create new element" button is displayed. By default, it is true, meaning that it will be displayed only when
   * the list is empty. If set to "false", then the button will always be displayed.
   */
  @Prop() readonly displayBtnWhenListEmpty: boolean = true

  /**
   * If `true`, autocomplete automatically filters options on search instead of relying on updates of the slotted options list.
   * This prop shouldn't change after the component is rendered.
   */
  @Prop() readonly simpleSearch: boolean = false

  /**
   * If `true`, the search will be persistent and will not be cleared on losing the focus.
   */
  @Prop() readonly persistentSearch: boolean = false

  /**
   * Defines the dropdown width.
   */
  @Prop() readonly dropdownWidth: 'auto' | string = 'auto'

  /**
   * Emitted when the autocomplete value changes
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<AutocompleteChangeEventDetail>

  /**
   * Emitted when the autocomplete receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the autocomplete loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the autocomplete search value changes
   */
  @Event({ bubbles: false, composed: false }) wppSearchValueChange: EventEmitter<string>

  /**
   * Emitted when the "Create new element" button is clicked
   */
  @Event({ bubbles: false, composed: false }) wppCreateNewOption: EventEmitter<string>

  @Listen('wppChangeListItem', { capture: true })
  handleOptionToggle(event: CustomEvent<ListItemChangeEventDetail>) {
    if (!this.multiple && this.toggleSingleAutocompleteListItem(event)) return

    const isCurrValueAlreadySelected = this.value.find(
      option => this.getOptionId(option) === this.getOptionId(event.detail.value as AutocompleteDefaultOption),
    )

    if (this.isSelectedItemsLimitReached() && !isCurrValueAlreadySelected) {
      const listItem = event.target as HTMLWppListItemElement

      listItem.checked = false

      return
    }

    this.value = event.detail.checked
      ? [...(this.multiple ? this.value : []), event.detail.value as AutocompleteOption]
      : this.value.filter(
          option => this.getOptionId(option) !== this.getOptionId(event.detail.value as AutocompleteOption),
        )

    this.wppChange.emit({
      value: this.value,
      reason: event.detail.checked ? 'selectOption' : 'removeOption',
      name: this.name,
    })
  }

  @Watch('loading')
  onLoadingChange(loading: boolean) {
    if (loading) {
      this.scrollOptionsToTop()

      if (this.isInfiniteLoading) {
        this.isInfiniteLoading = false

        if (this.infiniteLoadingPromise) {
          this.infiniteLoadingPromise.cancelled = true
        }
      }
    } else {
      this.addHandleOptionsChangeTimer(true)
    }
  }

  @Watch('value')
  onNextValueChange(newValue: AutocompleteOption) {
    if (newValue.length && this.withPills) {
      requestAnimationFrame(this.validateTruncatedPills)
    }

    if (!newValue.length && this.isDropdownShown && !this.componentSuggestions.length) {
      this.hideDropdown()
    }

    if (this.isSelectedItemsLimitReached()) {
      this.hideDropdown()
      this.blurInput()
      this.searchValue = ''
    }

    if (!this.multiple) {
      this.hideDropdown()
      this.blurInput()
    }
  }

  @Watch('searchValue')
  onSearchValueChange(initSearchValue: string) {
    const searchValue = initSearchValue.trim()

    if (!this.hasSimpleSearch()) {
      this.wppSearchValueChange.emit(searchValue)

      this.addHandleOptionsChangeTimer(true)

      return
    }

    if (!searchValue) {
      if (!(this.componentSuggestions?.length > 0)) {
        this.optionElements?.forEach(option => {
          option.hidden = true
        })
      }
      this.shownOptionElements = []
      this.isEmptyOptions = false
      this.hideDropdown()

      return []
    }

    this.updateOptions()
    this.wppSearchValueChange.emit(searchValue)
  }

  @Watch('dropdownConfig')
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  @Watch('isShowMore')
  onShowMoreChange(isShowMore: boolean) {
    isShowMore
      ? this.selectedPillsWrapperRef?.classList.add('overflow')
      : this.selectedPillsWrapperRef?.classList.remove('overflow')
    requestAnimationFrame(this.validateTruncatedPills)
  }

  @Watch('suggestions')
  onUpdateSuggestions() {
    if (this.searchValue !== '') return

    this.checkSuggestions()
    this.updateOptions()
  }

  /**
   * Sets focus on native input
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputEl?.focus()
  }

  componentWillLoad() {
    this.withPills = this.type === 'regular' && this.multiple

    if (this.limitSelectedItems > 0 && !this.multiple) {
      throw new Error('There could be only one selected item in single mode, otherwise, use multiple mode.')
    }

    this.optionElements = this.getOptionElements()
    if (!this.multiple && this.value.length > 0) {
      this.lastSelectedElement = this.optionElements.filter(
        (el: HTMLWppListItemElement) => (el.value as AutocompleteOption)?.id === this.value[0]?.id,
      )[0]
    }
    this.updateOptions()
  }

  private addHandleOptionsChangeTimer = (shouldUpdate: boolean = false) => {
    if (this.handleOptionsTimer) {
      clearTimeout(this.handleOptionsTimer)
    }

    this.handleOptionsTimer = setTimeout(() => {
      this.handleOptionsChange(shouldUpdate)
      this.handleOptionsTimer = null
    }, 0)
  }

  componentDidLoad() {
    // Watches the size of values container, which changes when
    // autocomplete is focused and `limitLines` prop is set
    this.valueResizeObserver()

    this.mutationObserver = new MutationObserver(() => {
      if (!this.loading && !this.isInfiniteLoading) {
        this.addHandleOptionsChangeTimer()
      }
    })

    this.mutationObserver.observe(this.host, { childList: true, subtree: true })

    this.createTippyInstance()
    autoFocusElement(this.autoFocus, this.inputEl)

    this.checkSuggestions()
  }

  private checkSuggestions = () => {
    if (this.suggestions && !!this.suggestions.length) {
      //Need to be reassigned due to props from WppListItem `checked`, need to be removed
      this.componentSuggestions = this.suggestions.map(suggestion => {
        const { checked, ...restProps } = suggestion

        if (checked) this.value.push(suggestion)

        return restProps
      })
    }
  }

  disconnectedCallback() {
    if (this.valuesResizeObserver) {
      this.valuesResizeObserver.disconnect()
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
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
      this.valuesResizeObserver = new ResizeObserver(
        debounce(() => {
          if (this.resizeInPogress) return

          try {
            this.resizeInPogress = true

            if (this.type === 'regular') {
              this.countHiddenElements()
            }

            if (this.isDropdownShown) {
              this.tippyInstance?.popperInstance?.forceUpdate()
            }
          } catch (error) {
            console.error('Error in ResizeObserver callback:', error)
          } finally {
            this.resizeInPogress = false
          }
        }, 100),
      )

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
        zIndex: Z_INDEX.AUTOCOMPLETE,
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
        onShow: () => {
          requestAnimationFrame(this.validateTruncatedPills)
          requestAnimationFrame(this.triggerTooltipCalculation)

          if (this.componentSuggestions && this.componentSuggestions.length > 0)
            requestAnimationFrame(() => {
              const listItems = this.optionsListEl?.querySelectorAll(transformToVersionedTag('wpp-list-item'))

              Array.from(listItems || []).forEach(item => {
                item.setAttribute('container-state', 'tooltipTrigger')
              })
            })
        },
        onHide: () => {
          this.isShowMore = true
          requestAnimationFrame(this.validateTruncatedPills)
        },
        onClickOutside: (_, event: Event) => {
          if (!isEventTargetContained(this.host, event)) {
            this.hideDropdown()
          }
        },
      })
    }
  }

  private triggerTooltipCalculation = () => {
    this.optionElements?.forEach(option => {
      if (!option.hidden) {
        if (option.containerState === 'tooltipTrigger' && this.isDropdownShown) {
          option.setAttribute('container-state', '')
          option.setAttribute('container-state', 'tooltipTrigger')
        } else {
          option.setAttribute('container-state', 'tooltipTrigger')
        }
      }
    })
  }

  private isSelectedItemsLimitReached = () => {
    if (this.limitSelectedItems <= 0) return false

    return this.value.length >= this.limitSelectedItems
  }

  private canLoadMore = () => this.infinite && !this.infiniteLastPage && this.loadMore && !this.isInfiniteLoading

  private hasClearButton = (): boolean => !!this.value.length && !this.isDropdownShown && this.multiple

  private hasSearchButton = (): boolean => true

  private hasSimpleSearch = (): boolean => this.simpleSearch && !this.infinite

  private isOptionHidden = (option: HTMLWppListItemElement) => {
    if (!this.hasSimpleSearch()) {
      return false
    }

    const trimmedSearch = this.searchValue.trim().toLocaleLowerCase()

    if (trimmedSearch.length > 0) {
      const optionValue = option.value

      if (!optionValue) {
        return false
      }

      const optionLabel = (this.getOptionLabel(optionValue as AutocompleteOption) || '').toLocaleLowerCase()

      return !optionLabel.includes(trimmedSearch)
    }

    return false
  }

  private isOptionNodesChanged = (nextOptions: HTMLWppListItemElement[]) =>
    nextOptions.length !== this.optionElements?.length ||
    !nextOptions.every((el, index) => this.optionElements?.[index] === el)

  private getOptionElements = (): HTMLWppListItemElement[] =>
    Array.from(this.host.querySelectorAll<HTMLWppListItemElement>(transformToVersionedTag('wpp-list-item')))

  private scrollOptionsToTop = () => {
    if (this.optionsListEl) {
      this.optionsListEl.scrollTop = 0
    }
  }

  /**
   * If return `true`, need to interrupt function
   * for the cases, when user have Single WppAutocomplete and clicking into already selected WppListItem
   * @param event
   */
  private toggleSingleAutocompleteListItem = (event: CustomEvent<ListItemChangeEventDetail>) => {
    const suggestion = event.detail.target as HTMLWppListItemElement

    if (this.lastSelectedElement) this.lastSelectedElement.checked = false
    this.lastSelectedElement = suggestion

    if (isEqual(this.value[0], suggestion.value)) {
      event.stopPropagation()

      suggestion.checked = true

      this.hideDropdown()
      this.blurInput()

      return true
    }

    return
  }

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
      if (this.type === 'regular') {
        this.countHiddenElements()
      }

      this.tippyInstance?.hide()
      this.isDropdownShown = false
    }
  }

  private isItemSelected = (item: AutocompleteOption): boolean => {
    const itemId = this.getOptionId(item)

    return (
      this.value.some(selectedOption => this.getOptionId(selectedOption) === itemId) ||
      this.componentSuggestions.some(
        suggestion => this.getOptionId(suggestion) === itemId && this.isOptionSelected(suggestion),
      )
    )
  }

  private updateOptions = () => {
    this.shownOptionElements = []
    this.optionElements?.forEach(option => {
      const optionValue = option.value as AutocompleteOption

      option.selectable = true
      option.hidden = this.isOptionHidden(option)
      option.checked = this.isItemSelected(optionValue)
      option.highlight = this.searchValue

      if (!option.hidden) {
        if (this.isDropdownShown) {
          option.setAttribute('container-state', '')
          option.setAttribute('container-state', 'tooltipTrigger')
        }
        this.shownOptionElements!.push(option)
      }
    })

    this.isEmptyOptions = !this.shownOptionElements.length
  }

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

  private handleTriggerContainerMouseDown = (event: Event) => {
    if (!this.disabled) {
      // Prevent input blur when the component is used
      if (event.target !== this.inputEl) {
        event.preventDefault()
      }
    }
  }

  private handleCreateNewOptionClick = () => {
    this.wppCreateNewOption.emit(this.searchValue)
  }

  private handleTriggerClick = () => {
    if (!this.isFocused) {
      this.focusInput()
    }
  }

  private handleMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private handleInput = () => {
    this.focusType = FOCUS_TYPE.NONE
    this.searchValue = this.inputEl?.value || ''

    if (this.componentSuggestions?.length > 0 || (this.searchValue?.length ?? 0) > 0) {
      this.showDropdown()
    } else if (!this.value.length) {
      this.hideDropdown()
    }
  }

  private handleFocus = (event: FocusEvent) => {
    if (!this.isFocused) {
      this.isScrollToInputRequested = true
      this.isFocused = true

      if (
        (this.componentSuggestions?.length ?? 0) > 0 ||
        (this.searchValue?.length ?? 0) > 0 ||
        (this.withPills && !!this.value.length)
      ) {
        this.showDropdown()
      }

      if (this.canLoadMore() && this.isEmptyOptions && !this.loading) {
        this.requestLoadMore()
      }
    }

    this.wppFocus.emit(event)
  }

  // We allow input blur only when the dropdown is hidden or the component got disabled.
  // Outside clicks will close the dropdown first.
  private handleBlur = (event: FocusEvent) => {
    this.focusType = FOCUS_TYPE.NONE

    if (!event.relatedTarget) {
      this.hideDropdown()
    }

    if (!this.isDropdownShown) {
      this.isFocused = false

      if (this.persistentSearch) {
        this.onSearchValueChange(this.searchValue)
      } else {
        this.searchValue = ''
      }
    } else {
      this.focusInput()
    }

    this.wppBlur.emit(event)
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

  // For some reason this handler is not triggered by the browser
  // while Tippy instance is being created. Though it is covered
  // after the dropdown is opened, since Tippy moves the dropdown node.
  private handleOptionsChange = (shouldUpdate: boolean = false) => {
    const currentNodes = this.getOptionElements()
    const isNodesChanged = this.isOptionNodesChanged(currentNodes)

    if (isNodesChanged || shouldUpdate) {
      this.optionElements = currentNodes
      this.updateOptions()
    }
  }

  private handleClearClick = (event: Event) => {
    event.stopPropagation()

    this.value = []
    this.hiddenSelectedOptionsNumber = 0
    this.updateOptions()

    this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name })
  }

  private hostCssClasses = () => ({
    'wpp-autocomplete': true,
    'wpp-disabled': this.disabled,
  })

  private autocompleteWrapperCssClasses = () => ({
    'autocomplete-wrapper': true,
  })

  private triggerCssClasses = () => ({
    trigger: true,
    disabled: this.disabled,
    focused: this.isFocused,
    [`${this.messageType}`]: !!this.messageType,
    [`size-${this.size}`]: !!this.size,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  private inputCssClasses = () => ({
    'autocomplete-input': true,
    hidden: !this.isFocused && this.value.length > 0,
  })

  private labelCssClasses = () => ({
    label: true,
    focused: this.isFocused,
  })

  private dropdownListCssClasses = () => ({
    'dropdown-list': true,
    hidden: this.searchValue.length !== this.searchValue.trim().length && !this.searchValue.trim().length,
    'with-create-new':
      this.showCreateNewElement && this.searchValue !== '' && !this.displayBtnWhenListEmpty && !this.isEmptyOptions,
    'empty-with-create-new': this.showCreateNewElement && this.searchValue !== '' && this.isEmptyOptions,
  })

  private selectedValuesCssClasses = () => ({
    'selected-values': true,
    focused: this.isFocused,
    [`${this.type}`]: true,
  })

  private hostStyle = () => {
    const style: Record<string, string> = {
      '--wpp-list-item-width': '100%',
    }

    return style
  }

  private selectedPillsWrapperCssClasses = () => ({
    'selected-pills-wrapper': true,
    overflow: this.isShowMore,
    'not-empty': !!this.searchValue.length || !!this.value.length || !!this.shownOptionElements?.length,
  })

  private getInputValue = () => this.searchValue

  private renderInputPlaceholder = () => {
    if (!this.multiple && this.value.length && !this.isFocused) {
      return (
        <wpp-typography data-testid="wpp-autocomplete-input-placeholder" type="s-body" class="input-placeholder">
          {this.getOptionLabel(this.value[0])}
        </wpp-typography>
      )
    }

    if (this.isFocused && !this.searchValue) return null

    if (this.isDropdownShown) return null

    if (this.type === 'regular') {
      const itemsToDisplay = this.value

      if (!itemsToDisplay.length) return null

      const placeholder = itemsToDisplay.map(this.getOptionLabel).filter(Boolean).join(', ')

      return (
        <wpp-typography data-testid="wpp-autocomplete-input-placeholder" type="s-body" class="input-placeholder">
          {placeholder}
        </wpp-typography>
      )
    }

    if (this.type === 'extended' && this.value.length && !this.isFocused) {
      return (
        <wpp-typography data-testid="wpp-autocomplete-input-placeholder" type="s-body" class="input-placeholder">
          {this.locales.selected(this.value.length)}
        </wpp-typography>
      )
    }
  }

  private countHiddenElements = () => {
    const el = (this.host.shadowRoot as ShadowRoot).querySelector('.input-placeholder')

    if (!el) {
      this.hiddenSelectedOptionsNumber = 0

      return 0
    }

    const shownItems = this.value
    const maxWidth = el.clientWidth
    const textStyles = getComputedStyle(el, null).cssText

    let displayedElements = 1
    let label = this.getOptionLabel(shownItems[0])

    for (let i = 1; i < shownItems.length; i++) {
      label += this.getOptionLabel(shownItems[i])

      const currWidth = getTempNodeWidthBasedOnLabel(textStyles, label)

      if (currWidth > maxWidth) {
        this.hiddenSelectedOptionsNumber = this.value.length - displayedElements

        return
      } else {
        displayedElements++
      }
    }

    this.hiddenSelectedOptionsNumber = this.value.length - displayedElements
  }

  private getNearestPowForRowsNumber = () => Math.ceil(Math.log10(this.hiddenSelectedOptionsNumber + 1))

  private getDropdownWidth = () => {
    if (this.dropdownWidth === 'auto') {
      return this.triggerEl ? `${this.triggerEl.offsetWidth}px` : `${this.host.offsetWidth}px`
    }

    return selectDropdownWidth(this.dropdownWidth, this.triggerEl, this.host)
  }

  private isOptionSelected = (option: AutocompleteOption): boolean =>
    this.value.some(selectedOption => this.getOptionId(selectedOption) === this.getOptionId(option))

  private handleSuggestionClick = (event: CustomEvent<ListItemChangeEventDetail>) => {
    const option = event.detail.value as AutocompleteOption

    if (option.disabled) return
    if (!this.multiple && this.toggleSingleAutocompleteListItem(event)) return

    const isAlreadySelected = this.isOptionSelected(option)

    if (this.multiple) {
      if (isAlreadySelected) {
        this.value = this.value.filter(selectedOption => this.getOptionId(selectedOption) !== this.getOptionId(option))
        this.wppChange.emit({ value: this.value, reason: 'removeOption', name: this.name })
      } else {
        if (this.isSelectedItemsLimitReached()) return

        this.value = [...this.value, option]
        this.wppChange.emit({ value: this.value, reason: 'selectOption', name: this.name })
      }
      this.updateOptions()
    } else {
      if (isAlreadySelected) return

      this.value = [option]
      this.wppChange.emit({ value: this.value, reason: 'selectOption', name: this.name })
      this.hideDropdown()
      this.blurInput()
      this.updateOptions()
    }
  }

  private renderDropdownContent = () => {
    const isLoading = this.loading || (this.isInfiniteLoading && this.isEmptyOptions)
    const isEmptyStringEntered = this.searchValue.trim().length === 0

    if (isLoading) {
      return (
        <div class="loading-wrapper">
          <wpp-spinner slot="left" />
          <wpp-typography type="s-body" slot="label">
            {this.locales.loading}
          </wpp-typography>
        </div>
      )
    }

    if (isEmptyStringEntered && this.componentSuggestions?.length > 0) {
      return (
        <Fragment>
          <wpp-typography type="s-strong" class="suggestions-heading">
            {this.suggestionsTitle}
          </wpp-typography>

          {this.componentSuggestions?.map((suggestion, index) => {
            const { slots, checked, label, ...restProps } = suggestion
            const isChecked = checked || this.isItemSelected(suggestion)

            return (
              <wpp-list-item
                selectable={true}
                checked={isChecked}
                value={suggestion}
                onWppChangeListItem={this.handleSuggestionClick}
                class={{ 'suggestion-item': true, 'last-item': index === this.componentSuggestions?.length - 1 }}
                {...restProps}
              >
                {label && <span slot="label">{this.getOptionLabel(suggestion)}</span>}
                {slots && this.renderSlotsListItem(slots, Boolean(label)).map(slotNode => slotNode)}
              </wpp-list-item>
            )
          })}
        </Fragment>
      )
    }

    if (this.isEmptyOptions) {
      return (
        <Fragment>
          <wpp-list-item class="nothing-found-wrapper">
            <wpp-typography type="s-body" class="nothing-found" slot="label">
              {this.locales.nothingFound}
            </wpp-typography>
          </wpp-list-item>
        </Fragment>
      )
    }

    return (
      <Fragment>
        {!this.searchValue && !this.withPills ? (
          <div class={this.selectedValuesCssClasses()} part="selected-values">
            <slot name="selected-values" />
          </div>
        ) : (
          <slot />
        )}

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

  private renderSlotsListItem = (slots: AutocompleteExtendedOption[], isLabelExists: boolean): (VNode | null)[] =>
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
          ? (this.renderSlotsListItem(Array.from(children), isLabelExists) as VNode[])
          : (this.renderSlotsListItem([children], isLabelExists) as VNode[])

        return slotNode
      })
      .filter(item => item !== null)

  private renderSelectedOptions() {
    if (!this.withPills) return
    if (!this.value.length) return
    /**
     * When isShowMore is `true`:
     * - Checks if child elements (WppPill/WppTooltip) have text truncation:
     *   If truncated, need to add `transparent` class to WppPill/WppTooltip
     * When isShowMore is `false`:
     * - Checks if child elements (WppPill) have text truncation:
     *    - If `true` wrap WppPill with WppTooltip
     *    - If `false` render WppPill
     */

    const isNeedDivider =
      !!this.value.length &&
      (!!this.componentSuggestions?.length || !!this.shownOptionElements?.length || !!this.shownOptionElements?.length)

    return (
      <Fragment>
        {this.value.length > 0 && (
          <div
            class={{
              'header-wrapper': true,
              visible: this.activePillsTruncationState.includes(true) && this.isShowMore,
            }}
            ref={ref => (this.headerWrapperRef = ref)}
          >
            <div
              data-testid="wpp-autocomplete-selected-pills-wrapper"
              class={this.selectedPillsWrapperCssClasses()}
              ref={ref => (this.selectedPillsWrapperRef = ref)}
            >
              {this.value.map((option, ndx) => {
                if (this.isShowMore) {
                  const isHideElement = this.activePillsTruncationState[ndx]

                  return this.activePillsTruncationLabelState[ndx]
                    ? this.renderPillComponent(option, true, isHideElement)
                    : this.renderPillComponent(option, false, false, isHideElement)
                } else {
                  return this.activePillsTruncationLabelState[ndx]
                    ? this.renderPillComponent(option, true)
                    : this.renderPillComponent(option, false)
                }
              })}
            </div>
            <div class="show-more-action">
              {this.showMoreLessRender(
                `+${this.activePillsTruncationState.filter(x => x).length} ${this.locales.showMore}`,
              )}
            </div>
          </div>
        )}
        {!this.isShowMore && <div class="show-less-action">{this.showMoreLessRender(this.locales.showLess)}</div>}
        {isNeedDivider && <wpp-divider class="nothing-found-divider" />}
      </Fragment>
    )
  }

  private renderPillComponent = (
    option: AutocompleteOption,
    isTooltip: boolean,
    isTransparentTooltip: boolean = false,
    isTransparentPill: boolean = false,
  ) => {
    const labelText =
      option.label ||
      option.slots?.find((slot: JSX.Element) => slot.type === 'span' && slot.props.slot === 'label')?.props.children

    if (isTooltip) {
      return (
        <wpp-tooltip
          class={{
            'in-dropdown': true,
            transparent: isTransparentTooltip,
          }}
          text={labelText}
          part="tooltip"
          config={{ ...this.pillTooltipConfig }}
        >
          <wpp-pill
            class={{ transparent: isTransparentPill }}
            label={labelText}
            type="display"
            removable={true}
            onWppClose={event =>
              this.handleSuggestionClick({ ...event, ...{ detail: { value: option } } } as CustomEvent)
            }
          />
        </wpp-tooltip>
      )
    } else {
      return (
        <wpp-pill
          class={{ transparent: isTransparentPill }}
          label={labelText}
          type="display"
          removable={true}
          onWppClose={event =>
            this.handleSuggestionClick({ ...event, ...{ detail: { value: option } } } as CustomEvent)
          }
        />
      )
    }
  }

  /**
   * Validate each WppPill if it has truncated text label inside or WppPill got truncated when it's in `showMore` mode
   */
  private validateTruncatedPills = () => {
    this.selectedPillsWrapperRef?.style.removeProperty('width')

    // remove transparent class for a case when we have truncated WppPill and need to check which elements are not visible
    this.selectedPillsWrapperRef
      ?.querySelectorAll('.wpp-pill.transparent')
      .forEach(el => el.classList.remove('transparent'))

    // Need to toggle class for re-calculation which elements are not visible
    if (!this.isShowMore) {
      this.selectedPillsWrapperRef?.classList.toggle('overflow')
      this.headerWrapperRef?.classList.toggle('visible')
    }

    const pillsWrapperElement = this.host?.shadowRoot?.querySelector('.selected-pills-wrapper')
    const headerPillsWrapperElement = this.host?.shadowRoot?.querySelector('.header-wrapper')
    const showMoreElement = this.host?.shadowRoot?.querySelector('.show-more-action')

    if (!pillsWrapperElement || !showMoreElement || !headerPillsWrapperElement) return

    const pillsWrapperRight = headerPillsWrapperElement.getBoundingClientRect().right
    const pillWrapperWithLabel = pillsWrapperRight - showMoreElement.getBoundingClientRect().width
    const pillsElements = Array.from(
      pillsWrapperElement.querySelectorAll<HTMLWppPillElement>(transformToVersionedTag('wpp-pill')),
    )

    const activePillsTruncationStateTmp: boolean[] = []
    const activePillsTruncationStateWithMoreLabelTmp: boolean[] = []
    const activePillsTruncationLabelStateTmp: boolean[] = []

    if (!pillsElements || !pillsElements.length) return
    pillsElements.forEach((pillElement, ndx) => {
      const pillElementRect = pillElement.getBoundingClientRect()
      const labelEl = pillElement.shadowRoot?.querySelector('.label')

      // Check right corner of .selected-pills-wrapper and each .wpp-pill
      activePillsTruncationStateTmp.push(pillElementRect.right > pillsWrapperRight)
      // first item must be `false`, because it can't be truncated by `+n more` label
      activePillsTruncationStateWithMoreLabelTmp.push(ndx === 0 ? false : pillElementRect.right > pillWrapperWithLabel)

      if (!labelEl) {
        activePillsTruncationLabelStateTmp.push(false)

        return
      }

      // Check if WppPill .label has text truncation
      activePillsTruncationLabelStateTmp.push(labelEl.scrollWidth > labelEl.clientWidth)
    })

    const isPillsTruncated = activePillsTruncationStateTmp.includes(true)

    // If at least one WppPill got truncated, we need to include `+n more` in truncated list items
    this.activePillsTruncationState = isPillsTruncated
      ? activePillsTruncationStateWithMoreLabelTmp
      : activePillsTruncationStateTmp
    this.activePillsTruncationLabelState = activePillsTruncationLabelStateTmp

    // Need to toggle class for re-calculation which elements are not visible (revert changes)
    if (!this.isShowMore) {
      this.selectedPillsWrapperRef?.classList.toggle('overflow')
      this.headerWrapperRef?.classList.toggle('visible')

      if (!this.selectedPillsWrapperRef) return

      // If we have situation when after removing WppPill we have one line, we need to toggle isShowMore (reset the value)
      if (
        Number.parseFloat(window.getComputedStyle(this.selectedPillsWrapperRef).height) ===
        this.selectedPillsWrapperRef?.children[0].getBoundingClientRect().height
      )
        this.handleShowMoreLessClick()
    }

    // Need to adjust width of selectedPillsWrapperRef to adjust placement for a `+n more` CTA
    if (this.isShowMore && isPillsTruncated) {
      const visiblePills = pillsElements.slice(0, activePillsTruncationStateWithMoreLabelTmp.filter(x => !x).length)
      let visiblePillsWidth = visiblePills.reduce((acc, pill) => acc + pill.getBoundingClientRect().width, 0)

      if (visiblePills.length > 1) visiblePillsWidth += (visiblePills.length - 1) * PILL_MARGIN

      // Set width eq to all visible WppPills and N-1 margins
      this.selectedPillsWrapperRef?.style.setProperty('width', `${visiblePillsWidth}px`)
    }
  }

  // Render Show More/Show Less button only in cases when we have truncated WppPill (not .label inside)
  private showMoreLessRender = (label: string) => (
    <wpp-action-button
      data-testid="wpp-autocomplete-show-btn"
      class="nowrap"
      variant="secondary"
      onClick={this.handleShowMoreLessClick}
    >
      {label}
    </wpp-action-button>
  )

  private handleShowMoreLessClick = () => {
    this.isShowMore = !this.isShowMore
  }

  render() {
    const style = { '--custom-dropdown-width': this.getDropdownWidth() }

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
        exportparts="input, dropdown, options, selected-values"
      >
        {/*
          This wrapper div is needed not only to handle MouseDown events, but also
          due to Tippy's node transfer behavior. Inline message component
          is rendered conditionally, and it relies on the next node when it's inserted.
          But that node (dropdown list root) is moved by Tippy.
          */}
        <div class={this.autocompleteWrapperCssClasses()} onMouseDown={this.handleTriggerContainerMouseDown}>
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

              {this.renderInputPlaceholder()}

              {this.hiddenSelectedOptionsNumber > 0 && !this.isDropdownShown && (
                <div class="hidden-count" style={{ '--hidden-number': this.getNearestPowForRowsNumber() + '' }}>
                  <wpp-typography type="s-body">, + {this.hiddenSelectedOptionsNumber}</wpp-typography>
                </div>
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
            {this.renderSelectedOptions()}
            {this.renderDropdownContent()}
            {this.showCreateNewElement &&
              this.searchValue !== '' &&
              ((this.displayBtnWhenListEmpty && this.isEmptyOptions) || !this.displayBtnWhenListEmpty) && (
                <div class="actions">
                  <wpp-divider class="nothing-found-divider" />
                  <div class="actions-container">
                    <wpp-list-item onClick={this.handleCreateNewOptionClick}>
                      <wpp-typography type="s-strong" class="create-new-option" slot="label">
                        {this.locales.createNewElement}
                      </wpp-typography>
                    </wpp-list-item>
                  </div>
                </div>
              )}
          </div>
        </div>

        {this.type === 'extended' && this.multiple ? <slot name="selected-values" /> : null}
      </Host>
    )
  }
}
