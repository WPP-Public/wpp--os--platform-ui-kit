import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-bookmark-add',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconBookmarkAdd {
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
      <WppIcon name="wpp-icon-bookmark-add" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M18.572 5.45315C18.572 2.99374 16.5782 1 14.1188 1C11.6594 1 9.66566 2.99374 9.66566 5.45315C9.66566 7.91255 11.6594 9.90629 14.1188 9.90629C16.5782 9.90629 18.572 7.91255 18.572 5.45315ZM14.5242 5.85798L14.5245 7.88498C14.5245 8.10856 14.3433 8.28981 14.1197 8.28981C13.8961 8.28981 13.7149 8.10856 13.7149 7.88498L13.7145 5.85798H11.6863C11.4629 5.85798 11.2818 5.67674 11.2818 5.45315C11.2818 5.22957 11.4629 5.04832 11.6863 5.04832H13.7143L13.714 3.02356C13.714 2.79998 13.8952 2.61873 14.1188 2.61873C14.3424 2.61873 14.5236 2.79998 14.5236 3.02356L14.524 5.04832H16.545C16.7684 5.04832 16.9495 5.22957 16.9495 5.45315C16.9495 5.67674 16.7684 5.85798 16.545 5.85798H14.5242ZM14.1195 16.2067V10.716C14.5375 10.7159 14.9441 10.6671 15.334 10.575V17.3917C15.334 17.8865 14.7738 18.1736 14.3721 17.8846L9.66699 14.4995L4.96189 17.8846C4.56019 18.1736 4 17.8865 4 17.3917V5.25004C4 3.79675 5.17812 2.61863 6.6314 2.61863H9.68377C9.44358 2.99367 9.24965 3.40119 9.11005 3.83313H6.6314C5.84887 3.83313 5.21449 4.4675 5.21449 5.25004V16.2067L9.31234 13.2584C9.52421 13.106 9.80977 13.106 10.0216 13.2584L14.1195 16.2067Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
