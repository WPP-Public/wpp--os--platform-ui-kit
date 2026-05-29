import { newSpecPage } from '@stencil/core/testing';
import { WppStepper } from '../wpp-stepper';
import { WppStep } from '../components/wpp-step/wpp-step';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-stepper', () => {
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
