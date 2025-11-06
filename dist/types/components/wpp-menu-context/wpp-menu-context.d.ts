import { DropdownConfig } from '../../types/common';
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
  private isTriggerDisabled;
  host: HTMLWppMenuContextElement;
  contextList: HTMLElement;
  tippyInstance: Instance;
  isNestedContext: boolean;
  hidden: boolean;
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
  private handleClick;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private getContentRef;
  private getTriggerRef;
  private checkNestedItemIsDisabled;
  private removeDisabledTag;
  private createTippyInstance;
  private handleAriaExpandedOnTrigger;
  private startObserving;
  private menuCssClasses;
  private triggerWrapperCssClasses;
  private listWrapperCssClasses;
  render(): any;
}
