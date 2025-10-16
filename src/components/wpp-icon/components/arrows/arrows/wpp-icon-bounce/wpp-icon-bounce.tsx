import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-bounce',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconBounce {
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
      <WppIcon name="wpp-icon-bounce" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M2.75 6C2.33579 6 2 6.33579 2 6.75V13.25C2 13.6642 2.33579 14 2.75 14C3.16421 14 3.5 13.6642 3.5 13.25V8.56066L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L17.7842 8.27642C18.0771 7.98353 18.0771 7.50866 17.7842 7.21576C17.4913 6.92287 17.0165 6.92287 16.7236 7.21576L10.5 13.4393L4.56066 7.5H9.25C9.66421 7.5 10 7.16421 10 6.75C10 6.33579 9.66421 6 9.25 6H2.75Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
