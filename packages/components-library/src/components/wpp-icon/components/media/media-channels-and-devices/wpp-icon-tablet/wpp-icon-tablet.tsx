import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-tablet',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTablet {
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
      <WppIcon name="wpp-icon-tablet" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M8.5 12.25C8.08579 12.25 7.75 12.5858 7.75 13C7.75 13.4142 8.08579 13.75 8.5 13.75H11.5C11.9142 13.75 12.25 13.4142 12.25 13C12.25 12.5858 11.9142 12.25 11.5 12.25H8.5Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 3.75C2.48122 3.75 1.25 4.98122 1.25 6.5V13.5C1.25 15.0188 2.48122 16.25 4 16.25H16C17.5188 16.25 18.75 15.0188 18.75 13.5V6.5C18.75 4.98122 17.5188 3.75 16 3.75H4ZM2.75 6.5C2.75 5.80964 3.30964 5.25 4 5.25H16C16.6904 5.25 17.25 5.80964 17.25 6.5V13.5C17.25 14.1904 16.6904 14.75 16 14.75H4C3.30964 14.75 2.75 14.1904 2.75 13.5V6.5Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
