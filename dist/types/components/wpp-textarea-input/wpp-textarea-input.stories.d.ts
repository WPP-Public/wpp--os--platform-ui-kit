import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppTextareaInput } from './wpp-textarea-input';
declare const _default: Meta<typeof WppTextareaInput>;
export default _default;
export declare const WithinLimit: Story<Components.WppTextareaInput>;
export declare const LimitExceeded: Story<Components.WppTextareaInput>;
export declare const NoneLimit: Story<Components.WppTextareaInput & Components.WppInlineMessage>;
