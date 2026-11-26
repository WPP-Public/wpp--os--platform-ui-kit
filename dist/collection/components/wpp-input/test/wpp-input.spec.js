import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppInput } from '../wpp-input';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import { WppSpinner } from '../../wpp-spinner/wpp-spinner';
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
        template: () => h("wpp-input-v4-7-0", null),
      });
      const componentInstance = page.rootInstance;
      await page.waitForChanges();
      expect(componentWillLoadSpy).toHaveBeenCalled();
      expect(componentInstance['_locales'].minLengthErrorMessage(3)).toBe('The input must have at least 3 characters');
      expect(componentInstance['_locales'].maxLengthErrorMessage(10)).toBe('The input can have a maximum of 10 characters');
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
        template: () => h("wpp-input-v4-7-0", null),
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
        template: () => h("wpp-input-v4-7-0", { value: "initial" }),
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
        template: () => (h("wpp-input-v4-7-0", { value: "0722334455", maskOptions: {
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
        template: () => h("wpp-input-v4-7-0", null),
      });
      const componentInstance = page.rootInstance;
      await page.waitForChanges();
      // Initial locales — defaults
      expect(componentInstance['_locales'].minLengthErrorMessage(3)).toBe('The input must have at least 3 characters');
      expect(componentInstance['_locales'].maxLengthErrorMessage(10)).toBe('The input can have a maximum of 10 characters');
      // Changing only minLengthErrorMessage
      componentInstance.locales = {
        minLengthErrorMessage: (minLength) => `Minimum length is ${minLength}`,
      };
      await page.waitForChanges();
      // Override applied; default for maxLengthErrorMessage still intact
      expect(componentInstance['_locales'].minLengthErrorMessage(5)).toBe('Minimum length is 5');
      expect(componentInstance['_locales'].maxLengthErrorMessage(10)).toBe('The input can have a maximum of 10 characters');
      // Stale-override regression: clearing the override must revert to default
      componentInstance.locales = {};
      await page.waitForChanges();
      expect(componentInstance['_locales'].minLengthErrorMessage(3)).toBe('The input must have at least 3 characters');
      expect(componentInstance['_locales'].maxLengthErrorMessage(10)).toBe('The input can have a maximum of 10 characters');
    });
    it('Testing updating maskOptions', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-7-0", null),
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
  it('should keep following the value prop after being detached and reattached', async () => {
    // A popover detaches its content on close and reattaches it on open, as the color picker's opacity field is.
    const page = await newSpecPage({
      components: [WppInput],
      template: () => (h("wpp-input-v4-7-0", { name: "opacity", value: "50%", maskOptions: { decimalPatternOptions: { min: 0, max: 100, maximumFractionDigits: 0, postfix: '%' } } })),
    });
    const host = page.root;
    const parent = host.parentElement;
    host.remove();
    parent.appendChild(host);
    await page.waitForChanges();
    host.value = '30%';
    await page.waitForChanges();
    expect(host.shadowRoot?.querySelector('input')?.value).toBe('30%');
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
      template: () => h("wpp-input-v4-7-0", { labelConfig: labelConfig, name: "text-input" }),
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
  describe('Testing accessibility', () => {
    const getInput = (page) => page.root?.shadowRoot?.querySelector('input');
    const describedByTexts = (page) => (getInput(page).getAttribute('aria-describedby') ?? '')
      .split(' ')
      .filter(Boolean)
      .map(id => page.root?.shadowRoot?.getElementById(id)?.getAttribute('message'));
    it('should describe the input with its help message', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-7-0", { name: "first-name", message: "As shown on your passport" }),
      });
      expect(describedByTexts(page)).toEqual(['As shown on your passport']);
    });
    it('should describe an invalid input with its error message', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-7-0", { name: "email", message: "Enter a valid email", messageType: "error" }),
      });
      expect(getInput(page).getAttribute('aria-invalid')).toBe('true');
      expect(describedByTexts(page)).toEqual(['Enter a valid email']);
    });
    it('should describe the input with the length validation message as it appears', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-7-0", { name: "code", minLength: 5 }),
      });
      expect(getInput(page).hasAttribute('aria-describedby')).toBe(false);
      getInput(page).value = 'ab';
      getInput(page).dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(describedByTexts(page)).toEqual(['The input must have at least 5 characters']);
    });
    it('should not reference a description when there is no message', async () => {
      const page = await newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-7-0", { name: "plain" }),
      });
      expect(getInput(page).hasAttribute('aria-describedby')).toBe(false);
    });
    it('should keep a loading search input editable and expose its spinner as loading', async () => {
      const page = await newSpecPage({
        components: [WppInput, WppSpinner],
        template: () => h("wpp-input-v4-7-0", { name: "search", type: "search", loading: true }),
      });
      const spinner = page.root?.shadowRoot?.querySelector('wpp-spinner');
      expect(getInput(page).getAttribute('aria-disabled')).toBe('false');
      expect(spinner.getAttribute('role')).toBe('status');
      expect(spinner.getAttribute('aria-label')).toBe('Loading');
      expect(spinner.hasAttribute('aria-hidden')).toBe(false);
    });
    it('should take the clear button and loading names from locales', async () => {
      const page = await newSpecPage({
        components: [WppInput, WppSpinner],
        template: () => (h("wpp-input-v4-7-0", { name: "search", type: "search", loading: true, value: "query", locales: { clearInput: 'Effacer', loading: 'Chargement' } })),
      });
      getInput(page).dispatchEvent(new FocusEvent('focus'));
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      const spinner = page.root?.shadowRoot?.querySelector('wpp-spinner');
      const clearButton = page.root?.shadowRoot?.querySelector('[part="icon-cross"]');
      expect(spinner.getAttribute('aria-label')).toBe('Chargement');
      expect(clearButton?.getAttribute('aria-label')).toBe('Effacer');
    });
    describe('focus ring', () => {
      const tabKeyUp = () => new KeyboardEvent('keyup', { key: 'Tab', bubbles: true, composed: true });
      const renderWithInfoIcon = () => newSpecPage({
        components: [WppInput],
        template: () => h("wpp-input-v4-7-0", { name: "email", labelConfig: { text: 'Email', description: 'Used for sign in' } }),
      });
      it('should not ring the input when Tab lands on the label info icon', async () => {
        const page = await renderWithInfoIcon();
        const label = page.root?.shadowRoot?.querySelector('wpp-label');
        label.dispatchEvent(tabKeyUp());
        await page.waitForChanges();
        expect(getInput(page).classList.contains('tab-focus')).toBe(false);
      });
      it('should ring the input when Tab lands on it', async () => {
        const page = await renderWithInfoIcon();
        getInput(page).dispatchEvent(tabKeyUp());
        await page.waitForChanges();
        expect(getInput(page).classList.contains('tab-focus')).toBe(true);
      });
    });
  });
});
