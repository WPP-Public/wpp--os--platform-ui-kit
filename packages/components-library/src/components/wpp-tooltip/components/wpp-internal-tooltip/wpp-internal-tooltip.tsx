import { Component, Host, h, Prop, Element, Fragment } from '@stencil/core'

import { TooltipThemeTypes } from '../../types'
import { AriaProps } from '../../../../types/common'

/**
 * @part tooltip-content - tooltip content wrapper element
 * @part header - header component
 * @part text - Main text content
 * @part value - value text element
 * @part icon-error - icon error element
 *
 * @internal - this component is used in wpp-tooltip component
 */
@Component({
  tag: 'wpp-internal-tooltip',
  styleUrl: 'wpp-internal-tooltip.scss',
  shadow: true,
})
export class WppTooltip {
  @Element() host: HTMLWppInternalTooltipElement

  /**
   * Indicates tooltip style
   *
   * @internal - this prop is used by wpp-tooltip component
   */
  @Prop() readonly cssStyle?: Record<string, string>

  /**
   * Indicates tooltip title
   */
  @Prop() readonly header?: string

  /**
   * Sets the main tooltip message
   */
  @Prop() readonly text?: string

  /**
   * Sets the word breaking behaviour. By default, it is "break-word", meaning the words
   * will be broken if there is not enough space and a hyphen ("-") is added. The other option
   * is "break-all", which breaks the word but does not add the hyphen.
   */
  @Prop() readonly wordBreak?: 'break-word' | 'break-all' | 'auto-phrase' = 'break-word'

  /**
   * When set, adds a value row below the main message
   */
  @Prop() readonly value?: string

  /**
   * If `true`, the tooltip is displayed in an error state
   */
  @Prop() readonly error: boolean = false

  /**
   * If `true`, the tooltip is displayed in a warning state
   */
  @Prop() readonly warning: boolean = false

  /**
   * Tooltip theme, can be `dark` or `light`, default value is `dark`, not related to the WPP theme
   */
  @Prop() readonly theme: TooltipThemeTypes = 'dark'

  /**
   * When set, allow to pass string represented HTML in text property
   * @deprecated - This prop is no longer used by the component and will be deleted in v4.0.0.
   */
  @Prop() readonly allowHTML?: boolean

  /**
   * Add an external class to the tooltip wrapper. This class will be applied to this wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .tooltip-wrapper.external-class-name {
   *  ...
   * }
   */
  @Prop() readonly externalClass: string = ''

  /**
   * Contains the tooltip `aria-` props.
   */
  @Prop() readonly ariaProp: AriaProps = {}

  private cssClasses = () => ({
    'tooltip-wrapper': true,
    [`${this.theme}`]: true,
    'with-header': !!this.header,
    'with-value': !!this.value,
    error: this.error,
    warning: this.warning,
  })

  private hostCssClasses = () => ({
    'wpp-internal-tooltip': true,
    [`${this.externalClass}`]: true,
  })

  private headerCssClasses = () => ({
    header: !!this.header,
  })

  private textCssClasses = () => ({
    text: !!this.text,
  })

  private valueCssClasses = () => ({
    value: !!this.value,
  })

  private getIconBasedOnProps = () => {
    if (this.error) {
      return <wpp-icon-error class="left-icon" part="icon-error" />
    }

    if (this.warning) {
      return <wpp-icon-warning color="var(--wpp-warning-color-400)" class="left-icon" />
    }

    return null
  }

  private getTextLines = () => {
    if (!this.text) return null

    return this.text
      .trim()
      .split('\n')
      .map((line: string) => (
        <Fragment>
          {line}
          <br />
        </Fragment>
      ))
  }

  render() {
    return (
      <Host class={this.hostCssClasses()} style={this.cssStyle} exportparts="tooltip-content">
        <div class={this.cssClasses()} style={{ wordBreak: this.wordBreak }} part="tooltip-content">
          <div class="content-with-icon" id={this.ariaProp.describedby}>
            {this.getIconBasedOnProps() && <div class="icon-wrapper">{this.getIconBasedOnProps()}</div>}
            <div class="content-wrapper">
              {!!this.header && (
                <span class={this.headerCssClasses()} part="header">
                  {this.header}
                </span>
              )}
              {!!this.text && (
                <span class={this.textCssClasses()} part="text">
                  {this.getTextLines()}
                </span>
              )}
              {!!this.value && (
                <span class={this.valueCssClasses()} part="value">
                  {this.value}
                </span>
              )}
            </div>
          </div>
        </div>
      </Host>
    )
  }
}
