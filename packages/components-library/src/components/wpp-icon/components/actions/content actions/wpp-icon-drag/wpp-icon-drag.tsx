import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-drag',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconDrag {
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
      <WppIcon name="wpp-icon-drag" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.5 16C8.5 14.8954 7.60457 14 6.5 14C5.39543 14 4.5 14.8954 4.5 16C4.5 17.1046 5.39543 18 6.5 18C7.60457 18 8.5 17.1046 8.5 16ZM8.5 10C8.5 8.89543 7.60457 8 6.5 8C5.39543 8 4.5 8.89543 4.5 10C4.5 11.1046 5.39543 12 6.5 12C7.60457 12 8.5 11.1046 8.5 10ZM6.5 2C7.60457 2 8.5 2.89543 8.5 4C8.5 5.10457 7.60457 6 6.5 6C5.39543 6 4.5 5.10457 4.5 4C4.5 2.89543 5.39543 2 6.5 2ZM15.5 16C15.5 14.8954 14.6046 14 13.5 14C12.3954 14 11.5 14.8954 11.5 16C11.5 17.1046 12.3954 18 13.5 18C14.6046 18 15.5 17.1046 15.5 16ZM15.5 10C15.5 8.89543 14.6046 8 13.5 8C12.3954 8 11.5 8.89543 11.5 10C11.5 11.1046 12.3954 12 13.5 12C14.6046 12 15.5 11.1046 15.5 10ZM13.5 2C14.6046 2 15.5 2.89543 15.5 4C15.5 5.10457 14.6046 6 13.5 6C12.3954 6 11.5 5.10457 11.5 4C11.5 2.89543 12.3954 2 13.5 2Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
