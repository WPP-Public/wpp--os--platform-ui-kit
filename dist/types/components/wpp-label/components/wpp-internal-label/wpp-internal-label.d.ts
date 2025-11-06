import { DropdownConfig } from '../../../../types/common';
import { TypographyType } from '../../../wpp-typography/types';
import { LabelLocales } from '../../types';
/**
 * @part info-wrapper - wrapper around text and optional text
 * @part text - label text
 * @part optional-text - optional text element
 * @part info-wrapper -
 * @part text - Main text content
 * @part tooltip - tooltip wrapper content
 *
 * @slot icon - may contain an icon that will be placed after text wrapper, e.g. a info icon
 */
export declare class WppInternalLabel {
  hasIconSlot: boolean;
  host: HTMLWppInternalLabelElement;
  /**
   * Indicates text of the label
   */
  readonly labelText?: string;
  /**
   * Indicates description message in tooltip when hover on icon
   */
  readonly description?: string;
  /**
   * Indicates optional field to fill with (Optional) text after label
   */
  readonly optional: boolean;
  /**
   * Indicates different typography styles for label
   */
  readonly typography: Extract<TypographyType, 's-strong' | 's-body'>;
  /**
   * If `true`, the component is disabled
   */
  readonly disabled: boolean;
  /**
   * Indicates locales for label component
   */
  readonly locales: LabelLocales;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly tooltipConfig: DropdownConfig;
  componentWillLoad(): void;
  private updateSlotData;
  private iconCssClasses;
  private hostCssClasses;
  private infoWrapperCssClasses;
  render(): any;
}
