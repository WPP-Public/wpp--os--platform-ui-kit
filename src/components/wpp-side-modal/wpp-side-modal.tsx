import { Component, Element, h, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch } from '@stencil/core'

import {
  applyBodyStylesIfNeeded,
  getHighestContainerInDOM,
  getSlotEmptyStates,
  isEventTargetContained,
  transformToVersionedTag,
} from '../../utils/utils'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'

import {
  SideModalCloseDetails,
  SideModalFormConfig,
  SideModalCloseReason,
  ActionConfig,
  FirstActionConfig,
  SecondActionConfig,
  ThirdActionConfig,
} from './types'
import { Z_INDEX } from '../../common/consts'

/**
 * @slot header - Content that is displayed within the `.side-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.side-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.side-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.
 * @deprecated The `actions` slot is deprecated and will be removed in the next major release (v3.0.0). Use the `actionsConfig` property instead.
 *
 * @part content - modal content element
 * @part wrapper - component wrapper element
 * @part overlay - side modal overlay element
 * @part header-container - root header element
 * @part header-wrapper - element for slotted header
 * @part button - Button element
 * @part back-button - Back button element
 * @part icon-cross - icon cross element
 * @part icon-chevron - icon chevron element
 * @part header-with-back-button - wrapper with header and back button elements
 * @part actions - actions slot element
 */

@Component({
  tag: 'wpp-side-modal',
  styleUrl: 'wpp-side-modal.scss',
  shadow: true,
})
export class WppSideModal {
  // These 2 properties are created to impose restrictions on the buttons config.
  private leftButtonConfig: undefined | ThirdActionConfig
  private rightButtonsConfig: (FirstActionConfig | SecondActionConfig)[]
  private topOffset: number = 0
  private ignoreOutsideClicks: boolean = false

  @Element() host: HTMLWppSideModalElement

  @State() isShowContent: boolean

  @State() isReady: boolean

  @State() isHidden: boolean = true

  @State() hasHeaderSlot: boolean = false

  @State() hasBodySlot: boolean = false

  @State() hasActionsSlot: boolean = false

  @State() isScrolled: boolean = false

  @State() closeReason: SideModalCloseReason | null = null

  /**
   * Configuration for rendering action buttons.
   *
   * The `actionsConfig` property is an array that can contain at most 1 of each:
   * - 1 WppButton with variant = "primary" / "destructive"
   * - 1 WppButton with variant = "secondary" / "destructive-secondary"
   * - 1 WppActionButton with variant = "primary" / "destructive". The button also has to have an icon.
   */
  @Prop() readonly actionsConfig?: ActionConfig

  /**
   * If the side modal is open.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false

  /**
   * Indicates the side modal size
   */
  @Prop() readonly size?: 's' | 'm' | 'l' | 'xl' | '2xl'

  /**
   * If the side modal can be closed by clicking outside of it.
   */
  @Prop() readonly disableOutsideClick: boolean = false

  /**
   * If you pass this prop wrapper of dialog will be rendered as form.
   */
  @Prop() readonly formConfig?: SideModalFormConfig

  /**
   * If the side modal has back button in the header.
   */
  @Prop() readonly withBackButton: boolean = false

  /**
   * If the side modal backdrop is visible.
   */
  @Prop() readonly backdropVisible: boolean = true

  /**
   * Defines the z-index of the WppSideModal.
   */
  @Prop() readonly zIndex: number = Z_INDEX.SIDE_MODAL

  /**
   * If `true` - the side modal will be rendered below the OS bar.
   */
  @Prop() readonly osBarCompatible: boolean = false

  /**
   * Handles the side modal closing actions.
   */
  @Event({ bubbles: false, composed: false }) wppSideModalClose: EventEmitter<SideModalCloseDetails>

  /**
   * Event emitted when the open animation starts.
   */
  @Event() wppSideModalOpenStart: EventEmitter<void>

  /**
   * Event emitted when the open animation ends.
   */
  @Event() wppSideModalOpenComplete: EventEmitter<void>

  /**
   * Event emitted when the close animation starts.
   */
  @Event() wppSideModalCloseStart: EventEmitter<SideModalCloseDetails>

  /**
   * Event emitted when the close animation ends.
   */
  @Event() wppSideModalCloseComplete: EventEmitter<SideModalCloseDetails>

  /**
   * Handles the side modal click actions.
   * @deprecated - this prop will be deleted in version 4.0.0 . Use `wppSideModalOpenStart`/`wppSideModalOpenComplete` instead
   */
  @Event({ bubbles: false, composed: false }) wppSideModalOpen: EventEmitter<void>

  /**
   * Handles the side modal back button click.
   */
  @Event({ bubbles: false, composed: false }) wppSideModalBackButtonClick: EventEmitter<void>

  @Listen('keydown', { target: 'document' })
  protected handleCloseOnEsc(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.open) {
      this.wppSideModalClose.emit({ reason: SideModalCloseReason.escapePress })
      this.closeReason = SideModalCloseReason.escapePress
    }
  }

  @Watch('open')
  protected handleChangeModalStatus(openStatus: boolean) {
    if (openStatus) {
      this.host.classList.add('wpp-component-ready')
    }

    if (this.backdropVisible) {
      setTimeout(() => {
        applyBodyStylesIfNeeded(this.open ? 'add' : 'remove')
      })
    }
  }

  @Watch('actionsConfig')
  onUpdateActionsConfig() {
    this.updateButtons()
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

  @Listen('click', { target: 'document' })
  handleClickOutside(event: MouseEvent) {
    if (!this.open || this.disableOutsideClick || !this.osBarCompatible || !this.ignoreOutsideClicks) return
    if (event.target === this.host) return

    if (event.target !== this.host && !isEventTargetContained(this.host, event)) {
      const path = (event.composedPath && event.composedPath()) || []
      const isInPortalInside = path.some(
        node => node instanceof HTMLElement && node.closest('[data-wpp-portal-inside]') !== null,
      )

      if (isInPortalInside) return

      this.wppSideModalClose.emit({ reason: SideModalCloseReason.outsideClick })
      this.closeReason = SideModalCloseReason.outsideClick
      this.closeModal()
    }
  }

  private updateButtons = () => {
    // This function is called in componentWillLoad and when actionsConfig changes

    // We first reset button configurations.
    this.leftButtonConfig = undefined
    this.rightButtonsConfig = []

    // Set new button configuration
    this.actionsConfig?.forEach((actionConfigItem: FirstActionConfig | SecondActionConfig | ThirdActionConfig) => {
      if ('icon' in actionConfigItem) {
        this.leftButtonConfig = actionConfigItem as ThirdActionConfig
      } else {
        if (this.rightButtonsConfig.length < 2) {
          this.rightButtonsConfig.push(actionConfigItem)
        }
      }
    })
  }

  private onOverlayClick = () => {
    if (this.disableOutsideClick) return
    this.wppSideModalClose.emit({ reason: SideModalCloseReason.outsideClick })
    this.closeReason = SideModalCloseReason.outsideClick
  }

  componentWillLoad() {
    if (this.host.querySelector('[slot="actions"]')) {
      console.warn(
        'The `actions` slot is deprecated and will be removed in a future release. Please use the `actionsConfig` property instead.',
      )
    }

    this.topOffset = this.getTopOffset()
    this.updateSlotData()
    this.updateButtons()
  }

  // TODO: issues with FOUC(Flash Of Unstyled Content), react output does not inherit Stencil configuration,
  //       invisiblePrehydration:true( works for Storybook, but not for react/angular components) there is might
  //       be an option, that we need to provide our own prehydration mechanism. Temporal solution.
  componentDidLoad() {
    setTimeout(() => {
      this.open && this.host.classList.add('wpp-component-ready')
    }, 0)

    const bodySlot = this.host.shadowRoot?.querySelector('.body')

    if (bodySlot) {
      bodySlot.addEventListener('scroll', this.handleScroll)
    }
  }

  disconnectedCallback() {
    this.closeModal()

    const bodySlot = this.host.shadowRoot?.querySelector('.body')

    if (bodySlot) {
      bodySlot.removeEventListener('scroll', this.handleScroll)
    }
  }

  private getTopOffset = () => {
    if (!this.osBarCompatible) return 0

    const highestContainer = getHighestContainerInDOM()

    if (!highestContainer) return 0

    // Need to query for the first header in the root element, because the OS bar is the first header element in the root element.
    return (highestContainer.querySelector('.wpp > header') as HTMLHeadElement)?.offsetHeight ?? 0
  }

  private handleScroll = (event: Event) => {
    const target = event.target as HTMLElement

    this.isScrolled = target.scrollTop > 0
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

  private handleCloseModal = () => {
    this.wppSideModalClose.emit({ reason: SideModalCloseReason.crossClick })
    this.closeReason = SideModalCloseReason.crossClick
  }

  private handleBackButtonClick = () => {
    this.wppSideModalBackButtonClick.emit()
  }

  private handleTransitionStart = (event: TransitionEvent) => {
    if (event.propertyName !== 'visibility') return
    if (this.open) {
      this.isHidden = false
      this.wppSideModalOpenStart.emit()
    } else {
      if (this.closeReason) {
        this.wppSideModalCloseStart.emit({ reason: this.closeReason })
      } else {
        this.wppSideModalCloseStart.emit()
      }
      this.ignoreOutsideClicks = false
    }
  }

  private handleTransitionEnd = (event: TransitionEvent) => {
    if (event.propertyName !== 'visibility') return
    if (this.open) {
      this.wppSideModalOpenComplete.emit()
      this.wppSideModalOpen.emit()
      this.ignoreOutsideClicks = true
    } else {
      this.isHidden = true
      if (this.closeReason) {
        this.wppSideModalCloseComplete.emit({ reason: this.closeReason })
      } else {
        this.wppSideModalCloseComplete.emit()
      }
    }
    this.closeReason = null
  }

  private renderLeftButton = () => {
    // Render left button based on config.
    if (!this.leftButtonConfig) return <div class="left-button-container"></div>

    const { label, icon, ...rest } = this.leftButtonConfig

    return (
      <div class="left-button-container">
        <wpp-action-button {...rest}>
          {h(transformToVersionedTag(icon), { slot: 'icon-start' })}
          {label}
        </wpp-action-button>
      </div>
    )
  }

  private renderRightButtons = () => {
    // Render right buttons based on config.
    if (!this.rightButtonsConfig || this.rightButtonsConfig.length === 0) return

    return (
      <div class="right-button-container">
        {this.rightButtonsConfig.map((rightButtonConfigItem: FirstActionConfig | SecondActionConfig) => {
          const { label, ...rest } = rightButtonConfigItem

          return (
            <wpp-button size="m" {...rest}>
              {label}
            </wpp-button>
          )
        })}
      </div>
    )
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
    'slot-hidden': !this.hasActionsSlot && (!this.actionsConfig || this.actionsConfig.length === 0),
    'with-actions-config': !!this.actionsConfig && this.actionsConfig.length > 0,
  })

  private hostCssClasses = () => ({
    'wpp-side-modal': true,
    'wpp-side-modal-wrapper': true,
    'wpp-visible': this.open,
    'wpp-hidden': this.isHidden,
    'wpp-overlay-hidden': !this.backdropVisible,
    'wpp-os-bar-compatible': this.osBarCompatible,
  })

  private sideModalCssClasses = () => ({
    'side-modal': true,
    visible: this.open,
    hide: !this.open,
    [`size-${this.size}`]: !!this.size,
  })

  private headerContainerCssClasses = () => ({
    'header-container': true,
    'with-back-button': this.withBackButton,
    'with-bottom-border': this.isScrolled,
  })

  private renderBody = () => {
    const Tag = this.formConfig ? 'form' : 'div'

    return (
      <Tag
        part="content"
        role="dialog"
        class={this.sideModalCssClasses()}
        {...this.formConfig}
        data-testid="wpp-side-modal-content"
      >
        <div class={this.headerContainerCssClasses()} part="header-container">
          {this.withBackButton ? (
            <div class="header-with-back-button" part="header-with-back-button">
              <wpp-action-button
                variant="secondary"
                onClick={this.handleBackButtonClick}
                class="back-button"
                part="back-button"
              >
                <wpp-icon-chevron direction="left" slot="icon-start" part="icon-chevron" />
              </wpp-action-button>
              <WrappedSlot wrapperClass={this.headerCssClasses()} name="header" onSlotchange={this.updateSlotData} />
            </div>
          ) : (
            <WrappedSlot wrapperClass={this.headerCssClasses()} name="header" onSlotchange={this.updateSlotData} />
          )}
          <wpp-action-button variant="secondary" onClick={this.handleCloseModal} class="close-button" part="button">
            <wpp-icon-cross slot="icon-start" part="icon-cross" />
          </wpp-action-button>
        </div>

        <WrappedSlot wrapperClass={this.bodyCssClasses()} name="body" onSlotchange={this.updateSlotData} />

        {this.hasActionsSlot ? (
          <WrappedSlot wrapperClass={this.actionsCssClasses()} name="actions" onSlotchange={this.updateSlotData} />
        ) : (
          this.actionsConfig &&
          this.actionsConfig.length > 0 && (
            <div class={this.actionsCssClasses()} part="actions">
              {this.renderLeftButton()}
              {this.renderRightButtons()}
            </div>
          )
        )}
      </Tag>
    )
  }

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        aria-modal="true"
        exportparts="wrapper, side-modal, header-container, button, icon-cross, header, body, actions, header-wrapper, body-wrapper, actions-wrapper, back-button, icon-chevron, header-with-back-button"
        onTransitionStart={this.handleTransitionStart}
        onTransitionEnd={this.handleTransitionEnd}
        style={{ zIndex: this.zIndex.toString(), '--wpp-side-modal-top-offset': `${this.topOffset}px` }}
        onClick={(event: Event) => event.stopPropagation()}
      >
        {this.backdropVisible && (
          <div class="modal-overlay" part="wrapper">
            <wpp-overlay isVisible={this.open} onWppClick={this.onOverlayClick} zIndex={0} />
            {this.renderBody()}
          </div>
        )}
        {!this.backdropVisible && this.renderBody()}
      </Host>
    )
  }
}
