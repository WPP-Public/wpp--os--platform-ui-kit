'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WrappedSlot = require('./WrappedSlot-ab2104d8.js');
const utils = require('./utils-6189d8be.js');
require('./consts-779fd4ec.js');

const tooltipConfig = {
  placement: 'right',
  offset: [7.2, 4],
  popperOptions: {
    strategy: 'fixed',
  },
};

const wppNavSidebarItemCss = ":host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;outline:none;width:100%;--ns-item-height:var(--wpp-nav-sidebar-item-height, 32px);--ns-item-padding:var(--wpp-nav-sidebar-item-padding, 0 10px);--ns-item-margin:var(--wpp-nav-sidebar-item-margin, 8px 0 0 0);--ns-item-border-radius:var(--wpp-nav-sidebar-item-border-radius, var(--wpp-border-radius-s));--ns-item-label-paddings:var(--wpp-nav-sidebar-item-label-paddings, 8px 20px);--ns-item-label-text-color:var(--wpp-nav-sidebar-item-label-text-color, var(--wpp-text-color-info));--ns-item-label-text-color-hover:var(--wpp-nav-sidebar-item-label-text-color-hover, var(--wpp-text-color));--ns-item-label-text-color-pressed:var(--wpp-nav-sidebar-item-label-text-color-pressed, var(--wpp-text-color));--ns-item-label-text-color-active:var(--wpp-nav-sidebar-item-label-text-color-active, var(--wpp-text-color));--ns-item-expanded-label-text-color:var(--wpp-nav-sidebar-item-expanded-label-text-color, var(--wpp-text-color));--ns-item-expanded-icon-start-color:var(--wpp-nav-sidebar-item-expanded-icon-start-color, var(--wpp-text-color));--ns-item-submenu-width:var(--wpp-nav-sidebar-item-submenu-width, 224px);--ns-item-submenu-paddings:var(--wpp-nav-sidebar-item-submenu-paddings, 8px 18px);--ns-item-submenu-label-margin:var(--wpp-nav-sidebar-item-submenu-label-margin, 8px 0 8px 20px);--ns-item-nested-label-text-color:var(--wpp-nav-sidebar-item-nested-label-text-color, var(--wpp-text-color-info));--ns-item-nested-label-text-color-hover:var(--wpp-nav-sidebar-item-nested-label-text-color-hover, var(--wpp-text-color));--ns-item-nested-label-text-color-active:var(--wpp-nav-sidebar-item-nested-label-text-color-active, var(--wpp-text-color));--ns-item-nested-label-text-color-selected:var(--wpp-nav-sidebar-item-nested-label-text-color-selected, var(--wpp-text-color));--ns-item-nested-label-text-color-selected-hover:var(--wpp-nav-sidebar-item-nested-label-text-color-selected-hover, var(--wpp-text-color));--ns-item-nested-label-text-color-selected-active:var(--wpp-nav-sidebar-item-nested-label-text-color-selected-active, var(--wpp-text-color));--ns-item-nested-label-padding:var(--wpp-nav-sidebar-item-nested-label-padding, 0 0 0 20px);--ns-item-group-title-margin:var(--wpp-nav-sidebar-item-group-title-margin, 16px 0 0 12px);--ns-item-icons-color:var(--wpp-nav-sidebar-item-icons-color, var(--wpp-icon-color));--ns-item-icons-color-hover:var(--wpp-nav-sidebar-item-icons-color-hover, var(--wpp-icon-color-hover));--ns-item-icons-color-pressed:var(--wpp-nav-sidebar-item-icons-color-pressed, var(--wpp-icon-color-active));--ns-item-icons-active-color:var(--wpp-nav-sidebar-item-icons-active-color, var(--wpp-grey-color-1000));--ns-item-icons-active-color-hover:var(\n    --wpp-nav-sidebar-item-icons-active-color-hover,\n    var(--wpp-grey-color-1000)\n  );--ns-item-icons-active-color-pressed:var(\n    --wpp-nav-sidebar-item-icons-active-color-pressed,\n    var(--wpp-grey-color-1000)\n  );--ns-item-without-icon-start-padding:var(--wpp-nav-sidebar-item-without-icon-start-padding, 5px 12px);--ns-item-start-icon-color-selected-idle:var(--wpp-nav-sidebar-item-start-icon-color-selected-idle, var(--wpp-grey-color-900));--ns-item-start-icon-color-selected-active:var(--wpp-nav-sidebar-item-start-icon-color-selected-active, var(--wpp-grey-color-900));--ns-item-start-icon-color-unselected-active:var(--wpp-nav-sidebar-item-start-icon-color-unselected-active, var(--wpp-grey-color-900));--ns-item-start-icon-color-unselected-pressed:var(--wpp-nav-sidebar-item-start-icon-color-unselected-pressed, var(--wpp-grey-color-900));--ns-item-start-icon-color-unselected-hover:var(--wpp-nav-sidebar-item-start-icon-color-unselected-hover, var(--wpp-grey-color-800));--ns-item-start-icon-color-unselected:var(--wpp-nav-sidebar-item-start-icon-color-unselected, var(--wpp-grey-color-700))}:host(:focus-visible) .item{background-color:var(--wpp-grey-color-300)}:host(:focus-visible) .item ::slotted([slot=icon-start]),:host(:focus-visible) .item ::slotted([slot=icon-end]),:host(:focus-visible) .item .slot-icon-start-fallback{color:var(--ns-item-icons-color-pressed)}:host(:focus-visible) .item .label,:host(:focus-visible) .item .nested-label{color:var(--ns-item-label-text-color-active)}:host(:focus-visible) .item .label.open-nested-label{color:var(--ns-item-nested-label-text-color-selected-hover)}:host(:focus-visible) .item .extended-icon{color:var(--ns-item-icons-color-hover)}.wpp-tooltip{width:100%}.wpp-tooltip::part(anchor){display:block;width:100%}.slot-divider-fallback{margin:var(--ns-item-margin)}.item{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;height:var(--ns-item-height);margin:var(--ns-item-margin);padding:var(--ns-item-padding);text-decoration:none;border-radius:var(--ns-item-border-radius);cursor:pointer;gap:8px}.item .icon-end-wrapper{margin-left:auto}.item .icon-wrapper{display:-ms-flexbox;display:flex}.item .extended-icon{color:var(--ns-item-icons-color)}.item.active{background-color:var(--wpp-grey-color-300)}.item.active .label,.item.active .nested-label{color:var(--ns-item-label-text-color-active)}.item.active .label.open-nested-label{color:var(--ns-item-nested-label-text-color-selected)}.item.active ::slotted([slot=icon-start]),.item.active ::slotted([slot=icon-end]),.item.active .slot-icon-start-fallback{color:var(--ns-item-icons-active-color)}.item.active:hover{background-color:var(--wpp-grey-color-300)}.item.active:hover .label,.item.active:hover .nested-label{color:var(--ns-item-label-text-color-active)}.item.active:hover .label.open-nested-label{color:var(--ns-item-nested-label-text-color-selected-hover)}.item.active:hover .extended-icon{color:var(--ns-item-icons-color)}.item.active:hover ::slotted([slot=icon-start]),.item.active:hover ::slotted([slot=icon-end]),.item.active:hover .slot-icon-start-fallback{color:var(--ns-item-icons-active-color-hover)}.item.active:active{background-color:var(--wpp-grey-color-300)}.item.active:active .label,.item.active:active .nested-label{color:var(--ns-item-label-text-color-active)}.item.active:active .label.open-nested-label{color:var(--ns-item-nested-label-text-color-selected-active)}.item.active .extended-icon{color:var(--ns-item-icons-color)}.item.active.expanded ::slotted([slot=icon-start]){color:var(--ns-item-start-icon-color-selected-active)}.item.active ::slotted([slot=icon-start]),.item.active ::slotted([slot=icon-end]),.item.active .slot-icon-start-fallback{color:var(--ns-item-icons-active-color-pressed)}.item.active ::slotted([slot=icon-start]){color:var(--ns-item-start-icon-color-selected-idle)}.item:hover{background-color:var(--wpp-grey-color-200)}.item:hover .label{color:var(--ns-item-label-text-color-hover)}.item:hover .label.open-nested-label{color:var(--ns-item-nested-label-text-color-hover)}.item:hover .extended-icon{color:var(--ns-item-icons-color-hover)}.item:hover ::slotted([slot=icon-start]),.item:hover ::slotted([slot=icon-end]),.item:hover .slot-icon-start-fallback{color:var(--ns-item-icons-color-hover)}.item:hover ::slotted([slot=icon-start]){color:var(--ns-item-start-icon-color-unselected-hover)}.item:active{background-color:var(--wpp-grey-color-300)}.item:active .label{color:var(--ns-item-label-text-color-pressed)}.item:active .label.open-nested-label{color:var(--ns-item-nested-label-text-color-active)}.item:active .extended-icon{color:var(--ns-item-icons-color-pressed)}.item:active ::slotted([slot=icon-start]),.item:active ::slotted([slot=icon-end]),.item:active .slot-icon-start-fallback{color:var(--ns-item-icons-color-pressed)}.item:active ::slotted([slot=icon-start]){color:var(--ns-item-start-icon-color-unselected-pressed)}.item .label{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);-ms-flex-positive:1;flex-grow:1;overflow:auto;color:var(--ns-item-label-text-color);white-space:nowrap;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out}.item .label.open{overflow:initial}.item .label.nested-label{font-weight:500}.item .label.open-nested-label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);color:var(--ns-item-nested-label-text-color);padding:var(--ns-item-nested-label-padding)}.item .extended-icon{margin-left:auto}.item .wpp-icon-chevron{-webkit-transition:-webkit-transform 0.15s ease-out;transition:-webkit-transform 0.15s ease-out;transition:transform 0.15s ease-out;transition:transform 0.15s ease-out, -webkit-transform 0.15s ease-out}.item.expanded .wpp-icon-chevron{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.item.expanded .label{color:var(--ns-item-expanded-label-text-color)}.item.expanded ::slotted([slot=icon-start]),.item.expanded .slot-icon-start-fallback{color:var(--ns-item-expanded-icon-start-color)}.item.expanded ::slotted([slot=icon-start]){color:var(--ns-item-start-icon-color-unselected-active)}.item.without-icon-start:not(.nested){padding:var(--ns-item-without-icon-start-padding);margin:var(--ns-item-margin)}.item.without-icon-start:not(.nested) .label{margin:0}.item ::slotted([slot=icon-start]){color:var(--ns-item-start-icon-color-unselected)}.sub-items-wrapper{max-height:0;overflow:hidden;opacity:0;-webkit-transition:0.4s ease-in-out;transition:0.4s ease-in-out;pointer-events:none}.sub-items-wrapper .item-label{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0);margin:0;padding:var(--ns-item-label-paddings);color:var(--wpp-grey-color-800)}.sub-items-wrapper.expanded{max-height:100vh;opacity:1;pointer-events:initial}.sub-level-menu{width:var(--ns-item-submenu-width);max-height:100vh;padding:var(--ns-item-submenu-paddings);text-transform:capitalize;background-color:var(--wpp-grey-color-000);border-radius:var(--ns-item-border-radius);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);opacity:1;pointer-events:initial}.sub-level-menu .sub-level-menu-label{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0);margin:var(--ns-item-submenu-label-margin)}.group-title{font-size:var(--wpp-typography-2xs-strong-font-size, 10px);line-height:var(--wpp-typography-2xs-strong-line-height, 20px);letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0.5px);text-transform:var(--wpp-typography-2xs-strong-text-transform, uppercase);font-weight:var(--wpp-typography-2xs-strong-font-weight, 700);color:var(--wpp-typography-2xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-2xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-2xs-strong-letter-spacing, 0);margin:var(--ns-item-group-title-margin);color:var(--wpp-grey-color-700);opacity:1;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out}";

const WppNavSidebarItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClickSidebarItem = index.createEvent(this, "wppClickSidebarItem", 1);
    this.wppClickExpandedItem = index.createEvent(this, "wppClickExpandedItem", 1);
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        iconStart: '[slot="icon-start"]',
      });
      this.hasIconStartSlot = !emptyStates.iconStart;
    };
    this.handleClickLinkItem = (event) => {
      if (this.nativeLink)
        return;
      event.preventDefault();
      this.wppClickSidebarItem.emit({ label: this.label, path: this.path });
    };
    this.handleClickExpandedItem = () => {
      if (!this.extended)
        return;
      this.wppClickExpandedItem.emit({ label: this.label, path: this.path });
      this.expanded = !this.expanded;
    };
    this.navigationWrapperCssClasses = () => ({
      item: true,
      expanded: this.expanded,
      active: this.active,
      nested: this.nestedItem,
      'without-icon-start': !this.hasIconStartSlot,
    });
    this.labelCssClasses = () => ({
      label: true,
      open: true,
      'nested-label': this.nestedItem,
      'open-nested-label': this.nestedItem,
    });
    this.iconEndCssClasses = () => ({ 'icon-end-wrapper': true, 'icon-wrapper': true });
    this.subItemWrapperCssClasses = () => ({
      'sub-items-wrapper': true,
      expanded: this.expanded,
    });
    this.hostCssClasses = () => ({
      'wpp-nav-sidebar-item': true,
    });
    this.item = () => {
      const currentMaxLengthLabel = this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems;
      const isNeedTruncate = this.label.length > currentMaxLengthLabel;
      return (index.h(index.Fragment, null, index.h(WrappedSlot.WrappedSlot, { name: "icon-start", wrapperClass: "icon-wrapper", class: "slot-icon-start-fallback", onSlotchange: this.updateSlotData }), index.h("p", { class: this.labelCssClasses(), part: "label" }, isNeedTruncate
        ? utils.truncate(this.label, this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems)
        : this.label), index.h(WrappedSlot.WrappedSlot, { name: "icon-end", wrapperClass: this.iconEndCssClasses(), class: "slot-icon-end-fallback" }, this.extended && index.h("wpp-icon-chevron-v3-3-1", { class: "extended-icon", size: "m", part: "icon-chevron" }))));
    };
    this.extendedItem = () => (index.h("div", { class: this.navigationWrapperCssClasses(), onClick: this.handleClickExpandedItem, part: "extended-item" }, this.item()));
    this.linkItem = () => (index.h("a", { class: this.navigationWrapperCssClasses(), href: this.path, onClick: this.handleClickLinkItem, target: this.target, tabIndex: -1, part: "link-item" }, this.item()));
    this.renderSubItemsWrapper = () => index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.subItemWrapperCssClasses() });
    this.renderItemWithTooltip = () => (index.h("wpp-tooltip-v3-3-1", { text: this.label, config: tooltipConfig, part: "tooltip" }, this.extended ? this.extendedItem() : this.linkItem()));
    this.renderItem = () => {
      const currentMaxLengthLabel = this.extended ? this.maxTitleLengthWithSubItems : this.maxTitleLengthWithoutSubItems;
      const isNeedToTruncate = this.label.length > currentMaxLengthLabel;
      const isRenderItemWithTruncateTextWithTooltip = isNeedToTruncate;
      if (isRenderItemWithTruncateTextWithTooltip) {
        return (index.h(index.Fragment, null, this.renderItemWithTooltip(), this.renderSubItemsWrapper()));
      }
      return (index.h(index.Fragment, null, this.extended ? this.extendedItem() : this.linkItem(), this.renderSubItemsWrapper()));
    };
    this.hasIconStartSlot = false;
    this.expanded = false;
    this.extended = false;
    this.maxTitleLengthWithSubItems = 15;
    this.maxTitleLengthWithoutSubItems = 21;
    this.label = undefined;
    this.path = undefined;
    this.groupTitle = undefined;
    this.nestedItem = false;
    this.divide = false;
    this.active = false;
    this.nativeLink = undefined;
    this.target = undefined;
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  componentDidLoad() {
    this.host.querySelectorAll(utils.transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('nested-item', `${true}`);
      item.setAttribute('tabIndex', String(this.expanded ? 0 : -1));
    });
  }
  handleExpandedChange(newValue) {
    this.host.querySelectorAll(utils.transformToVersionedTag('wpp-nav-sidebar-item')).forEach(item => {
      item.setAttribute('tabIndex', String(newValue ? 0 : -1));
    });
  }
  render() {
    let hostProps = {};
    if (!this.nestedItem) {
      hostProps = { ...hostProps, tabIndex: 0 };
    }
    return (index.h(index.Host, { class: this.hostCssClasses(), ...hostProps, exportparts: "label, icon-chevron, extended-item, link-item, tooltip, title, divider, icon-start, icon-end, ws-inner, icon-start, icon-end, ws-wrapper" }, this.groupTitle && (index.h("p", { class: "group-title", part: "title" }, this.groupTitle)), this.renderItem(), this.divide && index.h("wpp-divider-v3-3-1", { class: "slot-divider-fallback", part: "divider" })));
  }
  static get registryIs() { return "wpp-nav-sidebar-item-v3-3-1"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "expanded": ["handleExpandedChange"]
  }; }
};
WppNavSidebarItem.style = wppNavSidebarItemCss;

exports.wpp_nav_sidebar_item = WppNavSidebarItem;
