import { r as registerInstance, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { i as isEqual_1 } from './isEqual-19e8fa15.js';
import { m as menuListConfig } from './menuListConfig-1b46213e.js';
import { Z as Z_INDEX } from './consts-4b0f734e.js';
import { v as getHighestContainerInDOM, b as isEventTargetContained } from './utils-f3870f15.js';
import './_commonjsHelpers-ba3f0406.js';

const wppPopoverCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:-ms-inline-flexbox;display:inline-flex}:host .wpp-popover-content.wpp-hidden{position:absolute;z-index:-1;opacity:0}:host slot{display:block}";

const WppPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.isTriggerEnabled = () => {
      // Checks if the trigger element is enabled or disabled.
      const triggerEl = this.host?.querySelector('[slot="trigger-element"]');
      if (!triggerEl)
        return false;
      if ((triggerEl?.hasAttribute('disabled') && triggerEl?.getAttribute('disabled') !== 'false') ||
        triggerEl?.classList.contains('disabled')) {
        return false;
      }
      return true;
    };
    this.createTippyInstance = () => {
      const slotContent = this.host.children[1];
      if (slotContent) {
        this.contentEl?.append(slotContent);
      }
      if (this.anchorEl && this.contentEl) {
        this.tippyInstance = menuListConfig({
          anchor: this.anchorEl,
          content: this.contentEl,
          zIndex: Z_INDEX.POPOVER,
          duration: [300, 300],
          triggerElementWidth: false,
          trigger: 'click',
          maxWidth: 'none',
          hideOnClick: 'toggle',
          popperOptions: {
            ...this.config?.popperOptions,
            modifiers: [
              ...(this.config?.popperOptions?.modifiers || []),
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['top'],
                },
              },
            ],
          },
          appendTo: () => getHighestContainerInDOM(),
          ...this.config,
          onClickOutside: (instance, event) => {
            if (isEventTargetContained(this.host, event))
              return;
            if (this.shouldCloseOnOutsideClick(event)) {
              this.tippyInstance.hide();
            }
            if (this.config.onClickOutside) {
              this.config.onClickOutside(instance, event);
            }
          },
          onShow: (instance) => {
            if (!this.isTriggerEnabled())
              return false;
            if (this.dropdownWidth !== 'auto') {
              instance.popper.style.width = this.dropdownWidth;
            }
            if (this.config.onShow) {
              return this.config.onShow(instance);
            }
          },
        });
      }
    };
    this.removeDisabledTag = () => {
      if (this.anchorEl?.getAttribute('disabled') === 'false') {
        this.anchorEl.removeAttribute('disabled');
      }
    };
    this.handleCrossButtonClick = () => this.tippyInstance.hide();
    this.hostCssClasses = () => ({
      'wpp-popover': true,
    });
    this.contentCssClasses = () => ({
      'wpp-popover-content': true,
      'wpp-hidden': this.hidden,
      [`${this.externalClass}`]: true,
    });
    this.hidden = true;
    this.config = {};
    this.shouldCloseOnOutsideClick = () => true;
    this.closable = false;
    this.externalClass = '';
    this.dropdownWidth = 'auto';
  }
  /**
   * Method for closing the popover programatically
   */
  async closePopover() {
    this.tippyInstance.hide();
  }
  /**
   * Method for opening the popover programatically
   */
  async openPopover() {
    setTimeout(() => {
      this.tippyInstance.show();
    }, 0);
  }
  updateConfig(newConfig, oldConfig) {
    if (!isEqual_1(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      this.createTippyInstance();
      this.hidden = false;
    }, 0);
    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag();
    });
    this.startObserving();
  }
  disconnectedCallback() {
    this.tippyInstance?.destroy();
    this.mutationObserver?.disconnect();
  }
  connectedCallback() {
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
  }
  startObserving() {
    this.mutationObserver.observe(this.host?.children[0], { attributes: true });
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "anchor, trigger-element" }, h("div", { class: "anchor", part: "anchor", ref: anchorEl => (this.anchorEl = anchorEl) }, h("slot", { name: "trigger-element", part: "trigger-element" })), h("div", { class: this.contentCssClasses(), part: "content", ref: contentEl => (this.contentEl = contentEl) }, this.closable && (h("wpp-action-button-v2-22-0", { onClick: this.handleCrossButtonClick, class: "cross-button", variant: "secondary" }, h("wpp-icon-cross-v2-22-0", { slot: "icon-end" }))), h("slot", null))));
  }
  static get registryIs() { return "wpp-popover-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "config": ["updateConfig"]
  }; }
};
WppPopover.style = wppPopoverCss;

export { WppPopover as wpp_popover };
