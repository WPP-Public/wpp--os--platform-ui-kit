import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-laptop',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconLaptop {
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
      <WppIcon name="wpp-icon-laptop" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M1.25 15.5C1.25 15.0858 1.58579 14.75 2 14.75H18C18.4142 14.75 18.75 15.0858 18.75 15.5C18.75 15.9142 18.4142 16.25 18 16.25H2C1.58579 16.25 1.25 15.9142 1.25 15.5Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.25 5C2.25 4.0335 3.0335 3.25 4 3.25H16C16.9665 3.25 17.75 4.0335 17.75 5V12C17.75 12.9665 16.9665 13.75 16 13.75H4C3.0335 13.75 2.25 12.9665 2.25 12V5ZM4 4.75C3.86193 4.75 3.75 4.86193 3.75 5V12C3.75 12.1381 3.86193 12.25 4 12.25H16C16.1381 12.25 16.25 12.1381 16.25 12V5C16.25 4.86193 16.1381 4.75 16 4.75H4Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
