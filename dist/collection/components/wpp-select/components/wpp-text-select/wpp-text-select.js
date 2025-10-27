import { Fragment, h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../../../types/common';
/**
 * @internal
 */
export function renderTextSelect() {
  const renderAnchor = () => (h(Fragment, null, h("wpp-typography-v3-3-0", { id: "select-text", type: "s-body" }, this.renderedText || this.placeholder), h("wpp-icon-chevron-v3-3-0", { class: this.isOpen ? 'isOpen' : '', direction: 'down' })));
  const getAnchorCSSClasses = () => ({
    anchor: true,
    disabled: this.disabled,
    opened: this.isOpen,
    'truncated-text': this.truncate,
    'should-truncate': this.shouldTruncate,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
  });
  const getInlineMessage = () => (h(Fragment, null, this.message && (h("wpp-inline-message-v3-3-0", { class: "inline-message", showTooltipFrom: this.maxMessageLength, message: this.message, type: this.messageType, tooltipConfig: this.tooltipConfig }))));
  return (h(Host, { class: "wpp-text-select", onKeyUp: this.onKeyUp, "aria-disabled": this.disabled, onFocus: this.onFocus, onBlur: this.onBlur }, h("div", { class: getAnchorCSSClasses(), ref: el => (this.anchorRef = el), tabIndex: this.disabled ? -1 : 0, onClick: () => this.handleClick() }, this.truncate && this.shouldTruncate ? (h("wpp-tooltip-v3-3-0", { text: this.renderedText || this.placeholder, config: { placement: 'right' }, class: "tooltip" }, renderAnchor())) : (renderAnchor())), getInlineMessage(), h("div", { class: "wpp-select-portal", ref: el => (this.portalRef = el) }, h("div", { class: "list" }, this.renderList()))));
}
