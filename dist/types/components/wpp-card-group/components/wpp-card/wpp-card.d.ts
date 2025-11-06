import { EventEmitter } from '../../../../stencil-public-runtime';
import { FOCUS_TYPE } from '../../../../types/common';
import { CardSize, CardType, CardValue, CardState, CardChangeEventDetail } from './types';
interface FocusType {
  card: FOCUS_TYPE;
  icon: FOCUS_TYPE;
}
/**
 * @slot - Content that is placed inside the card. The default slot, without the name attribute.
 * @slot header - Content that is placed inside the header section.
 * @slot actions - Content is placed inside the `.actions` element and add content to actions.
 *
 * @part header-wrapper - card header wrapper
 * @part header - card header
 * @part card - card container
 * @part actions - actions container
 * @part radio - input radio element
 * @part checkbox - Checkbox element
 * @part inner - Content slot element
 */
export declare class WppCard {
  host: HTMLWppCardElement;
  hasHeaderSlot: boolean;
  hasActionsSlot: boolean;
  componentState: CardState;
  focusType: FocusType;
  /**
   * Indicates the variant of the card.
   */
  readonly variant: 'primary' | 'secondary';
  /**
   * Indicates the value of the card
   */
  readonly value?: CardValue;
  /**
   * Indicates the size of the card
   */
  readonly size: CardSize;
  /**
   * Indicates the type of the card
   */
  type?: CardType;
  /**
   * If `true`, the card is disabled
   */
  readonly disabled: boolean;
  /**
   * If `true`, the card is checked
   */
  checked: boolean;
  /**
   * If `true`, it means that the card is nested inside another card, and clicking it will prevent
   * the value from card-group to change.
   *
   * @internal - This.prop is controlled by card group component, do not set it manually.
   */
  readonly nested: boolean;
  /**
   * If `true`, the card group has radio or checkbox button on the right-top-side of the card
   *
   * @internal - This prop is controlled by card group component, do not set it manually
   */
  withRadioOrCheckbox: boolean;
  /**
   * Indicates the name of the card
   */
  readonly name?: string;
  /**
   * If `true`, then on hover and on pressed card appropriate styles will be applied
   */
  readonly interactive: boolean;
  /**
   * Emitted when the checked state changes
   */
  wppClick: EventEmitter<CardChangeEventDetail>;
  /**
   * Emitted when the card receives focus
   */
  wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the card loses focus
   */
  wppBlur: EventEmitter<FocusEvent>;
  componentWillLoad(): void;
  private getUpdatedFocusInfo;
  private updateSlotData;
  private onClick;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private checkTabIndex;
  private updateComponentState;
  private cardCssClasses;
  private headerCssClasses;
  private actionsCssClasses;
  private headerWrapperCssClasses;
  private hostCssClasses;
  render(): any;
}
export {};
