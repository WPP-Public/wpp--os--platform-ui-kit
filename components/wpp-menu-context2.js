import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, c as isEqual_1 } from './menuListConfig.js';
import { k as transformToVersionedTag, w as getHighestContainerInDOM } from './utils.js';
import { W as WPP_LIST_CLASSNAME, C as CONTEXT_ITEM_TAG, T as TOPBAR_NAVIGATION_ITEM_TAG, M as MENU_BAR_ROLE, a as MENU_ROLE } from './constants.js';
import { Z as Z_INDEX } from './consts.js';

const defaultDropdownConfig = {
  trigger: 'manual',
  placement: 'bottom-start',
  hideOnClick: false,
  offset: [0, 4],
  zIndex: Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
        },
      },
    ],
  },
};
const defaultNestedDropdownConfig = {
  trigger: 'mouseenter focus',
  hideOnClick: false,
  placement: 'right-start',
  offset: [-8, 9],
  zIndex: Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left-start', 'left'],
        },
      },
    ],
  },
};
const setDefaultDropdownConfig = (isNested) => isNested ? defaultNestedDropdownConfig : defaultDropdownConfig;

const wppMenuContextCss = ".sc-wpp-menu-context-h{--mc-wrapper-width:var(--wpp-mc-wrapper-width, 100%);--mc-list-box-max-width:var(--wpp-menu-context-list-box-max-width, 350px);--mc-item-bg-color-active:var(--wpp-mc-item-bg-color-active, var(--wpp-grey-color-200));--mc-item-icon-color-active:var(--wpp-mc-item-icon-color-active, var(--wpp-grey-color-800));--mc-item-width:var(--wpp-mc-item-width, var(--custom-menu-context-width, 100%));--mc-item-margin:var(--wpp-mc-item-margin, 4px 0 0 0);--mc-nested-wrapper-border-radius:var(--wpp-mc-nested-wrapper-border-radius, 6px)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--mc-wrapper-width);max-width:var(--mc-list-box-max-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m))}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar{width:7px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-track{margin-top:8px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.sc-wpp-menu-context{display:-ms-inline-flexbox;display:inline-flex}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{width:100%}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{border-radius:var(--mc-nested-wrapper-border-radius)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested[aria-expanded=true].sc-wpp-menu-context{background-color:var(--mc-item-bg-color-active)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{width:var(--custom-menu-context-width, 100%)}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden]{visibility:visible;pointer-events:all;-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden] .tippy-content{-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-s>[slot=trigger-element]:active::part(icon-extended){color:var(--mc-item-icon-color-active)}.sc-wpp-menu-context-s .tippy-box[data-animation=fadein][data-state=hidden]{opacity:0}.sc-wpp-menu-context-s .wpp-list-item,.sc-wpp-menu-context-s .wpp-menu-context{--mc-item-width:100%;width:var(--mc-item-width);--li-width:var(--mc-item-width);overflow:hidden}.sc-wpp-menu-context-s .wpp-list-item:not(:first-child),.sc-wpp-menu-context-s .wpp-menu-context:not(:first-child){margin:var(--mc-item-margin)}";

const WppMenuContext = /*@__PURE__*/ proxyCustomElement(class WppMenuContext extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
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
    if (!isEqual_1(newConfig, oldConfig)) {
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
  static get registryIs() { return "wpp-menu-context-v4-0-0"; }
  get host() { return this; }
  static get watchers() { return {
    "dropdownConfig": ["updateDropdownConfig"],
    "isInComponent": ["updateIsInComponent"]
  }; }
  static get style() { return wppMenuContextCss; }
}, [6, "wpp-menu-context", "wpp-menu-context-v4-0-0", {
    "listWidth": [513, "list-width"],
    "dropdownConfig": [1040],
    "appendToListWrapper": [4, "append-to-list-wrapper"],
    "externalClass": [1, "external-class"],
    "ariaProps": [16],
    "contextList": [32],
    "tippyInstance": [32],
    "isNestedContext": [32],
    "hidden": [32],
    "isInComponent": [32]
  }, [[10, "wppChangeListItem", "handleClick"], [10, "wppActiveTopbarItemChange", "handleClick"], [10, "wppActiveNavItemChanged", "handleClick"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-menu-context-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-menu-context-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppMenuContext);
      }
      break;
  } });
}

export { WppMenuContext as W, defineCustomElement as d };
