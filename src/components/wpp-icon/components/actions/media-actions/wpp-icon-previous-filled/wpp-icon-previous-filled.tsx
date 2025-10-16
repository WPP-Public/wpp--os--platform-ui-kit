import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

/**
 * @internal
 */
@Component({
  tag: 'wpp-icon-previous-filled',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconPreviousFilled {
  /**
   Defines the icon size, where `s` is **16px** and `m` is **20px**.
   */
  @Prop() readonly size: 's' | 'm' = 'm'

  /**
   Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same.
   */
  @Prop() readonly width?: number

  /**
    Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected.
    */
  @Prop() readonly height?: number

  /**
   Defines the icon color.
   */
  @Prop() readonly color: string = 'var(--wpp-icon-color)'

  render() {
    return (
      <WppIcon
        name="wpp-icon-previous-filled"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M14.8688 3.24061C15.772 2.62173 16.9992 3.26846 16.9992 4.36337V15.6366C16.9992 16.7358 15.7634 17.3816 14.861 16.754L6.69598 11.0753C5.9141 10.5315 5.91814 9.3735 6.70379 8.83518L14.8688 3.24061Z"
          fill="currentColor"
        />
        <path
          d="M3.5833 3C3.26115 3 3 3.26115 3 3.5833V16.4159C3 16.7381 3.26115 16.9992 3.5833 16.9992C3.90545 16.9992 4.1666 16.7381 4.1666 16.4159V3.5833C4.1666 3.26115 3.90545 3 3.5833 3Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
