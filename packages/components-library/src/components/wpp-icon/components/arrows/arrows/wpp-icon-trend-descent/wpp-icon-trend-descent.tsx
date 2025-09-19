import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-trend-descent',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTrendDescent {
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
      <WppIcon
        name="wpp-icon-trend-descent"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.9887 5.92798C1.69581 5.63509 1.22094 5.63509 0.928044 5.92798C0.635151 6.22088 0.635151 6.69575 0.928044 6.98864L6.76138 12.822C7.05427 13.1149 7.52914 13.1149 7.82204 12.822L12.2917 8.35231L16.7311 12.7917H14.7916C14.3774 12.7917 14.0416 13.1275 14.0416 13.5417C14.0416 13.9559 14.3774 14.2917 14.7916 14.2917H18.5416C18.9558 14.2917 19.2916 13.9559 19.2916 13.5417V9.79169C19.2916 9.37747 18.9558 9.04169 18.5416 9.04169C18.1274 9.04169 17.7916 9.37747 17.7916 9.79169V11.7309L12.822 6.76132C12.5291 6.46842 12.0543 6.46842 11.7614 6.76132L7.29171 11.231L1.9887 5.92798Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
