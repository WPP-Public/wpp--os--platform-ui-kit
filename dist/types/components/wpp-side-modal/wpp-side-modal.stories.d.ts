import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppSideModal } from './wpp-side-modal';
declare const _default: Meta<typeof WppSideModal>;
export default _default;
type SideModalStoryArgs = Components.WppSideModal & {
  withActions: boolean;
};
export declare const SideModal: Story<SideModalStoryArgs>;
export declare const SideModalWithActionsConfig: Story<Components.WppSideModal>;
