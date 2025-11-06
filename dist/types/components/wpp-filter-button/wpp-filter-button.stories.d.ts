import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppFilterButton } from './wpp-filter-button';
declare const _default: Meta<typeof WppFilterButton>;
export default _default;
type WppFilterButtonTypes = Components.WppFilterButton & {
  text: string;
};
export declare const Filter: Story<WppFilterButtonTypes>;
