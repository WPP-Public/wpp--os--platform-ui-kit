import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppTag } from './wpp-tag';
declare const _default: Meta<typeof WppTag>;
export default _default;
type WppTagTypes = Components.WppTag & {
  showIconStart: boolean;
};
export declare const Tag: Story<WppTagTypes>;
