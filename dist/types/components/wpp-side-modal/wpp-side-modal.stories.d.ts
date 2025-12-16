import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppSideModal>;
export default _default;
type SideModalStoryArgs = Components.WppSideModal & {
  withActions: boolean;
};
export declare const SideModal: StoryObj<SideModalStoryArgs>;
export declare const SideModalWithActionsConfig: StoryObj<Components.WppSideModal>;
export declare const SideModalWithHeaderActionsConfig: StoryObj<Components.WppSideModal>;
