import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-auto-sum',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconAutoSum {
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
      <WppIcon name="wpp-icon-auto-sum" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M3.80991 3.70633C3.92766 3.42962 4.1993 3.25 4.50002 3.25H15.5C15.9142 3.25 16.25 3.58579 16.25 4C16.25 4.41421 15.9142 4.75 15.5 4.75H6.26246L10.4077 9.05817C10.6731 9.334 10.6882 9.76544 10.4428 10.0592L6.10432 15.25H15.5C15.9142 15.25 16.25 15.5858 16.25 16C16.25 16.4142 15.9142 16.75 15.5 16.75H4.50002C4.20881 16.75 3.94392 16.5814 3.8206 16.3176C3.69727 16.0538 3.7378 15.7425 3.92455 15.519L8.86039 9.61341L3.95957 4.52001C3.75107 4.30332 3.69216 3.98303 3.80991 3.70633Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
