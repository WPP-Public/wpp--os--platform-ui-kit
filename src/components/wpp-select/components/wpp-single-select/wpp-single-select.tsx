import { Fragment, h, Host } from '@stencil/core'
import { WppSelect } from '../../wpp-select'
import { SelectSize } from '../../types'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'
import { FOCUS_TYPE } from '../../../../types/common'

export function renderSingleSelect(
  this: WppSelect,
  isBaseComponent = true,
  customSize?: SelectSize,
  isRenderMessageInTooltip?: boolean,
) {
  const getAnchorCSSClasses = () => ({
    anchor: true,
    [`size-${customSize || this.size}`]: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'with-errors': this.hasErrorsOrWarnings('error'),
    'with-warnings': this.hasErrorsOrWarnings('warning'),
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  const getSelectPlaceholder = () => {
    if (isBaseComponent) {
      return this.displayValue || this.renderedText || this.placeholder
    }

    return this.renderedText
  }

  const getInlineMessage = () => (
    <Fragment>
      {this.message && isBaseComponent && (
        <wpp-inline-message
          class={!this.messageType ? 'default-message' : ''}
          showTooltipFrom={this.maxMessageLength}
          message={this.message}
          type={this.messageType || 'information'}
          tooltipConfig={this.tooltipConfig}
        />
      )}
    </Fragment>
  )

  const renderAnchor = () => (
    <div
      class={getAnchorCSSClasses()}
      ref={el => (this.anchorRef = el)}
      tabIndex={this.disabled ? -1 : 0}
      onClick={() => this.handleClick()}
    >
      <WrappedSlot wrapperClass={this.iconStartCssClasses()} name="icon-start" onSlotchange={this.updateSlotData} />

      <div class="overflow-container" ref={refEl => (this.overflowContainerRef = refEl)}>
        {this.textOverflows ? (
          <wpp-tooltip text={getSelectPlaceholder()}>
            <p>{getSelectPlaceholder()}</p>
          </wpp-tooltip>
        ) : (
          <p>{getSelectPlaceholder()}</p>
        )}
      </div>

      <input
        class="input"
        ref={refEl => (this.inputRef = refEl)}
        type="text"
        name={this.name}
        onChange={() => this.checkIfTextOverflows()}
        disabled={this.disabled}
        value={getSelectPlaceholder()}
        tabIndex={-1}
        readonly
        aria-label={this.ariaProps.label}
        title=""
        style={{ width: this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto' }}
        required={this.required}
      />

      <wpp-icon-chevron class={this.isOpen || this.isDropdownOpen ? 'isOpen' : ''} direction={'down'} />
    </div>
  )

  const RootTag = isBaseComponent ? Host : Fragment

  return (
    <RootTag
      onKeyUp={this.onKeyUp}
      onKeyDown={this.onKeyDown}
      class="wpp-single-select"
      aria-disabled={this.disabled}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    >
      {this.labelConfig?.text && isBaseComponent && (
        <wpp-label
          class={this.labelCssClasses()}
          optional={!this.required}
          htmlFor={this.name}
          disabled={this.disabled}
          config={this.labelConfig}
          tooltipConfig={this.labelTooltipConfig}
          onClick={() => this.handleClick()}
        />
      )}

      {isRenderMessageInTooltip ? (
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

      {!isRenderMessageInTooltip && getInlineMessage()}

      <div class="wpp-select-portal" onKeyDown={this.onKeyDownPortal} ref={el => (this.portalRef = el)}>
        {this.shouldShowSearch && (
          <Fragment>
            <wpp-input
              type="search"
              class="select-portal-search-input"
              value={this.searchText}
              onWppChange={this.handleSearch}
              name={this.name && `${this.name}-search-input`}
              placeholder={this._locales.searchInputPlaceholder}
            />

            <wpp-divider color="var(--wpp-grey-color-300)"></wpp-divider>
          </Fragment>
        )}

        <div class="list">{this.renderList()}</div>
      </div>
    </RootTag>
  )
}
