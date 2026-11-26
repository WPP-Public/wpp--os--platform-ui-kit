import { newSpecPage } from '@stencil/core/testing';
import { WppStep } from '../wpp-step';
import { WppStepper } from '../../../wpp-stepper';
describe('wpp-step', () => {
  describe('Testing truncated text tooltips', () => {
    afterEach(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    it.each([
      ['Long label', null, 'Long label'],
      [null, 'Long description', 'Long description'],
      ['Long label', 'Long description', 'Long label\nLong description'],
    ])('provides a host-focus tooltip for label %s and description %s', async (label, description, text) => {
      const page = await newSpecPage({
        components: [WppStep],
        html: '<wpp-step><span slot="label">Label</span><span slot="description">Description</span></wpp-step>',
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      const instance = page.rootInstance;
      instance.labelTooltipText = label;
      instance.tooltipText = description;
      await page.waitForChanges();
      const tooltip = page.root.shadowRoot.querySelector('.focus-tooltip');
      const config = tooltip.config;
      expect(tooltip.getAttribute('text')).toBe(text);
      expect(config.trigger).toBe('focus');
      expect(config.triggerTarget).toBe(page.root);
      expect(config.aria).toEqual({ content: 'describedby', expanded: false });
      const row = page.root.shadowRoot.querySelector('.step-bg');
      const rowRect = { ...row.getBoundingClientRect(), y: 40, top: 40, height: 36, bottom: 76 };
      jest.spyOn(row, 'getBoundingClientRect').mockReturnValue(rowRect);
      expect(config.getReferenceClientRect()).toEqual(rowRect);
      expect(tooltip.hasAttribute('disabled')).toBe(false);
      expect(tooltip.querySelector('[tabindex]')).toBeNull();
      expect(page.root.shadowRoot.querySelector('.label-tooltip') !== null).toBe(Boolean(label));
      expect(page.root.shadowRoot.querySelector('.description-tooltip') !== null).toBe(Boolean(description));
    });
    it('does not create a focus tooltip for text that fits', async () => {
      const page = await newSpecPage({
        components: [WppStep],
        html: '<wpp-step><span slot="label">Label</span></wpp-step>',
      });
      expect(page.root.shadowRoot.querySelector('.focus-tooltip')).toBeNull();
    });
    it('anchors a horizontal focus tooltip to the label rather than the entire step', async () => {
      const page = await newSpecPage({
        components: [WppStep],
        html: '<wpp-step orientation="horizontal"><span slot="label">Label</span></wpp-step>',
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      const instance = page.rootInstance;
      instance.tooltipText = 'Long description';
      await page.waitForChanges();
      const label = page.root.shadowRoot.querySelector('.text-wrapper');
      const rect = { ...label.getBoundingClientRect(), x: 20, left: 20, width: 80, right: 100 };
      jest.spyOn(label, 'getBoundingClientRect').mockReturnValue(rect);
      const tooltip = page.root.shadowRoot.querySelector('.focus-tooltip');
      expect(tooltip.config.getReferenceClientRect()).toEqual(rect);
    });
    it('disables the focus tooltip on disabled steps and removes it when text fits', async () => {
      const page = await newSpecPage({
        components: [WppStep],
        html: '<wpp-step aria-disabled="true"></wpp-step>',
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      const instance = page.rootInstance;
      instance.tooltipText = 'Long description';
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.focus-tooltip').hasAttribute('disabled')).toBe(true);
      instance.tooltipText = null;
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.focus-tooltip')).toBeNull();
    });
  });
  it('does not emit a step change when a disabled step is clicked', async () => {
    const page = await newSpecPage({
      components: [WppStep],
      html: `
        <wpp-step aria-disabled="true"></wpp-step>
        <wpp-step></wpp-step>`,
    });
    const [disabledStep, enabledStep] = Array.from(page.body.querySelectorAll('wpp-step'));
    const stepChange = jest.fn();
    disabledStep.addEventListener('wppStepChange', stepChange);
    enabledStep.addEventListener('wppStepChange', stepChange);
    disabledStep.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    enabledStep.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    expect(stepChange).toHaveBeenCalledTimes(1);
    expect(stepChange.mock.instances).toHaveLength(1);
    expect(stepChange.mock.calls[0][0].target).toBe(enabledStep);
  });
  describe.each([false, true])('Testing accessibility (decimal sub-steps: %s)', useDecimalSubSteps => {
    const setup = async () => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <wpp-stepper active-step="${useDecimalSubSteps ? 1.1 : 2}" completed-steps="${useDecimalSubSteps ? 1 : 4}"
            use-decimal-sub-steps="${useDecimalSubSteps}" orientation="vertical">
            <wpp-step>
              <wpp-step substep="true"></wpp-step>
              <wpp-step substep="true"></wpp-step>
            </wpp-step>
            <wpp-step>
              <wpp-step substep="true"></wpp-step>
              <wpp-step substep="true"></wpp-step>
            </wpp-step>
            <wpp-step></wpp-step>
          </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const steps = Array.from(page.body.querySelectorAll('wpp-step'));
      const focusSpies = steps.map(step => jest.spyOn(step, 'focus').mockImplementation(() => {
        step.dispatchEvent(new FocusEvent('focus'));
      }));
      const stepChange = jest.fn();
      page.root.addEventListener('wppChange', stepChange);
      const press = (index, key) => steps[index].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      return { page, steps, focusSpies, stepChange, press };
    };
    it.each(['ArrowRight', 'ArrowDown'])('includes expanded sub-steps when moving forward with %s', async (key) => {
      const { page, steps, focusSpies, stepChange, press } = await setup();
      for (const index of [0, 1, 2]) {
        press(index, key);
        expect(focusSpies[index + 1]).toHaveBeenCalledTimes(1);
        expect(steps[index + 1].tabIndex).toBe(0);
        expect(steps[0].hasAttribute('tabindex')).toBe(index === 2);
        expect(page.root.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      }
      press(3, key);
      expect(focusSpies[4]).not.toHaveBeenCalled();
      expect(focusSpies[5]).not.toHaveBeenCalled();
      expect(focusSpies[6]).not.toHaveBeenCalled();
      expect(stepChange).not.toHaveBeenCalled();
    });
    it.each(['ArrowLeft', 'ArrowUp'])('returns through expanded sub-steps with %s', async (key) => {
      const { page, steps, focusSpies, stepChange, press } = await setup();
      for (const index of [3, 2, 1]) {
        press(index, key);
        expect(focusSpies[index - 1]).toHaveBeenCalledTimes(1);
        expect(steps[index - 1].tabIndex).toBe(0);
        expect(steps[0].hasAttribute('tabindex')).toBe(index === 1);
        expect(page.root.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      }
      press(0, key);
      expect(focusSpies[3]).not.toHaveBeenCalled();
      expect(stepChange).not.toHaveBeenCalled();
    });
    it('uses Home and End across levels, skipping collapsed and disabled steps', async () => {
      const { steps, focusSpies, stepChange, press } = await setup();
      press(1, 'End');
      expect(focusSpies[3]).toHaveBeenCalledTimes(1);
      expect(steps[3].tabIndex).toBe(0);
      press(3, 'Home');
      expect(focusSpies[0]).toHaveBeenCalledTimes(1);
      expect(steps[0].tabIndex).toBe(0);
      expect(stepChange).not.toHaveBeenCalled();
    });
    it('makes an ancestor focusable before moving arrow focus back to it', async () => {
      const { page, steps, focusSpies, press } = await setup();
      steps[1].focus();
      expect(steps[0].hasAttribute('tabindex')).toBe(false);
      focusSpies[0].mockImplementationOnce(() => {
        expect(steps[0].getAttribute('tabindex')).toBe('0');
        steps[0].dispatchEvent(new FocusEvent('focus'));
      });
      press(1, 'ArrowUp');
      expect(focusSpies[0]).toHaveBeenCalledTimes(1);
      expect(steps[0].tabIndex).toBe(0);
      expect(page.root.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    });
    it('skips disabled sub-steps in an expanded step', async () => {
      const { steps, focusSpies, press } = await setup();
      steps[1].setAttribute('aria-disabled', 'true');
      press(0, 'ArrowDown');
      expect(focusSpies[1]).not.toHaveBeenCalled();
      expect(focusSpies[2]).toHaveBeenCalledTimes(1);
      press(2, 'ArrowUp');
      expect(focusSpies[0]).toHaveBeenCalledTimes(1);
    });
    it('preserves the tab stop on repeated Home and End without focus events', async () => {
      const { page, steps, focusSpies, stepChange, press } = await setup();
      focusSpies.forEach(spy => spy.mockImplementation(() => { }));
      const activeStep = page.root.activeStep;
      for (const [key, index] of [
        ['Home', 0],
        ['End', 3],
      ]) {
        for (let count = 0; count < 2; count++) {
          press(index, key);
          expect(steps[index].tabIndex).toBe(0);
          expect(page.root.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
          expect(focusSpies[index]).toHaveBeenCalledTimes(count + 1);
        }
      }
      expect(stepChange).not.toHaveBeenCalled();
      expect(page.root.activeStep).toBe(activeStep);
    });
    it('preserves the only enabled tab stop on Home and End from a cold load', async () => {
      const page = await newSpecPage({
        components: [WppStepper, WppStep],
        html: `
          <wpp-stepper active-step="1" use-decimal-sub-steps="${useDecimalSubSteps}">
            <wpp-step></wpp-step>
            <wpp-step></wpp-step>
          </wpp-stepper>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const step = page.root.querySelector('wpp-step');
      jest.spyOn(step, 'focus').mockImplementation(() => { });
      step.dispatchEvent(new FocusEvent('focus'));
      for (const key of ['End', 'End', 'Home', 'Home']) {
        step.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
        expect(step.tabIndex).toBe(0);
        expect(page.root.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
      }
    });
    it('removes collapsed sub-steps from the Tab sequence after the active step changes', async () => {
      const { page, steps } = await setup();
      steps[1].focus();
      page.root.activeStep = useDecimalSubSteps ? 2.1 : 5;
      await page.waitForChanges();
      expect(steps[0].hasAttribute('expanded')).toBe(false);
      expect(steps[1].tabIndex).toBe(-1);
      expect(steps[2].tabIndex).toBe(-1);
      expect(page.root.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
    });
  });
});
