import { DropdownConfig } from '../../types/common';
import { TypographyType } from '../wpp-typography/types';
import { LabelConfig } from './types';
/**
 * @part info-wrapper - wrapper around text and optional text
 * @part text - label text
 * @part optional - optional text
 *
 * @part wrapper - component wrapper element
 * @part content - content wrapper element
 * @part icon - Icon element
 */
export declare class WppLabel {
  /**
   * Indicates description in tooltip when hover on icon
   */
  readonly description?: string;
  /**
   * Defines which form element the label is bound to.
   */
  readonly htmlFor?: string;
  /**
   * If **(Optional)** is displayed after the label.
   */
  readonly optional: boolean;
  /**
   * Defines the label typography style.
   */
  readonly typography: Extract<TypographyType, 's-strong' | 's-body'>;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * Indicates label config
   */
  config?: LabelConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly tooltipConfig: DropdownConfig;
  private hostCssClasses;
  render(): any;
}
