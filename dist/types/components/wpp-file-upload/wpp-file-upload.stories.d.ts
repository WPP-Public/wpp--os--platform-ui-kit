import { StoryObj, Meta } from '@storybook/web-components';
import { Components } from '../../components';
declare const _default: Meta<Components.WppFileUpload>;
export default _default;
export declare const FileUpload: StoryObj<Components.WppFileUpload>;
export declare const LoadingTotalSize: StoryObj<Components.WppFileUpload>;
/**
 * The four states a file can be in while a backend processes it. A file that has not
 * reported progress yet reads 0% rather than hiding the percentage.
 */
export declare const BackendProcessing: StoryObj<Components.WppFileUpload>;
export declare const ControlledReset: StoryObj<Components.WppFileUpload>;
export declare const WildcardAcceptConfig: StoryObj<Components.WppFileUpload>;
