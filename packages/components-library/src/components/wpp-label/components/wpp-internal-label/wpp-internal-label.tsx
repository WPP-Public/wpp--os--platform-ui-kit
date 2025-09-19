import { Component, h, Prop, State, Element, Host } from '@stencil/core'

import { getSlotEmptyStates } from '../../../../utils/utils'
import { DropdownConfig, FOCUS_TYPE } from '../../../../types/common'

import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'
import { TypographyType } from '../../../wpp-typography/types'
import { LabelLocales } from '../../types'

/**
 * @part info-wrapper - wrapper around text and optional text
 * @part text - label text
 * @part optional-text - optional text element
 * @part info-wrapper -
 * @part text - Main text content
 * @part tooltip - tooltip wrapper content
 *
 * @slot icon - may contain an icon that will be placed after text wrapper, e.g. a info icon
 */
@Component({
  tag: 'wpp-internal-label',
  styleUrl: 'wpp-internal-label.scss',
  shadow: true,
})
export class WppInternalLabel {
  @State() hasIconSlot: boolean = true

  @Element() host: HTMLWppInternalLabelElement

  @State() focusType: FOCUS_TYPE

  /**
   * Indicates text of the label
   */
  @Prop() readonly labelText?: string

  /**
   * Indicates description message in tooltip when hover on icon
   */
  @Prop() readonly description?: string

  /**
   * Indicates optional field to fill with (Optional) text after label
   */
  @Prop() readonly optional: boolean = false

  /**
   * Indicates different typography styles for label
   */
  @Prop() readonly typography: Extract<TypographyType, 's-strong' | 's-body'> = 's-body'

  /**
   * If `true`, the component is disabled
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Indicates locales for label component
   */
  @Prop() readonly locales: LabelLocales = {
    optional: 'Optional',
  }

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly tooltipConfig: DropdownConfig = {}

  /**
   * Indicates the role attribute for the component
   */
  @Prop() readonly role: string = 'presentation'

  componentWillLoad() {
    this.updateSlotData()
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      icon: '[slot="icon"]',
    })

    this.hasIconSlot = !emptyStates.icon
  }

  private onBlur = () => {
    this.focusType = FOCUS_TYPE.NONE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private iconCssClasses = () => ({
    icon: true,
    'slot-hidden': !this.hasIconSlot,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  private hostCssClasses = () => ({
    'wpp-internal-label': true,
    [this.typography]: true,
    disabled: this.disabled,
  })

  private infoWrapperCssClasses = () => ({
    'info-wrapper': true,
    'with-icon': this.hasIconSlot,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onKeyUp={this.onKeyUp}
        onBlur={this.onBlur}
        exportparts="info-wrapper, text, optional-text, tooltip, icon, icon-wrapper"
      >
        {!!this.labelText && (
          <div class={this.infoWrapperCssClasses()} part="info-wrapper" role={this.role}>
            <wpp-typography type={this.typography} class="text" part="text">
              {this.labelText}
            </wpp-typography>
            {this.optional && (
              <wpp-typography type="s-body" class="optional" part="optional-text">
                ({this.locales.optional})
              </wpp-typography>
            )}
          </div>
        )}

        {!!this.description && this.hasIconSlot ? (
          <wpp-tooltip class="tooltip" text={this.description} config={this.tooltipConfig} part="tooltip">
            <WrappedSlot
              wrapperClass={this.iconCssClasses()}
              name="icon"
              onSlotchange={this.updateSlotData}
              role="button"
              tabIndex={0}
              aria-label="Show info"
            />
          </wpp-tooltip>
        ) : (
          <WrappedSlot
            wrapperClass={this.iconCssClasses()}
            name="icon"
            onSlotchange={this.updateSlotData}
            role="button"
            tabIndex={0}
            aria-label="Show info"
          />
        )}
      </Host>
    )
  }
}
