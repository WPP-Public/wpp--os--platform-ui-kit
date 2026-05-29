import { EventEmitter } from '../../../../stencil-public-runtime';
import { AriaProps, FOCUS_TYPE } from '../../../../types/common';
import { CardChangeEventDetail, CardSize, CardState, CardType, CardValue } from './types';
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
  private themeSubscription;
  host: HTMLWppCardElement;
  hasHeaderSlot: boolean;
  hasActionsSlot: boolean;
  componentState: CardState;
  isPressed: boolean;
  focusType: FOCUS_TYPE;
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
   * Used be remove tab navigation from the card in case when the component has WppRadio inside.
   *
   * @internal - This.prop is controlled by WppCardGroup component
   */
  index: number;
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
   * Accepts CSS background property values to control the component's background appearance. This can include colors, images, gradients, and positioning parameters.
   */
  readonly background?: string;
  /**
   * Contains the card `aria-` props.
   */
  readonly ariaProps: AriaProps;
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
  /**
   * Method that sets focus on the card element.
   */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  private onClick;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onKeyDown;
  private checkTabIndex;
  private updateComponentState;
  private cardCssClasses;
  private headerCssClasses;
  private actionsCssClasses;
  private headerWrapperCssClasses;
  private hostCssClasses;
  render(): any;
}
