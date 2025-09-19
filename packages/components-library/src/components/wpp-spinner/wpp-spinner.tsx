import { Component, Prop, h, Host } from '@stencil/core'

const SPINNER_SIZES = {
  s: 7,
  m: 16,
  l: 32,
}

const SPINNER_RADIUS = {
  s: 6,
  m: 14,
  l: 29,
}

@Component({
  tag: 'wpp-spinner',
  styleUrl: 'wpp-spinner.scss',
  shadow: true,
})
export class WppSpinner {
  /**
   * Defines the spinner color.
   */
  @Prop() readonly color: string = 'var(--wpp-primary-color-500)'

  /**
   * Defines the spinner size.
   */
  @Prop() readonly size: 's' | 'm' | 'l' = 's'

  private hostCssClasses = () => ({
    'wpp-spinner': true,
    [`wpp-size-${this.size}`]: true,
  })

  private spinnerCssClasses = () => ({
    spinner: true,
    [`size-${this.size}`]: true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} role="status">
        <svg class={this.spinnerCssClasses()} aria-busy="true">
          <circle
            cx={SPINNER_SIZES[this.size]}
            cy={SPINNER_SIZES[this.size]}
            r={SPINNER_RADIUS[this.size]}
            fill="transparent"
            stroke={this.color}
            stroke-linecap="round"
          />
        </svg>
      </Host>
    )
  }
}
