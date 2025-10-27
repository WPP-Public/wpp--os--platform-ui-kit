import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, i as isEqual_1 } from './menuListConfig.js';
import { Z as Z_INDEX } from './consts.js';
import { w as getHighestContainerInDOM, y as isWppElement } from './utils.js';
import { d as defineCustomElement$3 } from './wpp-icon-error2.js';
import { d as defineCustomElement$2 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$1 } from './wpp-internal-tooltip2.js';

const cssStyles = {
  '--tooltip-padding': '',
  '--tooltip-border-radius': '',
  '--tooltip-with-header-padding': '',
  '--tooltip-with-value-padding': '',
  '--tooltip-icon-margin-right': '',
  '--tooltip-text-margin-bottom': '',
  '--tooltip-error-text-color': '',
  '--tooltip-error-header-text-color': '',
  '--tooltip-error-bg-color': '',
  '--tooltip-error-with-header-header-color': '',
  '--tooltip-error-with-header-text-color': '',
  '--tooltip-error-with-value-text-color': '',
  '--tooltip-error-with-value-value-color': '',
  '--tooltip-dark-bg-color': '',
  '--tooltip-dark-value-color': '',
  '--tooltip-dark-text-color': '',
  '--tooltip-dark-with-header-header-color': '',
  '--tooltip-dark-with-header-text-color': '',
  '--tooltip-dark-with-value-text-color': '',
  '--tooltip-dark-with-value-value-color': '',
  '--tooltip-dark-header-text-color': '',
  '--tooltip-light-bg-color': '',
  '--tooltip-light-value-color': '',
  '--tooltip-light-text-color': '',
  '--tooltip-light-with-header-header-color': '',
  '--tooltip-light-with-header-text-color': '',
  '--tooltip-light-with-value-text-color': '',
  '--tooltip-light-with-value-value-color': '',
  '--tooltip-light-header-text-color': '',
  '--tooltip-light-box-shadow': '',
  '--tooltip-warning-bg-color': '',
  '--tooltip-variant-box-shadow': '',
};

const defaultTooltipConfig = {
  placement: 'top',
  offset: [0, 7.2],
  trigger: 'mouseenter focus',
  duration: [500, 500],
  zIndex: Z_INDEX.TOOLTIP,
  popperOptions: {
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 0,
        },
      },
    ],
  },
  appendTo: () => getHighestContainerInDOM(),
};

const wppTooltipCss = ":host{--tooltip-padding:var(--wpp-tooltip-padding, 6px 8px);--tooltip-border-radius:var(--wpp-tooltip-border-radius, var(--wpp-border-radius-s));--tooltip-with-header-padding:var(--wpp-tooltip-with-header-padding, 8px 12px);--tooltip-with-value-padding:var(--wpp-tooltip-with-value-padding, 6px 12px);--tooltip-icon-margin-right:var(--wpp-tooltip-icon-margin-right, 4px);--tooltip-text-margin-bottom:var(--wpp-tooltip-text-margin-bottom, 2px);--tooltip-error-text-color:var(--wpp-tooltip-error-text-color, var(--wpp-grey-color-1000));--tooltip-error-header-text-color:var(--wpp-tooltip-error-header-text-color, var(--wpp-grey-color-1000));--tooltip-error-bg-color:var(--wpp-tooltip-error-bg-color, var(--wpp-danger-color-200));--tooltip-error-with-header-header-color:var(\n    --wpp-tooltip-error-with-header-header-color,\n    var(--wpp-grey-color-1000)\n  );--tooltip-error-with-header-text-color:var(--wpp-tooltip-error-with-header-text-color, var(--wpp-grey-color-800));--tooltip-error-with-value-text-color:var(--wpp-tooltip-error-with-value-text-color, var(--wpp-grey-color-800));--tooltip-error-with-value-value-color:var(--wpp-tooltip-error-with-value-value-color, var(--wpp-grey-color-1000));--tooltip-dark-bg-color:var(--wpp-tooltip-dark-bg-color, var(--wpp-text-color-info));--tooltip-dark-value-color:var(--wpp-tooltip-dark-value-color, var(--wpp-grey-color-000));--tooltip-dark-text-color:var(--wpp-tooltip-dark-text-color, var(--wpp-grey-color-000));--tooltip-dark-with-header-header-color:var(--wpp-tooltip-dark-with-header-header-color, var(--wpp-grey-color-000));--tooltip-dark-with-header-text-color:var(--wpp-tooltip-dark-with-header-text-color, var(--wpp-grey-color-100));--tooltip-dark-with-value-text-color:var(--wpp-tooltip-dark-with-value-text-color, var(--wpp-grey-color-200));--tooltip-dark-with-value-value-color:var(--wpp-tooltip-dark-with-value-value-color, var(--wpp-grey-color-000));--tooltip-dark-header-text-color:var(--wpp-tooltip-dark-header-text-color, var(--wpp-grey-color-000));--tooltip-light-bg-color:var(--wpp-tooltip-light-bg-color, var(--wpp-grey-color-000));--tooltip-light-value-color:var(--wpp-tooltip-light-value-color, var(--wpp-text-color));--tooltip-light-text-color:var(--wpp-tooltip-light-text-color, var(--wpp-grey-color-1000));--tooltip-light-with-header-header-color:var(\n    --wpp-tooltip-light-with-header-header-color,\n    var(--wpp-grey-color-1000)\n  );--tooltip-light-with-header-text-color:var(--wpp-tooltip-light-with-header-text-color, var(--wpp-grey-color-800));--tooltip-light-with-value-text-color:var(--wpp-tooltip-light-with-value-text-color, var(--wpp-grey-color-800));--tooltip-light-with-value-value-color:var(--wpp-tooltip-light-with-value-value-color, var(--wpp-grey-color-1000));--tooltip-light-header-text-color:var(--wpp-tooltip-light-header-text-color, var(--wpp-text-color));--tooltip-light-box-shadow:var(--wpp-tooltip-light-box-shadow, var(--wpp-box-shadow-m));--tooltip-warning-bg-color:var(--wpp-tooltip-warning-bg-color, var(--wpp-warning-color-200));--tooltip-variant-box-shadow:var(--wpp-tooltip-variant-box-shadow, var(--wpp-box-shadow-m));display:-ms-inline-flexbox;display:inline-flex;width:-webkit-fit-content}:host .anchor{display:-ms-inline-flexbox;display:inline-flex}:host .content-wrapper.hidden{position:absolute;display:none}:host .tooltip-custom-content{width:100%;background-color:var(--tooltip-dark-bg-color);padding:var(--tooltip-padding);border-radius:var(--tooltip-border-radius);overflow-wrap:break-word}:host .tooltip-custom-content.light{-webkit-box-shadow:var(--tooltip-light-box-shadow);box-shadow:var(--tooltip-light-box-shadow);background-color:var(--tooltip-light-bg-color)}:host(.in-dropdown){max-width:100%}:host(.in-dropdown) .anchor{max-width:100%}:host(.transparent){opacity:0;pointer-events:none}";

const WppTooltip = /*@__PURE__*/ proxyCustomElement(class WppTooltip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.arrowColor = {};
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
        this.tippyInstance = menuListConfig({
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
      const colorKeys = ['dark', 'light', 'error', 'warning'];
      for (const colorKey of colorKeys) {
        if (!this.arrowColor[colorKey]) {
          this.arrowColor[colorKey] = getComputedStyle(this.host).getPropertyValue(`--tooltip-${colorKey}-bg-color`);
        }
      }
      return getComputedStyle(this.host).getPropertyValue(`--tooltip-${currColor}-bg-color`) || this.arrowColor[currColor];
    };
    this.getCssValues = () => {
      const cssVariableNames = Object.keys(cssStyles);
      const updatedCssStyles = {};
      cssVariableNames.forEach(cssVariable => {
        const computedValue = getComputedStyle(this.host).getPropertyValue(cssVariable);
        const internalKey = `--internal-${cssVariable.substring(2)}`;
        updatedCssStyles[internalKey] = computedValue;
      });
      this.style = updatedCssStyles;
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
    if (!isEqual_1(newConfig, oldConfig)) {
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
      this.getCssValues();
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
      this.getCssValues();
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
    this.getCssValues();
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "presentation" }, h("div", { "aria-label": this.ariaProps?.label, part: "anchor", class: "anchor", ...(this.anchorTabIndex ? { tabIndex: this.anchorTabIndex } : {}) }, h("slot", { part: "inner", ref: (slotRef) => (this.slotRef = slotRef), onSlotchange: this.handleSlotChange })), h("div", { class: this.contentWrapperCssClasses() }, !this.config.allowHTML ? (h("wpp-internal-tooltip-v3-3-0", { cssStyle: this.style, ref: contentEl => (this.contentEl = contentEl), header: this.header, text: this.text, value: this.value, error: this.error, wordBreak: this.wordBreak, warning: this.warning, theme: this.theme, externalClass: this.externalClass, ariaProp: this.ariaProps })) : (h("div", { ref: customContentEl => (this.customContentEl = customContentEl), class: `tooltip-custom-content ${this.theme}`, id: this.ariaProps?.describedby })))));
  }
  static get registryIs() { return "wpp-tooltip-v3-3-0"; }
  get host() { return this; }
  static get watchers() { return {
    "config": ["updateConfig"],
    "theme": ["updateTheme"],
    "error": ["updateTheme"],
    "warning": ["updateTheme"],
    "text": ["textChanged"],
    "disabled": ["handleDisabledChange"]
  }; }
  static get style() { return wppTooltipCss; }
}, [1, "wpp-tooltip", "wpp-tooltip-v3-3-0", {
    "disabled": [4],
    "header": [1],
    "text": [1],
    "value": [1],
    "error": [4],
    "warning": [4],
    "wordBreak": [1, "word-break"],
    "theme": [1],
    "config": [1040],
    "externalClass": [1, "external-class"],
    "dropdownWidth": [513, "dropdown-width"],
    "ariaProps": [16],
    "anchorTabIndex": [2, "anchor-tab-index"],
    "hidden": [32],
    "style": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-tooltip-v3-3-0", "wpp-icon-error-v3-3-0", "wpp-icon-warning-v3-3-0", "wpp-internal-tooltip-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTooltip);
      }
      break;
    case "wpp-icon-error-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-icon-warning-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-internal-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppTooltip as W, defineCustomElement as d };
