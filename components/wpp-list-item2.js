import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { h as highlightWords } from './highlight-words.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { M as MENU_BAR_ROLE, C as CONTEXT_ITEM_TAG } from './constants.js';
import { u as uuidv4, g as getSlotEmptyStates, j as transformToVersionedTag, d as debounce } from './utils.js';
import { d as defineCustomElement$h } from './wpp-action-button2.js';
import { d as defineCustomElement$g } from './wpp-checkbox2.js';
import { d as defineCustomElement$f } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$e } from './wpp-icon-cross2.js';
import { d as defineCustomElement$d } from './wpp-icon-dash2.js';
import { d as defineCustomElement$c } from './wpp-icon-error2.js';
import { d as defineCustomElement$b } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$a } from './wpp-icon-success2.js';
import { d as defineCustomElement$9 } from './wpp-icon-tick2.js';
import { d as defineCustomElement$8 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$7 } from './wpp-inline-message2.js';
import { d as defineCustomElement$6 } from './wpp-internal-label2.js';
import { d as defineCustomElement$5 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$4 } from './wpp-label2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

var EVENT_SOURCE;
(function (EVENT_SOURCE) {
  EVENT_SOURCE["RIGHT_SLOT"] = "RIGHT_SLOT";
})(EVENT_SOURCE || (EVENT_SOURCE = {}));
const ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION = new Set([
  'wpp-action-button',
  'wpp-toggle',
  'wpp-icon',
  'wpp-tag',
  'wpp-typography',
  'wpp-menu-context',
]);
const ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION = new Set([
  'wpp-typography',
  'wpp-tag',
  'wpp-menu-context',
  'wpp-action-button',
]);
const ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION = new Set(['wpp-icon', 'wpp-avatar']);
const ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION = new Set(['wpp-checkbox']);

/**
 * Normalizes a tag name by removing any versioning information (e.g., "-v2-20-0").
 * @param tagName - The original tag name.
 * @returns The normalized tag name.
 */
const normalizeTagName = (tagName) => tagName.split('-v')[0];
/**
 * Validates the content of a slot.
 * Removes any disallowed components and logs warnings for invalid elements.
 *
 * @param host - The host element of the list item.
 * @param slotName - The name of the slot to validate ("left" or "right").
 * @param allowedComponents - The list of allowed components for this slot.
 * @param multiple - Indicates whether the list item’s multiple prop is true.
 */
const validateSlotContent = (host, slotName, allowedComponents, multiple) => {
  const slotElements = Array.from(host.querySelectorAll(`[slot="${slotName}"]`));
  slotElements.forEach(element => {
    const tagName = normalizeTagName(element.tagName.toLowerCase());
    // For the right slot, "wpp-menu-context" is allowed only if multiple is true.
    if (slotName === 'right' && tagName === 'wpp-menu-context' && !multiple) {
      console.warn(`[WppListItem] "wpp-menu-context" is not allowed in single selection mode (multiple is false).`);
      element.remove();
      return;
    }
    // Additionally, allow any Icon when it's not multiple
    const isAllowed = allowedComponents.has(tagName) || (tagName.startsWith('wpp-icon') && !multiple);
    if (!isAllowed) {
      console.warn(`[WppListItem] Invalid component "${tagName}" found in the "${slotName}" slot. Only these components are allowed: ${Array.from(allowedComponents).join(', ')}`);
      element.remove();
    }
  });
};
const validateRightSlotContent = (host, multiple) => {
  const allowedComponents = multiple
    ? ALLOWED_COMPONENTS_RIGHT_MULTIPLE_SELECTION
    : ALLOWED_COMPONENTS_RIGHT_SINGLE_SELECTION;
  validateSlotContent(host, 'right', allowedComponents, multiple);
};
const validateLeftSlotContent = (host, multiple) => {
  const allowedComponents = multiple
    ? ALLOWED_COMPONENTS_LEFT_MULTIPLE_SELECTION
    : ALLOWED_COMPONENTS_LEFT_SINGLE_SELECTION;
  validateSlotContent(host, 'left', allowedComponents, multiple);
};

const wppListItemCss = ":host{--li-border-radius:var(--wpp-list-item-border-radius, 6px);--li-height:var(--wpp-list-item-height, 32px);--li-with-caption-height:var(--wpp-list-item-with-caption-height, 52px);--li-width:var(--wpp-list-item-width, 240px);--li-padding:var(--wpp-list-item-padding, 0 8px);--li-with-right-icon-padding:var(--wpp-list-item-with-right-icon-padding, 0 6px 0 8px);--li-text-color-disabled:var(--wpp-list-item-text-color-disabled, var(--wpp-text-color-disabled));--li-caption-text-color:var(--wpp-list-item-caption-text-color, var(--wpp-text-color-info));--li-icons-color-disabled:var(--wpp-list-item-icons-color-disabled, var(--wpp-icon-color-disabled));--li-left-wrapper-margin-right:var(--wpp-list-item-left-wrapper-margin-right, 8px);--li-right-wrapper-margin-right:var(--wpp-list-item-right-wrapper-margin-right, -8px);--li-label-text-line-height:var(--wpp-list-item-label-text-line-height, 24px);--li-label-text-color-selected:var(--wpp-list-item-label-text-color-selected, var(--wpp-brand-color));--li-label-text-color-selected-hover:var(--wpp-list-item-label-text-color-selected-hover, var(--wpp-brand-color-hover));--li-label-text-color-selected-active:var(--wpp-list-item-label-text-color-selected-active, var(--wpp-brand-color-active));--li-bg-color:var(--wpp-list-item-bg-color, transparent);--li-bg-color-hover:var(--wpp-list-item-bg-color-hover, var(--wpp-grey-color-200));--li-bg-color-active:var(--wpp-list-item-bg-color-active, var(--wpp-grey-color-300));--li-bg-color-selected:var(--wpp-list-item-bg-color-selected, var(--wpp-primary-color-100));--li-icon-color-hover:var(--wpp-list-item-icon-color-hover, var(--wpp-icon-color-hover));--li-icon-color-active:var(--wpp-list-item-icon-color-active, var(--wpp-icon-color-active));--li-left-icon-color:var(--wpp-list-item-left-icon-color, var(--wpp-grey-color-800));--li-left-icon-color-hover:var(--wpp-list-item-left-icon-color-hover, var(--wpp-grey-color-800));--li-left-icon-color-active:var(--wpp-list-item-left-icon-color-active, var(--wpp-grey-color-900));--li-left-icon-color-selected:var(--wpp-list-item-left-icon-color-selected, var(--wpp-brand-color));--li-right-icon-color-selected:var(--wpp-list-item-right-icon-color-selected, var(--wpp-grey-color-600));--li-right-text-color:var(--wpp-list-item-right-text-color, var(--wpp-grey-color-800));--li-right-text-color-disabled:var(--wpp-list-item-right-text-color-disabled, var(--wpp-grey-color-500));--li-info-wrapper-padding:var(--wpp-li-info-wrapper-padding, 0 8px 0 0);--li-label-text-font-weight:var(--wpp-list-label-text-font-weight, 400);--li-label-text-font-weight-selected:var(--wpp-list-label-text-font-weight-selected, 500);--li-highlight-font-weight:var(--wpp-list-item-highlight-font-weight, 800);--li-subtitle-text-color:var(--wpp-list-item-subtitle-text-color, var(--wpp-grey-color-1000));--li-subtitle-padding:var(--wpp-li-subtitle-padding, 13px 0 5px 8px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;outline:none}:host .subtitle{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);width:var(--li-width);padding:var(--li-subtitle-padding);color:var(--li-subtitle-text-color)}:host .subtitle.slot-hidden{display:none}:host .item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;height:var(--li-height);width:var(--li-width);padding:var(--li-padding);background-color:var(--li-bg-color);border-radius:var(--li-border-radius);-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}:host .item .label{--wpp-typography-s-body-font-weight:var(--li-label-text-font-weight);--wpp-typography-s-body-line-height:var(--li-label-text-line-height)}:host .item .info-wrapper{min-width:0;padding:var(--li-info-wrapper-padding);overflow:hidden}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .body-wrapper .highlight-text-wrapper{width:100%}:host .item .info-wrapper .tooltip{min-width:0}:host .item .info-wrapper .tooltip::part(anchor){overflow:hidden}:host .item .info-wrapper .label.slot-hidden,:host .item .info-wrapper .caption.slot-hidden{display:none}:host .item .info-wrapper .label .highlight-text,:host .item .info-wrapper .label ::slotted(*),:host .item .info-wrapper .caption .highlight-text,:host .item .info-wrapper .caption ::slotted(*){white-space:nowrap;text-overflow:ellipsis}:host .item .info-wrapper .label .highlight-wrapper,:host .item .info-wrapper .caption .highlight-wrapper{white-space:nowrap;text-overflow:ellipsis;overflow:hidden}:host .item .info-wrapper .label .highlight-wrapper .highlight,:host .item .info-wrapper .caption .highlight-wrapper .highlight{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);--wpp-typography-s-strong-font-weight:var(--li-highlight-font-weight)}:host .item ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color)}:host .item.non-interactive,:host .item.has-toggle{cursor:default}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-hover)}:host .item:hover:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle),:host .item:focus-visible{background-color:var(--li-bg-color-active);outline:none}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted([slot=right]),:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item:focus-visible ::slotted([slot=left]),:host .item:focus-visible ::slotted([slot=right]),:host .item:focus-visible .fallback-icon{color:var(--li-icon-color-active)}:host .item:active:not(.checked):not(.active):not(.loading-item):not(.non-interactive):not(.has-toggle) ::slotted(.wpp-icon[slot=left]),:host .item:focus-visible ::slotted(.wpp-icon[slot=left]){color:var(--li-left-icon-color-active)}:host .item.with-right-icon{padding:var(--li-with-right-icon-padding)}:host .item.checked:not(.non-interactive):not(.has-toggle),:host .item .multiple:not(.non-interactive):not(.has-toggle),:host .item .active:not(.non-interactive):not(.has-toggle){background-color:var(--li-bg-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);--wpp-typography-s-midi-font-weight:var(--li-label-text-font-weight-selected);--wpp-typography-s-body-line-height:var(--li-label-text-line-height);line-height:var(--li-label-text-line-height);color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .multiple:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight,:host .item .active:not(.non-interactive):not(.has-toggle) .info-wrapper .label .highlight-wrapper .highlight{color:var(--li-label-text-color-selected)}:host .item.checked:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item.checked:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .multiple:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .multiple:not(.non-interactive):not(.has-toggle) .fallback-icon,:host .item .active:not(.non-interactive):not(.has-toggle) ::slotted([slot=left]),:host .item .active:not(.non-interactive):not(.has-toggle) .fallback-icon{color:var(--li-left-icon-color-selected)}:host .item.multiple.checked:not(.non-interactive):hover .label{color:var(--li-label-text-color-selected-hover)}:host .item.multiple.checked:not(.non-interactive):active .label{color:var(--li-label-text-color-selected-active)}:host .item.with-caption{height:var(--li-with-caption-height)}:host .item.with-caption ::slotted(.wpp-action-button){margin-right:0}:host .item.with-caption .info-wrapper{-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}:host .item.with-caption .info-wrapper .caption{display:-ms-flexbox;display:flex;color:var(--li-caption-text-color)}:host .item.with-caption .info-wrapper .caption.slot-hidden{display:none}:host .item.with-caption.multiple .info-wrapper{-ms-flex-align:start;align-items:flex-start}:host .item.with-caption.multiple .info-wrapper .wpp-checkbox{margin-top:1px}:host .item.with-caption.multiple .right{height:100%;-ms-flex-align:start;align-items:flex-start;margin-top:4px}:host .item.with-caption.multiple .right ::slotted([slot=right].wpp-tag){margin-top:3px}:host .item.with-caption.multiple .right ::slotted([slot=right][type=s-body]){margin-top:4px}:host .item.disabled{background-color:transparent;pointer-events:none}:host .item.disabled .info-wrapper .label,:host .item.disabled .info-wrapper .caption{color:var(--li-text-color-disabled)}:host .item.disabled ::slotted([slot=left]),:host .item.disabled ::slotted([slot=right]),:host .item.disabled .fallback-icon{color:var(--li-icons-color-disabled)}:host .item.disabled ::slotted(.wpp-avatar[slot=left]){opacity:0.4}:host .item.disabled ::slotted(.wpp-tag[slot=right]){opacity:0.5}:host .item.disabled ::slotted([slot=right][type=s-body]){color:var(--li-right-text-color-disabled)}:host .item.disabled ::slotted(.wpp-action-button){--ab-inverted-icon-color:var(--li-icons-color-disabled);--ab-tertiary-icon-color:var(--li-icons-color-disabled);--ab-secondary-icon-color:var(--li-icons-color-disabled);--ab-primary-icon-color:var(--li-icons-color-disabled)}:host .item.loading-item{pointer-events:none}:host .item.link{text-decoration:none}:host .item .info-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host .item .info-wrapper .body-wrapper{min-width:0}:host .item .info-wrapper .label,:host .item .info-wrapper .caption{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host .item .wpp-checkbox,:host .item .left{margin-right:var(--li-left-wrapper-margin-right)}:host .item ::slotted(.wpp-action-button),:host .item ::slotted(.wpp-menu-context){margin-right:var(--li-right-wrapper-margin-right)}:host .item .label,:host .item .right,:host .item .left{display:-ms-flexbox;display:flex}:host .item .left.slot-hidden,:host .item .caption.slot-hidden,:host .item .right.slot-hidden{display:none}:host:host(.wpp-disabled){cursor:not-allowed}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item{background-color:var(--li-bg-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .wpp-checkbox{--checkbox-bg-color:var(--checkbox-bg-color-active);--checkbox-border-color:var(--checkbox-border-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=left]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item ::slotted([slot=right]),:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item .fallback-icon{color:var(--li-icon-color-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked{background-color:var(--wpp-primary-color-300)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .wpp-checkbox{--checkbox-bg-color-checked:var(--checkbox-bg-color-checked-active);--checkbox-border-color-checked:var(--checkbox-border-color-checked-active)}:host(:focus-visible:not(.wpp-disabled):not(.non-interactive)) .item.checked .info-wrapper .label{color:var(--li-label-text-color-selected-active)}:host(.wpp-hidden){display:none}:host(.wpp-mounted) .label .highlight-text,:host(.wpp-mounted) .label ::slotted(*),:host(.wpp-mounted) .caption .highlight-text,:host(.wpp-mounted) .caption ::slotted(*){overflow:hidden}.with-tooltip{width:100%}.with-tooltip::part(anchor){width:100%}:host(.wpp-loading){opacity:0}";

const WppListItem = /*@__PURE__*/ proxyCustomElement(class WppListItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChangeListItem = createEvent(this, "wppChangeListItem", 1);
    this.tooltipId = uuidv4();
    this.eventSource = null;
    this.hasRightSlotIcon = false;
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
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        caption: '[slot="caption"]',
        left: '[slot="left"]',
        right: '[slot="right"]',
        subtitle: '[slot="subtitle"]',
      });
      this.hasCaptionSlot = !emptyStates.caption;
      this.hasLeftSlot = !emptyStates.left;
      this.hasRightSlot = !emptyStates.right;
      this.hasSubtitleSlot = !emptyStates.subtitle;
      this.hasRightSlot && validateRightSlotContent(this.host, this.multiple);
      this.hasLeftSlot && validateLeftSlotContent(this.host, this.multiple);
    };
    this.handleItemClick = () => {
      if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
        this.eventSource = null;
        return;
      }
      if (this.disabled)
        return;
      if (this.selectable && !this.nonInteractive) {
        this.checked = !this.checked;
      }
      this.wppChangeListItem.emit({
        value: this.value,
        checked: this.checked,
        label: this.host.querySelector('[slot="label"]')?.textContent || '',
        target: this.host,
        isSelectBasedEvent: !!this.host.closest(transformToVersionedTag('wpp-select')),
        isAutocompleteBasedEvent: !!this.host.closest(transformToVersionedTag('wpp-autocomplete')),
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
    });
    this.renderBody = () => {
      const hasHighlight = Boolean(this.highlight);
      return (h("div", { ref: ref => (this.wrapperRef = ref), class: "body-wrapper", part: "body-wrapper", style: { width: 'auto' } }, h(WrappedSlot, { wrapperClass: this.labelSlotCssClasses(), name: "label", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "label highlight-text-wrapper", ref: highlightRef => (this.highlightRef = highlightRef) }, h("span", { class: "highlight-text" }, this.getHightlightedText('label')))), h(WrappedSlot, { wrapperClass: this.captionSlotCssClasses(), name: "caption", onSlotchange: this.updateSlotData }), hasHighlight && (h("div", { class: "caption" }, h("span", { class: "highlight-text" }, this.getHightlightedText('caption'))))));
    };
    this.renderRightSlot = () => (h(WrappedSlot, { wrapperClass: this.rightSlotCssClasses(), name: "right", onSlotchange: this.updateSlotData, onClick: this.handleRightWrapperClick }, this.isExtended && h("wpp-icon-chevron-v2-22-0", { class: "fallback-icon", size: "s", part: "icon-extended" }), !this.isExtended && this.active && h("wpp-icon-tick-v2-22-0", { class: "fallback-icon", part: "icon-active" })));
    this.renderLeftSlot = () => (h(WrappedSlot, { wrapperClass: this.leftSlotCssClasses(), name: "left", onSlotchange: this.updateSlotData }));
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
    this.value = undefined;
    this.label = '';
    this.checked = false;
    this.active = false;
    this.selectable = false;
    this.multiple = false;
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
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler();
    }
  }
  componentWillLoad() {
    this.updateSlotData();
    setTimeout(() => {
      this.hasRightSlotIcon = !!this.host.querySelector('[slot="right"].wpp-icon');
    }, 0);
    setTimeout(() => {
      this.hasToggle = !!this.host.querySelector('[slot="right"].wpp-toggle');
    }, 0);
    this.debouncedResizeHandler = debounce(() => {
      this.checkHasTooltip();
    }, 50);
  }
  componentDidLoad() {
    this.handleComponentMount();
  }
  disconnectedCallback() {
    this.tooltipId = uuidv4();
  }
  highlightUpdate(newValue) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || '';
    const chunks = highlightWords({
      text: captionText,
      query: newValue,
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
  getHightlightedText(slotName) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`);
    const slotText = slotEl?.textContent || '';
    const chunks = highlightWords({
      text: slotText,
      query: this.highlight,
      matchExactly: true,
    });
    if (this.highlight && chunks.some(el => el.match)) {
      return (h("span", { class: "highlight-wrapper" }, chunks.map(({ text, match }) => match && !this.disabled ? (h("span", { key: text, class: "highlight", part: "highlight" }, text)) : (h("span", { key: text }, text)))));
    }
    return slotText;
  }
  componentWillRender() {
    this.itemWrapper = this.linkConfig?.href ? 'a' : 'li';
  }
  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : '';
    return (h(Host, { class: this.hostCssClasses(), onClick: this.handleItemClick, role: this.isExtended ? MENU_BAR_ROLE : CONTEXT_ITEM_TAG, onMouseEnter: () => this.updateComponentState({ hover: true }), onMouseLeave: () => this.updateComponentState({ hover: false }), onMouseDown: () => this.updateComponentState({ active: true }), onMouseUp: () => this.updateComponentState({ active: false }), exportparts: "item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper", tabIndex: this.disabled ? -1 : 0 }, this.hasSubtitleSlot && (h(WrappedSlot, { wrapperClass: this.subtitleSlotCssClasses(), name: "subtitle", onSlotchange: this.updateSlotData })), h(this.itemWrapper, { class: this.itemWrapperCssClasses(), part: "item", ...(this.linkConfig?.href && this.linkConfig) }, h("div", { class: "info-wrapper", part: "info-wrapper" }, this.multiple ? (h("wpp-checkbox-v2-22-0", { disabled: this.disabled, checked: this.checked, internalState: displayState, index: -1, part: "checkbox", name: this.checkboxName && this.checkboxName })) : (h(Fragment, null, this.tooltipConfig.leftSlot ? (h("wpp-tooltip-v2-22-0", { key: this.tooltipId, header: this.tooltipConfig.leftSlot.header, text: this.tooltipConfig.leftSlot.text, value: this.tooltipConfig.leftSlot.value, error: this.tooltipConfig.leftSlot.error, theme: this.tooltipConfig.leftSlot.theme, config: this.tooltipConfig.leftSlot.config, externalClass: this.tooltipConfig.leftSlot.externalClass }, this.renderLeftSlot())) : (this.renderLeftSlot()))), this.hasTooltip ? (h("wpp-tooltip-v2-22-0", { text: this.getSlotText('label'), config: { placement: 'right', ...this.labelTooltipConfig }, class: "tooltip" }, this.renderBody())) : (this.renderBody())), this.tooltipConfig.rightSlot ? (h("wpp-tooltip-v2-22-0", { key: this.tooltipId, header: this.tooltipConfig.rightSlot.header, text: this.tooltipConfig.rightSlot.text, value: this.tooltipConfig.rightSlot.value, error: this.tooltipConfig.rightSlot.error, theme: this.tooltipConfig.rightSlot.theme, config: this.tooltipConfig.rightSlot.config, externalClass: this.tooltipConfig.rightSlot.externalClass }, this.renderRightSlot())) : (this.renderRightSlot()))));
  }
  static get registryIs() { return "wpp-list-item-v2-22-0"; }
  get host() { return this; }
  static get watchers() { return {
    "highlight": ["highlightUpdate"],
    "containerState": ["handleViewChange"]
  }; }
  static get style() { return wppListItemCss; }
}, [1, "wpp-list-item", "wpp-list-item-v2-22-0", {
    "value": [520],
    "label": [513],
    "checked": [1540],
    "active": [516],
    "selectable": [516],
    "multiple": [516],
    "disabled": [516],
    "highlight": [513],
    "containerState": [513, "container-state"],
    "isExtended": [516, "is-extended"],
    "tooltipConfig": [16],
    "labelTooltipConfig": [16],
    "linkConfig": [16],
    "hidden": [1540],
    "isLoadingItem": [516, "is-loading-item"],
    "nonInteractive": [1540, "non-interactive"],
    "checkboxName": [513, "checkbox-name"],
    "loading": [32],
    "mounted": [32],
    "hasCaptionSlot": [32],
    "hasLeftSlot": [32],
    "hasRightSlot": [32],
    "hasCaptionHighlight": [32],
    "hasTooltip": [32],
    "hasToggle": [32],
    "hasSubtitleSlot": [32],
    "componentState": [32]
  }, [[9, "resize", "onResize"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-list-item-v2-22-0", "wpp-action-button-v2-22-0", "wpp-checkbox-v2-22-0", "wpp-icon-chevron-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-icon-dash-v2-22-0", "wpp-icon-error-v2-22-0", "wpp-icon-info-message-v2-22-0", "wpp-icon-success-v2-22-0", "wpp-icon-tick-v2-22-0", "wpp-icon-warning-v2-22-0", "wpp-inline-message-v2-22-0", "wpp-internal-label-v2-22-0", "wpp-internal-tooltip-v2-22-0", "wpp-label-v2-22-0", "wpp-spinner-v2-22-0", "wpp-tooltip-v2-22-0", "wpp-typography-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-list-item-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppListItem);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-checkbox-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-chevron-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-dash-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-success-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-tick-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-warning-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-inline-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-internal-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-internal-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-label-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppListItem as W, defineCustomElement as d };
