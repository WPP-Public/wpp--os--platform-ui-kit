import { r as registerInstance, h, c as createEvent, H as Host, g as getElement } from './index-a0877c3d.js';
import { W as WppIcon } from './WppIcon-bb52ef53.js';
import { k as transformToVersionedTag, z as mergeLocales } from './utils-711e1d1b.js';
import './consts-744c144f.js';

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFastForward = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-fast-forward", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.9028 3.85156C12.5486 3.38603 11.7782 3.609 11.7778 4.25684V15.7432C11.7782 16.3916 12.549 16.6141 12.9028 16.1475L17.2651 10.3945C17.4456 10.1565 17.445 9.82167 17.2642 9.58398L12.9028 3.85156ZM5.7251 3.85156C5.37084 3.38603 4.60048 3.609 4.6001 4.25684V15.7432C4.60047 16.3916 5.37227 16.6141 5.72607 16.1475L10.0884 10.3945C10.2687 10.1565 10.2681 9.82161 10.0874 9.58398L5.7251 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get registryIs() { return "wpp-icon-fast-forward-v4-7-0"; }
};
WppIconFastForward.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPause = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pause", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.125 4.15C3.125 3.23873 3.86373 2.5 4.775 2.5H7.475C8.38627 2.5 9.125 3.23873 9.125 4.15V15.85C9.125 16.7613 8.38627 17.5 7.475 17.5H4.775C3.86373 17.5 3.125 16.7613 3.125 15.85V4.15ZM4.775 4C4.69216 4 4.625 4.06716 4.625 4.15V15.85C4.625 15.9328 4.69216 16 4.775 16H7.475C7.55784 16 7.625 15.9328 7.625 15.85V4.15C7.625 4.06716 7.55784 4 7.475 4H4.775Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.875 4.15C10.875 3.23873 11.6137 2.5 12.525 2.5H15.225C16.1363 2.5 16.875 3.23873 16.875 4.15V15.85C16.875 16.7613 16.1363 17.5 15.225 17.5H12.525C11.6137 17.5 10.875 16.7613 10.875 15.85V4.15ZM12.525 4C12.4422 4 12.375 4.06716 12.375 4.15V15.85C12.375 15.9328 12.4422 16 12.525 16H15.225C15.3078 16 15.375 15.9328 15.375 15.85V4.15C15.375 4.06716 15.3078 4 15.225 4H12.525Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pause-v4-7-0"; }
};
WppIconPause.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRewind = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-rewind", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.09766 3.85156C7.45192 3.38603 8.22228 3.609 8.22266 4.25684V15.7432C8.22228 16.3916 7.45146 16.6141 7.09766 16.1475L2.73535 10.3945C2.55491 10.1565 2.55547 9.82167 2.73633 9.58398L7.09766 3.85156ZM14.2754 3.85156C14.6296 3.38603 15.4 3.609 15.4004 4.25684V15.7432C15.4 16.3916 14.6282 16.6141 14.2744 16.1475L9.91211 10.3945C9.73183 10.1565 9.73239 9.82161 9.91309 9.58398L14.2754 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get registryIs() { return "wpp-icon-rewind-v4-7-0"; }
};
WppIconRewind.style = wppIconCss;

const LOCALES_DEFAULTS = {
  sortableList: 'Sortable list',
  pillGrabbed: (label, position, total) => `${label} grabbed, position ${position} of ${total}. Use the arrow keys to move it, Enter or Space to drop it, Escape to cancel.`,
  pillMoved: (label, position, total) => `${label} moved to position ${position} of ${total}.`,
  pillDropped: (label, position, total) => `${label} dropped at position ${position} of ${total}.`,
  moveCancelled: (label, position, total) => `Move cancelled. ${label} returned to position ${position} of ${total}.`,
};

const wppPillGroupCss = ":host{--pill-group-item-margin:var(--wpp-pill-group-item-margin, 0 8px 0 0);--pill-group-label-margin:var(--wpp-pill-group-label-margin, 0 0 8px 0);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column}:host .label{margin:var(--pill-group-label-margin)}:host .label .wpp-internal-label::part(info-wrapper){cursor:text}:host .pills-wrapper{display:-ms-inline-flexbox;display:inline-flex;outline:none}:host .pills-wrapper:focus-visible{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host .pills-wrapper ::slotted(.wpp-pill:not(:last-child)){margin:var(--pill-group-item-margin)}:host .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);border:0;white-space:nowrap}";

const WppPillGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["onValueChange"]
  }; }
};
WppPillGroup.style = wppPillGroupCss;

export { WppIconFastForward as wpp_icon_fast_forward, WppIconPause as wpp_icon_pause, WppIconRewind as wpp_icon_rewind, WppPillGroup as wpp_pill_group };
