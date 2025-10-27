import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, DropdownConfig } from '../../types/common';
import { PopoverInputChangeEventDetail, PopoverLocalesInterface, PopoverShouldCloseOnOutsideClickHandler } from './types';
/**
 * @slot trigger-element - Can contain the popover anchor element.
 * @slot - Can contain the popover content. The default slot, without the name attribute.
 *
 * @part anchor - Popover anchor wrapper
 * @part content - Popover content wrapper
 */
export declare class WppPopover {
  private anchorRef;
  private contentEl?;
  private mutationObserver;
  private tippyInstance;
  private internalSearchName;
  private searchInputEl?;
  hidden: boolean;
  host: HTMLWppPopoverElement;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  config: DropdownConfig;
  /**
   * Helper that defines If the popover can be closed by clicking outside of it.
   */
  readonly shouldCloseOnOutsideClick: PopoverShouldCloseOnOutsideClickHandler;
  /**
   * If the popover has cross button on the right-top side.
   */
  readonly closable: boolean;
  /**
   * If the popover has search inside of the dropdown.
   */
  readonly withSearch: boolean;
  /**
   * Value of the search inside the popover's dropdown.
   * This property should be used together with `this.withSearch` property.
   */
  readonly searchValue: string;
  /**
   * The name for the input component inside the popover's dropdown.
   * This property should be used together with `this.withSearch` property.
   */
  readonly searchName: string;
  /**
   * By default, the search value in the input is cleared once the dropdown is closed.
   * Set to `true` if you need the search value to not be cleared after closing the dropdown.
   * This property should be used together with `this.withSearch` property.
   */
  readonly persistantSearch: boolean;
  /**
   * Add an external class to the popover. This class will be applied to the list wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .wpp-popover.external-class-name {
   *  ...
   * }
   */
  readonly externalClass: string;
  /**
   * Defines the dropdown's width. The maximum width of the dropdown is 350px.
   */
  readonly dropdownWidth: 'auto' | string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the component locale types.
   */
  readonly locales: PopoverLocalesInterface;
  /**
   * Emitted when the value of the search input inside the dropdown changes.
   */
  readonly wppSearchChange: EventEmitter<PopoverInputChangeEventDetail>;
  /**
   * Method for closing the popover programatically
   */
  closePopover(): Promise<void>;
  /**
   * Method for opening the popover programatically
   */
  openPopover(): Promise<void>;
  updateConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  private isTriggerEnabled;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  connectedCallback(): void;
  private createTippyInstance;
  private removeDisabledTag;
  private startObserving;
  private handleCrossButtonClick;
  private handleSearchChange;
  private hostCssClasses;
  private contentCssClasses;
  render(): any;
}
