import { r as registerInstance, h, H as Host } from './index-9177bb6d.js';
import { T as TurndownService } from './turndown.browser.es-9f6d9c98.js';

const WppRichtextMarkdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.markdown = '';
    this.turndown = new TurndownService();
    this.value = undefined;
  }
  handleValueChange(newValue) {
    this.markdown = newValue ? this.turndown.turndown(newValue) : '';
  }
  connectedCallback() {
    this.handleValueChange(this.value);
  }
  render() {
    return (h(Host, null, h("wpp-quill-styles-v3-5-0", null), h("wpp-richtext-common-styles-v3-5-0", null), h("pre", { class: "richtext-markdown" }, this.markdown)));
  }
  static get registryIs() { return "wpp-richtext-markdown-v3-5-0"; }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
};

export { WppRichtextMarkdown as wpp_richtext_markdown };
