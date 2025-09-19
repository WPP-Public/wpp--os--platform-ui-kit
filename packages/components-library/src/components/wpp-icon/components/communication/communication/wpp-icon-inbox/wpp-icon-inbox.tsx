import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-inbox',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconInbox {
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
      <WppIcon name="wpp-icon-inbox" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M5.52778 3H14.4722C15.8201 3 16.9216 4.05502 16.996 5.38434L17 5.52778V14.4722C17 15.8201 15.945 16.9216 14.6157 16.996L14.4722 17H5.52778C4.17986 17 3.07836 15.945 3.004 14.6157L3 14.4722V5.52778C3 4.17986 4.05502 3.07836 5.38434 3.004L5.52778 3H14.4722H5.52778ZM4.16667 11.9444V14.4722C4.16667 15.1864 4.71664 15.772 5.41615 15.8288L5.52778 15.8333H14.4722C15.1864 15.8333 15.772 15.2834 15.8288 14.5839L15.8333 14.4722V11.9444H12.8583C12.5981 13.2264 11.497 14.2031 10.1558 14.2737L10 14.2778C8.6412 14.2778 7.49943 13.3486 7.1754 12.091L7.14168 11.9444H4.16667V14.4722V11.9444ZM14.4722 4.16667H5.52778C4.81364 4.16667 4.22796 4.71664 4.17118 5.41615L4.16667 5.52778V10.7778H7.66667C7.96199 10.7778 8.20605 10.9972 8.24468 11.282L8.25 11.3611C8.25 12.3276 9.0335 13.1111 10 13.1111C10.9262 13.1111 11.6844 12.3915 11.746 11.4809L11.75 11.3611C11.75 11.0658 11.9695 10.8217 12.2542 10.7831L12.3333 10.7778H15.8333V5.52778C15.8333 4.81364 15.2834 4.22796 14.5839 4.17118L14.4722 4.16667Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
