import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconHdr$1 = /*@__PURE__*/ proxyCustomElement(class WppIconHdr extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-hdr", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M15.4 3C16.8359 3 18 4.16406 18 5.6V14.0021C18 15.438 16.8359 16.6021 15.4 16.6021H4.6C3.16406 16.6021 2 15.438 2 14.0021V5.6C2 4.16406 3.16406 3 4.6 3H15.4ZM15.4 4.2H4.6C3.8268 4.2 3.2 4.8268 3.2 5.6V14.0021C3.2 14.7753 3.8268 15.4021 4.6 15.4021H15.4C16.1732 15.4021 16.8 14.7753 16.8 14.0021V5.6C16.8 4.8268 16.1732 4.2 15.4 4.2ZM7.10277 7.39409C7.35381 7.39409 7.56164 7.5791 7.59735 7.8202L7.60277 7.89409V11.6956C7.60277 11.9717 7.37891 12.1956 7.10277 12.1956C6.85173 12.1956 6.6439 12.0106 6.60819 11.7695L6.60277 11.6956L6.60228 10.3085H5.41748V11.7094C5.41748 11.9855 5.19363 12.2094 4.91748 12.2094C4.66644 12.2094 4.45862 12.0244 4.4229 11.7833L4.41748 11.7094V7.90788C4.41748 7.63173 4.64134 7.40788 4.91748 7.40788C5.16852 7.40788 5.37635 7.59288 5.41206 7.83399L5.41748 7.90788V9.30849H6.60228L6.60277 7.89409C6.60277 7.61795 6.82663 7.39409 7.10277 7.39409ZM14.1609 7.4121C14.9582 7.4121 15.6044 8.05838 15.6044 8.8556C15.6044 9.34988 15.356 9.78614 14.9772 10.0463L15.5682 11.513C15.6714 11.7691 15.5475 12.0604 15.2913 12.1636C15.0608 12.2565 14.8018 12.1654 14.6771 11.9595L14.6407 11.8867L14.0005 10.2985L13.4068 10.2988L13.4073 11.6999C13.4073 12.304 12.5857 12.3608 12.4319 11.8693L12.4134 11.7872L12.4073 11.7004L12.4029 7.91269C12.4026 7.66144 12.5877 7.4533 12.829 7.41753L12.9029 7.4121H14.1609ZM9.50033 7.40437C10.6155 7.40437 11.5277 8.27364 11.5962 9.37157L11.6003 9.50437V10.0977C11.6003 11.2129 10.7311 12.125 9.63313 12.1936L9.50033 12.1977H8.89967C8.64864 12.1977 8.44081 12.0127 8.4051 11.7716L8.39967 11.6977V7.90437C8.39967 7.65333 8.58468 7.44551 8.82579 7.40979L8.89967 7.40437H9.50033ZM9.50033 8.40437H9.3992V11.1972L9.50033 11.1977C10.0721 11.1977 10.542 10.7614 10.5953 10.2036L10.6003 10.0977V9.50437C10.6003 8.9326 10.1641 8.4627 9.60626 8.4094L9.50033 8.40437ZM13.4036 8.41157L13.4044 9.29877L14.1609 9.2991C14.4059 9.2991 14.6044 9.10054 14.6044 8.8556C14.6044 8.63516 14.4436 8.45228 14.2329 8.41791L14.1609 8.4121L13.4036 8.41157Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-hdr-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-hdr", "wpp-icon-hdr-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-hdr-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-hdr-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconHdr$1);
      }
      break;
  } });
}

const WppIconHdr = WppIconHdr$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconHdr, defineCustomElement };
