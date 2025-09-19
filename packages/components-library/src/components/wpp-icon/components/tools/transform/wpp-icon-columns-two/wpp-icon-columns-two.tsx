import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-columns-two',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconColumnsTwo {
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
      <WppIcon name="wpp-icon-columns-two" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 4.75C2 3.23122 3.23122 2 4.75 2H15.25C16.7688 2 18 3.23122 18 4.75V15.25C18 16.7688 16.7688 18 15.25 18H4.75C3.23122 18 2 16.7688 2 15.25V4.75ZM10.75 16.5H15.25C15.9404 16.5 16.5 15.9404 16.5 15.25V4.75C16.5 4.05964 15.9404 3.5 15.25 3.5H10.75V16.5ZM9.25 3.5V16.5H4.75C4.05964 16.5 3.5 15.9404 3.5 15.25V4.75C3.5 4.05964 4.05964 3.5 4.75 3.5H9.25Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
