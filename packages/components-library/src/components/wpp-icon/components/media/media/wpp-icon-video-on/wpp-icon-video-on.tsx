import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-video-on',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconVideoOn {
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
      <WppIcon name="wpp-icon-video-on" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M11.4 4C12.8359 4 14 5.16406 14 6.6V6.7384L17.0912 4.884C17.4911 4.64389 18 4.93195 18 5.3984V14.6C18 15.0664 17.4912 15.3544 17.0913 15.1145L14 13.26V13.4C14 14.8359 12.8359 16 11.4 16H4.6C3.16406 16 2 14.8359 2 13.4V6.6C2 5.16406 3.16406 4 4.6 4H11.4ZM11.4 5.2H4.6C3.8268 5.2 3.2 5.8268 3.2 6.6V13.4C3.2 14.1732 3.8268 14.8 4.6 14.8H11.4C12.1732 14.8 12.8 14.1732 12.8 13.4V6.6C12.8 5.8268 12.1732 5.2 11.4 5.2ZM16.8 6.45848L14 8.1396V11.8603L16.8 13.5403V6.45848Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
