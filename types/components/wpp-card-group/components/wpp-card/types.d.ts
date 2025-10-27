export type CardValue = string | number;
export type CardType = 'multiple' | 'single';
export type CardSize = 's' | 'm' | 'l' | 'xl' | '2xl';
export type CardTabElements = 'card' | 'icon';
export interface CardChangeEventDetail {
  value: CardValue;
  checked: boolean;
}
export interface CardState {
  hover: boolean;
  active: boolean;
}
