import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../WppIcon'

@Component({
  tag: 'wpp-icon-bar',
  styleUrl: '../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconBar {
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
      <WppIcon name="wpp-icon-bar" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M6.75 8C7.16421 8 7.5 8.33579 7.5 8.75V14.25C7.5 14.6642 7.16421 15 6.75 15C6.33579 15 6 14.6642 6 14.25V8.75C6 8.33579 6.33579 8 6.75 8Z"
          fill="currentColor"
        />
        <path
          d="M9.25 8C9.66421 8 10 8.33579 10 8.75V14.25C10 14.6642 9.66421 15 9.25 15C8.83579 15 8.5 14.6642 8.5 14.25V8.75C8.5 8.33579 8.83579 8 9.25 8Z"
          fill="currentColor"
        />
        <path
          d="M11.75 8C12.1642 8 12.5 8.33579 12.5 8.75V14.25C12.5 14.6642 12.1642 15 11.75 15C11.3358 15 11 14.6642 11 14.25V8.75C11 8.33579 11.3358 8 11.75 8Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.5 4.75C3.5 3.23122 4.73122 2 6.25 2H12.25C13.7688 2 15 3.23122 15 4.75V5.25H15.25C16.7688 5.25 18 6.48122 18 8V12C18 13.5188 16.7688 14.75 15.25 14.75H15V15.25C15 16.7688 13.7688 18 12.25 18H6.25C4.73122 18 3.5 16.7688 3.5 15.25V4.75ZM15 13.25H15.25C15.9404 13.25 16.5 12.6904 16.5 12V8C16.5 7.30964 15.9404 6.75 15.25 6.75H15V13.25ZM13.5 5.25V4.75C13.5 4.05964 12.9404 3.5 12.25 3.5H6.25C5.55964 3.5 5 4.05964 5 4.75V5.25H13.5ZM5 6.75H13.5V15.25C13.5 15.9404 12.9404 16.5 12.25 16.5H6.25C5.55964 16.5 5 15.9404 5 15.25V6.75Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
