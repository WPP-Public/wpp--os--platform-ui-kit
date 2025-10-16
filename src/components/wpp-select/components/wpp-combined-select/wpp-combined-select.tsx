import { Fragment, Host, h } from '@stencil/core'
import { WppSelect } from '../../wpp-select'
import { renderSingleSelect } from '../wpp-single-select/wpp-single-select'
import { InputChangeEventDetail } from '../../../../components/wpp-input/types'
import { ListItemInterface } from '../../types'

export function renderCombinedSelect(this: WppSelect) {
  const handleInputChange = (event: CustomEvent<InputChangeEventDetail>): void => {
    this.inputValue = String(event.detail.value)

    const selectedItems = this.internalList.filter((listItem: ListItemInterface) => listItem.checked)

    this.wppChange.emit({
      value: this.value,
      selectedItems,
      inputValue: this.inputValue,
      ...(this.name !== undefined && { name: this.name }),
    })
  }

  const onFocusInput = () => {
    if (this.disabled) return

    this.isContainerFocused = true

    if (this.tippyInstance?.state.isShown) {
      this.handleClick()
    }
  }

  const onBlurInput = () => {
    this.isContainerFocused = false
  }

  const getInlineMessage = () => (
    <Fragment>
      {this.message && (
        <wpp-inline-message
          message={this.message}
          type={this.messageType}
          showTooltipFrom={this.maxMessageLength}
          tooltipConfig={this.tooltipConfig}
        />
      )}
    </Fragment>
  )

  const combinedInputWrapperCssClasses = () => ({
    'inputs-container': true,
    'with-errors': this.hasErrorsOrWarnings('error'),
    'with-warnings': this.hasErrorsOrWarnings('warning'),
    disabled: this.disabled,
    'is-active': this.isOpen || this.isContainerFocused,
  })

  const getHostCssClasses = () => ({
    'wpp-combined-select': true,
    disabled: this.disabled,
  })

  const renderAnchor = () => (
    <div class={combinedInputWrapperCssClasses()}>
      {renderSingleSelect.call(this, false, this.size, false)}
      <wpp-input
        onWppChange={handleInputChange}
        value={this.inputValue}
        disabled={this.disabled}
        type={this.inputType}
        maskOptions={this.maskOptions}
        messageType={this.messageType}
        placeholder={this.placeholder}
        size={this.size}
        tabIndex={-1}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onClick={(event: FocusEvent) => event.stopPropagation()}
      />
    </div>
  )

  return (
    <Host
      class={getHostCssClasses()}
      onKeyUp={this.onKeyUp}
      aria-disabled={this.disabled}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    >
      {this.labelConfig?.text && (
        <wpp-label
          class={this.labelCssClasses()}
          htmlFor={this.name}
          optional={!this.required}
          disabled={this.disabled}
          config={this.labelConfig}
          tooltipConfig={this.labelTooltipConfig}
          onClick={() => this.handleClick()}
        />
      )}

      {this.isRenderMessageInTooltip ? (
        <wpp-tooltip
          text={this.message}
          error={this.messageType === 'error'}
          warning={this.messageType === 'warning'}
          config={this.tooltipConfig}
        >
          {renderAnchor()}
        </wpp-tooltip>
      ) : (
        renderAnchor()
      )}

      {!this.isRenderMessageInTooltip && getInlineMessage()}
    </Host>
  )
}
