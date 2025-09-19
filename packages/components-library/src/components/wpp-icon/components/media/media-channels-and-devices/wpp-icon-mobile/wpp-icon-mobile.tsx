import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-mobile',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconMobile {
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
      <WppIcon name="wpp-icon-mobile" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M11.1667 14.3334C11.1667 14.8857 10.719 15.3334 10.1667 15.3334C9.61439 15.3334 9.16667 14.8857 9.16667 14.3334C9.16667 13.7811 9.61439 13.3334 10.1667 13.3334C10.719 13.3334 11.1667 13.7811 11.1667 14.3334Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.75 5C4.75 3.48122 5.98122 2.25 7.5 2.25H12.5C14.0188 2.25 15.25 3.48122 15.25 5V15C15.25 16.5188 14.0188 17.75 12.5 17.75H7.5C5.98122 17.75 4.75 16.5188 4.75 15V5ZM7.5 3.75C6.80964 3.75 6.25 4.30964 6.25 5V15C6.25 15.6904 6.80964 16.25 7.5 16.25H12.5C13.1904 16.25 13.75 15.6904 13.75 15V5C13.75 4.30964 13.1904 3.75 12.5 3.75H7.5Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
