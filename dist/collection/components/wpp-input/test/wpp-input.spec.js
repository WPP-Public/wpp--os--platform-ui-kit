import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppInput } from '../wpp-input';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-input', () => {
  afterEach(() => {
    // Clear all created mocks
    jest.clearAllMocks();
  });
  describe('Should functionality of WppInput', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('Testing initialisation', () => {
      const inputEl = new WppInput();
      expect(inputEl.name).toBeUndefined();
      expect(inputEl.type).toBe('text');
      expect(inputEl.defaultValue).toBeUndefined();
      expect(inputEl.placeholder).toBeUndefined();
      expect(inputEl.required).toBe(false);
      expect(inputEl.readOnly).toBe(false);
      expect(inputEl.disabled).toBe(false);
      expect(inputEl.autoFocus).toBe(false);
      expect(inputEl.size).toBe('m');
      expect(inputEl.message).toBeUndefined();
      expect(inputEl.maxMessageLength).toBeUndefined();
      expect(inputEl.ariaProps).toMatchObject({});
      expect(inputEl.tooltipConfig).toMatchObject({});
      expect(inputEl.truncationTooltipConfig).toMatchObject({});
      expect(inputEl.labelTooltipConfig).toMatchObject({ popperOptions: { strategy: 'fixed' } });
      expect(inputEl.maskOptions).toBeUndefined();
      expect(inputEl.labelConfig).toBeUndefined();
      expect(inputEl.maxLength).toBeUndefined();
      expect(inputEl.minLength).toBeUndefined();
      expect(inputEl.locales).toMatchObject({});
      expect(inputEl.loading).toBe(false);
      expect(inputEl.autocomplete).toBe('off');
      expect(inputEl.withCrossIcon).toBe(true);
    });
  });
  describe('Testing connectedCallback', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('With default value for withCrossIcon (which is true)', () => {
      const inputEl = new WppInput();
      const updateCrossIconSpy = jest.spyOn(inputEl, 'updateCrossIcon');
      const checkForEllipsisSpy = jest.spyOn(inputEl, 'checkForEllipsis');
      inputEl.connectedCallback();
      expect(updateCrossIconSpy).toHaveBeenCalled();
      expect(checkForEllipsisSpy).toHaveBeenCalled();
      expect(inputEl.internalDefaultValue).toBeUndefined();
    });
    it('With explicit false value for withCrossIcon and defaultValue', () => {
      // Create a new instance and mock the read-only property
      const inputEl = new WppInput();
      Object.defineProperty(inputEl, 'withCrossIcon', { value: false });
      Object.defineProperty(inputEl, 'defaultValue', { value: 'test' });
      const updateCrossIconSpy = jest.spyOn(inputEl, 'updateCrossIcon');
      const checkForEllipsisSpy = jest.spyOn(inputEl, 'checkForEllipsis');
      inputEl.connectedCallback();
      expect(updateCrossIconSpy).toHaveBeenCalledTimes(0);
      expect(checkForEllipsisSpy).toHaveBeenCalledTimes(1);
      expect(inputEl.internalDefaultValue).toBe('test');
    });
  });
  describe('Testing componentWillLoad', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('', async () => {
      const componentWillLoadSpy = jest.spyOn(WppInput.prototype, 'componentWillLoad');
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-0-0", null),
      });
      const componentInstance = page.rootInstance;
      await page.waitForChanges();
      expect(componentWillLoadSpy).toHaveBeenCalled();
      expect(JSON.stringify(componentInstance['_locales'])).toBe(JSON.stringify({
        minLengthErrorMessage: (minLength) => `The input must have at least ${minLength} characters`,
        maxLengthErrorMessage: (maxLength) => `The input can have a maximum of ${maxLength} characters`,
      }));
    });
  });
  describe('Testing componentDidLoad', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('Testing componentDidLoad', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-0-0", null),
      });
      const inputEl = page.rootInstance;
      const createMaskForInputSpy = jest.spyOn(inputEl, 'createMaskForInput');
      const setupResizeObserverSpy = jest.spyOn(inputEl, 'setupResizeObserver');
      inputEl.componentDidLoad();
      expect(createMaskForInputSpy).toHaveBeenCalled();
      expect(setupResizeObserverSpy).toHaveBeenCalled();
    });
  });
  describe('Testing watchers', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('Testing initial value updating the value property with no mask', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-0-0", { value: "initial" }),
      });
      const componentInstance = page.rootInstance;
      await page.waitForChanges();
      expect(componentInstance.renderedValue).toBe('initial');
      componentInstance.onUpdateValue('updated');
      await page.waitForChanges();
      expect(componentInstance.renderedValue).toBe('updated');
    });
    it('Testing initial value and updating the value property with mask', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => (h("wpp-input-v4-0-0", { value: "0722334455", maskOptions: {
            telPatternOptions: {
              countryCode: 'RO',
            },
          }, type: "tel" })),
      });
      const componentInstance = page.rootInstance;
      await page.waitForChanges();
      expect(componentInstance.renderedValue).toBe('+40 722 334-455');
      componentInstance.onUpdateValue('0733445566');
      await page.waitForChanges();
      expect(componentInstance.generatedMask).not.toBeFalsy();
      expect(componentInstance.renderedValue).toBe('+40 733 445-566');
    });
    it('Testing updating locales', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-0-0", null),
      });
      const componentInstance = page.rootInstance;
      await page.waitForChanges();
      // Initial locales
      expect(JSON.stringify(componentInstance['_locales'])).toBe(JSON.stringify({
        minLengthErrorMessage: (minLength) => `The input must have at least ${minLength} characters`,
        maxLengthErrorMessage: (maxLength) => `The input can have a maximum of ${maxLength} characters`,
      }));
      const expectedLocales = {
        minLengthErrorMessage: (minLength) => `Minimum length is ${minLength}`,
      };
      // Changing locales dynamically
      componentInstance.onUpdateLocales(expectedLocales);
      await page.waitForChanges();
      // Because only the minLengthErrorMessge was updated, we expect the maxLengthErrorMessage to remain the same as initial
      expect(JSON.stringify(componentInstance['_locales'])).toBe(JSON.stringify({
        minLengthErrorMessage: (minLength) => `Minimum length is ${minLength}`,
        maxLengthErrorMessage: (maxLength) => `The input can have a maximum of ${maxLength} characters`,
      }));
    });
    it('Testing updating maskOptions', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-0-0", null),
      });
      const componentInstance = page.rootInstance;
      const createMaskForInputSpy = jest.spyOn(componentInstance, 'createMaskForInput');
      const destroyMaskSpy = jest.spyOn(componentInstance, 'destroyMask');
      componentInstance.onUpdateMaskOptions({
        telPatternOptions: {
          countryCode: 'RO',
        },
      });
      await page.waitForChanges();
      expect(destroyMaskSpy).toHaveBeenCalled();
      expect(createMaskForInputSpy).toHaveBeenCalled();
    });
  });
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppInput],
      html: `<wpp-input type="text" name="text-input" value="test" size="m" placeholder="Text"/>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with warning message', async () => {
    const page = await newSpecPage({
      components: [WppInput],
      html: `<wpp-input type="text" name="text-input" value="test" size="s" placeholder="Text" message-type="warning" message="Warning message"/>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppInput, WppLabel, WppInternalLabel],
      template: () => h("wpp-input-v4-0-0", { labelConfig: labelConfig, name: "text-input" }),
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with search type', async () => {
    const page = await newSpecPage({
      components: [WppInput],
      html: `<wpp-input type="search" name="search-input" value="test" size="s" placeholder="Text" message-type="warning" message="Warning message"/>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
