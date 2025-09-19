import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

enum MenuDirectionIconPath {
  vertical = 'M10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14ZM10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8ZM12 4C12 2.89543 11.1046 2 10 2C8.89543 2 8 2.89543 8 4C8 5.10457 8.89543 6 10 6C11.1046 6 12 5.10457 12 4Z',
  horizontal = 'M6 10C6 11.1046 5.10457 12 4 12C2.89543 12 2 11.1046 2 10C2 8.89543 2.89543 8 4 8C5.10457 8 6 8.89543 6 10ZM12 10C12 11.1046 11.1046 12 10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10ZM16 12C17.1046 12 18 11.1046 18 10C18 8.89543 17.1046 8 16 8C14.8954 8 14 8.89543 14 10C14 11.1046 14.8954 12 16 12Z',
}

@Component({
  tag: 'wpp-icon-more',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconMore {
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

  /**
   Defines the icon direction.
   */
  @Prop() readonly direction: 'vertical' | 'horizontal' = 'horizontal'

  render() {
    return (
      <WppIcon name="wpp-icon-more" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path d={MenuDirectionIconPath[this.direction]} fill="currentColor" />
      </WppIcon>
    )
  }
}
