import { r as registerInstance, h, H as Host } from './index-93f63aaa.js';
import { P as PRESENTATION_ROLE, G as GROUP_ROLE } from './constants-28e0b02e.js';

const wppMenuGroupCss = ":host{--menu-group-title-margin:var(--wpp-menu-group-title-margin, 8px 0 0px 8px);--menu-group-title-color:var(--wpp-menu-group-title-color, var(--wpp-grey-color-1000));--menu-group-divider-margin:var(--wpp-menu-group-divider-margin, 8px 0px 4px 0px)}.wpp-typography{display:-ms-flexbox;display:flex;margin:var(--menu-group-title-margin);color:var(--menu-group-title-color)}.wpp-divider{display:-ms-flexbox;display:flex;margin:var(--menu-group-divider-margin)}";

const WppMenuGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-menu-group': true,
    });
    this.getRole = () => (this.withDivider && !this.header ? PRESENTATION_ROLE : GROUP_ROLE);
    this.header = undefined;
    this.withDivider = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: this.getRole(), "aria-label": this.header, exportparts: "header, divider" }, this.header && (h("wpp-typography-v4-3-0", { type: "2xs-strong", part: "header" }, this.header)), h("slot", null), this.withDivider && h("wpp-divider-v4-3-0", { class: "slot-divider", part: "divider" })));
  }
  static get registryIs() { return "wpp-menu-group-v4-3-0"; }
};
WppMenuGroup.style = wppMenuGroupCss;

export { WppMenuGroup as wpp_menu_group };
