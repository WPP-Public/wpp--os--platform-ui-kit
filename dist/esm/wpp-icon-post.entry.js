import { r as registerInstance, h } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPost = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-post", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.41872 6.27981C3.41872 5.5835 3.98349 5.01873 4.6798 5.01873H15.3202C16.0165 5.01873 16.5813 5.5835 16.5813 6.27981V6.64511L10.0002 10.2025L3.41872 6.64492V6.27981ZM3.41872 8.25764V13.7675C3.41872 14.4638 3.98349 15.0286 4.6798 15.0286H15.3202C16.0165 15.0286 16.5813 14.4638 16.5813 13.7675V8.25783L10.3375 11.6329C10.127 11.7466 9.87335 11.7466 9.66287 11.6329L3.41872 8.25764ZM4.6798 3.60001C3.19996 3.60001 2 4.79996 2 6.27981V13.7675C2 15.2473 3.19996 16.4473 4.6798 16.4473H15.3202C16.8 16.4473 18 15.2473 18 13.7675V6.27981C18 4.79996 16.8 3.60001 15.3202 3.60001H4.6798Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-post-v3-4-0"; }
};
WppIconPost.style = wppIconCss;

export { WppIconPost as wpp_icon_post };
