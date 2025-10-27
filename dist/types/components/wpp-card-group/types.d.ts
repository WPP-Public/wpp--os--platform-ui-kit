import { CardValue } from './components/wpp-card/types';
export type CardGroupValue = CardValue | CardValue[];
export interface CardGroupChangeEventDetail {
  value: CardGroupValue;
  name?: string;
}
