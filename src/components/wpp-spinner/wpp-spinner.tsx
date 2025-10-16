import { Component, Prop, h, Host } from '@stencil/core'
import { AriaProps } from '../../types/common'

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

  /**
   * Defines the spinner `aria-` props.
   */
  @Prop() readonly ariaProps?: AriaProps

  private hostCssClasses = () => ({
    'wpp-spinner': true,
    [`wpp-size-${this.size}`]: true,
  })

  private spinnerCssClasses = () => ({
    spinner: true,
    [`size-${this.size}`]: true,
  })

  render() {
    const isAnnounced = this.ariaProps?.label && this.ariaProps?.label !== ''

    return (
      <Host
        class={this.hostCssClasses()}
        role={isAnnounced ? 'status' : null}
        aria-hidden={isAnnounced ? null : 'true'}
        aria-live={isAnnounced ? 'polite' : null}
        aria-label={isAnnounced ? this.ariaProps?.label : null}
      >
        <svg class={this.spinnerCssClasses()} aria-hidden="true" focusable="false">
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
