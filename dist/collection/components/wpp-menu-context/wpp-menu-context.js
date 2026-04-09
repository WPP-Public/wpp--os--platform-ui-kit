import { h, Host } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { getHighestContainerInDOM, transformToVersionedTag } from '../../utils/utils';
import { CONTEXT_ITEM_TAG, MENU_BAR_ROLE, MENU_ROLE, WPP_LIST_CLASSNAME, TOPBAR_NAVIGATION_ITEM_TAG } from './constants';
import { menuListConfig } from '../../common/menuListConfig';
import { setDefaultDropdownConfig } from './config';
/**
 * @part list-wrapper -list wrapper element
 * @part list - Contains the `menu-item` elements.
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
export class WppMenuContext {
  constructor() {
    this.getContentRef = (node) => {
      this.contentRef = node;
    };
    this.getTriggerRef = (node) => {
      this.triggerRef = node;
    };
    this.checkNestedItemIsDisabled = () => {
      if (this.isNestedContext && (this.triggerRef?.children[0]).disabled) {
        this.triggerRef?.setAttribute('disabled', 'true');
      }
    };
    this.removeDisabledTag = () => {
      if (!this.triggerRef?.children[0])
        return;
      if (this.triggerRef?.getAttribute('disabled') === 'false' ||
        this.triggerRef?.children[0].getAttribute('disabled') === 'false') {
        this.triggerRef.removeAttribute('disabled');
        this.triggerRef?.children[0].removeAttribute('disabled');
      }
    };
    this.createTippyInstance = () => {
      this.removeDisabledTag();
      this.tippyInstance = menuListConfig({
        anchor: this.triggerRef,
        content: this.contentRef,
        triggerElementWidth: false,
        maxWidth: '350px',
        hideOnPopperBlur: true,
        appendTo: this.appendToListWrapper ? this.wppListWrapperRef : () => getHighestContainerInDOM(),
        ...setDefaultDropdownConfig(this.isNestedContext),
        ...this.dropdownConfig,
        onShow: (instance) => {
          if (this.listWidth !== 'auto') {
            instance.popper.style.width = this.listWidth;
          }
          this.handleAriaExpandedOnTrigger('show');
          const listItems = this.contentRef?.querySelectorAll(transformToVersionedTag('wpp-list-item'));
          Array.from(listItems || []).forEach(item => {
            item.setAttribute('container-state', 'tooltipTrigger');
          });
          if (this.dropdownConfig?.onShow) {
            return this.dropdownConfig.onShow(instance);
          }
        },
        onHide: (instance) => {
          this.handleAriaExpandedOnTrigger('hide');
          if (this.dropdownConfig?.onHide) {
            return this.dropdownConfig.onHide(instance);
          }
        },
        onHidden: () => {
          if (document.activeElement === this.triggerElement)
            return;
          this.isInComponent = false;
        },
        onClickOutside: instance => {
          // This function handles cases when the user clicks anywhere else but on
          // the trigger element or on the dropdowns. Since the nested menu-contexts
          // are appended to the parent, they are considered part of the main dropdown
          instance.hide();
        },
      });
    };
    this.handleAriaExpandedOnTrigger = (type) => {
      if (!this.triggerRef)
        return;
      const ariaExpandedValue = this.triggerRef.getAttribute('aria-expanded');
      if (!ariaExpandedValue || ariaExpandedValue === (type === 'show' ? 'false' : 'true')) {
        this.triggerRef.setAttribute('aria-expanded', type === 'show' ? 'true' : 'false');
      }
    };
    this.onBlur = () => {
      if (this.isInComponent)
        return;
      this.wppBlur.emit();
    };
    this.onFocus = (event) => {
      if (!this.isInComponent)
        this.wppFocus.emit(event);
      this.isInComponent = true;
    };
    this.onFocusout = (event) => {
      if (this.host.contains(event.relatedTarget) ||
        this.tippyInstance.popper.contains(event.relatedTarget))
        return;
      this.isInComponent = false;
    };
    this.handleClickTrigger = (event) => {
      event.stopPropagation();
      const isTriggerDisabled = !!((this.triggerElement?.hasAttribute('disabled') && this.triggerElement?.getAttribute('disabled') !== 'false') ||
        this.triggerElement?.classList.contains('disabled'));
      if (this.isNestedContext || isTriggerDisabled)
        return;
      if (!this.tippyInstance.state.isShown) {
        this.tippyInstance.show();
      }
      else {
        this.tippyInstance.hide();
      }
    };
    this.menuCssClasses = () => ({
      'wpp-menu-context': true,
      'wpp-menu-context-wrapper': true,
      'wpp-menu-nested-context-wrapper': this.isNestedContext,
    });
    this.triggerWrapperCssClasses = () => ({
      'trigger-wrapper': true,
      nested: this.isNestedContext,
    });
    this.listWrapperCssClasses = () => ({
      [WPP_LIST_CLASSNAME]: true,
      [`${this.externalClass}`]: true,
    });
    this.contextList = undefined;
    this.tippyInstance = undefined;
    this.isNestedContext = undefined;
    this.hidden = true;
    this.isInComponent = false;
    this.listWidth = 'auto';
    this.dropdownConfig = {};
    this.appendToListWrapper = false;
    this.externalClass = '';
    this.ariaProps = {};
  }
  handleClick(event) {
    if (!this.tippyInstance?.state.isVisible)
      return;
    // NOTE: our wppChangeListItem listener is called when ListItems are used in Select or Autocomplete.
    // This should be treated as hotfix until we move all our dropdowns to the document.body
    // or find other proper solution
    if (event.detail?.isSelectBasedEvent)
      return;
    if (event.detail?.isAutocompleteBasedEvent)
      return;
    const listItem = event
      .composedPath()
      .find(el => el.tagName?.includes(CONTEXT_ITEM_TAG) ||
      el.tagName?.includes(TOPBAR_NAVIGATION_ITEM_TAG));
    if (!listItem)
      return;
    const currentRole = listItem.getAttribute('role');
    const disabled = listItem.getAttribute('disabled');
    if (!currentRole ||
      [MENU_BAR_ROLE, MENU_ROLE].includes(currentRole || '') ||
      (disabled !== null && disabled !== 'false'))
      return;
    const target = event.target;
    if (target.isExtended) {
      return;
    }
    if (this.tippyInstance && this.tippyInstance?.state.isVisible) {
      this.tippyInstance.hide();
    }
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateIsInComponent(value) {
    if (!value)
      this.onBlur();
  }
  componentWillLoad() {
    this.isNestedContext =
      this.host?.children[0]?.tagName === transformToVersionedTag(CONTEXT_ITEM_TAG).toUpperCase();
  }
  componentDidLoad() {
    this.createTippyInstance();
    this.checkNestedItemIsDisabled();
    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag();
    });
    this.startObserving();
    if (this.triggerRef) {
      this.triggerElement = this.triggerRef?.querySelector('[slot="trigger-element"]');
      if (this.triggerElement) {
        this.triggerElement.addEventListener('blur', this.onBlur);
        this.triggerElement.addEventListener('focus', this.onFocus);
      }
      if (this.triggerElement && this.triggerElement.getAttribute('role')) {
        this.triggerElement.setAttribute('role', 'presentation');
      }
    }
  }
  connectedCallback() {
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
  }
  disconnectedCallback() {
    if (!this.isNestedContext) {
      this.tippyInstance?.destroy();
    }
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('blur', this.onBlur);
      this.triggerElement.removeEventListener('focus', this.onFocus);
    }
    this.mutationObserver?.disconnect();
  }
  startObserving() {
    this.mutationObserver.observe(this.host?.children[0], { attributes: true });
  }
  render() {
    const style = {
      '--custom-menu-context-width': this.listWidth === 'auto' ? '' : this.listWidth,
    };
    return (h(Host, { class: this.menuCssClasses(), exportparts: "trigger, list-wrapper, list, inner", onFocusout: this.onFocusout }, h("div", { ref: this.getTriggerRef, onClick: this.handleClickTrigger, class: this.triggerWrapperCssClasses() }, h("slot", { name: "trigger-element", part: "trigger" })), h("div", { class: "wpp-list-wrapper", part: "list-wrapper", ref: ref => (this.wppListWrapperRef = ref) }, h("ul", { class: this.listWrapperCssClasses(), style: style, ref: this.getContentRef, role: MENU_ROLE, part: "list" }, h("slot", { part: "inner" })))));
  }
  static get is() { return "wpp-menu-context"; }
  static get registryIs() { return "wpp-menu-context-v4-0-0"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-menu-context.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-menu-context.css"]
    };
  }
  static get properties() {
    return {
      "listWidth": {
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
          "text": "Defines the context menu width. The maximum width of the menu is 350px."
        },
        "attribute": "list-width",
        "reflect": true,
        "defaultValue": "'auto'"
      },
      "dropdownConfig": {
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
      "appendToListWrapper": {
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
          "text": "If `true`, menu-context content will be appended to the `.wpp-list-wrapper`"
        },
        "attribute": "append-to-list-wrapper",
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
          "text": "Add an external class to the dropdown list. This class will be applied to the list wrapper that placed in tippy box that appended to the body.\nTo add some properties to this class you have to add this class to global styles, for example\n.wpp-menu-context.external-class-name {\n ...\n}"
        },
        "attribute": "external-class",
        "reflect": false,
        "defaultValue": "''"
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
      }
    };
  }
  static get states() {
    return {
      "contextList": {},
      "tippyInstance": {},
      "isNestedContext": {},
      "hidden": {},
      "isInComponent": {}
    };
  }
  static get events() {
    return [{
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus"
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input receives focus"
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "dropdownConfig",
        "methodName": "updateDropdownConfig"
      }, {
        "propName": "isInComponent",
        "methodName": "updateIsInComponent"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppChangeListItem",
        "method": "handleClick",
        "target": "window",
        "capture": true,
        "passive": false
      }, {
        "name": "wppActiveTopbarItemChange",
        "method": "handleClick",
        "target": "window",
        "capture": true,
        "passive": false
      }, {
        "name": "wppActiveNavItemChanged",
        "method": "handleClick",
        "target": "window",
        "capture": true,
        "passive": false
      }];
  }
}
