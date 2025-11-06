import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../../../components';
import { WppCard } from './wpp-card';
declare const _default: Meta<typeof WppCard>;
export default _default;
type CardStoryArgs = Components.WppCard & {
  withActions: boolean;
  extendedHeaderExample: boolean;
  header: string;
};
export declare const Regular: Story<CardStoryArgs>;
export declare const Clickable: Story<CardStoryArgs>;
