import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-triangle',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTriangle {
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
      <WppIcon name="wpp-icon-triangle" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M8.21689 3.03447C8.97743 1.65495 10.9602 1.65524 11.7203 3.03497L18.3313 15.0347C19.0657 16.3678 18.1014 18 16.5795 18H3.35295C1.83077 18 0.866478 16.3673 1.60138 15.0342L8.21689 3.03447ZM10.6422 3.62891C10.3499 3.09824 9.5873 3.09813 9.29478 3.62871L2.67927 15.6285C2.39661 16.1412 2.7675 16.7692 3.35295 16.7692H16.5795C17.1649 16.7692 17.5357 16.1414 17.2533 15.6287L10.6422 3.62891Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
