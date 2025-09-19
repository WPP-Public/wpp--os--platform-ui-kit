import { Instance, Props } from 'tippy.js'
import { Component, Host, h, Prop, Element, Watch, Method, State, Event, EventEmitter } from '@stencil/core'
import isEqual from 'lodash/isEqual'

import { AriaProps, DropdownConfig } from '../../types/common'

import { menuListConfig } from '../../common/menuListConfig'

import { PopoverInputChangeEventDetail, PopoverShouldCloseOnOutsideClickHandler } from './types'
import { Z_INDEX } from '../../common/consts'
import { getHighestContainerInDOM, hasParentWithId, isEventTargetContained } from '../../utils/utils'
import { DEFAULT_POPOVER_LOCALES } from './config'

/**
 * @slot trigger-element - Can contain the popover anchor element.
 * @slot - Can contain the popover content. The default slot, without the name attribute.
 *
 * @part anchor - Popover anchor wrapper
 * @part content - Popover content wrapper
 */
@Component({
  tag: 'wpp-popover',
  styleUrl: 'wpp-popover.scss',
  shadow: true,
})
export class WppPopover {
  private anchorRef: HTMLDivElement | undefined
  private contentEl?: HTMLDivElement
  private mutationObserver: MutationObserver
  private tippyInstance: Instance

  // *** Specific to `withSearch` variant
  private internalSearchName: string
  private searchInputEl?: HTMLWppInputElement

  @State() hidden: boolean = true

  @Element() host: HTMLWppPopoverElement

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) config: DropdownConfig = {}

  /**
   * Helper that defines If the popover can be closed by clicking outside of it.
   */
  @Prop() readonly shouldCloseOnOutsideClick: PopoverShouldCloseOnOutsideClickHandler = () => true

  /**
   * If the popover has cross button on the right-top side.
   */
  @Prop() readonly closable: boolean = false

  /**
   * If the popover has search inside of the dropdown.
   */
  @Prop() readonly withSearch: boolean = false

  /**
   * Value of the search inside the popover's dropdown.
   * This property should be used together with `this.withSearch` property.
   */
  @Prop() readonly searchValue: string = ''

  /**
   * The name for the input component inside the popover's dropdown.
   * This property should be used together with `this.withSearch` property.
   */
  @Prop() readonly searchName: string = ''

  /**
   * By default, the search value in the input is cleared once the dropdown is closed.
   * Set to `true` if you need the search value to not be cleared after closing the dropdown.
   * This property should be used together with `this.withSearch` property.
   */
  @Prop() readonly persistantSearch: boolean = false

  /**
   * Add an external class to the popover. This class will be applied to the list wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .wpp-popover.external-class-name {
   *  ...
   * }
   */
  @Prop() readonly externalClass: string = ''

  /**
   * Defines the dropdown's width. The maximum width of the dropdown is 350px.
   */
  @Prop({ reflect: true }) readonly dropdownWidth: 'auto' | string = 'auto'

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {
    role: 'dialog',
  }

  /**
   * Defines the component locale types.
   */
  @Prop() readonly locales = DEFAULT_POPOVER_LOCALES

  /**
   * Emitted when the value of the search input inside the dropdown changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppSearchChange: EventEmitter<PopoverInputChangeEventDetail>

  /**
   * Method for closing the popover programatically
   */
  @Method()
  async closePopover() {
    this.tippyInstance.hide()
  }

  /**
   * Method for opening the popover programatically
   */
  @Method()
  async openPopover() {
    setTimeout(() => {
      this.tippyInstance.show()
    }, 0)
  }

  @Watch('config')
  updateConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.config = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  private isTriggerEnabled = (): boolean => {
    // Checks if the trigger element is enabled or disabled.
    const triggerEl = this.host?.querySelector('[slot="trigger-element"]') as HTMLElement

    if (!triggerEl) return false

    if (
      (triggerEl?.hasAttribute('disabled') && triggerEl?.getAttribute('disabled') !== 'false') ||
      triggerEl?.classList.contains('disabled')
    ) {
      return false
    }

    return true
  }

  componentWillLoad() {
    this.internalSearchName = this.searchName || 'wpp-popover-search'
  }

  componentDidLoad() {
    setTimeout(() => {
      this.createTippyInstance()

      this.hidden = false
    }, 0)

    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag()
    })

    this.startObserving()
  }

  disconnectedCallback() {
    this.tippyInstance?.destroy()
    this.mutationObserver?.disconnect()
  }

  connectedCallback() {
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance()
    }

    if (this.mutationObserver) {
      this.startObserving()
    }
  }

  private createTippyInstance = () => {
    const slotContent = this.host.children[1]

    if (slotContent) {
      this.contentEl?.append(slotContent)
    }

    if (this.contentEl && this.anchorRef) {
      this.tippyInstance = menuListConfig({
        anchor: this.anchorRef,
        content: this.contentEl,
        zIndex: Z_INDEX.POPOVER,
        duration: [300, 300],
        triggerElementWidth: false,
        trigger: 'click',
        maxWidth: 'none',
        hideOnClick: 'toggle',
        popperOptions: {
          ...this.config?.popperOptions,
          modifiers: [...(this.config?.popperOptions?.modifiers || [])],
        },

        appendTo: () => getHighestContainerInDOM(),
        ...this.config,
        onClickOutside: (instance: Instance<Props>, event: Event) => {
          if (
            isEventTargetContained(this.host, event) ||
            (event.target && hasParentWithId(event.target as HTMLElement, 'tippy-'))
          )
            return

          if (this.shouldCloseOnOutsideClick(event)) {
            this.tippyInstance.hide()
          }

          if (this.config?.onClickOutside) {
            this.config.onClickOutside(instance, event)
          }
        },
        onShow: (instance: Instance) => {
          if (!this.isTriggerEnabled()) return false

          if (this.dropdownWidth !== 'auto') {
            instance.popper.style.width = this.dropdownWidth
          }

          if (this.config?.onShow) {
            return this.config.onShow(instance)
          }
        },
        onShown: (instance: Instance) => {
          if (this.searchInputEl) {
            this.searchInputEl.setFocus()
          }

          if (this.config?.onShown) {
            this.config.onShown(instance)
          }
        },
        onHidden: (instance: Instance) => {
          if (!this.persistantSearch && this.withSearch) {
            this.wppSearchChange.emit({ name: this.internalSearchName, value: '' })
          }

          if (this.config?.onHidden) {
            this.config.onHidden(instance)
          }
        },
      })
    }
  }

  private removeDisabledTag = () => {
    if (this.anchorRef?.getAttribute('disabled') === 'false') {
      this.anchorRef.removeAttribute('disabled')
    }
  }

  private startObserving() {
    this.mutationObserver.observe(this.host?.children[0], { attributes: true })
  }

  private handleCrossButtonClick = () => this.tippyInstance.hide()

  private handleSearchChange = (e: CustomEvent) => {
    const { value } = e.detail

    this.wppSearchChange.emit({ name: this.internalSearchName, value })
  }

  private hostCssClasses = () => ({
    'wpp-popover': true,
  })

  private contentCssClasses = () => ({
    'wpp-popover-content': true,
    'wpp-hidden': this.hidden,
    [`${this.externalClass}`]: true,
    'wpp-with-search': this.withSearch,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="anchor, trigger-element">
        <div class="anchor" part="anchor" ref={ref => (this.anchorRef = ref)}>
          <slot name="trigger-element" part="trigger-element" />
        </div>

        <div
          class={this.contentCssClasses()}
          part="content"
          ref={contentEl => (this.contentEl = contentEl)}
          role={this.ariaProps.role || 'dialog'}
          aria-describedby={this.ariaProps.describedby}
          aria-label={this.ariaProps.label}
          aria-modal="true"
        >
          {this.withSearch && (
            <wpp-input
              ref={inputEl => (this.searchInputEl = inputEl)}
              class="wpp-search-input"
              value={this.searchValue}
              onWppChange={this.handleSearchChange}
              name={this.internalSearchName}
              placeholder={this.locales.searchInputPlaceholder || DEFAULT_POPOVER_LOCALES.searchInputPlaceholder}
              type="search"
              size="m"
            ></wpp-input>
          )}
          {!this.withSearch && this.closable && (
            <wpp-action-button onClick={this.handleCrossButtonClick} class="cross-button" variant="secondary">
              <wpp-icon-cross slot="icon-end" />
            </wpp-action-button>
          )}
          <slot />
        </div>
      </Host>
    )
  }
}
