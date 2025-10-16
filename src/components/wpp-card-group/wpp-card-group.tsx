import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch, Listen } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'

import { BaseComponent } from '../../interfaces/base-component'

import { CardSize, CardValue, CardChangeEventDetail, CardType } from './components/wpp-card/types'
import { CardGroupChangeEventDetail, CardGroupValue } from './types'
import { AriaProps } from '../../types/common'
import { RadioValue } from '../wpp-radio/types'

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
   * Contains the `aria-` props for component
   */
  @Prop() readonly ariaProps: AriaProps = {}

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
    this.syncTabIndexes()
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
    this.syncTabIndexes()

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
    this.syncTabIndexes()
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

  private syncTabIndexes() {
    // Only manage for radiogroup
    if (this.multiple) return

    const enabled = this.getEnabledCards()

    if (enabled.length === 0) return

    let activeIndex = enabled.findIndex(c => c.checked)

    if (activeIndex === -1) activeIndex = 0

    enabled.forEach((c, i) => {
      c.index = i === activeIndex ? 0 : -1
    })
  }

  private getEnabledCards = (): HTMLWppCardElement[] => this.directCardChildren.filter(card => !card.disabled)

  private getCurrentNdx = (enabled: HTMLWppCardElement[]): number => {
    const checkedNdx = enabled.findIndex(card => card.checked)

    return checkedNdx !== -1 ? checkedNdx : 0
  }

  private onKeyDown = (event: KeyboardEvent) => {
    // Only for radiogroup variant (single select)
    if (this.multiple) return

    const enabledItems = this.getEnabledCards()

    if (enabledItems.length === 0) return

    const currentNdx = this.getCurrentNdx(enabledItems)
    let nextNdx = currentNdx
    const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const isPrevKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp'

    if (!isNextKey && !isPrevKey) return

    event.preventDefault()

    const onFirst = currentNdx === 0
    const onLast = currentNdx === enabledItems.length - 1

    if (onLast && isNextKey) {
      nextNdx = 0
    } else if (onFirst && isPrevKey) {
      nextNdx = enabledItems.length - 1
    } else if (isNextKey) {
      nextNdx = Math.min(currentNdx + 1, enabledItems.length - 1)
    } else if (isPrevKey) {
      nextNdx = Math.max(currentNdx - 1, 0)
    }

    const target = enabledItems[nextNdx]

    this.focusAndSelect(target)
  }

  private focusAndSelect = (target: HTMLWppCardElement) => {
    if (!target) return

    const nextValue = target.value as RadioValue

    if (this.value !== nextValue) {
      this.value = nextValue
      this.wppChange.emit({ value: this.value, name: this.name })
    }

    this.setActiveCard(this.value as CardValue)
    this.syncTabIndexes()
    target.setFocus()
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
        aria-required={this.required}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        class={this.hostCssClasses()}
        exportparts="inner"
        role={this.multiple ? 'group' : 'radiogroup'}
        aria-labelledby={this.ariaProps.labelledby}
      >
        <slot part="inner" />
      </Host>
    )
  }
}
