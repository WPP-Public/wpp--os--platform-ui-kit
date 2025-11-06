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
  readonly variant?: 'neutral' | 'warning' | 'positive' | 'negative';
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
   * Selects the tag color from categorical.
   */
  readonly categoricalColorIndex?: Exclude<RangeOf<9>, 0>;
  /**
   * Defines the if the tag icon displayed.
   *
   * @deprecated - this prop will be deleted in version ***. If you want tag with icon, you can add slot with some icon inside tag component
   */
  readonly withIcon?: boolean;
  /**
   * Defines the tag disabled state.
   * @internal - This prop is controlled by Accordion, and Tree components.
   */
  readonly disabled: boolean;
  componentWillLoad(): void;
  updateCategoricalIndex(index: number): void;
  private updateSlotData;
  protected updateCategoricalColor: (index?: number) => void;
  private hostCssClasses;
  private iconStartCssClasses;
  render(): any;
}
