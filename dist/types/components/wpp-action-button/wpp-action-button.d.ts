import { AriaProps, FOCUS_TYPE } from '../../types/common';
/**
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a plus icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a plus icon.
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - Spinner wrapper element
 * @part spinner - Spinner element
 * @part body - Main content wrapper
 * @part icon-start-wrapper - icon-start wrapper element
 * @part icon-start - icon-start element
 * @part icon-end-wrapper - icon-end wrapper element
 * @part icon-end - icon-end element
 * @part inner - Content slot element
 * @part overlay - overlay element
 * @part icon-start-wrapper - icon-start wrapper element
 * @part icon-start - icon-start slot element
 * @part icon-end-wrapper - icon-end wrapper element
 * @part icon-end - icon-end slot element
 */
export declare class WppActionButton {
  private buttonRef?;
  host: HTMLWppActionButtonElement;
  hasIconStartSlot: boolean;
  hasIconEndSlot: boolean;
  isIconOnly: boolean;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  validAriaProps: Record<string, string>;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component is in loading state.
   */
  readonly loading: boolean;
  /**
   * Defines the button style.
   */
  readonly variant?: 'primary' | 'secondary' | 'inverted' | 'destructive';
  /**
   * If the button should be in focus on page load.
   */
  readonly autoFocus: boolean;
  /**
   * Defines the button name.
   * */
  readonly name?: string;
  /**
   * Defines the form to which the button belongs.
   * Accepts id of form or FormElement reference
   */
  readonly form?: string | HTMLFormElement;
  /**
   * Defines the button type.
   */
  readonly type: 'button' | 'reset' | 'submit';
  /**
   * Defines the button value.
   */
  readonly value?: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Method that sets focus on the native button.
   */
  setFocus(): Promise<void>;
  onUpdateAriaProps(): void;
  onDisabledChange(newVal: boolean): void;
  componentWillLoad(): void;
  private updateSlotData;
  private onKeyDown;
  private handleClick;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private hostCssClasses;
  private buttonCssClasses;
  private loadingColor;
  private iconStartCssClasses;
  private iconEndCssClasses;
  private loaderCssClasses;
  private contentCssClasses;
  render(): any;
}
