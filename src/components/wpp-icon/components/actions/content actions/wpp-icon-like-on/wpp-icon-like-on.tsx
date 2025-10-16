import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-like-on',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconLikeOn {
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
      <WppIcon name="wpp-icon-like-on" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.54163 7.49984C1.54163 4.89937 3.6495 2.7915 6.24996 2.7915C7.735 2.7915 8.97502 3.50454 9.99996 4.75647C11.0249 3.50454 12.2649 2.7915 13.75 2.7915C16.3504 2.7915 18.4583 4.89937 18.4583 7.49984C18.4583 8.38019 18.0902 9.25213 17.5784 10.0668C17.0613 10.8899 16.3518 11.7258 15.5693 12.5481C14.7845 13.3728 13.9043 14.2064 13.0354 15.02C12.9136 15.1339 12.7922 15.2475 12.6712 15.3605C11.923 16.06 11.1932 16.7422 10.5303 17.4052C10.2374 17.6981 9.76252 17.6981 9.46963 17.4052C8.80668 16.7422 8.07691 16.06 7.32867 15.3605C7.20771 15.2475 7.08628 15.1339 6.96456 15.02C6.09564 14.2064 5.21539 13.3728 4.43061 12.5481C3.64812 11.7258 2.93864 10.8899 2.42152 10.0668C1.90976 9.25213 1.54163 8.38019 1.54163 7.49984Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
