import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppAutocomplete } from './wpp-autocomplete';
declare const _default: Meta<typeof WppAutocomplete>;
export default _default;
type AutocompleteStoryArgs = Components.WppAutocomplete;
export declare const Regular: Story<AutocompleteStoryArgs>;
export declare const Extended: Story<AutocompleteStoryArgs>;
export declare const RegularSlotSuggestions: Story<AutocompleteStoryArgs>;
