import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-triangle-fill',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTriangleFill {
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
        name="wpp-icon-triangle-fill"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M13.1271 9.24407C13.5876 9.64284 13.5876 10.3572 13.1271 10.7559L9.65465 13.7632C9.00701 14.3241 8 13.864 8 13.0073L8 6.99275C8 6.136 9.00701 5.67594 9.65465 6.23682L13.1271 9.24407Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
