import { DropdownConfig } from '../../types/common';
import { RangeOf } from '../../types/numberRange';
/**
 * @part label - Label text element
 * @part tooltip - tag wrapper content
 * @part tooltip-text - tag text component
 * @part overlay - tag overlay
 *
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a user icon.
 */
export declare class WppTag {
  host: HTMLWppTagElement;
  hasIconStartSlot: boolean;
  /**
   * Defines the tag style.
   */
  readonly variant?: 'neutral' | 'warning' | 'positive' | 'negative' | `Cat-${Exclude<RangeOf<9>, 0>}`;
  /**
   * Maximum label length (in characters) of single item
   */
  readonly maxLabelLength: number;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly tooltipConfig: DropdownConfig;
  /**
   * Defines the tag label.
   */
  readonly label?: string;
  /**
   * Defines the tag disabled state.
   * @internal - This prop is controlled by Accordion, and Tree components.
   */
  readonly disabled: boolean;
  componentWillLoad(): void;
  private updateSlotData;
  private hostCssClasses;
  private iconStartCssClasses;
  render(): any;
}
