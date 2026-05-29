import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { InlineEditChangeModeEventDetail, InlineEditConfirmDetail, InlineEditLocales, InlineEditMode } from './types';
export declare class WppInlineEdit {
  private resizeObserver;
  private popoverInstance;
  private viewTextRef?;
  private viewResizeObserver?;
  private viewResizeObserverCallback?;
  private tooltipInstance;
  private inputRef?;
  private popoverRef?;
  private triggerContainerRef?;
  private lastValueWithError?;
  private _locales;
  host: HTMLWppInlineEditElement;
  initialValue: string;
  inputValue: string;
  formType: 'input' | 'textarea';
  isPendingRequest: boolean;
  /**
   * Defines the error message of the inline edit component.
   * The error message is displayed in a tooltip when the component is hovered.
   */
  errorMessage?: string;
  isViewTextTruncated: boolean;
  /**
   * Defines the inline edit mode.
   */
  readonly mode: InlineEditMode;
  /**
   * Defines the value of the editing field.
   */
  readonly value: string;
  /**
   * Defines the placeholder for the input field. It is displayed when the input field is empty.
   * The placeholder is visible only in view mode. In edit mode, the input provided by the user will be displayed.
   */
  readonly placeholder?: string;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly dropdownConfig: DropdownConfig;
  /**
   * Defines the width of the input field when in active state.
   * Accepts any valid CSS width expression (e.g., "300px", "100%", "calc(100% - 68px)").
   */
  readonly inputWidth?: string;
  /**
   * Indicates locales for the inline-edit component
   */
  readonly locales: Partial<InlineEditLocales>;
  /**
   * Emitted when the inline edit mode changes
   */
  wppModeChange: EventEmitter<InlineEditChangeModeEventDetail>;
  /**
   * Emitted when user clicks "Confirm" button.
   */
  wppConfirm: EventEmitter<InlineEditConfirmDetail>;
  /**
   * Method for closing inline-edit
   */
  closePopover(): Promise<void>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  editModeChangeHandler(): void;
  onValueChange(): void;
  onUpdateLocales(newLocales: Partial<InlineEditLocales>): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private handleAnchorResize;
  disconnectedCallback(): void;
  private checkViewTextOverflow;
  private initViewResizeObserver;
  private setViewTextRef;
  private getFormElement;
  private emitModeChange;
  private handleAccept;
  private setErrorState;
  private handleClose;
  private inlineEditCssClasses;
  private inlineEditPopoverCssClasses;
  private onKeyDownFormEl;
  private viewTextCssClasses;
  private renderViewText;
  private renderViewContent;
  private renderTriggerElement;
  render(): any;
}
