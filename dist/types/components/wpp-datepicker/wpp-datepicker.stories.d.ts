import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../components';
type DatepickerWithLimits = Components.WppDatepicker & {
  min: string;
  max: string;
};
declare const _default: Meta<DatepickerWithLimits>;
export default _default;
export declare const Single: Story<DatepickerWithLimits>;
export declare const Range: Story<DatepickerWithLimits>;
export declare const RangeWithPresets: Story<DatepickerWithLimits>;
export declare const DependableDatepickers: Story<DatepickerWithLimits>;
