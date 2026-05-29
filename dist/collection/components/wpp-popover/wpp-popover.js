import { Host, h } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { menuListConfig } from '../../common/menuListConfig';
import { Z_INDEX } from '../../common/consts';
import { getHighestContainerInDOM, hasParentWithId, isEventTargetContained } from '../../utils/utils';
import { DEFAULT_POPOVER_LOCALES } from './config';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @slot trigger-element - Can contain the popover anchor element.
 * @slot - Can contain the popover content. The default slot, without the name attribute.
 *
 * @part anchor - Popover anchor wrapper
 * @part content - Popover content wrapper
 */
export class WppPopover {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.contentEl);
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
    if (!isEqual(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  componentWillLoad() {
    this.internalSearchName = this.searchName || 'wpp-popover-search';
  }
  componentDidLoad() {
    this.themeSubscription.start();
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
    this.themeSubscription.stop();
    this.tippyInstance?.destroy();
    this.mutationObserver?.disconnect();
  }
  connectedCallback() {
    this.themeSubscription.start();
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "anchor, trigger-element" }, h("div", { class: "anchor", part: "anchor", ref: ref => (this.anchorRef = ref) }, h("slot", { name: "trigger-element", part: "trigger-element" })), h("div", { class: this.contentCssClasses(), part: "content", ref: contentEl => (this.contentEl = contentEl), role: this.ariaProps.role || 'dialog', "aria-describedby": this.ariaProps.describedby, "aria-label": this.ariaProps.label, "aria-modal": "true" }, this.withSearch && (h("wpp-input-v4-1-0", { ref: inputEl => (this.searchInputEl = inputEl), class: "wpp-search-input", value: this.searchValue, onWppChange: this.handleSearchChange, name: this.internalSearchName, placeholder: this.locales.searchInputPlaceholder || DEFAULT_POPOVER_LOCALES.searchInputPlaceholder, type: "search", size: "m" })), !this.withSearch && this.closable && (h("wpp-action-button-v4-1-0", { onClick: this.handleCrossButtonClick, class: "cross-button", variant: "secondary" }, h("wpp-icon-cross-v4-1-0", { slot: "icon-end" }))), h("slot", null))));
  }
  static get is() { return "wpp-popover"; }
  static get registryIs() { return "wpp-popover-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-popover.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-popover.css"]
    };
  }
  static get properties() {
    return {
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
      "shouldCloseOnOutsideClick": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "PopoverShouldCloseOnOutsideClickHandler",
          "resolved": "(event: Event) => boolean",
          "references": {
            "PopoverShouldCloseOnOutsideClickHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-popover/types.ts::PopoverShouldCloseOnOutsideClickHandler"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Helper that defines If the popover can be closed by clicking outside of it."
        },
        "defaultValue": "() => true"
      },
      "closable": {
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
          "text": "If the popover has cross button on the right-top side."
        },
        "attribute": "closable",
        "reflect": false,
        "defaultValue": "false"
      },
      "withSearch": {
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
          "text": "If the popover has search inside of the dropdown."
        },
        "attribute": "with-search",
        "reflect": false,
        "defaultValue": "false"
      },
      "searchValue": {
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
          "text": "Value of the search inside the popover's dropdown.\nThis property should be used together with `this.withSearch` property."
        },
        "attribute": "search-value",
        "reflect": false,
        "defaultValue": "''"
      },
      "searchName": {
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
          "text": "The name for the input component inside the popover's dropdown.\nThis property should be used together with `this.withSearch` property."
        },
        "attribute": "search-name",
        "reflect": false,
        "defaultValue": "''"
      },
      "persistantSearch": {
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
          "text": "By default, the search value in the input is cleared once the dropdown is closed.\nSet to `true` if you need the search value to not be cleared after closing the dropdown.\nThis property should be used together with `this.withSearch` property."
        },
        "attribute": "persistant-search",
        "reflect": false,
        "defaultValue": "false"
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
          "text": "Add an external class to the popover. This class will be applied to the list wrapper that placed in tippy box that appended to the body.\nTo add some properties to this class you have to add this class to global styles, for example\n.wpp-popover.external-class-name {\n ...\n}"
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
        "defaultValue": "{\n    role: 'dialog',\n  }"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "PopoverLocalesInterface",
          "resolved": "PopoverLocalesInterface",
          "references": {
            "PopoverLocalesInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-popover/types.ts::PopoverLocalesInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "DEFAULT_POPOVER_LOCALES"
      }
    };
  }
  static get states() {
    return {
      "hidden": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSearchChange",
        "name": "wppSearchChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the value of the search input inside the dropdown changes."
        },
        "complexType": {
          "original": "PopoverInputChangeEventDetail",
          "resolved": "PopoverInputChangeEventDetail",
          "references": {
            "PopoverInputChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-popover/types.ts::PopoverInputChangeEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "closePopover": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method for closing the popover programatically",
          "tags": []
        }
      },
      "openPopover": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method for opening the popover programatically",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "config",
        "methodName": "updateConfig"
      }];
  }
}
