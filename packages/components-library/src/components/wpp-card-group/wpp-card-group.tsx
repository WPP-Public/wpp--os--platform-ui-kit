import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch, Listen } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'

import { BaseComponent } from '../../interfaces/base-component'

import { CardSize, CardValue, CardChangeEventDetail, CardType } from './components/wpp-card/types'
import { CardGroupChangeEventDetail, CardGroupValue } from './types'

/**
 * @slot - Content is placed inside the card-group component. It can be only <wpp-card>. The default slot, without the name attribute.
 *
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-card-group',
  styleUrl: 'wpp-card-group.scss',
  shadow: true,
})
export class WppCardGroup implements BaseComponent {
  private directCardChildren: Array<HTMLWppCardElement> = []
  private observer: MutationObserver

  @Element() readonly host: HTMLWppCardGroupElement

  /**
   * Indicates the card group name
   */
  @Prop() readonly name: string

  /**
   * Indicates the size of the cards
   */
  @Prop() readonly size: CardSize = 'm'

  /**
   * Indicates the card group value
   */
  @Prop({ mutable: true }) value?: CardGroupValue

  /**
   * If `true`, the card group will give possibility to select multiple cards
   */
  @Prop() readonly multiple: boolean = false

  /**
   * If `true`, the card group is required
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * If `true`, the card group has radio or checkbox button on the right-top-side of the card
   */
  @Prop({ reflect: true }) readonly withRadioOrCheckbox: boolean = true

  /**
   * If `true`, single card group require no card selection and can be empty. Users can deselect a card by clicking it again.
   */
  @Prop({ reflect: true }) readonly allowEmptySelection: boolean = false

  /**
   * Emitted when the card group value changes
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<CardGroupChangeEventDetail>

  /**
   * Emitted when the card group receives focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the card group loses focus
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  @Listen('wppClick', { capture: true })
  handleClick(event: CustomEvent<CardChangeEventDetail>) {
    if ((event.target as HTMLWppCardElement).getAttribute('nested')) return

    if (this.multiple) {
      const currentValue = (this.value as CardValue[]) || []

      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => element !== event.detail.value)
    } else {
      if (this.value === event.detail.value) {
        if (this.allowEmptySelection) this.value = ''
      } else {
        this.value = event.detail.value
      }
    }

    this.wppChange.emit({
      value: this.value,
      name: this.name,
    })
  }

  @Watch('value')
  onValueChange(newValue: CardValue) {
    this.setActiveCard(newValue)
  }

  @Watch('size')
  onUpdateSize() {
    this.setCardsProps([['size', this.size]])
  }

  @Watch('withRadioOrCheckbox')
  onUpdateWithRadioOrCheckbox() {
    this.setCardsProps([['withRadioOrCheckbox', this.withRadioOrCheckbox]])
  }

  @Watch('multiple')
  onUpdateMultiple() {
    this.setCardsProps([['type', this.multiple ? 'multiple' : 'single']])
  }

  private updateCardProperties = () => {
    this.setCardsProps([
      ['size', this.size],
      ['withRadioOrCheckbox', this.withRadioOrCheckbox],
      ['type', this.multiple ? 'multiple' : 'single'],
    ])
    if (this.value) {
      this.setActiveCard(this.value as CardValue)
    }
  }

  componentDidLoad() {
    this.getDirectCardChildren()
    this.updateCardProperties()
    this.updateSlotContent()

    this.observer = new MutationObserver(() => {
      this.updateSlotContent()
    })

    // Observe the host element
    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true,
    })
  }

  disconnectedCallback() {
    if (this.observer) this.observer.disconnect()
  }

  private updateSlotContent() {
    this.getDirectCardChildren()

    this.updateCardProperties()
  }

  private getDirectCardChildren = () => {
    const cards = Array.from(this.host.querySelectorAll<HTMLWppCardElement>(transformToVersionedTag('wpp-card')))

    this.directCardChildren = cards.filter((card: HTMLWppCardElement) => {
      const closestCardEl = card.parentElement?.closest(
        `${transformToVersionedTag('wpp-card')}, ${transformToVersionedTag('wpp-card-group')}`,
      )

      if (closestCardEl && closestCardEl.tagName.toLowerCase() === transformToVersionedTag('wpp-card')) {
        card.setAttribute('nested', 'true')

        return false
      } else {
        return card
      }
    })
  }

  private setCardsProps = (updates: (['type', CardType] | ['size', CardSize] | ['withRadioOrCheckbox', boolean])[]) => {
    this.directCardChildren?.forEach((card: HTMLWppCardElement) => {
      if (card.tagName === transformToVersionedTag('wpp-card').toUpperCase()) {
        updates.forEach(update => ((card[update[0]] as any) = update[1]))
      }
    })
  }

  private setActiveCard = (initValue: CardValue) => {
    const value = Array.isArray(initValue) ? initValue : [initValue]

    this.directCardChildren?.forEach((card: HTMLWppCardElement) => {
      if (card.tagName === transformToVersionedTag('wpp-card').toUpperCase()) {
        card.setAttribute('checked', value.includes((card as any).value) ? 'true' : 'false')
      }
    })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.wppBlur.emit(event)
  }

  private hostCssClasses = () => ({
    'wpp-card-group': true,
  })

  render() {
    return (
      <Host
        aria-multiselectable={this.multiple}
        aria-required={this.required}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        class={this.hostCssClasses()}
        exportparts="inner"
      >
        <slot part="inner" />
      </Host>
    )
  }
}
