import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-service',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconService {
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
      <WppIcon name="wpp-icon-service" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M14.0604 8.06071C13.7677 8.35343 13.3837 8.5 12.9998 8.5C12.6158 8.5 12.2318 8.35343 11.9391 8.06071C11.3533 7.47529 11.3533 6.52514 11.9391 5.93971L14.882 2.99671C14.2499 2.68171 13.5397 2.5 12.7855 2.5C10.182 2.5 8.0714 4.61071 8.0714 7.21429C8.0714 7.88757 8.21497 8.527 8.46953 9.10643L3.00205 14.5737C2.33265 15.2431 2.33265 16.3287 3.00205 16.9977C3.33718 17.3324 3.77559 17.5 4.21443 17.5C4.65327 17.5 5.09168 17.3324 5.4268 16.9977L10.8939 11.5304C11.4733 11.785 12.1122 11.9286 12.7859 11.9286C15.3894 11.9286 17.5 9.81786 17.5 7.21429C17.5 6.46 17.3183 5.74986 17.0037 5.11771L14.0604 8.06071Z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linejoin="round"
        />
      </WppIcon>
    )
  }
}
