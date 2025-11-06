import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppFullScreenModal } from './wpp-full-screen-modal';
declare const _default: Meta<typeof WppFullScreenModal>;
export default _default;
type FullScreenModalStoryArgs = Components.WppFullScreenModal & {
  withTitle: boolean;
} & {
  withActionBar: boolean;
};
export declare const FullScreenModal: Story<FullScreenModalStoryArgs>;
