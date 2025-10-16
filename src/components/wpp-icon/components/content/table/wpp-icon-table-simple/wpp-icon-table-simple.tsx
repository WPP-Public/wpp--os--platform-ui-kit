import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-table-simple',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTableSimple {
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
      <WppIcon name="wpp-icon-table-simple" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M3 5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778ZM5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V9.41667H9.41667V4.16667H5.52778ZM9.41667 10.5833H4.16667V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H9.41667V10.5833ZM10.5833 10.5833V15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V10.5833H10.5833ZM15.8333 9.41667V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667H10.5833V9.41667H15.8333Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
