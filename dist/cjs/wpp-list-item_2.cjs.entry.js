'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const highlightWords = require('./highlight-words-25672f7c.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
const utils = require('./utils-2231f97a.js');
const subscribeToTheme = require('./subscribe-to-theme-fc5de7fe.js');
const isEqual = require('./isEqual-c003d7ce.js');
const constants = require('./constants-6680c2a7.js');
const menuListConfig = require('./menuListConfig-205d098b.js');
const consts = require('./consts-d8f5ef98.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./tippy.esm-9d703cd4.js');

var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
const PRESENTATION_ROLE = 'presentation';

/**
 * Type guard to validate theme color usage
 */
const isValidThemeColor = (color) => color.startsWith('var(--wpp-') && color.endsWith(')');
/**
 * Helper to get color value with proper CSS variable syntax
 */
const getThemeColor = (color) => {
  // If already a CSS variable, return as is
  if (color.startsWith('var(')) {
    return color;
  }
  // If it's a raw token, wrap it
  if (color.startsWith('--wpp-')) {
    return `var(${color})`;
  }
  // Otherwise return as is (for edge cases)
  return color;
};

const wppListItemCss = ":host{--li-border-radius:var(--wpp-list-item-border-radius, 6px);--li-height:var(--wpp-list-item-height, 32px);--li-with-caption-height:var(--wpp-list-item-with-caption-height, 52px);--li-width:var(--wpp-list-item-width, 240px);--li-padding:var(--wpp-list-item-padding, 0 8px);--li-with-right-icon-padding:var(--wpp-list-item-with-right-icon-padding, 0 6px 0 8px);--li-text-color-disabled:var(--wpp-list-item-text-color-disabled, var(--wpp-text-color-disabled));--li-caption-text-color:var(--wpp-list-item-caption-text-color, var(--wpp-text-color-info));--li-icons-color-disabled:var(--wpp-list-item-icons-color-disabled, var(--wpp-icon-color-disabled));--li-left-wrapper-margin-right:var(--wpp-list-item-left-wrapper-margin-right, 8px);--li-right-wrapper-margin-right:var(--wpp-list-item-right-wrapper-margin-right, -8px);--li-label-text-line-height:var(--wpp-list-item-label-text-line-height, 24px);--li-label-text-color-selected:var(--wpp-list-item-label-text-color-selected, var(--wpp-brand-color));--li-label-text-color-selected-hover:var(\n    --wpp-list-item-label-text-color-selected-hover,\n    var(--wpp-brand-color-hover)\n  );--li-label-text-color-selected-active:var(\n    --wpp-list-item-label-text-color-selected-active,\n    var(--wpp-brand-color-active)\n  );--li-bg-color:var(--wpp-list-item-bg-color, transparent);--li-bg-color-hover:var(--wpp-list-item-bg-color-hover, var(--wpp-grey-color-200));--li-bg-color-active:var(--wpp-list-item-bg-color-active, var(--wpp-grey-color-300));--li-bg-color-selected:var(--wpp-list-item-bg-color-selected, var(--wpp-primary-color-100));--li-icon-color-hover:var(--wpp-list-item-icon-color-hover, var(--wpp-icon-color-hover));--li-icon-color-active:var(--wpp-list-item-icon-color-active, var(--wpp-icon-color-active));--li-left-icon-color:var(--wpp-list-item-left-icon-color, var(--wpp-grey-color-800));--li-left-icon-color-hover:var(--wpp-list-item-left-icon-color-hover, var(--wpp-grey-color-800));--li-left-icon-color-active:var(--wpp-list-item-left-icon-color-active, var(--wpp-grey-color-900));--li-left-icon-color-selected:var(--wpp-list-item-left-icon-color-selected, var(--wpp-brand-color));--li-right-icon-color-selected:var(--wpp-list-item-right-icon-color-selected, var(--wpp-grey-color-600));--li-right-text-color:var(--wpp-list-item-right-text-color, var(--wpp-grey-color-800));--li-right-text-color-disabled:var(--wpp-list-item-right-text-color-disabled, var(--wpp-grey-color-500));--li-info-wrapper-padding:var(--wpp-li-info-wrapper-padding, 0 8px 0 0);--li-label-text-font-weight:var(--wpp-list-label-text-font-weight, 400);--li-label-text-font-weight-selected:var(--wpp-list-label-text-font-weight-selected, 500);--li-highlight-font-weight:var(--wpp-list-item-highlight-font-weight, 800);--li-subtitle-text-color:var(--wpp-list-item-subtitle-text-color, var(--wpp-grey-color-1000));--li-subtitle-padding:var(--wpp-li-subtitle-padding, 13px 0 5px 8px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;outline:none}:host .subtitle{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);width:var(--li-width);padding:var(--li-subtitle-padding);color:var(--li-subtitle-text-color)}:host .subtitle.slot-hidden{display:none}:host .item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:var(--li-height);width:var(--li-width);padding:var(--li-padding);background-color:var(--li-bg-color);border-radius:var(--li-border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}:host .item .right{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}:host .item .label{--wpp-typography-s-body-font-weight:var(--li-label-text-font-weight);--wpp-typography-s-body-line-height:var(--li-label-text-line-height)}:host .item .info-wrapper{min-width:0;padding:var(--li-info-wrapper-padding)}:host .item .info-wrapper .body-wrapper{min-width:0;overflow:hidden}:host .item .info-wrapper .body-wrapper .highlight-text-wrapper{width:100%}:host .item .info-wrapper .tooltip{min-width:0}:host .item .info-wrapper .tooltip::part(anchor){overflow:hidden}:host .item .info-wrapper .label.slot-hidden,:host .item .info-wrapper .caption.slot-hidden{display:none}:host .item .info-wrapper .label .highlight-text,:host .item .info-wrapper .label ::slotted(*),:host .item .info-wrapper .caption .highlight-text,:host .item .info-wrapper .caption ::slotted(*){white-space:nowrap;text-overflow:ellipsis}:host .item .info-wrapper .label .highlight-wrapper,:host .item .info-wrapper .caption .highlight-wrapper{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .item .info-wrapper .label .highlight-wrapper .highlight,:host .item .info-wrapper .caption .highlight-wrapper .highlight{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);--wpp-typography-s-strong-font-weight:var(--li-highlight-font-weight)}:host .item ::slotted([slot=right][type=s-body]),:host .item ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-right-text-color)}:host .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color)}:host .item.non-interactive,:host .item.has-toggle{cursor:default}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle),:host .item:focus-visible{background-color:var(--li-bg-color-active);outline:none}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item:focus-visible ::slotted([slot=left]),:host .item:focus-visible ::slotted([slot=right]),:host .item:focus-visible .fallback-icon{color:var(--li-icon-color-active)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]),:host .item:focus-visible ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.checked:not(.non-interactive):not(.has-toggle),:host .item .multiple:not(.non-interactive):not(.has-toggle),:host .item .active:not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);--wpp-typography-s-midi-font-weight:var(--li-label-text-font-weight-selected);--wpp-typography-s-body-line-height:var(--li-label-text-line-height);line-height:var(--li-label-text-line-height);color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight{color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item.checked:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .multiple:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .multiple:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .active:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .active:not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-left-icon-color-selected)}:host .item.multiple.checked:not(.non-interactive):hover .label{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):active .label{color:var(--li-label-text-color-selected-active)}:host .item.with-caption{height:var(--li-with-caption-height)}:host .item.with-caption ::slotted(.wpp-action-button){margin-right:0}:host .item.with-caption .info-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host .item.with-caption .info-wrapper .caption{display:-ms-flexbox;display:flex;color:var(--li-caption-text-color)}:host .item.with-caption .info-wrapper .caption.slot-hidden{display:none}:host .item.with-caption.multiple .info-wrapper{-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .info-wrapper .wpp-checkbox{margin-top:5px}:host .item.with-caption.multiple .right{height:100%;-ms-flex-align:start;align-items:flex-start;margin-top:4px}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-tag){margin-top:3px}:host .item.with-caption.multiple .right ::slotted([slot=right][type=s-body]){margin-top:4px}:host .item.disabled{background-color:transparent;pointer-events:none}:host .item.disabled .info-wrapper .label,:host .item.disabled .info-wrapper .caption{color:var(--li-text-color-disabled)}:host .item.disabled ::slotted([slot=right][type=s-body]),:host .item.disabled ::slotted(.wpp-icon[slot=right]:not(.wpp-icon-chevron)){color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted([slot=left]),:host .item.disabled ::slotted([slot=right]),:host .item.disabled .fallback-icon{color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted(.wpp-avatar[slot=left]){opacity:0.4}:host .item.disabled ::slotted(.wpp-tag[slot=right]){opacity:0.5}:host .item.disabled ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color-disabled)}:host .item.disabled ::slotted(.wpp-action-button){--ab-inverted-icon-color:var(--li-icons-color-disabled);--ab-tertiary-icon-color:var(--li-icons-color-disabled);--ab-secondary-icon-color:var(--li-icons-color-disabled);--ab-primary-icon-color:var(--li-icons-color-disabled)}:host .item.loading-item{pointer-events:none}:host .item.link{text-decoration:none}:host .item .info-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .label,:host .item .info-wrapper .caption{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .item .wpp-checkbox,:host .item .left{margin-right:var(--li-left-wrapper-margin-right)}:host .item ::slotted(.wpp-action-button),:host .item ::slotted(.wpp-menu-context){margin-right:var(--li-right-wrapper-margin-right)}:host .item .label,:host .item .right,:host .item .left{display:-ms-flexbox;display:flex}:host .item .left.slot-hidden,:host .item .caption.slot-hidden,:host .item .right.slot-hidden{display:none}:host:host(.wpp-disabled){cursor:not-allowed}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item{background-color:var(--li-bg-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-active);--checkbox-border-color:var(--checkbox-border-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=left]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=right]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .fallback-icon{color:var(--li-icon-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked{background-color:var(--wpp-primary-color-200)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-active);--checkbox-border-color-checked:var(--checkbox-border-color-checked-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .info-wrapper .label{color:var(--li-label-text-color-selected-active)}:host(.has-right-slot) .item{padding:var(--li-with-right-icon-padding)}:host(.wpp-hidden){display:none}:host(.wpp-mounted) .label .highlight-text,:host(.wpp-mounted) .label ::slotted(*),:host(.wpp-mounted) .caption .highlight-text,:host(.wpp-mounted) .caption ::slotted(*){overflow:hidden}.with-tooltip{width:100%}.with-tooltip::part(anchor){width:100%}:host(.wpp-loading){opacity:0}.ul-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;padding:0;margin:0}:host(.tab-focus){border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.tab-focus) .item{background-color:var(--li-bg-color-active);outline:none}:host(.tab-focus) .item ::slotted([slot=left]),:host(.tab-focus) .item ::slotted([slot=right]),:host(.tab-focus) .item .fallback-icon{color:var(--li-icon-color-active)}:host(.tab-focus) .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .label.custom-typography ::slotted([slot=label]){font-size:var(--wpp-list-item-label-font-size) !important;font-weight:var(--wpp-list-item-label-font-weight) !important;font-family:var(--wpp-list-item-label-font-family) !important;font-style:var(--wpp-list-item-label-font-style) !important;line-height:var(--wpp-list-item-label-line-height) !important;letter-spacing:var(--wpp-list-item-label-letter-spacing) !important;text-transform:var(--wpp-list-item-label-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-label-text-decoration) !important;text-decoration:var(--wpp-list-item-label-text-decoration) !important;color:var(--wpp-list-item-label-color) !important}:host .caption.custom-typography ::slotted([slot=caption]){font-size:var(--wpp-list-item-caption-font-size) !important;font-weight:var(--wpp-list-item-caption-font-weight) !important;font-family:var(--wpp-list-item-caption-font-family) !important;font-style:var(--wpp-list-item-caption-font-style) !important;line-height:var(--wpp-list-item-caption-line-height) !important;letter-spacing:var(--wpp-list-item-caption-letter-spacing) !important;text-transform:var(--wpp-list-item-caption-text-transform) !important;-webkit-text-decoration:var(--wpp-list-item-caption-text-decoration) !important;text-decoration:var(--wpp-list-item-caption-text-decoration) !important;color:var(--wpp-list-item-caption-color) !important}:host([data-wpp-theme=dark]){--li-label-text-color-selected:var(--wpp-primary-color-800);--li-label-text-color-selected-hover:var(--wpp-primary-color-700);--li-label-text-color-selected-active:var(--wpp-primary-color-800)}:host([data-wpp-theme=dark]) .item.checked:not(.non-interactive):not(.has-toggle),:host([data-wpp-theme=dark]) .item .multiple:not(.non-interactive):not(.has-toggle),:host([data-wpp-theme=dark]) .item .active:not(.non-interactive):not(.has-toggle){--li-right-text-color:var(--wpp-primary-color-700);background-color:var(--wpp-primary-color-300)}:host([data-wpp-theme=dark]) .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle){background-color:var(--wpp-grey-color-400)}:host([data-wpp-theme=dark]) .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle),:host([data-wpp-theme=dark]) .item:focus-visible{background-color:var(--wpp-grey-color-500)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)[data-wpp-theme=dark]) .item:not(.checked){background-color:var(--wpp-grey-color-300)}:host(.tab-focus[data-wpp-theme=dark]) .item:not(.checked){background-color:var(--wpp-grey-color-300)}";

const WppListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppChangeListItem = index.createEvent(this, "wppChangeListItem", 1);
    this.tooltipId = utils.uuidv4();
    this.eventSource = null;
    this.hasRightSlotIcon = false;
    this.previousLabelText = '';
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.host);
    this.removeTriggerWrapperAttributes = () => {
      const menuContextTag = utils.transformToVersionedTag('wpp-menu-context').toUpperCase();
      const menuContext = this.host.querySelector(`${menuContextTag}[slot="right"]`);
      if (menuContext) {
        let triggerWrapper = menuContext.querySelector('.trigger-wrapper');
        if (triggerWrapper) {
          triggerWrapper.removeAttribute('tabindex');
          triggerWrapper.removeAttribute('role');
        }
        else {
          const observer = new MutationObserver(() => {
            triggerWrapper = menuContext.querySelector('.trigger-wrapper');
            if (triggerWrapper) {
              triggerWrapper.removeAttribute('tabindex');
              triggerWrapper.removeAttribute('role');
              observer.disconnect();
            }
          });
          observer.observe(menuContext, { childList: true, subtree: true });
        }
      }
    };
    this.setupLabelContentObserver = () => {
      const labelEl = this.host.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      // Create a new observer that will watch for text changes
      this.labelObserver = new MutationObserver(() => {
        const currentLabelText = labelEl.textContent || '';
        if (currentLabelText !== this.previousLabelText) {
          this.previousLabelText = currentLabelText;
          this.updateSlotData();
          requestAnimationFrame(this.checkHasTooltip);
        }
      });
      // Configure the observer to watch for changes in text content and child nodes
      this.labelObserver.observe(labelEl, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    };
    this.checkHasTooltip = () => {
      let labelWrapper = this.host?.shadowRoot?.querySelector('[part="label-wrapper"]');
      if (labelWrapper?.classList.contains('slot-hidden')) {
        labelWrapper = this.host?.shadowRoot?.querySelector('.highlight-text');
        this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth;
        return;
      }
      const labelEl = this.host?.querySelector('[slot="label"]');
      if (!labelEl)
        return;
      const textEl = labelEl?.shadowRoot?.querySelector('.typography');
      if (textEl) {
        this.hasTooltip = textEl.clientWidth < textEl.scrollWidth;
      }
      else {
        this.hasTooltip = labelEl.clientWidth < labelEl.scrollWidth;
      }
    };
    this.handleComponentMount = () => {
      this.mounted = true;
      requestAnimationFrame(() => {
        this.checkHasTooltip();
      });
      this.loading = false;
    };
    this.getSlotText = (slotName) => {
      const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
      return slotEl?.textContent || '';
    };
    this.subtitleSlotCssClasses = () => ({
      subtitle: true,
      'slot-hidden': !this.hasSubtitleSlot,
    });
    this.updateComponentState = (updateData) => {
      if (this.nonInteractive)
        return;
      this.componentState = {
        ...this.componentState,
        ...updateData,
      };
    };
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        caption: '[slot="caption"]',
        left: '[slot="left"]',
        right: '[slot="right"]',
        subtitle: '[slot="subtitle"]',
      });
      this.hasCaptionSlot = !emptyStates.caption;
      this.hasLeftSlot = !emptyStates.left;
      this.hasRightSlot = !emptyStates.right;
      this.hasSubtitleSlot = !emptyStates.subtitle;
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled || this.nonInteractive)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest('.wpp-select-portal'),
        isAutocompleteBasedEvent: !!this.host.closest(utils.transformToVersionedTag('wpp-autocomplete')),
      });
    };
    this.handleRightWrapperClick = () => {
      this.eventSource = EVENT_SOURCE.RIGHT_SLOT;
    };
    this.hostCssClasses = () => ({
      'wpp-list-item': true,
      'wpp-disabled': this.disabled,
      'wpp-hidden': this.hidden,
      'wpp-mounted': this.mounted,
      'wpp-loading': this.loading,
    });
    this.itemWrapperCssClasses = () => ({
      item: true,
      checked: this.checked,
      'has-toggle': this.hasToggle,
      selectable: this.selectable,
      multiple: this.multiple,
      disabled: this.disabled,
      'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
      active: this.active,
      link: this.linkConfig?.href,
      'loading-item': this.isLoadingItem,
      'with-right-icon': this.hasRightSlotIcon,
      'non-interactive': this.nonInteractive,
    });
    this.labelSlotCssClasses = () => ({
      label: true,
      'slot-hidden': Boolean(this.highlight),
      'custom-typography': !!this.labelTypography,
    });
    this.leftSlotCssClasses = () => ({
      left: true,
      'slot-hidden': !this.hasLeftSlot,
    });
    this.rightSlotCssClasses = () => ({
      right: true,
      'slot-hidden': !this.hasRightSlot && !this.isExtended && !this.active,
    });
    this.captionSlotCssClasses = () => ({
      caption: true,
      'slot-hidden': !this.hasCaptionSlot || Boolean(this.highlight),
      'custom-typography': !!this.captionTypography,
    });
    this.ulWrapperCssClasses = () => ({
      'ul-wrapper': true,
    });
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (index.h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (index.h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, index.h("span", { class: "highlight-text" }, this.getHighlightedText('label')))), index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (index.h("div", { class: "caption" }, index.h("span", { class: "highlight-text" }, this.getHighlightedText('caption'))))));
    };
    this.renderRightSlot = () => (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && index.h("wpp-icon-chevron-v4-1-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && index.h("wpp-icon-tick-v4-1-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
    this.handleMouseEnter = () => {
      this.updateComponentState({ hover: true });
    };
    this.handleMouseLeave = () => {
      this.updateComponentState({ hover: false });
    };
    this.handleMouseDown = () => {
      this.updateComponentState({ active: true });
    };
    this.handleMouseUp = () => {
      this.updateComponentState({ active: false });
    };
    this.handleKeyDown = (event) => {
      if (this.disabled || this.nonInteractive)
        return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleItemClick();
      }
    };
    this.loading = true;
    this.mounted = false;
    this.hasCaptionSlot = false;
    this.hasLeftSlot = false;
    this.hasRightSlot = false;
    this.hasCaptionHighlight = false;
    this.hasTooltip = false;
    this.hasToggle = false;
    this.hasSubtitleSlot = false;
    this.componentState = {
      hover: false,
      active: false,
    };
    this.labelTypography = undefined;
    this.captionTypography = undefined;
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
    this.indeterminate = false;
    this.disabled = false;
    this.highlight = '';
    this.containerState = undefined;
    this.isExtended = false;
    this.tooltipConfig = {};
    this.labelTooltipConfig = {};
    this.linkConfig = {};
    this.hidden = false;
    this.isLoadingItem = false;
    this.nonInteractive = false;
    this.checkboxName = undefined;
  }
  /**
   * Sets focus on the list-item element.
   */
  async setFocus() {
    setTimeout(() => {
      this.host.focus();
    }, 0);
  }
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  typographyLabel() {
    this.applyTypographyVariables('label', this.labelTypography || {});
  }
  typographyCaption() {
    this.applyTypographyVariables('caption', this.captionTypography || {});
  }
  componentWillLoad() {
    this.updateSlotData();
    this.hasRightSlot = !!this.host.querySelector('[slot="right"]');
    setTimeout(() => {
      this.hasRightSlotIcon = !!this.host.querySelector('[slot="right"].wpp-icon');
    }, 0);
    setTimeout(() => {
      this.hasToggle = !!this.host.querySelector('[slot="right"].wpp-toggle');
    }, 0);
    this.debouncedResizeHandler = utils.debounce(() => {
      this.checkHasTooltip();
    }, 50);
  }
  componentDidLoad() {
    this.handleComponentMount();
    this.setupLabelContentObserver();
    this.removeTriggerWrapperAttributes();
    this.typographyLabel();
    this.typographyCaption();
  }
  applyTypographyVariables(slotName, props) {
    if (!props)
      return;
    const prefix = `--wpp-list-item-${slotName}`;
    const cssAttrs = ['font-weight', 'font-size', 'font-family', 'line-height', 'letter-spacing', 'text-transform'];
    if (props.type) {
      cssAttrs.forEach(attr => {
        const varName = `--wpp-typography-${props.type}-${attr}`;
        let value = getComputedStyle(this.host).getPropertyValue(varName).trim();
        if (!value)
          value = getComputedStyle(document.body).getPropertyValue(varName).trim();
        if (value)
          this.host.style.setProperty(`${prefix}-${attr}`, value);
      });
    }
    // Only apply custom color if the component is not disabled
    if (props.color && !this.disabled) {
      // Validate and normalize the color
      const normalizedColor = getThemeColor(props.color);
      if (!isValidThemeColor(props.color)) {
        console.warn(`[WppListItem] Using non-theme color "${props.color}". ` +
          `Consider using theme colors CSS variables like "var(--wpp-brand-color)"`);
      }
      this.host.style.setProperty(`${prefix}-color`, normalizedColor);
    }
    else if (this.disabled && props.color) {
      // Remove custom color when disabled to let the disabled state color take effect
      this.host.style.removeProperty(`${prefix}-color`);
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    this.tooltipId = utils.uuidv4();
    if (this.labelObserver) {
      this.labelObserver.disconnect();
    }
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords.highlightWords({
      text: captionText,
      query: newValue || '',
      matchExactly: true,
    });
    this.hasCaptionHighlight = chunks.some(el => el.match);
  }
  handleViewChange(newContainerState) {
    if (newContainerState === 'shown') {
      this.mounted = false;
      this.loading = false;
      this.hasTooltip = false;
      setTimeout(this.handleComponentMount, 100);
    }
    // Special state for a cases when we have list items inside context menu to trigger tooltip check
    if (newContainerState === 'tooltipTrigger') {
      requestAnimationFrame(this.checkHasTooltip);
    }
  }
  disabledChanged() {
    this.typographyLabel();
    this.typographyCaption();
  }
  getHighlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords.highlightWords({
      text: slotText,
      query: this.highlight || '',
      matchExactly: true,
    });
    if (this.highlight && chunks.some(el => el.match)) {
      return (index.h("span", { class: "highlight-wrapper" }, chunks.map(({ text, match }) => match && !this.disabled ? (index.h("span", { key: text, class: "highlight", part: "highlight" }, text)) : (index.h("span", { key: text }, text)))));
    }
    return slotText;
  }
  componentWillRender() {
    this.itemWrapper = this.linkConfig?.href ? 'a' : 'li';
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    const tabIndex = this.disabled ? -1 : this.nonInteractive ? -1 : 0;
    return (index.h(index.Host, { class: this.hostCssClasses(), role: PRESENTATION_ROLE, exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: tabIndex }, this.hasSubtitleSlot && (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), index.h("ul", { onClick: this.handleItemClick, onKeyDown: this.handleKeyDown, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onMouseDown: this.handleMouseDown, onMouseUp: this.handleMouseUp, class: this.ulWrapperCssClasses(), part: "ul-wrapper" }, index.h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, index.h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (index.h("wpp-checkbox-v4-1-0", { disabled: this.disabled, checked: this.checked, indeterminate: this.indeterminate, internalState: displayState, part: "checkbox", name: this.checkboxName || 'wpp-list-item-checkbox' })) : (index.h(index.Fragment, null, this.tooltipConfig.leftSlot ? (index.h("wpp-tooltip-v4-1-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, warning: this.tooltipConfig.leftSlot.warning, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (index.h("wpp-tooltip-v4-1-0", { text: this.getSlotText('label'), config: { placement: 'right', ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (index.h("wpp-tooltip-v4-1-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, warning: this.tooltipConfig.rightSlot.warning, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot())))));
  }
  static get registryIs() { return "wpp-list-item-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "labelTypography": ["typographyLabel"],
    "captionTypography": ["typographyCaption"],
    "highlight": ["highlightUpdate"],
    "containerState": ["handleViewChange"],
    "disabled": ["disabledChanged"]
  }; }
};
WppListItem.style = wppListItemCss;

const defaultDropdownConfig = {
  trigger: 'manual',
  placement: 'bottom-start',
  hideOnClick: false,
  offset: [0, 4],
  zIndex: consts.Z_INDEX.CONTEXT_MENU,
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
};
const defaultNestedDropdownConfig = {
  trigger: 'mouseenter focus',
  hideOnClick: false,
  placement: 'right-start',
  offset: [-8, 9],
  zIndex: consts.Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left-start', 'left'],
        },
      },
    ],
  },
};
const setDefaultDropdownConfig = (isNested) => isNested ? defaultNestedDropdownConfig : defaultDropdownConfig;

const wppMenuContextCss = ".sc-wpp-menu-context-h{--mc-wrapper-width:var(--wpp-mc-wrapper-width, 100%);--mc-list-box-max-width:var(--wpp-menu-context-list-box-max-width, 350px);--mc-item-bg-color-active:var(--wpp-mc-item-bg-color-active, var(--wpp-grey-color-200));--mc-item-icon-color-active:var(--wpp-mc-item-icon-color-active, var(--wpp-grey-color-800));--mc-item-width:var(--wpp-mc-item-width, var(--custom-menu-context-width, 100%));--mc-item-margin:var(--wpp-mc-item-margin, 4px 0 0 0);--mc-nested-wrapper-border-radius:var(--wpp-mc-nested-wrapper-border-radius, 6px)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--mc-wrapper-width);max-width:var(--mc-list-box-max-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m))}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar{width:7px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-track{margin-top:8px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.sc-wpp-menu-context{display:-ms-inline-flexbox;display:inline-flex}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{width:100%}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{border-radius:var(--mc-nested-wrapper-border-radius)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested[aria-expanded=true].sc-wpp-menu-context{background-color:var(--mc-item-bg-color-active)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{width:var(--custom-menu-context-width, 100%)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list[data-wpp-theme=dark].sc-wpp-menu-context{background-color:var(--wpp-grey-color-200)}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden]{visibility:visible;pointer-events:all;-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden] .tippy-content{-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-s>[slot=trigger-element]:active::part(icon-extended){color:var(--mc-item-icon-color-active)}.sc-wpp-menu-context-s .tippy-box[data-animation=fadein][data-state=hidden]{opacity:0}.sc-wpp-menu-context-s .wpp-list-item,.sc-wpp-menu-context-s .wpp-menu-context{--mc-item-width:100%;width:var(--mc-item-width);--li-width:var(--mc-item-width);overflow:hidden}.sc-wpp-menu-context-s .wpp-list-item:not(:first-child),.sc-wpp-menu-context-s .wpp-menu-context:not(:first-child){margin:var(--mc-item-margin)}";

const WppMenuContext = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppBlur = index.createEvent(this, "wppBlur", 1);
    this.wppFocus = index.createEvent(this, "wppFocus", 1);
    this.themeSubscription = subscribeToTheme.themeSubscriptionController(() => this.contentRef);
    this.getContentRef = (node) => {
      this.contentRef = node;
    };
    this.getTriggerRef = (node) => {
      this.triggerRef = node;
    };
    this.checkNestedItemIsDisabled = () => {
      if (this.isNestedContext && (this.triggerRef?.children[0]).disabled) {
        this.triggerRef?.setAttribute('disabled', 'true');
      }
    };
    this.removeDisabledTag = () => {
      if (!this.triggerRef?.children[0])
        return;
      if (this.triggerRef?.getAttribute('disabled') === 'false' ||
        this.triggerRef?.children[0].getAttribute('disabled') === 'false') {
        this.triggerRef.removeAttribute('disabled');
        this.triggerRef?.children[0].removeAttribute('disabled');
      }
    };
    this.createTippyInstance = () => {
      this.removeDisabledTag();
      this.tippyInstance = menuListConfig.menuListConfig({
        anchor: this.triggerRef,
        content: this.contentRef,
        triggerElementWidth: false,
        maxWidth: '350px',
        hideOnPopperBlur: true,
        appendTo: this.appendToListWrapper ? this.wppListWrapperRef : () => utils.getHighestContainerInDOM(),
        ...setDefaultDropdownConfig(this.isNestedContext),
        ...this.dropdownConfig,
        onShow: (instance) => {
          if (this.listWidth !== 'auto') {
            instance.popper.style.width = this.listWidth;
          }
          this.handleAriaExpandedOnTrigger('show');
          const listItems = this.contentRef?.querySelectorAll(utils.transformToVersionedTag('wpp-list-item'));
          Array.from(listItems || []).forEach(item => {
            item.setAttribute('container-state', 'tooltipTrigger');
          });
          if (this.dropdownConfig?.onShow) {
            return this.dropdownConfig.onShow(instance);
          }
        },
        onHide: (instance) => {
          this.handleAriaExpandedOnTrigger('hide');
          if (this.dropdownConfig?.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onHidden: () => {
          if (document.activeElement === this.triggerElement)
            return;
          this.isInComponent = false;
        },
        onClickOutside: instance => {
          // This function handles cases when the user clicks anywhere else but on
          // the trigger element or on the dropdowns. Since the nested menu-contexts
          // are appended to the parent, they are considered part of the main dropdown
          instance.hide();
        },
      });
    };
    this.handleAriaExpandedOnTrigger = (type) => {
      if (!this.triggerRef)
        return;
      const ariaExpandedValue = this.triggerRef.getAttribute('aria-expanded');
      if (!ariaExpandedValue || ariaExpandedValue === (type === 'show' ? 'false' : 'true')) {
        this.triggerRef.setAttribute('aria-expanded', type === 'show' ? 'true' : 'false');
      }
    };
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.wppBlur.emit();
    };
    this.onFocus = (event) => {
      if (!this.isInComponent)
        this.wppFocus.emit(event);
      this.isInComponent = true;
    };
    this.onFocusout = (event) => {
      if (this.host.contains(event.relatedTarget) ||
        this.tippyInstance.popper.contains(event.relatedTarget))
        return;
      this.isInComponent = false;
    };
    this.handleClickTrigger = (event) => {
      event.stopPropagation();
      const isTriggerDisabled = !!((this.triggerElement?.hasAttribute('disabled') && this.triggerElement?.getAttribute('disabled') !== 'false') ||
        this.triggerElement?.classList.contains('disabled'));
      if (this.isNestedContext || isTriggerDisabled)
        return;
      if (!this.tippyInstance.state.isShown) {
        this.tippyInstance.show();
      }
      else {
        this.tippyInstance.hide();
      }
    };
    this.menuCssClasses = () => ({
      'wpp-menu-context': true,
      'wpp-menu-context-wrapper': true,
      'wpp-menu-nested-context-wrapper': this.isNestedContext,
    });
    this.triggerWrapperCssClasses = () => ({
      'trigger-wrapper': true,
      nested: this.isNestedContext,
    });
    this.listWrapperCssClasses = () => ({
      [constants.WPP_LIST_CLASSNAME]: true,
      [`${this.externalClass}`]: true,
    });
    this.contextList = undefined;
    this.tippyInstance = undefined;
    this.isNestedContext = undefined;
    this.hidden = true;
    this.isInComponent = false;
    this.listWidth = 'auto';
    this.dropdownConfig = {};
    this.appendToListWrapper = false;
    this.externalClass = '';
    this.ariaProps = {};
  }
  handleClick(event) {
    if (!this.tippyInstance?.state.isVisible)
      return;
    // NOTE: our wppChangeListItem listener is called when ListItems are used in Select or Autocomplete.
    // This should be treated as hotfix until we move all our dropdowns to the document.body
    // or find other proper solution
    if (event.detail?.isSelectBasedEvent)
      return;
    if (event.detail?.isAutocompleteBasedEvent)
      return;
    const listItem = event
      .composedPath()
      .find(el => el.tagName?.includes(constants.CONTEXT_ITEM_TAG) ||
      el.tagName?.includes(constants.TOPBAR_NAVIGATION_ITEM_TAG));
    if (!listItem)
      return;
    const currentRole = listItem.getAttribute('role');
    const disabled = listItem.getAttribute('disabled');
    if (!currentRole ||
      [constants.MENU_BAR_ROLE, constants.MENU_ROLE].includes(currentRole || '') ||
      (disabled !== null && disabled !== 'false'))
      return;
    const target = event.target;
    if (target.isExtended) {
      return;
    }
    if (this.tippyInstance && this.tippyInstance?.state.isVisible) {
      this.tippyInstance.hide();
    }
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual.isEqual_1(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateIsInComponent(value) {
    if (!value)
      this.onBlur();
  }
  componentWillLoad() {
    this.isNestedContext =
      this.host?.children[0]?.tagName === utils.transformToVersionedTag(constants.CONTEXT_ITEM_TAG).toUpperCase();
  }
  componentDidLoad() {
    this.themeSubscription.start();
    this.createTippyInstance();
    this.checkNestedItemIsDisabled();
    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag();
    });
    this.startObserving();
    if (this.triggerRef) {
      this.triggerElement = this.triggerRef?.querySelector('[slot="trigger-element"]');
      if (this.triggerElement) {
        this.triggerElement.addEventListener('blur', this.onBlur);
        this.triggerElement.addEventListener('focus', this.onFocus);
      }
      if (this.triggerElement && this.triggerElement.getAttribute('role')) {
        this.triggerElement.setAttribute('role', 'presentation');
      }
    }
  }
  connectedCallback() {
    this.themeSubscription.start();
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (!this.isNestedContext) {
      this.tippyInstance?.destroy();
    }
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('blur', this.onBlur);
      this.triggerElement.removeEventListener('focus', this.onFocus);
    }
    this.mutationObserver?.disconnect();
  }
  startObserving() {
    this.mutationObserver.observe(this.host?.children[0], { attributes: true });
  }
  render() {
    const style = {
      '--custom-menu-context-width': this.listWidth === 'auto' ? '' : this.listWidth,
    };
    return (index.h(index.Host, { class: this.menuCssClasses(), exportparts: "trigger, list-wrapper, list, inner", onFocusout: this.onFocusout }, index.h("div", { ref: this.getTriggerRef, onClick: this.handleClickTrigger, class: this.triggerWrapperCssClasses() }, index.h("slot", { name: "trigger-element", part: "trigger" })), index.h("div", { class: "wpp-list-wrapper", part: "list-wrapper", ref: ref => (this.wppListWrapperRef = ref) }, index.h("ul", { class: this.listWrapperCssClasses(), style: style, ref: this.getContentRef, role: constants.MENU_ROLE, part: "list" }, index.h("slot", { part: "inner" })))));
  }
  static get registryIs() { return "wpp-menu-context-v4-1-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "dropdownConfig": ["updateDropdownConfig"],
    "isInComponent": ["updateIsInComponent"]
  }; }
};
WppMenuContext.style = wppMenuContextCss;

exports.wpp_list_item = WppListItem;
exports.wpp_menu_context = WppMenuContext;
