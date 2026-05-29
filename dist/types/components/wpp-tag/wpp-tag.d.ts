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
  private labelRef?;
  private resizeObserver?;
  private resizeObserverCallback?;
  private themeSubscription;
  host: HTMLWppTagElement;
  hasIconStartSlot: boolean;
  isOverflowTruncated: boolean;
  /**
   * Defines the tag style.
   */
  readonly variant?: 'neutral' | 'warning' | 'positive' | 'negative' | `Cat-${Exclude<RangeOf<9>, 0>}`;
  /**
   * Maximum label length (in characters) of single item.
   * @deprecated - Use CSS width constraints instead. Text will automatically truncate with ellipsis when it overflows. This prop will be removed in version 5.0.0.
   *
   * Note: The default value is 30 characters for backward compatibility. If you want truncation
   * based purely on the element's width (e.g. via CSS `max-width`), set this prop to `undefined`.
   * Otherwise, the character-based truncation will take precedence and the label will be cut off
   * at 30 characters before any CSS width constraint is applied.
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
  onLabelChange(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  private setLabelRef;
  private checkLabelOverflow;
  private initResizeObserver;
  private getLabelText;
  private hostCssClasses;
  private iconStartCssClasses;
  private renderLabel;
  render(): any;
}
