import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-reject',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconReject {
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
      <WppIcon name="wpp-icon-reject" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.99996 3.04175C6.15698 3.04175 3.04163 6.1571 3.04163 10.0001C3.04163 13.8431 6.15698 16.9584 9.99996 16.9584C13.8429 16.9584 16.9583 13.8431 16.9583 10.0001C16.9583 6.1571 13.8429 3.04175 9.99996 3.04175ZM1.54163 10.0001C1.54163 5.32867 5.32855 1.54175 9.99996 1.54175C14.6714 1.54175 18.4583 5.32867 18.4583 10.0001C18.4583 14.6715 14.6714 18.4584 9.99996 18.4584C5.32855 18.4584 1.54163 14.6715 1.54163 10.0001ZM13.2386 6.76142C13.5315 7.05431 13.5315 7.52918 13.2386 7.82208L11.0606 10.0001L13.2386 12.1781C13.5315 12.471 13.5315 12.9459 13.2386 13.2387C12.9457 13.5316 12.4709 13.5316 12.178 13.2387L9.99996 11.0607L7.82196 13.2387C7.52906 13.5316 7.05419 13.5316 6.7613 13.2387C6.4684 12.9459 6.4684 12.471 6.7613 12.1781L8.9393 10.0001L6.7613 7.82208C6.4684 7.52918 6.4684 7.05431 6.7613 6.76142C7.05419 6.46852 7.52906 6.46852 7.82196 6.76142L9.99996 8.93942L12.178 6.76142C12.4709 6.46852 12.9457 6.46852 13.2386 6.76142Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
