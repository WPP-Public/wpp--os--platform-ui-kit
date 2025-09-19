import { Component, h, Host, Element, State, Prop, Listen, Watch } from '@stencil/core'
import isEqual from 'lodash/isEqual'

import { ListItemChangeEventDetail } from '../wpp-list-item/types'
import { getHighestContainerInDOM, isEventTargetContained, transformToVersionedTag } from '../../utils/utils'

import { AriaProps, DropdownConfig } from '../../types/common'

import { CONTEXT_ITEM_TAG, MENU_BAR_ROLE, MENU_ROLE, WPP_LIST_CLASSNAME, TOPBAR_NAVIGATION_ITEM_TAG } from './constants'

import { Instance, hideAll } from 'tippy.js'
import { menuListConfig } from '../../common/menuListConfig'
import { setDefaultDropdownConfig } from './config'

/**
 * @part list-wrapper -list wrapper element
 * @part list - Contains the `menu-item` elements.
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-menu-context',
  styleUrl: 'wpp-menu-context.scss',
  scoped: true,
})
export class WppMenuContext {
  private triggerRef?: HTMLDivElement
  private contentRef?: HTMLUListElement
  private wppListWrapperRef: HTMLElement | undefined

  private mutationObserver: MutationObserver

  private isTriggerDisabled: boolean = false

  @Element() host: HTMLWppMenuContextElement

  @State() contextList: HTMLElement

  @State() tippyInstance: Instance

  @State() isNestedContext: boolean

  @State() hidden: boolean = true

  /**
   * Defines the context menu width. The maximum width of the menu is 350px.
   */
  @Prop({ reflect: true }) readonly listWidth: 'auto' | string = 'auto'

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * If `true`, menu-context content will be appended to the `.wpp-list-wrapper`
   */
  @Prop() readonly appendToListWrapper: boolean = false

  /**
   * Add an external class to the dropdown list. This class will be applied to the list wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .wpp-menu-context.external-class-name {
   *  ...
   * }
   */
  @Prop() readonly externalClass: string = ''

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  @Listen('wppChangeListItem', { target: 'window', capture: true })
  @Listen('wppActiveTopbarItemChange', { target: 'window', capture: true })
  @Listen('wppActiveNavItemChanged', { target: 'window', capture: true })
  @Listen('click', { capture: true })
  private handleClick(event: Event) {
    // NOTE: our wppChangeListItem listener is called when ListItems are used in Select or Autocomplete.
    // This should be treated as hotfix until we move all our dropdowns to the document.body
    // or find other proper solution
    if ((event as CustomEvent<ListItemChangeEventDetail>).detail?.isSelectBasedEvent) return
    if ((event as CustomEvent<ListItemChangeEventDetail>).detail?.isAutocompleteBasedEvent) return

    const triggerEl = this.triggerRef?.querySelector('[slot="trigger-element"]') as HTMLElement

    this.isTriggerDisabled =
      (triggerEl?.hasAttribute('disabled') && triggerEl?.getAttribute('disabled') !== 'false') ||
      triggerEl?.classList.contains('disabled')

    if (this.isTriggerDisabled && isEventTargetContained(this.host, event)) {
      event.stopPropagation()

      return
    }

    const listItem = event
      .composedPath()
      .find(
        el =>
          (el as HTMLElement).tagName?.includes(CONTEXT_ITEM_TAG) ||
          (el as HTMLElement).tagName?.includes(TOPBAR_NAVIGATION_ITEM_TAG),
      ) as HTMLElement

    if (!listItem) return

    const currentRole = listItem.getAttribute('role')
    const disabled = listItem.getAttribute('disabled')

    if (
      !currentRole ||
      [MENU_BAR_ROLE, MENU_ROLE].includes(currentRole || '') ||
      (disabled !== null && disabled !== 'false')
    )
      return

    hideAll()
  }

  @Watch('dropdownConfig')
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  componentWillLoad() {
    const anchor = this.host?.children[0] as HTMLElement

    anchor?.addEventListener('click', this.handleClick)

    this.isNestedContext = anchor?.tagName === transformToVersionedTag(CONTEXT_ITEM_TAG).toUpperCase()
  }

  componentDidLoad() {
    this.createTippyInstance()

    this.checkNestedItemIsDisabled()

    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag()
    })

    this.startObserving()

    if (this.triggerRef) {
      const slottedAnchor = this.triggerRef?.children[0]

      if (slottedAnchor && slottedAnchor.role) {
        slottedAnchor.role = 'presentation'
      }
    }
  }

  connectedCallback() {
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance()
    }

    if (this.mutationObserver) {
      this.startObserving()
    }
  }

  disconnectedCallback() {
    if (!this.isNestedContext) {
      this.tippyInstance?.destroy()
    }

    this.mutationObserver?.disconnect()
  }

  private getContentRef = (node?: HTMLUListElement) => {
    this.contentRef = node
  }

  private getTriggerRef = (node?: HTMLDivElement) => {
    this.triggerRef = node
  }

  private checkNestedItemIsDisabled = () => {
    if (this.isNestedContext && (this.triggerRef?.children[0] as HTMLWppListItemElement).disabled) {
      this.triggerRef?.setAttribute('disabled', 'true')
    }
  }

  private removeDisabledTag = () => {
    if (!this.triggerRef?.children[0]) return

    if (
      this.triggerRef?.getAttribute('disabled') === 'false' ||
      this.triggerRef?.children[0].getAttribute('disabled') === 'false'
    ) {
      this.triggerRef.removeAttribute('disabled')
      this.triggerRef?.children[0].removeAttribute('disabled')
    }
  }

  private createTippyInstance = () => {
    this.removeDisabledTag()

    this.tippyInstance = menuListConfig({
      anchor: this.triggerRef!,
      content: this.contentRef,
      triggerElementWidth: false,
      maxWidth: '350px',
      appendTo: this.appendToListWrapper ? this.wppListWrapperRef : () => getHighestContainerInDOM(),
      ...setDefaultDropdownConfig(this.isNestedContext),
      ...(this.dropdownConfig as DropdownConfig),
      onShow: (instance: Instance) => {
        if (this.listWidth !== 'auto') {
          instance.popper.style.width = this.listWidth
        }

        this.handleAriaExpandedOnTrigger('show')

        const listItems = this.contentRef?.querySelectorAll(transformToVersionedTag('wpp-list-item'))

        Array.from(listItems || []).forEach(item => {
          item.setAttribute('container-state', 'tooltipTrigger')
        })

        if (this.dropdownConfig?.onShow) {
          return this.dropdownConfig.onShow(instance)
        }
      },
      onHide: (instance: Instance) => {
        this.handleAriaExpandedOnTrigger('hide')

        if (this.dropdownConfig?.onHide) {
          return this.dropdownConfig.onHide(instance)
        }
      },
    })
  }

  private handleAriaExpandedOnTrigger = (type: 'show' | 'hide'): void => {
    if (!this.triggerRef) return

    const ariaExpandedValue = this.triggerRef.getAttribute('aria-expanded')

    if (!ariaExpandedValue || ariaExpandedValue === (type === 'show' ? 'false' : 'true')) {
      this.triggerRef.setAttribute('aria-expanded', type === 'show' ? 'true' : 'false')
    }
  }

  private startObserving() {
    this.mutationObserver.observe(this.host?.children[0], { attributes: true })
  }

  private menuCssClasses = () => ({
    'wpp-menu-context': true,
    'wpp-menu-context-wrapper': true,
    'wpp-menu-nested-context-wrapper': this.isNestedContext,
  })

  private triggerWrapperCssClasses = () => ({
    'trigger-wrapper': true,
    nested: this.isNestedContext,
  })

  private listWrapperCssClasses = () => ({
    [WPP_LIST_CLASSNAME]: true,
    [`${this.externalClass}`]: true,
  })

  render() {
    const style = {
      '--custom-menu-context-width': this.listWidth === 'auto' ? '' : this.listWidth,
    }

    return (
      <Host class={this.menuCssClasses()} exportparts="trigger, list-wrapper, list, inner">
        <div
          role="button"
          aria-label={this.ariaProps?.label}
          ref={this.getTriggerRef}
          class={this.triggerWrapperCssClasses()}
          tabIndex={0}
        >
          <slot name="trigger-element" part="trigger" />
        </div>
        <div class="wpp-list-wrapper" part="list-wrapper" ref={ref => (this.wppListWrapperRef = ref)}>
          <ul class={this.listWrapperCssClasses()} style={style} ref={this.getContentRef} role={MENU_ROLE} part="list">
            <slot part="inner" />
          </ul>
        </div>
      </Host>
    )
  }
}
