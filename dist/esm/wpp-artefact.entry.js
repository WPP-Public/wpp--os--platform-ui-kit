import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-3463d13f.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-2f801cf6.js';
import './consts-744c144f.js';

const getArtefactActions = (locales) => [
  { icon: 'wpp-icon-copy', label: locales.duplicateAction },
  { icon: 'wpp-icon-download', label: locales.downloadAction },
  { icon: 'wpp-icon-trash', label: locales.deleteAction },
];
const MAXIMUM_ARTEFACT_HEIGHT = 1200;
const LOCALES_DEFAULTS = {
  duplicateAction: 'Copy',
  downloadAction: 'Download',
  deleteAction: 'Delete',
  pinAction: 'Pin',
};

const wppArtefactCss = ".sc-wpp-artefact-h{display:inline-block}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact{border-radius:var(--wpp-border-radius-l);background-color:var(--wpp-grey-color-000);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s)}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact:hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.sc-wpp-artefact-h .artefact-wrapper.is-selected.sc-wpp-artefact{border:1px solid var(--wpp-primary-color-500)}.sc-wpp-artefact-h .artefact-wrapper.is-selected.sc-wpp-artefact .artefact-body.sc-wpp-artefact{min-height:149px;max-height:1068px}.sc-wpp-artefact-h .artefact-wrapper.size-xs.sc-wpp-artefact{width:280px}.sc-wpp-artefact-h .artefact-wrapper.size-s.sc-wpp-artefact{width:440px}.sc-wpp-artefact-h .artefact-wrapper.size-m.sc-wpp-artefact{width:600px}.sc-wpp-artefact-h .artefact-wrapper.size-l.sc-wpp-artefact{width:760px}.sc-wpp-artefact-h .artefact-wrapper.size-xl.sc-wpp-artefact{width:1200px}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-header.sc-wpp-artefact{padding:16px;height:32px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;gap:4px;-webkit-box-sizing:content-box;box-sizing:content-box}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-header.sc-wpp-artefact .artefact-icon-container.sc-wpp-artefact{height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;padding:6px}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-header.sc-wpp-artefact .artefact-icon-container.sc-wpp-artefact .wpp-icon.sc-wpp-artefact{color:var(--wpp-grey-color-800)}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-header.sc-wpp-artefact .title-tooltip.sc-wpp-artefact{width:100%;overflow:hidden}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-header.sc-wpp-artefact .title-tooltip.sc-wpp-artefact::part(anchor){width:100%}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-header.sc-wpp-artefact .artefact-title.sc-wpp-artefact{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-body.sc-wpp-artefact{width:100%;min-height:151px;max-height:1070px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:16px 6px 16px 16px;overflow-y:auto;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-body.sc-wpp-artefact::-webkit-scrollbar{width:4px;height:4px}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-body.sc-wpp-artefact::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact .artefact-actions.sc-wpp-artefact{padding:16px;display:-ms-flexbox;display:flex;-ms-flex-pack:start;justify-content:flex-start;gap:4px}[data-wpp-theme=dark].sc-wpp-artefact-h .artefact-wrapper.sc-wpp-artefact{background-color:var(--wpp-grey-color-100)}";

const WppArtefact = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppActionClick = createEvent(this, "wppActionClick", 7);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.resizeObserver = undefined;
    this.titleRef = undefined;
    this._locales = LOCALES_DEFAULTS;
    this.updateDropdownActions = () => {
      if (this.withPinAction) {
        const pinIndex = Math.min(Math.max(this.pinActionPosition, 0), this.actions.length);
        this.dropdownActions = [
          ...this.actions.slice(0, pinIndex),
          { icon: 'wpp-icon-unpinned', label: this._locales.pinAction },
          ...this.actions.slice(pinIndex),
        ];
      }
      else {
        this.dropdownActions = [...this.actions];
      }
    };
    this.handleActionClick = (action) => {
      this.wppActionClick.emit(action);
    };
    this.getArtefactWrapperClasses = () => ({
      'artefact-wrapper': true,
      [`size-${this.size}`]: true,
      'is-selected': this.isSelected,
    });
    this.defaultActions = [];
    this.dropdownActions = [];
    this.hasScrollbar = false;
    this.size = 'xs';
    this.artefactTitle = 'Title';
    this.actions = [];
    this.withPinAction = true;
    this.pinActionPosition = 0;
    this.locales = {};
    this.titleIcon = undefined;
    this.isSelected = false;
    this.ariaProps = {
      label: 'Open node actions',
    };
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...LOCALES_DEFAULTS, ...newLocales };
    this.defaultActions = getArtefactActions(this._locales);
    this.updateDropdownActions();
  }
  onUpdatePinAction() {
    this.updateDropdownActions();
  }
  connectedCallback() {
    this.themeSubscription.start();
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // We subtract 1 pixel from the maximum height of the artefact to account for the divider which has a height of 1 pixel. This way, when
        // the scrollbar appears, a divider will be added and the total height of the artefact will not exceed the maximum height defined in the design system.
        this.hasScrollbar = entry.contentRect.height >= MAXIMUM_ARTEFACT_HEIGHT - 1;
      }
    });
    this.resizeObserver.observe(this.host);
  }
  componentWillLoad() {
    this._locales = { ...LOCALES_DEFAULTS, ...this.locales };
    this.defaultActions = getArtefactActions({ ...LOCALES_DEFAULTS, ...this._locales });
    this.updateDropdownActions();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.resizeObserver = undefined;
  }
  render() {
    return (h(Host, { class: "wpp-artefact" }, h("div", { class: this.getArtefactWrapperClasses() }, h("div", { class: "artefact-header" }, this.titleIcon && h("div", { class: "artefact-icon-container" }, h(transformToVersionedTag(this.titleIcon))), h("wpp-tooltip-v4-1-0", { text: this.artefactTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef)
            return false;
          if (this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "artefact-title" }, this.artefactTitle))), h("wpp-divider-v4-1-0", null), h("div", { class: "artefact-body" }, h("slot", { name: "body" })), this.hasScrollbar && h("wpp-divider-v4-1-0", null), h("div", { class: "artefact-actions" }, this.defaultActions.map((action) => (h("wpp-tooltip-v4-1-0", { text: action.label, key: action.label, config: { placement: 'bottom' } }, h("wpp-action-button-v4-1-0", { variant: "secondary", onClick: () => this.handleActionClick(action), ariaProps: { label: action.label } }, h(transformToVersionedTag(action.icon), { slot: 'icon-start' }))))), this.dropdownActions.length > 0 && (h("wpp-menu-context-v4-1-0", { appendToListWrapper: true }, h("wpp-action-button-v4-1-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this.ariaProps.label } }, h("wpp-icon-more-v4-1-0", { slot: "icon-start" })), h("div", null, this.dropdownActions.map((action) => (h("wpp-list-item-v4-1-0", { key: action.label, onWppChangeListItem: () => this.handleActionClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))))), h("slot", { name: "handles" }))));
  }
  static get registryIs() { return "wpp-artefact-v4-1-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "locales": ["onUpdateLocales"],
    "withPinAction": ["onUpdatePinAction"],
    "pinActionPosition": ["onUpdatePinAction"],
    "actions": ["onUpdatePinAction"]
  }; }
};
WppArtefact.style = wppArtefactCss;

export { WppArtefact as wpp_artefact };
