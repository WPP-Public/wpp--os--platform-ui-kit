import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppListItem } from './wpp-list-item';
declare const _default: Meta<typeof WppListItem>;
export default _default;
type ListItemStoryArgsTypes = Components.WppListItem & {
  singleLineOptions: string;
  twoLineOptions: string;
  enableTwoLine: boolean;
  labelText: string;
  width: string;
  subtitleText: string;
};
export declare const SingleLine: Story<ListItemStoryArgsTypes>;
export declare const TwoLine: Story<ListItemStoryArgsTypes>;
export declare const DynamicWidth: Story<ListItemStoryArgsTypes>;
