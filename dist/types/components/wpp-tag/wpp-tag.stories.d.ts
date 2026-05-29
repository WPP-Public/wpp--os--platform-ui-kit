import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppTag>;
export default _default;
type WppTagTypes = Components.WppTag & {
  showIconStart: boolean;
  truncatedLabel: string;
  maxWidth: string;
};
export declare const Tag: StoryObj<WppTagTypes>;
