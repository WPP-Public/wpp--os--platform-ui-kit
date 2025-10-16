import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-table-default',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTableDefault {
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
        name="wpp-icon-table-default"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M3 5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778ZM5.52778 4.16667C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V7.27778H7.27778V4.16667H5.52778ZM4.16667 8.44444V11.5556H7.27778V8.44444H4.16667ZM8.44444 8.44444L8.44444 11.5556H11.5556V8.44444H8.44444ZM12.7222 8.44444L12.7222 11.5556H15.8333V8.44444H12.7222ZM11.5556 12.7222H8.44444V15.8333H11.5556V12.7222ZM12.7222 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V12.7222H12.7222V15.8333ZM12.7222 7.27778H15.8333V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667H12.7222V7.27778ZM11.5556 4.16667H8.44444V7.27778H11.5556V4.16667ZM4.16667 12.7222V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H7.27778V12.7222H4.16667Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
