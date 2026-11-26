import { newSpecPage } from '@stencil/core/testing';
import { WppStepper } from '../wpp-stepper';
import { WppStep } from '../components/wpp-step/wpp-step';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import { transformToVersionedTag } from '../../../utils/utils';
describe('wpp-stepper', () => {
  describe('Testing accessible step labels', () => {
    it.each([false, true])('localizes only main step names (decimal: %s)', async (decimal) => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <wpp-stepper active-step="1" use-decimal-sub-steps="${decimal}">
            <wpp-step>
              <span slot="label">  Account  </span>
              <wpp-step substep aria-label="Stale name"><span slot="label">Details</span></wpp-step>
            </wpp-step>
            <wpp-step>
              <wpp-step substep><span slot="label">Nested label</span></wpp-step>
            </wpp-step>
            <wpp-step><span slot="label">   </span></wpp-step>
          </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const stepper = page.root;
      const steps = Array.from(stepper.querySelectorAll('wpp-step'));
      const expectNames = (prefix) => {
        expect(steps.map(step => step.getAttribute('aria-label'))).toEqual([
          'Account',
          null,
          `${prefix} 2`,
          null,
          `${prefix} 3`,
        ]);
        for (const [step, number] of [
          [steps[2], '2'],
          [steps[4], '3'],
        ]) {
          expect(step.getAttribute('step')).toBe(number);
          expect(step.getAttribute('aria-posinset')).toBe(number);
          expect(step.getAttribute('aria-setsize')).toBe('3');
          expect(step.getAttribute('aria-label')).toBe(`${prefix} ${number}`);
        }
        expect(steps[1].hasAttribute('role')).toBe(false);
        expect(steps[1].hasAttribute('aria-posinset')).toBe(false);
        expect(steps[1].hasAttribute('aria-setsize')).toBe(false);
        expect(stepper.querySelectorAll('[role="listitem"][aria-label]')).toHaveLength(3);
      };
      expect(page.rootInstance.locales).toEqual({});
      expectNames('Step');
      const change = jest.fn();
      stepper.addEventListener('wppChange', change);
      page.rootInstance.locales = { stepLabel: (index) => `Stage ${index}` };
      await page.waitForChanges();
      expectNames('Stage');
      expect(change).not.toHaveBeenCalled();
      stepper.activeStep = 2;
      await page.waitForChanges();
      expectNames('Stage');
      change.mockClear();
      page.rootInstance.locales = {};
      await page.waitForChanges();
      expectNames('Step');
      expect(change).not.toHaveBeenCalled();
    });
  });
  describe('Testing the current step announcement', () => {
    it.each([false, true])('marks only the current step after updates and re-renders (decimal: %s)', async (decimal) => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <wpp-stepper active-step="1" use-decimal-sub-steps="${decimal}">
            <wpp-step><span slot="label">Step 1</span></wpp-step>
            <wpp-step>
              <span slot="label">Step 2</span>
              <wpp-step substep><span slot="label">Step 2 Sub step 1</span></wpp-step>
              <wpp-step substep><span slot="label">Step 2 Sub step 2</span></wpp-step>
            </wpp-step>
            <wpp-step>
              <span slot="label">Step 3</span>
              <wpp-step substep><span slot="label">Step 3 Sub step 1</span></wpp-step>
              <wpp-step substep><span slot="label">Step 3 Sub step 2</span></wpp-step>
            </wpp-step>
            <wpp-step><span slot="label">Step 4</span></wpp-step>
          </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const stepper = page.root;
      const steps = Array.from(stepper.querySelectorAll('wpp-step'));
      const progression = decimal ? [1, 2.1, 2.2, 3.1, 3.2, 4, 2.1, 1] : [1, 3, 4, 6, 7, 8, 3, 1];
      const currentIndexes = [0, 2, 3, 5, 6, 7, 2, 0];
      for (const [index, activeStep] of progression.entries()) {
        stepper.activeStep = activeStep;
        await page.waitForChanges();
        const currentStep = steps[currentIndexes[index]];
        expect(stepper.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
        expect(stepper.querySelector('[aria-current="step"]')).toBe(currentStep);
        expect(currentStep.getAttribute('aria-disabled')).toBe('false');
        expect(currentStep.displayedStep).toBe(true);
        steps.forEach(step => {
          step.warning = !step.warning;
        });
        await page.waitForChanges();
        await new Promise(resolve => setTimeout(resolve, 0));
        await page.waitForChanges();
        expect(stepper.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
        expect(stepper.querySelector('[aria-current="step"]')).toBe(currentStep);
        steps[0].dispatchEvent(new FocusEvent('focus'));
        steps[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true }));
        expect(stepper.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
        expect(stepper.querySelector('[aria-current="step"]')).toBe(currentStep);
        expect(stepper.activeStep).toBe(activeStep);
      }
    });
    it('keeps exactly one current horizontal step when revisiting completed steps', async () => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <wpp-stepper active-step="1" orientation="horizontal" use-resize-observer="false">
            <wpp-step><span slot="label">Step 1</span></wpp-step>
            <wpp-step><span slot="label">Step 2</span></wpp-step>
            <wpp-step><span slot="label">Step 3</span></wpp-step>
          </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const stepper = page.root;
      const steps = Array.from(stepper.querySelectorAll('wpp-step'));
      for (const activeStep of [1, 2, 3, 2, 1]) {
        stepper.activeStep = activeStep;
        await page.waitForChanges();
        expect(stepper.querySelectorAll('[aria-current="step"]')).toHaveLength(1);
        expect(stepper.querySelector('[aria-current="step"]')).toBe(steps[activeStep - 1]);
      }
    });
  });
  describe('Testing decimal step availability', () => {
    const setup = async () => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <wpp-stepper active-step="1" use-decimal-sub-steps>
            <wpp-step><span slot="label">Step 1</span></wpp-step>
            <wpp-step>
              <span slot="label">Step 2</span>
              <wpp-step substep><span slot="label">Sub step 2.1</span></wpp-step>
              <wpp-step substep><span slot="label">Sub step 2.2</span></wpp-step>
            </wpp-step>
            <wpp-step>
              <span slot="label">Step 3</span>
              <wpp-step substep><span slot="label">Sub step 3.1</span></wpp-step>
              <wpp-step substep><span slot="label">Sub step 3.2</span></wpp-step>
              <wpp-step substep><span slot="label">Sub step 3.3</span></wpp-step>
            </wpp-step>
            <wpp-step><span slot="label">Step 4</span></wpp-step>
          </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const stepper = page.root;
      const steps = Array.from(stepper.querySelectorAll('wpp-step'));
      for (const activeStep of [2.1, 2.2, 3.1, 3.2]) {
        stepper.activeStep = activeStep;
        await page.waitForChanges();
      }
      return { page, stepper, steps };
    };
    it('enables current and completed steps without enabling future steps', async () => {
      const { stepper, steps } = await setup();
      expect(steps.map(step => step.getAttribute('aria-disabled'))).toEqual([
        'false',
        'false',
        'false',
        'false',
        'false',
        'false',
        'false',
        'true',
        'true',
      ]);
      expect(steps[3].completed).toBe(true);
      expect(steps[5].completed).toBe(true);
      expect(steps[6].getAttribute('aria-current')).toBe('step');
      expect(steps[6].tabIndex).toBe(0);
      expect(steps[4].hasAttribute('tabindex')).toBe(false);
      expect(stepper.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    });
    it('navigates enabled decimal steps with arrows, Home and End without activating them', async () => {
      const { stepper, steps } = await setup();
      const change = jest.fn();
      stepper.addEventListener('wppChange', change);
      const focusSpies = steps.map(step => jest.spyOn(step, 'focus').mockImplementation(() => {
        step.dispatchEvent(new FocusEvent('focus'));
      }));
      const press = (index, key) => steps[index].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      steps[6].focus();
      for (let count = 0; count < 4; count++)
        press(6, 'ArrowDown');
      press(6, 'End');
      expect(focusSpies[6]).toHaveBeenCalledTimes(2);
      press(6, 'Home');
      expect(steps[0].tabIndex).toBe(0);
      for (const [index, nextIndex] of [
        [0, 1],
        [1, 4],
        [4, 5],
        [5, 6],
      ]) {
        press(index, 'ArrowDown');
        expect(focusSpies[nextIndex]).toHaveBeenCalled();
        expect(steps[nextIndex].tabIndex).toBe(0);
        expect(stepper.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      }
      press(6, 'End');
      expect(steps[6].tabIndex).toBe(0);
      expect(focusSpies[2]).not.toHaveBeenCalled();
      expect(focusSpies[3]).not.toHaveBeenCalled();
      expect(focusSpies[7]).not.toHaveBeenCalled();
      expect(focusSpies[8]).not.toHaveBeenCalled();
      expect(change).not.toHaveBeenCalled();
      expect(stepper.activeStep).toBe(3.2);
    });
    it.each(['Enter', ' '])('allows revisiting a completed sub-step with %s', async (key) => {
      const { page, stepper, steps } = await setup();
      stepper.activeStep = 3;
      await page.waitForChanges();
      const change = jest.fn();
      stepper.addEventListener('wppChange', change);
      const stepChange = jest.fn();
      steps[5].addEventListener('wppStepChange', stepChange);
      steps[7].addEventListener('wppStepChange', stepChange);
      expect(steps[6].getAttribute('aria-disabled')).toBe('false');
      steps[5].dispatchEvent(new FocusEvent('focus'));
      steps[5].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      expect(stepChange).toHaveBeenCalledTimes(1);
      page.rootInstance.handleSelectStepClick(stepChange.mock.calls[0][0]);
      expect(change).toHaveBeenCalledTimes(1);
      expect(change.mock.calls[0][0].detail).toEqual({ step: 3.1, index: 6, subStep: true });
      expect(steps[7].getAttribute('aria-disabled')).toBe('true');
      steps[7].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      expect(stepChange).toHaveBeenCalledTimes(1);
      expect(change).toHaveBeenCalledTimes(1);
    });
  });
  describe('Testing keyboard entry when a sub-step is current', () => {
    it.each([false, true])('keeps the current sub-step as the Tab stop (decimal: %s)', async (useDecimalSubSteps) => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <button>Before</button>
          <wpp-stepper active-step="1" use-decimal-sub-steps="${useDecimalSubSteps}">
            <wpp-step><span slot="label">Step 1</span></wpp-step>
            <wpp-step>
              <span slot="label">Step 2</span>
              <wpp-step substep><span slot="label">Step 2 Sub step 1</span></wpp-step>
              <wpp-step substep><span slot="label">Step 2 Sub step 2</span></wpp-step>
            </wpp-step>
            <wpp-step>
              <span slot="label">Step 3</span>
              <wpp-step substep><span slot="label">Step 3 Sub step 1</span></wpp-step>
              <wpp-step substep><span slot="label">Step 3 Sub step 2</span></wpp-step>
            </wpp-step>
          </wpp-stepper>
          <button>Previous Step</button>
          <button>Next Step</button>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const stepper = page.body.querySelector('wpp-stepper');
      const steps = Array.from(stepper.querySelectorAll('wpp-step'));
      const nextButton = page.body.querySelectorAll('button')[2];
      nextButton.focus();
      for (const activeStep of useDecimalSubSteps ? [2.1, 2.2, 3.1] : [3, 4, 6]) {
        stepper.activeStep = activeStep;
        await page.waitForChanges();
      }
      expect(steps[4].expanded).toBe(true);
      expect(steps[5].displayedStep).toBe(true);
      expect(steps[5].getAttribute('aria-disabled')).toBe('false');
      expect(steps[5].tabIndex).toBe(0);
      expect(steps[4].hasAttribute('tabindex')).toBe(false);
      expect(stepper.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      expect(steps[2].tabIndex).toBe(-1);
      expect(steps[3].tabIndex).toBe(-1);
      steps[5].dispatchEvent(new FocusEvent('focus'));
      expect(steps[4].hasAttribute('tabindex')).toBe(false);
      expect(steps[5].tabIndex).toBe(0);
      stepper.activeStep = 1;
      await page.waitForChanges();
      expect(steps[0].tabIndex).toBe(0);
      expect(steps[4].tabIndex).toBe(-1);
      expect(steps[5].tabIndex).toBe(-1);
      expect(stepper.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    });
  });
  it('render stepper with one step', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `<wpp-stepper active-step=${1} orientation=${'vertical'}>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('render step with sub-step', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `
      <wpp-stepper .active-step=${1} .orientation=${'vertical'}>
        <wpp-step>
          <p slot="label">Step</p>
          <wpp-step .substep=${true}>
            <div slot="label">
              <p>Sub-step</p>
            </div>
        </wpp-step>
        </wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('applies list semantics for accessibility', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `
      <wpp-stepper active-step="2" orientation="vertical">
        <wpp-step>
          <p slot="label">Step 1</p>
        </wpp-step>
        <wpp-step>
          <p slot="label">Step 2</p>
        </wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const stepper = page.root;
    const stepSelector = ['wpp-step', transformToVersionedTag('wpp-step')].join(', ');
    const firstStep = stepper?.querySelector(stepSelector);
    const secondStep = stepper?.querySelectorAll(stepSelector)[1];
    expect(page.rootInstance.activeStep).toBe(2);
    expect(stepper?.getAttribute('role')).toBe('list');
    expect(stepper?.hasAttribute('aria-orientation')).toBe(false);
    expect(firstStep?.getAttribute('role')).toBe('listitem');
    expect(firstStep?.getAttribute('tabindex')).toBe('-1');
    expect(secondStep?.getAttribute('tabindex')).toBe('0');
    expect(stepper?.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    expect(secondStep?.getAttribute('aria-current')).toBe('step');
  });
  it('does not apply listitem role or list position attributes to nested sub-steps', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `
      <wpp-stepper active-step="1" orientation="vertical">
        <wpp-step>
          <p slot="label">Step 1</p>
          <wpp-step substep="true">
            <p slot="label">Sub-step 1</p>
          </wpp-step>
        </wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const stepSelector = ['wpp-step', transformToVersionedTag('wpp-step')].join(', ');
    const parentStep = page.root?.querySelector(stepSelector);
    const subStep = page.root?.querySelectorAll(stepSelector)[1];
    expect(parentStep?.getAttribute('role')).toBe('listitem');
    expect(parentStep?.getAttribute('aria-posinset')).toBe('1');
    expect(subStep?.getAttribute('role')).toBeNull();
    expect(subStep?.getAttribute('aria-posinset')).toBeNull();
    expect(subStep?.getAttribute('aria-setsize')).toBeNull();
  });
  it('sets the list size to the number of main steps, excluding sub-steps', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `
      <wpp-stepper active-step="1" orientation="vertical">
        <wpp-step>
          <p slot="label">Step 1</p>
          <wpp-step substep="true"><p slot="label">Sub-step 1.1</p></wpp-step>
          <wpp-step substep="true"><p slot="label">Sub-step 1.2</p></wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label">Step 2</p>
          <wpp-step substep="true"><p slot="label">Sub-step 2.1</p></wpp-step>
          <wpp-step substep="true"><p slot="label">Sub-step 2.2</p></wpp-step>
          <wpp-step substep="true"><p slot="label">Sub-step 2.3</p></wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label">Step 3</p>
          <wpp-step substep="true"><p slot="label">Sub-step 3.1</p></wpp-step>
          <wpp-step substep="true"><p slot="label">Sub-step 3.2</p></wpp-step>
        </wpp-step>
        <wpp-step><p slot="label">Step 4</p></wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    const stepSelector = ['wpp-step', transformToVersionedTag('wpp-step')].join(', ');
    const mainSteps = Array.from(page.root?.querySelectorAll(stepSelector) ?? []).filter(step => !step.hasAttribute('substep'));
    expect(mainSteps).toHaveLength(4);
    expect(mainSteps[0].getAttribute('aria-posinset')).toBe('1');
    expect(mainSteps[0].getAttribute('aria-setsize')).toBe('4');
  });
  it('render step with error', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `
      <wpp-stepper active-step=${1} .orientation=${'horizontal'} step-amount=${2}>
        <wpp-step substep=${true} error=${true}>
          <p slot="label">
            Step
          </p>
        </wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('render horizontal stepper', async () => {
    const page = await newSpecPage({
      components: [WppStepper, WppStep],
      html: `
      <wpp-stepper active-step=${1} .orientation=${'horizontal'} step-amount=${2}>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      </wpp-stepper>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppStepper, WppStep],
        html: `<wpp-stepper active-step=${1} orientation=${'vertical'}>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `<wpp-stepper active-step=${1} orientation=${'vertical'}>
      <wpp-step>
        <p slot="label">
          Step
        </p>
      </wpp-step>
      </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
