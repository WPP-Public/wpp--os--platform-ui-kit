import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { g as getSlotEmptyStates } from './utils-d423b01f.js';
import './consts-5bf9c29f.js';

const wppExpandableCardCss = ":host{--expandable-card-width:var(--wpp-expandable-card-width, 640px);--expandable-card-actions-wrapper-left-margin:var(--wpp-expandable-card-actions-wrapper-left-margin, 10px);--expandable-card-border-radius:var(--wpp-expandable-card-border-radius, var(--wpp-border-radius-m));--expandable-card-box-shadow:var(--wpp-expandable-card-box-shadow, var(--wpp-box-shadow-s));--expandable-card-bg-color:var(--wpp-expandable-card-bg-color, var(--wpp-grey-color-000));--expandable-card-secondary-bg-color:var(--wpp-expandable-card-secondary-bg-color, var(--wpp-grey-color-100));--expandable-card-padding-s:var(--wpp-expandable-card-padding-s, 3px 4px 3px 12px);--expandable-card-padding-m:var(--wpp-expandable-card-padding-m, 8px 8px 8px 16px);--expandable-card-padding-l:var(--wpp-expandable-card-padding-l, 18px 16px 18px 24px);--expandable-card-padding-xl:var(--wpp-expandable-card-padding-xl, 24px 24px 24px 32px);--expandable-card-padding-2xl:var(--wpp-expandable-card-padding-2xl, 32px 32px 32px 40px);--expandable-card-accordion-padding-2xl:var(--wpp-expandable-card-padding-2xl, 32px 32px 32px 40px);--expandable-card-accordion-first-border-color-focus:var(\n    --wpp-expandable-card-accordion-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--expandable-card-accordion-second-border-color-focus:var(\n    --wpp-expandable-card-accordion-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--expandable-card-accordion-content-margin-s-internal:var(\n    --wpp-expandable-card-accordion-content-margin-s-internal,\n    3px 8px 9px 0px\n  );--expandable-card-accordion-content-margin-m-internal:var(\n    --wpp-expandable-card-accordion-content-margin-m-internal,\n    8px 8px 8px 0px\n  );--expandable-card-accordion-content-margin-l-internal:var(\n    --wpp-expandable-card-accordion-content-margin-l-internal,\n    18px 8px 6px 0px\n  );--expandable-card-accordion-content-margin-xl-internal:var(\n    --wpp-expandable-card-accordion-content-margin-xl-internal,\n    24px 8px 8px 0px\n  );--expandable-card-accordion-content-margin-2xl-internal:var(\n    --wpp-expandable-card-accordion-content-margin-2xl-internal,\n    32px 8px 8px 0px\n  );display:-ms-inline-flexbox;display:inline-flex;background-color:var(--expandable-card-bg-color);-webkit-box-shadow:var(--expandable-card-box-shadow);box-shadow:var(--expandable-card-box-shadow);border-radius:var(--expandable-card-border-radius);width:var(--expandable-card-width)}:host .body-container{width:100%;position:relative}:host .body-container .wpp-accordion{--accordion-expandable-section-margin-s-internal:var(--expandable-card-accordion-content-margin-s-internal);--accordion-expandable-section-margin-m-internal:var(--expandable-card-accordion-content-margin-m-internal);--accordion-expandable-section-margin-l-internal:var(--expandable-card-accordion-content-margin-l-internal);--accordion-expandable-section-margin-xl-internal:var(--expandable-card-accordion-content-margin-xl-internal);--accordion-expandable-section-margin-2xl-internal:var(--expandable-card-accordion-content-margin-2xl-internal)}:host .body-container .wpp-accordion::part(section).tab-focus{-webkit-box-shadow:0 0 0 5px var(--expandable-card-accordion-first-border-color-focus), 0 0 0 7px var(--expandable-card-accordion-second-border-color-focus);box-shadow:0 0 0 5px var(--expandable-card-accordion-first-border-color-focus), 0 0 0 7px var(--expandable-card-accordion-second-border-color-focus)}:host .body-container .wpp-accordion::part(title){overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host .body-container .actions{display:-ms-inline-flexbox;display:inline-flex}:host:host(.wpp-secondary){background:var(--expandable-card-secondary-bg-color);-webkit-box-shadow:none;box-shadow:none}:host:host(.wpp-size-s){padding:var(--expandable-card-padding-s)}:host:host(.wpp-size-m){padding:var(--expandable-card-padding-m)}:host:host(.wpp-size-l){padding:var(--expandable-card-padding-l)}:host:host(.wpp-size-xl){padding:var(--expandable-card-padding-xl)}:host:host(.wpp-size-2xl){padding:var(--expandable-card-padding-2xl)}";

const WppExpandableCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
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
    this.expanded = false;
    this.isExpanded = false;
    this.size = 's';
    this.header = '';
    this.variant = 'primary';
  }
  onExpandedChange(newValue) {
    // TODO: remove this in version 4.0.0
    this.isExpanded = newValue;
  }
  componentWillLoad() {
    if (this.expandedByDefault)
      this.expanded = true;
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onFocus: this.onFocus, onBlur: this.onBlur, exportparts: "expandable-card-body, accordion, section, title, icon, counter, divider, title-wrapper" }, h("div", { class: "body-container", part: "expandable-card-body" }, h("wpp-accordion-v3-3-0", { size: this.size, text: this.header, expanded: this.isExpanded, expandedByDefault: this.expandedByDefault, withDivider: false, onWppChange: this.onChange, part: "accordion" }, h("slot", null), h("slot", { name: "header", slot: "header", class: "header" }), h("slot", { name: "actions", slot: "actions", class: "actions" })))));
  }
  static get registryIs() { return "wpp-expandable-card-v3-3-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["onExpandedChange"]
  }; }
};
WppExpandableCard.style = wppExpandableCardCss;

export { WppExpandableCard as wpp_expandable_card };
