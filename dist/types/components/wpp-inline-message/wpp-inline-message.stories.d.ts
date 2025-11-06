import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppInlineMessage } from './wpp-inline-message';
declare const _default: Meta<typeof WppInlineMessage>;
export default _default;
export declare const Warning: Story<Components.WppInlineMessage>;
export declare const Error: Story<Components.WppInlineMessage>;
export declare const Informational: Story<Components.WppInlineMessage>;
export declare const Success: Story<Components.WppInlineMessage>;
export declare const WithInput: {
  (args: Components.WppInput): import("lit-html").TemplateResult<1>;
  args: {
    size: string;
    message: string;
    type: string;
    maxMessageLength: string;
    tooltipConfig: {};
  };
};
