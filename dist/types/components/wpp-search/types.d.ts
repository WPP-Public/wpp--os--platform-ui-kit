import { SelectOptionChangeEventDetail } from '../wpp-select/types';
import { LabelConfig } from '../wpp-label/types';
export type SearchOption = Record<string, any>;
export type SearchOptionList = SearchOption[];
export interface SearchDefaultOption extends SearchOption {
  id: SearchOptionId;
  label: string;
}
export type SearchChangeEventDetail = ({
  value: SearchOptionList;
  reason: SearchChangeReason;
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
export type SearchChangeReason = 'applyOption' | 'removeOption' | 'selectOption';
export type SearchOptionId = string | number;
export type SearchGetOptionIdHandler = (item: SearchOption) => SearchOptionId;
export type SearchGetOptionLabelHandler = (item: SearchOption) => string;
export interface SearchLocales {
  nothingFound?: string;
  loading?: string;
  dropdownHeader?: string;
  /**
   * Accessible name for the clear (cross) button shown when the search has a value.
   * Defaults to 'Clear search'.
   */
  clearButtonLabel?: string;
  /**
   * Accessible name for the options `listbox` popup. Defaults to 'Search results'.
   */
  optionsListLabel?: string;
  /**
   * Accessible name for the search input, used when no visible label or placeholder
   * is provided. Defaults to 'Search'.
   */
  searchLabel?: string;
}
export type SearchLabelConfig = LabelConfig;
