import { Fragment, h, Host } from '@stencil/core'
import { WppSelect } from '../../wpp-select'
import { FOCUS_TYPE } from '../../../../types/common'

export function renderTextSelect(this: WppSelect) {
  const renderAnchor = () => (
    <Fragment>
      <wpp-typography id="select-text" type="s-body">
        {this.renderedText || this.placeholder}
      </wpp-typography>
      <wpp-icon-chevron class={this.isOpen ? 'isOpen' : ''} direction={'down'} />
    </Fragment>
  )

  const getAnchorCSSClasses = () => ({
    anchor: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'truncated-text': this.truncate,
    'should-truncate': this.shouldTruncate,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  })

  const getInlineMessage = () => (
    <Fragment>
      {this.message && (
        <wpp-inline-message
          class="inline-message"
          showTooltipFrom={this.maxMessageLength}
          message={this.message}
          type={this.messageType}
          tooltipConfig={this.tooltipConfig}
        />
      )}
    </Fragment>
  )

  return (
    <Host
      class="wpp-text-select"
      onKeyUp={this.onKeyUp}
      aria-disabled={this.disabled}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    >
      <div
        class={getAnchorCSSClasses()}
        ref={el => (this.anchorRef = el)}
        tabIndex={this.disabled ? -1 : 0}
        onClick={() => this.handleClick()}
      >
        {this.truncate && this.shouldTruncate ? (
          <wpp-tooltip text={this.renderedText || this.placeholder} config={{ placement: 'right' }} class="tooltip">
            {renderAnchor()}
          </wpp-tooltip>
        ) : (
          renderAnchor()
        )}
      </div>

      {getInlineMessage()}

      <div class="wpp-select-portal" ref={el => (this.portalRef = el)}>
        <div class="list">{this.renderList()}</div>
      </div>
    </Host>
  )
}
