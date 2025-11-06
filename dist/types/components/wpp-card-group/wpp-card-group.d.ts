import { EventEmitter } from '../../stencil-public-runtime';
import { BaseComponent } from '../../interfaces/base-component';
import { CardSize, CardValue, CardChangeEventDetail } from './components/wpp-card/types';
import { CardGroupChangeEventDetail, CardGroupValue } from './types';
/**
 * @slot - Content is placed inside the card-group component. It can be only <wpp-card>. The default slot, without the name attribute.
 *
 * @part inner - Content slot element
 */
export declare class WppCardGroup implements BaseComponent {
  private directCardChildren;
  private observer;
  readonly host: HTMLWppCardGroupElement;
  /**
   * Indicates the card group name
   */
  readonly name: string;
  /**
   * Indicates the size of the cards
   */
  readonly size: CardSize;
  /**
   * Indicates the card group value
   */
  value?: CardGroupValue;
  /**
   * If `true`, the card group will give possibility to select multiple cards
   */
  readonly multiple: boolean;
  /**
   * If `true`, the card group is required
   */
  readonly required: boolean;
  /**
   * If `true`, the card group has radio or checkbox button on the right-top-side of the card
   */
  readonly withRadioOrCheckbox: boolean;
  /**
   * If `true`, single card group require no card selection and can be empty. Users can deselect a card by clicking it again.
   */
  readonly allowEmptySelection: boolean;
  /**
   * Emitted when the card group value changes
   */
  readonly wppChange: EventEmitter<CardGroupChangeEventDetail>;
  /**
   * Emitted when the card group receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the card group loses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  handleClick(event: CustomEvent<CardChangeEventDetail>): void;
  onValueChange(newValue: CardValue): void;
  onUpdateSize(): void;
  onUpdateWithRadioOrCheckbox(): void;
  onUpdateMultiple(): void;
  private updateCardProperties;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private updateSlotContent;
  private getDirectCardChildren;
  private setCardsProps;
  private setActiveCard;
  private onFocus;
  private onBlur;
  private hostCssClasses;
  render(): any;
}
