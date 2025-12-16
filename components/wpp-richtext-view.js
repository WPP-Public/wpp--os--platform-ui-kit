import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { f as formats, s as sources, p as processMarkdownValue, t as turndownService, Q as Quill } from './config.js';
import { d as defineCustomElement$3 } from './wpp-quill-styles2.js';
import { d as defineCustomElement$2 } from './wpp-richtext-common-styles2.js';

const WppRichtextView$1 = /*@__PURE__*/ proxyCustomElement(class WppRichtextView extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.value = undefined;
    this.format = formats.html;
    this.debug = 'warn';
    this.formats = undefined;
    this.modules = undefined;
    this.strict = true;
    this.styles = '{}';
    this.preserveWhitespace = true;
    this.name = undefined;
  }
  setValue(value) {
    if (this.format === formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, sources.api);
    }
    else if (this.format === formats.markdown) {
      const { html } = processMarkdownValue(value);
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, sources.api);
      // Quill's clipboard.convert adds extra empty <p><br></p> before lists when preceded by a <p> tag
      // We need to remove these, but KEEP <p>&nbsp;</p> which are intentional blank lines
      const lists = this.quill.root.querySelectorAll('ol, ul');
      lists.forEach(list => {
        const prevElement = list.previousElementSibling;
        if (prevElement && prevElement.tagName === 'P') {
          const content = prevElement.innerHTML.trim();
          if (content === '<br>' || content === '') {
            prevElement.remove();
          }
        }
      });
      // Clean up empty list items that may have been created
      const emptyListItems = this.quill.root.querySelectorAll('li');
      let removedCount = 0;
      emptyListItems.forEach(li => {
        const liContent = li.innerHTML.trim();
        if (liContent === '<br>' || liContent === '') {
          li.remove();
          removedCount++;
        }
      });
      if (removedCount > 0) {
        this.quill.update(sources.api);
      }
    }
    else if (this.format === formats.text) {
      this.quill.setText(value, sources.api);
    }
    else if (this.format === formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), sources.api);
      }
      catch (_) {
        this.quill.setText(value, sources.api);
      }
    }
    else {
      this.quill.setText(value, sources.api);
    }
  }
  getValue() {
    const text = this.quill.getText();
    const content = this.quill.getContents();
    let html = this.containerElement.children[0].innerHTML || '';
    if (html === '<p><br></p>' || html === '<div><br></div>') {
      html = '';
    }
    if (this.format === 'html') {
      return html;
    }
    else if (this.format === 'markdown') {
      // Convert the rendered HTML back to Markdown
      return turndownService.turndown(html);
    }
    else if (this.format === 'text') {
      return text;
    }
    else if (this.format === 'json') {
      try {
        return JSON.stringify(content);
      }
      catch (_) {
        return text;
      }
    }
    else {
      return text;
    }
  }
  componentDidLoad() {
    const modules = this.modules ? JSON.parse(this.modules) : { toolbar: false };
    if (modules.toolbar)
      modules.toolbar = false;
    this.quill = new Quill(this.containerElement, {
      debug: this.debug,
      modules,
      readOnly: true,
      theme: 'wpp',
      formats: this.formats,
      strict: this.strict,
    });
    if (this.styles) {
      const styles = JSON.parse(this.styles);
      Object.keys(styles).forEach((key) => {
        this.containerElement?.style.setProperty(key, styles[key]);
      });
    }
    this.containerElement?.classList.add('quill-view');
    if (this.value) {
      this.setValue(this.value);
      this.quill['history'].clear();
    }
  }
  updateStyle(newValue, oldValue) {
    if (!this.containerElement) {
      return;
    }
    if (oldValue) {
      const old = JSON.parse(oldValue);
      Object.keys(old).forEach((key) => {
        this.containerElement?.style.setProperty(key, '');
      });
    }
    if (newValue) {
      const value = JSON.parse(newValue);
      Object.keys(value).forEach((key) => {
        this.containerElement?.style.setProperty(key, value[key]);
      });
    }
  }
  updateContent(newValue) {
    const value = this.getValue();
    if (Object.values(formats).indexOf(this.format) > -1 && newValue === value) {
      return null;
    }
    else {
      let changed = false;
      try {
        const newContentString = JSON.stringify(newValue);
        changed = JSON.stringify(value) !== newContentString;
      }
      catch {
        return null;
      }
      if (!changed) {
        return null;
      }
    }
    this.setValue(newValue);
  }
  render() {
    return (h(Host, null, h("wpp-quill-styles-v3-4-0", null), h("wpp-richtext-common-styles-v3-4-0", null), h("div", { ref: (el) => (this.containerElement = el) })));
  }
  static get registryIs() { return "wpp-richtext-view-v3-4-0"; }
  get host() { return this; }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
}, [0, "wpp-richtext-view", "wpp-richtext-view-v3-4-0", {
    "value": [1537],
    "format": [1537],
    "debug": [1],
    "formats": [16],
    "modules": [1025],
    "strict": [4],
    "styles": [1025],
    "preserveWhitespace": [1540, "preserve-whitespace"],
    "name": [513]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-richtext-view-v3-4-0", "wpp-quill-styles-v3-4-0", "wpp-richtext-common-styles-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-richtext-view-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRichtextView$1);
      }
      break;
    case "wpp-quill-styles-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-richtext-common-styles-v3-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppRichtextView = WppRichtextView$1;
const defineCustomElement = defineCustomElement$1;

export { WppRichtextView, defineCustomElement };
