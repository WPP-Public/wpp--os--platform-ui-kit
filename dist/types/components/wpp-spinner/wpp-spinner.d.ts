import { AriaProps } from '../../types/common';
export declare class WppSpinner {
  /**
   * Defines the spinner color.
   */
  readonly color: string;
  /**
   * Defines the spinner size.
   */
  readonly size: 's' | 'm' | 'l';
  /**
   * Defines the spinner `aria-` props.
   */
  readonly ariaProps?: AriaProps;
  private hostCssClasses;
  private spinnerCssClasses;
  render(): any;
}
