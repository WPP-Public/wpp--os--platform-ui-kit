import { newSpecPage } from '@stencil/core/testing';
import { WppActionButton } from '../wpp-action-button';
import { FOCUS_TYPE } from '../../../types/common';
const setUpForm = (document, shouldAttach = true) => {
  const requestSubmitSpy = jest.fn();
  const resetSpy = jest.fn();
  const form = document.createElement('form');
  // Setting up default properties and spies on form element.
  form.id = 'myForm';
  form.requestSubmit = requestSubmitSpy;
  form.reset = resetSpy;
  if (shouldAttach) {
    // Attaches form element to the DOM of jest env.
    document.body.appendChild(form);
  }
  return form;
};
describe('wpp-action-button', () => {
  describe('Testing initialisation', () => {
    it('Test default init', async () => {
      const myBtn = new WppActionButton();
      expect(myBtn).toBeTruthy();
    });
    it('Test default properties on component', () => {
      const myBtn = new WppActionButton();
      // Testing default property initialisation
      expect(myBtn.disabled).toBeFalsy();
      expect(myBtn.loading).toBeFalsy();
      expect(myBtn.variant).toEqual('primary');
      expect(myBtn.autoFocus).toBeFalsy();
      expect(myBtn.name).not.toBeDefined();
      expect(myBtn.form).not.toBeDefined();
      expect(myBtn.type).toEqual('button');
      expect(myBtn.value).not.toBeDefined();
    });
  });
  describe('Test componentWillLoad', () => {
    it('Should render button with no slots', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button></wpp-action-button>`,
      });
      await page.waitForChanges();
      const component = page.rootInstance;
      // Test that there is no slot element.
      expect(component.hasIconStartSlot).toBeFalsy();
      expect(component.hasIconEndSlot).toBeFalsy();
      expect(component.isIconOnly).toBeFalsy();
    });
    it('Should render button with icon-start slot', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button>
          <wpp-icon-arrow slot="icon-start"></wpp-icon-arrow>
          Arrow Icon
        </wpp-action-button>`,
      });
      await page.waitForChanges();
      const component = page.rootInstance;
      // Test there is icon-start slot.
      expect(component.hasIconStartSlot).toBeTruthy();
      expect(component.hasIconEndSlot).toBeFalsy();
      expect(component.isIconOnly).toBeFalsy();
    });
    it('Should render button with icon-end slot', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button>
          Arrow Icon
          <wpp-icon-arrow slot="icon-end"></wpp-icon-arrow>
        </wpp-action-button>`,
      });
      await page.waitForChanges();
      const component = page.rootInstance;
      // Test there is icon-end slot.
      expect(component.hasIconStartSlot).toBeFalsy();
      expect(component.hasIconEndSlot).toBeTruthy();
      expect(component.isIconOnly).toBeFalsy();
    });
    it('Should render button with icon only', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button>
          <wpp-icon-arrow slot="icon-start"></wpp-icon-arrow>
        </wpp-action-button>`,
      });
      await page.waitForChanges();
      const component = page.rootInstance;
      // Test there is icon-start slot and it's icon-only button.
      expect(component.hasIconStartSlot).toBeTruthy();
      expect(component.hasIconEndSlot).toBeFalsy();
      expect(component.isIconOnly).toBeTruthy();
    });
  });
  describe('Test onKeyDown', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('Test disabled button stops the event', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button disabled>
        Test Button
      </wpp-action-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).not.toHaveBeenCalled();
    });
    it('Test that loading button stops the event', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button loading>
        Test Button
      </wpp-action-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).not.toHaveBeenCalled();
    });
    it('Test button dispatches event when `Enter` key is pressed', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button>
        Test Button
      </wpp-action-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).toHaveBeenCalled();
    });
    it('Test button dispatches event when ` ` key is pressed', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button>
        Test Button
      </wpp-action-button>`,
      });
      // Creating onKeyDown event so we can dispatch it to trigger onKeyDown function from component
      const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
      // Create spy for click function in order to test if click event is dispatched
      const onKeyDownSpy = jest.fn();
      page.root?.addEventListener('click', onKeyDownSpy);
      // Dispatch onKeyDown event to trigger function
      page.root?.dispatchEvent(event);
      await page.waitForChanges();
      // Test that click event has not been dispatched
      expect(onKeyDownSpy).toHaveBeenCalled();
    });
  });
  describe('Test handleClick', () => {
    afterEach(() => {
      // Clear all created mocks
      jest.clearAllMocks();
    });
    it('Testing that disabled button stops propagation of the event', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button disabled type="submit">
        Submit Button
      </wpp-action-button>`,
      });
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event has stopped from propagation.
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
    it('Testing that loading button stops propagation of the event', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button disabled type="submit">
          Submit Button
        </wpp-action-button>`,
      });
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event has stopped from propagation.
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
    it('Testing that buttons with type other than `submit` and `reset` do nothing when form is passed as string (id)', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button type="button" form="myForm">
          Button
        </wpp-action-button>`,
      });
      // Creating spies for form functions to tests whether they are called or not
      const { requestSubmit: requestSubmitSpy, reset: resetSpy } = setUpForm(page.win.document);
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that formEl.requestSubmit() was not called because of the type
      expect(requestSubmitSpy).not.toHaveBeenCalled();
      // Test that formEl.reset() was not called because of the type
      expect(resetSpy).not.toHaveBeenCalled();
    });
    it('Testing that button with type `submit` call form.requestSubmit() when form is passed as string (id)', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button type="submit" form="myForm">
          Submit Button
        </wpp-action-button>`,
      });
      // Creating spies for form functions to tests whether they are called or not
      const { requestSubmit: requestSubmitSpy, reset: resetSpy } = setUpForm(page.win.document);
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that formEl.requestSubmit() was called because of the type
      expect(requestSubmitSpy).toHaveBeenCalled();
      // Test that formEl.reset() was not called because of the type
      expect(resetSpy).not.toHaveBeenCalled();
    });
    it('Testing that button with type `reset` call form.reset() when form is passed as string (id)', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button type="reset" form="myForm">
          Reset Button
        </wpp-action-button>`,
      });
      // Creating spies for form functions to tests whether they are called or not
      const { requestSubmit: requestSubmitSpy, reset: resetSpy } = setUpForm(page.win.document);
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that formEl.requestSubmit() was not called because of the type
      expect(requestSubmitSpy).not.toHaveBeenCalled();
      // Test that formEl.reset() was called because of the type
      expect(resetSpy).toHaveBeenCalled();
    });
    it('Testing that button with type `submit` call form.requestSubmit() when form is passed as property', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<wpp-action-button type="submit">
          Submit Button
        </wpp-action-button>`,
      });
      // Create form element to pass it to the component through `form` property
      const form = setUpForm(page.win.document, false);
      const { requestSubmit: requestSubmitSpy, reset: resetSpy } = form;
      // Bypass Stencil's immutability guard. Passing form through property to component
      Object.defineProperty(page.rootInstance, 'form', {
        value: form,
        configurable: true,
      });
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that formEl.requestSubmit() was not called because of the type
      expect(requestSubmitSpy).toHaveBeenCalled();
      // Test that formEl.reset() was called because of the type
      expect(resetSpy).not.toHaveBeenCalled();
    });
    it('Testing that button with type `submit` call form.requestSubmit() when button placed inside a form', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `<form id="myForm">
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        </form>
        `,
      });
      // Setting up function spies and query for form element on the page.
      const requestSubmitSpy = jest.fn();
      const resetSpy = jest.fn();
      const formEl = page.doc.getElementById('myForm');
      formEl.requestSubmit = requestSubmitSpy;
      formEl.reset = resetSpy;
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that formEl.requestSubmit() was not called because of the type
      expect(requestSubmitSpy).toHaveBeenCalled();
      // Test that formEl.reset() was called because of the type
      expect(resetSpy).not.toHaveBeenCalled();
    });
    it('Testing that button with type `submit` and no form do not call form.requestSubmit()', async () => {
      const requestSubmitSpy = jest.fn();
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        `,
      });
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that `form` property of component is not a string or a form element.
      // This will result in `closestElement` getting called, which will return null
      expect(page.rootInstance.form).not.toBeInstanceOf(HTMLFormElement);
      expect(typeof page.rootInstance.form).not.toEqual('string');
      expect(requestSubmitSpy).not.toHaveBeenCalled();
    });
    it('Testing that button with type `reset` and no form do not call form.reset()', async () => {
      const resetSpy = jest.fn();
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="reset">
            Reset Button
          </wpp-action-button>
        `,
      });
      // Create click event in order to simulate clicking the button
      const clickEvent = new MouseEvent('click', { bubbles: true });
      // Create spy for "stopPropagation" function of clickEvent, in order to
      // test whether it is called or not
      const stopPropagationSpy = jest.fn();
      Object.defineProperty(clickEvent, 'stopPropagation', { value: stopPropagationSpy });
      // Dispatch click event so handleClick function is triggered.
      page.root?.dispatchEvent(clickEvent);
      await page.waitForChanges();
      // Test that the event did not stop propagating.
      expect(stopPropagationSpy).not.toHaveBeenCalled();
      // Test that `form` property of component is not a string or a form element.
      // This will result in `closestElement` getting called, which will return null
      expect(page.rootInstance.form).not.toBeInstanceOf(HTMLFormElement);
      expect(typeof page.rootInstance.form).not.toEqual('string');
      expect(resetSpy).not.toHaveBeenCalled();
    });
  });
  describe('Testing Events', () => {
    it('Testing onBlur event', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        `,
      });
      // Create blur event in order to simulate blurring the button
      const blurEvent = new FocusEvent('blur', { bubbles: true });
      // Dispatch blur event so onBlur function is triggered.
      page.root?.dispatchEvent(blurEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.NONE);
    });
    it('Testing onMouseDown event', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        `,
      });
      // Create mouseDown event
      const mouseDownEvent = new MouseEvent('mousedown', { bubbles: true });
      // Dispatch mouseDown event so onMouseDown function is triggered.
      page.root?.dispatchEvent(mouseDownEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.MOUSE);
    });
    it('Testing onKeyUp event when key is `Tab`', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        `,
      });
      // Create keyUp event
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'Tab', bubbles: true });
      // Dispatch keyUp event so onKeyUp function is triggered.
      page.root?.dispatchEvent(keyUpEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.TAB);
    });
    it('Testing onKeyUp event when key is ` `', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        `,
      });
      // Create keyUp event
      const keyUpEvent = new KeyboardEvent('keyup', { key: ' ', bubbles: true });
      // Dispatch keyUp event so onKeyUp function is triggered.
      page.root?.dispatchEvent(keyUpEvent);
      await page.waitForChanges();
      expect(page.rootInstance.focusType).toBeUndefined();
    });
  });
  describe('Test loadingColor', () => {
    it('Testing for default variant', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button>
            Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      // Test that loadingColor function returns correct value based on type of component
      expect(page.rootInstance.loadingColor()).toEqual('var(--wpp-primary-color-500)');
    });
    it('Testing for secondary variant', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button variant="secondary">
            Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      // Test that loadingColor function returns correct value based on type of component
      expect(page.rootInstance.loadingColor()).toEqual('var(--wpp-grey-color-800)');
    });
    it('Testing for inverted variant', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button variant="inverted">
            Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      // Test that loadingColor function returns correct value based on type of component
      expect(page.rootInstance.loadingColor()).toEqual('var(--wpp-grey-color-000)');
    });
    it('Testing for destructive variant', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button variant="destructive">
            Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      // Test that loadingColor function returns correct value based on type of component
      expect(page.rootInstance.loadingColor()).toEqual('var(--wpp-danger-color-500)');
    });
  });
  describe('Testing snapshots', () => {
    it('Testing default button', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button>
            Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing disabled button', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button disabled>
            Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing submit button', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit">
            Submit Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing loading secondary submit button', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit" variant="secondary" loading>
            Submit Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing reset button with icon-start slot', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="reset" variant="secondary" loading>
            <wpp-icon-arrow slot="icon-start"></wpp-icon-arrow>
            Reset Button
          </wpp-action-button>
        `,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing submit button with icon-end slot and tab-focus', async () => {
      const page = await newSpecPage({
        components: [WppActionButton],
        html: `
          <wpp-action-button type="submit" variant="secondary" loading>
            Submit Button
            <wpp-icon-arrow slot="icon-end"></wpp-icon-arrow>
          </wpp-action-button>
        `,
      });
      // Create keyUp event
      const keyUpEvent = new KeyboardEvent('keyup', { key: 'Tab', bubbles: true });
      // Dispatch keyUp event so onKeyUp function is triggered.
      page.root?.dispatchEvent(keyUpEvent);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});
