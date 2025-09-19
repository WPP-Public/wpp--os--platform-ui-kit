import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-shield',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconShield {
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
      <WppIcon name="wpp-icon-shield" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M2.80005 5C2.80005 4.66863 3.06868 4.4 3.40005 4.4C5.53078 4.4 7.60642 3.64522 9.64005 2.12C9.85338 1.96 10.1467 1.96 10.36 2.12C12.3937 3.64522 14.4693 4.4 16.6 4.4C16.9314 4.4 17.2 4.66863 17.2 5V9.2C17.2 13.201 14.834 16.1406 10.22 17.9582C10.0786 18.0139 9.92146 18.0139 9.78013 17.9582C5.1661 16.1406 2.80005 13.201 2.80005 9.2V5ZM4.00005 5.58234V9.2C4.00005 12.6045 5.96274 15.1031 10 16.7535C14.0374 15.1031 16 12.6045 16 9.2V5.58234C13.9382 5.46068 11.9354 4.71063 10 3.34225C8.06472 4.71063 6.06193 5.46068 4.00005 5.58234Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
