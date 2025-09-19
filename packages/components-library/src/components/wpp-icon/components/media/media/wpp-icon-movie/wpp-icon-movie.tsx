import { Component, h, Prop } from '@stencil/core'
import { WppIcon } from '../../../../WppIcon'

@Component({
  tag: 'wpp-icon-movie',
  styleUrl: '../../../../wpp-icon.scss',
  shadow: true,
})
export class WppIconMovie {
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
      <WppIcon name="wpp-icon-movie" width={this.width} height={this.height} size={this.size} color={this.color}>
        <path
          d="M16.4442 3.47256L16.4852 3.60081L16.928 5.14524C17.0121 5.43845 16.8637 5.74325 16.592 5.86266L16.5149 5.89048L7.89761 8.36081L16.8621 8.36157C17.1671 8.36157 17.4192 8.58823 17.4591 8.88231L17.4646 8.96407V15.7908C17.4646 16.9657 16.5474 17.9264 15.39 17.996L15.2554 18H5.21464C4.03973 18 3.07905 17.0828 3.0095 15.9254L3.00546 15.7908L3.0053 9.04927L2.58615 7.58629C2.2623 6.4569 2.87914 5.28062 3.97256 4.89473L4.10081 4.85376L13.7526 2.08615C14.882 1.7623 16.0583 2.37914 16.4442 3.47256ZM16.2589 9.56579H4.21047V15.7908C4.21047 16.2761 4.55468 16.681 5.01226 16.7746L5.11197 16.7898L5.21464 16.795H15.2554C15.7753 16.795 16.203 16.3999 16.2544 15.8935L16.2596 15.7908L16.2589 9.56579ZM5.63452 5.66754L4.43296 6.01209C3.93317 6.1554 3.63099 6.65311 3.72112 7.15403L3.74444 7.25415L4.02106 8.21883L4.25811 8.15066L5.63452 5.66754ZM9.45545 4.57191L7.27239 5.19789L5.89598 7.68101L8.07903 7.05503L9.45545 4.57191ZM13.2771 3.47606L11.0941 4.10204L9.71768 6.58516L11.9 5.9594L13.2771 3.47606ZM14.7611 3.28843L13.5394 5.4893L15.6028 4.89784L15.3268 3.93296C15.2407 3.63274 15.0268 3.40383 14.7611 3.28843Z"
          fill="currentColor"
        />
      </WppIcon>
    )
  }
}
