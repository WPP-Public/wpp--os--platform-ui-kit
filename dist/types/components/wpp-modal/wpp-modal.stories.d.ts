import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppModal>;
export default _default;
type ModalWithBackButton = Components.WppModal & {
  withCrossButton: boolean;
};
export declare const Regular: StoryObj<ModalWithBackButton>;
export declare const Destructive: StoryObj<ModalWithBackButton>;
