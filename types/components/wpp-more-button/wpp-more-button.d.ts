import { AriaProps, FOCUS_TYPE } from '../../types/common';
export declare class WppMoreButton {
  private buttonRef?;
  host: HTMLWppMoreButtonElement;
  isPressed: boolean;
  focusType: FOCUS_TYPE;
  validAriaProps: Record<string, string>;
  /**
   * Defines the button name.
   */
  readonly name?: string;
  /**
   * Indicates the size of the button. Different sizes have different paddings.
   */
  readonly size: 's' | 'm';
  /**
   * If the button is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component is in loading state.
   */
  readonly loading: boolean;
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
