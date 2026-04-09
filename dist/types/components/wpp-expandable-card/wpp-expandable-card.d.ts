import { EventEmitter } from '../../stencil-public-runtime';
import { ExpandableCardSectionChangeEventDetail } from './types';
/**
 * @slot - Content that is placed inside the card. The default slot, without the name attribute.
 * @slot header - Content that is placed inside the header section.
 * @slot actions - Content is placed inside the `.actions` element and add content to actions wrapper
 *
 * @part expandable-card-body - Wrapper around accordion
 * @part accordion - accordion element
 * @part wpp-accordion(*) - you can use all wpp-accordion parts (header,title and others)
 */
export declare class WppExpandableCard {
  host: HTMLWppExpandableCardElement;
  hasActionsSlot: boolean;
  headerMaxWidth?: number;
  /**
   * If `true`, the component is expanded by default. This prop should be used if you are not interested in controlling
   * expanded state, but you need accordion to be opened at first render.
   */
  expandedByDefault: boolean;
  /**
   * If `true`, the component is expanded
   */
  isExpanded: boolean;
  /**
   * Indicates expandable card size
   */
  readonly size: 's' | 'm' | 'l' | 'xl' | '2xl';
  /**
   * Indicates the variant of the card.
   */
  readonly variant: 'primary' | 'secondary';
  /**
   * Emitted when the expandable state changes
   */
  wppChange: EventEmitter<ExpandableCardSectionChangeEventDetail>;
  /**
   * Emitted when the section receives focus
   */
  wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the section loses focus
   */
  wppBlur: EventEmitter<FocusEvent>;
  componentWillLoad(): void;
  private updateSlotData;
  private onChange;
  private onFocus;
  private onBlur;
  private hostCssClasses;
  render(): any;
}
