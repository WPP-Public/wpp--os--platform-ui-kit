'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');

const WppRichtextHtml = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
  }
  render() {
    const classes = `ql-container ql-wpp quill-view-html`;
    return (index.h(index.Host, null, index.h("wpp-quill-styles-v2-22-0", null), index.h("wpp-richtext-common-styles-v2-22-0", null), index.h("div", { class: classes }, index.h("div", { class: "ql-editor", innerHTML: this.value }))));
  }
  static get registryIs() { return "wpp-richtext-html-v2-22-0"; }
};

exports.wpp_richtext_html = WppRichtextHtml;
