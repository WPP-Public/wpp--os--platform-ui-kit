import { Component, Host, h, Prop } from '@stencil/core'

/**
 * @slot - Icon slot. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 */
// @deprecated - This component is deprecated and will be deleted in v4.0.0. Use wpp-action-button instead.
@Component({
  tag: 'wpp-icon-button',
  styleUrl: 'wpp-icon-button.scss',
  shadow: true,
})
export class WppIconButton {
  /**
   * Defines the button size. Setting this attribute changes the button height and padding.
   */
  @Prop() readonly size: 'm' | 's' = 'm'

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the component is in loading state.
   */
  @Prop({ reflect: true }) readonly loading: boolean = false

  /**
   * Defines the button name.
   * */
  @Prop() readonly name?: string

  componentWillLoad() {
    console.warn(
      '%cwpp-icon-button component is deprecated. Please, use wpp-action-button instead',
      'color: black; font-size: 12px;',
    )
  }

  private hostCssClasses = () => ({
    'wpp-icon-button': true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="wrapper, inner">
        <wpp-button
          variant="secondary"
          size={this.size}
          disabled={this.disabled}
          loading={this.loading}
          name={this.name}
          data-testid="wppIconButton"
          part="wrapper"
        >
          <slot slot="icon-start" part="inner" />
        </wpp-button>
      </Host>
    )
  }
}
