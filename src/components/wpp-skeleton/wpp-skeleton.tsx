import { Component, Host, h, Prop } from '@stencil/core'

@Component({
  tag: 'wpp-skeleton',
  styleUrl: 'wpp-skeleton.scss',
  shadow: true,
})
export class WppSkeleton {
  /**
   * Indicates the skeleton variant
   */
  @Prop() readonly variant: 'rectangle' | 'circle' = 'rectangle'

  /**
   * If `true`, the skeleton has animation
   *
   * @deprecated - this prop will be deleted in version 4.0.0. The skeleton component will always have animation.
   */
  @Prop() readonly animation: boolean = true

  /**
   * Width of skeleton, if width is not passed, then it use default values. For rectangle it's 240px, for circle - 80px
   */
  @Prop() readonly width: string | number

  /**
   * Height of skeleton, if width is not passed, then it use default value - 80px
   */
  @Prop() readonly height: string | number

  private hostCssClasses = () => ({
    'wpp-skeleton': true,
    [`wpp-${this.variant}`]: true,
    'wpp-animated': this.animation,
  })

  private getSizeWithDimension = (initialValue: string | number) =>
    String(initialValue || '').replace(/^(\d+)(\S+)?$/, (...match) => match[1] + (match[2] || 'px'))

  render() {
    const style = {
      '--skeleton-width': this.getSizeWithDimension(this.width),
      '--skeleton-height': this.getSizeWithDimension(this.height),
    }

    return <Host class={this.hostCssClasses()} style={style} aria-hidden="true" />
  }
}
