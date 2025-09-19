import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-dash',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconDash {
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
      <WppIcon name="wpp-icon-dash" width={this.width} height={this.height} size={this.size} color={this.color}>
        <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </WppIcon>
    )
  }
}
