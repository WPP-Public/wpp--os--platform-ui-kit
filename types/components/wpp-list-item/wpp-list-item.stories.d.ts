import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppListItem>;
export default _default;
type ListItemStoryArgsTypes = Components.WppListItem & {
  singleLineOptions: string;
  twoLineOptions: string;
  enableTwoLine: boolean;
  labelText: string;
  width: string;
  subtitleText: string;
};
export declare const SingleLine: StoryObj<ListItemStoryArgsTypes>;
export declare const TwoLine: StoryObj<ListItemStoryArgsTypes>;
export declare const DynamicWidth: StoryObj<ListItemStoryArgsTypes>;
