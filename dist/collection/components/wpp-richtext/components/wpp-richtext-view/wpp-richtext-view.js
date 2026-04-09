import { h, Host } from '@stencil/core';
import { Quill } from '../..';
import { formats, sources } from '../../types';
import turndownService from '../../config';
import { processMarkdownValue } from '../../utils';
export class WppRichtextView {
  constructor() {
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
    return (h(Host, null, h("wpp-quill-styles-v3-6-0", null), h("wpp-richtext-common-styles-v3-6-0", null), h("div", { ref: (el) => (this.containerElement = el) })));
  }
  static get is() { return "wpp-richtext-view"; }
  static get registryIs() { return "wpp-richtext-view-v3-6-0"; }
  static get properties() {
    return {
      "value": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "RichtextValue",
          "resolved": "string",
          "references": {
            "RichtextValue": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-richtext/types.ts::RichtextValue"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Editor value"
        },
        "attribute": "value",
        "reflect": true
      },
      "format": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "Formats",
          "resolved": "string",
          "references": {
            "Formats": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-richtext/types.ts::Formats"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Format of editor value"
        },
        "attribute": "format",
        "reflect": true,
        "defaultValue": "formats.html"
      },
      "debug": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "DebugLevels",
          "resolved": "string",
          "references": {
            "DebugLevels": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-richtext/types.ts::DebugLevels"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Debug level: `error`, `warn`, `log`, or `info`. Passing true is equivalent to passing `log`.\nPassing false disables all messages."
        },
        "attribute": "debug",
        "reflect": false,
        "defaultValue": "'warn'"
      },
      "formats": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whitelist of formats to allow in the editor.\nSee [Formats](https://quilljs.com/docs/formats/) for a complete list."
        }
      },
      "modules": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Collection of modules to include and respective options.\nThe only configurable modules are the following: imageUpload, videoUpload, attachmentUpload and toolbar.aliases.embed (See \"Usage\" section of Notes)\nSee [Modules](https://quilljs.com/docs/modules/) for more information about the library's modules."
        },
        "attribute": "modules",
        "reflect": false
      },
      "strict": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Use strict comparison for objects."
        },
        "attribute": "strict",
        "reflect": false,
        "defaultValue": "true"
      },
      "styles": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Inline styles for editor, in a JSON format"
        },
        "attribute": "styles",
        "reflect": false,
        "defaultValue": "'{}'"
      },
      "preserveWhitespace": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "This property is no longer needed. Whitespace preservation is now the default behavior\nfor markdown format. This prop will be removed in a future major version."
            }],
          "text": ""
        },
        "attribute": "preserve-whitespace",
        "reflect": true,
        "defaultValue": "true"
      },
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Name of the editor instance"
        },
        "attribute": "name",
        "reflect": true
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "styles",
        "methodName": "updateStyle"
      }, {
        "propName": "value",
        "methodName": "updateContent"
      }];
  }
}
