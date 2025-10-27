import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppSelect>;
export default _default;
type SelectStoryArgs = Components.WppSelect & {
  showIconStart: boolean;
};
export declare const Single: StoryObj<SelectStoryArgs>;
export declare const Multiple: StoryObj<SelectStoryArgs>;
export declare const Text: StoryObj<Components.WppSelect & {
  showIconStart: boolean;
}>;
type ButtonAnchorStoryArgs = Components.WppSelect & {
  anchorComponent: 'WppButton' | 'WppActionButton' | 'WppActionButtonWithIcon';
  anchorLabel: string;
  showIconStart: boolean;
};
export declare const ButtonAnchor: StoryObj<ButtonAnchorStoryArgs>;
