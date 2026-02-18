import { Host, h } from '@stencil/core';
import { debounce, getSlotEmptyStates, transformToVersionedTag, truncate } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
const getInitFocusInfo = () => ({
  wrapper: FOCUS_TYPE.NONE,
  'icon-close': FOCUS_TYPE.NONE,
  'icon-draggable': FOCUS_TYPE.NONE,
});
/**
 * @slot - Contains the content displayed in the pill. The default slot, without the name attribute.
 * @slot icon-start - May contain an icon or components that will be placed before the main content, e.g. a plus icon, wpp-avatar
 *
 * @part pill-wrapper - Wrapper for the pill content
 * @part input - Input element
 * @part drag-wrapper - drag wrapper element
 * @part drag-icon - drag icon element
 * @part label - label text element
 * @part inner - Content slot element
 * @part active-icon - active icon element
 * @part remove-icon - remove icon element
 */
export class WppPill {
  constructor() {
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.updateSlotData = (ev) => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.start;
      if (this.hasIconStartSlot) {
        const iconStartSlot = ev.target;
        this.hasSquareIcon = iconStartSlot
          .assignedElements()
          .some(element => element.tagName === transformToVersionedTag('wpp-avatar').toUpperCase() &&
          element.variant === 'square');
      }
    };
    this.onClick = (event) => {
      if (this.disabled || this.type === 'draggable')
        return;
      event.preventDefault();
      this.setFocus();
      this.wppClick.emit({
        checked: !this.checked,
        value: this.value,
      });
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        if (type === 'icon-draggable') {
          this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.NONE);
        }
        if (type === 'icon-close') {
          this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.NONE);
        }
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.onClose = (event) => {
      if (this.disabled)
        return;
      this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.NONE);
      event.preventDefault();
      event.stopPropagation();
      this.wppClose.emit(event);
    };
    this.onDragPress = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      this.wppDragPress.emit(event);
    };
    this.updateComponentState = (updateData) => {
      if (this.disabled)
        return;
      this.componentState = updateData;
    };
    this.checkTabIndex = () => {
      if (this.disabled)
        return -1;
      if (this.type === 'display' || this.type === 'draggable' || this.removable) {
        return null;
      }
      else {
        return 0;
      }
    };
    this.getLabelText = () => {
      if (!this.maxLength || this.maxLength <= 0)
        return this.label;
      return truncate(this.label, this.maxLength);
    };
    this.checkLabelOverflow = () => {
      if (!this.labelRef) {
        const found = this.findLabelEl();
        if (found)
          this.setLabelRef(found);
      }
      if (!this.labelRef)
        return;
      const el = this.labelRef;
      const isTruncated = el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      if (isTruncated !== this.isOverflowTruncated) {
        this.isOverflowTruncated = isTruncated;
      }
    };
    this.initResizeObserver = () => {
      if (!this.showTooltipOnTruncate)
        return;
      if (!this.labelRef) {
        const found = this.findLabelEl();
        if (found)
          this.setLabelRef(found);
      }
      if (!this.labelRef)
        return;
      if (!this.resizeObserverCallback) {
        this.resizeObserverCallback = debounce(() => this.checkLabelOverflow(), 50);
      }
      if (!this.resizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          this.resizeObserverCallback?.();
        });
      }
      try {
        this.resizeObserver.observe(this.labelRef);
      }
      catch {
        console.error('Error observing labelRef');
      }
      requestAnimationFrame(() => this.checkLabelOverflow());
    };
    this.renderLabel = () => {
      const originalLabel = this.label;
      const displayed = this.getLabelText();
      if (!originalLabel) {
        return (h("div", { class: "label", part: "label", ref: this.setLabelRef }, h("slot", { part: "inner" })));
      }
      const wasMaxLengthTruncated = !!this.maxLength && this.maxLength > 0 && displayed !== originalLabel;
      const shouldShowTooltip = this.showTooltipOnTruncate && (this.isOverflowTruncated || wasMaxLengthTruncated);
      const labelNode = (h("div", { class: "label", part: "label", ref: this.setLabelRef }, displayed));
      return shouldShowTooltip ? (h("wpp-tooltip-v4-0-0", { text: originalLabel, disabled: this.disabled }, labelNode)) : (labelNode);
    };
    this.setLabelRef = (el) => {
      if (el === this.labelRef)
        return;
      if (this.resizeObserver && this.labelRef) {
        try {
          this.resizeObserver.unobserve(this.labelRef);
        }
        catch {
          console.error('Error unobserving labelRef');
        }
      }
      this.labelRef = el;
      if (this.resizeObserver && this.labelRef) {
        try {
          this.resizeObserver.observe(this.labelRef);
        }
        catch {
          console.error('Error observing labelRef');
        }
      }
      requestAnimationFrame(() => this.checkLabelOverflow());
    };
    this.findLabelEl = () => {
      const root = this.host.shadowRoot;
      if (!root)
        return undefined;
      return root.querySelector('[part="label"]');
    };
    this.cssClasses = () => ({
      'pill-wrapper': true,
      'icon-start': this.hasIconStartSlot,
      'square-icon': this.hasSquareIcon,
      [`size-${this.size}`]: true,
      [this.type]: !!this.type,
      checked: this.checked && this.type !== 'draggable' && this.type !== 'display',
      disabled: this.disabled,
      removable: this.removable,
      hover: this.componentState === 'hover',
      active: this.componentState === 'active',
      'tab-focus': this.focusType.wrapper === FOCUS_TYPE.TAB &&
        this.focusType['icon-draggable'] !== FOCUS_TYPE.TAB &&
        this.focusType['icon-close'] !== FOCUS_TYPE.TAB,
    });
    this.slotCssClasses = () => ({
      'icon-start': true,
      [`size-${this.size}`]: true,
      'drag-wrapper': this.type === 'draggable',
      'slot-hidden': !this.hasIconStartSlot && this.type !== 'draggable',
    });
    this.hostCssClasses = () => ({
      'wpp-pill': true,
    });
    this.hasIconStartSlot = false;
    this.hasSquareIcon = false;
    this.componentState = undefined;
    this.focusType = getInitFocusInfo();
    this.isOverflowTruncated = false;
    this.value = undefined;
    this.size = 'm';
    this.type = undefined;
    this.disabled = false;
    this.removable = false;
    this.checked = false;
    this.label = undefined;
    this.ariaProps = {};
    this.name = undefined;
    this.maxLength = undefined;
    this.showTooltipOnTruncate = true;
  }
  componentWillLoad() {
    const pillGroup = this.host.closest(transformToVersionedTag('wpp-pill-group'));
    if (pillGroup) {
      this.type = pillGroup.type;
    }
  }
  componentDidLoad() {
    this.initResizeObserver();
  }
  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }
  setFocus() {
    if (this.inputEl) {
      this.inputEl.focus();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), "aria-disabled": this.disabled, "aria-checked": this.checked, "aria-hidden": this.disabled ? 'true' : null, onClick: this.onClick, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'wrapper'), role: "checkbox", exportparts: "input, pill-wrapper, drag-wrapper, drag-icon, label, inner, active-icon, remove-icon, icon-start, icon-start-wrapper", tabIndex: this.checkTabIndex() }, h("input", { class: "pill-input", type: "checkbox", name: this.name, disabled: this.disabled, ref: focusEl => (this.inputEl = focusEl), "aria-label": this.ariaProps.label, part: "input", title: "", tabIndex: -1 }), h("div", { class: this.cssClasses(), part: "pill-wrapper" }, this.type === 'draggable' ? (h("div", { class: this.slotCssClasses(), part: "drag-wrapper" }, h("wpp-icon-drag-v4-0-0", { class: { [`${this.focusType['icon-draggable']}`]: true }, part: "drag-icon", onMouseEnter: () => this.updateComponentState('hover'), onMouseLeave: () => this.updateComponentState(null), onMouseDown: ev => {
        this.updateComponentState('active');
        this.onDragPress(ev);
        this.onMouseDown();
      }, onMouseUp: () => this.updateComponentState(null), tabIndex: this.disabled ? -1 : 0, onKeyUp: (event) => this.onKeyUp(event, 'icon-draggable') }))) : (h(WrappedSlot, { name: "icon-start", wrapperClass: this.slotCssClasses(), onSlotchange: this.updateSlotData })), this.renderLabel(), this.checked && this.type === 'multiple' && h("wpp-icon-tick-v4-0-0", { class: "active-icon", part: "active-icon" }), this.removable && (this.type === 'display' || this.type === 'draggable') && (h("wpp-icon-cross-v4-0-0", { class: { [`${this.focusType['icon-close']}`]: true }, part: "remove-icon", onClick: this.onClose, tabIndex: this.disabled ? -1 : 0, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'icon-close') })))));
  }
  static get is() { return "wpp-pill"; }
  static get registryIs() { return "wpp-pill-v4-0-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-pill.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-pill.css"]
    };
  }
  static get properties() {
    return {
      "value": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "PillValue",
          "resolved": "number | string",
          "references": {
            "PillValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill/types.ts::PillValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the pill value."
        },
        "attribute": "value",
        "reflect": true
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PillSize",
          "resolved": "\"m\"",
          "references": {
            "PillSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill/types.ts::PillSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the pill size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "type": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "PillType",
          "resolved": "\"display\" | \"draggable\" | \"multiple\" | \"single\"",
          "references": {
            "PillType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill/types.ts::PillType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the pill type."
        },
        "attribute": "type",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the pill is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "removable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the pill has close icon button\nNote: This is applicable only for `type=\"display\"` or `type=\"draggable\"`."
        },
        "attribute": "removable",
        "reflect": true,
        "defaultValue": "false"
      },
      "checked": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the pill is selected."
        },
        "attribute": "checked",
        "reflect": true,
        "defaultValue": "false"
      },
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the pill label."
        },
        "attribute": "label",
        "reflect": false
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the pill `aria-` props."
        },
        "defaultValue": "{}"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the pill name."
        },
        "attribute": "name",
        "reflect": true
      },
      "maxLength": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in version 4.0.0."
            }],
          "text": "Defines the maximum label length (in characters) of a single item.\nZero or fewer means there is no limit"
        },
        "attribute": "max-length",
        "reflect": false
      },
      "showTooltipOnTruncate": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "true",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If set, the tooltip will be shown when the text is truncated."
        },
        "attribute": "show-tooltip-on-truncate",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "hasIconStartSlot": {},
      "hasSquareIcon": {},
      "componentState": {},
      "focusType": {},
      "isOverflowTruncated": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClick",
        "name": "wppClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the selected state changes."
        },
        "complexType": {
          "original": "PillChangeEventDetail",
          "resolved": "PillChangeEventDetail",
          "references": {
            "PillChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill/types.ts::PillChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the pill is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the pill loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppClose",
        "name": "wppClose",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the close icon clicked"
        },
        "complexType": {
          "original": "MouseEvent",
          "resolved": "MouseEvent",
          "references": {
            "MouseEvent": {
              "location": "global",
              "id": "global::MouseEvent"
            }
          }
        }
      }, {
        "method": "wppDragPress",
        "name": "wppDragPress",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the drag icon pressed"
        },
        "complexType": {
          "original": "MouseEvent",
          "resolved": "MouseEvent",
          "references": {
            "MouseEvent": {
              "location": "global",
              "id": "global::MouseEvent"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
}
