import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-tick',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTick {
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
      <WppIcon name="wpp-icon-tick" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M6.25 10L8.5747 12.1794C8.76703 12.3597 9.06631 12.3597 9.25864 12.1794L14.25 7.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </WppIcon>
    )
  }
}
