import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-home',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconHome {
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
      <WppIcon name="wpp-icon-home" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M3.54167 17.2917H7.70833C7.93833 17.2917 8.125 17.1051 8.125 16.8751V12.7084C8.125 12.248 8.49792 11.8751 8.95833 11.8751H11.0417C11.5021 11.8751 11.875 12.248 11.875 12.7084V16.8751C11.875 17.1051 12.0617 17.2917 12.2917 17.2917H16.4583C16.6883 17.2917 16.875 17.1051 16.875 16.8751V8.92133C16.875 8.1555 16.5238 7.43175 15.9221 6.95758L10 2.29175L4.07792 6.95758C3.47625 7.43175 3.125 8.1555 3.125 8.92133V16.8751C3.125 17.1051 3.31167 17.2917 3.54167 17.2917Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linejoin="round"
        />
      </WppIcon>
    )
  }
}
