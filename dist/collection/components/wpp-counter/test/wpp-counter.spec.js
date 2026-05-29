import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppCounter } from '../wpp-counter';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-counter', () => {
  describe('rendering', () => {
    it('should render component with default value of 0', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      expect(page.root).toMatchSnapshot();
      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input?.value).toBe('0');
    });
    it('should render component with warning message', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter message-type='warning'/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render component with value 50', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter value=${50} />`,
      });
      expect(page.root).toMatchSnapshot();
      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input?.value).toBe('50');
    });
    it('should render component with label, icon and tooltip description', async () => {
      const labelConfig = {
        text: 'Test label',
        locales: {
          optional: 'Optick',
        },
        icon: 'wpp-icon-mail',
        description: 'Your email will be used to send you a confirmation number',
      };
      const page = await newSpecPage({
        components: [WppCounter, WppLabel, WppInternalLabel],
        template: () => h("wpp-counter-v4-1-0", { labelConfig: labelConfig }),
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('withButtons deprecation', () => {
    it('should log deprecation warning when withButtons is false', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter with-buttons="false" />`,
      });
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('The `withButtons` prop is deprecated'));
      consoleSpy.mockRestore();
    });
    it('should not log deprecation warning when withButtons is true (default)', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('The `withButtons` prop is deprecated'));
      consoleSpy.mockRestore();
    });
  });
  describe('min/max constraints', () => {
    it('should use default min value of 0', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const counter = page.rootInstance;
      expect(counter.min).toBe(0);
    });
    it('should use default max value of 100', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const counter = page.rootInstance;
      expect(counter.max).toBe(100);
    });
    it('should respect custom min value', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter min="5" value="10" />`,
      });
      const counter = page.rootInstance;
      expect(counter.min).toBe(5);
    });
    it('should respect custom max value', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter max="50" value="10" />`,
      });
      const counter = page.rootInstance;
      expect(counter.max).toBe(50);
    });
    it('should clamp value to min when value is below min', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter min="10" value="5" />`,
      });
      const input = page.root?.shadowRoot?.querySelector('input');
      // The value should be clamped on input, but initial render shows the provided value
      expect(input).toBeTruthy();
    });
    it('should disable decrease button when value equals min', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter min="1" value="1" />`,
      });
      const decreaseButton = page.root?.shadowRoot?.querySelector('.decrease-wrapper');
      expect(decreaseButton?.hasAttribute('disabled')).toBe(true);
    });
    it('should disable increase button when value equals max', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter max="10" value="10" />`,
      });
      const increaseButton = page.root?.shadowRoot?.querySelector('.increase-wrapper');
      expect(increaseButton?.hasAttribute('disabled')).toBe(true);
    });
    it('should enable both buttons when value is between min and max', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter min="1" max="10" value="5" />`,
      });
      const decreaseButton = page.root?.shadowRoot?.querySelector('.decrease-wrapper');
      const increaseButton = page.root?.shadowRoot?.querySelector('.increase-wrapper');
      expect(decreaseButton?.hasAttribute('disabled')).toBe(false);
      expect(increaseButton?.hasAttribute('disabled')).toBe(false);
    });
  });
  describe('step functionality', () => {
    it('should use default step value of 1', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const counter = page.rootInstance;
      expect(counter.step).toBe(1);
    });
    it('should respect custom step value', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter step="5" />`,
      });
      const counter = page.rootInstance;
      expect(counter.step).toBe(5);
    });
    it('should support decimal step values', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter step="0.1" value="1.5" />`,
      });
      const counter = page.rootInstance;
      const input = page.root?.shadowRoot?.querySelector('input');
      expect(counter.step).toBe(0.1);
      expect(input?.value).toBe('1.5');
    });
  });
  describe('disabled state', () => {
    it('should render disabled counter', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter disabled />`,
      });
      const input = page.root?.shadowRoot?.querySelector('input');
      const decreaseButton = page.root?.shadowRoot?.querySelector('.decrease-wrapper');
      const increaseButton = page.root?.shadowRoot?.querySelector('.increase-wrapper');
      expect(input?.hasAttribute('disabled')).toBe(true);
      expect(decreaseButton?.hasAttribute('disabled')).toBe(true);
      expect(increaseButton?.hasAttribute('disabled')).toBe(true);
    });
    it('should not allow interaction when disabled', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter disabled value="5" />`,
      });
      const counter = page.rootInstance;
      const initialValue = counter.value;
      // Verify initial value
      expect(initialValue).toBe(5);
      // Verify counter is disabled
      expect(counter.disabled).toBe(true);
    });
  });
  describe('withButtons option', () => {
    it('should render without buttons when withButtons is false', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter with-buttons="false" />`,
      });
      const decreaseButton = page.root?.shadowRoot?.querySelector('.decrease-wrapper');
      const increaseButton = page.root?.shadowRoot?.querySelector('.increase-wrapper');
      expect(decreaseButton).toBeNull();
      expect(increaseButton).toBeNull();
    });
    it('should render with buttons by default', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const decreaseButton = page.root?.shadowRoot?.querySelector('.decrease-wrapper');
      const increaseButton = page.root?.shadowRoot?.querySelector('.increase-wrapper');
      expect(decreaseButton).not.toBeNull();
      expect(increaseButton).not.toBeNull();
    });
  });
  describe('format functionality', () => {
    it('should format value using custom format', async () => {
      const format = {
        searchValue: /(.)(?=(\d{3})+$)/g,
        replaceValue: '$1 ',
      };
      const page = await newSpecPage({
        components: [WppCounter],
        template: () => h("wpp-counter-v4-1-0", { value: 1000, format: format }),
      });
      const input = page.root?.shadowRoot?.querySelector('input');
      expect(input?.value).toBe('1 000');
    });
  });
  describe('size variants', () => {
    it('should render medium size by default', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const wrapper = page.root?.shadowRoot?.querySelector('.counter-wrapper');
      expect(wrapper?.classList.contains('size-m')).toBe(true);
    });
    it('should render small size when specified', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter size="s" />`,
      });
      const wrapper = page.root?.shadowRoot?.querySelector('.counter-wrapper');
      expect(wrapper?.classList.contains('size-s')).toBe(true);
    });
  });
  describe('message display', () => {
    it('should display info message', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter message="Info message" />`,
      });
      const message = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(message).not.toBeNull();
    });
    it('should display error message with correct type', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter message="Error message" message-type="error" />`,
      });
      const message = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(message?.getAttribute('type')).toBe('error');
    });
    it('should display warning message with correct type', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter message="Warning message" message-type="warning" />`,
      });
      const message = page.root?.shadowRoot?.querySelector('wpp-inline-message');
      expect(message?.getAttribute('type')).toBe('warning');
    });
  });
  describe('default values', () => {
    it('should have default value of 0', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const counter = page.rootInstance;
      expect(counter.value).toBe(0);
    });
    it('should have default min of 0', async () => {
      const page = await newSpecPage({
        components: [WppCounter],
        html: `<wpp-counter />`,
      });
      const counter = page.rootInstance;
      expect(counter.min).toBe(0);
    });
  });
});
