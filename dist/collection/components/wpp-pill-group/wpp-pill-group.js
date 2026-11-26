import { h, Host } from '@stencil/core';
import { mergeLocales, transformToVersionedTag } from '../../utils/utils';
import { LOCALES_DEFAULTS } from './const';
/**
 * @slot - Can contain only the `wpp-pill` components that are displayed in `pill-group`. It can be only <wpp-pill>. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part content - content wrapper element
 * @part inner - Content slot element
 */
export class WppPillGroup {
  constructor() {
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
  static get is() { return "wpp-pill-group"; }
  static get registryIs() { return "wpp-pill-group-v4-7-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-pill-group.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-pill-group.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the pill group name."
        },
        "attribute": "name",
        "reflect": false
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
              "path": "../wpp-pill/types",
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
          "text": "Defines the pill group size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "PillGroupValue",
          "resolved": "PillValue[] | number | string | undefined",
          "references": {
            "PillGroupValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupValue"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the pill group value."
        },
        "attribute": "value",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "PillType",
          "resolved": "\"display\" | \"draggable\" | \"multiple\" | \"single\"",
          "references": {
            "PillType": {
              "location": "import",
              "path": "../wpp-pill/types",
              "id": "src/components/wpp-pill/types.ts::PillType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the type of the pill group."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'single'"
      },
      "required": {
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
          "text": "If the pill group is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "PillGroupLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "PillGroupLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupLabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WppPillGroupAriaProps",
          "resolved": "{ label?: string | undefined; roleDescription?: string | undefined; }",
          "references": {
            "WppPillGroupAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::WppPillGroupAriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the pill group `aria-` props. `label` names the group when it has no visible label (`labelConfig`)."
        },
        "defaultValue": "{}"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<PillGroupLocaleInterface>",
          "resolved": "{ sortableList?: string | undefined; pillGrabbed?: PillGroupAnnouncement | undefined; pillMoved?: PillGroupAnnouncement | undefined; pillDropped?: PillGroupAnnouncement | undefined; moveCancelled?: PillGroupAnnouncement | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "PillGroupLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for the pill group. Holds the `aria-roledescription` of a `draggable` group and the messages\nannounced to screen readers while reordering pills with the keyboard. Partial overrides are merged with the\nEnglish defaults."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "liveAnnouncement": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the pill group value changes."
        },
        "complexType": {
          "original": "PillGroupChangeEvent",
          "resolved": "BaseFormControlEventDetail<PillGroupValue> & { name?: string | undefined; }",
          "references": {
            "PillGroupChangeEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupChangeEvent"
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
          "text": "Emitted when the pill group receives focus"
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
          "text": "Emitted when the pill group loses focus"
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
        "method": "wppReorderList",
        "name": "wppReorderList",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when two pills need to swap places, either through native drag and drop or through keyboard reordering.\nThe consumer is expected to move the item at `draggedIndex` to `toIndex`."
        },
        "complexType": {
          "original": "PillGroupReorderListEvent",
          "resolved": "{ draggedIndex: number; toIndex: number; }",
          "references": {
            "PillGroupReorderListEvent": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-pill-group/types.ts::PillGroupReorderListEvent"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onValueChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClick",
        "method": "handleClick",
        "target": undefined,
        "capture": true,
        "passive": false
      }, {
        "name": "wppClose",
        "method": "handleClose",
        "target": undefined,
        "capture": true,
        "passive": false
      }];
  }
}
