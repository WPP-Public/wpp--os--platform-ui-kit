import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-support',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconSupport {
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
      <WppIcon name="wpp-icon-support" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.17109 4.98163C4.35897 6.02083 3.875 7.32889 3.875 8.75C3.875 10.1711 4.35895 11.4791 5.17102 12.5183L6.48148 11.2078C5.99425 10.5116 5.70837 9.66416 5.70837 8.74992C5.70837 7.83568 5.99425 6.98821 6.48148 6.29202L5.17109 4.98163ZM10 14.875C8.57892 14.875 7.27086 14.391 6.23168 13.5789L7.54214 12.2685C8.23833 12.7557 9.0858 13.0416 10 13.0416C10.9143 13.0416 11.7618 12.7557 12.4579 12.2685L13.7684 13.5789C12.7292 14.391 11.4211 14.875 10 14.875ZM14.829 12.5182C15.6411 11.4791 16.125 10.171 16.125 8.75C16.125 7.32892 15.641 6.02086 14.8289 4.98168L13.5186 6.29202C14.0058 6.98821 14.2917 7.83568 14.2917 8.74992C14.2917 9.66416 14.0058 10.5116 13.5186 11.2078L14.829 12.5182ZM6.23177 3.92098L7.54214 5.23135C8.23833 4.74412 9.0858 4.45825 10 4.45825C10.9143 4.45825 11.7618 4.74412 12.4579 5.23136L13.7683 3.92102C12.7291 3.10895 11.4211 2.625 10 2.625C8.57896 2.625 7.27094 3.10893 6.23177 3.92098ZM2.375 8.75C2.375 4.53883 5.78883 1.125 10 1.125C14.2112 1.125 17.625 4.53883 17.625 8.75C17.625 12.7081 14.6091 15.9618 10.75 16.3386V17.7917H15.625C16.0392 17.7917 16.375 18.1275 16.375 18.5417C16.375 18.956 16.0392 19.2917 15.625 19.2917H4.375C3.96079 19.2917 3.625 18.956 3.625 18.5417C3.625 18.1275 3.96079 17.7917 4.375 17.7917H9.25V16.3386C5.39085 15.9618 2.375 12.7081 2.375 8.75ZM7.20837 8.74992C7.20837 7.20812 8.45825 5.95825 10 5.95825C11.5418 5.95825 12.7917 7.20812 12.7917 8.74992C12.7917 10.2917 11.5418 11.5416 10 11.5416C8.45825 11.5416 7.20837 10.2917 7.20837 8.74992Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
