import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-rectangle',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconRectangle {
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
      <WppIcon name="wpp-icon-rectangle" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.5 13.5C3.5 14.1904 4.05964 14.75 4.75 14.75L15.25 14.75C15.9404 14.75 16.5 14.1904 16.5 13.5L16.5 6.5C16.5 5.80964 15.9404 5.25 15.25 5.25L4.75 5.25C4.05964 5.25 3.5 5.80964 3.5 6.5L3.5 13.5ZM4.75 16.25C3.23122 16.25 2 15.0188 2 13.5L2 6.5C2 4.98122 3.23122 3.75 4.75 3.75L15.25 3.75C16.7688 3.75 18 4.98122 18 6.5L18 13.5C18 15.0188 16.7688 16.25 15.25 16.25L4.75 16.25Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
