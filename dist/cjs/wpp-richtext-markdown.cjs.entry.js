'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const turndown_browser_es = require('./turndown.browser.es-40bb3069.js');

const WppRichtextMarkdown = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.markdown = '';
    this.turndown = new turndown_browser_es.TurndownService();
    this.value = undefined;
  }
  handleValueChange(newValue) {
    this.markdown = newValue ? this.turndown.turndown(newValue) : '';
  }
  connectedCallback() {
    this.handleValueChange(this.value);
  }
  render() {
    return (index.h(index.Host, null, index.h("wpp-quill-styles-v4-0-0", null), index.h("wpp-richtext-common-styles-v4-0-0", null), index.h("pre", { class: "richtext-markdown" }, this.markdown)));
  }
  static get registryIs() { return "wpp-richtext-markdown-v4-0-0"; }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
};

exports.wpp_richtext_markdown = WppRichtextMarkdown;
