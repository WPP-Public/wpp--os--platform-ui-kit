import { h, Host } from '@stencil/core';
import isEqual from 'lodash/isEqual';
import { MENU_ITEM_ACTIVE_CLASS } from '../wpp-list-item/const';
import { getHighestContainerInDOM, transformToVersionedTag } from '../../utils/utils';
import { BUTTON_ROLE, CONTEXT_ITEM_TAG, GROUP_ROLE, MENU_BAR_ROLE, MENU_CONTEXT_TAG, MENU_CONTEXT_KEYBOARD_ACTIVATION_EVENT, MENU_ITEM, MENU_ROLE, PRESENTATION_ROLE, TAB_FOCUS_CLASS, WPP_LIST_CLASSNAME, TOPBAR_NAVIGATION_ITEM_TAG, } from './constants';
import { menuListConfig } from '../../common/menuListConfig';
import { setDefaultDropdownConfig } from './config';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @part list-wrapper -list wrapper element
 * @part list - Contains the `menu-item` elements.
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
export class WppMenuContext {
  constructor() {
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
        default:
          break;
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
    if (!isEqual(newConfig, oldConfig)) {
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
  static get is() { return "wpp-menu-context"; }
  static get registryIs() { return "wpp-menu-context-v4-3-0"; }
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
      },
      "isBtnTrigger": {
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
              "text": undefined
            }],
          "text": "Defines if the trigger element should act as a button and open the dropdown on click.\nThis property is used for cases when a list-item is passed as the trigger-element, like in the `chat-input` component"
        },
        "attribute": "is-btn-trigger",
        "reflect": false,
        "defaultValue": "false"
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
      }, {
        "name": "wppMenuContextKeyboardActivation",
        "method": "handleKeyboardActivation",
        "target": "window",
        "capture": true,
        "passive": false
      }];
  }
}
