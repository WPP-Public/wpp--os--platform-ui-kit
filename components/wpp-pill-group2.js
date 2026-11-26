import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { k as transformToVersionedTag, z as mergeLocales } from './utils.js';
import { d as defineCustomElement$7 } from './wpp-icon-error2.js';
import { d as defineCustomElement$6 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$5 } from './wpp-internal-label2.js';
import { d as defineCustomElement$4 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-label2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const LOCALES_DEFAULTS = {
  sortableList: 'Sortable list',
  pillGrabbed: (label, position, total) => `${label} grabbed, position ${position} of ${total}. Use the arrow keys to move it, Enter or Space to drop it, Escape to cancel.`,
  pillMoved: (label, position, total) => `${label} moved to position ${position} of ${total}.`,
  pillDropped: (label, position, total) => `${label} dropped at position ${position} of ${total}.`,
  moveCancelled: (label, position, total) => `Move cancelled. ${label} returned to position ${position} of ${total}.`,
};

const wppPillGroupCss = ":host{--pill-group-item-margin:var(--wpp-pill-group-item-margin, 0 8px 0 0);--pill-group-label-margin:var(--wpp-pill-group-label-margin, 0 0 8px 0);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--pill-group-label-margin)}:host .label .wpp-internal-label::part(info-wrapper){cursor:text}:host .pills-wrapper{display:-ms-inline-flexbox;display:inline-flex;outline:none}:host .pills-wrapper:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host .pills-wrapper ::slotted(.wpp-pill:not(:last-child)){margin:var(--pill-group-item-margin)}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);border:0;white-space:nowrap}";

const WppPillGroup = /*@__PURE__*/ proxyCustomElement(class WppPillGroup extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppReorderList = createEvent(this, "wppReorderList", 1);
    this.pillItems = [];
    this.hasFocus = false;
    this.currentDraggedIndex = null;
    this.isDragging = false;
    this.grabbedPillValue = undefined;
    this.grabbedPillOriginalIndex = null;
    // Pill whose drag icon must receive focus once the consumer has re-rendered the re-ordered list.
    this.pillToFocusAfterReorder = undefined;
    // Pill removed through the keyboard: once the consumer has removed it, focus moves to the closest focusable pill.
    this.pillToFocusAfterRemoval = undefined;
    this.setActivePill = () => {
      if (this.type !== 'single' && this.type !== 'multiple')
        return;
      // In the `single` group, only one pill is focusable (roving tabindex).
      const tabStopIndex = this.type === 'single' ? this.getCurrentIndex() : undefined;
      this.pillItems.forEach((pill, pillIndex) => this.updatePill(pill, pillIndex, tabStopIndex));
    };
    this.updatePill = (pill, pillIndex, tabStopIndex) => {
      if (this.type === 'single') {
        pill.checked = pill.value === this.value;
        this.updateAriaPropsOfPill(pill, 'tabIndex', pillIndex === tabStopIndex ? 0 : -1);
      }
      else if (this.type === 'multiple') {
        if (this.value === undefined) {
          pill.checked = false;
        }
        else if (Array.isArray(this.value)) {
          pill.checked = this.value.includes(pill.value);
        }
      }
    };
    this.updateAriaPropsOfPill = (pill, property, value) => {
      pill.ariaProps = {
        ...pill.ariaProps,
        [property]: value,
      };
    };
    this.handleSlotChange = () => {
      this.pillItems = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-pill')));
      // In the `single` group, only one pill is focusable (roving tabindex).
      const tabStopIndex = this.type === 'single' ? this.getCurrentIndex() : undefined;
      this.pillItems.forEach((pill, pillIndex) => {
        if (this.type === 'draggable' || this.type === 'display') {
          // For pill group types `display` and `draggable`, we will announce the pills as list items, since they are not interactive.
          this.updateAriaPropsOfPill(pill, 'role', 'listitem');
        }
        // When the pills are re-ordered in `draggable` group, they re-render and may lose the grabbed state, so we need to set it again.
        // `pill.value` can still be `undefined` here (e.g. a pill that is not upgraded yet), so only compare when a pill is grabbed.
        if (this.type === 'draggable' && this.grabbedPillValue !== undefined && this.grabbedPillValue === pill.value) {
          this.setPillGrabbed(pill, true);
          pill.setFocusDragIcon();
        }
        // Re-rendering moves the pill's DOM node, which drops focus: restore it after a mouse drag or a cancelled move.
        if (this.type === 'draggable' &&
          this.pillToFocusAfterReorder &&
          this.pillToFocusAfterReorder.value === pill.value) {
          pill.setFocusDragIcon(this.pillToFocusAfterReorder.withFocusRing);
          this.pillToFocusAfterReorder = undefined;
        }
        // Always match the type of each individual pill with the type of the group.
        pill.type = this.type;
        if (this.type === 'single' || this.type === 'multiple') {
          this.updatePill(pill, pillIndex, tabStopIndex);
        }
      });
      this.focusPillAfterRemoval();
    };
    /**
     * Removing a pill destroys the remove icon that had focus. After a keyboard removal, focus moves to the closest pill
     * that can take it: the one that took the removed pill's place or the ones after it, then the ones before it (disabled
     * pills are skipped). With none left, the group itself takes focus, so keyboard users never lose their place.
     */
    this.focusPillAfterRemoval = () => {
      const removedPill = this.pillToFocusAfterRemoval;
      this.pillToFocusAfterRemoval = undefined;
      // The consumer kept the pill, or focus has already moved somewhere else: nothing to restore.
      if (!removedPill || this.pillItems.includes(removedPill.pill))
        return;
      if (document.activeElement && document.activeElement !== document.body)
        return;
      const { index } = removedPill;
      const targetPill = [...this.pillItems.slice(index), ...this.pillItems.slice(0, index).reverse()].find((pill) => !pill.disabled && (pill.removable || this.type === 'draggable'));
      if (!targetPill) {
        this.pillsWrapperRef?.focus();
      }
      else if (targetPill.removable) {
        targetPill.setRemoveIconFocus();
      }
      else {
        targetPill.setFocusDragIcon();
      }
    };
    this.getGroupRole = () => {
      if (this.type === 'single') {
        // Type `single` follows the ARIA design pattern for radio groups: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
        return 'radiogroup';
      }
      else if (this.type === 'multiple') {
        // Type `multiple` follows the ARIA design pattern for checkbox groups: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
        return 'group';
      }
      else {
        // Type `display` and `draggable` follows the ARIA design pattern for list
        return 'list';
      }
    };
    this.handleKeyDown = (event) => {
      if (this.type === 'single') {
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
          event.preventDefault();
          this.focusAndCheckNextPill('right');
        }
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
          event.preventDefault();
          this.focusAndCheckNextPill('left');
        }
      }
      // The group itself can hold focus (e.g. after the last pill is removed): only keys on a pill are handled.
      if (this.type === 'draggable' && this.isPill(event.target)) {
        const isGrabbedPill = this.grabbedPillValue !== undefined && this.isGrabbedPill(event.target);
        // Enter / Space toggles the grab: it grabs the focused pill, or drops it when it is the one already grabbed.
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (isGrabbedPill) {
            this.dropPill(event);
          }
          else {
            this.grabPill(event);
          }
        }
        // Tabbing away drops the pill where it currently is.
        if (event.key === 'Tab' && isGrabbedPill) {
          this.dropPill(event);
        }
        // Escape cancels: the pill is released and moved back to where it was grabbed.
        if (event.key === 'Escape' && isGrabbedPill) {
          event.preventDefault();
          // Escape only cancels the move: it must not also reach document-level listeners, e.g. close a `wpp-modal`.
          event.stopPropagation();
          this.cancelMove(event);
        }
        // Compared with `undefined`: a pill value can be `0` or `''`, which are falsy.
        if (this.grabbedPillValue !== undefined && (event.key === 'ArrowRight' || event.key === 'ArrowDown')) {
          event.preventDefault();
          this.reorderPills(event.target, 'right');
        }
        if (this.grabbedPillValue !== undefined && (event.key === 'ArrowLeft' || event.key === 'ArrowUp')) {
          event.preventDefault();
          this.reorderPills(event.target, 'left');
        }
      }
    };
    this.handleFocusin = (event) => {
      // This event is emitted each time a pill is focused in the group. Event emitted again after the group is blurred.
      if (!this.hasFocus) {
        this.wppFocus.emit(event);
      }
      this.hasFocus = true;
    };
    this.handleFocusout = (event) => {
      if (this.isDragging || this.grabbedPillValue !== undefined)
        return;
      // This event is emitted each time a pill is blurred in the group, so we need to check if new target is still contained within the host.
      if (event.relatedTarget && this.host.contains(event.relatedTarget))
        return;
      if (this.type === 'draggable' && event.target && this.isPill(event.target)) {
        // This covers cases when the pill is grabbed through keyboard and the user clicks outside, so we need to release
        // that pill.
        this.togglePillGrab(event, false);
      }
      this.hasFocus = false;
      this.wppBlur.emit(event);
    };
    // ****** START SPECIFIC TO `single` TYPE ******
    /**
     * This function is called only when the pill group type is `single`.
     * Used to retrieve the index of the pill that is the group's only tab stop: the checked pill, or the first
     * non-disabled pill when no enabled pill is checked (`value` is empty, `null`, matches no pill or a disabled pill).
     * This way the group always stays reachable with the keyboard.
     */
    this.getCurrentIndex = () => {
      const checkedPillIndex = this.pillItems.findIndex((pill) => !pill.disabled && pill.value === this.value);
      return checkedPillIndex !== -1 ? checkedPillIndex : this.getNextIndex(0, 1);
    };
    /**
     * This function is called only when the pill group type is `single`.
     * Used to get the next available pill index, based on the direction. Disabled items are ignored.
     */
    this.getNextIndex = (nextIndex, step) => {
      let found = false;
      let iterations = 0;
      const pillsLength = this.pillItems.length;
      while (!found && iterations < pillsLength) {
        const aux = this.pillItems[((nextIndex % pillsLength) + pillsLength) % pillsLength];
        if (!aux.disabled) {
          found = true;
          return ((nextIndex % pillsLength) + pillsLength) % pillsLength;
        }
        else {
          nextIndex += step;
        }
        iterations++;
      }
      return -1;
    };
    /**
     * This function is called only when the pill group type is `single`.
     * It searches for next non-disabled pill, based on direction, and sets focus to that pill.
     * As for type `single` we follow the accessibility pattern for radio group, we also check the pill.
     */
    this.focusAndCheckNextPill = (direction) => {
      const step = direction === 'right' ? 1 : -1;
      const nextIndex = this.getNextIndex(this.getCurrentIndex() + step, step);
      if (nextIndex === -1)
        return;
      this.value = this.pillItems[nextIndex].value;
      this.pillItems[nextIndex].setFocus();
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    // ****** END SPECIFIC TO `single` TYPE ******
    // ****** SPECIFIC TO `draggable` TYPE ******
    this.handleMouseDown = () => {
      if (this.grabbedPillValue === undefined)
        return;
      // Also clear the grabbed state from the pill that was grabbed through the keyboard.
      const grabbedPill = this.pillItems.find((pill) => pill.value === this.grabbedPillValue);
      if (grabbedPill) {
        this.setPillGrabbed(grabbedPill, false);
      }
      this.grabbedPillValue = undefined;
      this.grabbedPillOriginalIndex = null;
    };
    this.isGrabbedPill = (target) => this.isPill(target) && target.value === this.grabbedPillValue;
    /**
     * Text used to identify a pill in the screen reader announcements: the `label` prop, the slotted text, or the value.
     */
    this.getPillLabel = (pill) => pill.label || pill.textContent?.trim() || String(pill.value ?? '');
    /**
     * This function is called only when type is `draggable`. Grabs the pill, remembers where it was and announces it.
     */
    this.grabPill = (event) => {
      const pillTarget = event.target;
      this.togglePillGrab(event, true);
      this.grabbedPillOriginalIndex = this.pillItems.indexOf(pillTarget);
      this.liveAnnouncement = this._locales.pillGrabbed(this.getPillLabel(pillTarget), this.grabbedPillOriginalIndex + 1, this.pillItems.length);
    };
    /**
     * This function is called only when type is `draggable`. Releases the pill at its current position and announces it.
     */
    this.dropPill = (event) => {
      const pillTarget = event.target;
      const position = this.pillItems.indexOf(pillTarget) + 1;
      this.togglePillGrab(event, false);
      this.liveAnnouncement = this._locales.pillDropped(this.getPillLabel(pillTarget), position, this.pillItems.length);
    };
    /**
     * This function is called only when type is `draggable`. Releases the pill and, if it was moved, asks the consumer
     * to put it back to the position it had when it was grabbed.
     */
    this.cancelMove = (event) => {
      const pillTarget = event.target;
      const currentIndex = this.pillItems.indexOf(pillTarget);
      const originalIndex = this.grabbedPillOriginalIndex ?? currentIndex;
      this.togglePillGrab(event, false);
      if (currentIndex !== -1 && currentIndex !== originalIndex) {
        this.pillToFocusAfterReorder = { value: pillTarget.value, withFocusRing: true };
        this.wppReorderList.emit({ draggedIndex: currentIndex, toIndex: originalIndex });
      }
      this.liveAnnouncement = this._locales.moveCancelled(this.getPillLabel(pillTarget), originalIndex + 1, this.pillItems.length);
    };
    /**
     * This function is called only when type is `draggable` and finds the index of the next pill
     * that will swap places with the pill that is dragged.
     */
    this.getToIndex = (currentIndex, direction) => {
      if (direction === 'left') {
        return currentIndex - 1 < 0 ? this.pillItems.length - 1 : currentIndex - 1;
      }
      return currentIndex + 1 >= this.pillItems.length ? 0 : currentIndex + 1;
    };
    /**
     * This function is called only when type is `draggable` and emits the indexes of the 2 pills that need
     * to get swapped.
     */
    this.reorderPills = (pillItem, direction) => {
      if (!this.isPill(pillItem))
        return;
      const draggedIndex = this.pillItems.findIndex((pill) => pill === pillItem);
      const toIndex = this.getToIndex(draggedIndex, direction);
      this.wppReorderList.emit({ draggedIndex, toIndex });
      this.liveAnnouncement = this._locales.pillMoved(this.getPillLabel(pillItem), toIndex + 1, this.pillItems.length);
    };
    /**
     * This function is called only when the type is `draggable`.
     * Used to keep track of the `value` of the grabbed pill and to add / remove its grabbed state.
     */
    this.togglePillGrab = (event, isGrabbing) => {
      const pillTarget = event.target;
      this.setPillGrabbed(pillTarget, isGrabbing);
      this.grabbedPillValue = isGrabbing ? pillTarget.value : undefined;
      if (!isGrabbing) {
        this.grabbedPillOriginalIndex = null;
      }
    };
    /**
     * This function is called only when the type is `draggable`.
     * Toggles the `data-grabbed` attribute used to style the grabbed pill. The grab itself is conveyed to assistive
     * technology through the live region announcements (`aria-grabbed` is deprecated and was removed in ARIA 1.2).
     */
    this.setPillGrabbed = (pill, isGrabbed) => {
      if (isGrabbed) {
        pill.setAttribute('data-grabbed', '');
      }
      else {
        pill.removeAttribute('data-grabbed');
      }
    };
    this.isPill = (target) => {
      const targetToCheck = target;
      return targetToCheck ? targetToCheck.tagName === transformToVersionedTag('wpp-pill').toUpperCase() : false;
    };
    this.handleDragStart = (event) => {
      if (!this.isPill(event.target))
        return;
      this.isDragging = true;
      this.currentDraggedIndex = this.pillItems.findIndex((pill) => pill === event.target);
    };
    this.handleDragOver = (event) => {
      event.preventDefault();
      if (!this.isPill(event.target) || this.currentDraggedIndex === null)
        return;
      const toIndex = this.pillItems.findIndex((pill) => pill === event.target);
      if (toIndex === -1 || toIndex === this.currentDraggedIndex)
        return;
      // Re-rendering moves the dragged pill's DOM node: focus its drag icon after the re-render so the group does not
      // silently lose focus mid-drag. No focus ring, as this is a mouse interaction.
      this.pillToFocusAfterReorder = { value: this.pillItems[this.currentDraggedIndex].value, withFocusRing: false };
      this.wppReorderList.emit({ draggedIndex: this.currentDraggedIndex, toIndex });
      this.currentDraggedIndex = toIndex;
    };
    this.handleDragEnd = () => {
      this.currentDraggedIndex = null;
      this.isDragging = false;
    };
    this.hostCssClasses = () => ({
      'wpp-pill-group': true,
    });
    this.liveAnnouncement = '';
    this.name = undefined;
    this.size = 'm';
    this.value = undefined;
    this.type = 'single';
    this.required = false;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.ariaProps = {};
    this.locales = {};
  }
  handleClick(event) {
    if (this.type === 'display' || this.type === 'draggable')
      return;
    const isMultiple = this.type === 'multiple';
    if (isMultiple) {
      const currentValue = this.value || [];
      this.value = event.detail.checked
        ? [...currentValue, event.detail.value]
        : currentValue.filter(element => element !== event.detail.value);
    }
    else {
      this.value = event.detail.value;
    }
    this.wppChange.emit({
      value: this.value,
      name: this.name,
    });
  }
  handleClose(event) {
    // Only keyboard removals move focus: after a mouse removal it would paint a keyboard focus ring on a pointer
    // interaction (same behaviour as `wpp-autocomplete`).
    if (event.detail?.type !== 'keydown')
      return;
    const pill = event.target;
    this.pillToFocusAfterRemoval = { pill, index: this.pillItems.indexOf(pill) };
  }
  onValueChange() {
    this.setActivePill();
  }
  componentWillLoad() {
    this.pillItems = Array.from(this.host.querySelectorAll(transformToVersionedTag('wpp-pill')));
  }
  componentDidLoad() {
    this.setActivePill();
    // This is needed for cases when navigation to the pill is done via keyboard for the `draggable` type, the
    // pill is in `active` state and the user clicks outside of the group. We need to clear state of the pill.
    if (this.type === 'draggable') {
      document.addEventListener('mousedown', this.handleMouseDown);
    }
  }
  disconnectedCallback() {
    if (this.type === 'draggable') {
      document.removeEventListener('mousedown', this.handleMouseDown);
    }
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    const labelId = 'pill-group-label';
    // The visible label lives in this shadow root, so its id resolves; `ariaProps.label` is the fallback without one.
    const pillGroupLabelledBy = this.labelConfig?.text ? labelId : undefined;
    const pillGroupLabel = pillGroupLabelledBy ? undefined : (this.ariaProps?.label ?? undefined);
    const pillGroupRoleDescription = this.type === 'draggable' ? (this.ariaProps?.roleDescription ?? this._locales.sortableList) : undefined;
    // `aria-required` is only supported on roles such as `radiogroup`; on the host (no role) it would not be announced.
    const pillGroupRequired = this.type === 'single' ? (this.required ? 'true' : 'false') : undefined;
    return (h(Host, { onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, class: this.hostCssClasses(), exportparts: "label, content, inner" }, this.labelConfig?.text && (h("wpp-label-v4-7-0", { class: "label", optional: !this.required, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, labelId: labelId, part: "label" })), h("div", { role: this.getGroupRole(), "aria-label": pillGroupLabel, "aria-labelledby": pillGroupLabelledBy, "aria-roledescription": pillGroupRoleDescription, "aria-required": pillGroupRequired, onKeyDown: this.handleKeyDown, ref: (el) => (this.pillsWrapperRef = el),
      // Focusable by script only: takes focus when no pill is left to take it after a keyboard removal.
      tabIndex: this.type === 'display' || this.type === 'draggable' ? -1 : undefined, class: "pills-wrapper", part: "content", ...(this.type === 'draggable'
        ? { onDragStart: this.handleDragStart, onDragOver: this.handleDragOver, onDragEnd: this.handleDragEnd }
        : {}) }, h("slot", { part: "inner", onSlotchange: this.handleSlotChange })), this.type === 'draggable' && (h("div", { class: "sr-only", "aria-live": "polite", "aria-atomic": "true" }, this.liveAnnouncement))));
  }
  static get registryIs() { return "wpp-pill-group-v4-7-0"; }
  get host() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
  static get style() { return wppPillGroupCss; }
}, [1, "wpp-pill-group", "wpp-pill-group-v4-7-0", {
    "name": [1],
    "size": [1],
    "value": [1032],
    "type": [1],
    "required": [516],
    "labelConfig": [1040],
    "labelTooltipConfig": [16],
    "ariaProps": [16],
    "locales": [16],
    "liveAnnouncement": [32]
  }, [[2, "wppClick", "handleClick"], [2, "wppClose", "handleClose"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-pill-group-v4-7-0", "wpp-icon-error-v4-7-0", "wpp-icon-warning-v4-7-0", "wpp-internal-label-v4-7-0", "wpp-internal-tooltip-v4-7-0", "wpp-label-v4-7-0", "wpp-tooltip-v4-7-0", "wpp-typography-v4-7-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-pill-group-v4-7-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppPillGroup);
      }
      break;
    case "wpp-icon-error-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-warning-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-label-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-label-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-7-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppPillGroup as W, defineCustomElement as d };
