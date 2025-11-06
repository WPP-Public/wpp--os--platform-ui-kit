import { DecimalMaskOptions } from '../wpp-input/types';
import { SliderRangeType, SliderTypes } from './types';
export declare const DEFAULT_INPUT_WIDTH = "68px";
export declare const getDefaultMaskOptions: (step: number) => DecimalMaskOptions;
export declare const parseMaskedInput: (input: string, options: DecimalMaskOptions) => number;
export declare const formatDecimalWithMask: (value: number, options: DecimalMaskOptions) => string;
export declare const getMaskOptionsForInput: (sliderType?: SliderTypes, inputType?: SliderRangeType, maskOptions?: DecimalMaskOptions | DecimalMaskOptions[]) => DecimalMaskOptions;
