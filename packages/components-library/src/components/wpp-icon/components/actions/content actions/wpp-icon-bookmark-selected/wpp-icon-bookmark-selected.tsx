import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-bookmark-selected',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconBookmarkSelected {
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
        name="wpp-icon-bookmark-selected"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.87484 1.95837C5.31021 1.95837 4.0415 3.22708 4.0415 4.79171V17.2917C4.0415 17.5732 4.19908 17.8309 4.44958 17.9592C4.70008 18.0875 5.00133 18.0648 5.22973 17.9004L9.99984 14.4659L14.7699 17.9004C14.9983 18.0648 15.2996 18.0875 15.5501 17.9592C15.8006 17.8309 15.9582 17.5732 15.9582 17.2917V4.79171C15.9582 3.22708 14.6895 1.95837 13.1248 1.95837H6.87484Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
