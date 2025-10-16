import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

/**
 * @internal
 */
@Component({
  tag: 'wpp-icon-stop-filled',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconStopFilled {
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
      <WppIcon name="wpp-icon-stop-filled" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M3 4.36111C3 3.60939 3.60939 3 4.36111 3H15.6389C16.3906 3 17 3.60939 17 4.36111V15.6389C17 16.3906 16.3906 17 15.6389 17H4.36111C3.60939 17 3 16.3906 3 15.6389V4.36111Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
