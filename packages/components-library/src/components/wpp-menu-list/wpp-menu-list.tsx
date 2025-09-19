import { Component, Host, h, Element, Prop, State, Listen, Watch } from '@stencil/core'
import { Instance } from 'tippy.js'
import isEqual from 'lodash/isEqual'

import { transformToVersionedTag } from '../../utils/utils'
import { menuListConfig } from '../../common/menuListConfig'
import { Z_INDEX } from '../../common/consts'

import { DropdownConfig } from '../../types/common'

import { ShouldCloseOnOutsideClickHandler } from './types'

/**
 * @slot trigger-element - Content that is considered the list target. Can be used on one element only and that element must be passed first. If used, other components are displayed as a list.
 *
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-menu-list',
  styleUrl: 'wpp-menu-list.scss',
  shadow: true,
})
export class WppMenuList {
  protected listRef?: Element

  @Element() host: HTMLWppMenuListElement

  @State() tippyInstance: Instance

  @State() contextList: HTMLElement

  @State() hidden: boolean

  /**
   * Helper that defines If the menu can be closed by clicking outside of it.
   */
  @Prop() readonly shouldCloseOnOutsideClick: ShouldCloseOnOutsideClickHandler = () => true

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  @Listen('wppClickMenuItem', { capture: true })
  @Listen('wppChangeListItem', { capture: true })
  handleClickItem(e: CustomEvent) {
    if (e.type === 'wppChangeListItem' && (e.target as HTMLWppListItemElement).multiple) {
      return
    }

    this.tippyInstance.hide()
  }

  @Watch('dropdownConfig')
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  componentWillLoad() {
    if (this.dropdownConfig?.showOnCreate) this.hidden = true
  }

  componentDidLoad() {
    if (this.dropdownConfig?.showOnCreate) {
      setTimeout(() => {
        this.createTippyInstance()

        this.hidden = false
      }, 0)
    } else {
      this.createTippyInstance()
    }
  }

  disconnectedCallback() {
    this.tippyInstance?.destroy()
  }

  connectedCallback() {
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance()
    }
  }

  private createTippyInstance = () => {
    const dropdownConfig = this.dropdownConfig
    const anchor = this.host?.children[0] as HTMLElement
    const list = this.host?.children[1] as HTMLElement

    if (list) {
      this.contextList = list
    }

    if (!anchor || !this.contextList) return

    this.tippyInstance = menuListConfig({
      anchor,
      content: this.contextList,
      maxWidth: 'none',
      hideOnClick: 'toggle',
      zIndex: Z_INDEX.MENU_LIST,
      ...dropdownConfig,
      onHide(instance) {
        const contentSlots = (this.content as Element)?.querySelector('slot')

        Array.from((contentSlots as HTMLSlotElement)?.assignedNodes() || []).forEach(el => {
          const element = el as HTMLElement

          if (element.tagName === transformToVersionedTag('wpp-list-item').toUpperCase()) {
            element.setAttribute('container-state', 'hidden')
          }
        })

        return dropdownConfig.onHide?.(instance)
      },
      onMount(instance) {
        const contentSlots = (this.content as Element)?.querySelector('slot')

        Array.from((contentSlots as HTMLSlotElement)?.assignedNodes() || []).forEach(el => {
          const element = el as HTMLElement

          if (element.tagName === transformToVersionedTag('wpp-list-item').toUpperCase()) {
            element.setAttribute('container-state', 'shown')
          }
        })

        dropdownConfig.onMount?.(instance)
      },
      onClickOutside: (_, event: Event) => {
        if (this.shouldCloseOnOutsideClick(event)) {
          this.tippyInstance.hide()
        }
      },
    })
  }

  private hostCssClasses = () => ({
    'wpp-menu-list': true,
    'wpp-menu-list-wrapper': true,
  })

  private innerWrapperCssClasses = () => ({
    'inner-wrapper': true,
    hidden: this.hidden,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="trigger, inner">
        <slot name="trigger-element" part="trigger" class="trigger-element" />
        <div class={this.innerWrapperCssClasses()}>
          <slot part="inner" />
        </div>
      </Host>
    )
  }
}
