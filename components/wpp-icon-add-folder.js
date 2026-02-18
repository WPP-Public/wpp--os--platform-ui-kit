import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAddFolder$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAddFolder extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-add-folder", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.54163 5.20825C1.54163 4.10362 2.437 3.20825 3.54163 3.20825H6.68829C7.25372 3.20825 7.80109 3.40641 8.23544 3.76827L8.23555 3.76837L10.0632 5.29159H16.4583C17.5629 5.29159 18.4583 6.18695 18.4583 7.29158V14.7916C18.4583 15.8962 17.5629 16.7916 16.4583 16.7916H3.54163C2.437 16.7916 1.54163 15.8962 1.54163 14.7916V5.20825ZM3.54163 4.70825C3.26542 4.70825 3.04163 4.93205 3.04163 5.20825V14.7916C3.04163 15.0678 3.26542 15.2916 3.54163 15.2916H16.4583C16.7345 15.2916 16.9583 15.0678 16.9583 14.7916V7.29158C16.9583 7.01538 16.7345 6.79159 16.4583 6.79159H9.79163C9.61616 6.79159 9.44624 6.73006 9.31145 6.61772L7.27532 4.92073L7.2752 4.92064C7.1104 4.78339 6.90282 4.70825 6.68829 4.70825H3.54163ZM6.75 11.0391C6.75 10.6248 7.08579 10.2891 7.5 10.2891H9.25V8.53906C9.25 8.12485 9.58579 7.78906 10 7.78906C10.4142 7.78906 10.75 8.12485 10.75 8.53906V10.2891H12.5C12.9142 10.2891 13.25 10.6248 13.25 11.0391C13.25 11.4533 12.9142 11.7891 12.5 11.7891H10.75V13.5391C10.75 13.9533 10.4142 14.2891 10 14.2891C9.58579 14.2891 9.25 13.9533 9.25 13.5391V11.7891H7.5C7.08579 11.7891 6.75 11.4533 6.75 11.0391Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-add-folder-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-add-folder", "wpp-icon-add-folder-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-add-folder-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-add-folder-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAddFolder$1);
      }
      break;
  } });
}

const WppIconAddFolder = WppIconAddFolder$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAddFolder, defineCustomElement };
