import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppModal } from './wpp-modal';
declare const _default: Meta<typeof WppModal>;
export default _default;
type ModalWithBackButton = Components.WppModal & {
  withCrossButton: boolean;
};
export declare const Regular: Story<ModalWithBackButton>;
export declare const Destructive: Story<ModalWithBackButton>;
