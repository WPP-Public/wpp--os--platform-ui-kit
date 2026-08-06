import { r as registerInstance, h, H as Host } from './index-93f63aaa.js';

const WppRichtextHtml = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
  }
  render() {
    const classes = `ql-container ql-wpp richtext-view-html`;
    return (h(Host, null, h("wpp-richtext-common-styles-v4-3-0", null), h("div", { class: classes, "data-testid": "richtext-editor-container" }, h("div", { class: "ql-editor", innerHTML: this.value, "data-testid": "richtext-editor" }))));
  }
  static get registryIs() { return "wpp-richtext-html-v4-3-0"; }
};

export { WppRichtextHtml as wpp_richtext_html };
