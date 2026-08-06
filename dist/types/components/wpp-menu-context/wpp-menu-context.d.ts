import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, DropdownConfig } from '../../types/common';
import { Instance } from 'tippy.js';
/**
 * @part list-wrapper -list wrapper element
 * @part list - Contains the `menu-item` elements.
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
export declare class WppMenuContext {
  private triggerRef?;
  private contentRef?;
  private wppListWrapperRef;
  private mutationObserver;
  private menuContentMutationObserver;
  private triggerElement;
  private lastTriggeringElement?;
  private restoreFocusAfterHide;
  private ignoreNextMenuKeyUp?;
  private themeSubscription;
  host: HTMLWppMenuContextElement;
  contextList: HTMLElement;
  tippyInstance: Instance;
  isNestedContext: boolean;
  hidden: boolean;
  isInComponent: boolean;
  /**
   * Defines the context menu width. The maximum width of the menu is 350px.
   */
  readonly listWidth: 'auto' | string;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * If `true`, menu-context content will be appended to the `.wpp-list-wrapper`
   */
  readonly appendToListWrapper: boolean;
  /**
   * Add an external class to the dropdown list. This class will be applied to the list wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .wpp-menu-context.external-class-name {
   *  ...
   * }
   */
  readonly externalClass: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines if the trigger element should act as a button and open the dropdown on click.
   * This property is used for cases when a list-item is passed as the trigger-element, like in the `chat-input` component
   * @internal
   */
  readonly isBtnTrigger: boolean;
  /**
   * Emitted when the input loses focus
   */
  wppBlur: EventEmitter<void>;
  /**
   * Emitted when the input receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  private handleClick;
  private handleKeyboardActivation;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  updateIsInComponent(value: boolean): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private getContentRef;
  private getTriggerRef;
  private updateTriggerElementRef;
  private addTriggerElementListeners;
  private removeTriggerElementListeners;
  private addMenuKeyboardListeners;
  private removeMenuKeyboardListeners;
  private isComponentTag;
  private checkNestedItemIsDisabled;
  private removeDisabledTag;
  private handleTippyMount;
  private handleTippyShow;
  private handleTippyHide;
  private handleTippyHidden;
  private createTippyInstance;
  private removeTippyBoxMenuAttributes;
  private restoreFocusToTriggerIfNeeded;
  private handleAriaExpandedOnTrigger;
  private hasAriaPropsProperty;
  private getAriaAttributeName;
  private applyAriaPropsAsAttributes;
  private getTriggerAriaProps;
  private updateTriggerAccessibility;
  private getComponentSelector;
  private setAttributeIfNeeded;
  private updateMenuItemAccessibility;
  private updateMenuGroupAccessibility;
  private updateMenuAccessibility;
  private removeMenuItemKeyboardListeners;
  private isMenuItem;
  private isMenuItemDisabled;
  private isElementHidden;
  private getNestedMenuContext;
  private getMenuItemsFromContainer;
  private getFocusableMenuItems;
  private getMenuItemFromEvent;
  private clearFocusedMenuItem;
  private focusMenuItem;
  /**
   * When keyboard focus moves into a nested submenu, the parent menuitem that
   * opened it must drop its visible focus ring so that only the currently
   * focused item appears focused. The parent keeps `aria-expanded` and has its
   * ring restored when the submenu is closed via ArrowLeft/Escape.
   */
  private clearParentTriggerFocusStyles;
  private focusMenuItemByPosition;
  private focusNextMenuItem;
  private getDeepActiveElement;
  /**
   * getDeepActiveElement records the node that actually held focus, which for a
   * component trigger is a control inside its shadow root (the native button
   * inside wpp-button, say). Focusing that control directly bypasses the
   * component's own setFocus, so the keyboard focus ring never comes back when the
   * menu closes. Walk back out to the shadow host whenever it owns a setFocus.
   */
  private resolveFocusTarget;
  private focusTriggeringElement;
  private openMenuFromKeyboard;
  private closeMenuFromKeyboard;
  private emitListItemKeyboardChange;
  private activateMenuItemFromKeyboard;
  private getListItemLinkAnchor;
  /**
   * Topbar navigation items are selected through their inner link's click
   * handler, which emits wppActiveNavItemChanged for the topbar to consume.
   * Dispatching wppChangeListItem on them (as for list items) selects nothing,
   * so keyboard activation clicks the real link instead — mirroring the mouse.
   */
  private activateNavigationItemFromKeyboard;
  private handleTriggerKeyDown;
  private handleTriggerKeyUp;
  private handleMenuKeyDown;
  private handleMenuKeyUp;
  private startObserving;
  private startMenuContentObserving;
  private onBlur;
  private onFocus;
  private onFocusout;
  private handleClickTrigger;
  private menuCssClasses;
  private triggerWrapperCssClasses;
  private listWrapperCssClasses;
  render(): any;
}
