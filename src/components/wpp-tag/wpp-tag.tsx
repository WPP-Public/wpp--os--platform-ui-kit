import { Component, Host, h, Prop, Watch, Element, State } from '@stencil/core'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'
import { getSlotEmptyStates, truncate } from '../../utils/utils'

import { DropdownConfig } from '../../types/common'
import { RangeOf } from '../../types/numberRange'

/**
 * @part label - Label text element
 * @part tooltip - tag wrapper content
 * @part tooltip-text - tag text component
 * @part overlay - tag overlay
 *
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a user icon.
 */
@Component({
  tag: 'wpp-tag',
  styleUrl: 'wpp-tag.scss',
  shadow: true,
})
export class WppTag {
  private variantClass: string | undefined

  @Element() host: HTMLWppTagElement

  @State() hasIconStartSlot: boolean = false

  /**
   * Defines the tag style.
   * This property has higher priority than `categoricalColorIndex`. If `variant` is set, the `categoricalColorIndex` will be ignored.
   */
  @Prop() readonly variant?: 'neutral' | 'warning' | 'positive' | 'negative' | `Cat-${Exclude<RangeOf<9>, 0>}`

  /**
   * Maximum label length (in characters) of single item
   */
  @Prop() readonly maxLabelLength: number = 30

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly tooltipConfig: DropdownConfig = {}

  /**
   * Defines the tag label.
   */
  @Prop() readonly label?: string

  /**
   * Selects the tag color from categorical palette.
   * This property has lower priority than `variant`. If `variant` is set, the `categoricalColorIndex` will be ignored.
   * @deprecated - This property will be removed in v4.0.0. Use `variant` instead.
   */
  @Prop() readonly categoricalColorIndex?: Exclude<RangeOf<9>, 0>

  /**
   * Defines the if the tag icon displayed.
   *
   * @deprecated - this prop will be deleted in version 4.0.0. If you want tag with icon, you can add slot with some icon inside tag component
   */
  @Prop() readonly withIcon?: boolean = false

  /**
   * Defines the tag disabled state.
   * @internal - This prop is controlled by Accordion, and Tree components.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  @Watch('variant')
  onUpdateVariant() {
    this.updateTagColor()
  }

  @Watch('categoricalColorIndex')
  updateCategoricalIndex(index: number) {
    this.updateCategoricalColor(index)
  }

  componentWillLoad() {
    this.updateCategoricalColor(this.categoricalColorIndex)
    this.updateSlotData()

    this.updateTagColor()

    if (this.categoricalColorIndex) {
      console.warn(
        '%cThe `categoricalColorIndex` property is deprecated. Please, use `variant` instead',
        'color: black; font-size: 12px;',
      )
    }
  }

  private updateTagColor = () => {
    this.variantClass = ''

    if (!this.variant) {
      this.updateCategoricalColor(this.categoricalColorIndex)

      return
    }

    if (this.variant.includes('Cat-')) {
      const categoricalIndex = this.variant.split('-')[1]

      this.updateCategoricalColor(parseInt(categoricalIndex, 10))

      return
    }

    this.variantClass = this.variant
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      icon: '[slot="icon-start"]',
    })

    this.hasIconStartSlot = !emptyStates.icon
  }

  protected updateCategoricalColor = (index?: number) => {
    this.host.style.setProperty('--tag-bg-color', index ? `var(--wpp-dataviz-color-cat-light-${index})` : '')
  }

  private hostCssClasses = () => ({
    'wpp-tag': true,
    ...(this.variantClass && { [`wpp-${this.variantClass}`]: true }),
    'wpp-with-icon': Boolean(this.hasIconStartSlot),
    'wpp-disabled': this.disabled,
  })

  private iconStartCssClasses = () => ({
    'icon-start': true,
    'slot-hidden': !this.hasIconStartSlot,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="label, tooltip, tooltip-text, icon-start, overlay">
        <WrappedSlot wrapperClass={this.iconStartCssClasses()} name="icon-start" onSlotchange={this.updateSlotData} />

        <wpp-typography type="xs-midi" tag="span" part="label">
          {Number(this.label?.length) > this.maxLabelLength ? (
            <wpp-tooltip text={this.label} config={this.tooltipConfig} part="tooltip">
              <span part="tooltip-text">{truncate(this.label, this.maxLabelLength, false)}</span>
            </wpp-tooltip>
          ) : (
            this.label
          )}
        </wpp-typography>

        {this.variant?.includes('Cat-')}
        <div class={`overlay ${this.variant?.includes('Cat-') ? 'categorical-overlay' : ''}`} part="overlay" />
      </Host>
    )
  }
}
