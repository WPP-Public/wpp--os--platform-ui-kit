import { Component, Element, Event, EventEmitter, h, Host, Listen, Prop, State, Watch } from '@stencil/core'

import { debounce, transformToVersionedTag } from '../../utils/utils'

import { TabsChangeEventDetail, TabChangeEventDetail } from './types'
import { TAB_MARGIN_RIGHT } from './const'

/**
 * @slot - Should contain only the tab control elements. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part counter - tabs slider element
 */
@Component({
  tag: 'wpp-tabs',
  styleUrl: 'wpp-tabs.scss',
  shadow: true,
})
export class WppTabs {
  @Element() host: HTMLWppTabsElement

  @State() position: string

  @State() previousActiveTab: Element | null

  /**
   * Defines the active tab `itemId`.
   */
  @Prop({ reflect: true, mutable: true }) value!: string

  /**
   * Indicates tabs size
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * Emitted when the active tab has changed, emits index of the active tab
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<TabsChangeEventDetail>

  @Listen('wppChangeTabControlItem', { capture: true })
  handleChangeTabControlItemClick(event: CustomEvent<TabChangeEventDetail>) {
    this.value = event.detail.value
  }

  @Watch('size')
  sizeChanged(newSize: string) {
    this.host.querySelectorAll(transformToVersionedTag('wpp-tab')).forEach(tab => {
      tab.setAttribute('size', newSize)
    })
  }

  @Watch('value')
  valueChanged(newValue: string) {
    this.previousActiveTab?.setAttribute('active', 'false')
    const activeElement = Array.from(
      this.host.querySelectorAll<HTMLWppTabElement>(transformToVersionedTag('wpp-tab')),
    ).find(tab => tab.value === newValue)

    activeElement?.setAttribute('active', 'true')

    this.redrawUnderline(newValue)
    this.previousActiveTab = activeElement ?? null
    this.wppChange.emit({ value: newValue, itemId: '' })
  }

  private resizeObserver = new ResizeObserver(
    debounce(() => {
      this.redrawUnderline(this.position)
    }, 50),
  )

  private redrawUnderline(newPosition: string) {
    this.position = newPosition
    let sumWidthOfPreviousElements = 0
    let currentItemWidth = 0

    let isToSumWidthOfPreviousElements = true

    this.host.querySelectorAll<HTMLWppTabElement>(transformToVersionedTag('wpp-tab')).forEach(tab => {
      if (tab.value === this.position) {
        isToSumWidthOfPreviousElements = false
      }

      if (isToSumWidthOfPreviousElements) {
        sumWidthOfPreviousElements += tab.clientWidth + TAB_MARGIN_RIGHT
      }

      if (tab.value === newPosition) {
        currentItemWidth = tab.clientWidth || 0
      }
    })

    this.host.style.setProperty('--tab-bar-item-transform', `${sumWidthOfPreviousElements}px`)
    this.host.style.setProperty('--tab-bar-item-width', `${currentItemWidth}px`)
    this.host.style.setProperty('--tab-bar-item-position', newPosition!.toString())
  }

  private lengthChange(newLength?: number) {
    newLength && this.host.style.setProperty('--item-length', newLength.toString())
  }

  componentDidLoad() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.host)
    }

    let amountOfActiveTabs = 0

    this.lengthChange(this.host.children.length)

    this.host.querySelectorAll<HTMLWppTabElement>(transformToVersionedTag('wpp-tab')).forEach(tab => {
      if (tab.value === this.value) {
        tab.setAttribute('active', 'true')
      }

      tab.setAttribute('size', this.size)

      if (tab.hasAttribute('active')) {
        amountOfActiveTabs = amountOfActiveTabs + 1

        if (amountOfActiveTabs > 1) {
          tab.removeAttribute('active')

          return
        }

        this.previousActiveTab = tab
        this.redrawUnderline(tab.value as string)
      }
    })
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private hostCssClasses = () => ({
    'wpp-tabs': true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="wrapper, inner, slider">
        <div class="wpp-tab-control-wrapper" role="listbox" aria-multiselectable="false" part="wrapper">
          <slot part="inner" />
        </div>

        <div class="slider" part="slider" />
      </Host>
    )
  }
}
