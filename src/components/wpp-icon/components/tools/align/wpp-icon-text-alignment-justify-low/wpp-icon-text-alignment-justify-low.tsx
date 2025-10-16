import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-text-alignment-justify-low',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconTextAlignmentJustifyLow {
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
        name="wpp-icon-text-alignment-justify-low"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          d="M9 4.5C9 4.08579 9.33579 3.75 9.75 3.75H17.25C17.6642 3.75 18 4.08579 18 4.5C18 4.91421 17.6642 5.25 17.25 5.25H9.75C9.33579 5.25 9 4.91421 9 4.5ZM9 9.5C9 9.08579 9.33579 8.75 9.75 8.75H17.25C17.6642 8.75 18 9.08579 18 9.5C18 9.91421 17.6642 10.25 17.25 10.25H9.75C9.33579 10.25 9 9.91421 9 9.5ZM2.75 13.75C2.33579 13.75 2 14.0858 2 14.5C2 14.9142 2.33579 15.25 2.75 15.25H17.25C17.6642 15.25 18 14.9142 18 14.5C18 14.0858 17.6642 13.75 17.25 13.75H2.75Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
