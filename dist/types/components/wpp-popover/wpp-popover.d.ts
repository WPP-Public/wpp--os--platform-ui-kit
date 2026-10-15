import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, DropdownConfig } from '../../types/common';
import { PopoverClearEventDetail, PopoverInputChangeEventDetail, PopoverLocalesInterface, PopoverShouldCloseOnOutsideClickHandler } from './types';
/**
 * @slot trigger-element - Can contain the popover anchor element. It should be a single focusable element (e.g. `wpp-button`), optionally inside wrappers such as `wpp-tooltip`, which receives the focus back from the dropdown and exposes its expanded state.
 * @slot actions - Can contain the right-side popover footer actions.
 * @slot - Can contain the popover content. The default slot, without the name attribute.
 *
 * @part anchor - Popover anchor wrapper
 * @part content - Popover content wrapper
 * @part footer - Popover footer wrapper
 * @part footer-actions - Popover footer actions wrapper
 */
export declare class WppPopover {
  private anchorRef;
  private focusScopeEl?;
  private contentEl?;
  private footerEl?;
  private footerActionsEl?;
  private mutationObserver;
  private triggerRenderObserver?;
  private observedTriggerRoot?;
  private isTriggerExpanded;
  private tippyInstance;
  private hasClickedOutside;
  private focusType;
  private isOpenedWithPointer;
  private internalSearchName;
  private searchInputEl?;
  private themeSubscription;
  hidden: boolean;
  hasFooterActions: boolean;
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
   * Contains the dropdown `aria-` props: `role`, `label`, `labelledby` and `describedby`.
   * Passing this property replaces the default, so provide a `label` (or `labelledby`) to keep the dropdown named.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<PopoverLocalesInterface>;
  /**
   * If `true`, renders a Clear action on the left edge of the popover footer.
   */
  readonly showClearButton: boolean;
  /**
   * Emitted when the value of the search input inside the dropdown changes.
   */
  readonly wppSearchChange: EventEmitter<PopoverInputChangeEventDetail>;
  /**
   * Emitted when the optional Clear action is clicked.
   */
  readonly wppClear: EventEmitter<PopoverClearEventDetail>;
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
  private getTippyLifecycleCallbacks;
  private removeDisabledTag;
  private startObserving;
  private handleCrossButtonClick;
  private handleClearButtonClick;
  private handleSearchChange;
  private getSlottedTriggerElement;
  private isTriggerControl;
  private getTriggerElement;
  private getTriggerFocusTarget;
  private focusTriggerElement;
  private hasAriaPropsProperty;
  private updateTriggerExpandedState;
  private observeTriggerRender;
  private restoreTriggerExpandedState;
  private focusDropdown;
  private isFocusWithinPopper;
  private handleStartSentinelFocus;
  private handleEndSentinelFocus;
  private handleTriggerKeyDown;
  private handlePopperPointerDown;
  private handlePopperKeyDown;
  private isPointerEvent;
  private isEscapeKey;
  private closeOnEscape;
  private updateSlotData;
  private handleTriggerSlotChange;
  private hostCssClasses;
  private contentCssClasses;
  private get mergedLocales();
  private exportParts;
  render(): any;
}
