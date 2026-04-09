'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const config = require('./config-6aa0b6b4.js');
const types = require('./types-3dbf006d.js');
require('./utils-e1f17a8c.js');
require('./consts-dba6e6dd.js');
require('./wpp-icon-attach-707b14c2.js');
require('./WppIcon-55327707.js');
require('./wpp-icon-unordered-list-0d44ce00.js');
require('./wpp-icon-video-clip-7ac45275.js');
require('./const-09fdf30a.js');
require('./marked.umd-e1074c94.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./wpp-progress-indicator-24971b5e.js');
require('./wpp-icon-chevron-36ae3eb4.js');
require('./wpp-icon-gallery-16651b4a.js');
require('./lodash-6b012aab.js');
require('./wpp-action-button-8dd2d2f8.js');
require('./common-ee802540.js');
require('./WrappedSlot-4a4ef805.js');
require('./wpp-input-fe676474.js');
require('./turndown.browser.es-eb372b89.js');

const WppRichtextView = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.value = undefined;
    this.format = types.formats.html;
    this.debug = 'warn';
    this.formats = undefined;
    this.modules = undefined;
    this.strict = true;
    this.styles = '{}';
    this.preserveWhitespace = true;
    this.name = undefined;
  }
  setValue(value) {
    if (this.format === types.formats.html) {
      const contents = this.quill.clipboard.convert(value);
      this.quill.setContents(contents, types.sources.api);
    }
    else if (this.format === types.formats.markdown) {
      const { html } = config.processMarkdownValue(value);
      const contents = this.quill.clipboard.convert(html);
      this.quill.setContents(contents, types.sources.api);
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
        this.quill.update(types.sources.api);
      }
    }
    else if (this.format === types.formats.text) {
      this.quill.setText(value, types.sources.api);
    }
    else if (this.format === types.formats.json) {
      try {
        this.quill.setContents(JSON.parse(value), types.sources.api);
      }
      catch (_) {
        this.quill.setText(value, types.sources.api);
      }
    }
    else {
      this.quill.setText(value, types.sources.api);
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
      return config.turndownService.turndown(html);
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
    this.quill = new types.Quill(this.containerElement, {
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
    if (Object.values(types.formats).indexOf(this.format) > -1 && newValue === value) {
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
    return (index.h(index.Host, null, index.h("wpp-quill-styles-v3-6-0", null), index.h("wpp-richtext-common-styles-v3-6-0", null), index.h("div", { ref: (el) => (this.containerElement = el) })));
  }
  static get registryIs() { return "wpp-richtext-view-v3-6-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "styles": ["updateStyle"],
    "value": ["updateContent"]
  }; }
};

exports.wpp_richtext_view = WppRichtextView;
