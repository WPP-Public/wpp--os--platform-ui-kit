import { Host, h } from '@stencil/core';
import { menuListConfig } from '../../common/menuListConfig';
import { Z_INDEX } from '../../common/consts';
import { activateOnEnterOrSpace, getHighestContainerInDOM, mergeLocales, uniquePortalId } from '../../utils/utils';
import { FOCUS_TYPE } from '../../types/common';
import { DEFAULT_CHECKED_TIME_VALUES, DEFAULT_WIDTH_VALUE, HOURS, PLACEHOLDER, TIME_PICKER_LOCALES_DEFAULTS, TOP_PADDING, isValidHour, isValidMinutes, } from './config';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
export class WppTimePicker {
  constructor() {
    this.hasSelectedMinutes = false;
    // Instance-unique so the portaled (light-DOM) dropdown never collides with another
    // time-picker's — or another CL version's — popup. See uniquePortalId.
    this.popupId = uniquePortalId('wpp-time-picker-popup');
    // The input used to carry a hard-coded id while the label pointed its `for` at `name`, so
    // the two never matched and the label was left dangling (axe: "Form label must be associated
    // with a content"). A shared instance-unique id fixes the association and stops several
    // pickers on one page from all claiming the same id.
    this.inputId = uniquePortalId('wpp-time-picker-input');
    // Guards the setTimeout(0) callbacks (focus + scroll) that outlive a fast open→unmount.
    this.isDestroyed = false;
    // Whether the selection currently being handled came from Enter/Space rather than a click.
    this.selectionFromKeyboard = false;
    // Whether closing the dropdown is about to take focus with it, so it can be handed back.
    this.restoreFocusOnHidden = false;
    this.hasChangedHours = false;
    this.hasChangedMinutes = false;
    this.hasClearedValue = false;
    this.themeSubscription = themeSubscriptionController(() => this.portalRef);
    this.highlightItem = () => {
      const [hoursValue, minutesValue] = this.value.split(':');
      const hoursIndex = HOURS.findIndex((hourItem) => hourItem === hoursValue);
      const minutesIndex = this.generatedMinutes.findIndex((minutesItem) => minutesItem === minutesValue);
      this.checkedTimeValues = {
        hoursIndex,
        minutesIndex,
      };
      this.rovingTimeValues = {
        hoursIndex: hoursIndex >= 0 ? hoursIndex : 0,
        minutesIndex: minutesIndex >= 0 ? minutesIndex : 0,
      };
    };
    this.scrollIntoView = () => {
      const [hoursValue, minutesValue] = this.value.split(':');
      const hoursEl = this.portalRef?.querySelector(`#hour-${hoursValue}`);
      const minutesEl = this.portalRef?.querySelector(`#minutes-${minutesValue}`);
      if (hoursEl && this.hoursSectionRef) {
        this.hoursSectionRef.scrollTop = hoursEl.offsetTop - TOP_PADDING;
      }
      if (minutesEl && this.minutesSectionRef) {
        this.minutesSectionRef.scrollTop = minutesEl.offsetTop - TOP_PADDING;
      }
    };
    this.isValidTimeValue = (timeValue) => {
      const [hours, minutes] = timeValue.split(':');
      if (hours === 'hh' || minutes === 'mm')
        return;
      if (isValidHour(hours) && isValidMinutes(minutes)) {
        this.value = `${hours}:${this.roundToNearestInterval(minutes)}`;
        return true;
      }
      return false;
    };
    this.setErrorMessage = (message) => {
      this.message = message;
      this.messageType = message ? 'error' : undefined;
    };
    this.createTippyInstance = () => {
      if (!this.anchorRef)
        return;
      this.tippyInstance = menuListConfig({
        anchor: this.anchorRef,
        content: this.portalRef,
        maxWidth: 'none',
        hideOnClick: false,
        zIndex: Z_INDEX.TIME_PICKER,
        trigger: 'click',
        placement: 'bottom-start',
        offset: [0, 4],
        // Automatically attach dropdown to highest container in DOM such that there will
        // be no clipping issues.
        appendTo: () => getHighestContainerInDOM(),
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['top-start'],
              },
            },
          ],
        },
        ...this.dropdownConfig,
        onHide: (instance) => {
          this.focusedColumn = null;
          this.selectionFromKeyboard = false;
          // The popup takes whatever inside it holds focus down with it, so picking a time with
          // the mouse dropped focus on `<body>` while the field still drew itself as focused.
          // Decide here, while that element is still focused, and act in `onHidden` — restoring
          // any earlier than that and the teardown blurs the input straight back off again. When
          // the dropdown is closing *because* focus left the component, the new target is already
          // outside the portal, so this correctly leaves it alone.
          this.restoreFocusOnHidden = !!this.portalRef?.contains(document.activeElement);
          if (this.value === PLACEHOLDER) {
            // If true, then no changes were made in the time picker.
            // Reverting value back to empty string to display placeholder.
            this.value = '';
          }
          if (this.inputRef) {
            if (this.inputRef.value !== this.value) {
              this.updateValueOnHide(this.inputRef.value);
            }
            this.inputRef.value = this.value;
          }
          // When dropdown hides, emit values of time picker.
          const [hours, minutes] = this.value.split(':');
          this.hasSelectedMinutes = false;
          this.hasChangedHours = false;
          this.hasChangedMinutes = false;
          this.wppChange.emit({
            timeFormat: this.value,
            hours: hours || '',
            minutes: minutes || '',
            ...(this.name ? { name: this.name } : {}),
          });
          if (this.dropdownConfig.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onShow: (instance) => {
          if (!this.host || this.disabled)
            return false;
          this.isDropdownOpen = true;
          // The pointer focus border tracks the dropdown being open (see `onHidden`), and the field
          // can be reopened without focus ever moving — so it is re-applied here rather than in
          // `onFocus`, which only runs on the way into the component. A keyboard user keeps TAB so
          // their focus ring is not swapped for the pointer border.
          if (this.focusType !== FOCUS_TYPE.TAB) {
            this.focusType = FOCUS_TYPE.MOUSE;
          }
          if (this.host.clientWidth < 150) {
            instance.popper.style.width = '150px';
          }
          else {
            instance.popper.style.width = `${this.host.clientWidth}px`;
          }
          // When dropdown opens, highlight text for hours
          this.selectTextInInput('hours');
          this.highlightItem();
          if (this.value !== '' && this.value !== PLACEHOLDER) {
            this.scrollTimer = setTimeout(() => {
              if (!this.isDestroyed)
                this.scrollIntoView();
            }, 0);
          }
          if (this.dropdownConfig.onShow) {
            return this.dropdownConfig.onShow(instance);
          }
        },
        onClickOutside: (instance, event) => {
          if (event.target === this.host) {
            // When clicking elements from time picker component, stop the propagation
            // of the event. The dropdown does not need to hide.
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          this.tippyInstance.hide();
          if (this.dropdownConfig.onClickOutside) {
            this.dropdownConfig.onClickOutside(instance, event);
          }
        },
        onHidden: () => {
          // `isInComponent` deliberately stays put: closing the dropdown does not mean focus
          // has left (Escape puts it back on the input). onFocus/onBlur own that flag.
          this.isDropdownOpen = false;
          if (this.restoreFocusOnHidden) {
            this.restoreFocusOnHidden = false;
            this.inputRef?.focus();
          }
          // `focus` is the pointer-interaction border, not the keyboard ring (`tab-focus` is), so
          // it belongs to the field only while the dropdown it opened is up. Once a time has been
          // picked the field is done being interacted with and reads as idle again, the same way a
          // mouse-focused control shows no focus indicator. Focus itself deliberately stays on the
          // input: a keyboard user carries on from the field, and a later blur stays truthful.
          // This replaces the `inputRef.blur()` that `onHide` used to do for the same effect —
          // that dropped the keyboard modality on the floor (so the ring came back as the pointer
          // border) and fired a spurious wppBlur/wppFocus pair at consumers on every close.
          if (this.focusType === FOCUS_TYPE.MOUSE) {
            this.focusType = FOCUS_TYPE.NONE;
          }
        },
      });
    };
    this.updateValueOnHide = (inputValue) => {
      if (this.value === '')
        return;
      const [inputHours, inputMinutes] = inputValue.split(':');
      const [valueHours, valueMinutes] = this.value.split(':');
      if (inputHours.length === 1) {
        this.value = `0${inputHours}:${valueMinutes}`;
      }
      if (inputMinutes.length === 1) {
        this.value = `${valueHours}:${this.roundToNearestInterval(inputMinutes)}`;
      }
    };
    // Clears value of time picker
    this.handleClickCrossIcon = (event) => {
      event.stopPropagation();
      if (this.disabled)
        return;
      if (this.tippyInstance?.state?.isShown) {
        this.value = PLACEHOLDER;
        this.hasClearedValue = true;
        this.selectTextInInput('hours');
      }
      else {
        this.value = '';
      }
      this.setErrorMessage(undefined);
      this.previousInputValue = this.value;
      this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES;
      this.wppClear.emit({ timeFormat: '', hours: '', minutes: '', ...(this.name ? { name: this.name } : {}) });
    };
    this.handleClickListItem = (value, type) => {
      if (!this.inputRef)
        return;
      const [hours, minutes] = this.value.split(':');
      this.hasClearedValue = false;
      if (type === 'hour') {
        this.value = `${value}:${minutes || 'mm'}`;
        // Keyboard flow: choosing an hour always hands over to the minutes column. It never
        // closes the dropdown and never puts focus back on the input, so Enter/Space on an hour
        // behaves the same whether or not the minutes are already set. The pointer flow below
        // keeps its own behaviour, where a complete value means the picker is done.
        if (this.selectionFromKeyboard) {
          this.focusColumnAfterSelection('minutes');
          return;
        }
        if (this.hasSelectedMinutes) {
          this.tippyInstance?.hide();
        }
        else {
          // After selecting hours, highlight text for minutes
          this.selectTextInInput('minutes');
        }
      }
      else {
        this.value = `${hours || 'hh'}:${value}`;
        this.hasSelectedMinutes = true;
        if (this.selectionFromKeyboard) {
          if (isValidHour(hours)) {
            this.closeAndReturnFocusToInput();
          }
          else {
            // No hour picked yet, so send the highlight to the hours column instead of closing on
            // an incomplete value.
            this.focusColumnAfterSelection('hours');
          }
          return;
        }
        const inputHours = this.inputRef.value.split(':')[0];
        if (inputHours && inputHours.length === 1) {
          this.value = `0${inputHours}:${value}`;
          this.tippyInstance?.hide();
          return;
        }
        if (this.inputRef?.value.split(':'))
          if (!isValidHour(hours)) {
            this.selectTextInInput('hours');
          }
          else {
            this.tippyInstance?.hide();
          }
      }
    };
    /**
     * Close the dropdown and hand focus back to the text input. The focused item is unmounted with
     * the dropdown, so without this focus falls back to `<body>` and the keyboard user is stranded.
     */
    this.closeAndReturnFocusToInput = () => {
      clearTimeout(this.focusItemTimer);
      this.focusedColumn = null;
      this.tippyInstance?.hide();
      this.inputRef?.focus();
    };
    /**
     * Move the keyboard highlight into `column` once the dropdown has settled. The list re-renders
     * on the value change that triggered this, so the target item only exists on the next task.
     */
    this.focusColumnAfterSelection = (column) => {
      clearTimeout(this.focusItemTimer);
      this.focusItemTimer = setTimeout(() => {
        if (!this.isDestroyed)
          this.focusColumnItem(column, this.getColumnEntryIndex(column));
      }, 0);
    };
    this.selectTextInInput = (text) => {
      // The input element needs to be focused before selection.
      this.inputRef?.focus();
      setTimeout(() => {
        this.inputRef?.setSelectionRange(text === 'hours' ? 0 : 3, text === 'hours' ? 2 : 5);
      }, 0);
    };
    this.generateMinutes = () => {
      this.generatedMinutes.length = 0;
      for (let i = 0; i * this.minutesInterval < 60; i += 1) {
        // This also adds "0" to the first 9 digits.
        this.generatedMinutes.push(String(i * this.minutesInterval).padStart(2, '0'));
      }
    };
    this.onUpdateInput = (event) => {
      if (!this.inputRef)
        return;
      this.setErrorMessage(undefined);
      const inputValue = event.target.value;
      if (inputValue === '' || inputValue === ':') {
        this.value = '';
        this.inputRef.value = '';
        this.clearCheckedValue();
        this.previousInputValue = '';
        this.hasClearedValue = true;
        return;
      }
      if (inputValue.length === 1 && this.previousInputValue.length >= 3) {
        this.hasClearedValue = true;
        return;
      }
      if (this.hasClearedValue) {
        if (inputValue.length === 2) {
          const newHourValue = inputValue.includes(':') ? `0${inputValue.split(':')[0]}` : inputValue;
          this.handleHourChange(inputValue, newHourValue, '');
        }
      }
      else {
        const shiftFocusToMinutes = inputValue.split(':').length - 1 >= 2;
        if (shiftFocusToMinutes) {
          const [hours, minutes] = this.previousInputValue.split(':');
          this.handleHourChange(this.previousInputValue, hours.length === 1 ? `0${hours}` : hours, minutes);
        }
        else {
          const [inputHours, inputMinutes] = inputValue.split(':');
          const [valueHours, valueMinutes] = this.value.split(':');
          if (inputHours !== valueHours || this.hasChangedHours) {
            if (inputHours.length < 2) {
              this.hasChangedHours = true;
              this.clearCheckedValue('hours');
            }
            else {
              this.handleHourChange(inputValue, inputHours, valueMinutes);
            }
          }
          if (inputMinutes !== valueMinutes || this.hasChangedMinutes) {
            if (!inputMinutes || inputMinutes.length < 2) {
              this.hasChangedMinutes = true;
              this.clearCheckedValue('minutes');
            }
            else {
              this.handleMinuteChange(valueHours, inputMinutes);
            }
          }
        }
      }
      this.previousInputValue = inputValue;
    };
    this.handleHourChange = (inputValue, newHourValue, valueMinutes) => {
      if (!this.inputRef)
        return;
      this.value = `${isValidHour(newHourValue) ? newHourValue : '23'}:${inputValue.length === 2 ? 'mm' : valueMinutes || 'mm'}`;
      this.inputRef.value = this.value;
      this.hasChangedHours = false;
      this.highlightItem();
      this.scrollIntoView();
      if (this.hasSelectedMinutes) {
        this.tippyInstance?.hide();
      }
      else {
        this.selectTextInInput('minutes');
      }
      this.hasClearedValue = false;
    };
    this.handleMinuteChange = (valueHours, inputMinutes) => {
      if (!this.inputRef)
        return;
      this.value = `${valueHours || 'hh'}:${isValidMinutes(inputMinutes)
        ? this.roundToNearestInterval(inputMinutes)
        : this.generatedMinutes[this.generatedMinutes.length - 1]}`;
      this.inputRef.value = this.value;
      this.hasSelectedMinutes = true;
      this.hasChangedMinutes = false;
      this.highlightItem();
      this.scrollIntoView();
      if (isValidHour(valueHours)) {
        this.tippyInstance?.hide();
      }
      else {
        this.selectTextInInput('hours');
      }
    };
    this.onPaste = (event) => {
      event.preventDefault();
      const pastedText = event.clipboardData?.getData('text');
      if (!pastedText)
        return;
      const hasSemiColon = pastedText.includes(':');
      if ((pastedText.length === 4 && !hasSemiColon) || (pastedText.length === 5 && hasSemiColon)) {
        const formattedPastedText = pastedText.length === 4 ? `${pastedText.slice(0, 2)}:${pastedText.slice(2)}` : pastedText;
        if (!this.isValidTimeValue(formattedPastedText)) {
          this.clearCheckedValue();
          this.tippyInstance?.hide();
          this.inputRef?.blur();
          this.value = pastedText;
        }
        else {
          this.value = formattedPastedText;
        }
      }
      else {
        this.setErrorMessage(`The value provided: ${pastedText}, is not a valid time value!`);
      }
    };
    this.clearCheckedValue = (type) => {
      if (type !== 'hours') {
        this.hasSelectedMinutes = false;
      }
      if (!type) {
        this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES;
        return;
      }
      if (type === 'hours') {
        this.checkedTimeValues = {
          ...this.checkedTimeValues,
          hoursIndex: -1,
        };
      }
      else {
        this.checkedTimeValues = {
          ...this.checkedTimeValues,
          minutesIndex: -1,
        };
      }
    };
    this.roundToNearestInterval = (minutes) => {
      // Rounds to minutesInterval property. Also
      const num = parseInt(minutes, 10);
      let rounded = Math.round(num / this.minutesInterval) * this.minutesInterval;
      if (rounded > 59)
        rounded = 60 - this.minutesInterval;
      return rounded.toString().padStart(2, '0');
    };
    this.onKeyPress = (event) => {
      // This blocks non-digit characters and onInput will not be called.
      if (!/[0-9:]/.test(event.key)) {
        event.preventDefault();
      }
    };
    /**
     * Focus legitimately moves between the text input, the clear ("x") control and the
     * portaled dropdown items, and all of those still count as "inside" the component.
     * `relatedTarget` is retargeted to the host element for anything in our shadow root, and the
     * dropdown lives in the light DOM (tippy portal), so both cases are covered here.
     */
    this.isFocusStillInside = (nextTarget) => {
      const node = nextTarget;
      if (!node)
        return false;
      return node === this.host || this.host.contains(node) || !!this.portalRef?.contains(node);
    };
    this.onFocus = (event) => {
      // Track the text input's own focus regardless of the component-level guard
      // below, so the anchor focus ring follows the input and drops the moment
      // focus moves into the dropdown items or onto the clear ("x") control.
      this.isInputFocused = true;
      if (this.isInComponent)
        return;
      this.isInComponent = true;
      this.focusType = FOCUS_TYPE.MOUSE;
      if (this.value === '') {
        this.value = PLACEHOLDER;
        this.previousInputValue = PLACEHOLDER;
      }
      // Open on focus, so keyboard users reach the dropdown by tabbing to the field —
      // it used to only respond to a mouse click. Mirrors wpp-datepicker.
      if (!this.disabled && !this.isDropdownOpen) {
        this.tippyInstance?.show();
      }
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.isInputFocused = false;
      if (this.isFocusStillInside(event?.relatedTarget ?? null))
        return;
      this.isInComponent = false;
      this.focusType = FOCUS_TYPE.NONE;
      // Focus turns an empty input into the "--:--" edit mask; leaving without picking a
      // time has to put the placeholder back, otherwise the field reads as still active
      // after focus has moved on to another time picker.
      if (this.value === PLACEHOLDER) {
        this.value = '';
      }
      this.tippyInstance?.hide();
      this.wppBlur.emit();
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab') {
        this.focusType = FOCUS_TYPE.TAB;
      }
    };
    this.onKeyDown = (event) => {
      // Typing re-engages a field that went idle after a pointer pick, so the caret the idle state
      // hides comes back for the character about to be entered. A keyboard user is already TAB, so
      // this never swaps their focus ring for the pointer border.
      if (this.focusType === FOCUS_TYPE.NONE) {
        this.focusType = FOCUS_TYPE.MOUSE;
      }
      if (event.key === 'Escape' && this.isDropdownOpen) {
        event.preventDefault();
        this.tippyInstance.hide();
        this.inputRef?.focus();
        return;
      }
      // Enter and Space toggle the dropdown from the input, per the combobox pattern. They stay
      // on the input rather than diving into the columns — ArrowDown/ArrowUp below do that.
      // Space is safe to claim here because the field only accepts digits and ':' (see
      // `onKeyPress`), so it never had a character to type.
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (this.isDropdownOpen) {
          // `onHide` blurs the field on the way out, but the user is still standing on it, so put
          // focus back the same way Escape does rather than dropping it on `<body>`.
          this.closeAndReturnFocusToInput();
        }
        else {
          this.tippyInstance?.show();
        }
        return;
      }
      // ArrowDown/ArrowUp open the dropdown (if needed) and move focus into the
      // hours column so the time can be picked entirely from the keyboard.
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!this.isDropdownOpen) {
          this.tippyInstance?.show();
        }
        const hoursIndex = this.checkedTimeValues.hoursIndex >= 0 ? this.checkedTimeValues.hoursIndex : 0;
        this.focusItemTimer = setTimeout(() => {
          if (!this.isDestroyed)
            this.focusColumnItem('hours', hoursIndex);
        }, 0);
      }
    };
    this.getColumnItems = (column) => {
      const section = column === 'hours' ? this.hoursSectionRef : this.minutesSectionRef;
      return section ? Array.from(section.querySelectorAll('.wpp-list-item')) : [];
    };
    this.focusColumnItem = (column, index) => {
      const items = this.getColumnItems(column);
      if (!items.length)
        return;
      const clampedIndex = Math.max(0, Math.min(index, items.length - 1));
      const item = items[clampedIndex];
      this.rovingTimeValues = {
        ...this.rovingTimeValues,
        [column === 'hours' ? 'hoursIndex' : 'minutesIndex']: clampedIndex,
      };
      // Reaching an item this way means the keyboard owns the highlight, which is what tells
      // `handleClickListItem` to advance to the next column instead of taking the pointer path.
      this.selectionFromKeyboard = true;
      // Mirror the design-system keyboard state declaratively: focusedColumn + the roving
      // index render the `tab-focus` highlight (blue ring + hover-like highlight) on exactly
      // this item, matching what a mouse hover would show. No imperative classList mutation.
      this.focusedColumn = column;
      // `focus()` scrolls on its own, and Chromium centres an element that is fully outside the
      // scrollport: a one-item arrow step jumped ~200px and parked the item mid-list. Suppress
      // that and scroll once, minimally. `.section` reserves `scroll-padding-block` so landing on
      // the first or last visible item does not clip the focus ring.
      item.focus({ preventScroll: true });
      item.scrollIntoView({ block: 'nearest' });
    };
    /**
     * Index the keyboard should land on when it enters a column: the selected value if there is
     * one, else wherever the roving index last sat, else the first item. Crossing columns used to
     * carry the source column's index over, so ArrowRight from hour `07` landed on the 8th minute
     * (clamped to `45`) instead of the selected one.
     */
    this.getColumnEntryIndex = (column) => {
      const key = column === 'hours' ? 'hoursIndex' : 'minutesIndex';
      const checkedIndex = this.checkedTimeValues[key];
      return checkedIndex >= 0 ? checkedIndex : Math.max(this.rovingTimeValues[key], 0);
    };
    this.getFocusedPosition = (event) => {
      const target = event.target?.closest('.wpp-list-item');
      if (!target)
        return null;
      const column = target.closest('.hours.section')
        ? 'hours'
        : target.closest('.minutes.section')
          ? 'minutes'
          : null;
      if (!column)
        return null;
      return { column, index: this.getColumnItems(column).indexOf(target) };
    };
    /**
     * `wpp-list-item` handles Enter/Space itself and emits `wppChangeListItem`, so that is the one
     * selection path — and it gives no clue about which input device drove it. A pointer selection
     * always fires `pointerdown` on the portal first, so clearing the flag here is enough to tell
     * the two apart; `focusColumnItem` sets it whenever the keyboard moves the highlight.
     */
    this.onPortalPointerDown = () => {
      this.selectionFromKeyboard = false;
    };
    /**
     * Keep the text input focused when the pointer lands on the dropdown's own chrome rather than
     * on an option — that means the scroll container itself, i.e. its scrollbar or padding gutter.
     * Letting focus move there blurs the input with a null `relatedTarget`, which reads as "focus
     * left the component" and closed the dropdown mid scroll-drag. Options are deliberately
     * excluded so a click can still hand them focus and move the roving highlight; preventing the
     * default here does not stop the scrollbar itself from working.
     */
    this.onPortalMouseDown = (event) => {
      if (!event.target?.closest('.wpp-list-item')) {
        event.preventDefault();
      }
    };
    this.onPortalKeyDown = (event) => {
      const position = this.getFocusedPosition(event);
      switch (event.key) {
        case 'ArrowDown':
          if (!position)
            return;
          event.preventDefault();
          this.focusColumnItem(position.column, position.index + 1);
          break;
        case 'ArrowUp':
          if (!position)
            return;
          event.preventDefault();
          this.focusColumnItem(position.column, position.index - 1);
          break;
        case 'ArrowRight':
          if (position?.column === 'hours') {
            event.preventDefault();
            this.focusColumnItem('minutes', this.getColumnEntryIndex('minutes'));
          }
          break;
        case 'ArrowLeft':
          if (position?.column === 'minutes') {
            event.preventDefault();
            this.focusColumnItem('hours', this.getColumnEntryIndex('hours'));
          }
          break;
        case 'Home':
          if (!position)
            return;
          event.preventDefault();
          this.focusColumnItem(position.column, 0);
          break;
        case 'End':
          if (!position)
            return;
          event.preventDefault();
          this.focusColumnItem(position.column, this.getColumnItems(position.column).length - 1);
          break;
        case 'Escape':
        case 'Tab':
          event.preventDefault();
          this.closeAndReturnFocusToInput();
          break;
      }
    };
    this.getAnchorCssClasses = () => {
      // The blue focus ring (tab-focus) is only shown while the text input itself
      // holds keyboard focus. As soon as focus moves into the dropdown items or
      // onto the clear ("x") control, the input blurs and the ring is dropped.
      const showTabFocus = this.focusType === FOCUS_TYPE.TAB && this.isInputFocused;
      return {
        focus: this.focusType === FOCUS_TYPE.MOUSE,
        'tab-focus': showTabFocus,
        idle: !showTabFocus && this.focusType !== FOCUS_TYPE.MOUSE,
        [`${this.messageType}`]: !!this.messageType,
        [`size-${this.size}`]: true,
        disabled: this.disabled,
        'no-value': this.value === '' || this.value === undefined,
      };
    };
    this.focusType = FOCUS_TYPE.NONE;
    this.isInputFocused = false;
    this.showDisplayCross = true;
    this.generatedMinutes = [];
    this.checkedTimeValues = DEFAULT_CHECKED_TIME_VALUES;
    this.isInComponent = false;
    this.isDropdownOpen = false;
    this.rovingTimeValues = {
      hoursIndex: 0,
      minutesIndex: 0,
    };
    this.focusedColumn = null;
    this.size = 'm';
    this.disabled = false;
    this.dropdownConfig = {};
    this.placeholder = PLACEHOLDER;
    this.width = DEFAULT_WIDTH_VALUE;
    this.value = '';
    this.minutesInterval = 5;
    this.labelConfig = undefined;
    this.name = undefined;
    this.required = false;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.messageType = undefined;
    this.message = undefined;
    this.maxMessageLength = undefined;
    this.locales = {};
    this.tooltipConfig = {};
  }
  onUpdateMinutesInterval() {
    this.generateMinutes();
    if (this.value !== '' && this.value !== PLACEHOLDER) {
      this.isValidTimeValue(this.value);
    }
  }
  onUpdateValue() {
    if (!this.value || this.value === PLACEHOLDER) {
      this.showDisplayCross = false;
      return;
    }
    this.isValidTimeValue(this.value);
    this.showDisplayCross = true;
    this.highlightItem();
  }
  componentWillLoad() {
    this.generateMinutes();
    if (this.value) {
      this.isValidTimeValue(this.value);
    }
    this.showDisplayCross = !!this.value;
  }
  componentDidLoad() {
    this.themeSubscription.start();
    this.createTippyInstance();
  }
  connectedCallback() {
    this.themeSubscription.start();
    if (this.tippyInstance?.state?.isDestroyed) {
      this.createTippyInstance();
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.isDestroyed = true;
    clearTimeout(this.focusItemTimer);
    clearTimeout(this.scrollTimer);
  }
  get _locales() {
    return mergeLocales(TIME_PICKER_LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (h(Host, { class: "wpp-time-picker", "aria-disabled": this.disabled, style: { width: !this.width ? DEFAULT_WIDTH_VALUE : this.width } }, this.labelConfig?.text && (h("wpp-label-v4-4-0", { typography: "s-strong", class: "label", htmlFor: this.inputId, optional: !this.required, config: this.labelConfig, disabled: this.disabled, tooltipConfig: this.labelTooltipConfig })), h("div", { ref: el => (this.anchorRef = el), id: "anchor", class: this.getAnchorCssClasses() }, h("div", { class: "anchor-time" }, h("wpp-icon-clock-v4-4-0", { class: "clock-icon" }), h("input", {
      // Styled by class, not by id: the id is per-instance (so `for` / `aria-controls`
      // stay unique when several pickers share a page), which a `#time-picker` selector
      // could not follow.
      class: "time-picker-input", ref: el => (this.inputRef = el), onFocus: this.onFocus, onBlur: this.onBlur, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown, onKeyPress: this.onKeyPress, onPaste: this.onPaste, disabled: this.disabled, onInput: this.onUpdateInput, id: this.inputId, name: this.name, type: "text", autocomplete: "off", placeholder: this.placeholder, value: this.value, role: "combobox", "aria-haspopup": "dialog", "aria-expanded": this.isDropdownOpen ? 'true' : 'false', "aria-controls": this.popupId, "aria-label": this.labelConfig?.text || this._locales.timePickerLabel
    })), h("div", { class: "cross-icon-container" }, this.showDisplayCross && (h("wpp-icon-cross-v4-4-0", { class: "cross-icon", "aria-label": this._locales.eraseTimeLabel, role: "button", "aria-disabled": this.disabled ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onClick: this.handleClickCrossIcon, onMouseDown: (event) => event.preventDefault(), onKeyDown: activateOnEnterOrSpace(this.handleClickCrossIcon) })))), h("div", { id: this.popupId, ref: el => (this.portalRef = el), class: "wpp-time-picker-portal", role: "dialog", "aria-modal": "false", "aria-label": this._locales.timePickerLabel, onKeyDown: this.onPortalKeyDown, onPointerDown: this.onPortalPointerDown, onMouseDown: this.onPortalMouseDown }, h("div", { ref: refEl => (this.hoursSectionRef = refEl), class: "hours section", role: "listbox", "aria-label": this._locales.hoursLabel }, HOURS.map((hour, hourIndex) => (h("wpp-list-item-v4-4-0", { id: `hour-${hour}`, key: hour, class: {
        'tab-focus': this.focusedColumn === 'hours' && this.rovingTimeValues.hoursIndex === hourIndex,
      }, checked: this.checkedTimeValues.hoursIndex === hourIndex, role: "option", "aria-selected": this.checkedTimeValues.hoursIndex === hourIndex ? 'true' : 'false', tabIndex: this.rovingTimeValues.hoursIndex === hourIndex ? 0 : -1, onWppChangeListItem: () => this.handleClickListItem(hour, 'hour') }, h("span", { slot: "label" }, hour))))), h("wpp-divider-v4-4-0", { vertical: true }), h("div", { ref: refEl => (this.minutesSectionRef = refEl), class: "minutes section", role: "listbox", "aria-label": this._locales.minutesLabel }, this.generatedMinutes.map((minutes, minutesIndex) => (h("wpp-list-item-v4-4-0", { id: `minutes-${minutes}`, key: minutes, class: {
        'tab-focus': this.focusedColumn === 'minutes' && this.rovingTimeValues.minutesIndex === minutesIndex,
      }, checked: this.checkedTimeValues.minutesIndex === minutesIndex, role: "option", "aria-selected": this.checkedTimeValues.minutesIndex === minutesIndex ? 'true' : 'false', tabIndex: this.rovingTimeValues.minutesIndex === minutesIndex ? 0 : -1, onWppChangeListItem: () => this.handleClickListItem(minutes, 'minutes') }, h("span", { slot: "label" }, minutes)))))), this.message && (h("wpp-inline-message-v4-4-0", { class: !this.messageType ? 'helper-text' : '', message: this.message, type: this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig }))));
  }
  static get is() { return "wpp-time-picker"; }
  static get registryIs() { return "wpp-time-picker-v4-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-time-picker.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-time-picker.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the time picker size, which differs in terms of paddings."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
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
          "text": "If `true`, the time picker is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "dropdownConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "placeholder": {
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
          "text": "Defines the placeholder of the time picker. Placeholder is displayed when there is no value in the time picker."
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "PLACEHOLDER"
      },
      "width": {
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
          "text": "The width of time picker. Values can be in \"px\" or in \"%\".\nDefault value is \"198px\"."
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "DEFAULT_WIDTH_VALUE"
      },
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Value of time picker. Should always have a valid time format."
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
      },
      "minutesInterval": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "1 | 5 | 10 | 15",
          "resolved": "1 | 10 | 15 | 5",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the interval of minutes. Can take of one of the following values: 1, 5, 10, 15"
        },
        "attribute": "minutes-interval",
        "reflect": true,
        "defaultValue": "5"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::LabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config."
        }
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
          "text": "Indicates time picker name."
        },
        "attribute": "name",
        "reflect": false
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
          "text": "If `true`, the datepicker input is required"
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
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
              "path": "../../components",
              "id": "src/components.d.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Dropdown config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "messageType": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "InputMessageTypes",
          "resolved": "\"error\" | \"warning\" | undefined",
          "references": {
            "InputMessageTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::InputMessageTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates time picker message type. This property should be used together with \"messagae\" property for \"error\" and \"warning\" states."
        },
        "attribute": "message-type",
        "reflect": false
      },
      "message": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates time picker message."
        },
        "attribute": "message",
        "reflect": false
      },
      "maxMessageLength": {
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
          "tags": [],
          "text": "Indicates time picker message maximum length"
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<TimePickerLocaleTypes>",
          "resolved": "{ timePickerLabel?: string | undefined; hoursLabel?: string | undefined; minutesLabel?: string | undefined; eraseTimeLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "TimePickerLocaleTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-time-picker/types.ts::TimePickerLocaleTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines accessible labels used by the time picker, using English defaults."
        },
        "defaultValue": "{}"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../components",
              "id": "src/components.d.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the tooltip configuration for the message below the input. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "focusType": {},
      "isInputFocused": {},
      "showDisplayCross": {},
      "generatedMinutes": {},
      "checkedTimeValues": {},
      "isInComponent": {},
      "isDropdownOpen": {},
      "rovingTimeValues": {},
      "focusedColumn": {}
    };
  }
  static get events() {
    return [{
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the input receives focus"
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
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the dropdown of the time picker closes. Contains details about the current value of the datepicker."
        },
        "complexType": {
          "original": "TimePickerChangeEventDetails",
          "resolved": "TimePickerChangeEventDetails",
          "references": {
            "TimePickerChangeEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-time-picker/types.ts::TimePickerChangeEventDetails"
            }
          }
        }
      }, {
        "method": "wppClear",
        "name": "wppClear",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"cross\" icon is clicked and the value of the time picker is cleared."
        },
        "complexType": {
          "original": "TimePickerChangeEventDetails",
          "resolved": "TimePickerChangeEventDetails",
          "references": {
            "TimePickerChangeEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-time-picker/types.ts::TimePickerChangeEventDetails"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "minutesInterval",
        "methodName": "onUpdateMinutesInterval"
      }, {
        "propName": "value",
        "methodName": "onUpdateValue"
      }];
  }
}
