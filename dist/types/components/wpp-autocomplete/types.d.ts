import { ListItemInterface, SelectOptionChangeEventDetail } from '../wpp-select/types';
import { ListValue } from '../wpp-list-item/types';
export type AutocompleteOption = Record<string, any>;
export type AutocompleteTypes = 'regular' | 'extended';
export type AutocompleteChangeReason = 'removeOption' | 'selectOption';
export type AutocompleteChangeEventDetail = ({
  value: ListValue[];
  selectedOptions: ListItemInterface[];
  reason: AutocompleteChangeReason;
} & {
  name?: string;
}) | ((SelectOptionChangeEventDetail & {
  reason: 'selectOption';
}) & {
  name?: string;
}) | ({
  value: null;
  reason: 'removeOption';
} & {
  name?: string;
});
export type GetItemKeyType<V = any, K = string | number> = (value: V) => K | undefined;
export interface AutocompleteLocales {
  nothingFound: string;
  loading: string;
  selected: (count: number) => string;
  showMore: string;
  showLess: string;
  suggestionTitle: string;
  createNewElement: (query: string) => string;
  clearMultiple: string;
  clearSingle: string;
}
export interface CancellablePromise<T> extends Promise<T> {
  cancelled?: boolean;
}
export type LoadMoreHandler = () => Promise<void>;
