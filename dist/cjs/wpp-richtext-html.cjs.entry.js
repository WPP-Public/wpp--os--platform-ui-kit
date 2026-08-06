'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');

const WppRichtextHtml = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
  }
  render() {
    const classes = `ql-container ql-wpp richtext-view-html`;
    return (index.h(index.Host, null, index.h("wpp-richtext-common-styles-v4-3-0", null), index.h("div", { class: classes, "data-testid": "richtext-editor-container" }, index.h("div", { class: "ql-editor", innerHTML: this.value, "data-testid": "richtext-editor" }))));
  }
  static get registryIs() { return "wpp-richtext-html-v4-3-0"; }
};

exports.wpp_richtext_html = WppRichtextHtml;
