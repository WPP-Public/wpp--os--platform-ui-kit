import { AriaProps, FOCUS_TYPE } from '../../types/common';
/**
 * @part button - Button element
 * @part icon - Icon element
 */
export declare class WppBackToTopButton {
  private buttonRef?;
  host: HTMLWppBackToTopButtonElement;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  validAriaProps: Record<string, string>;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
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
