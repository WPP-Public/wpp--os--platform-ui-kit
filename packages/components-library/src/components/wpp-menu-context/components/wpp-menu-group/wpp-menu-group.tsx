import { Component, h, Host, Prop } from '@stencil/core'

/**
 * @slot - Content displayed within the `menu-group` component. The default slot, without the name attribute.
 *
 * @part header - header text element
 * @part divider - divider element
 */
@Component({
  tag: 'wpp-menu-group',
  styleUrl: 'wpp-menu-group.scss',
  shadow: true,
})
export class WppMenuGroup {
  /**
   * Defines the header message.
   */
  @Prop() readonly header?: string

  /**
   * If a divider is displayed.
   */
  @Prop() readonly withDivider?: boolean = false

  private hostCssClasses = () => ({
    'wpp-menu-group': true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="header, divider">
        {this.header && (
          <wpp-typography type="2xs-strong" part="header">
            {this.header}
          </wpp-typography>
        )}
        <slot />
        {this.withDivider && <wpp-divider class="slot-divider" part="divider" />}
      </Host>
    )
  }
}
