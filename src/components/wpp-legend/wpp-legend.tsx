import { Component, Prop, h, Host } from '@stencil/core'

@Component({
  tag: 'wpp-legend',
  styleUrl: 'wpp-legend.scss',
  shadow: true,
})
export class WppLegend {
  @Prop() readonly label?: string

  @Prop() readonly disabled: boolean = false

  @Prop() readonly color?: `var(--wpp-${string})` = 'var(--wpp-dataviz-color-cat-neutral-1)'

  private hostCssClasses = () => ({
    'wpp-legend': true,
    'wpp-disabled': this.disabled,
  })

  private dotCssClasses = () => ({
    dot: true,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()}>
        <svg class={this.dotCssClasses()}>
          <circle cx={6} cy={6} r={5} fill={this.color} />
        </svg>
        {this.label && (
          <wpp-typography
            color={this.disabled ? 'var(--wpp-grey-color-500)' : 'var(--wpp-grey-color-1000)'}
            type="xs-body"
          >
            {this.label}
          </wpp-typography>
        )}
      </Host>
    )
  }
}
