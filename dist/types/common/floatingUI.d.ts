import { ComputeFloatingUIParams, HandlePortalAnimation } from '../types/common';
export declare const computeFloatingUI: ({ referenceEl, floatingEl, arrowEl, configOptions, showStyles, paddingOnSide, }: ComputeFloatingUIParams) => (() => void) | undefined;
export declare const handleAnimations: ({ portalRef, animation, duration, defaultComponentDuration, }: HandlePortalAnimation) => void;
