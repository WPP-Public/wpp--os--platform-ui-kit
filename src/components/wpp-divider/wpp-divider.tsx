import { Component, Host, h, Element, Prop } from '@stencil/core'

/**
 * @part body - Main content element
 */
@Component({
  tag: 'wpp-divider',
  styleUrl: 'wpp-divider.scss',
  shadow: true,
})
export class WppDivider {
  @Element() host: HTMLWppDividerElement

  /**
   * If true, the divider will be vertical. Defaults to false.
   */
  @Prop() readonly vertical: boolean = false

  /**
   * If true, the divider will be interactive and can be dragged to resize. Defaults to false.
   */
  @Prop() readonly resizable: boolean = false

  private hostCssClasses = () => ({
    'wpp-divider': true,
  })

  private dividerCssClasses = () => ({
    'wpp-divider-line': true,
    resizable: this.resizable,
    vertical: this.vertical,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        role="separator"
        aria-orientation={this.vertical ? 'vertical' : 'horizontal'}
        exportparts="body"
      >
        <div class={this.dividerCssClasses()} part="body"></div>
      </Host>
    )
  }
}
