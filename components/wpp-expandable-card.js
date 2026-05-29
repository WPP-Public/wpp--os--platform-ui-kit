import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getSlotEmptyStates } from './utils.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
import { d as defineCustomElement$9 } from './wpp-accordion2.js';
import { d as defineCustomElement$8 } from './wpp-divider2.js';
import { d as defineCustomElement$7 } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$6 } from './wpp-icon-error2.js';
import { d as defineCustomElement$5 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$4 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppExpandableCardCss = ":host{--expandable-card-width:var(--wpp-expandable-card-width, 640px);--expandable-card-actions-wrapper-left-margin:var(--wpp-expandable-card-actions-wrapper-left-margin, 10px);--expandable-card-border-radius:var(--wpp-expandable-card-border-radius, var(--wpp-border-radius-m));--expandable-card-box-shadow:var(--wpp-expandable-card-box-shadow, var(--wpp-box-shadow-s));--expandable-card-bg-color:var(--wpp-expandable-card-bg-color, var(--wpp-grey-color-000));--expandable-card-secondary-bg-color:var(--wpp-expandable-card-secondary-bg-color, var(--wpp-grey-color-100));--expandable-card-padding-s:var(--wpp-expandable-card-padding-s, 3px 4px 3px 12px);--expandable-card-padding-m:var(--wpp-expandable-card-padding-m, 8px 8px 8px 16px);--expandable-card-padding-l:var(--wpp-expandable-card-padding-l, 18px 16px 18px 24px);--expandable-card-padding-xl:var(--wpp-expandable-card-padding-xl, 24px 24px 24px 32px);--expandable-card-padding-2xl:var(--wpp-expandable-card-padding-2xl, 32px 32px 32px 40px);--expandable-card-accordion-padding-2xl:var(--wpp-expandable-card-padding-2xl, 32px 32px 32px 40px);--expandable-card-accordion-first-border-color-focus:var(\n    --wpp-expandable-card-accordion-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--expandable-card-accordion-second-border-color-focus:var(\n    --wpp-expandable-card-accordion-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--expandable-card-accordion-content-margin-s-internal:var(\n    --wpp-expandable-card-accordion-content-margin-s-internal,\n    3px 8px 9px 0px\n  );--expandable-card-accordion-content-margin-m-internal:var(\n    --wpp-expandable-card-accordion-content-margin-m-internal,\n    8px 8px 8px 0px\n  );--expandable-card-accordion-content-margin-l-internal:var(\n    --wpp-expandable-card-accordion-content-margin-l-internal,\n    18px 8px 6px 0px\n  );--expandable-card-accordion-content-margin-xl-internal:var(\n    --wpp-expandable-card-accordion-content-margin-xl-internal,\n    24px 8px 8px 0px\n  );--expandable-card-accordion-content-margin-2xl-internal:var(\n    --wpp-expandable-card-accordion-content-margin-2xl-internal,\n    32px 8px 8px 0px\n  );display:-ms-inline-flexbox;display:inline-flex;background-color:var(--expandable-card-bg-color);-webkit-box-shadow:var(--expandable-card-box-shadow);box-shadow:var(--expandable-card-box-shadow);border-radius:var(--expandable-card-border-radius);width:var(--expandable-card-width)}:host .body-container{width:100%;position:relative}:host .body-container .wpp-accordion{--accordion-expandable-section-margin-s-internal:var(--expandable-card-accordion-content-margin-s-internal);--accordion-expandable-section-margin-m-internal:var(--expandable-card-accordion-content-margin-m-internal);--accordion-expandable-section-margin-l-internal:var(--expandable-card-accordion-content-margin-l-internal);--accordion-expandable-section-margin-xl-internal:var(--expandable-card-accordion-content-margin-xl-internal);--accordion-expandable-section-margin-2xl-internal:var(--expandable-card-accordion-content-margin-2xl-internal)}:host .body-container .wpp-accordion::part(section).tab-focus{-webkit-box-shadow:0 0 0 5px var(--expandable-card-accordion-first-border-color-focus), 0 0 0 7px var(--expandable-card-accordion-second-border-color-focus);box-shadow:0 0 0 5px var(--expandable-card-accordion-first-border-color-focus), 0 0 0 7px var(--expandable-card-accordion-second-border-color-focus)}:host .body-container .wpp-accordion::part(title){overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host .body-container .actions{display:-ms-inline-flexbox;display:inline-flex}:host:host(.wpp-secondary){background:var(--expandable-card-secondary-bg-color);-webkit-box-shadow:none;box-shadow:none}:host:host(.wpp-size-s){padding:var(--expandable-card-padding-s)}:host:host(.wpp-size-m){padding:var(--expandable-card-padding-m)}:host:host(.wpp-size-l){padding:var(--expandable-card-padding-l)}:host:host(.wpp-size-xl){padding:var(--expandable-card-padding-xl)}:host:host(.wpp-size-2xl){padding:var(--expandable-card-padding-2xl)}:host([data-wpp-theme=dark]){background-color:var(--wpp-grey-color-100)}";

const WppExpandableCard$1 = /*@__PURE__*/ proxyCustomElement(class WppExpandableCard extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
    };
    this.onChange = (event) => {
      this.wppChange.emit(event.detail);
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.wppBlur.emit(event);
    };
    this.hostCssClasses = () => ({
      'wpp-expandable-card': true,
      [`wpp-size-${this.size}`]: true,
      [`wpp-${this.variant}`]: true,
    });
    this.hasActionsSlot = false;
    this.headerMaxWidth = undefined;
    this.expandedByDefault = false;
    this.isExpanded = false;
    this.size = 's';
    this.variant = 'primary';
  }
  componentWillLoad() {
    if (this.expandedByDefault)
      this.isExpanded = true;
    this.updateSlotData();
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "expandable-card-body, accordion, section, title, icon, counter, divider, title-wrapper" }, h("div", { class: "body-container", part: "expandable-card-body" }, h("wpp-accordion-v4-1-0", { size: this.size, expanded: this.isExpanded, expandedByDefault: this.expandedByDefault, withDivider: false, onWppChange: this.onChange, part: "accordion" }, h("slot", null), h("slot", { name: "header", slot: "header", class: "header" }), h("slot", { name: "actions", slot: "actions", class: "actions" })))));
  }
  static get registryIs() { return "wpp-expandable-card-v4-1-0"; }
  get host() { return this; }
  static get style() { return wppExpandableCardCss; }
}, [1, "wpp-expandable-card", "wpp-expandable-card-v4-1-0", {
    "expandedByDefault": [1540, "expanded-by-default"],
    "isExpanded": [1028, "is-expanded"],
    "size": [1],
    "variant": [1],
    "hasActionsSlot": [32],
    "headerMaxWidth": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-expandable-card-v4-1-0", "wpp-accordion-v4-1-0", "wpp-divider-v4-1-0", "wpp-icon-chevron-v4-1-0", "wpp-icon-error-v4-1-0", "wpp-icon-warning-v4-1-0", "wpp-internal-tooltip-v4-1-0", "wpp-tooltip-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-expandable-card-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppExpandableCard$1);
      }
      break;
    case "wpp-accordion-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-divider-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-chevron-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-error-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppExpandableCard = WppExpandableCard$1;
const defineCustomElement = defineCustomElement$1;

export { WppExpandableCard, defineCustomElement };
