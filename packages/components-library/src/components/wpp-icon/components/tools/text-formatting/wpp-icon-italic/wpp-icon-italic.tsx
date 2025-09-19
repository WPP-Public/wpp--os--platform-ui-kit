import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-italic',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconItalic {
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
      <WppIcon name="wpp-icon-italic" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M8 3.25C8 2.83579 8.33579 2.5 8.75 2.5H16.25C16.6642 2.5 17 2.83579 17 3.25C17 3.66421 16.6642 4 16.25 4H13.0151L8.59202 15.5H11.25C11.6642 15.5 12 15.8358 12 16.25C12 16.6642 11.6642 17 11.25 17H3.75C3.33579 17 3 16.6642 3 16.25C3 15.8358 3.33579 15.5 3.75 15.5H6.9849L11.408 4H8.75C8.33579 4 8 3.66421 8 3.25Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
