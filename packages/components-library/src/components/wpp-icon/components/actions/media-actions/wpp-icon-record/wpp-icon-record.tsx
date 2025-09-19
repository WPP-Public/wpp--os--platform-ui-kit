import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-record',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconRecord {
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
      <WppIcon name="wpp-icon-record" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M10 14.8C12.651 14.8 14.8 12.651 14.8 10C14.8 7.34903 12.651 5.2 10 5.2C7.34903 5.2 5.2 7.34903 5.2 10C5.2 12.651 7.34903 14.8 10 14.8ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3.2 10C3.2 6.24446 6.24446 3.2 10 3.2C13.7555 3.2 16.8 6.24446 16.8 10C16.8 13.7555 13.7555 16.8 10 16.8C6.24446 16.8 3.2 13.7555 3.2 10Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
