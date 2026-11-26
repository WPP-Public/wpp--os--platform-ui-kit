import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppRadioGroup } from '../wpp-radio-group';
import { WppRadio } from '../../wpp-radio/wpp-radio';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-radio-group', () => {
  let timeoutSpy;
  beforeAll(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 0;
    });
  });
  afterAll(() => {
    timeoutSpy.mockRestore();
  });
  const createRadio = (value, checked = false, disabled = false) => {
    const radio = document.createElement('wpp-radio');
    radio.value = value;
    radio.checked = checked;
    radio.disabled = disabled;
    radio.setFocus = jest.fn();
    return radio;
  };
  const setup = async (html = '') => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html,
    });
    return page;
  };
  it('renders component with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup, WppRadio, WppLabel, WppInternalLabel],
      template: () => (h("wpp-radio-group-v4-7-0", null, h("wpp-radio-v4-7-0", { name: "contact", value: "email", labelConfig: { text: 'Email' } }), h("wpp-radio-v4-7-0", { name: "contact", value: "mail", labelConfig: { text: 'Mail' } }), h("wpp-radio-v4-7-0", { name: "contact", value: "phone", labelConfig: { text: 'Phone' } }))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders correctly', async () => {
    const page = await setup(`<wpp-radio-group></wpp-radio-group>`);
    expect(page.root).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('[role="radiogroup"]')).toBeTruthy();
  });
  it('emits wppChange when radio is clicked', async () => {
    const page = await setup(`
      <wpp-radio-group>
        <wpp-radio value="one"></wpp-radio>
        <wpp-radio value="two"></wpp-radio>
      </wpp-radio-group>
    `);
    const instance = page.rootInstance;
    const spy = jest.fn();
    page.root?.addEventListener('wppChange', spy);
    const radio = page.root?.querySelector('wpp-radio');
    instance['items'] = [radio];
    page.root?.dispatchEvent(new CustomEvent('wppClickRadio', {
      detail: { value: 'one' },
      bubbles: true,
    }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { value: 'one' },
    }));
  });
  it('handles arrow navigation (ArrowRight)', async () => {
    const page = await setup(`<wpp-radio-group></wpp-radio-group>`);
    const r1 = createRadio('a', true);
    const r2 = createRadio('b');
    const r3 = createRadio('c');
    const instance = page.rootInstance;
    instance['items'] = [r1, r2, r3];
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(r2.setFocus).toHaveBeenCalled();
    expect(instance.value).toBe('b');
  });
  it('wraps focus from last to first using ArrowRight', async () => {
    const page = await setup(`<wpp-radio-group></wpp-radio-group>`);
    const r1 = createRadio('a');
    const r2 = createRadio('b', true);
    const instance = page.rootInstance;
    instance['items'] = [r1, r2];
    instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(r1.setFocus).toHaveBeenCalled();
    expect(instance.value).toBe('a');
  });
  it('emits focus and blur events', async () => {
    const page = await setup(`<wpp-radio-group></wpp-radio-group>`);
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    page.root?.addEventListener('wppFocus', focusSpy);
    page.root?.addEventListener('wppBlur', blurSpy);
    page.root?.dispatchEvent(new FocusEvent('focus'));
    page.root?.dispatchEvent(new FocusEvent('blur'));
    expect(focusSpy).toHaveBeenCalled();
    expect(blurSpy).toHaveBeenCalled();
  });
  it('ignores key events if no enabled radios exist', async () => {
    const page = await setup(`<wpp-radio-group></wpp-radio-group>`);
    const instance = page.rootInstance;
    instance['items'] = [];
    expect(() => instance['onKeyDown'](new KeyboardEvent('keydown', { key: 'ArrowRight' }))).not.toThrow();
  });
  it('renders label when labelConfig is provided', async () => {
    const page = await setup(`
      <wpp-radio-group></wpp-radio-group>
    `);
    const instance = page.rootInstance;
    instance.labelConfig = { text: 'My label' };
    await page.waitForChanges();
    const label = page.root?.shadowRoot?.querySelector('wpp-label');
    expect(label).not.toBeNull();
  });
  it('handles aria-describedby and inline message rendering', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html: `<wpp-radio-group></wpp-radio-group>`,
    });
    const instance = page.rootInstance;
    instance.message = 'Error message';
    instance.ariaProps = {
      labelledby: 'label-id',
      describedby: 'desc-id',
    };
    await page.waitForChanges();
    const container = page.root?.shadowRoot?.querySelector('.group-container');
    expect(container?.getAttribute('aria-describedby')).toBe('desc-id');
    const message = page.root?.shadowRoot?.querySelector('wpp-inline-message');
    expect(message).not.toBeNull();
  });
  it('sets radio items and syncs without fake timers', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html: `<wpp-radio-group></wpp-radio-group>`,
    });
    const instance = page.rootInstance;
    const radio = { value: 'a', checked: false, required: false, isGroupItem: false };
    jest.spyOn(instance.host, 'querySelectorAll').mockReturnValue([radio]);
    instance.value = 'a';
    instance['checkRadioElements']();
    // wait for setTimeout(0)
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(radio.checked).toBe(true);
    // The group no longer forces `required` onto its radios; it only hides their "(Optional)" marker.
    expect(radio.required).toBe(false);
    expect(radio.isGroupItem).toBe(true);
  });
  it('wraps to last when ArrowUp is pressed on first item', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html: `<wpp-radio-group></wpp-radio-group>`,
    });
    const r1 = { value: 'a', checked: true, setFocus: jest.fn() };
    const r2 = { value: 'b', checked: false, setFocus: jest.fn() };
    const instance = page.rootInstance;
    instance.items = [r1, r2];
    instance.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(r2.setFocus).toHaveBeenCalled();
  });
  it('returns early when key is not arrow key', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html: `<wpp-radio-group></wpp-radio-group>`,
    });
    const instance = page.rootInstance;
    instance.items = [{ checked: true }];
    const spy = jest.spyOn(instance, 'focusAndSelect');
    instance.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).not.toHaveBeenCalled();
  });
  it('moves to previous item when ArrowUp is pressed and not on first item', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html: `<wpp-radio-group></wpp-radio-group>`,
    });
    const r1 = { value: 'a', checked: false, setFocus: jest.fn() };
    const r2 = { value: 'b', checked: true, setFocus: jest.fn() }; // current
    const r3 = { value: 'c', checked: false, setFocus: jest.fn() };
    const instance = page.rootInstance;
    instance.items = [r1, r2, r3];
    instance.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(r1.setFocus).toHaveBeenCalled();
  });
  it('returns early when focusAndSelect is called with undefined', async () => {
    const page = await newSpecPage({
      components: [WppRadioGroup],
      html: `<wpp-radio-group></wpp-radio-group>`,
    });
    const instance = page.rootInstance;
    // Spy to ensure nothing else runs
    const spy = jest.spyOn(instance, 'syncTabIndexes');
    // Call with undefined target
    instance['focusAndSelect'](undefined);
    // Should safely return
    expect(spy).not.toHaveBeenCalled();
  });
  describe('Testing accessibility', () => {
    it('should not make every radio in the group required', async () => {
      const page = await newSpecPage({
        components: [WppRadioGroup, WppRadio],
        template: () => (h("wpp-radio-group-v4-7-0", { labelConfig: { text: 'Size' } }, h("wpp-radio-v4-7-0", { class: "wpp-radio", name: "size", value: "s", labelConfig: { text: 'Small' } }), h("wpp-radio-v4-7-0", { class: "wpp-radio", name: "size", value: "m", labelConfig: { text: 'Medium' } }))),
      });
      await page.waitForChanges();
      const inputs = Array.from(page.body.querySelectorAll('wpp-radio')).map(radio => radio.shadowRoot?.querySelector('input'));
      expect(inputs).toHaveLength(2);
      inputs.forEach(input => {
        expect(input.hasAttribute('required')).toBe(false);
        expect(input.getAttribute('aria-required')).toBe('false');
      });
    });
    it('should expose required on the radiogroup only when the group is required', async () => {
      const render = async (required) => {
        const page = await newSpecPage({
          components: [WppRadioGroup],
          template: () => h("wpp-radio-group-v4-7-0", { required: required, labelConfig: { text: 'Size' } }),
        });
        return page.root?.shadowRoot?.querySelector('[role="radiogroup"]');
      };
      expect((await render(true))?.getAttribute('aria-required')).toBe('true');
      expect((await render(false))?.hasAttribute('aria-required')).toBe(false);
    });
    it('should name the group from ariaProps.label when custom ariaProps replace the default ids', async () => {
      const page = await newSpecPage({
        components: [WppRadioGroup],
        template: () => h("wpp-radio-group-v4-7-0", { ariaProps: { label: 'Extras' } }),
      });
      const group = page.root?.shadowRoot?.querySelector('[role="radiogroup"]');
      expect(group?.getAttribute('aria-label')).toBe('Extras');
    });
    it('should keep the label and message linked when custom ariaProps omit the ids', async () => {
      const page = await newSpecPage({
        components: [WppRadioGroup],
        template: () => (h("wpp-radio-group-v4-7-0", { labelConfig: { text: 'Size' }, message: "Pick one", ariaProps: { label: 'Size' } })),
      });
      const group = page.root?.shadowRoot?.querySelector('[role="radiogroup"]');
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      const message = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(label?.id).toBeTruthy();
      expect(message?.id).toBeTruthy();
      expect(group?.getAttribute('aria-labelledby')).toBe(label?.id);
      expect(group?.getAttribute('aria-describedby')).toBe(message?.id);
    });
  });
});
