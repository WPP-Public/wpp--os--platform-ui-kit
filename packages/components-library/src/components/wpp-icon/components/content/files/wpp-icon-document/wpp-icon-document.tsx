import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-document',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconDocument {
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
      <WppIcon name="wpp-icon-document" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.20837 1.5415C4.10374 1.5415 3.20837 2.43687 3.20837 3.5415V16.4582C3.20837 17.5628 4.10374 18.4582 5.20837 18.4582H14.7917C15.8963 18.4582 16.7917 17.5628 16.7917 16.4582V7.70817C16.7917 7.49872 16.7059 7.30932 16.5674 7.17325L11.16 1.76582C11.0239 1.62737 10.8345 1.5415 10.625 1.5415H5.20837ZM11.375 4.1022V6.45817C11.375 6.73437 11.5988 6.95817 11.875 6.95817H14.231L11.375 4.1022ZM4.70837 3.5415C4.70837 3.2653 4.93217 3.0415 5.20837 3.0415H9.87504V6.45817C9.87504 7.5628 10.7704 8.45817 11.875 8.45817H15.2917V16.4582C15.2917 16.7344 15.0679 16.9582 14.7917 16.9582H5.20837C4.93217 16.9582 4.70837 16.7344 4.70837 16.4582V3.5415ZM6.54163 11.0415C6.54163 10.6273 6.87741 10.2915 7.29163 10.2915H12.7083C13.1225 10.2915 13.4583 10.6273 13.4583 11.0415C13.4583 11.4557 13.1225 11.7915 12.7083 11.7915H7.29163C6.87741 11.7915 6.54163 11.4557 6.54163 11.0415ZM7.29163 13.2085C6.87741 13.2085 6.54163 13.5443 6.54163 13.9585C6.54163 14.3727 6.87741 14.7085 7.29163 14.7085H11.0416C11.4558 14.7085 11.7916 14.3727 11.7916 13.9585C11.7916 13.5443 11.4558 13.2085 11.0416 13.2085H7.29163Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
