import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { i as isEqual_1 } from './isEqual-9c20096c.js';
import { m as menuListConfig } from './menuListConfig-200865d3.js';
import { Z as Z_INDEX } from './consts-5bf9c29f.js';
import { w as getHighestContainerInDOM, b as isEventTargetContained, c as hasParentWithId } from './utils-90721dcb.js';
import './_commonjsHelpers-ba3f0406.js';

const DEFAULT_POPOVER_LOCALES = {
  searchInputPlaceholder: 'Search',
};

const wppPopoverCss = ":host{display:-ms-inline-flexbox;display:inline-flex}:host .anchor{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:-ms-inline-flexbox;display:inline-flex}:host .wpp-popover-content.wpp-hidden{position:absolute;z-index:-1;opacity:0}:host .wpp-popover-content.inline-edit-popover{display:-ms-inline-flexbox;display:inline-flex;width:100%;height:100%;-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-800);border-radius:var(--wpp-border-radius-s);scrollbar-width:thin;position:relative;overflow:hidden}:host slot{display:block}";

const WppPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppSearchChange = createEvent(this, "wppSearchChange", 1);
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
      if (this.contentEl && this.anchorRef) {
        this.tippyInstance = menuListConfig({
          anchor: this.anchorRef,
          content: this.contentEl,
          zIndex: Z_INDEX.POPOVER,
          duration: [300, 300],
          triggerElementWidth: false,
          trigger: 'click',
          maxWidth: 'none',
          hideOnClick: 'toggle',
          popperOptions: {
            ...this.config?.popperOptions,
            modifiers: [...(this.config?.popperOptions?.modifiers || [])],
          },
          appendTo: () => getHighestContainerInDOM(),
          ...this.config,
          onClickOutside: (instance, event) => {
            if (isEventTargetContained(this.host, event) ||
              (event.target && hasParentWithId(event.target, 'tippy-')))
              return;
            if (this.shouldCloseOnOutsideClick(event)) {
              this.tippyInstance.hide();
            }
            if (this.config?.onClickOutside) {
              this.config.onClickOutside(instance, event);
            }
          },
          onShow: (instance) => {
            if (!this.isTriggerEnabled())
              return false;
            if (this.dropdownWidth !== 'auto') {
              instance.popper.style.width = this.dropdownWidth;
            }
            if (this.config?.onShow) {
              return this.config.onShow(instance);
            }
          },
          onShown: (instance) => {
            if (this.searchInputEl) {
              this.searchInputEl.setFocus();
            }
            if (this.config?.onShown) {
              this.config.onShown(instance);
            }
          },
          onHidden: (instance) => {
            if (!this.persistantSearch && this.withSearch) {
              this.wppSearchChange.emit({ name: this.internalSearchName, value: '' });
            }
            if (this.config?.onHidden) {
              this.config.onHidden(instance);
            }
          },
        });
      }
    };
    this.removeDisabledTag = () => {
      if (this.anchorRef?.getAttribute('disabled') === 'false') {
        this.anchorRef.removeAttribute('disabled');
      }
    };
    this.handleCrossButtonClick = () => this.tippyInstance.hide();
    this.handleSearchChange = (e) => {
      const { value } = e.detail;
      this.wppSearchChange.emit({ name: this.internalSearchName, value });
    };
    this.hostCssClasses = () => ({
      'wpp-popover': true,
    });
    this.contentCssClasses = () => ({
      'wpp-popover-content': true,
      'wpp-hidden': this.hidden,
      [`${this.externalClass}`]: true,
      'wpp-with-search': this.withSearch,
    });
    this.hidden = true;
    this.config = {};
    this.shouldCloseOnOutsideClick = () => true;
    this.closable = false;
    this.withSearch = false;
    this.searchValue = '';
    this.searchName = '';
    this.persistantSearch = false;
    this.externalClass = '';
    this.dropdownWidth = 'auto';
    this.ariaProps = {
      role: 'dialog',
    };
    this.locales = DEFAULT_POPOVER_LOCALES;
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
  componentWillLoad() {
    this.internalSearchName = this.searchName || 'wpp-popover-search';
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "anchor, trigger-element" }, h("div", { class: "anchor", part: "anchor", ref: ref => (this.anchorRef = ref) }, h("slot", { name: "trigger-element", part: "trigger-element" })), h("div", { class: this.contentCssClasses(), part: "content", ref: contentEl => (this.contentEl = contentEl), role: this.ariaProps.role || 'dialog', "aria-describedby": this.ariaProps.describedby, "aria-label": this.ariaProps.label, "aria-modal": "true" }, this.withSearch && (h("wpp-input-v3-3-0", { ref: inputEl => (this.searchInputEl = inputEl), class: "wpp-search-input", value: this.searchValue, onWppChange: this.handleSearchChange, name: this.internalSearchName, placeholder: this.locales.searchInputPlaceholder || DEFAULT_POPOVER_LOCALES.searchInputPlaceholder, type: "search", size: "m" })), !this.withSearch && this.closable && (h("wpp-action-button-v3-3-0", { onClick: this.handleCrossButtonClick, class: "cross-button", variant: "secondary" }, h("wpp-icon-cross-v3-3-0", { slot: "icon-end" }))), h("slot", null))));
  }
  static get registryIs() { return "wpp-popover-v3-3-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "config": ["updateConfig"]
  }; }
};
WppPopover.style = wppPopoverCss;

export { WppPopover as wpp_popover };
