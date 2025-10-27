import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppCardGroup>;
export default _default;
type CardStoryArgsTypes = Components.WppCardGroup & Components.WppCard & {
  header: string;
};
type CardSingleStoryArgsTypes = CardStoryArgsTypes & {
  allowEmptySelection: boolean;
};
export declare const SingleSelectGroup: StoryObj<CardSingleStoryArgsTypes>;
export declare const MultipleSelectGroup: StoryObj<CardStoryArgsTypes>;
