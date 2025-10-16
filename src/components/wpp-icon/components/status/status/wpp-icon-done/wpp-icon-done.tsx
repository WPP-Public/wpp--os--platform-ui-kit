import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-done',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconDone {
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
      <WppIcon name="wpp-icon-done" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.6553 3.84467C18.9482 4.13756 18.9482 4.61244 18.6553 4.90533L7.40533 16.1553C7.11244 16.4482 6.63756 16.4482 6.34467 16.1553L1.34467 11.1553C1.05178 10.8624 1.05178 10.3876 1.34467 10.0947C1.63756 9.80178 2.11244 9.80178 2.40533 10.0947L6.875 14.5643L17.5947 3.84467C17.8876 3.55178 18.3624 3.55178 18.6553 3.84467Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
