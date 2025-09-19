import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-border-outside',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconBorderOutside {
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
        name="wpp-icon-border-outside"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4.5C5.17157 4.5 4.5 5.17157 4.5 6V14C4.5 14.8284 5.17157 15.5 6 15.5H14C14.8284 15.5 15.5 14.8284 15.5 14V6C15.5 5.17157 14.8284 4.5 14 4.5H6Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
