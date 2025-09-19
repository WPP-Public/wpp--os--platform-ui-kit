import { Fragment, h, Host } from '@stencil/core'
import { WppSelect } from '../../wpp-select'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'
import { LOCALES_DEFAULTS } from '../../config'
import { FOCUS_TYPE } from '../../../../types/common'

export function renderMultipleSelect(this: WppSelect) {
  const getAnchorCSSClasses = () => ({
    anchor: true,
    [`size-${this.size}`]: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'with-errors': this.hasErrorsOrWarnings('error'),
    'with-warnings': this.hasErrorsOrWarnings('warning'),
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  const getRenderedText = () => {
    if (this.internalList.length) {
      if (this.checkedItems === this.internalList.length - this.disabledItems && this.showSelectAllText) {
        // In case all items are checked, we display the "locales.allSelectedText" text.
        return this.locales.allSelectedText || LOCALES_DEFAULTS.allSelectedText
      }

      if (this.textOverflows) {
        return `${this.checkedItems} ${this.locales.selectLabel || LOCALES_DEFAULTS.selectLabel}`
      }
    }

    return this.renderedText || this.placeholder
  }

  const getInlineMessage = () => (
    <Fragment>
      {this.message && (
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
        <p>{getRenderedText()}</p>
      </div>

      <input
        class="input"
        type="text"
        ref={refEl => (this.inputRef = refEl)}
        name={this.name}
        onChange={() => this.checkIfTextOverflows()}
        disabled={this.disabled}
        value={this.renderedText}
        tabIndex={-1}
        readonly
        aria-label={this.ariaProps.label}
        title=""
        style={{ width: this.overflowContainerRef ? `${this.overflowContainerRef.clientWidth}px` : 'auto' }}
        required={this.required}
      />

      <wpp-icon-chevron class={this.isOpen ? 'isOpen' : ''} direction={'down'} />
    </div>
  )

  return (
    <Host
      class="wpp-multiple-select"
      onKeyUp={this.onKeyUp}
      aria-disabled={this.disabled}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    >
      {this.labelConfig?.text && (
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

      <div class="wpp-select-portal" ref={el => (this.portalRef = el)}>
        {this.shouldShowSearch && (
          <Fragment>
            <wpp-input
              type="search"
              class="select-portal-search-input"
              value={this.searchText}
              onWppChange={this.handleSearch}
              name={this.name && `${this.name}-search-input`}
              placeholder={this.locales.searchInputPlaceholder}
            />

            <wpp-divider color="var(--wpp-grey-color-300)"></wpp-divider>
          </Fragment>
        )}

        <div class="list" ref={refEl => (this.listRef = refEl)}>
          {this.renderList()}
        </div>

        {this.withFolder && this.isOpen && (
          <div class="multiple-select-folder">
            {this.withScroll && <wpp-divider />}

            <div class="multiple-select-folder-buttons">
              <wpp-action-button
                variant="secondary"
                disabled={!this.canSelectAll || this.loading}
                onClick={this.handleSelectAll}
              >
                {this.locales.selectAllText}
              </wpp-action-button>
              {this.canClearAll && (
                <wpp-action-button variant="secondary" disabled={this.loading} onClick={this.handleClearAll}>
                  {this.locales.clearAllText}
                </wpp-action-button>
              )}
            </div>
          </div>
        )}
      </div>
    </Host>
  )
}
