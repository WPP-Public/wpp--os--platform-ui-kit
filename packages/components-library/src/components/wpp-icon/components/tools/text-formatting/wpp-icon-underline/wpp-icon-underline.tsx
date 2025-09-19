import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-underline',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconUnderline {
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
      <WppIcon name="wpp-icon-underline" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M6.5 3.75C6.5 3.33579 6.16421 3 5.75 3C5.33579 3 5 3.33579 5 3.75V9C5 10.367 5.33884 11.7359 6.1606 12.7802C7.00313 13.8509 8.29163 14.5 10 14.5C11.7084 14.5 12.9969 13.8509 13.8394 12.7802C14.6612 11.7359 15 10.367 15 9V3.75C15 3.33579 14.6642 3 14.25 3C13.8358 3 13.5 3.33579 13.5 3.75V9C13.5 10.1434 13.2138 11.1495 12.6606 11.8526C12.1281 12.5293 11.2916 13 10 13C8.70837 13 7.87187 12.5293 7.3394 11.8526C6.78616 11.1495 6.5 10.1434 6.5 9V3.75ZM5.75 15.5C5.33579 15.5 5 15.8358 5 16.25C5 16.6642 5.33579 17 5.75 17H14.25C14.6642 17 15 16.6642 15 16.25C15 15.8358 14.6642 15.5 14.25 15.5H5.75Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
