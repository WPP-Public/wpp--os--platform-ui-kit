import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-send-off',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconSendOff {
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
      <WppIcon name="wpp-icon-send-off" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M10.6706 10.1631L4.4919 11.1929C4.34718 11.217 4.22636 11.3165 4.17504 11.454L2.04368 17.162C1.83966 17.6866 2.38887 18.1871 2.89233 17.9353L17.6599 10.5516C18.1134 10.3248 18.1134 9.67761 17.6599 9.45086L2.89233 2.06709C2.38887 1.81536 1.83966 2.31585 2.04368 2.84046L4.17504 8.54843C4.22636 8.68588 4.34718 8.78545 4.4919 8.80956L10.6706 9.83936C10.76 9.85426 10.8204 9.9388 10.8055 10.0282C10.794 10.0973 10.7398 10.1515 10.6706 10.1631Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
