import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppSelect } from './wpp-select';
declare const _default: Meta<typeof WppSelect>;
export default _default;
type SelectStoryArgs = Components.WppSelect & {
  showIconStart: boolean;
};
export declare const Single: Story<SelectStoryArgs>;
export declare const Multiple: Story<SelectStoryArgs>;
export declare const Text: Story<Components.WppSelect & {
  showIconStart: boolean;
}>;
