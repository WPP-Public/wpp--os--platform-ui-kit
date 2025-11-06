import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppButton } from './wpp-button';
declare const _default: Meta<typeof WppButton>;
export default _default;
type WppButtonTypes = Components.WppButton & {
  showIconStart: boolean;
  showIconEnd: boolean;
  text: string;
};
export declare const Primary: Story<WppButtonTypes>;
export declare const Secondary: Story<WppButtonTypes>;
export declare const Destructive: Story<Components.WppButton & {
  text: string;
  secondary: boolean;
}>;
