import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPrivateAccount$1 = /*@__PURE__*/ proxyCustomElement(class WppIconPrivateAccount extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-private-account", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.6 11.5994C15.5664 11.5994 16.3549 12.3614 16.3972 13.3174L16.3966 13.3994H9.99692L9.99655 12.7986L5.3991 12.7994C5.06825 12.7994 4.80003 13.0676 4.80003 13.3984V13.8605C4.80003 14.2891 4.95291 14.7035 5.23118 15.0294C6.23378 16.2035 7.8064 16.8001 9.99692 16.8001V16.1992L15.3103 16.2C14.0617 17.4047 12.2787 18 9.99692 18C7.48037 18 5.57166 17.2759 4.31868 15.8086C3.8549 15.2655 3.6001 14.5747 3.6001 13.8605V13.3984C3.6001 12.4049 4.40554 11.5994 5.3991 11.5994H14.6ZM15.9727 15.4002L9.99692 15.3993V14.1993L16.3796 14.1995C16.331 14.6248 16.192 15.0341 15.9727 15.4002ZM9.99692 2C11.3054 2 12.4672 2.62834 13.1969 3.59976L9.99692 3.59991V3.19994C8.45061 3.19994 7.19707 4.45347 7.19707 5.99979C7.19707 7.5461 8.45061 8.79964 9.99692 8.79964V8.39966L13.1963 8.40062C12.4666 9.37158 11.3051 9.99957 9.99692 9.99957C7.7879 9.99957 5.99714 8.20881 5.99714 5.99979C5.99714 3.79076 7.7879 2 9.99692 2ZM13.9769 6.40033C13.9349 6.8231 13.827 7.22649 13.6637 7.60013L9.99692 7.5997V6.39976L13.9769 6.40033ZM13.6641 4.40024C13.8273 4.77388 13.935 5.17728 13.977 5.60005L9.99692 5.59981V4.39987L13.6641 4.40024Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-private-account-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-private-account", "wpp-icon-private-account-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-private-account-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-private-account-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconPrivateAccount$1);
      }
      break;
  } });
}

const WppIconPrivateAccount = WppIconPrivateAccount$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconPrivateAccount, defineCustomElement };
