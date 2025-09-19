import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-pentagon',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconPentagon {
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
      <WppIcon name="wpp-icon-pentagon" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M8.83236 2.38224C9.53384 1.87258 10.4837 1.87259 11.1852 2.38224L17.4925 6.96472C18.1939 7.47438 18.4875 8.37778 18.2195 9.20242L15.8104 16.617C15.5424 17.4417 14.774 18 13.9069 18H6.1107C5.24361 18 4.47514 17.4417 4.2072 16.617L1.79805 9.20242C1.5301 8.37777 1.82363 7.47438 2.52512 6.96472L8.83236 2.38224ZM10.4613 3.37869C10.1915 3.18266 9.82612 3.18266 9.55631 3.37869L3.24908 7.96116C2.97927 8.15718 2.86638 8.50464 2.96943 8.82182L5.37858 16.2364C5.48164 16.5536 5.7772 16.7683 6.1107 16.7683H13.9069C14.2404 16.7683 14.5359 16.5536 14.639 16.2364L17.0481 8.82182C17.1512 8.50464 17.0383 8.15718 16.7685 7.96116L10.4613 3.37869Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
