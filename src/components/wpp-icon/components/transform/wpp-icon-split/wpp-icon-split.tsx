import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../WppIcon'

@Component({
  tag: 'wpp-icon-split',
  styleUrl: '../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconSplit {
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

  /**
   Defines the icon direction.
   */
  @Prop() readonly direction: 'horizontal' | 'vertical' = 'horizontal'

  render() {
    return (
      <WppIcon name="wpp-icon-split" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M3 10C3 9.72386 3.22386 9.5 3.5 9.5L8 9.5L8 7C8 5.89543 8.89543 5 10 5L15.2929 5L13.6464 3.35355C13.4512 3.15829 13.4512 2.84171 13.6464 2.64645C13.8417 2.45118 14.1583 2.45118 14.3536 2.64645L16.8536 5.14645C17.0488 5.34171 17.0488 5.65829 16.8536 5.85355L14.3536 8.35355C14.1583 8.54882 13.8417 8.54882 13.6464 8.35355C13.4512 8.15829 13.4512 7.84171 13.6464 7.64645L15.2929 6L10 6C9.44771 6 9 6.44771 9 7L9 13C9 13.5523 9.44772 14 10 14L15.2929 14L13.6464 12.3536C13.4512 12.1583 13.4512 11.8417 13.6464 11.6464C13.8417 11.4512 14.1583 11.4512 14.3536 11.6464L16.8536 14.1464C17.0488 14.3417 17.0488 14.6583 16.8536 14.8536L14.3536 17.3536C14.1583 17.5488 13.8417 17.5488 13.6464 17.3536C13.4512 17.1583 13.4512 16.8417 13.6464 16.6464L15.2929 15L10 15C8.89543 15 8 14.1046 8 13L8 10.5L3.5 10.5C3.22386 10.5 3 10.2761 3 10Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="0.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </WppIcon>
    )
  }
}
