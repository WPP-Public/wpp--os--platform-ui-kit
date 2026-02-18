import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppInput>;
export default _default;
export declare const Regular: StoryObj<Components.WppInput & {
  showIconStart: boolean;
  showIconEnd: boolean;
}>;
export declare const Search: StoryObj<Components.WppInput>;
export declare const DecimalWithLimits: StoryObj<Components.WppInput>;
export declare const TextWithDecimalMask: StoryObj<Components.WppInput>;
export declare const TextWithCustomMask: StoryObj<Components.WppInput>;
export declare const TelWithPlaceholderMask: StoryObj<Components.WppInput>;
