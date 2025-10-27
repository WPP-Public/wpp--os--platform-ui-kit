import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppInlineMessage>;
export default _default;
export declare const Warning: StoryObj<Components.WppInlineMessage>;
export declare const Error: StoryObj<Components.WppInlineMessage>;
export declare const Informational: StoryObj<Components.WppInlineMessage>;
export declare const Success: StoryObj<Components.WppInlineMessage>;
export declare const WithInput: {
  (args: Components.WppInput): import("lit-html").TemplateResult<1>;
  args: {
    size: string;
    message: string;
    type: string;
    maxMessageLength: string;
    labelConfig: {
      text: string;
    };
    tooltipConfig: {};
  };
  parameters: {
    controls: {
      exclude: string[];
    };
  };
};
