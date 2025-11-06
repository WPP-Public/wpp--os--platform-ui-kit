import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppSegmentedControl } from './wpp-segmented-control';
declare const _default: Meta<typeof WppSegmentedControl>;
export default _default;
export declare const Text: Story<Components.WppSegmentedControl & Components.WppSegmentedControlItem & {
  text: string;
}>;
export declare const Icon: Story<Components.WppSegmentedControlItem>;
