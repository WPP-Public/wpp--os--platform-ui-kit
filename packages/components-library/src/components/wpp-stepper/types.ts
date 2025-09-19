export type OrientationType = 'horizontal' | 'vertical'

export interface StepLocales {
  optional: string
}

export interface StepChangeEventDetail {
  /**
   * The index of the step that was clicked or navigated to.
   * This is always emitted, whether or not `useDecimalSubSteps` is true.
   */
  index: number | undefined

  /**
   * The value of the step, which may include decimal sub-steps if `useDecimalSubSteps` is true.
   * This will be emitted when `useDecimalSubSteps` is set to true and represents the current step's value,
   * including any sub-step decimals.
   */
  step?: number

  /**
   * A flag indicating whether the event was triggered by a sub-step.
   * This helps distinguish between main steps and sub-steps when `useDecimalSubSteps` is enabled.
   * It will be `true` if the event was triggered by a sub-step, otherwise it will be `false` or `undefined`.
   */
  subStep?: boolean
}
