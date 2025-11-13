import { r as registerInstance, h, H as Host } from './index-9177bb6d.js';

const wppMenuGroupCss = ":host{--menu-group-title-margin:var(--wpp-menu-group-title-margin, 8px 0 0px 8px);--menu-group-title-color:var(--wpp-menu-group-title-color, var(--wpp-grey-color-1000));--menu-group-divider-margin:var(--wpp-menu-group-divider-margin, 8px 0px 4px 0px)}.wpp-typography{display:-ms-flexbox;display:flex;margin:var(--menu-group-title-margin);color:var(--menu-group-title-color)}.wpp-divider{display:-ms-flexbox;display:flex;margin:var(--menu-group-divider-margin)}";

const WppMenuGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-menu-group': true,
    });
    this.header = undefined;
    this.withDivider = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "header, divider" }, this.header && (h("wpp-typography-v3-3-1", { type: "2xs-strong", part: "header" }, this.header)), h("slot", null), this.withDivider && h("wpp-divider-v3-3-1", { class: "slot-divider", part: "divider" })));
  }
  static get registryIs() { return "wpp-menu-group-v3-3-1"; }
};
WppMenuGroup.style = wppMenuGroupCss;

export { WppMenuGroup as wpp_menu_group };
