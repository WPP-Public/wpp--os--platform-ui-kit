import { Component, h, Prop, Host, State, Element, Event, EventEmitter } from '@stencil/core'

import { getSlotEmptyStates } from '../../utils/utils'

import { AccordionSectionChangeEventDetail } from '../wpp-accordion/types'

import { ExpandableCardSectionChangeEventDetail } from './types'

/**
 * @slot - Content that is placed inside the card. The default slot, without the name attribute.
 * @slot header - Content that is placed inside the header section.
 * @slot actions - Content is placed inside the `.actions` element and add content to actions wrapper
 *
 * @part expandable-card-body - Wrapper around accordion
 * @part accordion - accordion element
 * @part wpp-accordion(*) - you can use all wpp-accordion parts (header,title and others)
 */
@Component({
  tag: 'wpp-expandable-card',
  styleUrl: 'wpp-expandable-card.scss',
  shadow: true,
})
export class WppExpandableCard {
  @Element() host: HTMLWppExpandableCardElement

  @State() hasActionsSlot: boolean = false

  @State() headerMaxWidth?: number

  /**
   * If `true`, the component is expanded by default. This prop should be used if you are not interested in controlling
   * expanded state, but you need accordion to be opened at first render.
   */
  @Prop({ reflect: true, mutable: true }) expandedByDefault: boolean = false

  /**
   * If `true`, the component is expanded
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false

  /**
   * Indicates expandable card size
   */
  @Prop() readonly size: 's' | 'm' | 'l' | 'xl' | '2xl' = 's'

  /**
   * Indicates accordion header in expandable card
   *
   * @deprecated - this prop will be deleted in version 4.0.0. If you want to use this prop, use "header" slot instead
   */
  @Prop() readonly header: string = ''

  /**
   * Indicates the variant of the card.
   */
  @Prop() readonly variant: 'primary' | 'secondary' = 'primary'

  /**
   * Emitted when the expandable state changes
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<ExpandableCardSectionChangeEventDetail>

  /**
   * Emitted when the section receives focus
   */
  @Event({ bubbles: false, composed: false }) wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the section loses focus
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  componentWillLoad() {
    if (this.expandedByDefault) this.expanded = true
    this.updateSlotData()
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      actions: '[slot="actions"]',
    })

    this.hasActionsSlot = !emptyStates.actions
  }

  private onChange = (event: CustomEvent<AccordionSectionChangeEventDetail>) => {
    this.wppChange.emit(event.detail)
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent) => {
    this.wppBlur.emit(event)
  }

  private hostCssClasses = () => ({
    'wpp-expandable-card': true,
    [`wpp-size-${this.size}`]: true,
    [`wpp-${this.variant}`]: true,
  })

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        aria-expanded={this.expanded}
        exportparts="expandable-card-body, accordion, section, title, icon, counter, divider, title-wrapper"
      >
        <div class="body-container" part="expandable-card-body">
          <wpp-accordion
            size={this.size}
            text={this.header}
            expanded={this.expanded}
            expandedByDefault={this.expandedByDefault}
            withDivider={false}
            onWppChange={this.onChange}
            part="accordion"
          >
            <slot />
            <slot name="header" slot="header" class="header" />
            <slot name="actions" slot="actions" class="actions" />
          </wpp-accordion>
        </div>
      </Host>
    )
  }
}
