import { Component, Element, Host, h, Prop, Method, Event, EventEmitter, State, Watch } from '@stencil/core'

import { DropdownConfig } from '../../types/common'

import {
  InlineEditChangeModeEventDetail,
  InlineEditClosePopoverReason,
  InlineEditConfirmDetail,
  InlineEditLocales,
  InlineEditMode,
  InlineEditModeEnum,
} from './types'
import { Instance } from 'tippy.js'
import { isEventTargetContained, transformToVersionedTag } from '../../utils/utils'
import { LOCALES_DEFAULTS } from './const'

@Component({
  tag: 'wpp-inline-edit',
  styleUrl: 'wpp-inline-edit.scss',
  shadow: true,
})
export class WppInlineEdit {
  private tooltipInstance: Instance
  private inputRef?: HTMLWppInputElement | HTMLWppTextareaInputElement
  private popoverRef?: HTMLWppPopoverElement

  private lastValueWithError?: string = undefined
  private _locales: InlineEditLocales = LOCALES_DEFAULTS

  @Element() host: HTMLWppInlineEditElement

  @State() initialValue: string

  @State() inputValue: string

  @State() formType: 'input' | 'textarea' = 'input'

  // State that indicates if the async operation is done or in progress.
  // When `true`, the actions buttons are disabled and the component is waiting for a response from the server.
  @State() isPendingRequest: boolean = false

  /**
   * Defines the error message of the inline edit component.
   * The error message is displayed in a tooltip when the component is hovered.
   */
  @State() errorMessage?: string

  /**
   * Defines the inline edit mode.
   */
  @Prop() readonly mode: InlineEditMode = 'read'

  /**
   * Defines the value of the editing field.
   */
  @Prop() readonly value: string

  /**
   * Defines the placeholder for the input field. It is displayed when the input field is empty.
   * The placeholder is visible only in view mode. In edit mode, the input provided by the user will be displayed.
   */
  @Prop() readonly placeholder?: string = 'placeholder'

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly dropdownConfig: DropdownConfig = {}

  /**
   * Defines the width of the input field when in active state.
   * Accepts any valid CSS width expression (e.g., "300px", "100%", "calc(100% - 68px)").
   */
  @Prop({ reflect: true }) readonly inputWidth?: string = 'auto'

  /**
   * Indicates locales for the inline-edit component
   */
  @Prop() readonly locales: Partial<InlineEditLocales> = {}

  /**
   * Emitted when the inline edit mode changes
   */
  @Event({ bubbles: false, composed: false }) wppModeChange: EventEmitter<InlineEditChangeModeEventDetail>

  /**
   * Emitted when user clicks "Confirm" button.
   */
  @Event({ bubbles: true, composed: true }) wppConfirm: EventEmitter<InlineEditConfirmDetail>

  /**
   * Method for closing inline-edit
   */
  @Method()
  async closePopover() {
    this.popoverRef?.closePopover()
  }

  /**
   * Method that sets focus on the native input.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.inputRef?.setFocus()
  }

  @Watch('mode')
  editModeChangeHandler() {
    requestAnimationFrame(() => {
      if (this.mode === InlineEditModeEnum.EDIT) {
        const formElement: HTMLWppInputElement | HTMLWppTextareaInputElement | undefined = this.getFormElement()

        if (this.formType === 'input' && formElement) {
          const inputEl = formElement as HTMLWppInputElement

          inputEl.truncationTooltipConfig = {
            onShow: () => {
              if (this.errorMessage) return false
            },
          }
        }
      }
    })
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<InlineEditLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  componentWillLoad() {
    this.formType =
      this.getFormElement()?.tagName.toLowerCase() === transformToVersionedTag('wpp-textarea-input')
        ? 'textarea'
        : 'input'

    this._locales = { ...this._locales, ...this.locales }
  }

  private getFormElement = () =>
    this.host?.querySelector('[slot="form-element"]') as HTMLWppInputElement | HTMLWppTextareaInputElement | undefined

  private emitModeChange = (mode: InlineEditMode, reason?: InlineEditClosePopoverReason) => {
    this.wppModeChange.emit({ mode, closePopover: () => this.popoverRef?.closePopover(), reason })
  }

  private handleAccept = async () => {
    const formEl: HTMLWppInputElement | HTMLWppTextareaInputElement | undefined = this.getFormElement()

    if (!formEl) return

    this.isPendingRequest = true

    const waits: Promise<unknown>[] = []

    // Emit the confirm event and collect any promises to wait for.
    // The developers will pass a promise to the waitUntil function, which represents the async operation (e.g., server validation).
    const confirmEvent = this.wppConfirm.emit({
      value: this.value,
      waitUntil: (p: Promise<unknown>) => waits.push(p),
    })

    try {
      if (confirmEvent.defaultPrevented || waits.length > 0) {
        // If the developer does server validations, wait for it to complete and get the result.
        const results = await Promise.allSettled(waits)

        // If the component unmounts before the request finishes, don't process it.
        if (!this.host.isConnected) return

        // Search for any rejected promise and throw error if it exists.
        const rejected = results.find(r => r.status === 'rejected') as PromiseRejectedResult | undefined

        if (rejected) {
          throw rejected.reason ?? new Error(this._locales.defaultErrorMessage)
        }
      }

      // Successful validation, close the popover, clear errors.
      this.setErrorState('clear', formEl)
      this.emitModeChange('read', 'apply')

      this.popoverRef?.closePopover()
      this.lastValueWithError = undefined
    } catch (error) {
      // If the component unmounts before the request finishes, don't process it.
      if (!this.host.isConnected) return

      this.lastValueWithError = this.value

      // Put input / textarea in error state to display appropiate border-color.
      this.setErrorState('error', formEl, error)

      formEl.setFocus()

      // If error already exists and just the message has changed, display the tooltip again.
      if (this.tooltipInstance) {
        this.tooltipInstance.show()
      }
    } finally {
      if (this.host.isConnected) {
        // Validation done. Buttons no longer need to be disabled.
        this.isPendingRequest = false
      }
    }
  }

  private setErrorState = (
    // If type === 'error', the `error` should be provided.
    type: 'error' | 'clear',
    formEl: HTMLWppInputElement | HTMLWppTextareaInputElement,
    error?: unknown,
  ) => {
    this.errorMessage = type === 'clear' ? undefined : (error as Error).message || this._locales.defaultErrorMessage
    formEl.messageType = type === 'clear' ? undefined : 'error'
  }

  private handleClose = (event: Event, reason: InlineEditClosePopoverReason) => {
    if (this.isPendingRequest || isEventTargetContained(this.host, event)) return

    this.lastValueWithError = undefined

    this.popoverRef?.closePopover()

    if (!(event?.target as HTMLElement).closest('[slot="form-element"]')) {
      if (reason === 'cancel' || reason === 'outsideClick') {
        this.getFormElement()?.setValue(this.initialValue)
      }

      this.emitModeChange('read', reason)

      return false
    }
  }

  private inlineEditCssClasses = () => ({
    'wpp-inline-edit': true,
    'wpp-inline-edit-error': !!this.errorMessage && this.mode === InlineEditModeEnum.EDIT,
  })

  private inlineEditPopoverCssClasses = () => ({
    popover: true,
    'full-width': this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined,
  })

  private onKeyDownFormEl = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.handleAccept()
    }
  }

  private placeholderCssClasses = () => ({ placeholder: !this.value })

  private renderTriggerElement = () => (
    <div tabIndex={0} role="button" class="trigger">
      {this.mode === InlineEditModeEnum.EDIT ? (
        <div class="wrapper" part="wrapper">
          <div class="form-element" onKeyDown={this.onKeyDownFormEl}>
            <slot name="form-element" />
          </div>
        </div>
      ) : (
        <div class="content" onClick={() => this.emitModeChange(InlineEditModeEnum.EDIT)} part="content">
          <div class="content-bg" part="content-bg" />
          <wpp-typography class={this.placeholderCssClasses()} type="s-body" part="inline-edit-typography">
            {this.value || this.placeholder}
          </wpp-typography>
          <wpp-icon-edit />
        </div>
      )}
    </div>
  )

  render() {
    const inlineWidth =
      this.mode === InlineEditModeEnum.EDIT && this.inputWidth !== 'auto' && this.inputWidth !== undefined

    return (
      <Host
        class={this.inlineEditCssClasses()}
        exportparts="label, wrapper, input, textarea, buttons, inline-edit-typography, content, content-bg"
      >
        <wpp-popover
          ref={ref => (this.popoverRef = ref)}
          externalClass="inline-edit-popover"
          exportparts="content"
          class={this.inlineEditPopoverCssClasses()}
          style={{ width: inlineWidth ? this.inputWidth : '' }}
          config={{
            placement: this.formType === 'input' ? 'right-start' : 'bottom-start',
            offset: [0, 4],
            hideOnClick: false,
            animation: false,
            ...this.dropdownConfig,
            onShow: () => {
              this.initialValue = this.value

              setTimeout(() => {
                this.getFormElement()?.setFocus()
              }, 50)
            },
            onHidden: () => {
              const formEl = this.getFormElement()

              if (!formEl) return

              this.setErrorState('clear', formEl)
            },
            onClickOutside: (_, e) => this.handleClose(e, 'outsideClick'),
          }}
        >
          <div slot="trigger-element" class="trigger-element">
            {this.errorMessage && this.mode === InlineEditModeEnum.EDIT ? (
              <wpp-tooltip
                class={'wpp-anchor-toolip'}
                error
                text={this.errorMessage}
                config={{
                  showOnCreate: true,
                  onCreate: instance => {
                    this.tooltipInstance = instance
                  },
                  onShow: (instance: Instance) => {
                    setTimeout(() => {
                      instance.popperInstance?.update()
                    }, 20)
                  },
                }}
              >
                {this.renderTriggerElement()}
              </wpp-tooltip>
            ) : (
              this.renderTriggerElement()
            )}
          </div>
          <div class="buttons" part="buttons">
            <wpp-action-button
              disabled={this.isPendingRequest || this.value === this.lastValueWithError}
              variant="inverted"
              onClick={this.handleAccept}
            >
              <wpp-icon-done slot="icon-start" />
            </wpp-action-button>
            <wpp-action-button
              disabled={this.isPendingRequest}
              variant="inverted"
              onClick={e => this.handleClose(e, 'cancel')}
            >
              <wpp-icon-cross slot="icon-start" />
            </wpp-action-button>
          </div>
        </wpp-popover>
      </Host>
    )
  }
}
