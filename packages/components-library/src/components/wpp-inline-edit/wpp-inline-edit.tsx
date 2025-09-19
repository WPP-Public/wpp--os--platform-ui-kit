import { Component, Element, Host, h, Prop, Method, Event, EventEmitter, State, Watch } from '@stencil/core'

import { DropdownConfig } from '../../types/common'

import { InlineEditChangeModeEventDetail, InlineEditClosePopoverReason, InlineEditMode } from './types'

@Component({
  tag: 'wpp-inline-edit',
  styleUrl: 'wpp-inline-edit.scss',
  shadow: true,
})
export class WppInlineEdit {
  private inputRef?: HTMLWppInputElement | HTMLWppTextareaInputElement
  private formElementRef?: HTMLDivElement
  private wrapperRef?: HTMLDivElement
  private popoverRef?: HTMLWppPopoverElement

  @Element() host: HTMLWppInlineEditElement

  @State() initialValue: string

  @State() inputValue: string

  @State() isEdit: boolean

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
   * Emitted when the inline edit mode changes
   */
  @Event({ bubbles: false, composed: false }) wppModeChange: EventEmitter<InlineEditChangeModeEventDetail>

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
      if (this.mode === 'edit') this.getFormElement()?.setFocus()
    })
  }

  private getFormElement = () =>
    (this.wrapperRef?.querySelector('slot[name="form-element"]') as HTMLSlotElement)?.assignedNodes()[0] as
      | HTMLWppInputElement
      | HTMLWppTextareaInputElement

  private emitModeChange = (mode: InlineEditMode, reason?: InlineEditClosePopoverReason) => {
    this.wppModeChange.emit({ mode, closePopover: () => this.popoverRef?.closePopover(), reason })
  }

  private handleAccept = (reason: InlineEditClosePopoverReason) => {
    this.emitModeChange('read', reason)

    this.popoverRef?.closePopover()
  }

  private handleClose = (event: Event, reason: InlineEditClosePopoverReason) => {
    this.popoverRef?.closePopover()

    if (!(event?.target as HTMLElement).closest('[slot="form-element"]')) {
      if (reason === 'cancel') {
        this.getFormElement()?.setValue(this.initialValue)
      }

      this.emitModeChange('read', reason)

      return false
    }
  }

  private inlineEditCssClasses = () => ({
    'wpp-inline-edit': true,
  })

  private inlineEditPopoverCssClasses = () => ({
    popover: true,
    'full-width': this.mode === 'edit' && this.inputWidth !== 'auto' && this.inputWidth !== undefined,
  })

  private placeholderCssClasses = () => ({ placeholder: !this.value })

  render() {
    const isEdit = this.mode === 'edit'
    const inlineWidth = isEdit && this.inputWidth !== 'auto' && this.inputWidth !== undefined

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
            placement: 'right-start',
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
            onClickOutside: (_, e) => this.handleClose(e, 'outsideClick'),
          }}
        >
          <div slot="trigger-element" class="trigger-element">
            <div tabIndex={0} role="button" class="trigger" ref={ref => (this.wrapperRef = ref)}>
              {isEdit ? (
                <div class="wrapper" part="wrapper">
                  <div class="form-element" ref={ref => (this.formElementRef = ref)}>
                    <slot name="form-element" />
                  </div>
                </div>
              ) : (
                <div class="content" onClick={() => this.emitModeChange('edit')} part="content">
                  <div class="content-bg" part="content-bg" />
                  <wpp-typography class={this.placeholderCssClasses()} type="s-body" part="inline-edit-typography">
                    {this.value || this.placeholder}
                  </wpp-typography>
                  <wpp-icon-edit />
                </div>
              )}
            </div>
          </div>
          <div class="buttons" part="buttons">
            <wpp-action-button variant="inverted" onClick={() => this.handleAccept('apply')}>
              <wpp-icon-done slot="icon-start" />
            </wpp-action-button>
            <wpp-action-button variant="inverted" onClick={e => this.handleClose(e, 'cancel')}>
              <wpp-icon-cross slot="icon-start" />
            </wpp-action-button>
          </div>
        </wpp-popover>
      </Host>
    )
  }
}
