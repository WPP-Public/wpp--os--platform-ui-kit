import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-download',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconDownload {
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
      <WppIcon name="wpp-icon-download" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M9.46967 14.5303C9.76256 14.8232 10.2374 14.8232 10.5303 14.5303L13.5303 11.5303C13.8232 11.2374 13.8232 10.7626 13.5303 10.4697C13.2374 10.1768 12.7626 10.1768 12.4697 10.4697L10.75 12.1893L10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3L9.25 12.1893L7.53033 10.4697C7.23744 10.1768 6.76256 10.1768 6.46967 10.4697C6.17678 10.7626 6.17678 11.2374 6.46967 11.5303L9.46967 14.5303Z"
          fill="currentColor"
        />
        <path
          d="M3.5 16.25C3.08579 16.25 2.75 16.5858 2.75 17C2.75 17.4142 3.08579 17.75 3.5 17.75L16.5 17.75C16.9142 17.75 17.25 17.4142 17.25 17C17.25 16.5858 16.9142 16.25 16.5 16.25L3.5 16.25Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
