import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

// @deprecated - this component will be deleted in 4.0.0.
@Component({
  tag: 'wpp-icon-pin',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconPin {
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

  componentWillLoad() {
    console.warn(
      '%cwpp-icon-pin component is deprecated. Please, use wpp-icon-pinned instead',
      'color: black; font-size: 12px;',
    )
  }

  render() {
    return (
      <WppIcon name="wpp-icon-pin" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.52653 3.60367C7.75751 3.37269 8.14528 3.42419 8.30795 3.70839L10.8213 8.10631C10.9053 8.25335 11.0366 8.36762 11.1939 8.43053L14.2907 9.66933L9.6693 14.2905L8.43047 11.1935C8.36756 11.0363 8.25329 10.905 8.10625 10.8209L3.70822 8.30753C3.42466 8.14554 3.37245 7.75778 3.6038 7.52598L7.52653 3.60367ZM9.61018 2.96395C8.95696 1.82164 7.39653 1.61238 6.4659 2.54298L2.54276 6.4657C1.61273 7.3964 1.82125 8.95699 2.96418 9.60999L7.1349 11.9935L8.69901 15.9036C8.79264 16.1376 8.99761 16.309 9.24456 16.3597C9.49151 16.4104 9.74741 16.3336 9.92568 16.1554L12.5103 13.5709L16.7613 17.822C17.0542 18.1148 17.5291 18.1148 17.822 17.822C18.1148 17.5291 18.1148 17.0542 17.822 16.7613L13.571 12.5103L16.1557 9.92577C16.334 9.74751 16.4107 9.49161 16.3601 9.24464C16.3094 8.99768 16.138 8.79271 15.9039 8.69907L11.9938 7.13496L9.61018 2.96395Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
