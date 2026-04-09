import { r as registerInstance, h, H as Host } from './index-9177bb6d.js';

const wppIconButtonCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host([disabled]:not([disabled=false]):active),:host([loading]:not([loading=false]):active){pointer-events:none}";

const WppIconButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-icon-button': true,
    });
    this.size = 'm';
    this.disabled = false;
    this.loading = false;
    this.name = undefined;
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-button component is deprecated. Please, use wpp-action-button instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner" }, h("wpp-button-v3-6-0", { variant: "secondary", size: this.size, disabled: this.disabled, loading: this.loading, name: this.name, "data-testid": "wppIconButton", part: "wrapper" }, h("slot", { slot: "icon-start", part: "inner" }))));
  }
  static get registryIs() { return "wpp-icon-button-v3-6-0"; }
};
WppIconButton.style = wppIconButtonCss;

export { WppIconButton as wpp_icon_button };
