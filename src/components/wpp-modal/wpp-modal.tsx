import { Component, Host, h, Event, EventEmitter, Method, Element, Prop, Listen, Watch, State } from '@stencil/core'

import { ANIMATION_PROPERTY_NAME, Z_INDEX } from '../../common/consts'
import { applyBodyStylesIfNeeded, getSlotEmptyStates } from '../../utils/utils'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

import { ModalCloseDetails, ModalCloseReason, ModalFormConfig } from './types'

/**
 * @slot header - Content that is displayed within the `.modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

 *
 * @part wrapper - component wrapper element
 * @part overlay - overlay element
 * @part content - modal content element
 * @part header - header slot element
 * @part body - Main slot content wrapper
 * @part actions - actions slot element
 */
@Component({
  tag: 'wpp-modal',
  styleUrl: 'wpp-modal.scss',
  shadow: true,
})
export class WppModal {
  @Element() host: HTMLWppModalElement

  @State() hasHeaderSlot: boolean = false

  @State() hasBodySlot: boolean = false

  @State() hasActionsSlot: boolean = false

  @State() closeReason: ModalCloseReason | null = null

  /**
   * Indicates is the modal open.
   */
  @Prop({ mutable: true, reflect: true }) open = false

  /**
   * Indicates the modal size
   */
  @Prop() readonly size: 's' | 'm' = 's'

  /**
   * Makes overlay transparent
   */
  @Prop() readonly withTransparentOverlay: boolean

  /**
   * If the modal can be closed by clicking outside of it.
   */
  @Prop() readonly disableOutsideClick: boolean = false

  /**
   * If you pass this prop wrapper of dialog will be rendered as form.
   */
  @Prop() readonly formConfig?: ModalFormConfig

  /**
   * Defines the z-index of the WppModal.
   */
  @Prop() readonly zIndex: number = Z_INDEX.MODAL

  /**
   * Handles the modal closing actions.
   */
  @Event({ bubbles: false, composed: false }) wppModalClose: EventEmitter<ModalCloseDetails>

  /**
   * Event emitted when the open animation starts.
   */
  @Event() wppModalOpenStart: EventEmitter<void>

  /**
   * Event emitted when the open animation ends.
   */
  @Event() wppModalOpenComplete: EventEmitter<void>

  /**
   * Event emitted when the close animation starts.
   */
  @Event() wppModalCloseStart: EventEmitter<ModalCloseDetails>

  /**
   * Event emitted when the close animation ends.
   */
  @Event() wppModalCloseComplete: EventEmitter<ModalCloseDetails>

  /**
   * Handles the modal click actions.
   * @deprecated - this prop will be deleted in version 4.0.0 . Use `wppModalOpenStart`/`wppModalOpenComplete` instead
   */
  @Event({ bubbles: false, composed: false }) wppModalOpen: EventEmitter<void>

  @Listen('keydown', { target: 'document' })
  protected handleCloseOnEsc(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      this.wppModalClose.emit({ reason: ModalCloseReason.escapePress })
      this.closeReason = ModalCloseReason.escapePress
    }
  }

  @Watch('open')
  protected handleChangeModalStatus(openStatus: boolean) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready')
    }

    setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove')
    })
  }

  /**
   * Method for closing the modal.
   */
  @Method()
  async closeModal() {
    this.open = false
  }

  /**
   * Method for opening the modal.
   */
  @Method()
  async openModal() {
    this.open = true
  }

  private onOverlayClick = () => {
    if (this.disableOutsideClick) return
    this.wppModalClose.emit({ reason: ModalCloseReason.outsideClick })
    this.closeReason = ModalCloseReason.outsideClick
  }

  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('wpp-component-ready')
    }, 0)
  }

  disconnectedCallback() {
    this.closeModal()
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      header: '[slot="header"]',
      body: '[slot="body"]',
      actions: '[slot="actions"]',
    })

    this.hasHeaderSlot = !emptyStates.header
    this.hasBodySlot = !emptyStates.body
    this.hasActionsSlot = !emptyStates.actions
  }

  private handleTransitionStart = (event: TransitionEvent) => {
    if (event.propertyName !== ANIMATION_PROPERTY_NAME) return
    if (this.open) {
      this.wppModalOpenStart.emit()
    } else {
      if (this.closeReason) {
        this.wppModalCloseStart.emit({ reason: this.closeReason })
      } else {
        this.wppModalCloseStart.emit()
      }
    }
  }

  private handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName !== ANIMATION_PROPERTY_NAME) return
    if (this.open) {
      this.wppModalOpenComplete.emit()
      this.wppModalOpen.emit()
    } else {
      if (this.closeReason) {
        this.wppModalCloseComplete.emit({ reason: this.closeReason })
      } else {
        this.wppModalCloseComplete.emit()
      }
    }
    this.closeReason = null
  }

  private headerCssClasses = () => ({
    header: true,
    'slot-hidden': !this.hasHeaderSlot,
  })

  private bodyCssClasses = () => ({
    body: true,
    'slot-hidden': !this.hasBodySlot,
  })

  private actionsCssClasses = () => ({
    actions: true,
    'slot-hidden': !this.hasActionsSlot,
  })

  private hostCssClasses = () => ({
    'wpp-modal': true,
    'wpp-modal-wrapper': true,
    'wpp-visible': this.open,
    'wpp-hide': !this.open,
  })

  private modalCssClasses = () => ({
    modal: true,
    visible: this.open,
    hide: !this.open,
    [`size-${this.size}`]: !!this.size,
  })

  render() {
    const Tag = this.formConfig ? 'form' : 'div'

    return (
      <Host
        class={this.hostCssClasses()}
        aria-modal="true"
        exportparts="wrapper, modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper"
        onTransitionStart={this.handleTransitionStart}
        onTransitionEnd={this.handleTransitionEnd}
        style={{ zIndex: this.zIndex.toString() }}
      >
        <div class="modal-overlay" part="wrapper">
          <wpp-overlay
            {...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {})}
            isVisible={this.open}
            onWppClick={this.onOverlayClick}
            zIndex={0}
          />

          <Tag
            role="dialog"
            class={this.modalCssClasses()}
            part="content"
            {...this.formConfig}
            data-testid="wpp-modal-content"
          >
            <WrappedSlot wrapperClass={this.headerCssClasses()} name="header" onSlotchange={this.updateSlotData} />
            <WrappedSlot wrapperClass={this.bodyCssClasses()} name="body" onSlotchange={this.updateSlotData} />
            <WrappedSlot wrapperClass={this.actionsCssClasses()} name="actions" onSlotchange={this.updateSlotData} />
          </Tag>
        </div>
      </Host>
    )
  }
}
