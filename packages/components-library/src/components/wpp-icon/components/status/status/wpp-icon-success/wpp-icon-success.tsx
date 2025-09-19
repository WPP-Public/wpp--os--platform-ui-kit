import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-success',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconSuccess {
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
  @Prop() readonly color: string = 'var(--wpp-success-color-400)'

  render() {
    return (
      <WppIcon name="wpp-icon-success" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13.6067 8.89925C13.9742 8.5317 13.9742 7.93578 13.6067 7.56823C13.2391 7.20068 12.6432 7.20068 12.2757 7.56823L9.01961 10.8243L7.72433 9.52901C7.35678 9.16146 6.76086 9.16146 6.39331 9.52901C6.02576 9.89657 6.02576 10.4925 6.39331 10.86L8.35409 12.8208C8.72165 13.1884 9.31757 13.1884 9.68512 12.8208L13.6067 8.89925Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
