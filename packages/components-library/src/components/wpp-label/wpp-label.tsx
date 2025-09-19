import { Component, h, Prop, Host } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'
import { DropdownConfig } from '../../types/common'

import { TypographyType } from '../wpp-typography/types'

import { LabelConfig } from './types'

/**
 * @part info-wrapper - wrapper around text and optional text
 * @part text - label text
 * @part optional - optional text
 *
 * @part wrapper - component wrapper element
 * @part content - content wrapper element
 * @part icon - Icon element
 */
@Component({
  tag: 'wpp-label',
  styleUrl: 'wpp-label.scss',
  scoped: true,
})
export class WppLabel {
  /**
   * Indicates description in tooltip when hover on icon
   */
  @Prop() readonly description?: string

  /**
   * Defines which form element the label is bound to.
   */
  @Prop() readonly htmlFor?: string

  /**
   * If **(Optional)** is displayed after the label.
   */
  @Prop() readonly optional: boolean = false

  /**
   * Defines the label typography style.
   */
  @Prop() readonly typography: Extract<TypographyType, 's-strong' | 's-body'> = 's-strong'

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) config?: LabelConfig

  /**
   * Define html tag for a text
   * @internal - for group components (wpp-checkbox-group, wpp-radio-group)
   */
  @Prop() readonly tag: 'label' | 'legend' | string = 'label'

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly tooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'fixed' },
  }

  /**
   * Optional unique identifier for the label element.
   * Useful for associating the label with form controls or for accessibility purposes.
   */
  @Prop() readonly labelId?: string

  private hostCssClasses = () => ({
    'wpp-label': true,
  })

  private renderContent = () => (
    <wpp-internal-label
      labelText={this.config?.text}
      description={this.config?.description}
      optional={this.optional}
      typography={this.typography}
      disabled={this.disabled}
      locales={this.config?.locales}
      tooltipConfig={this.tooltipConfig}
      part="content"
      id={this.labelId}
    >
      {this.config?.icon && h(transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })}
    </wpp-internal-label>
  )

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="wrapper, content, icon">
        <this.tag
          class="internal-label-wrapper"
          part="wrapper"
          {...(this.tag === 'label' && { htmlFor: this.htmlFor, 'aria-label': this.htmlFor })}
        >
          {this.renderContent()}
        </this.tag>
      </Host>
    )
  }
}
