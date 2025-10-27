import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppFullScreenModal>;
export default _default;
type FullScreenModalStoryArgs = Components.WppFullScreenModal & {
  withTitle: boolean;
} & {
  withActionBar: boolean;
};
export declare const FullScreenModal: StoryObj<FullScreenModalStoryArgs>;
