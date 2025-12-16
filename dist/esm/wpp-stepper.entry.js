import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { k as transformToVersionedTag } from './utils-fb733700.js';
import './consts-5bf9c29f.js';

const wppStepperCss = ":host{display:block;min-width:70px}:host([orientation=horizontal]){position:relative;width:100%;overflow:hidden;--stepper-translate-position:var(--wpp-stepper-translate-position, 0)}:host([orientation=vertical]){--vertical-stepper-width:var(--wpp-vertical-stepper-width, 158px);width:var(--vertical-stepper-width)}.stepper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start}.orientation-horizontal{-ms-flex-direction:row;flex-direction:row;width:9999px;-webkit-transform:translateX(var(--stepper-translate-position));transform:translateX(var(--stepper-translate-position));-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out}.step-indicator{position:absolute;top:0;right:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:32px;height:24px;color:var(--wpp-grey-color-800);background-color:var(--wpp-grey-color-300);border-radius:24px;-webkit-transition:0.5s ease-in-out;transition:0.5s ease-in-out;font-size:var(--wpp-typography-xs-strong-font-size, 12px);line-height:var(--wpp-typography-xs-strong-line-height, 20px);font-weight:var(--wpp-typography-xs-strong-font-weight, 700);color:var(--wpp-typography-xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-strong-letter-spacing, 0)}.step-indicator.hide{visibility:hidden;opacity:0}";

const MAX_STEPS_COUNT = 8;
const WppStepper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.prevStep = 0;
    this.componentHasLoaded = false;
    this.stepMainNdx = 0;
    this.setTextCSSVariables = () => {
      this.host.style.setProperty('--wpp-vertical-stepper-width', this.stepperWidth);
      if (this.stepperWidth.includes('%')) {
        setTimeout(() => {
          this.host.style.setProperty('--wpp-step-label-width', `${this.host.clientWidth - 54}px`);
        }, 0);
      }
      else if (this.stepperWidth.includes('px')) {
        this.host.style.setProperty('--wpp-step-label-width', `${parseInt(this.stepperWidth) - 54}px`);
      }
    };
    this.getStepperProps = () => {
      const stepperWidth = this.host.clientWidth;
      const stepList = this.host.querySelectorAll(transformToVersionedTag('wpp-step'));
      const listLength = stepList.length;
      const stepListLength = this.stepAmount || stepList.length;
      const lastStep = stepList.length - 1;
      const stepWidth = stepperWidth / stepListLength;
      const isHorizontalOrientation = this.orientation === 'horizontal';
      return {
        stepperWidth,
        stepList,
        stepListLength,
        lastStep,
        stepWidth,
        isHorizontalOrientation,
        listLength,
      };
    };
    this.calculateStepperPosition = () => {
      const { listLength, stepWidth } = this.getStepperProps();
      const stepperStyle = this.host.style;
      const isNeedToTranslateStepper = this.activeStep > this.stepAmount;
      const isNeedToResetTranslatePosition = this.activeStep <= this.stepAmount;
      const isLastStep = this.activeStep >= listLength + 1;
      if (isNeedToTranslateStepper && this.activeStep > this.lastActiveStep && !isLastStep) {
        this.stepperPosition += stepWidth;
        stepperStyle.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`);
        this.lastActiveStep = this.activeStep;
      }
      if (isNeedToTranslateStepper && this.lastActiveStep && this.lastActiveStep > this.activeStep) {
        this.stepperPosition -= stepWidth;
        stepperStyle.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`);
        this.lastActiveStep = this.activeStep;
      }
      if (isNeedToResetTranslatePosition) {
        this.stepperPosition = 0;
        stepperStyle.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`);
        this.lastActiveStep = this.activeStep;
      }
    };
    this.calculateStepperPositionOnResize = () => {
      const stepsLength = this.host.querySelectorAll(transformToVersionedTag('wpp-step')).length;
      if (!this.stepAmount || this.stepAmount === stepsLength)
        return;
      if (this.activeStep === 1)
        return;
      const { listLength, stepWidth } = this.getStepperProps();
      const isLastStep = this.activeStep >= listLength + 1;
      if (isLastStep || this.lastActiveStep === listLength) {
        this.stepperPosition = stepWidth * 2;
        this.host.style.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`);
        return;
      }
      this.stepperPosition = stepWidth;
      this.host.style.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`);
    };
    this.setCurrentStepIndicator = () => {
      const currentStepIndicator = this.activeStep > this.stepAmount
        ? this.host.children.length - this.activeStep
        : this.host.children.length - this.stepAmount;
      this.stepIndicator = currentStepIndicator;
    };
    this.setStepWidthOnResize = () => {
      const { stepWidth } = this.getStepperProps();
      this.host.querySelectorAll(transformToVersionedTag('wpp-step')).forEach(step => {
        step.style.setProperty('--step-container-width', `${stepWidth}px`);
      });
    };
    this.setStepAttribute = () => {
      if (this.useDecimalSubSteps) {
        this.setStepAttributeAsDecimals();
      }
      else {
        this.setStepAttributeAsIntegers();
      }
    };
    this.setStepAttributeAsIntegers = () => {
      let lastStepWithSubstep = null;
      let currentStep = 1;
      const { stepList, lastStep, stepWidth, isHorizontalOrientation } = this.getStepperProps();
      let parentStep;
      stepList.forEach((step, index) => {
        if (this.stepMainNdx === index + 1)
          step.classList.add('wpp-last-step');
        if (!step.substep) {
          parentStep?.setAttribute('lastSubstepStepIndex', `${index}`);
          parentStep = step;
        }
      });
      this.lastCompletedStep = Math.max(this.activeStep, this.lastCompletedStep, this.completedSteps + 1);
      if (isHorizontalOrientation && this.stepAmount) {
        this.calculateStepperPosition();
        this.setCurrentStepIndicator();
      }
      stepList.forEach((step, index) => {
        if (this.completedSteps === index) {
          step?.setAttribute('active', 'true');
        }
        const currentIndex = index + 1;
        const hasDescription = !!step.querySelector('[slot="description"]');
        const isPassCurrentStep = this.lastCompletedStep > currentIndex;
        const currentStepSubstep = step.querySelectorAll(transformToVersionedTag('wpp-step'));
        const isHaveSubstep = !!currentStepSubstep.length;
        const lastIndexSubstep = currentStepSubstep.length - 1;
        const lastSubstepStepIndex = currentStepSubstep[lastIndexSubstep]?.getAttribute('index') || step.getAttribute('lastSubstepStepIndex');
        const isSubStep = step?.substep;
        const isStepExpanded = this.activeStep >= currentIndex && this.activeStep <= currentIndex + currentStepSubstep.length;
        if (isHaveSubstep) {
          lastStepWithSubstep = step;
          const stepHeight = currentStepSubstep[0]?.clientHeight;
          if (!isHorizontalOrientation) {
            if (isStepExpanded) {
              step?.setAttribute('expanded', 'true');
              step.style.setProperty('--steps-list-container-height', `${stepHeight * currentStepSubstep.length}px`);
              step?.removeAttribute('error');
            }
            else {
              step?.removeAttribute('expanded');
              step.style.setProperty('--steps-list-container-height', `${stepHeight}px`);
              const stepWithError = Array.from(currentStepSubstep).find(substep => substep.error);
              if (stepWithError) {
                step?.setAttribute('error', 'true');
                step?.setAttribute('icon-description', stepWithError.iconDescription);
              }
            }
          }
        }
        if (hasDescription) {
          step?.setAttribute('has-description', 'true');
        }
        else {
          step?.removeAttribute('has-description');
        }
        if (isPassCurrentStep) {
          step?.setAttribute('completed', 'true');
        }
        else {
          step?.removeAttribute('completed');
          step?.removeAttribute('completed-line');
        }
        if (lastStep === index) {
          step?.setAttribute('last-step', 'true');
        }
        if (isHorizontalOrientation) {
          step.style.setProperty('--step-container-width', `${stepWidth}px`);
        }
        step?.setAttribute('index', `${currentIndex}`);
        step?.setAttribute('step', `${currentStep}`);
        step?.setAttribute('orientation', this.orientation);
        if (this.activeStep === currentIndex) {
          step?.setAttribute('active', 'true');
        }
        if (this.activeStep === currentIndex) {
          step?.setAttribute('displayed-step', 'true');
        }
        else {
          step?.removeAttribute('displayed-step');
        }
        if (isHaveSubstep && isPassCurrentStep) {
          step?.removeAttribute('completed');
          step?.setAttribute('active', 'true');
          if (isStepExpanded) {
            step?.setAttribute('completed-line', 'true');
          }
          else {
            step?.removeAttribute('completed-line');
          }
        }
        if (lastSubstepStepIndex) {
          const isLastElementCompleted = isHorizontalOrientation
            ? this.activeStep > +lastSubstepStepIndex
            : this.lastCompletedStep > +lastSubstepStepIndex;
          if (isLastElementCompleted) {
            lastStepWithSubstep?.setAttribute('completed', 'true');
            lastStepWithSubstep = null;
          }
        }
        if (!isSubStep)
          currentStep++;
        if (isHaveSubstep && !isHorizontalOrientation && this.activeStep === currentIndex) {
          this.wppChange.emit({ index: this.activeStep < this.prevStep ? currentIndex - 1 : currentIndex + 1 });
        }
      });
      this.prevStep = this.activeStep;
    };
    this.setStepAttributeAsDecimals = () => {
      let subStepCounter = 1;
      let mainStepCounter = 1;
      let parentStep = null;
      const { stepList } = this.getStepperProps();
      this.lastCompletedStep = Math.max(this.activeStep, this.lastCompletedStep, this.completedSteps + 1);
      // First loop: process all steps and mark sub steps as completed
      stepList.forEach((step, index) => {
        const isSubStep = step.substep;
        const hasSubStepElements = !!step.querySelector(transformToVersionedTag('wpp-step'));
        const currentStepSubSteps = step.querySelectorAll(transformToVersionedTag('wpp-step'));
        const hasDescription = !!step.querySelector('[slot="description"]');
        let stepValue;
        if (isSubStep) {
          if (parentStep) {
            const parentStepValue = Number(parentStep.getAttribute('step')) || 0;
            const subStepValue = Number(`${parentStepValue}.${subStepCounter}`);
            step.setAttribute('step', subStepValue.toString());
            stepValue = subStepValue;
            subStepCounter++;
          }
          else {
            stepValue = 0;
          }
        }
        else {
          step.setAttribute('step', `${mainStepCounter}`);
          stepValue = mainStepCounter;
          subStepCounter = 1;
          parentStep = step;
          mainStepCounter++;
        }
        const mainStepIndex = Math.floor(this.activeStep);
        const subStepIndex = Math.round((this.activeStep % 1) * 10);
        const shouldExpandOnDirectNavigation = this.activeStep === stepValue && hasSubStepElements;
        const isStepExpanded = (mainStepIndex === Math.floor(stepValue) && subStepIndex > 0 && hasSubStepElements) ||
          shouldExpandOnDirectNavigation;
        if (hasSubStepElements) {
          const stepHeight = currentStepSubSteps[0]?.clientHeight || 0;
          if (isStepExpanded) {
            step.setAttribute('expanded', 'true');
            step.setAttribute('active', 'true');
            step.setAttribute('completed-line', 'true');
            step.style.setProperty('--steps-list-container-height', `${stepHeight * currentStepSubSteps.length}px`);
            step.removeAttribute('error');
          }
          else {
            step.removeAttribute('expanded');
            step.style.setProperty('--steps-list-container-height', `${stepHeight}px`);
            const stepWithError = Array.from(currentStepSubSteps).find(substep => substep.error);
            if (stepWithError) {
              step.setAttribute('error', 'true');
              step.setAttribute('icon-description', stepWithError.iconDescription || '');
            }
          }
        }
        step.setAttribute('index', (index + 1).toString());
        if (hasDescription) {
          step.setAttribute('has-description', 'true');
        }
        // Mark substeps as completed before checking parent step
        if (isSubStep) {
          const isSubStepCompleted = this.lastCompletedStep > stepValue;
          if (isSubStepCompleted) {
            step.setAttribute('completed', 'true');
          }
        }
      });
      // Second loop: after all sub steps are processed, check parent step completion and set last-step
      stepList.forEach((step, index) => {
        const isSubStep = step.substep;
        const currentStepSubSteps = step.querySelectorAll(transformToVersionedTag('wpp-step'));
        const hasPassedCurrentStep = this.lastCompletedStep > (Number(step.getAttribute('step')) || 0);
        const areAllSubStepsCompleted = currentStepSubSteps.length > 0
          ? Array.from(currentStepSubSteps).every(substep => substep.hasAttribute('completed'))
          : hasPassedCurrentStep;
        if (!isSubStep && areAllSubStepsCompleted) {
          step.setAttribute('completed', 'true');
          step.setAttribute('completed-line', 'true');
        }
        const isCurrentMainStepActive = Math.floor(this.activeStep) === Number(step.getAttribute('step'));
        const isCurrentSubStepActive = isSubStep && this.activeStep === Number(step.getAttribute('step'));
        const shouldSetActive = isCurrentMainStepActive || isCurrentSubStepActive;
        const shouldSetDisplayedStep = shouldSetActive && (!currentStepSubSteps.length || isSubStep);
        if (shouldSetActive) {
          step.setAttribute('active', 'true');
        }
        if (shouldSetDisplayedStep) {
          step.setAttribute('displayed-step', 'true');
        }
        else {
          step.removeAttribute('displayed-step');
        }
        // Set last-step for the last main step (not a substep)
        if (!isSubStep && index === stepList.length - 1) {
          step.setAttribute('last-step', 'true');
        }
        // Emit event to update active step when navigating to main steps with sub-steps
        if (currentStepSubSteps.length && this.activeStep === Number(step.getAttribute('step'))) {
          const isSubStepClicked = this.activeStep % 1 > 0;
          if (!isSubStepClicked) {
            const newStepValue = this.activeStep < this.prevStep
              ? Number(step.getAttribute('step')) - 0.1
              : Number(step.getAttribute('step')) + 0.1;
            const newIndex = this.activeStep < this.prevStep ? index : index + currentStepSubSteps.length;
            this.wppChange.emit({
              step: newStepValue,
              index: newIndex,
            });
          }
        }
      });
      this.prevStep = this.activeStep;
    };
    this.onResize = async () => {
      this.setStepWidthOnResize();
      this.calculateStepperPositionOnResize();
    };
    this.stepperWrapperCssClasses = () => ({
      stepper: true,
      [`orientation-${this.orientation}`]: true,
    });
    this.hostCssClasses = () => ({
      'wpp-stepper': true,
    });
    this.stepIndicator = undefined;
    this.stepperPosition = undefined;
    this.lastActiveStep = undefined;
    this.lastCompletedStep = 0;
    this.activeStep = undefined;
    this.stepAmount = 0;
    this.completedSteps = 0;
    this.stepperWidth = undefined;
    this.orientation = 'vertical';
    this.useResizeObserver = true;
    this.useDecimalSubSteps = false;
  }
  handleStepUpdate() {
    if (this.componentHasLoaded) {
      this.setStepAttribute();
    }
  }
  handleSelectStepClick(event) {
    if (this.useDecimalSubSteps) {
      event.stopPropagation();
      const stepEl = event.target;
      const stepValue = stepEl.step;
      // Emit step value and index when using decimal sub-steps.
      if (stepValue && stepValue <= this.lastCompletedStep) {
        this.prevStep = stepValue;
        if (!stepEl.substep) {
          this.wppChange.emit({ step: stepValue, index: event.detail.index });
        }
        else {
          // Emit event for sub-steps
          this.wppChange.emit({
            step: stepValue,
            index: event.detail.index,
            subStep: true,
          });
        }
      }
    }
    else {
      // Emit only the index when not using decimal sub-steps.
      if (event.detail.index && event.detail.index <= this.lastCompletedStep) {
        this.prevStep = event.detail.index;
        this.wppChange.emit({ index: event.detail.index });
      }
    }
  }
  watchActiveStep() {
    this.setStepAttribute();
  }
  componentWillLoad() {
    if (this.stepperWidth && this.orientation === 'vertical') {
      this.setTextCSSVariables();
      window.addEventListener('resize', this.setTextCSSVariables);
    }
  }
  componentDidLoad() {
    if (this.orientation === 'horizontal') {
      const stepsList = this.host.querySelectorAll(transformToVersionedTag('wpp-step'));
      if (stepsList.length > MAX_STEPS_COUNT) {
        throw new Error(`Maximum amount of steps exceeded. Only ${MAX_STEPS_COUNT} steps are allowed.`);
      }
    }
    setTimeout(() => {
      this.setStepAttribute();
      this.componentHasLoaded = true;
      const stepMainList = this.host.querySelectorAll(`:scope > ${transformToVersionedTag('wpp-step')}`);
      this.stepMainNdx = Number(stepMainList[stepMainList.length - 1]?.getAttribute('index'));
    }, 0);
    if (this.orientation === 'horizontal' && this.useResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.onResize);
      if (this.resizeObserver) {
        this.resizeObserver.observe(this.host);
      }
    }
  }
  disconnectedCallback() {
    if (this.orientation === 'horizontal' && this.useResizeObserver && this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.stepperWidth && this.orientation === 'vertical') {
      window.removeEventListener('resize', this.setTextCSSVariables);
    }
  }
  render() {
    const isHorizontalOrientation = this.orientation === 'horizontal';
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, inner, indicator" }, h("div", { class: this.stepperWrapperCssClasses(), part: "wrapper" }, h("slot", { part: "inner" })), isHorizontalOrientation && this.stepAmount ? (h("div", { class: { 'step-indicator': true, hide: this.stepIndicator <= 0 }, part: "indicator" }, "+", this.stepIndicator || 1)) : null));
  }
  static get registryIs() { return "wpp-stepper-v3-4-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "activeStep": ["watchActiveStep"]
  }; }
};
WppStepper.style = wppStepperCss;

export { WppStepper as wpp_stepper };
