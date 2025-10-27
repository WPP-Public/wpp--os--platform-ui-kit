import { h, Component, Element, Host, Prop, Watch } from '@stencil/core'
import { ActionButtonData } from './types'
import { transformToVersionedTag } from '../../utils/utils'
import { AriaProps } from '../../types/common'

@Component({
  tag: 'wpp-floating-toolbar',
  styleUrl: 'wpp-floating-toolbar.scss',
  shadow: true,
})
export class WppFloatingToolbar {
  @Element() host: HTMLWppFloatingToolbarElement

  private items: HTMLWppActionButtonElement[] = []

  private _actionButtonsConfig: ActionButtonData[] = []

  /**
   * Defines the action buttons configuration.
   * Must contain between 2 and 7 items.
   */
  @Prop() readonly actionButtonsConfig: ActionButtonData[]

  /**
   * Defines the orientation of the floating toolbar.
   */
  @Prop() readonly orientation: 'horizontal' | 'vertical' = 'horizontal'

  /**
   * Contains the floating toolbar `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  @Watch('actionButtonsConfig')
  onUpdateActionButtonsConfig(config: ActionButtonData[]) {
    this.validateActionButtonConfig(config)
    this.setActionButtons()
  }

  componentWillLoad() {
    this.validateActionButtonConfig(this.actionButtonsConfig)
  }

  componentDidLoad() {
    this.setActionButtons()
  }

  private validateActionButtonConfig = (config: ActionButtonData[]) => {
    if (config.length < 2) {
      console.error('The number of action buttons must be at least 2.')
    } else if (config.length > 7) {
      console.error('The number of action buttons must not exceed 7.')
    }

    this._actionButtonsConfig = this.actionButtonsConfig.slice(0, 7).map(item => ({
      ...item,
      variant: 'secondary',
    }))
  }

  private renderActionButton = (data: ActionButtonData): HTMLWppActionButtonElement[] => (
    <wpp-action-button key={`${data.icon}`} {...data}>
      {h(transformToVersionedTag(data.icon), { slot: 'icon-start', part: 'icon' })}
    </wpp-action-button>
  )

  private setActionButtons = () => {
    this.items = Array.from(
      this.host.shadowRoot?.querySelectorAll(transformToVersionedTag('wpp-action-button')) || [],
    ) as HTMLWppActionButtonElement[]

    this.syncTabIndexes()
  }

  private getEnabledButtons = () => this.items.filter(item => !item.disabled)

  private syncTabIndexes = (ndx = 0) => {
    const items = this.getEnabledButtons()

    if (!items) return

    items.forEach((el, i) => {
      el.ariaProps = { ...(el.ariaProps ?? {}), tabIndex: i === ndx ? 0 : -1 }
    })
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const horizontal = this.orientation === 'horizontal'
    const prevKeys = horizontal ? ['ArrowLeft'] : ['ArrowUp']
    const nextKeys = horizontal ? ['ArrowRight'] : ['ArrowDown']

    if (![...prevKeys, ...nextKeys, 'Home', 'End'].includes(event.key)) return

    const items = this.getEnabledButtons()

    if (!items) return

    const active = this.host.shadowRoot?.activeElement as Element | null
    let ndx = active ? items.findIndex(el => el === active) : 0

    if (ndx === -1) return
    event.preventDefault()

    if (event.key === 'Home' || event.key === 'End') {
      ndx = event.key === 'Home' ? 0 : items.length - 1
      items[ndx]?.setFocus()
      this.syncTabIndexes(ndx)

      return
    }

    const dir = prevKeys.includes(event.key) ? -1 : 1
    const nextNdx = (ndx + dir + items.length) % items.length

    items[nextNdx]?.setFocus()
    this.syncTabIndexes(nextNdx)
  }

  private hostCssClasses = () => ({
    'wpp-floating-toolbar': true,
  })

  private wrapperCssClasses = () => ({
    wrapper: true,
    vertical: this.orientation === 'vertical',
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        role="toolbar"
        aria-orientation={this.orientation}
        aria-label={this.ariaProps?.label}
        aria-labelledby={this.ariaProps?.labelledby}
        onKeyDown={this.onKeyDown}
      >
        <div class={this.wrapperCssClasses()}>{this._actionButtonsConfig.map(this.renderActionButton)}</div>
      </Host>
    )
  }
}
