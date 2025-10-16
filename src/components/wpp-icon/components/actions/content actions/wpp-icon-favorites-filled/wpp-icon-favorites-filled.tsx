import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-favorites-filled',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconFavoritesFilled {
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

  componentWillLoad() {
    console.warn(
      '%cwpp-icon-favorites-filled component is deprecated. Please, use wpp-icon-favourites-filled instead',
      'color: black; font-size: 12px;',
    )
  }

  render() {
    return (
      <WppIcon
        name="wpp-icon-favorites-filled"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M10.6921 15.4451C10.5468 15.3689 10.3732 15.3689 10.2279 15.4451L6.07717 17.6208C5.71403 17.8111 5.28875 17.5075 5.35081 17.1022L6.07747 12.3569C6.1015 12.2 6.04959 12.041 5.9376 11.9285L2.69348 8.66928C2.40504 8.3795 2.56742 7.88487 2.97148 7.82242L7.68898 7.09327C7.84945 7.06846 7.98788 6.96728 8.06023 6.82191L10.0124 2.89943C10.1963 2.5298 10.7237 2.5298 10.9076 2.89943L12.8598 6.82191C12.9321 6.96728 13.0706 7.06846 13.231 7.09327L17.9485 7.82242C18.3526 7.88487 18.515 8.3795 18.2265 8.66928L14.9824 11.9285C14.8704 12.041 14.8185 12.2 14.8425 12.3569L15.5692 17.1022C15.6313 17.5075 15.206 17.8111 14.8428 17.6208L10.6921 15.4451Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
