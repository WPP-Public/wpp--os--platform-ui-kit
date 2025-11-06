import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppCardGroup } from './wpp-card-group';
declare const _default: Meta<typeof WppCardGroup>;
export default _default;
type CardStoryArgsTypes = Components.WppCardGroup & Components.WppCard & {
  header: string;
};
type CardSingleStoryArgsTypes = CardStoryArgsTypes & {
  allowEmptySelection: boolean;
};
export declare const SingleSelectGroup: Story<CardSingleStoryArgsTypes>;
export declare const MultipleSelectGroup: Story<CardStoryArgsTypes>;
