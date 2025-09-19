import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-attach',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconAttach {
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
      <WppIcon name="wpp-icon-attach" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.1684 2.93753C12.0146 1.0913 15.0078 1.0913 16.854 2.93753C18.7003 4.78375 18.7003 7.77696 16.854 9.62319L8.91987 17.5574C7.70656 18.7707 5.73919 18.7707 4.52588 17.5574C3.31257 16.344 3.31257 14.3767 4.52588 13.1634L10.928 6.76128C11.2209 6.46838 11.6957 6.46838 11.9886 6.76128C12.2815 7.05417 12.2815 7.52904 11.9886 7.82194L5.58654 14.224C4.95902 14.8515 4.95902 15.8692 5.58654 16.4967C6.21406 17.1242 7.23169 17.1242 7.85921 16.4967L15.7934 8.56253C17.0538 7.30209 17.0538 5.25863 15.7934 3.99819C14.5329 2.73775 12.4895 2.73775 11.229 3.99819L2.82196 12.4053C2.52906 12.6982 2.05419 12.6982 1.7613 12.4053C1.4684 12.1124 1.4684 11.6375 1.7613 11.3446L10.1684 2.93753Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
