import { Host, h } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { menuListConfig as tooltipConfig } from '../../common/menuListConfig';
import { ARROW_COLORS } from './const';
import { defaultTooltipConfig } from './config';
import { isWppElement } from '../../utils/utils';
/**
 * @slot - Can contain the tooltip anchor content. The default slot, without the name attribute.
 * @slot tooltip-content - Contains the custom content the user gives to the tooltip. To use this slot, you also have to pass `allowHTML: true` to the `config` property. Do not use WPP components (except WppTypography) in this slot.
 */
export class WppTooltip {
  constructor() {
    this.FORBIDDEN_PREFIX = 'wpp-';
    this.ALLOWED_TAGS = ['wpp-typography'];
    this.handleSlotChange = () => {
      if (this.slotRef) {
        // Get all assigned elements from the slot
        const slot = this.slotRef;
        const assignedElements = slot.assignedElements();
        this.anchorRef = assignedElements[0];
      }
    };
    this.transformAllowedTags = () => this.ALLOWED_TAGS.map(el => el
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(''));
    this.arrowSVG = () => {
      const arrowSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrowSVG.setAttribute('width', '8');
      arrowSVG.setAttribute('height', '4');
      const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      arrowPath.setAttribute('fill', this.getArrowBgColor());
      arrowPath.setAttribute('fill-rule', 'evenodd');
      arrowPath.setAttribute('clip-rule', 'evenodd');
      arrowPath.setAttribute('d', 'M3.29289 0.707106C3.68342 0.316582 4.31658 0.316583 4.70711 0.707107L8 4L0 4L3.29289 0.707106Z');
      arrowSVG.appendChild(arrowPath);
      return arrowSVG;
    };
    this.createTippyInstance = () => {
      if (this.disabled) {
        return;
      }
      const content = this.config.allowHTML ? this.customContentEl : this.contentEl;
      if (this.anchorRef && content) {
        this.tippyInstance = tooltipConfig({
          anchor: this.anchorRef,
          content,
          triggerElementWidth: false,
          arrow: this.arrowSVG(),
          hideOnEsc: true,
          aria: {
            expanded: undefined,
          },
          ...defaultTooltipConfig,
          ...this.config,
          // Duration and Delay are not configurable,
          duration: [150, 100],
          delay: [500, 30],
          onMount(instance) {
            const referenceElement = instance.reference;
            if (!referenceElement)
              return;
            if (isWppElement(referenceElement)) {
              referenceElement.ariaProps = {
                ...referenceElement.ariaProps,
                describedby: `tippy-${instance.id}`,
              };
            }
            else {
              referenceElement.setAttribute('aria-describedby', `tippy-${instance.id}`);
            }
          },
          onHide(instance) {
            const referenceElement = instance.reference;
            if (!referenceElement)
              return;
            if (isWppElement(referenceElement)) {
              const { describedby, ...restProps } = referenceElement.ariaProps;
              referenceElement.ariaProps = restProps;
            }
            else {
              referenceElement.removeAttribute('aria-describedby');
            }
          },
          onShow: (instance) => {
            if (this.dropdownWidth !== 'auto') {
              instance.popper.style.width = this.dropdownWidth;
              instance.popper.style.maxWidth = this.dropdownWidth;
            }
            else {
              instance.popper.style.maxWidth = '350px';
            }
            if (this.config.onShow) {
              return this.config.onShow(instance);
            }
          },
          popperOptions: {
            strategy: 'fixed',
            ...(this.config.popperOptions || {}),
            modifiers: [
              {
                name: 'autoUpdate',
                enabled: true,
              },
              ...(this.config.popperOptions?.modifiers || []),
            ],
          },
        });
      }
    };
    this.getArrowBgColor = () => {
      const currColor = this.error ? 'error' : this.warning ? 'warning' : this.theme;
      return ARROW_COLORS[currColor];
    };
    this.hostCssClasses = () => ({
      'wpp-tooltip': true,
    });
    this.contentWrapperCssClasses = () => ({
      'content-wrapper': true,
      hidden: this.hidden || this.disabled,
    });
    this.hidden = true;
    this.style = {};
    this.disabled = false;
    this.header = undefined;
    this.text = undefined;
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.wordBreak = 'break-word';
    this.theme = 'dark';
    this.config = {};
    this.externalClass = '';
    this.dropdownWidth = 'auto';
    this.ariaProps = {};
    this.anchorTabIndex = 0;
  }
  updateConfig(newConfig, oldConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateTheme() {
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    this.tippyInstance?.popperInstance?.update();
  }
  textChanged(newText, oldText) {
    if (newText !== oldText && this.contentEl) {
      const contentEl = this.contentEl;
      contentEl.text = newText;
      requestAnimationFrame(() => {
        this.tippyInstance?.setProps({
          placement: this.config.placement || 'top',
        });
        this.tippyInstance?.popperInstance?.update();
      });
    }
  }
  handleDisabledChange(newDisabled) {
    if (newDisabled) {
      if (this.tippyInstance) {
        this.tippyInstance.destroy();
        this.tippyInstance = undefined;
      }
    }
    else {
      this.createTippyInstance();
    }
  }
  componentWillLoad() {
    if (this.config.allowHTML) {
      const content = this.host?.querySelector('[slot="tooltip-content"]');
      if (content) {
        const validateElement = (element) => {
          element.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const tagName = node.tagName.toLowerCase();
              if (tagName.startsWith(this.FORBIDDEN_PREFIX) && !this.ALLOWED_TAGS.some(el => tagName.startsWith(el))) {
                console.warn(`WPP components are not allowed in WppTooltip, except for: ${this.transformAllowedTags()}`);
              }
              validateElement(node);
            }
          });
        };
        validateElement(content);
      }
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      this.createTippyInstance();
      this.hidden = false;
    }, 0);
    if (this.config.allowHTML) {
      const content = this.host.querySelector('[slot="tooltip-content"]');
      if (content && this.customContentEl) {
        this.customContentEl.appendChild(content);
      }
    }
  }
  disconnectedCallback() {
    this.tippyInstance?.destroy();
  }
  connectedCallback() {
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "presentation" }, h("div", { "aria-label": this.ariaProps?.label, part: "anchor", class: "anchor", ...(this.anchorTabIndex ? { tabIndex: this.anchorTabIndex } : {}) }, h("slot", { part: "inner", ref: (slotRef) => (this.slotRef = slotRef), onSlotchange: this.handleSlotChange })), h("div", { class: this.contentWrapperCssClasses() }, !this.config.allowHTML ? (h("wpp-internal-tooltip-v3-5-0", { cssStyle: this.style, ref: contentEl => (this.contentEl = contentEl), header: this.header, text: this.text, value: this.value, error: this.error, wordBreak: this.wordBreak, warning: this.warning, theme: this.theme, externalClass: this.externalClass, ariaProp: this.ariaProps })) : (h("div", { ref: customContentEl => (this.customContentEl = customContentEl), class: `tooltip-custom-content ${this.theme}`, id: this.ariaProps?.describedby })))));
  }
  static get is() { return "wpp-tooltip"; }
  static get registryIs() { return "wpp-tooltip-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-tooltip.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-tooltip.css"]
    };
  }
  static get properties() {
    return {
      "disabled": {
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
          "tags": [{
              "name": "internal",
              "text": "- This prop is for internal use only."
            }],
          "text": "If set, disables the tooltip."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Defines the tooltip title."
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
          "text": "Defines the main tooltip message."
        },
        "attribute": "text",
        "reflect": false
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
          "text": "If set, adds a value row under the main message."
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
          "text": "If the tooltip is styled as an error."
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
          "text": "If the tooltip is styled as a warning."
        },
        "attribute": "warning",
        "reflect": false,
        "defaultValue": "false"
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
      "theme": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TooltipThemeTypes",
          "resolved": "\"dark\" | \"light\"",
          "references": {
            "TooltipThemeTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-tooltip/types.ts::TooltipThemeTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the tooltip theme."
        },
        "attribute": "theme",
        "reflect": false,
        "defaultValue": "'dark'"
      },
      "config": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
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
      },
      "dropdownWidth": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'auto' | string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown's width. The maximum width of the dropdown is 350px."
        },
        "attribute": "dropdown-width",
        "reflect": true,
        "defaultValue": "'auto'"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the button `aria-` props."
        },
        "defaultValue": "{}"
      },
      "anchorTabIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This prop is for internal use only."
            }],
          "text": "If set, makes the tooltip anchor focusable. Default is false."
        },
        "attribute": "anchor-tab-index",
        "reflect": false,
        "defaultValue": "0"
      }
    };
  }
  static get states() {
    return {
      "hidden": {},
      "style": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "config",
        "methodName": "updateConfig"
      }, {
        "propName": "theme",
        "methodName": "updateTheme"
      }, {
        "propName": "error",
        "methodName": "updateTheme"
      }, {
        "propName": "warning",
        "methodName": "updateTheme"
      }, {
        "propName": "text",
        "methodName": "textChanged"
      }, {
        "propName": "disabled",
        "methodName": "handleDisabledChange"
      }];
  }
}
