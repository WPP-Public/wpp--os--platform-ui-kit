import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../WppIcon'

@Component({
  tag: 'wpp-icon-bicycle',
  styleUrl: '../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconBicycle {
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
      <WppIcon name="wpp-icon-bicycle" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.7158 3.3284C10.8485 3.12361 11.076 3 11.32 3H13.24C13.6376 3 13.96 3.32235 13.96 3.72C13.96 4.11764 13.6376 4.44 13.24 4.44H12.4309L14.6165 9.3255C14.8687 9.26952 15.1309 9.24 15.4 9.24C17.3882 9.24 19 10.8518 19 12.84C19 14.8282 17.3882 16.44 15.4 16.44C13.4118 16.44 11.8 14.8282 11.8 12.84C11.8 11.6345 12.3925 10.5674 13.3022 9.91402L13.1092 9.48246L10.4698 13.2529C10.3351 13.4454 10.1149 13.56 9.88 13.56H4.6C4.3406 13.56 4.10126 13.4205 3.97346 13.1948C3.84565 12.9691 3.84915 12.692 3.98261 12.4696L5.03061 10.7229C4.89146 10.6948 4.74745 10.68 4.6 10.68C3.40706 10.68 2.44 11.6471 2.44 12.84C2.44 14.0329 3.40706 15 4.6 15C5.23972 15 5.81448 14.7219 6.20999 14.28H7.90044C7.34492 15.5515 6.07623 16.44 4.6 16.44C2.61177 16.44 1 14.8282 1 12.84C1 10.8518 2.61177 9.24 4.6 9.24C5.01998 9.24 5.42316 9.31192 5.7979 9.44411L6.65926 8.00852L5.835 6.36H5.56C5.16235 6.36 4.84 6.03764 4.84 5.64C4.84 5.24235 5.16235 4.92 5.56 4.92H6.26648C6.27513 4.91984 6.28378 4.91984 6.29241 4.92H7.72C8.11764 4.92 8.44 5.24235 8.44 5.64C8.44 6.03764 8.11764 6.36 7.72 6.36H7.44496L7.92498 7.32004H12.1418L10.6628 4.01402C10.5631 3.79126 10.5831 3.53318 10.7158 3.3284ZM14.7428 13.134L13.9111 11.2751C13.4977 11.6686 13.24 12.2242 13.24 12.84C13.24 14.0329 14.2071 15 15.4 15C16.5929 15 17.56 14.0329 17.56 12.84C17.56 11.6471 16.5929 10.68 15.4 10.68C15.3413 10.68 15.2831 10.6823 15.2256 10.6869L16.0572 12.546C16.2196 12.909 16.057 13.3348 15.694 13.4972C15.331 13.6596 14.9052 13.497 14.7428 13.134ZM7.42258 9.53517L5.87166 12.12H8.71502L7.42258 9.53517ZM9.98338 11.4368L11.8571 8.76004H8.64498L9.98338 11.4368Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
