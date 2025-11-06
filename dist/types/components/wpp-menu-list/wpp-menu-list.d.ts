import { Instance } from 'tippy.js';
import { DropdownConfig } from '../../types/common';
import { ShouldCloseOnOutsideClickHandler } from './types';
/**
 * @slot trigger-element - Content that is considered the list target. Can be used on one element only and that element must be passed first. If used, other components are displayed as a list.
 *
 * @part trigger - Trigger menu element
 * @part inner - Content slot element
 */
export declare class WppMenuList {
  protected listRef?: Element;
  host: HTMLWppMenuListElement;
  tippyInstance: Instance;
  contextList: HTMLElement;
  hidden: boolean;
  /**
   * Helper that defines If the menu can be closed by clicking outside of it.
   */
  readonly shouldCloseOnOutsideClick: ShouldCloseOnOutsideClickHandler;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  handleClickItem(e: CustomEvent): void;
  updateDropdownConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  connectedCallback(): void;
  private createTippyInstance;
  private hostCssClasses;
  private innerWrapperCssClasses;
  render(): any;
}
