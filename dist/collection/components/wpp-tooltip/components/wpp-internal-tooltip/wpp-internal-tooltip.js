import { Host, h, Fragment } from '@stencil/core';
/**
 * @part tooltip-content - tooltip content wrapper element
 * @part header - header component
 * @part text - Main text content
 * @part value - value text element
 * @part icon-error - icon error element
 *
 * @internal - this component is used in wpp-tooltip component
 */
export class WppTooltip {
  constructor() {
    this.cssClasses = () => ({
      'tooltip-wrapper': true,
      [`${this.theme}`]: true,
      'with-header': !!this.header,
      'with-value': !!this.value,
      error: this.error,
      warning: this.warning,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-tooltip': true,
      [`${this.externalClass}`]: true,
    });
    this.headerCssClasses = () => ({
      header: !!this.header,
    });
    this.textCssClasses = () => ({
      text: !!this.text,
    });
    this.valueCssClasses = () => ({
      value: !!this.value,
    });
    this.getIconBasedOnProps = () => {
      if (this.error) {
        return h("wpp-icon-error-v2-22-0", { class: "left-icon", part: "icon-error" });
      }
      if (this.warning) {
        return h("wpp-icon-warning-v2-22-0", { color: "var(--wpp-warning-color-400)", class: "left-icon" });
      }
      return null;
    };
    this.getTextLines = () => {
      if (!this.text)
        return null;
      return this.text
        .trim()
        .split('\n')
        .map((line) => (h(Fragment, null, line, h("br", null))));
    };
    this.cssStyle = undefined;
    this.header = undefined;
    this.text = undefined;
    this.wordBreak = 'break-word';
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.theme = 'dark';
    this.allowHTML = undefined;
    this.externalClass = '';
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), style: this.cssStyle, exportparts: "tooltip-content" }, h("div", { class: this.cssClasses(), style: { wordBreak: this.wordBreak }, part: "tooltip-content" }, !!this.header && (h("span", { class: this.headerCssClasses(), part: "header" }, this.header)), !!this.text && (h("span", { class: this.textCssClasses(), part: "text" }, this.getTextLines())), !!this.value && (h("span", { class: this.valueCssClasses(), part: "value" }, this.value)), this.getIconBasedOnProps())));
  }
  static get is() { return "wpp-internal-tooltip"; }
  static get registryIs() { return "wpp-internal-tooltip-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-internal-tooltip.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-internal-tooltip.css"]
    };
  }
  static get properties() {
    return {
      "cssStyle": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Record<string, string>",
          "resolved": "undefined | { [x: string]: string; }",
          "references": {
            "Record": {
              "location": "global",
              "id": "global::Record"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- this prop is used by wpp-tooltip component"
            }],
          "text": "Indicates tooltip style"
        }
      },
      "header": {
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
          "text": "Indicates tooltip title"
        },
        "attribute": "header",
        "reflect": false
      },
      "text": {
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
          "text": "Sets the main tooltip message"
        },
        "attribute": "text",
        "reflect": false
      },
      "wordBreak": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'break-word' | 'break-all' | 'auto-phrase'",
          "resolved": "\"auto-phrase\" | \"break-all\" | \"break-word\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Sets the word breaking behaviour. By default, it is \"break-word\", meaning the words\nwill be broken if there is not enough space and a hyphen (\"-\") is added. The other option\nis \"break-all\", which breaks the word but does not add the hyphen."
        },
        "attribute": "word-break",
        "reflect": false,
        "defaultValue": "'break-word'"
      },
      "value": {
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
          "text": "When set, adds a value row below the main message"
        },
        "attribute": "value",
        "reflect": false
      },
      "error": {
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
          "text": "If `true`, the tooltip is displayed in an error state"
        },
        "attribute": "error",
        "reflect": false,
        "defaultValue": "false"
      },
      "warning": {
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
          "text": "If `true`, the tooltip is displayed in a warning state"
        },
        "attribute": "warning",
        "reflect": false,
        "defaultValue": "false"
      },
      "theme": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TooltipThemeTypes",
          "resolved": "\"dark\" | \"light\"",
          "references": {
            "TooltipThemeTypes": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-tooltip/types.ts::TooltipThemeTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tooltip theme, can be `dark` or `light`, default value is `dark`, not related to the WPP theme"
        },
        "attribute": "theme",
        "reflect": false,
        "defaultValue": "'dark'"
      },
      "allowHTML": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- This prop is no longer used by the component"
            }],
          "text": "When set, allow to pass string represented HTML in text property"
        },
        "attribute": "allow-h-t-m-l",
        "reflect": false
      },
      "externalClass": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Add an external class to the tooltip wrapper. This class will be applied to this wrapper that placed in tippy box that appended to the body.\nTo add some properties to this class you have to add this class to global styles, for example\n.tooltip-wrapper.external-class-name {\n ...\n}"
        },
        "attribute": "external-class",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get elementRef() { return "host"; }
}
