import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-float-center',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconFloatCenter {
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
      <WppIcon name="wpp-icon-float-center" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M7.5 5.833h5v5H7.5V5.833M2.5 2.5h15v1.667H2.5V2.5m0 10h15v1.667H2.5v-1.667m0 3.333h11.667v1.667H2.5v-1.667z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
