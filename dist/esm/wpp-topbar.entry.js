import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { g as getSlotEmptyStates } from './utils-fb733700.js';
import { W as WrappedSlot } from './WrappedSlot-2ee5325a.js';
import { Z as Z_INDEX } from './consts-5bf9c29f.js';

const wppTopbarCss = ":host{--topbar-padding:var(--wpp-topbar-padding, 12px 0);--topbar-with-app-padding:var(--wpp-topbar-with-app-padding, 8px 0);--topbar-item-margin:var(--wpp-topbar-item-margin, 8px);--topbar-max-width:var(--wpp-topbar-max-width, 1812px);--topbar-offset-top:var(--wpp-topbar-offset-top, 64px);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:justify;justify-content:space-between;position:-webkit-sticky;position:sticky;top:var(--topbar-offset-top);background-color:var(--wpp-grey-color-000)}:host .wrapper{max-width:var(--topbar-max-width);width:95%;margin:0 auto;padding:0 2.5%}:host .wrapper .container{margin-left:0}:host .header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--topbar-padding)}:host .header .navigation{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;opacity:1}:host .header .navigation.hidden{height:32px;overflow-y:hidden;opacity:0}:host .header .navigation .wpp-topbar-item{white-space:nowrap}:host .header .navigation .wpp-topbar-item:not(:last-child){margin-right:var(--topbar-item-margin)}:host .header.without-application .application{display:none}:host .header.with-app{padding:var(--topbar-with-app-padding)}.app.slot-hidden,right.slot-hidden{display:none}";

const WppTopbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.getItemsWidth = () => {
      const navigationItemsElement = this.host.shadowRoot.querySelector('.navigation');
      const topbarItems = navigationItemsElement?.querySelectorAll('.wpp-topbar-item:not([is-menu])');
      if (!topbarItems)
        return;
      this.topbarItemsWidth = Array.from(topbarItems).map(item => Math.ceil(Number(getComputedStyle(item).width?.replace('px', '')) + parseInt(getComputedStyle(item)?.marginRight)));
    };
    this.getDisplayData = () => {
      const menuWidth = 32;
      const appWrapperWidth = this.host.shadowRoot.querySelector('[part="app-wrapper"]')
        ?.clientWidth;
      let width = appWrapperWidth + menuWidth;
      let amount = 0;
      const headerWidth = this.host.shadowRoot.querySelector('.header')?.clientWidth;
      while (amount < this.navigation.length && width + this.topbarItemsWidth[amount] < headerWidth) {
        width += this.topbarItemsWidth[amount];
        amount++;
      }
      this.truncated = amount < this.navigation.length;
      this.itemsToShow = amount;
    };
    this.topbarItemClick = (e) => {
      this.wppChange.emit(e.detail);
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        app: '[slot="app"]',
        right: '[slot="right"]',
      });
      this.hasAppSlot = !emptyStates.app;
      this.hasRightSlot = !emptyStates.right;
    };
    this.wrapperCssClasses = () => ({
      wrapper: true,
    });
    this.headerCssClasses = () => ({
      header: true,
      'with-app': this.hasAppSlot,
      'without-application': !this.hasAppSlot,
    });
    this.navigationCssClasses = () => ({
      navigation: true,
      hidden: this.topbarItemsWidth.length === 0,
    });
    this.hostCssClasses = () => ({
      'wpp-topbar': true,
    });
    this.truncated = false;
    this.itemsToShow = undefined;
    this.hasAppSlot = false;
    this.hasRightSlot = false;
    this.activeItems = [];
    this.topbarItemsWidth = [];
    this.navigation = undefined;
    this.value = undefined;
    this.nativeLink = false;
    this.zIndex = Z_INDEX.TOPBAR;
  }
  // @TODO: add property dropdownConfig
  navigationChanged(newNavigation) {
    this.itemsToShow = newNavigation.length;
    setTimeout(() => {
      this.getItemsWidth();
      this.getDisplayData();
    }, 40); // 40 ms have been added to display the topbar correctly in safari, firefox.
  }
  valueChanged(newValue) {
    const tree = {
      children: this.navigation,
    };
    requestAnimationFrame(() => {
      const data = this.findInTree(newValue, tree);
      if (data.path) {
        this.activeItems = data.path ? data.path.filter(item => item) : [];
      }
      else {
        this.activeItems = [];
      }
    });
  }
  findInTree(value, tree) {
    if (tree.value === value) {
      const path = [tree.value];
      return { result: tree, path };
    }
    else {
      const treeChildren = tree.children || [];
      for (const child of treeChildren) {
        const tmp = this.findInTree(value, child);
        if (Object.keys(tmp).length !== 0 && tmp.path) {
          tmp.path.unshift(tree.value);
          return tmp;
        }
      }
      return {};
    }
  }
  componentWillLoad() {
    this.itemsToShow = this.navigation.length;
    this.updateSlotData();
    this.valueChanged(this.value);
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.getItemsWidth();
      this.getDisplayData();
      if (this.resizeObserver) {
        this.resizeObserver.observe(this.host);
      }
    });
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.getItemsWidth();
        this.getDisplayData();
      });
    });
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const hiddenNavigation = {
      children: this.navigation.slice(this.itemsToShow),
    };
    const isMenuActive = !!hiddenNavigation.children?.find(item => this.activeItems.includes(item.value));
    return (h(Host, { class: this.hostCssClasses(), style: { zIndex: this.zIndex.toString() }, exportparts: "wrapper, body, navigation, topbar-item, divider, app, right, app-wrapper, right-wrapper" }, h("div", { class: this.wrapperCssClasses(), part: "wrapper" }, h("wpp-grid-v3-4-0", { container: true }, h("wpp-grid-v3-4-0", { item: true, all: 24 }, h("div", { class: this.headerCssClasses(), part: "body" }, h(WrappedSlot, { wrapperClass: { 'slot-hidden': !this.hasAppSlot }, name: "app", onSlotchange: this.updateSlotData }), h("nav", { class: this.navigationCssClasses(), key: this.itemsToShow, part: "navigation" }, this.navigation.slice(0, this.itemsToShow).map(navigation => (h("wpp-topbar-item-v3-4-0", { navigation: navigation, firstLevel: true, active: navigation.active, onWppActiveTopbarItemChange: this.topbarItemClick, activeItems: this.activeItems, nativeLink: this.nativeLink, part: "topbar-item" }))), this.truncated && (h("wpp-topbar-item-v3-4-0", { key: this.value, navigation: hiddenNavigation, firstLevel: true, menu: true, active: isMenuActive, onWppActiveTopbarItemChange: this.topbarItemClick, activeItems: this.activeItems, nativeLink: this.nativeLink, part: "topbar-item" }))), h(WrappedSlot, { wrapperClass: { 'slot-hidden': !this.hasRightSlot }, name: "right", onSlotchange: this.updateSlotData }))))), h("wpp-divider-v3-4-0", { part: "divider" })));
  }
  static get registryIs() { return "wpp-topbar-v3-4-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "navigation": ["navigationChanged"],
    "value": ["valueChanged"]
  }; }
};
WppTopbar.style = wppTopbarCss;

export { WppTopbar as wpp_topbar };
