import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { m as menuListConfig, c as isEqual_1 } from './menuListConfig.js';
import { M as MENU_ITEM_ACTIVE_CLASS } from './const3.js';
import { k as transformToVersionedTag, w as getHighestContainerInDOM } from './utils.js';
import { T as TAB_FOCUS_CLASS, M as MENU_ROLE, a as MENU_ITEM, P as PRESENTATION_ROLE, B as BUTTON_ROLE, C as CONTEXT_ITEM_TAG, b as MENU_CONTEXT_TAG, c as TOPBAR_NAVIGATION_ITEM_TAG, d as MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT, W as WPP_LIST_CLASSNAME, e as MENU_BAR_ROLE, G as GROUP_ROLE } from './constants.js';
import { Z as Z_INDEX } from './consts.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';

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

const wppMenuContextCss = ".sc-wpp-menu-context-h{--mc-wrapper-width:var(--wpp-mc-wrapper-width, 100%);--mc-list-box-max-width:var(--wpp-menu-context-list-box-max-width, 350px);--mc-item-bg-color-active:var(--wpp-mc-item-bg-color-active, var(--wpp-grey-color-200));--mc-item-icon-color-active:var(--wpp-mc-item-icon-color-active, var(--wpp-grey-color-800));--mc-item-width:var(--wpp-mc-item-width, var(--custom-menu-context-width, 100%));--mc-item-margin:var(--wpp-mc-item-margin, 4px 0 0 0);--mc-nested-wrapper-border-radius:var(--wpp-mc-nested-wrapper-border-radius, 6px)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--mc-wrapper-width);max-width:var(--mc-list-box-max-width);--mc-list-max-height:var(--wpp-menu-context-list-max-height, 496px);--mc-list-padding:var(--wpp-menu-context-list-padding, 8px);--mc-list-bg-color:var(--wpp-menu-context-bg-color, var(--wpp-grey-color-000));--mc-list-border-radius:var(--wpp-menu-context-list-border-radius, var(--wpp-border-radius-s));--mc-list-box-shadow:var(--wpp-menu-context-list-box-shadow, var(--wpp-box-shadow-m))}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{-webkit-box-sizing:border-box;box-sizing:border-box;max-height:var(--mc-list-max-height);margin:0;padding:var(--mc-list-padding);overflow-y:auto;list-style-type:none;background-color:var(--mc-list-bg-color);border-radius:var(--mc-list-border-radius);outline:0;-webkit-box-shadow:var(--mc-list-box-shadow);box-shadow:var(--mc-list-box-shadow);scrollbar-width:thin}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar{width:7px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-thumb{background:var(--wpp-grey-color-400);border:2px solid var(--wpp-grey-color-000);border-radius:4px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context::-webkit-scrollbar-track{margin-top:8px}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.sc-wpp-menu-context{display:-ms-inline-flexbox;display:inline-flex}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{width:100%}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested.sc-wpp-menu-context{border-radius:var(--mc-nested-wrapper-border-radius)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .trigger-wrapper.nested[data-expanded=true].sc-wpp-menu-context{background-color:var(--mc-item-bg-color-active)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list.sc-wpp-menu-context{width:var(--custom-menu-context-width, 100%)}.wpp-menu-context-wrapper.sc-wpp-menu-context-h .wpp-list[data-wpp-theme=dark].sc-wpp-menu-context{background-color:var(--wpp-grey-color-200)}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden]{visibility:visible;pointer-events:all;-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-h.wpp-menu-nested-context-wrapper .sc-wpp-menu-context-s .tippy-box[data-reference-hidden] .tippy-content{-webkit-transition-duration:300ms !important;transition-duration:300ms !important}.sc-wpp-menu-context-s>[slot=trigger-element]:active::part(icon-extended){color:var(--mc-item-icon-color-active)}.sc-wpp-menu-context-s .tippy-box[data-animation=fadein][data-state=hidden]{opacity:0}.sc-wpp-menu-context-s .wpp-list-item,.sc-wpp-menu-context-s .wpp-menu-context{--mc-item-width:100%;width:var(--mc-item-width);--li-width:var(--mc-item-width);overflow:hidden}.sc-wpp-menu-context-s .wpp-list-item:not(:first-child),.sc-wpp-menu-context-s .wpp-menu-context:not(:first-child){margin:var(--mc-item-margin)}";

const WppMenuContext = /*@__PURE__*/ proxyCustomElement(class WppMenuContext extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.restoreFocusAfterHide = false;
    this.themeSubscription = themeSubscriptionController(() => this.contentRef);
    this.getContentRef = (node) => {
      this.contentRef = node;
    };
    this.getTriggerRef = (node) => {
      this.triggerRef = node;
    };
    this.updateTriggerElementRef = () => {
      this.triggerElement = this.triggerRef?.querySelector('[slot="trigger-element"]');
    };
    this.addTriggerElementListeners = () => {
      if (!this.triggerElement)
        return;
      this.triggerElement.addEventListener('blur', this.onBlur);
      this.triggerElement.addEventListener('focus', this.onFocus);
      this.triggerElement.addEventListener('keydown', this.handleTriggerKeyDown, true);
      this.triggerElement.addEventListener('keyup', this.handleTriggerKeyUp, true);
    };
    this.removeTriggerElementListeners = () => {
      if (!this.triggerElement)
        return;
      this.triggerElement.removeEventListener('blur', this.onBlur);
      this.triggerElement.removeEventListener('focus', this.onFocus);
      this.triggerElement.removeEventListener('keydown', this.handleTriggerKeyDown, true);
      this.triggerElement.removeEventListener('keyup', this.handleTriggerKeyUp, true);
    };
    this.addMenuKeyboardListeners = () => {
      this.contentRef?.addEventListener('keydown', this.handleMenuKeyDown, true);
      this.contentRef?.addEventListener('keyup', this.handleMenuKeyUp, true);
    };
    this.removeMenuKeyboardListeners = () => {
      this.contentRef?.removeEventListener('keydown', this.handleMenuKeyDown, true);
      this.contentRef?.removeEventListener('keyup', this.handleMenuKeyUp, true);
    };
    this.isComponentTag = (element, tagName) => {
      if (!element)
        return false;
      const lowerCaseTag = tagName.toLowerCase();
      const elementTag = element.tagName.toLowerCase();
      return elementTag === lowerCaseTag || elementTag === transformToVersionedTag(lowerCaseTag);
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
    // Composed Tippy lifecycle handlers. Defined as stable class members so the
    // dropdownConfig watcher can re-assert them on setProps without losing the
    // menu's own ARIA/focus handling; consumer callbacks are read from
    // this.dropdownConfig at call time.
    this.handleTippyMount = (instance) => {
      this.removeTippyBoxMenuAttributes(instance);
      if (this.dropdownConfig?.onMount) {
        return this.dropdownConfig.onMount(instance);
      }
    };
    this.handleTippyShow = (instance) => {
      this.removeTippyBoxMenuAttributes(instance);
      if (this.listWidth !== 'auto') {
        instance.popper.style.width = this.listWidth;
      }
      this.handleAriaExpandedOnTrigger('show');
      this.updateMenuAccessibility();
      const listItems = this.contentRef?.querySelectorAll(transformToVersionedTag('wpp-list-item'));
      Array.from(listItems || []).forEach(item => {
        item.setAttribute('container-state', 'shown');
        item.setAttribute('container-state', 'tooltipTrigger');
      });
      if (this.dropdownConfig?.onShow) {
        return this.dropdownConfig.onShow(instance);
      }
    };
    this.handleTippyHide = (instance) => {
      this.handleAriaExpandedOnTrigger('hide');
      this.clearFocusedMenuItem();
      this.removeMenuItemKeyboardListeners();
      if (this.dropdownConfig?.onHide) {
        return this.dropdownConfig.onHide(instance);
      }
    };
    this.handleTippyHidden = () => {
      this.restoreFocusToTriggerIfNeeded();
      // Resolve activeElement against the trigger's own root so triggers living
      // inside a shadow tree (e.g. wpp-topbar-item) are compared correctly.
      const rootNode = this.triggerElement?.getRootNode();
      if (this.triggerElement && rootNode?.activeElement === this.triggerElement)
        return;
      this.isInComponent = false;
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
        // Tippy defaults to role="tooltip", which is not valid for menu popups.
        role: '',
        // Tippy's default `aria.expanded: 'auto'` stamps aria-expanded onto its
        // reference (the role-less `.trigger-wrapper` div), causing aria-allowed-attr
        // violations. A consumer-provided `aria` (e.g. { content: 'labelledby' })
        // would clobber the library default that guards against this, so re-assert
        // `expanded: undefined` here. menu-context manages aria-expanded on the real
        // trigger element itself via updateTriggerAccessibility.
        aria: {
          ...this.dropdownConfig?.aria,
          expanded: undefined,
        },
        onMount: this.handleTippyMount,
        onShow: this.handleTippyShow,
        onHide: this.handleTippyHide,
        onHidden: this.handleTippyHidden,
        onClickOutside: instance => {
          // This function handles cases when the user clicks anywhere else but on
          // the trigger element or on the dropdowns. Since the nested menu-contexts
          // are appended to the parent, they are considered part of the main dropdown
          instance.hide();
        },
      });
      // Tippy can stamp aria-expanded / aria-haspopup onto its reference (the
      // role-less `.trigger-wrapper` div) on initialization, which is an
      // aria-allowed-attr violation since the div has no widget role. These props
      // are managed on the real trigger element by updateTriggerAccessibility, and
      // handleAriaExpandedOnTrigger clears them from the wrapper on show/hide, but
      // not before the first interaction — so strip them here to cover that gap.
      this.triggerRef?.removeAttribute('aria-expanded');
      this.triggerRef?.removeAttribute('aria-haspopup');
    };
    this.removeTippyBoxMenuAttributes = (instance) => {
      const tippyBox = instance.popper.querySelector('.tippy-box');
      tippyBox?.removeAttribute('role');
      tippyBox?.removeAttribute('tabindex');
    };
    this.restoreFocusToTriggerIfNeeded = () => {
      if (!this.restoreFocusAfterHide)
        return;
      this.restoreFocusAfterHide = false;
      this.focusTriggeringElement();
      this.lastTriggeringElement = undefined;
    };
    this.handleAriaExpandedOnTrigger = (type) => {
      const isExpanded = type === 'show';
      if (this.triggerRef) {
        this.triggerRef.dataset.expanded = String(isExpanded);
        this.triggerRef.removeAttribute('aria-expanded');
        this.triggerRef.removeAttribute('aria-haspopup');
      }
      if (this.isNestedContext &&
        !isExpanded &&
        this.triggerElement?.classList.contains(TAB_FOCUS_CLASS) &&
        !this.isMenuItemDisabled(this.triggerElement)) {
        this.triggerElement.tabIndex = 0;
      }
      this.updateTriggerAccessibility(isExpanded);
    };
    this.hasAriaPropsProperty = (element) => {
      const tagName = element.tagName.toLowerCase();
      return ('ariaProps' in element ||
        ['wpp-button', 'wpp-action-button', 'wpp-more-button'].some(tag => tagName.includes(tag)));
    };
    this.getAriaAttributeName = (key) => `aria-${key.toLowerCase()}`;
    this.applyAriaPropsAsAttributes = (element, ariaProps) => {
      Object.entries(ariaProps).forEach(([key, value]) => {
        if (key === 'tabIndex')
          return;
        if (key === 'role') {
          if (value)
            element.setAttribute('role', String(value));
          return;
        }
        const attrName = this.getAriaAttributeName(key);
        if (value === undefined || value === null) {
          element.removeAttribute(attrName);
          return;
        }
        element.setAttribute(attrName, String(value));
      });
    };
    this.getTriggerAriaProps = (isExpanded) => ({
      ...this.ariaProps,
      haspopup: this.ariaProps.haspopup || MENU_ROLE,
      expanded: isExpanded,
    });
    this.updateTriggerAccessibility = (isExpanded) => {
      if (!this.triggerElement)
        return;
      const triggerAriaProps = this.getTriggerAriaProps(isExpanded);
      if (this.isNestedContext) {
        this.applyAriaPropsAsAttributes(this.triggerElement, triggerAriaProps);
        this.triggerElement.setAttribute('role', MENU_ITEM);
        return;
      }
      if (this.hasAriaPropsProperty(this.triggerElement)) {
        this.triggerElement.ariaProps = {
          ...(this.triggerElement.ariaProps || {}),
          ...triggerAriaProps,
        };
        return;
      }
      const currentRole = this.triggerElement.getAttribute('role');
      const shouldSetButtonRole = !this.triggerElement.matches('button, a[href], input, select, textarea, summary') &&
        (!currentRole || currentRole === PRESENTATION_ROLE);
      this.applyAriaPropsAsAttributes(this.triggerElement, triggerAriaProps);
      if (shouldSetButtonRole) {
        this.triggerElement.setAttribute('role', BUTTON_ROLE);
      }
    };
    this.getComponentSelector = (tagName) => {
      const lowerCaseTag = tagName.toLowerCase();
      return `${lowerCaseTag}, ${transformToVersionedTag(lowerCaseTag)}`;
    };
    this.setAttributeIfNeeded = (element, attrName, value) => {
      if (element.getAttribute(attrName) !== value)
        element.setAttribute(attrName, value);
    };
    this.updateMenuItemAccessibility = (item) => {
      this.setAttributeIfNeeded(item, 'role', MENU_ITEM);
      item.addEventListener('keydown', this.handleMenuKeyDown, true);
      item.addEventListener('keyup', this.handleMenuKeyUp, true);
      if (!this.isMenuItemDisabled(item) && !item.classList.contains(TAB_FOCUS_CLASS)) {
        item.tabIndex = -1;
      }
      if (this.isMenuItemDisabled(item)) {
        this.setAttributeIfNeeded(item, 'aria-disabled', 'true');
      }
      else {
        item.removeAttribute('aria-disabled');
      }
    };
    this.updateMenuGroupAccessibility = (group) => {
      const hasDividerOnly = group.hasAttribute('with-divider') && !group.hasAttribute('header') && !group.children.length;
      const role = hasDividerOnly ? PRESENTATION_ROLE : GROUP_ROLE;
      this.setAttributeIfNeeded(group, 'role', role);
      const header = group.getAttribute('header');
      if (header && !group.hasAttribute('aria-label')) {
        group.setAttribute('aria-label', header);
      }
    };
    this.updateMenuAccessibility = () => {
      if (!this.contentRef)
        return;
      const menuItems = this.contentRef.querySelectorAll(this.getComponentSelector(CONTEXT_ITEM_TAG));
      const menuGroups = this.contentRef.querySelectorAll(this.getComponentSelector('wpp-menu-group'));
      const nestedMenus = this.contentRef.querySelectorAll(this.getComponentSelector(MENU_CONTEXT_TAG));
      Array.from(menuItems).forEach(this.updateMenuItemAccessibility);
      Array.from(menuGroups).forEach(this.updateMenuGroupAccessibility);
      Array.from(nestedMenus).forEach(menu => menu.removeAttribute('role'));
    };
    this.removeMenuItemKeyboardListeners = () => {
      const menuItems = this.contentRef?.querySelectorAll(this.getComponentSelector(CONTEXT_ITEM_TAG));
      Array.from(menuItems || []).forEach(item => {
        item.removeEventListener('keydown', this.handleMenuKeyDown, true);
        item.removeEventListener('keyup', this.handleMenuKeyUp, true);
      });
    };
    this.isMenuItem = (element) => this.isComponentTag(element, CONTEXT_ITEM_TAG) || this.isComponentTag(element, TOPBAR_NAVIGATION_ITEM_TAG);
    this.isMenuItemDisabled = (item) => (item.hasAttribute('disabled') && item.getAttribute('disabled') !== 'false') ||
      item.classList.contains('disabled') ||
      item.classList.contains('wpp-disabled');
    this.isElementHidden = (element) => Boolean(element.hidden) || element.hasAttribute('hidden') || element.classList.contains('wpp-hidden');
    this.getNestedMenuContext = (item) => {
      const closestMenuContext = item.closest(this.getComponentSelector(MENU_CONTEXT_TAG));
      return closestMenuContext && closestMenuContext !== this.host ? closestMenuContext : undefined;
    };
    this.getMenuItemsFromContainer = (container) => {
      const menuItems = [];
      Array.from(container.children).forEach(child => {
        const element = child;
        if (element.getAttribute('slot') === 'trigger-element')
          return;
        if (this.isMenuItem(element)) {
          menuItems.push(element);
          return;
        }
        if (this.isComponentTag(element, MENU_CONTEXT_TAG)) {
          const nestedTrigger = element.querySelector('[slot="trigger-element"]');
          if (nestedTrigger && this.isMenuItem(nestedTrigger)) {
            menuItems.push(nestedTrigger);
          }
          return;
        }
        menuItems.push(...this.getMenuItemsFromContainer(element));
      });
      return menuItems;
    };
    this.getFocusableMenuItems = () => this.contentRef
      ? this.getMenuItemsFromContainer(this.contentRef).filter(item => !this.isMenuItemDisabled(item) && !this.isElementHidden(item))
      : [];
    this.getMenuItemFromEvent = (event) => {
      const items = this.getFocusableMenuItems();
      return event
        .composedPath()
        .find((element) => Boolean(element.tagName) && items.includes(element));
    };
    this.clearFocusedMenuItem = () => {
      const menuItems = this.contentRef?.querySelectorAll(this.getComponentSelector(CONTEXT_ITEM_TAG));
      Array.from(menuItems || []).forEach(item => {
        item.classList.remove(TAB_FOCUS_CLASS);
        item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
        if (!this.isMenuItemDisabled(item))
          item.tabIndex = -1;
      });
      // Topbar navigation items carry the same keyboard highlight classes but
      // keep their native tabIndex (they are ordinary tab stops by design), so
      // only the classes are cleared — otherwise the previous item keeps its
      // focus ring while the arrow keys move on.
      const navigationItems = this.contentRef?.querySelectorAll(this.getComponentSelector(TOPBAR_NAVIGATION_ITEM_TAG));
      Array.from(navigationItems || []).forEach(item => {
        item.classList.remove(TAB_FOCUS_CLASS);
        item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
      });
    };
    this.focusMenuItem = (item) => {
      this.clearFocusedMenuItem();
      this.clearParentTriggerFocusStyles();
      item.tabIndex = 0;
      item.classList.add(TAB_FOCUS_CLASS);
      item.focus();
      item.scrollIntoView?.({ block: 'nearest' });
    };
    /**
     * When keyboard focus moves into a nested submenu, the parent menuitem that
     * opened it must drop its visible focus ring so that only the currently
     * focused item appears focused. The parent keeps `aria-expanded` and has its
     * ring restored when the submenu is closed via ArrowLeft/Escape.
     */
    this.clearParentTriggerFocusStyles = () => {
      if (!this.isNestedContext || !this.triggerElement)
        return;
      this.triggerElement.classList.remove(TAB_FOCUS_CLASS);
      this.triggerElement.classList.remove(MENU_ITEM_ACTIVE_CLASS);
    };
    this.focusMenuItemByPosition = (position) => {
      const items = this.getFocusableMenuItems();
      const item = position === 'first' ? items[0] : items[items.length - 1];
      if (item)
        this.focusMenuItem(item);
    };
    this.focusNextMenuItem = (currentItem, direction) => {
      const items = this.getFocusableMenuItems();
      const currentIndex = items.indexOf(currentItem);
      if (currentIndex === -1)
        return;
      const nextIndex = (currentIndex + direction + items.length) % items.length;
      this.focusMenuItem(items[nextIndex]);
    };
    // document.activeElement stops at a shadow host; walk shadow roots so a
    // trigger rendered inside one (e.g. wpp-topbar-item) is resolved correctly.
    this.getDeepActiveElement = () => {
      let active = document.activeElement;
      while (active?.shadowRoot?.activeElement) {
        active = active.shadowRoot.activeElement;
      }
      return active || undefined;
    };
    /**
     * getDeepActiveElement records the node that actually held focus, which for a
     * component trigger is a control inside its shadow root (the native button
     * inside wpp-button, say). Focusing that control directly bypasses the
     * component's own setFocus, so the keyboard focus ring never comes back when the
     * menu closes. Walk back out to the shadow host whenever it owns a setFocus.
     */
    this.resolveFocusTarget = (element) => {
      let target = element;
      let host = target.getRootNode().host;
      while (typeof host?.setFocus === 'function') {
        target = host;
        host = target.getRootNode().host;
      }
      return target;
    };
    this.focusTriggeringElement = () => {
      const triggerElement = this.lastTriggeringElement || this.triggerElement;
      if (!triggerElement)
        return;
      const focusableTrigger = this.resolveFocusTarget(triggerElement);
      // isConnected, unlike document.contains, is also true for elements living
      // inside a shadow tree (e.g. the wpp-topbar-item navigation triggers).
      if (!focusableTrigger.isConnected)
        return;
      if (this.isMenuItem(focusableTrigger) && !this.isMenuItemDisabled(focusableTrigger)) {
        focusableTrigger.tabIndex = 0;
        focusableTrigger.classList.add(TAB_FOCUS_CLASS);
        focusableTrigger.focus();
        return;
      }
      if (typeof focusableTrigger.setFocus === 'function') {
        void focusableTrigger.setFocus().catch(() => {
          if (focusableTrigger.isConnected)
            focusableTrigger.focus();
        });
        return;
      }
      focusableTrigger.focus();
    };
    this.openMenuFromKeyboard = (position = 'first') => {
      if (!this.tippyInstance || this.tippyInstance.state?.isShown || this.tippyInstance.state?.isVisible) {
        this.focusMenuItemByPosition(position);
        return;
      }
      this.lastTriggeringElement = this.getDeepActiveElement() || this.triggerElement;
      if (typeof this.tippyInstance.show === 'function') {
        this.tippyInstance.show();
      }
      else {
        this.handleAriaExpandedOnTrigger('show');
      }
      setTimeout(() => {
        this.focusMenuItemByPosition(position);
      }, 0);
    };
    this.closeMenuFromKeyboard = () => {
      this.restoreFocusAfterHide = true;
      this.clearFocusedMenuItem();
      if (typeof this.tippyInstance?.hide === 'function') {
        this.tippyInstance.hide();
      }
      else {
        this.handleAriaExpandedOnTrigger('hide');
      }
      setTimeout(this.restoreFocusToTriggerIfNeeded, 0);
    };
    this.emitListItemKeyboardChange = (item) => {
      const listItem = item;
      if (listItem.selectable && !listItem.nonInteractive) {
        listItem.checked = !listItem.checked;
      }
      item.dispatchEvent(new CustomEvent('wppChangeListItem', {
        bubbles: false,
        composed: false,
        detail: {
          value: listItem.value,
          checked: listItem.checked,
          label: item.querySelector('[slot="label"]')?.textContent || '',
          target: listItem,
          isSelectBasedEvent: Boolean(item.closest('.wpp-select-portal')),
          isAutocompleteBasedEvent: Boolean(item.closest(transformToVersionedTag('wpp-autocomplete'))),
        },
      }));
    };
    this.activateMenuItemFromKeyboard = (item) => {
      const nestedMenuContext = this.getNestedMenuContext(item);
      if (nestedMenuContext) {
        item.classList.remove(MENU_ITEM_ACTIVE_CLASS);
        return;
      }
      if (this.isNestedContext) {
        this.host.dispatchEvent(new CustomEvent(MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT, { bubbles: true, composed: true }));
      }
      else {
        this.restoreFocusAfterHide = true;
      }
      if (this.isComponentTag(item, TOPBAR_NAVIGATION_ITEM_TAG)) {
        this.activateNavigationItemFromKeyboard(item);
        return;
      }
      const listItemLink = this.getListItemLinkAnchor(item);
      if (listItemLink) {
        // A native-link list item (linkConfig.href) navigates through its inner anchor.
        // Clicking that anchor mirrors the mouse exactly: native navigation fires, and the
        // anchor's click bubbles to the list item's own handler which emits wppChangeListItem
        // once. Dispatching the change event ourselves instead would navigate nothing.
        listItemLink.click();
        return;
      }
      this.emitListItemKeyboardChange(item);
    };
    this.getListItemLinkAnchor = (item) => {
      if (!this.isComponentTag(item, CONTEXT_ITEM_TAG))
        return null;
      return item.shadowRoot?.querySelector('a.item[href]') ?? null;
    };
    /**
     * Topbar navigation items are selected through their inner link's click
     * handler, which emits wppActiveNavItemChanged for the topbar to consume.
     * Dispatching wppChangeListItem on them (as for list items) selects nothing,
     * so keyboard activation clicks the real link instead — mirroring the mouse.
     */
    this.activateNavigationItemFromKeyboard = (item) => {
      const link = item.shadowRoot?.querySelector('a.link');
      if (link) {
        link.click();
        return;
      }
      item.click();
    };
    this.handleTriggerKeyDown = (event) => {
      const firstItemKeys = this.isNestedContext ? ['Enter', ' ', 'ArrowRight'] : ['Enter', ' ', 'ArrowDown'];
      if (firstItemKeys.includes(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === 'Enter' || event.key === ' ') {
          this.ignoreNextMenuKeyUp = event.key;
        }
        this.openMenuFromKeyboard('first');
        return;
      }
      if (!this.isNestedContext && event.key === 'ArrowUp') {
        event.preventDefault();
        event.stopPropagation();
        this.openMenuFromKeyboard('last');
        return;
      }
      if (this.isNestedContext && (event.key === 'Escape' || event.key === 'ArrowLeft')) {
        event.preventDefault();
        event.stopPropagation();
        this.closeMenuFromKeyboard();
      }
    };
    this.handleTriggerKeyUp = (event) => {
      if (event.key !== this.ignoreNextMenuKeyUp)
        return;
      event.preventDefault();
      event.stopPropagation();
      this.ignoreNextMenuKeyUp = undefined;
    };
    this.handleMenuKeyDown = (event) => {
      const currentItem = this.getMenuItemFromEvent(event);
      if (!currentItem)
        return;
      const nestedMenuContext = this.getNestedMenuContext(currentItem);
      if (nestedMenuContext && ['Enter', ' ', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        return;
      }
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          event.stopPropagation();
          this.focusNextMenuItem(currentItem, 1);
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          event.stopPropagation();
          this.focusNextMenuItem(currentItem, -1);
          break;
        }
        case 'Home': {
          event.preventDefault();
          event.stopPropagation();
          this.focusMenuItemByPosition('first');
          break;
        }
        case 'End': {
          event.preventDefault();
          event.stopPropagation();
          this.focusMenuItemByPosition('last');
          break;
        }
        case 'ArrowLeft': {
          if (!this.isNestedContext)
            return;
          event.preventDefault();
          event.stopPropagation();
          this.closeMenuFromKeyboard();
          break;
        }
        case 'Escape':
        case 'Tab': {
          // Tab exits the menu instead of tabbing through menuitems; focus is restored to the trigger.
          event.preventDefault();
          event.stopPropagation();
          this.closeMenuFromKeyboard();
          break;
        }
        case 'Enter':
        case ' ': {
          event.preventDefault();
          event.stopPropagation();
          currentItem.classList.add(MENU_ITEM_ACTIVE_CLASS);
          break;
        }
      }
    };
    this.handleMenuKeyUp = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ')
        return;
      if (event.key === this.ignoreNextMenuKeyUp) {
        event.preventDefault();
        event.stopPropagation();
        this.ignoreNextMenuKeyUp = undefined;
        return;
      }
      const currentItem = this.getMenuItemFromEvent(event);
      if (!currentItem)
        return;
      if (this.getNestedMenuContext(currentItem))
        return;
      event.preventDefault();
      event.stopPropagation();
      currentItem.classList.remove(MENU_ITEM_ACTIVE_CLASS);
      this.activateMenuItemFromKeyboard(currentItem);
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
      event.preventDefault();
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
    this.isBtnTrigger = false;
  }
  handleClick(event) {
    if (!this.tippyInstance?.state?.isVisible)
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
    if (this.tippyInstance?.state?.isVisible) {
      this.tippyInstance.hide();
    }
  }
  handleKeyboardActivation() {
    // A submenu item was activated via keyboard. Tippy relocates each menu's
    // content (including nested menu-contexts) into a popup appended to <body>,
    // so this event no longer bubbles through the root menu-context host - hence
    // we listen on window. Only the currently-open root menu should mark itself
    // to restore focus to its trigger once it hides.
    if (!this.isNestedContext && this.tippyInstance?.state?.isVisible) {
      this.restoreFocusAfterHide = true;
    }
  }
  updateDropdownConfig(newConfig, oldConfig) {
    if (!isEqual_1(newConfig, oldConfig)) {
      this.dropdownConfig = newConfig;
      // Re-assert the same overrides as createTippyInstance. Passing the raw
      // config straight to Tippy would let its default `aria.expanded: 'auto'`
      // re-stamp aria-expanded onto the role-less `.trigger-wrapper` (an
      // aria-allowed-attr violation) and, critically, would replace the
      // composed onMount/onShow/onHide handlers with the consumer's raw
      // callbacks — dropping the menu's own ARIA and focus lifecycle work.
      // A parent that re-renders while the menu is open (e.g. wpp-topbar-item
      // toggling menuExpanded) passes a fresh config object each render, so
      // this watcher must keep the composed handlers intact. The composed
      // handlers read this.dropdownConfig, so consumer callbacks stay honored.
      if (typeof this.tippyInstance?.setProps !== 'function')
        return;
      this.tippyInstance.setProps({
        ...newConfig,
        role: '',
        aria: {
          ...newConfig?.aria,
          expanded: undefined,
        },
        onMount: this.handleTippyMount,
        onShow: this.handleTippyShow,
        onHide: this.handleTippyHide,
        onHidden: this.handleTippyHidden,
      });
    }
  }
  updateIsInComponent(value) {
    if (!value)
      this.onBlur();
  }
  componentWillLoad() {
    this.isNestedContext = this.isBtnTrigger ? false : this.isComponentTag(this.host?.children[0], CONTEXT_ITEM_TAG);
  }
  componentDidLoad() {
    this.themeSubscription.start();
    this.createTippyInstance();
    this.checkNestedItemIsDisabled();
    this.mutationObserver = new MutationObserver(() => {
      this.removeDisabledTag();
    });
    this.menuContentMutationObserver = new MutationObserver(() => {
      this.updateMenuAccessibility();
    });
    this.startObserving();
    this.startMenuContentObserving();
    this.addMenuKeyboardListeners();
    if (this.triggerRef) {
      this.updateTriggerElementRef();
      this.addTriggerElementListeners();
    }
    this.updateTriggerAccessibility(false);
    this.updateMenuAccessibility();
  }
  connectedCallback() {
    this.themeSubscription.start();
    // Reinitialize tippy and mutation observer if disconnectedCallback was called and
    // the same instance of component was deattached and attached to DOM again
    if (this.tippyInstance?.state?.isDestroyed) {
      this.createTippyInstance();
    }
    if (this.mutationObserver) {
      this.startObserving();
    }
    if (this.menuContentMutationObserver) {
      this.startMenuContentObserving();
    }
    this.updateTriggerElementRef();
    this.addTriggerElementListeners();
    this.addMenuKeyboardListeners();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (!this.isNestedContext) {
      this.tippyInstance?.destroy();
    }
    this.removeTriggerElementListeners();
    this.removeMenuKeyboardListeners();
    this.removeMenuItemKeyboardListeners();
    this.mutationObserver?.disconnect();
    this.menuContentMutationObserver?.disconnect();
  }
  startObserving() {
    if (!this.host?.children[0])
      return;
    this.mutationObserver.observe(this.host.children[0], { attributes: true });
  }
  startMenuContentObserving() {
    if (!this.contentRef)
      return;
    this.menuContentMutationObserver.observe(this.contentRef, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'role', 'header', 'with-divider'],
    });
  }
  render() {
    const style = {
      '--custom-menu-context-width': this.listWidth === 'auto' ? '' : this.listWidth,
    };
    return (h(Host, { class: this.menuCssClasses(), exportparts: "trigger, list-wrapper, list, inner", onFocusout: this.onFocusout }, h("div", { ref: this.getTriggerRef, onClick: this.handleClickTrigger, class: this.triggerWrapperCssClasses() }, h("slot", { name: "trigger-element", part: "trigger" })), h("div", { class: "wpp-list-wrapper", part: "list-wrapper", ref: ref => (this.wppListWrapperRef = ref) }, h("ul", { class: this.listWrapperCssClasses(), style: style, ref: this.getContentRef, role: MENU_ROLE, part: "list" }, h("slot", { part: "inner", onSlotchange: this.updateMenuAccessibility })))));
  }
  static get registryIs() { return "wpp-menu-context-v4-3-0"; }
  get host() { return this; }
  static get watchers() { return {
    "dropdownConfig": ["updateDropdownConfig"],
    "isInComponent": ["updateIsInComponent"]
  }; }
  static get style() { return wppMenuContextCss; }
}, [6, "wpp-menu-context", "wpp-menu-context-v4-3-0", {
    "listWidth": [513, "list-width"],
    "dropdownConfig": [1040],
    "appendToListWrapper": [4, "append-to-list-wrapper"],
    "externalClass": [1, "external-class"],
    "ariaProps": [16],
    "isBtnTrigger": [4, "is-btn-trigger"],
    "contextList": [32],
    "tippyInstance": [32],
    "isNestedContext": [32],
    "hidden": [32],
    "isInComponent": [32]
  }, [[10, "wppChangeListItem", "handleClick"], [10, "wppActiveTopbarItemChange", "handleClick"], [10, "wppActiveNavItemChanged", "handleClick"], [10, "wppMenuContextKeyboardActivation", "handleKeyboardActivation"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-menu-context-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-menu-context-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppMenuContext);
      }
      break;
  } });
}

export { WppMenuContext as W, defineCustomElement as d };
