import { AriaProps, FOCUS_TYPE } from '../../types/common';
/**
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part icon - Icon element
 * @part text - Main text content
 * @part inner - Content slot element
 */
export declare class WppSortButton {
  private buttonRef?;
  host: HTMLWppSortButtonElement;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  validAriaProps: Record<string, string>;
  /**
   * Defines the button name.
   */
  readonly name?: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the button should be in focus on page load.
   */
  readonly autoFocus: boolean;
  /**
   * Method that sets focus on the native button.
   */
  setFocus(): Promise<void>;
  onUpdateAriaProps(): void;
  componentWillLoad(): void;
  private onKeyDown;
  private onKeyUp;
  private onBlur;
  private onMouseDown;
  private hostCssClasses;
  private buttonCssClasses;
  render(): any;
}
