import { EventEmitter } from '../../stencil-public-runtime';
import { OrientationType, StepChangeEventDetail } from './types';
/**
 * @slot - Can contain only the `wpp-step` component. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part indicator - step indicator element
 */
export declare class WppStepper {
  private prevStep;
  private componentHasLoaded;
  private resizeObserver;
  host: HTMLWppStepperElement;
  stepIndicator: number;
  stepperPosition: number;
  lastActiveStep: number;
  lastCompletedStep: number;
  /**
   * Defines the current active step, including support for sub-steps like `3.1`
   */
  readonly activeStep: number;
  /**
   * Defines how many steps can be visible on the screen while the rest are hidden. Use only in the horizontal stepper. If you don't provide a value for this prop, all steps are shown.
   */
  readonly stepAmount: number;
  /**
   * Defines the amount of the completed steps.
   */
  readonly completedSteps: number;
  /**
   * Defines the width of the stepper. Accepts string values in pixels, such as: "400px", or string values in percetages: "100%".
   * Note: This property should be used just for the vertical Stepper.
   */
  readonly stepperWidth: string;
  /**
   * Defines the stepper orientation.
   */
  readonly orientation: OrientationType;
  /**
   * By default, the "horizontal" stepper uses ResizeObserver to adjust its dimension
   * on page resize. If set to "false", the stepper won't use the ResizeObserver.
   * Note: the ResizeObserver is used just by the "horziontal" stepper.
   */
  readonly useResizeObserver: boolean;
  /**
   * Determines whether sub-steps should be represented as decimal values (e.g., 3.1, 3.2).
   * When set to true, sub-steps will follow a decimal notation, providing clearer differentiation
   * between main steps and their sub-steps. If set to false, sub-steps will use integer notation.
   */
  readonly useDecimalSubSteps: boolean;
  /**
   * If `useDecimalSubSteps` is true, emits the `step`, `index`, and `substep` properties of the active step.
   * The `step` value may include decimal values to represent sub-steps (e.g., 2.1, 3.2).
   * The `substep` property is a boolean that indicates whether the current step is a sub-step.
   * This ensures both the main step and its sub-steps can be identified and tracked accurately.
   */
  wppChange: EventEmitter<StepChangeEventDetail>;
  handleStepUpdate(): void;
  handleSelectStepClick(event: CustomEvent<StepChangeEventDetail>): void;
  watchActiveStep(): void;
  componentWillLoad(): void;
  private setTextCSSVariables;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private getStepperProps;
  private calculateStepperPosition;
  private calculateStepperPositionOnResize;
  private setCurrentStepIndicator;
  private setStepWidthOnResize;
  private setStepAttribute;
  private setStepAttributeAsIntegers;
  private setStepAttributeAsDecimals;
  private onResize;
  private stepperWrapperCssClasses;
  private hostCssClasses;
  render(): any;
}
