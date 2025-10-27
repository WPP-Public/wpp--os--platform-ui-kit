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
  private variantClass;
  host: HTMLWppTagElement;
  hasIconStartSlot: boolean;
  /**
   * Defines the tag style.
   * This property has higher priority than `categoricalColorIndex`. If `variant` is set, the `categoricalColorIndex` will be ignored.
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
   * Selects the tag color from categorical palette.
   * This property has lower priority than `variant`. If `variant` is set, the `categoricalColorIndex` will be ignored.
   * @deprecated - This property will be removed in v4.0.0. Use `variant` instead.
   */
  readonly categoricalColorIndex?: Exclude<RangeOf<9>, 0>;
  /**
   * Defines the if the tag icon displayed.
   *
   * @deprecated - this prop will be deleted in version 4.0.0. If you want tag with icon, you can add slot with some icon inside tag component
   */
  readonly withIcon?: boolean;
  /**
   * Defines the tag disabled state.
   * @internal - This prop is controlled by Accordion, and Tree components.
   */
  readonly disabled: boolean;
  onUpdateVariant(): void;
  updateCategoricalIndex(index: number): void;
  componentWillLoad(): void;
  private updateTagColor;
  private updateSlotData;
  protected updateCategoricalColor: (index?: number) => void;
  private hostCssClasses;
  private iconStartCssClasses;
  render(): any;
}
