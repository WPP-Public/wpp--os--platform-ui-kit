import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
import { WppStepper } from './wpp-stepper';
declare const _default: Meta<typeof WppStepper>;
export default _default;
interface Props extends Components.WppStepper, Components.WppStep {
}
export declare const VerticalDecimalStepper: Story<Props>;
export declare const Vertical: Story<Props>;
export declare const VerticalStepperWithWidth: Story<Props>;
export declare const Horizontal: Story<Props>;
