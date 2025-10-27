import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../../../components';
declare const _default: Meta<Components.WppCard>;
export default _default;
type CardStoryArgs = Components.WppCard & {
  withActions: boolean;
  extendedHeaderExample: boolean;
  header: string;
};
export declare const Regular: StoryObj<CardStoryArgs>;
export declare const Clickable: StoryObj<CardStoryArgs>;
