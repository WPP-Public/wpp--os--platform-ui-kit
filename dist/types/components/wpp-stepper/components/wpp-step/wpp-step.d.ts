import { EventEmitter } from '../../../../stencil-public-runtime';
import { OrientationType, StepChangeEventDetail } from '../../types';
/**
 * @slot label - Text content displayed within the cell.
 * @slot description - Text displayed as the description of the step, right below the title.
 * @slot - Can be used to display substeps for a specific step. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part step - step content wrapper element
 * @part step-bg - step bg element
 * @part step-label - step label text element
 * @part step-index - step index text element
 * @part last-step - last step wrapper element
 * @part last-step-text - last step text element
 * @part optional - optional text element
 * @part icon - step icon (warning, error)
 */
export declare class WppStep {
  host: HTMLWppStepElement;
  tooltipText: string | null;
  labelTooltipText: string | null;
  /**
   * If the current active step is indicated. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly active: boolean;
  /**
   * If a specific step is complete. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly completed: boolean;
  /**
   * If a step has a substep that must be completed. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly completedLine: boolean;
  /**
   * If a step is a substep.
   */
  readonly substep: boolean;
  /**
   * @internal - Defines the last substep of the step index.
   */
  readonly lastSubstepStepIndex?: number;
  /**
   * Defines the current step number. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly step?: number;
  /**
   * Defines the current step index. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly index?: number;
  /**
   * Defines the step width. This prop is used in horizontal steppers only. When the `stepAmount` prop is used in `Stepper`, this prop is passed automatically.
   */
  readonly width?: number;
  /**
   * Defines If a step is styled as an error.
   */
  readonly error: boolean;
  /**
   * If `true`, step indicates warning
   */
  readonly warning: boolean;
  /**
   * If a step is the last step. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly lastStep: boolean;
  /**
   * Defines the step orientation. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  readonly orientation: OrientationType;
  /**
   * @internal - If `true`, this step is expanded
   */
  readonly expanded: boolean;
  /**
   * @internal - Indicates currently displayed step
   */
  readonly displayedStep: boolean;
  /**
   * @internal - Indicates if step has description.
   */
  readonly hasDescription: boolean;
  /**
   * Indicates iconDescription when hover on warning or error icons
   */
  readonly iconDescription: string;
  /**
   * Emitted when the step was selected
   */
  wppStepChange: EventEmitter<StepChangeEventDetail>;
  /**
   * Emitted when the description or label has changed.
   *
   * @internal - This event is controlled by Stepper, do not set it manually.
   */
  readonly wppStepUpdate: EventEmitter;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  watchErrorIcon(): void;
  private applyTruncationIfNeeded;
  private isSubStep;
  private renderStep;
  private handleSlotChange;
  private stepWrapperCssClasses;
  private stepTextWrapperCssClasses;
  private stepCssClasses;
  private stepIndexCssClasses;
  private stepConnectorCssClasses;
  private connectorLineCssClasses;
  private stepBgCssClasses;
  private hostCssClasses;
  private handleStepClick;
  private renderStepTypeData;
  render(): any;
}
