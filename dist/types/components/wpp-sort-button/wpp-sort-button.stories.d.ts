import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppSortButton } from './wpp-sort-button';
declare const _default: Meta<typeof WppSortButton>;
export default _default;
type WppSortButtonTypes = Components.WppFilterButton & {
  text: string;
};
export declare const Sort: Story<WppSortButtonTypes>;
