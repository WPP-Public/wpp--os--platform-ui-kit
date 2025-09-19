import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-segmented-control',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconSegmentedControl {
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
        name="wpp-icon-segmented-control"
        width={this.width}
        height={this.height}
        size={this.size}
        color={this.color}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15 5H5C3.34315 5 2 6.34315 2 8V12C2 13.6569 3.34315 15 5 15H15C16.6569 15 18 13.6569 18 12V8C18 6.34315 16.6569 5 15 5ZM3.5 8C3.5 7.17157 4.17157 6.5 5 6.5H9.25V13.5H5C4.17157 13.5 3.5 12.8284 3.5 12V8ZM10.75 13.5H15C15.8284 13.5 16.5 12.8284 16.5 12V8C16.5 7.17157 15.8284 6.5 15 6.5H10.75V13.5Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
