import { LabelConfig } from '../wpp-label/types';
import { ListItemProps } from '../wpp-list-item/types';
import { AutocompleteChangeReason, AutocompleteOption } from '../wpp-autocomplete/types';
import { SelectOptionChangeEventDetail } from '../wpp-select/types';
export type AutocompleteOptionList = AutocompleteOption[];
export interface AutocompleteDefaultOption extends AutocompleteOption {
  id: AutocompleteOptionId;
  label: string;
}
export type AutocompleteExtendedOption = ListItemProps & AutocompleteOption;
export type AutocompleteOptionId = string | number;
export type GetOptionIdHandler = (item: AutocompleteOption) => AutocompleteOptionId;
export type GetOptionLabelHandler = (item: AutocompleteOption) => string;
export type LegacyAutocompleteChangeEventDetail = ({
  value: AutocompleteOptionList;
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
export interface LegacyAutocompleteLocales {
  nothingFound: string;
  beginTyping: string;
  more: string;
  showMore: string;
  showLess: string;
  selected: (count: number) => string;
  loading: string;
  createNewElement: string;
}
export type AutocompleteLabelConfig = LabelConfig;
