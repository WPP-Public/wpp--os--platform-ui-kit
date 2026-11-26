'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7d205426.js');
const WppIcon = require('./WppIcon-0da0cae5.js');
const utils = require('./utils-8b2c3bc1.js');
const common = require('./common-ee802540.js');
const WrappedSlot = require('./WrappedSlot-1f8b2d26.js');
require('./consts-d8f5ef98.js');

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDrag = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-drag", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.5 16C8.5 14.8954 7.60457 14 6.5 14C5.39543 14 4.5 14.8954 4.5 16C4.5 17.1046 5.39543 18 6.5 18C7.60457 18 8.5 17.1046 8.5 16ZM8.5 10C8.5 8.89543 7.60457 8 6.5 8C5.39543 8 4.5 8.89543 4.5 10C4.5 11.1046 5.39543 12 6.5 12C7.60457 12 8.5 11.1046 8.5 10ZM6.5 2C7.60457 2 8.5 2.89543 8.5 4C8.5 5.10457 7.60457 6 6.5 6C5.39543 6 4.5 5.10457 4.5 4C4.5 2.89543 5.39543 2 6.5 2ZM15.5 16C15.5 14.8954 14.6046 14 13.5 14C12.3954 14 11.5 14.8954 11.5 16C11.5 17.1046 12.3954 18 13.5 18C14.6046 18 15.5 17.1046 15.5 16ZM15.5 10C15.5 8.89543 14.6046 8 13.5 8C12.3954 8 11.5 8.89543 11.5 10C11.5 11.1046 12.3954 12 13.5 12C14.6046 12 15.5 11.1046 15.5 10ZM13.5 2C14.6046 2 15.5 2.89543 15.5 4C15.5 5.10457 14.6046 6 13.5 6C12.3954 6 11.5 5.10457 11.5 4C11.5 2.89543 12.3954 2 13.5 2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-drag-v4-7-0"; }
};
WppIconDrag.style = wppIconCss;

const LOCALES_DEFAULTS = {
  removePillLabel: 'Remove {label}',
  dragPillLabel: 'Drag pill',
  draggablePillRoleDescription: 'Draggable pill',
};

const wppPillCss = ":host{--pill-height:var(--wpp-pill-height, 32px);--pill-padding-m:var(--wpp-pill-padding-m, 5px 12px);--pill-padding-icon-m:var(--wpp-pill-padding-icon-m, 4px 12px 4px 4px);--pill-padding-square-icon-m:var(--wpp-pill-padding-square-icon-m, 4px 12px 4px 10px);--pill-display-padding-m:var(--wpp-pill-display-padding-m, 5px 10px 5px 12px);--pill-display-padding-icon-m:var(--wpp-pill-display-padding-icon-m, 4px 10px 4px 4px);--pill-display-padding-square-icon-m:var(--wpp-pill-display-padding-square-icon-m, 4px 10px 4px 10px);--pill-draggable-padding-m:var(--wpp-pill-draggable-padding-m, 5px 10px);--pill-multiple-padding-m:var(--wpp-pill-multiple-padding-m, 5px 12px);--pill-multiple-padding-icon-m:var(--wpp-pill-multiple-padding-icon-m, 4px 12px 4px 4px);--pill-multiple-padding-square-icon-m:var(--wpp-pill-multiple-padding-square-icon-m, 4px 12px 4px 10px);--pill-checked-multiple-padding-m:var(--wpp-checked-pill-multiple-padding-m, 5px 8px 5px 12px);--pill-checked-multiple-padding-icon-m:var(--wpp-checked-pill-multiple-padding-icon-m, 4px 8px 4px 4px);--pill-checked-multiple-padding-square-icon-m:var(\n    --wpp-checked-pill-multiple-padding-square-icon-m,\n    4px 8px 4px 10px\n  );--pill-margin-icon-text-m:var(--wpp-pill-margin-icon-text-m, 0 6px 0 0);--pill-draggable-margin-icon-text-m:var(--wpp-pill-draggable-margin-icon-text-m, 0 4px 0 0);--pill-margin-icon-close:var(--wpp-pill-margin-icon-close, 0 0 0 4px);--pill-bg-color:var(--wpp-pill-bg-color, transparent);--pill-bg-color-hover:var(--wpp-pill-bg-color-hover, var(--wpp-grey-color-200));--pill-bg-color-active:var(--wpp-pill-bg-color-active, var(--wpp-grey-color-300));--pill-checked-bg-color:var(--wpp-pill-checked-bg-color, var(--wpp-primary-color-100));--pill-checked-bg-color-hover:var(--wpp-pill-checked-bg-color-hover, var(--wpp-primary-color-200));--pill-border-radius:var(--wpp-pill-border-radius, var(--wpp-border-radius-round));--pill-border-width:var(--wpp-pill-border-width, var(--wpp-border-width-s));--pill-border-style:var(--wpp-pill-border-style, solid);--pill-border-color:var(--wpp-pill-border-color, var(--wpp-grey-color-500));--pill-border-color-hover:var(--wpp-pill-border-color-hover, var(--wpp-grey-color-700));--pill-border-color-active:var(--wpp-pill-border-color-active, var(--wpp-grey-color-800));--pill-border-color-disabled:var(--wpp-pill-border-color-disabled, var(--wpp-grey-color-400));--pill-border-color-checked:var(--wpp-pill-border-color-checked, var(--wpp-primary-color-500));--pill-checked-single-border-color:var(--wpp-pill-checked-single-border-color, var(--wpp-brand-color));--pill-checked-multiple-border-color:var(--wpp-pill-checked-multiple-border-color, var(--wpp-primary-color-500));--pill-checked-multiple-border-color-hover:var(\n    --wpp-pill-checked-multiple-border-color-hover,\n    var(--wpp-primary-color-600)\n  );--pill-first-border-color-focus:var(--wpp-pill-first-border-color-focus, var(--wpp-grey-color-000));--pill-second-border-color-focus:var(--wpp-pill-second-border-color-focus, var(--wpp-brand-color));--pill-text-color:var(--wpp-pill-text-color, var(--wpp-text-color));--pill-text-color-disabled:var(--wpp-pill-text-color-disabled, var(--wpp-text-color-disabled));--pill-checked-text-color:var(--wpp-pill-checked-text-color, var(--wpp-primary-color-500));--pill-checked-font-weight:var(--wpp-pill-checked-font-weight, 500);--pill-checked-multiple-text-color:var(--wpp-pill-checked-multiple-text-color, var(--wpp-primary-color-500));--pill-checked-multiple-text-color-hover:var(\n    --wpp-pill-checked-multiple-text-color-hover,\n    var(--wpp-primary-color-600)\n  );--pill-active-icon-color:var(--wpp-pill-active-icon-color, var(--wpp-brand-color-active));--pill-active-icon-margin:var(--wpp-pill-active-icon-margin, 0 0 0 2px);--pill-single-icon-color:var(--wpp-pill-single-icon-color, var(--wpp-grey-color-600));--pill-display-icon-color:var(--wpp-pill-display-icon-color, var(--wpp-grey-color-600));--pill-draggable-icon-color:var(--wpp-pill-draggable-icon-color, var(--wpp-grey-color-600));--pill-checked-start-icon-color:var(--wpp-pill-checked-start-icon-color, var(--wpp-primary-color-500));--pill-start-icon-color-hover:var(--wpp-pill-start-icon-color-hover, var(--wpp-icon-color-hover));--pill-start-icon-color-active:var(--wpp-pill-start-icon-color-active, var(--wpp-icon-color-active));--pill-cross-icon-color-hover:var(--wpp-pill-cross-icon-color-hover, var(--wpp-icon-color-hover));--pill-cross-icon-color-active:var(--wpp-pill-cross-icon-color-active, var(--wpp-icon-color-active));--pill-cross-icon-color-disabled:var(--wpp-pill-cross-icon-color-active, var(--wpp-grey-color-400));--pill-drag-icon-color-hover:var(--wpp-pill-drag-icon-color-hover, var(--wpp-icon-color-hover));--pill-drag-icon-color-active:var(--wpp-pill-drag-icon-color-active, var(--wpp-icon-color-active));--pill-drag-icon-color-disabled:var(--wpp-pill-drag-icon-color-active, var(--wpp-grey-color-400));--pill-icon-color-disabled:var(--wpp-pill-icon-color-disabled, var(--wpp-grey-color-400));--pill-checked-multiple-icon-color:var(--wpp-pill-checked-multiple-icon-color, var(--wpp-primary-color-500));--pill-checked-multiple-icon-color-hover:var(\n    --wpp-pill-checked-multiple-icon-color-hover,\n    var(--wpp-primary-color-600)\n  );--pill-draggable-active-box-shadow-color:var(--wpp-pill-draggable-active-box-shadow-color, var(--wpp-box-shadow-m));display:-ms-inline-flexbox;display:inline-flex;outline:none}:host .pill-input{position:absolute;z-index:-1;margin:0;opacity:0;visibility:hidden}:host .pill-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;height:var(--pill-height);-webkit-box-sizing:border-box;box-sizing:border-box;background-color:var(--pill-bg-color);border-radius:var(--pill-border-radius);border:var(--pill-border-width) var(--pill-border-style) var(--pill-border-color);max-width:100%}:host .pill-wrapper.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);background-color:var(--pill-bg-color-hover);border-color:var(--pill-border-color-hover)}:host .pill-wrapper.tab-focus.checked{background-color:var(--pill-checked-bg-color)}:host .pill-wrapper:not(.display,.draggable,.checked.single){cursor:pointer}:host .pill-wrapper:hover:not(.display,.draggable,.checked){background-color:var(--pill-bg-color-hover);border-color:var(--pill-border-color-hover)}:host .pill-wrapper:hover:not(.display,.draggable,.checked) ::slotted([slot=icon-start]),:host .pill-wrapper:hover:not(.display,.draggable,.checked) .wpp-icon-drag{color:var(--pill-start-icon-color-hover)}:host .pill-wrapper:active:not(.display,.draggable,.checked){background-color:var(--pill-bg-color-active);border-color:var(--pill-border-color-active)}:host .pill-wrapper:active:not(.display,.draggable,.checked) ::slotted([slot=icon-start]),:host .pill-wrapper:active:not(.display,.draggable,.checked) .wpp-icon-drag{color:var(--pill-start-icon-color-active)}:host .pill-wrapper .icon-start{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:var(--pill-margin-icon-text-m)}:host .pill-wrapper .icon-start.slot-hidden{display:none}:host .pill-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:400;color:var(--pill-text-color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host .pill-wrapper .active-icon{color:var(--pill-active-icon-color);margin:var(--pill-active-icon-margin)}:host .pill-wrapper .wpp-icon-cross{margin:var(--pill-margin-icon-close)}:host .pill-wrapper .wpp-icon-cross,:host .pill-wrapper .wpp-icon-drag{outline:none}:host .pill-wrapper .wpp-icon-cross.tab-focus,:host .pill-wrapper .wpp-icon-drag.tab-focus{border-radius:3px;outline:none;-webkit-box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);box-shadow:0 0 0 1px var(--pill-first-border-color-focus), 0 0 0 3px var(--pill-second-border-color-focus);color:var(--pill-cross-icon-color-hover)}:host .pill-wrapper.size-m{padding:var(--pill-padding-m)}:host .pill-wrapper.size-m.icon-start{padding:var(--pill-padding-icon-m)}:host .pill-wrapper.size-m.icon-start.square-icon{padding:var(--pill-padding-square-icon-m)}:host .pill-wrapper.multiple.size-m{padding:var(--pill-multiple-padding-m)}:host .pill-wrapper.multiple.size-m.icon-start{padding:var(--pill-multiple-padding-icon-m)}:host .pill-wrapper.multiple.size-m.icon-start.square-icon{padding:var(--pill-multiple-padding-square-icon-m)}:host .pill-wrapper.display.size-m{padding:var(--pill-display-padding-m)}:host .pill-wrapper.display.size-m.icon-start{padding:var(--pill-display-padding-icon-m)}:host .pill-wrapper.display.size-m.icon-start.square-icon{padding:var(--pill-display-padding-square-icon-m)}:host .pill-wrapper.display .wpp-icon-cross{cursor:pointer}:host .pill-wrapper.display .wpp-icon-cross:hover{color:var(--pill-cross-icon-color-hover)}:host .pill-wrapper.display .wpp-icon-cross:active{color:var(--pill-cross-icon-color-active)}:host .pill-wrapper.draggable{cursor:initial}:host .pill-wrapper.draggable.size-m{padding:var(--pill-draggable-padding-m)}:host .pill-wrapper.draggable.size-m .icon-start{margin:var(--pill-draggable-margin-icon-text-m)}:host .pill-wrapper.draggable.hover{cursor:-webkit-grab;cursor:grab;background-color:var(--pill-bg-color-hover);border-color:var(--pill-border-color-hover)}:host .pill-wrapper.draggable.hover .wpp-icon-drag{color:var(--pill-start-icon-color-hover)}:host .pill-wrapper.draggable.active{cursor:-webkit-grabbing;cursor:grabbing;background-color:var(--pill-bg-color-active);border-color:var(--pill-border-color-active);-webkit-box-shadow:var(--pill-draggable-active-box-shadow-color);box-shadow:var(--pill-draggable-active-box-shadow-color)}:host .pill-wrapper.draggable.active .wpp-icon-drag{color:var(--pill-start-icon-color-active)}:host .pill-wrapper.draggable .wpp-icon-cross{cursor:pointer}:host .pill-wrapper.draggable .wpp-icon-cross:hover{color:var(--pill-cross-icon-color-hover)}:host .pill-wrapper.draggable .wpp-icon-cross:active{color:var(--pill-cross-icon-color-active)}:host .pill-wrapper.checked{background-color:var(--pill-checked-bg-color);border-color:var(--pill-border-color-checked)}:host .pill-wrapper.checked .label{color:var(--pill-checked-text-color);font-weight:var(--pill-checked-font-weight)}:host .pill-wrapper.checked.single{border-color:var(--pill-checked-single-border-color);pointer-events:none}:host .pill-wrapper.checked.single ::slotted([slot=icon-start]),:host .pill-wrapper.checked.single .active-icon{color:var(--pill-checked-start-icon-color)}:host .pill-wrapper.checked.multiple.size-m{padding:var(--pill-checked-multiple-padding-m)}:host .pill-wrapper.checked.multiple.size-m.icon-start{padding:var(--pill-checked-multiple-padding-icon-m)}:host .pill-wrapper.checked.multiple.size-m.icon-start.square-icon{padding:var(--pill-checked-multiple-padding-square-icon-m)}:host .pill-wrapper.checked.multiple .label{color:var(--pill-checked-multiple-text-color)}:host .pill-wrapper.checked.multiple ::slotted([slot=icon-start]),:host .pill-wrapper.checked.multiple .active-icon{color:var(--pill-checked-multiple-icon-color)}:host .pill-wrapper.checked.multiple:hover{background-color:var(--pill-checked-bg-color-hover);border-color:var(--pill-checked-multiple-text-color-hover)}:host .pill-wrapper.checked.multiple:hover .label{color:var(--pill-checked-multiple-text-color-hover)}:host .pill-wrapper.checked.multiple:hover ::slotted([slot=icon-start]),:host .pill-wrapper.checked.multiple:hover .active-icon{color:var(--pill-checked-multiple-icon-color-hover)}:host .pill-wrapper.disabled:not(.checked){pointer-events:none;border-color:var(--pill-border-color-disabled)}:host .pill-wrapper.disabled:not(.checked) ::slotted([slot=icon-start]){color:var(--pill-text-color-disabled);opacity:0.5}:host .pill-wrapper.disabled:not(.checked) .wpp-icon-cross{color:var(--pill-cross-icon-color-disabled)}:host .pill-wrapper.disabled:not(.checked) .wpp-icon-drag{color:var(--pill-drag-icon-color-disabled)}:host .pill-wrapper.disabled:not(.checked) .label{color:var(--pill-text-color-disabled)}:host .label-wrapper{overflow:hidden}:host .wpp-tooltip{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host .wpp-tooltip::part(anchor){width:100%}:host([data-grabbed]) .pill-wrapper{background-color:var(--pill-bg-color-active);border-color:var(--pill-border-color-active)}:host([data-grabbed]) .pill-wrapper ::slotted([slot=icon-start]),:host([data-grabbed]) .pill-wrapper .wpp-icon-drag{color:var(--pill-start-icon-color-active)}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host(.transparent){opacity:0;visibility:hidden;pointer-events:none}";

const getInitFocusInfo = () => ({
  wrapper: common.FOCUS_TYPE.NONE,
  'icon-close': common.FOCUS_TYPE.NONE,
  'icon-draggable': common.FOCUS_TYPE.NONE,
});
const WppPill = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClick = index.createEvent(this, "wppClick", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppClose = index.createEvent(this, "wppClose", 1);
    this.wppDragPress = index.createEvent(this, "wppDragPress", 1);
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.updateSlotData = (ev) => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        start: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.start;
      if (this.hasIconStartSlot) {
        const iconStartSlot = ev.target;
        this.hasSquareIcon = iconStartSlot
          .assignedElements()
          .some(element => element.tagName === utils.transformToVersionedTag('wpp-avatar').toUpperCase() &&
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
      this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', common.FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = (event) => {
      // A disabled pill renders `tabindex="-1"`, which would still let a mouse click focus it (and make the group emit
      // `wppFocus`). Cancelling the mousedown keeps focus where it is; native `draggable` is already off when disabled.
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('icon-draggable', common.FOCUS_TYPE.MOUSE);
      if (this.type === 'draggable') {
        this.updateComponentState('active');
        this.onDragPress(event);
      }
    };
    this.onKeyUp = (event, type) => {
      if (event.key === 'Tab') {
        if (type === 'icon-draggable') {
          this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.NONE);
        }
        if (type === 'icon-close') {
          this.focusType = this.getUpdatedFocusInfo('icon-draggable', common.FOCUS_TYPE.NONE);
        }
        this.focusType = this.getUpdatedFocusInfo(type, common.FOCUS_TYPE.TAB);
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
      return utils.truncate(this.label, this.maxLength);
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
        this.resizeObserverCallback = utils.debounce(() => this.checkLabelOverflow(), 50);
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
        return (index.h("div", { class: "label", part: "label", ref: this.setLabelRef }, index.h("slot", { part: "inner" })));
      }
      const wasMaxLengthTruncated = !!this.maxLength && this.maxLength > 0 && displayed !== originalLabel;
      const shouldShowTooltip = this.showTooltipOnTruncate && (this.isOverflowTruncated || wasMaxLengthTruncated);
      const labelNode = (index.h("div", { class: "label", part: "label", ref: this.setLabelRef }, displayed));
      return shouldShowTooltip ? (index.h("wpp-tooltip-v4-7-0", { text: originalLabel, disabled: this.disabled,
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
      'tab-focus': this.focusType.wrapper === common.FOCUS_TYPE.TAB &&
        this.focusType['icon-draggable'] !== common.FOCUS_TYPE.TAB &&
        this.focusType['icon-close'] !== common.FOCUS_TYPE.TAB,
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
        this.focusType = this.getUpdatedFocusInfo('wrapper', common.FOCUS_TYPE.TAB);
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
    this.focusType = this.getUpdatedFocusInfo('icon-close', common.FOCUS_TYPE.TAB);
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
          'icon-draggable': withFocusRing ? common.FOCUS_TYPE.TAB : common.FOCUS_TYPE.MOUSE,
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
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
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
    return (index.h(index.Host, { class: this.hostCssClasses(), onClick: this.onClick, onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyDown: this.handleKeyDown, onKeyUp: (event) => this.onKeyUp(event, 'wrapper'), ...this.getListenersForDraggable(),
      // The role of the pill is set by the wpp-pill-group through the ariaProps.role prop.
      // If the pill is not inside a wpp-pill-group, it will have role="presentation" by default.
      role: this.getPillRole(), "aria-label": this.ariaProps.label, "aria-labelledby": this.ariaProps.labelledby, "aria-describedby": this.ariaProps.describedby, "aria-disabled": this.disabled ? 'true' : undefined, "aria-checked": this.getAriaChecked(), "aria-roledescription": this.getAriaRoleDescription(), draggable: this.type === 'draggable' ? `${!this.disabled}` : undefined, tabIndex: this.ariaProps.tabIndex !== undefined ? this.ariaProps.tabIndex : this.checkTabIndex(), exportparts: "input, pill-wrapper, drag-wrapper, drag-icon, label, inner, active-icon, remove-icon, icon-start, icon-start-wrapper" }, index.h("input", { class: "pill-input", type: "checkbox", name: this.name, disabled: this.disabled, "aria-label": this.ariaProps.label, "aria-hidden": "true", part: "input", tabIndex: -1 }), index.h("div", { class: this.cssClasses(), part: "pill-wrapper" }, this.type === 'draggable' ? (index.h("div", { class: this.slotCssClasses(), part: "drag-wrapper" }, index.h("wpp-icon-drag-v4-7-0", { ref: elRef => (this.iconDragRef = elRef), class: { [`${this.focusType['icon-draggable']}`]: true }, role: "button", "aria-label": this._locales.dragPillLabel, "aria-disabled": this.disabled ? 'true' : undefined, part: "drag-icon", tabIndex: this.disabled ? -1 : 0, onKeyUp: (event) => this.onKeyUp(event, 'icon-draggable') }))) : (index.h(WrappedSlot.WrappedSlot, { name: "icon-start", wrapperClass: this.slotCssClasses(), onSlotchange: this.updateSlotData })), this.renderLabel(), this.checked && this.type === 'multiple' && index.h("wpp-icon-tick-v4-7-0", { class: "active-icon", part: "active-icon" }), this.removable && (this.type === 'display' || this.type === 'draggable') && (index.h("wpp-icon-cross-v4-7-0", { ref: elRef => (this.iconCrossRef = elRef), class: { [`${this.focusType['icon-close']}`]: true }, part: "remove-icon", role: "button", onClick: this.onClose, "aria-label": this._locales.removePillLabel.replace('{label}', this.label ?? '').trim(), "aria-disabled": this.disabled ? 'true' : undefined, tabIndex: this.disabled ? -1 : 0, onKeyDown: this.onCloseKeyDown, onKeyUp: (event) => this.onKeyUp(event, 'icon-close') })))));
  }
  static get registryIs() { return "wpp-pill-v4-7-0"; }
  get host() { return index.getElement(this); }
};
WppPill.style = wppPillCss;

exports.wpp_icon_drag = WppIconDrag;
exports.wpp_pill = WppPill;
