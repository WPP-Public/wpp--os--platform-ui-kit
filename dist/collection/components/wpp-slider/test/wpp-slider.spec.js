import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSlider } from '../wpp-slider';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-slider', () => {
  it('should render slider component', async () => {
    const value = 1;
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v3-5-0", { value: value }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled slider with input', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      html: `<wpp-slider value='5' disabled with-input />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render slider with generated marks', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      html: `<wpp-slider value='5' max='7' marks />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render slider with marks', async () => {
    const marks = [
      {
        label: 'low',
        value: 1,
      },
      {
        label: 'medium',
        value: 2,
      },
      {
        label: 'rare',
        value: 3,
      },
    ];
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v3-5-0", { value: 2, marks: marks, max: 3 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with value 4-75', async () => {
    const value = [4, 75];
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v3-5-0", { type: "range", value: value }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with displayed value', async () => {
    const value = [1, 3];
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v3-5-0", { type: "range", max: 5, step: 2, value: value, "with-value": true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with label, icon and tooltip description', async () => {
    const value = [1, 3];
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppSlider, WppLabel, WppInternalLabel],
      template: () => h("wpp-slider-v3-5-0", { type: "range", max: 5, step: 2, value: value, labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with input width in px', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v3-5-0", { type: "range", max: 5, step: 2, value: [1, 3], "input-width": "200px" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with input width in ch', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v3-5-0", { type: "range", max: 5, step: 2, value: [1, 3], "input-width": "20ch" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('wppBlur event', () => {
    it('should emit wppBlur when focus moves outside the host component', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { value: 5 }),
      });
      const wppBlurSpy = jest.fn();
      page.root?.addEventListener('wppBlur', wppBlurSpy);
      // First, simulate focus on the component
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      // Create a focusout event with relatedTarget outside the component (null = outside)
      const focusoutEvent = new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: null,
      });
      page.root?.dispatchEvent(focusoutEvent);
      await page.waitForChanges();
      expect(wppBlurSpy).toHaveBeenCalledTimes(1);
    });
    it('should emit wppBlur when focus moves to an element outside host', async () => {
      // Create a document with a slider and an external button
      const page = await newSpecPage({
        components: [WppSlider],
        html: `<wpp-slider value="5"></wpp-slider>`,
      });
      // Create an external element to simulate focus moving outside
      const externalButton = page.doc.createElement('button');
      externalButton.id = 'external-button';
      page.doc.body.appendChild(externalButton);
      const wppBlurSpy = jest.fn();
      page.root?.addEventListener('wppBlur', wppBlurSpy);
      // First, simulate focus on the component
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      // Create a focusout event with relatedTarget being an external element
      const focusoutEvent = new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: externalButton,
      });
      page.root?.dispatchEvent(focusoutEvent);
      await page.waitForChanges();
      expect(wppBlurSpy).toHaveBeenCalledTimes(1);
    });
    it('should emit wppBlur for range slider when focus leaves host', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { type: "range", value: [20, 80], "with-input": true, continuous: true }),
      });
      const wppBlurSpy = jest.fn();
      page.root?.addEventListener('wppBlur', wppBlurSpy);
      // First, simulate focus on the component
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      // Create a focusout event with relatedTarget outside the component
      const focusoutEvent = new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: null,
      });
      page.root?.dispatchEvent(focusoutEvent);
      await page.waitForChanges();
      expect(wppBlurSpy).toHaveBeenCalledTimes(1);
    });
    it('should emit wppBlur for middle-range slider when focus leaves host', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { type: "middle-range", value: 50 }),
      });
      const wppBlurSpy = jest.fn();
      page.root?.addEventListener('wppBlur', wppBlurSpy);
      // First, simulate focus on the component
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      // Create a focusout event with relatedTarget outside the component
      const focusoutEvent = new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: null,
      });
      page.root?.dispatchEvent(focusoutEvent);
      await page.waitForChanges();
      expect(wppBlurSpy).toHaveBeenCalledTimes(1);
    });
    it('should NOT emit wppBlur when focus moves between internal elements', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { value: 50, "with-input": true, continuous: true }),
      });
      const wppBlurSpy = jest.fn();
      page.root?.addEventListener('wppBlur', wppBlurSpy);
      // Create an internal element to simulate as relatedTarget (e.g., the input field)
      // We'll create a mock element and make the host.contains() return true for it
      const mockInternalElement = page.doc.createElement('input');
      // Append it to the host so contains() returns true
      page.root?.appendChild(mockInternalElement);
      // Create a focusout event where relatedTarget is an internal element
      const focusoutEvent = new FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: mockInternalElement,
      });
      page.root?.dispatchEvent(focusoutEvent);
      await page.waitForChanges();
      // wppBlur should NOT be called since focus moved within the component
      expect(wppBlurSpy).not.toHaveBeenCalled();
      // Cleanup
      page.root?.removeChild(mockInternalElement);
    });
    it('should emit wppBlur when clicking outside the component (document mousedown)', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { type: "range", value: [20, 80] }),
      });
      const wppBlurSpy = jest.fn();
      const wppFocusSpy = jest.fn();
      page.root?.addEventListener('wppBlur', wppBlurSpy);
      page.root?.addEventListener('wppFocus', wppFocusSpy);
      // First, simulate focus on the component by dispatching focusin
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      expect(wppFocusSpy).toHaveBeenCalledTimes(1);
      // Now simulate a mousedown event on the document body (outside the component)
      // The event will bubble and the handler will check if target is inside host
      const mousedownEvent = new MouseEvent('mousedown', {
        bubbles: true,
      });
      page.doc.body.dispatchEvent(mousedownEvent);
      await page.waitForChanges();
      expect(wppBlurSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('wppFocus event', () => {
    it('should emit wppFocus when host component receives focus', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { value: 5 }),
      });
      const wppFocusSpy = jest.fn();
      page.root?.addEventListener('wppFocus', wppFocusSpy);
      // Create a focusin event to simulate focus entering the component
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      expect(wppFocusSpy).toHaveBeenCalledTimes(1);
    });
    it('should emit wppFocus for range slider when host receives focus', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { type: "range", value: [20, 80] }),
      });
      const wppFocusSpy = jest.fn();
      page.root?.addEventListener('wppFocus', wppFocusSpy);
      // Create a focusin event
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      expect(wppFocusSpy).toHaveBeenCalledTimes(1);
    });
    it('should emit wppFocus for middle-range slider when host receives focus', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { type: "middle-range", value: 50 }),
      });
      const wppFocusSpy = jest.fn();
      page.root?.addEventListener('wppFocus', wppFocusSpy);
      // Create a focusin event
      const focusinEvent = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent);
      await page.waitForChanges();
      expect(wppFocusSpy).toHaveBeenCalledTimes(1);
    });
    it('should NOT emit multiple wppFocus events when focus moves within component', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v3-5-0", { value: 50, "with-input": true, continuous: true }),
      });
      const wppFocusSpy = jest.fn();
      page.root?.addEventListener('wppFocus', wppFocusSpy);
      // First focusin - should trigger wppFocus
      const focusinEvent1 = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent1);
      await page.waitForChanges();
      // Second focusin - should NOT trigger wppFocus since component is already focused
      const focusinEvent2 = new FocusEvent('focusin', {
        bubbles: true,
      });
      page.root?.dispatchEvent(focusinEvent2);
      await page.waitForChanges();
      // wppFocus should only be called once
      expect(wppFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});
