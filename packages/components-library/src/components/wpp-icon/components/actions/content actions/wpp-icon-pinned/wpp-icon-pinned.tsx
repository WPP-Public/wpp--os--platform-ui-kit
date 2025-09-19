import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-pinned',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconPinned {
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
      <WppIcon name="wpp-icon-pinned" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M3.4732 17.5L6.9128 14.0604L9.27648 16.424C9.84065 16.9882 10.8007 16.7671 11.0613 16.0129L12.1898 12.746C12.2315 12.6253 12.3188 12.5258 12.4329 12.4688L16.2524 10.559C17.6299 9.87026 17.9278 8.03437 16.8388 6.94534L13.0547 3.16125C11.9657 2.07222 10.1298 2.37015 9.44099 3.74768L7.53128 7.56715C7.47421 7.68129 7.37471 7.76854 7.25408 7.81021L3.98713 8.9388C3.233 9.19932 3.01185 10.1594 3.57603 10.7236L5.93967 13.0872L2.50008 16.5269L2.5 17.5H3.4732Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
