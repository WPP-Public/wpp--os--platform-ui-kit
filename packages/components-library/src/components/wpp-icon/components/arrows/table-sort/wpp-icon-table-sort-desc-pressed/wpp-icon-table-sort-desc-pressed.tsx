import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-table-sort-desc-pressed',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTableSortDescPressed {
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
        name="wpp-icon-table-sort-desc-pressed"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path d="M10 4L13.4641 8.5H6.5359L10 4Z" fill="#8B919A" />
        <path d="M10 16L13.4641 11.5H6.5359L10 16Z" fill="#343A3F" />
      </WppIcon>
    )
  }
}
