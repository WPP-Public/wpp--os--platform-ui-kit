import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-unordered-list',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconUnorderedList {
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
        name="wpp-icon-unordered-list"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M3.25 6.5C3.94036 6.5 4.5 5.94036 4.5 5.25C4.5 4.55964 3.94036 4 3.25 4C2.55964 4 2 4.55964 2 5.25C2 5.94036 2.55964 6.5 3.25 6.5ZM7 5.25C7 4.83579 7.33579 4.5 7.75 4.5H17.25C17.6642 4.5 18 4.83579 18 5.25C18 5.66421 17.6642 6 17.25 6H7.75C7.33579 6 7 5.66421 7 5.25ZM7.75 9.5C7.33579 9.5 7 9.83579 7 10.25C7 10.6642 7.33579 11 7.75 11H17.25C17.6642 11 18 10.6642 18 10.25C18 9.83579 17.6642 9.5 17.25 9.5H7.75ZM7.75 14.5C7.33579 14.5 7 14.8358 7 15.25C7 15.6642 7.33579 16 7.75 16H17.25C17.6642 16 18 15.6642 18 15.25C18 14.8358 17.6642 14.5 17.25 14.5H7.75ZM4.5 10.25C4.5 10.9404 3.94036 11.5 3.25 11.5C2.55964 11.5 2 10.9404 2 10.25C2 9.55964 2.55964 9 3.25 9C3.94036 9 4.5 9.55964 4.5 10.25ZM3.25 16.5C3.94036 16.5 4.5 15.9404 4.5 15.25C4.5 14.5596 3.94036 14 3.25 14C2.55964 14 2 14.5596 2 15.25C2 15.9404 2.55964 16.5 3.25 16.5Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
