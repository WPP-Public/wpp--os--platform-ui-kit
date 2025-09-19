import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-cta',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconCta {
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
      <WppIcon name="wpp-icon-cta" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44772 7.55228 9 7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11Z"
          fill="currentColor"
        />
        <path
          d="M11 10C11 10.5523 10.5523 11 10 11C9.44772 11 9 10.5523 9 10C9 9.44772 9.44772 9 10 9C10.5523 9 11 9.44772 11 10Z"
          fill="currentColor"
        />
        <path
          d="M13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 5H5C3.34315 5 2 6.34315 2 8V12C2 13.6569 3.34315 15 5 15H15C16.6569 15 18 13.6569 18 12V8C18 6.34315 16.6569 5 15 5ZM3.5 8C3.5 7.17157 4.17157 6.5 5 6.5H15C15.8284 6.5 16.5 7.17157 16.5 8V12C16.5 12.8284 15.8284 13.5 15 13.5H5C4.17157 13.5 3.5 12.8284 3.5 12V8Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
