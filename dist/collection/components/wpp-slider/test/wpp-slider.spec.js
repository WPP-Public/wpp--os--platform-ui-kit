import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSlider } from '../wpp-slider';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-slider', () => {
  it('should render slider component', async () => {
    const value = 1;
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v4-7-0", { value: value }),
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
      template: () => h("wpp-slider-v4-7-0", { value: 2, marks: marks, max: 3 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with value 4-75', async () => {
    const value = [4, 75];
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v4-7-0", { type: "range", value: value }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with displayed value', async () => {
    const value = [1, 3];
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v4-7-0", { type: "range", max: 5, step: 2, value: value, "with-value": true }),
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
      template: () => h("wpp-slider-v4-7-0", { type: "range", max: 5, step: 2, value: value, labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with input width in px', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v4-7-0", { type: "range", max: 5, step: 2, value: [1, 3], "input-width": "200px" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render range slider with input width in ch', async () => {
    const page = await newSpecPage({
      components: [WppSlider],
      template: () => h("wpp-slider-v4-7-0", { type: "range", max: 5, step: 2, value: [1, 3], "input-width": "20ch" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('wppBlur event', () => {
    it('should emit wppBlur when focus moves outside the host component', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v4-7-0", { value: 5 }),
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
        template: () => h("wpp-slider-v4-7-0", { type: "range", value: [20, 80], "with-input": true, continuous: true }),
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
        template: () => h("wpp-slider-v4-7-0", { type: "middle-range", value: 50 }),
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
        template: () => h("wpp-slider-v4-7-0", { value: 50, "with-input": true, continuous: true }),
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
        template: () => h("wpp-slider-v4-7-0", { type: "range", value: [20, 80] }),
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
        template: () => h("wpp-slider-v4-7-0", { value: 5 }),
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
        template: () => h("wpp-slider-v4-7-0", { type: "range", value: [20, 80] }),
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
        template: () => h("wpp-slider-v4-7-0", { type: "middle-range", value: 50 }),
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
        template: () => h("wpp-slider-v4-7-0", { value: 50, "with-input": true, continuous: true }),
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
  describe('Testing accessibility', () => {
    const mk = (template) => newSpecPage({ components: [WppSlider, WppLabel, WppInternalLabel], template });
    const thumbs = (page) => ({
      min: page.root?.shadowRoot?.querySelector('[part="input-slider-min"]'),
      max: page.root?.shadowRoot?.querySelector('[part="input-slider-max"]'),
    });
    describe('accessible name', () => {
      it('names the single thumb from the visible label, which cannot reach it via for/id', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { value: 2, labelConfig: { text: 'Volume' } }));
        expect(thumbs(page).max?.getAttribute('aria-label')).toBe('Volume');
      });
      it('gives the two range thumbs distinct names so they are tellable apart', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Price' } }));
        const { min, max } = thumbs(page);
        expect(min?.getAttribute('aria-label')).toBe('Price, minimum');
        expect(max?.getAttribute('aria-label')).toBe('Price, maximum');
        expect(min?.getAttribute('aria-label')).not.toBe(max?.getAttribute('aria-label'));
      });
      it('does not qualify the middle-range thumb, which is the only one', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { type: "middle-range", value: 2, labelConfig: { text: 'Offset' } }));
        expect(thumbs(page).max?.getAttribute('aria-label')).toBe('Offset');
        expect(thumbs(page).min).toBeNull();
      });
      it('lets ariaProps.min and ariaProps.max override the derived names', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Price' }, ariaProps: { min: { label: 'Lowest price' }, max: { label: 'Highest price' } } })));
        const { min, max } = thumbs(page);
        expect(min?.getAttribute('aria-label')).toBe('Lowest price');
        expect(max?.getAttribute('aria-label')).toBe('Highest price');
      });
      it('keeps the released flat ariaProps.label working, and now distinguishes the thumbs', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Ignored' }, ariaProps: { label: 'Price' } })));
        const { min, max } = thumbs(page);
        expect(min?.getAttribute('aria-label')).toBe('Price, minimum');
        expect(max?.getAttribute('aria-label')).toBe('Price, maximum');
        expect(min?.getAttribute('aria-label')).not.toBe(max?.getAttribute('aria-label'));
      });
      it.each(['single', 'range', 'middle-range'])('omits aria-label entirely on a %s slider with nothing to name it with', async (type) => {
        const value = type === 'range' ? [2, 5] : 2;
        const page = await mk(() => h("wpp-slider-v4-7-0", { type: type, value: value }));
        for (const thumb of Array.from(page.root?.shadowRoot?.querySelectorAll('input[type="range"]') ?? [])) {
          // Not '' and emphatically not a template built from an undefined label — 'undefined, minimum'
          // reads as a real name to both assistive tech and axe, which would hide the defect.
          expect(thumb.hasAttribute('aria-label')).toBe(false);
          // aria-valuetext names the VALUE, not the control, so it is unrelated to labelling and
          // is asserted positively rather than skipped: a middle-range slider still has a band to
          // announce, and suppressing it would leave a screen reader saying only '2'. The other
          // two types have no marks here, so they have nothing to announce.
          if (type === 'middle-range') {
            // default min 1 / max 100 => centre 51
            expect(thumb.getAttribute('aria-valuetext')).toBe('2 to 51');
          }
          else {
            expect(thumb.hasAttribute('aria-valuetext')).toBe(false);
          }
        }
      });
    });
    describe('aria-labelledby', () => {
      // The ids live outside the slider's shadow root, where an IDREF on the thumb cannot reach them.
      const sliderThumbs = (page) => {
        const root = page.body.querySelector('wpp-slider')?.shadowRoot;
        return {
          min: root?.querySelector('[part="input-slider-min"]'),
          max: root?.querySelector('[part="input-slider-max"]'),
        };
      };
      it('names each range thumb from the text of its labelledby element', async () => {
        const page = await mk(() => (h("div", null, h("span", { id: "from-el" }, "From"), h("span", { id: "to-el" }, "To"), h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], ariaProps: { min: { labelledby: 'from-el', label: 'Ignored' }, max: { labelledby: 'to-el' } } }))));
        const { min, max } = sliderThumbs(page);
        expect(min?.getAttribute('aria-label')).toBe('From');
        expect(max?.getAttribute('aria-label')).toBe('To');
        expect(min?.hasAttribute('aria-labelledby')).toBe(false);
        expect(max?.hasAttribute('aria-labelledby')).toBe(false);
      });
      it('names a single-thumb slider from the flat labelledby', async () => {
        const page = await mk(() => (h("div", null, h("span", { id: "heading" }, "Heading name"), h("wpp-slider-v4-7-0", { value: 2, labelConfig: { text: 'Volume' }, ariaProps: { labelledby: 'heading' } }))));
        expect(sliderThumbs(page).max?.getAttribute('aria-label')).toBe('Heading name');
      });
      it('does not give both range thumbs the flat labelledby name', async () => {
        const page = await mk(() => (h("div", null, h("span", { id: "shared" }, "Shared"), h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Price' }, ariaProps: { labelledby: 'shared' } }))));
        const { min, max } = sliderThumbs(page);
        expect(min?.getAttribute('aria-label')).toBe('Price, minimum');
        expect(max?.getAttribute('aria-label')).toBe('Price, maximum');
      });
      it('falls back to the default name when the labelledby id does not exist', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { value: 2, labelConfig: { text: 'Volume' }, ariaProps: { labelledby: 'missing' } })));
        expect(thumbs(page).max?.getAttribute('aria-label')).toBe('Volume');
      });
    });
    describe('flat ariaProps.label on single-thumb types', () => {
      it.each(['single', 'middle-range'])('names a %s slider and needs no qualifier', async (type) => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: type, value: 2, labelConfig: { text: 'Ignored' }, ariaProps: { label: 'Volume' } })));
        expect(thumbs(page).max?.getAttribute('aria-label')).toBe('Volume');
      });
    });
    describe('withInput numeric fields', () => {
      it('names the two numeric fields of a range slider distinctly', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Price' }, withInput: true, continuous: true })));
        const inputs = Array.from(page.root?.shadowRoot?.querySelectorAll('wpp-input') ?? []);
        const names = inputs.map(i => i.ariaProps?.label);
        expect(names).toContain('Price, minimum');
        expect(names).toContain('Price, maximum');
      });
      it('names the single numeric field from the label', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { value: 2, labelConfig: { text: 'Volume' }, withInput: true, continuous: true }));
        const input = page.root?.shadowRoot?.querySelector('wpp-input');
        expect(input?.ariaProps?.label).toBe('Volume');
      });
    });
    describe('aria-valuetext', () => {
      const marks = [
        { label: 'low', value: 1 },
        { label: 'medium', value: 2 },
        { label: 'rare', value: 3 },
      ];
      it('announces the mark label instead of the bare number', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { value: 2, marks: marks, labelConfig: { text: 'Rarity' } }));
        expect(thumbs(page).max?.getAttribute('aria-valuetext')).toBe('medium');
      });
      it('clears itself when the value leaves a marked point, rather than going stale', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { value: 2, marks: marks, labelConfig: { text: 'Rarity' } }));
        page.root.value = 5;
        await page.waitForChanges();
        expect(thumbs(page).max?.hasAttribute('aria-valuetext')).toBe(false);
      });
      it('stays absent when a mark label only repeats the number it sits on', async () => {
        const numeric = [
          { label: '1', value: 1 },
          { label: '2', value: 2 },
        ];
        const page = await mk(() => h("wpp-slider-v4-7-0", { value: 2, marks: numeric, labelConfig: { text: 'Rarity' } }));
        expect(thumbs(page).max?.hasAttribute('aria-valuetext')).toBe(false);
      });
      it('gives each range thumb the mark label at its own end', async () => {
        const marksAtEnds = [
          { label: 'low', value: 2 },
          { label: 'high', value: 5 },
        ];
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], marks: marksAtEnds, labelConfig: { text: 'Rarity' } })));
        const { min, max } = thumbs(page);
        expect(min?.getAttribute('aria-valuetext')).toBe('low');
        expect(max?.getAttribute('aria-valuetext')).toBe('high');
      });
      it('announces both ends of a middle-range band, lower end first', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "middle-range", min: 0, max: 10, value: 8, labelConfig: { text: 'Offset' } })));
        expect(thumbs(page).max?.getAttribute('aria-valuetext')).toBe('5 to 8');
      });
      it('keeps the real value when a mark label is the number without its sign', async () => {
        // MIDDLE_RANGE_MARKS_NUMBERS labels the value -5 as '5'. That is not character-identical to
        // its value, but it is still just the number, and substituting it announced a band of
        // -5..0 as "5 to 0" while the value wrapper rendered "-5" and "0".
        const signedMarks = [
          { label: '5', value: -5 },
          { label: '0', value: 0 },
          { label: '5', value: 5 },
        ];
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "middle-range", min: -5, max: 5, value: -5, marks: signedMarks, labelConfig: { text: 'Offset' } })));
        expect(thumbs(page).max?.getAttribute('aria-valuetext')).toBe('-5 to 0');
      });
      it('still prefers a worded mark label over the number', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "middle-range", min: -5, max: 5, value: -5, marks: [{ label: 'Lowest', value: -5 }], labelConfig: { text: 'Offset' } })));
        expect(thumbs(page).max?.getAttribute('aria-valuetext')).toBe('Lowest to 0');
      });
      it('announces a single value when the middle-range thumb sits on the centre', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "middle-range", min: 0, max: 10, value: 5, labelConfig: { text: 'Offset' } })));
        expect(thumbs(page).max?.getAttribute('aria-valuetext')).toBe('5');
      });
    });
    describe('locales', () => {
      it('uses the overridden qualifiers for the range thumbs', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Prix' }, locales: { minimum: 'borne basse', maximum: 'borne haute' } })));
        const { min, max } = thumbs(page);
        // Deliberately NOT the default strings: overriding 'minimum' with 'minimum' would leave this
        // green even if the locales prop were ignored entirely.
        expect(min?.getAttribute('aria-label')).toBe('Prix, borne basse');
        expect(max?.getAttribute('aria-label')).toBe('Prix, borne haute');
      });
      it('uses the overridden band template for middle-range', async () => {
        const page = await mk(() => (h("wpp-slider-v4-7-0", { type: "middle-range", min: 0, max: 10, value: 8, labelConfig: { text: 'Offset' }, locales: { valueRange: 'de {from} a {to}' } })));
        expect(thumbs(page).max?.getAttribute('aria-valuetext')).toBe('de 5 a 8');
      });
    });
    describe('disabled', () => {
      it('is still named and is excluded from the tab order by being disabled', async () => {
        const page = await mk(() => h("wpp-slider-v4-7-0", { type: "range", value: [2, 5], labelConfig: { text: 'Price' }, disabled: true }));
        const { min, max } = thumbs(page);
        expect(min?.getAttribute('aria-label')).toBe('Price, minimum');
        expect(max?.getAttribute('aria-label')).toBe('Price, maximum');
        expect(min?.hasAttribute('disabled')).toBe(true);
        expect(max?.hasAttribute('disabled')).toBe(true);
      });
    });
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
        components: [WppSlider],
        template: () => h("wpp-slider-v4-7-0", { type: "middle-range", value: 50 }),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppSlider],
        template: () => h("wpp-slider-v4-7-0", { type: "middle-range", value: 50 }),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
