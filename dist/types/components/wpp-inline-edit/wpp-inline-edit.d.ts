import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { InlineEditChangeModeEventDetail, InlineEditMode } from './types';
export declare class WppInlineEdit {
  private inputRef?;
  private formElementRef?;
  private wrapperRef?;
  private popoverRef?;
  host: HTMLWppInlineEditElement;
  initialValue: string;
  inputValue: string;
  isEdit: boolean;
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
   * Emitted when the inline edit mode changes
   */
  wppModeChange: EventEmitter<InlineEditChangeModeEventDetail>;
  /**
   * Method for closing inline-edit
   */
  closePopover(): Promise<void>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  editModeChangeHandler(): void;
  private getFormElement;
  private emitModeChange;
  private handleAccept;
  private handleClose;
  private inlineEditCssClasses;
  private inlineEditPopoverCssClasses;
  private placeholderCssClasses;
  render(): any;
}
