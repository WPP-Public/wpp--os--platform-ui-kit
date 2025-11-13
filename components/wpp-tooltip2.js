import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, i as isEqual_1 } from './menuListConfig.js';
import { Z as Z_INDEX } from './consts.js';
import { w as getHighestContainerInDOM, y as isWppElement } from './utils.js';
import { d as defineCustomElement$3 } from './wpp-icon-error2.js';
import { d as defineCustomElement$2 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$1 } from './wpp-internal-tooltip2.js';

const ARROW_COLORS = {
  dark: 'var(--wpp-text-color-info)',
  light: 'var(--wpp-grey-color-000)',
  error: 'var(--wpp-danger-color-200)',
  warning: 'var(--wpp-warning-color-200)',
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

const wppTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:-webkit-fit-content}:host .anchor{display:-ms-inline-flexbox;display:inline-flex}:host .content-wrapper.hidden{position:absolute;display:none}:host .tooltip-custom-content{width:100%;background-color:var(--wpp-text-color-info);padding:6px 8px;border-radius:var(--wpp-border-radius-s);overflow-wrap:break-word}:host .tooltip-custom-content.light{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-000)}:host(.in-dropdown){max-width:100%}:host(.in-dropdown) .anchor{max-width:100%}:host(.transparent){opacity:0;pointer-events:none}";

const WppTooltip = /*@__PURE__*/ proxyCustomElement(class WppTooltip extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    return (h(Host, { class: this.hostCssClasses(), role: "presentation" }, h("div", { "aria-label": this.ariaProps?.label, part: "anchor", class: "anchor", ...(this.anchorTabIndex ? { tabIndex: this.anchorTabIndex } : {}) }, h("slot", { part: "inner", ref: (slotRef) => (this.slotRef = slotRef), onSlotchange: this.handleSlotChange })), h("div", { class: this.contentWrapperCssClasses() }, !this.config.allowHTML ? (h("wpp-internal-tooltip-v3-3-1", { cssStyle: this.style, ref: contentEl => (this.contentEl = contentEl), header: this.header, text: this.text, value: this.value, error: this.error, wordBreak: this.wordBreak, warning: this.warning, theme: this.theme, externalClass: this.externalClass, ariaProp: this.ariaProps })) : (h("div", { ref: customContentEl => (this.customContentEl = customContentEl), class: `tooltip-custom-content ${this.theme}`, id: this.ariaProps?.describedby })))));
  }
  static get registryIs() { return "wpp-tooltip-v3-3-1"; }
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
}, [1, "wpp-tooltip", "wpp-tooltip-v3-3-1", {
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
  const components = ["wpp-tooltip-v3-3-1", "wpp-icon-error-v3-3-1", "wpp-icon-warning-v3-3-1", "wpp-internal-tooltip-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-tooltip-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppTooltip);
      }
      break;
    case "wpp-icon-error-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-icon-warning-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-internal-tooltip-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppTooltip as W, defineCustomElement as d };
