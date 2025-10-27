import { SliderRangeType, SliderTypes } from './types';
import { MaskitoNumberParams } from '@maskito/kit/src/lib/masks/number/number-params';
export declare const DEFAULT_INPUT_WIDTH = "68px";
export declare const getDefaultMaskOptions: (step: number) => MaskitoNumberParams;
export declare const parseMaskedInput: (input: string, options: MaskitoNumberParams) => number;
export declare const formatDecimalWithMask: (value: number, options: MaskitoNumberParams) => string;
export declare const getMaskOptionsForInput: (sliderType?: SliderTypes, inputType?: SliderRangeType, maskOptions?: MaskitoNumberParams | MaskitoNumberParams[]) => MaskitoNumberParams;
