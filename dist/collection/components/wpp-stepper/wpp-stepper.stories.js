import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import { transformToVersionedTag } from '../../utils/utils';
export default {
  title: 'Design System/Components/Navigation/Stepper',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    options: { showPanel: false },
  },
};
const PAGE_HEIGHT = 550;
const FIRST_PAGE_COUNT = 1;
const LAST_PAGE_COUNT = 10;
const LAST_PAGE_COUNT_WITH_WIDTH = 12;
const DECIMAL_FIRST_PAGE_COUNT = 1;
const DECIMAL_REQUIRED_STEP_NUMBER = 3.2;
const DECIMAL_LAST_PAGE_COUNT = 5;
const HORIZONTAL_FIRST_PAGE_COUNT = 1;
const HORIZONTAL_LAST_PAGE_COUNT = 6;
// Utility function for vertical stepper handlers (integer steps)
const getVerticalStepperHandlers = (type) => {
  let stepper = null;
  let pageList = null;
  const stepperState = { currentStep: 1, isError: false };
  document.addEventListener('DOMContentLoaded', () => {
    stepper = document.querySelector(transformToVersionedTag('wpp-stepper'));
    pageList = document.getElementById('page_list');
  });
  const getPageOffset = () => (stepperState.currentStep - 1) * PAGE_HEIGHT;
  const handleNextClick = () => {
    if (type === 'normal') {
      if (stepperState.currentStep >= LAST_PAGE_COUNT)
        return;
    }
    else {
      if (stepperState.currentStep >= LAST_PAGE_COUNT_WITH_WIDTH)
        return;
    }
    if (!stepper?.activeStep || !pageList)
      return;
    stepperState.currentStep += 1;
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${getPageOffset()}px)`;
  };
  const handlePreviousClick = () => {
    if (stepperState.currentStep === FIRST_PAGE_COUNT)
      return;
    if (!stepper?.activeStep || !pageList)
      return;
    stepperState.currentStep -= 1;
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${getPageOffset()}px)`;
  };
  const handleStepClick = (event) => {
    const clickedIndex = event.detail.index;
    if (!clickedIndex || !pageList || !stepper?.activeStep)
      return;
    stepperState.currentStep = clickedIndex;
    pageList.style.transform = `translateY(-${getPageOffset()}px)`;
    stepper.activeStep = stepperState.currentStep;
  };
  const handleCheckboxClick = () => {
    stepperState.isError = !stepperState.isError;
    const stepError = document.querySelector('#step');
    stepError.setAttribute('error', String(stepperState.isError));
  };
  return { handleNextClick, handlePreviousClick, handleStepClick, stepperState, handleCheckboxClick };
};
const getVerticalDecimalStepperHandlers = () => {
  let stepper = null;
  let pageList = null;
  const stepperState = { currentStep: 1, isError: false, checked: false };
  const stepsMap = {
    1: { next: 2.1, pageIndex: 1 },
    2: { next: 2.2, prev: 1, pageIndex: 3 },
    2.1: { next: 2.2, prev: 1, pageIndex: 3 },
    2.2: { next: 3.1, prev: 2.1, pageIndex: 4 },
    3: { next: 3.2, prev: 2.2, pageIndex: 6 },
    3.1: { next: 3.2, prev: 2.2, pageIndex: 6 },
    3.2: { next: 3.3, prev: 3.1, pageIndex: 7 },
    3.3: { next: 4, prev: 3.2, pageIndex: 8 },
    4: { next: 5, prev: 3.3, pageIndex: 9 },
    5: { prev: 4, pageIndex: 10 },
  };
  document.addEventListener('DOMContentLoaded', () => {
    stepper = document.querySelector(transformToVersionedTag('wpp-stepper'));
    pageList = document.getElementById('page_list');
  });
  // Correct page offset calculation based on sub-steps
  const getPageOffset = (step) => {
    const pageIndex = stepsMap[step]?.pageIndex || step;
    return (pageIndex - 1) * PAGE_HEIGHT;
  };
  const getNextStep = (step) => stepsMap[step]?.next ?? step;
  const getPreviousStep = (step) => stepsMap[step]?.prev ?? step;
  const handleNextClick = () => {
    if (stepperState.currentStep >= DECIMAL_LAST_PAGE_COUNT)
      return;
    if (!stepper?.activeStep || !pageList)
      return;
    if (DECIMAL_REQUIRED_STEP_NUMBER === stepperState.currentStep && !stepperState.checked) {
      const stepError = document.querySelector('#step3_2');
      if (stepError) {
        stepError.setAttribute('error', 'true');
      }
      return;
    }
    stepperState.currentStep = getNextStep(stepperState.currentStep);
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${getPageOffset(stepperState.currentStep)}px)`;
  };
  const handlePreviousClick = () => {
    if (stepperState.currentStep === DECIMAL_FIRST_PAGE_COUNT)
      return;
    if (!stepper?.activeStep || !pageList)
      return;
    stepperState.currentStep = getPreviousStep(stepperState.currentStep);
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${getPageOffset(stepperState.currentStep)}px)`;
  };
  const handleStepClick = (event) => {
    const clickedIndex = event.detail.step;
    if (!stepper?.activeStep || !pageList || !clickedIndex)
      return;
    stepperState.currentStep = clickedIndex;
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${getPageOffset(clickedIndex)}px)`;
  };
  const handleCheckboxClick = () => {
    stepperState.checked = !stepperState.checked;
    const stepError = document.querySelector('#step3_2');
    if (stepError) {
      stepperState.isError = !stepperState.checked;
      stepError.setAttribute('error', String(stepperState.isError));
    }
  };
  return { handleNextClick, handlePreviousClick, handleStepClick, handleCheckboxClick, stepperState };
};
// Utility function for horizontal stepper handlers
const getHorizontalStepperHandlers = () => {
  let stepper = null;
  let pageList = null;
  const stepperState = { currentStep: 1 };
  document.addEventListener('DOMContentLoaded', () => {
    stepper = document.querySelector(transformToVersionedTag('wpp-stepper'));
    pageList = document.getElementById('page_list');
  });
  const handleHorizontalNextClick = () => {
    if (stepperState.currentStep >= HORIZONTAL_LAST_PAGE_COUNT)
      return;
    if (!stepper?.activeStep || !pageList)
      return;
    stepperState.currentStep += 1;
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${(stepperState.currentStep - 1) * PAGE_HEIGHT}px)`;
  };
  const handleHorizontalPreviousClick = () => {
    if (stepperState.currentStep === HORIZONTAL_FIRST_PAGE_COUNT)
      return;
    if (!stepper?.activeStep || !pageList)
      return;
    stepperState.currentStep -= 1;
    stepper.activeStep = stepperState.currentStep;
    pageList.style.transform = `translateY(-${(stepperState.currentStep - 1) * PAGE_HEIGHT}px)`;
  };
  const handleHorizontalStepClick = (event) => {
    const clickedIndex = event.detail.index;
    if (!stepper?.activeStep || !pageList || !clickedIndex)
      return;
    stepperState.currentStep = clickedIndex;
    pageList.style.transform = `translateY(-${(stepperState.currentStep - 1) * PAGE_HEIGHT}px)`;
    stepper.activeStep = stepperState.currentStep;
  };
  return { handleHorizontalNextClick, handleHorizontalPreviousClick, handleHorizontalStepClick, stepperState };
};
const pageStyle = {
  display: 'flex',
  fontFamily: 'Inter, Roboto, sans-serif',
  alignItems: 'center',
  justifyContent: 'center',
  height: `${PAGE_HEIGHT}px`,
  backgroundColor: 'var(--wpp-grey-color-100)',
  boxShadow: '0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%)',
};
const buttonWrapper = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'flex-end',
  marginTop: '16px',
};
const pageWrapper = {
  width: '100%',
  height: `${PAGE_HEIGHT}px`,
  overflow: 'hidden',
};
const pageWrapperWWidth = {
  width: '75%',
  height: `${PAGE_HEIGHT}px`,
  overflow: 'hidden',
};
const pageListStyle = {
  transition: '0.6s ease-in-out',
  transform: 'translateY(0)',
};
// Vertical Decimal Stepper Story
export const VerticalDecimalStepper = (args) => {
  const { handleNextClick, handlePreviousClick, handleStepClick, handleCheckboxClick, stepperState } = getVerticalDecimalStepperHandlers();
  return html `
    <div>
      <div style="display: flex;">
        <div style="width: 200px; text-align: center;">
          <wpp-stepper-v3-6-0
            .activeStep=${stepperState.currentStep}
            .orientation=${'vertical'}
            .useDecimalSubSteps=${true}
            @wppChange=${handleStepClick}
          >
            <wpp-step-v3-6-0>
              <p slot="label">Step with a long text</p>
              <span slot="description">
                First step (this text gets truncated if it's too long and a tooltip is displayed)
              </span>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0>
              <p slot="label">Step 2</p>
              <span slot="description">With sub-steps</span>
              <wpp-step-v3-6-0 .substep=${true}>
                <p slot="label">Sub step 2.1</p>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0 id="step" .substep=${true}>
                <p slot="label">Sub step 2.2</p>
              </wpp-step-v3-6-0>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0>
              <p slot="label">Step 3</p>
              <span slot="description">With sub-steps</span>
              <wpp-step-v3-6-0 .substep=${true}>
                <p slot="label">Sub step 3.1</p>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0
                id="step3_2"
                .error=${args.error}
                .substep=${true}
                .iconDescription=${args.iconDescription}
              >
                <p slot="label">Sub step 3.2</p>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0 .substep=${true}>
                <p slot="label">Sub step 3.3</p>
              </wpp-step-v3-6-0>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0>
              <p slot="label">Step 4</p>
              <span slot="description">Last Step</span>
            </wpp-step-v3-6-0>
          </wpp-stepper-v3-6-0>
        </div>
        <div style=${styleMap(pageWrapper)}>
          <div id="page_list" style=${styleMap(pageListStyle)}>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 1</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 2</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Sub page 2.1</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Sub page 2.2</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 3</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Sub page 3.1</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Sub page 3.2</h3>
              <wpp-checkbox-v3-6-0 style="margin-left: 16px;" @click=${handleCheckboxClick} />
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Sub page 3.3</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 4</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>FINAL</h3>
            </div>
          </div>
        </div>
      </div>
      <div style=${styleMap(buttonWrapper)}>
        <wpp-button-v3-6-0 .variant=${'secondary'} @click=${handlePreviousClick}>Previous Step</wpp-button-v3-6-0>
        <wpp-button-v3-6-0 @click=${handleNextClick} style="margin-left: 16px;">Next Step</wpp-button-v3-6-0>
      </div>
    </div>
  `;
};
VerticalDecimalStepper.args = {
  iconDescription: 'Error description',
};
// Vertical Stepper Story (with integer steps)
export const Vertical = {
  render: () => {
    const { handleNextClick, handlePreviousClick, handleStepClick, stepperState } = getVerticalStepperHandlers('normal');
    return html `
      <div>
        <div style="display: flex;">
          <div style="width: 200px; text-align: center;">
            <wpp-stepper-v3-6-0
              .activeStep=${stepperState.currentStep}
              .orientation=${'vertical'}
              @wppChange=${handleStepClick}
            >
              <wpp-step-v3-6-0>
                <p slot="label">Step with a long text</p>
                <span slot="description">
                  First step (this text gets truncated if it's too long and a tooltip is displayed)
                </span>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 2</p>
                <wpp-step-v3-6-0 .substep=${true}>
                  <div slot="label">
                    <p>Sub step 2.1</p>
                  </div>
                </wpp-step-v3-6-0>
                <wpp-step-v3-6-0 id="step" .substep=${true}>
                  <p slot="label">Sub step 2.2</p>
                </wpp-step-v3-6-0>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 3</p>
                <span slot="description">With sub-steps</span>
                <wpp-step-v3-6-0 .substep=${true}>
                  <div slot="label">
                    <p>Sub step 3.1</p>
                  </div>
                </wpp-step-v3-6-0>
                <wpp-step-v3-6-0 id="step" .substep=${true}>
                  <p slot="label">Sub step 3.2</p>
                </wpp-step-v3-6-0>
                <wpp-step-v3-6-0 .substep=${true}>
                  <div slot="label">
                    <p>Sub step 3.3</p>
                  </div>
                </wpp-step-v3-6-0>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <div slot="label">
                  <p>Step 4</p>
                </div>
                <span slot="description">Last Step</span>
              </wpp-step-v3-6-0>
            </wpp-stepper-v3-6-0>
          </div>
          <div style=${styleMap(pageWrapper)}>
            <div id="page_list" style=${styleMap(pageListStyle)}>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 1</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 2</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 2.1</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 2.2</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 3</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 3.1</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 3.2</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 3.3</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 4</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>FINAL</h3>
              </div>
            </div>
          </div>
        </div>
        <div style=${styleMap(buttonWrapper)}>
          <wpp-button-v3-6-0 .variant=${'secondary'} @click=${handlePreviousClick}>Previous Step</wpp-button-v3-6-0>
          <wpp-button-v3-6-0 @click=${handleNextClick} style="margin-left: 16px;">Next Step</wpp-button-v3-6-0>
        </div>
      </div>
    `;
  },
};
export const VerticalStepperWithWidth = {
  render: () => {
    const { handleNextClick, handlePreviousClick, handleStepClick, stepperState } = getVerticalStepperHandlers('with-width');
    return html `
      <div>
        <div style="display: flex;">
          <div style="width: 25%; text-align: center;">
            <wpp-stepper-v3-6-0
              .stepperWidth=${'100%'}
              .activeStep=${stepperState.currentStep}
              .orientation=${'vertical'}
              @wppChange=${handleStepClick}
            >
              <wpp-step-v3-6-0>
                <p slot="label">Step 1 with a long text</p>
                <span slot="description">
                  First step (this text gets truncated if it's too long and a tooltip is displayed)
                </span>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 2</p>
                <span slot="description">With substeps</span>
                <wpp-step-v3-6-0 .substep=${true}>
                  <p slot="label">Sub step 2.1</p>
                </wpp-step-v3-6-0>
                <wpp-step-v3-6-0 id="step" .substep=${true}>
                  <p slot="label">Sub step 2.2</p>
                </wpp-step-v3-6-0>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 3 which also has a long text that gets truncated</p>
                <span slot="description">With sub-steps and a long description</span>
                <wpp-step-v3-6-0 .substep=${true}>
                  <p slot="label">Sub step 3.1 with more details</p>
                </wpp-step-v3-6-0>
                <wpp-step-v3-6-0 id="step" .substep=${true}>
                  <p slot="label">Sub step 3.2</p>
                </wpp-step-v3-6-0>
                <wpp-step-v3-6-0 .substep=${true}>
                  <p slot="label">Sub step 3.3</p>
                </wpp-step-v3-6-0>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 4</p>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 5 with a long text that gets truncated</p>
              </wpp-step-v3-6-0>
              <wpp-step-v3-6-0>
                <p slot="label">Step 6 and again a long text</p>
                <span slot="description">Last Step with a really really long text</span>
              </wpp-step-v3-6-0>
            </wpp-stepper-v3-6-0>
          </div>
          <div style=${styleMap(pageWrapperWWidth)}>
            <div id="page_list" style=${styleMap(pageListStyle)}>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 1</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 2</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 2.1</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 2.2</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 3</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 3.1</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 3.2</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Sub page 3.3</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 4</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 5</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>Page 6</h3>
              </div>
              <div style=${styleMap(pageStyle)}>
                <h3>FINAL</h3>
              </div>
            </div>
          </div>
        </div>
        <div style=${styleMap(buttonWrapper)}>
          <wpp-button-v3-6-0 .variant=${'secondary'} @click=${handlePreviousClick}>Previous Step</wpp-button-v3-6-0>
          <wpp-button-v3-6-0 @click=${handleNextClick} style="margin-left: 16px;">Next Step</wpp-button-v3-6-0>
        </div>
      </div>
    `;
  },
};
// Horizontal Stepper Story
export const Horizontal = (args) => {
  const { handleHorizontalNextClick, handleHorizontalPreviousClick, handleHorizontalStepClick, stepperState } = getHorizontalStepperHandlers();
  return html `
    <div>
      <div style="display: flex; flex-direction: column;">
        <div style="width: 100%; height: 60px; text-align: center; margin-bottom: 20px;">
          <wpp-stepper-v3-6-0
            .activeStep=${stepperState.currentStep}
            .orientation=${'horizontal'}
            @wppChange=${handleHorizontalStepClick}
          >
            <wpp-step-v3-6-0>
              <p slot="label">Step 1</p>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0>
              <div slot="label">
                <p>Step 2</p>
              </div>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0>
              <div slot="label">
                <p>Step 3</p>
              </div>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0 id="step" .error=${args.error} .iconDescription=${args.iconDescription}>
              <div slot="label">
                <p>Step 4</p>
              </div>
            </wpp-step-v3-6-0>
            <wpp-step-v3-6-0>
              <div slot="label">
                <p>Step 5</p>
              </div>
            </wpp-step-v3-6-0>
          </wpp-stepper-v3-6-0>
        </div>
        <div style=${styleMap(pageWrapper)}>
          <div id="page_list" style=${styleMap(pageListStyle)}>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 1</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 2</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 3</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 4</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>Page 5</h3>
            </div>
            <div style=${styleMap(pageStyle)}>
              <h3>FINAL</h3>
            </div>
          </div>
        </div>
      </div>
      <div style=${styleMap(buttonWrapper)}>
        <wpp-button-v3-6-0 .variant=${'secondary'} @click=${handleHorizontalPreviousClick}
          >Previous Step</wpp-button-v3-6-0
        >
        <wpp-button-v3-6-0 @click=${handleHorizontalNextClick} style="margin-left: 16px;">Next Step</wpp-button-v3-6-0>
      </div>
    </div>
  `;
};
Horizontal.args = {
  error: false,
  iconDescription: 'Error description',
};
