import { Host, h } from '@stencil/core';
import { debounce, getSlotEmptyStates, mergeLocales, transformToVersionedTag, truncate } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot';
import { LOCALES_DEFAULTS } from './const';
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
        this.makeIconStartNonInteractive();
      }
    };
    // The pill host is the interactive control (role="checkbox", tab stop, keyboard handling),
    // so the decorative icon-start content (e.g. a wpp-avatar, which ships role="button"
    // tabIndex="0" by default) must not be independently focusable. Demoting it to
    // role="presentation" with tabIndex="-1" prevents an interactive control nested inside the
    // pill (SC 4.1.2 nested-interactive) and stops focusable descendants from living inside a
    // disabled pill.
    this.makeIconStartNonInteractive = () => {
      const iconStartElements = this.host.querySelectorAll('[slot="icon-start"]');
      iconStartElements.forEach(element => {
        element.setAttribute('role', 'presentation');
        if (element.tabIndex >= 0)
          element.tabIndex = -1;
      });
    };
    this.onClick = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      this.focusHost();
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
    this.onMouseDown = (event) => {
      // A disabled pill renders `tabindex="-1"`, which would still let a mouse click focus it (and make the group emit
      // `wppFocus`). Cancelling the mousedown keeps focus where it is; native `draggable` is already off when disabled.
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', FOCUS_TYPE.MOUSE);
      if (this.type === 'draggable') {
        this.updateComponentState('active');
        this.onDragPress(event);
      }
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
    this.handleKeyDown = (event) => {
      if ((this.type === 'multiple' || this.type === 'single') && event.key === ' ') {
        event.preventDefault();
        this.wppClick.emit({
          checked: !this.checked,
          value: this.value,
        });
      }
    };
    this.onClose = (event) => {
      if (this.disabled)
        return;
      event.preventDefault();
      event.stopPropagation();
      this.wppClose.emit(event);
    };
    // The remove icon is a `role="button"` control, so it must activate on both Enter and Space
    // (W3C ARIA APG) — without this, keyboard users can reach the icon but not remove the pill.
    // The keyboard event itself is emitted through `wppClose` (not a synthetic click), so parents such as
    // `wpp-autocomplete` can tell a keyboard removal from a mouse one and move focus accordingly.
    this.onCloseKeyDown = (event) => {
      const isActivationKey = event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar' || event.code === 'Space';
      if (!isActivationKey)
        return;
      event.preventDefault();
      // Keeps the key from reaching a `draggable` pill group, where Enter / Space would grab the pill.
      event.stopPropagation();
      this.onClose(event);
    };
    this.onDragPress = (event) => {
      if (this.disabled)
        return;
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
      // `display` / `draggable` pill hosts are not focusable themselves: keyboard users reach their drag and remove icon
      // buttons through Tab. They must not get `tabindex="-1"` either: a shadow host with a negative tabindex takes its
      // whole shadow tree out of the Tab order, which would make those buttons unreachable.
      if (this.type === 'display' || this.type === 'draggable')
        return null;
      return 0;
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
      return shouldShowTooltip ? (h("wpp-tooltip-v4-7-0", { text: originalLabel, disabled: this.disabled,
        // The tooltip anchor is not focusable, so its `focus` trigger never fires and a truncated label stays
        // unreadable for keyboard users (SC 1.4.13). The host is what takes focus, so it drives the tooltip.
        config: { triggerTarget: this.host } }, labelNode)) : (labelNode);
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
    this.getPillRole = () => {
      if (this.type === 'single')
        return 'radio';
      if (this.type === 'multiple')
        return 'checkbox';
      // Usually controlled by the pill-group.
      if (this.ariaProps?.role) {
        return this.ariaProps.role;
      }
      return 'presentation';
    };
    // `aria-roledescription` is ignored on presentational elements, so it is only set when the pill carries a real
    // role (e.g. `listitem`, assigned by the wpp-pill-group).
    this.getAriaRoleDescription = () => {
      if (this.type !== 'draggable' || this.getPillRole() === 'presentation')
        return undefined;
      return this.ariaProps.roleDescription ?? this._locales.draggablePillRoleDescription;
    };
    this.getAriaChecked = () => {
      if (this.type === 'single' || this.type === 'multiple') {
        return this.checked ? 'true' : 'false';
      }
      return undefined;
    };
    this.getListenersForDraggable = () => this.type === 'draggable' && !this.disabled
      ? {
        onMouseEnter: () => this.updateComponentState('hover'),
        onMouseLeave: () => this.updateComponentState(null),
        onMouseUp: () => this.updateComponentState(null),
      }
      : {};
    this.cssClasses = () => ({
      'pill-wrapper': true,
      'icon-start': this.hasIconStartSlot,
      'square-icon': this.hasSquareIcon,
      [`size-m`]: true,
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
      'size-m': true,
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
    this.type = 'single';
    this.disabled = false;
    this.removable = false;
    this.checked = false;
    this.label = undefined;
    this.ariaProps = {};
    this.locales = {};
    this.name = undefined;
    this.maxLength = undefined;
    this.showTooltipOnTruncate = true;
  }
  /**
   * Method that sets focus on the native button.
   */
  async setFocus() {
    setTimeout(() => {
      if (this.host) {
        this.host.focus();
        this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.TAB);
      }
    }, 0);
  }
  /**
   * Moves keyboard focus to the pill's remove icon and paints its focus ring.
   *
   * The ring is a `tab-focus` class this component only sets from its own Tab keyup, so a parent
   * that re-homes focus here with a plain `focus()` moves focus invisibly (WCAG 2.4.7). Parents
   * that take focus off a removed neighbouring pill should call this instead. No-op when the pill
   * has no remove icon to focus.
   */
  async setRemoveIconFocus() {
    if (!this.iconCrossRef)
      return;
    this.focusType = this.getUpdatedFocusInfo('icon-close', FOCUS_TYPE.TAB);
    this.iconCrossRef.focus();
  }
  /**
   * Method that sets focus on the drag icon button. Used by the pill group to restore focus after the pills are
   * re-ordered. `withFocusRing` shows the keyboard focus ring (keyboard re-ordering); pass `false` after a mouse drag.
   */
  async setFocusDragIcon(withFocusRing = true) {
    setTimeout(() => {
      if (this.iconDragRef) {
        this.iconDragRef.focus();
        // The ring is normally switched on by a Tab key-up, which never happens on a programmatic focus.
        this.focusType = {
          ...getInitFocusInfo(),
          'icon-draggable': withFocusRing ? FOCUS_TYPE.TAB : FOCUS_TYPE.MOUSE,
        };
      }
    }, 0);
  }
  componentDidLoad() {
    this.initResizeObserver();
  }
  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  /**
   * Keeps focus on the pill's own control after a click: the host for `single` / `multiple` (it carries the role, state
   * and keyboard handling), the drag icon button for `draggable`. Without this, clicking slotted `icon-start` content
   * (e.g. an avatar with `tabindex="-1"`) would focus that content.
   */
  focusHost() {
    // A `display` pill is static content and never takes focus.
    if (this.type === 'display')
      return;
    // The drag or remove icon button was clicked and already holds focus: keep it there.
    if (this.host.shadowRoot?.activeElement)
      return;
    // A `draggable` host is not focusable (see `checkTabIndex`), so its drag icon button takes focus instead: focus
    // stays in the group and Enter / Space then grabs this pill. No focus ring, as this is a mouse interaction.
    if (this.type === 'draggable') {
      this.iconDragRef?.focus();
      return;
    }
    this.host.focus();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onClick: this.onClick, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.handleKeyDown, onKeyUp: (event) => this.onKeyUp(event, 'wrapper'), ...this.getListenersForDraggable(),
      // The role of the pill is set by the wpp-pill-group through the ariaProps.role prop.
      // If the pill is not inside a wpp-pill-group, it will have role="presentation" by default.
      role: this.getPillRole(), "aria-label": this.ariaProps.label, "aria-labelledby": this.ariaProps.labelledby, "aria-describedby": this.ariaProps.describedby, "aria-disabled": this.disabled ? 'true' : undefined, "aria-checked": this.getAriaChecked(), "aria-roledescription": this.getAriaRoleDescription(), draggable: this.type === 'draggable' ? `${!this.disabled}` : undefined, tabIndex: this.ariaProps.tabIndex !== undefined ? this.ariaProps.tabIndex : this.checkTabIndex(), exportparts: "input, pill-wrapper, drag-wrapper, drag-icon, label, inner, active-icon, remove-icon, icon-start, icon-start-wrapper" }, h("input", { class: "pill-input", type: "checkbox", name: this.name, disabled: this.disabled, "aria-label": this.ariaProps.label, "aria-hidden": "true", part: "input", tabIndex: -1 }), h("div", { class: this.cssClasses(), part: "pill-wrapper" }, this.type === 'draggable' ? (h("div", { class: this.slotCssClasses(), part: "drag-wrapper" }, h("wpp-icon-drag-v4-7-0", { ref: elRef => (this.iconDragRef = elRef), class: { [`${this.focusType['icon-draggable']}`]: true }, role: "button", "aria-label": this._locales.dragPillLabel, "aria-disabled": this.disabled ? 'true' : undefined, part: "drag-icon", tabIndex: this.disabled ? -1 : 0, onKeyUp: (event) => this.onKeyUp(event, 'icon-draggable') }))) : (h(WrappedSlot, { name: "icon-start", wrapperClass: this.slotCssClasses(), onSlotchange: this.updateSlotData })), this.renderLabel(), this.checked && this.type === 'multiple' && h("wpp-icon-tick-v4-7-0", { class: "active-icon", part: "active-icon" }), this.removable && (this.type === 'display' || this.type === 'draggable') && (h("wpp-icon-cross-v4-7-0", { ref: elRef => (this.iconCrossRef = elRef), class: { [`${this.focusType['icon-close']}`]: true }, part: "remove-icon", role: "button", onClick: this.onClose, "aria-label": this._locales.removePillLabel.replace('{label}', this.label ?? '').trim(), "aria-disabled": this.disabled ? 'true' : undefined, tabIndex: this.disabled ? -1 : 0, onKeyDown: this.onCloseKeyDown, onKeyUp: (event) => this.onKeyUp(event, 'icon-close') })))));
  }
  static get is() { return "wpp-pill"; }
  static get registryIs() { return "wpp-pill-v4-7-0"; }
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
          "tags": [{
              "name": "deprecated",
              "text": "- the pills will always display in only 1 size."
            }],
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
        "reflect": false,
        "defaultValue": "'single'"
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
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<PillLocaleInterface>",
          "resolved": "{ removePillLabel?: string | undefined; dragPillLabel?: string | undefined; draggablePillRoleDescription?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "PillLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill/types.ts::PillLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for the pill. Holds the accessible names of the close and drag icon buttons and the\n`aria-roledescription` of a `draggable` pill. Partial overrides are merged with the English defaults."
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
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets focus on the native button.",
          "tags": []
        }
      },
      "setRemoveIconFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Moves keyboard focus to the pill's remove icon and paints its focus ring.\n\nThe ring is a `tab-focus` class this component only sets from its own Tab keyup, so a parent\nthat re-homes focus here with a plain `focus()` moves focus invisibly (WCAG 2.4.7). Parents\nthat take focus off a removed neighbouring pill should call this instead. No-op when the pill\nhas no remove icon to focus.",
          "tags": []
        }
      },
      "setFocusDragIcon": {
        "complexType": {
          "signature": "(withFocusRing?: boolean) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method that sets focus on the drag icon button. Used by the pill group to restore focus after the pills are\nre-ordered. `withFocusRing` shows the keyboard focus ring (keyboard re-ordering); pass `false` after a mouse drag.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
}
