import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

enum ChevronDirectionIconPath {
  // @deprecated: top should be removed in 4.0.0 release
  top = 'M4 13L10 7L16 13',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  up = 'M4 13L10 7L16 13',
  right = 'M8 4L14 10L8 16',
  down = 'M16 8L10 14L4 8',
  left = 'M12 16L6 10L12 4',
}

@Component({
  tag: 'wpp-icon-chevron',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconChevron {
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
  @Prop({ reflect: true }) readonly direction: 'top' | 'up' | 'right' | 'down' | 'left' = 'right'

  render() {
    return (
      <WppIcon name="wpp-icon-chevron" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d={ChevronDirectionIconPath[this.direction]}
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </WppIcon>
    )
  }
}
