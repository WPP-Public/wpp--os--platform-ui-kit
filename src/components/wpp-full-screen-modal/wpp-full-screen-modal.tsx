import { Component, Host, h, Event, EventEmitter, Method, Element, Prop, Listen, Watch, State } from '@stencil/core'

import { ANIMATION_PROPERTY_NAME, Z_INDEX } from '../../common/consts'
import { applyBodyStylesIfNeeded, getSlotEmptyStates } from '../../utils/utils'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

import { FullScreenModalCloseDetails, FullScreenModalCloseReason, FullScreenModalFormConfig } from './types'

/**
 * @slot header - Content that is displayed within the `.full-screen-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.full-screen-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.full-screen-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

 *
 * @part wrapper - component wrapper element
 * @part overlay - overlay element
 * @part content - modal content element
 * @part header - header slot element
 * @part body - Main slot content wrapper
 * @part actions - actions slot element
 */
@Component({
  tag: 'wpp-full-screen-modal',
  styleUrl: 'wpp-full-screen-modal.scss',

  shadow: true,
})
export class WppFullScreenModal {
  @Element() host: HTMLWppFullScreenModalElement

  @State() hasHeaderSlot: boolean = false

  @State() hasBodySlot: boolean = false

  @State() hasActionsSlot: boolean = false

  @State() closeReason: FullScreenModalCloseReason | null = null

  /**
   * Indicates is the modal open.
   */
  @Prop({ mutable: true, reflect: true }) open = false

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
  @Prop() readonly formConfig?: FullScreenModalFormConfig

  /**
   * Defines the z-index of the WppFullScreenModal.
   */
  @Prop() readonly zIndex: number = Z_INDEX.MODAL

  /**
   * Handles the modal closing actions.
   */
  @Event({ bubbles: false, composed: false }) wppFullScreenModalClose: EventEmitter<FullScreenModalCloseDetails>

  /**
   * Event emitted when the open animation starts.
   */
  @Event() wppFullScreenModalOpenStart: EventEmitter<void>

  /**
   * Event emitted when the open animation ends.
   */
  @Event() wppFullScreenModalOpenComplete: EventEmitter<void>

  /**
   * Event emitted when the close animation starts.
   */
  @Event() wppFullScreenModalCloseStart: EventEmitter<FullScreenModalCloseDetails>

  /**
   * Event emitted when the close animation ends.
   */
  @Event() wppFullScreenModalCloseComplete: EventEmitter<FullScreenModalCloseDetails>

  /**
   * Handles the modal click actions.
   * @deprecated - this prop will be deleted in version 3.0.0 . Use `wppFullScreenModalOpenStart`/`wppFullScreenModalOpenComplete` instead
   */
  @Event({ bubbles: false, composed: false }) wppFullScreenModalOpen: EventEmitter<void>

  @Listen('keydown', { target: 'document' })
  protected handleCloseOnEsc(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.escapePress })
      this.closeReason = FullScreenModalCloseReason.escapePress
    }
  }

  @Watch('open')
  protected handleChangeFullScreenModalStatus(openStatus: boolean) {
    if (openStatus) {
      this.host.classList.add('component-ready')
    }

    setTimeout(() => {
      applyBodyStylesIfNeeded(this.open ? 'add' : 'remove')
    })
  }

  /**
   * Method for closing the full screen modal.
   */
  @Method()
  async closeFullScreenModal() {
    this.open = false
  }

  /**
   * Method for opening the full screen modal.
   */
  @Method()
  async openFullScreenModal() {
    this.open = true
  }

  private onOverlayClick = () => {
    if (this.disableOutsideClick) return
    this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.outsideClick })
    this.closeReason = FullScreenModalCloseReason.outsideClick
  }

  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('component-ready')
    }, 0)
  }

  disconnectedCallback() {
    this.closeFullScreenModal()
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
      this.wppFullScreenModalOpenStart.emit()
    } else {
      if (this.closeReason) {
        this.wppFullScreenModalCloseStart.emit({ reason: this.closeReason })
      } else {
        this.wppFullScreenModalCloseStart.emit()
      }
    }
  }

  private handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName !== ANIMATION_PROPERTY_NAME) return
    if (this.open) {
      this.wppFullScreenModalOpenComplete.emit()
      this.wppFullScreenModalOpen.emit()
    } else {
      if (this.closeReason) {
        this.wppFullScreenModalCloseComplete.emit({ reason: this.closeReason })
      } else {
        this.wppFullScreenModalCloseComplete.emit()
      }
    }
    this.closeReason = null
  }

  private handleCloseModal = () => {
    this.wppFullScreenModalClose.emit({ reason: FullScreenModalCloseReason.escapePress })
    this.closeReason = FullScreenModalCloseReason.escapePress
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
    'wpp-full-screen-modal': true,
    'wpp-full-screen-modal-wrapper': true,
    'wpp-visible': this.open,
    'wpp-hide': !this.open,
  })

  private fullScreenModalCssClasses = () => ({
    'full-screen-modal': true,
    visible: this.open,
    hide: !this.open,
  })

  private headerContainerCssClasses = () => ({
    'header-container': true,
  })

  render() {
    const Tag = this.formConfig ? 'form' : 'div'

    return (
      <Host
        class={this.hostCssClasses()}
        aria-modal="true"
        exportparts="wrapper, full-screen-modal, header, body, actions, header-wrapper, body-wrapper, actions-wrapper"
        onTransitionStart={this.handleTransitionStart}
        onTransitionEnd={this.handleTransitionEnd}
        style={{ zIndex: this.zIndex.toString() }}
      >
        <div class="full-screen-modal-overlay" part="wrapper">
          <wpp-overlay
            {...(this.withTransparentOverlay ? { style: { opacity: '0' } } : {})}
            isVisible={this.open}
            onWppClick={this.onOverlayClick}
            zIndex={0}
          />

          <Tag
            role="dialog"
            class={this.fullScreenModalCssClasses()}
            part="content"
            {...this.formConfig}
            data-testid="wpp-fullscreen-modal-content"
          >
            <div class={this.headerContainerCssClasses()}>
              <WrappedSlot wrapperClass={this.headerCssClasses()} name="header" onSlotchange={this.updateSlotData} />
              <wpp-action-button variant="secondary" onClick={this.handleCloseModal} class="close-button">
                <wpp-icon-cross slot="icon-start" />
              </wpp-action-button>
            </div>

            <WrappedSlot wrapperClass={this.bodyCssClasses()} name="body" onSlotchange={this.updateSlotData} />
            <WrappedSlot wrapperClass={this.actionsCssClasses()} name="actions" onSlotchange={this.updateSlotData} />
          </Tag>
        </div>
      </Host>
    )
  }
}
