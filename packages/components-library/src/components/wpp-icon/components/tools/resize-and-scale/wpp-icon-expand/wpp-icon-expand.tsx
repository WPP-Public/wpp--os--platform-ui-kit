import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-expand',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconExpand {
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
      <WppIcon name="wpp-icon-expand" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.5681 2.83791C17.5315 2.74945 17.4773 2.66658 17.4054 2.59467C17.2589 2.44822 17.067 2.375 16.875 2.375H12.7084C12.2942 2.375 11.9584 2.71079 11.9584 3.125C11.9584 3.53921 12.2942 3.875 12.7084 3.875H15.0644L10.928 8.01134C10.6352 8.30423 10.6352 8.7791 10.928 9.072C11.2209 9.36489 11.6958 9.36489 11.9887 9.072L16.125 4.93566V7.29167C16.125 7.70588 16.4608 8.04167 16.875 8.04167C17.2893 8.04167 17.625 7.70588 17.625 7.29167V3.125C17.625 3.02331 17.6048 2.92634 17.5681 2.83791ZM9.072 10.928C9.36489 11.2209 9.36489 11.6958 9.072 11.9886L4.93566 16.125H7.29167C7.70588 16.125 8.04167 16.4608 8.04167 16.875C8.04167 17.2892 7.70588 17.625 7.29167 17.625H3.125C3.02331 17.625 2.92634 17.6047 2.83791 17.5681C2.74945 17.5315 2.66658 17.4772 2.59467 17.4053C2.44822 17.2589 2.375 17.0669 2.375 16.875V12.7083C2.375 12.2941 2.71079 11.9583 3.125 11.9583C3.53921 11.9583 3.875 12.2941 3.875 12.7083V15.0643L8.01134 10.928C8.30423 10.6351 8.7791 10.6351 9.072 10.928Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
