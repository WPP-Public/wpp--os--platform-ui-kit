import { r as registerInstance, h, H as Host } from './index-9177bb6d.js';

const WppRichtextHtml = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.value = undefined;
  }
  render() {
    const classes = `ql-container ql-wpp quill-view-html`;
    return (h(Host, null, h("wpp-quill-styles-v4-1-0", null), h("wpp-richtext-common-styles-v4-1-0", null), h("div", { class: classes, "data-testid": "richtext-editor-container" }, h("div", { class: "ql-editor", innerHTML: this.value, "data-testid": "richtext-editor" }))));
  }
  static get registryIs() { return "wpp-richtext-html-v4-1-0"; }
};

export { WppRichtextHtml as wpp_richtext_html };
