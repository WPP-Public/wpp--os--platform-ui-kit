import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-video-clip',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconVideoClip {
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
      <WppIcon name="wpp-icon-video-clip" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M8 7.90744V12.0928C8 12.5484 8.48794 12.8378 8.88778 12.6192L12.7167 10.5263C13.133 10.2988 13.133 9.70088 12.7166 9.47336L8.88773 7.38093C8.48789 7.16243 8 7.4518 8 7.90744ZM4.6 2.7998C3.16406 2.7998 2 3.96386 2 5.3998V14.5998C2 16.0357 3.16406 17.1998 4.6 17.1998H15.4C16.8359 17.1998 18 16.0357 18 14.5998V5.3998C18 3.96386 16.8359 2.7998 15.4 2.7998H4.6ZM3.2 5.3998C3.2 4.62661 3.8268 3.9998 4.6 3.9998H15.4C16.1732 3.9998 16.8 4.62661 16.8 5.3998V14.5998C16.8 15.373 16.1732 15.9998 15.4 15.9998H4.6C3.8268 15.9998 3.2 15.373 3.2 14.5998V5.3998Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
