import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppInput } from './wpp-input';
declare const _default: Meta<typeof WppInput>;
export default _default;
export declare const Regular: Story<Components.WppInput & {
  showIconStart: boolean;
  showIconEnd: boolean;
}>;
export declare const Search: Story<Components.WppInput>;
export declare const DecimalWithLimits: Story<Components.WppInput>;
export declare const DecimalWithMask: Story<Components.WppInput>;
export declare const TextWithMask: Story<Components.WppInput>;
export declare const TelWithMask: Story<Components.WppInput>;
