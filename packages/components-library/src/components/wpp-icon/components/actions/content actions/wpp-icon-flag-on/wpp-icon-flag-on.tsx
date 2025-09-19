import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-flag-on',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconFlagOn {
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
      <WppIcon name="wpp-icon-flag-on" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M3 3.59205C3 3.26507 3.26507 3 3.59205 3H16.6203C17.1083 3 17.3867 3.55704 17.094 3.94733L13.8067 8.3294L17.094 12.7115C17.3867 13.1018 17.1083 13.6588 16.6203 13.6588L4.1841 13.6584V17.408C4.1841 17.7077 3.96136 17.9554 3.67239 17.9946L3.59205 18C3.29232 18 3.04461 17.7773 3.0054 17.4883L3 17.408V3.59205ZM15.4361 4.1841H4.1841V12.4747H15.4361L12.5929 8.68468C12.435 8.47415 12.435 8.18465 12.5929 7.97412L15.4361 4.1841Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
