import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppButton } from '../wpp-button';
import { FOCUS_TYPE } from '../../../types/common';
describe('wpp-button', () => {
  it('default init', async () => {
    const myBtn = new WppButton();
    expect(myBtn).toBeTruthy();
  });
  describe('default set props', () => {
    it('should set default size to "m"', async () => {
      const myBtn = new WppButton();
      expect(myBtn.size).toBe('m');
    });
    it('should set default disabled to "false"', async () => {
      const myBtn = new WppButton();
      expect(myBtn.disabled).toBe(false);
    });
    it('should set default loading to "false"', async () => {
      const myBtn = new WppButton();
      expect(myBtn.loading).toBe(false);
    });
    it('should set default variant to "primary"', async () => {
      const myBtn = new WppButton();
      expect(myBtn.variant).toBe('primary');
    });
    it('should set default inverted to "false"', async () => {
      const myBtn = new WppButton();
      expect(myBtn.inverted).toBe(false);
    });
    it('should set default autoFocus to "false"', async () => {
      const myBtn = new WppButton();
      expect(myBtn.autoFocus).toBe(false);
    });
    it('should not set attribute name on button', async () => {
      const myBtn = new WppButton();
      expect(myBtn.name).toBeUndefined();
    });
  });
  describe('componentWillLoad', () => {
    it('should init with empty slots', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button></wpp-button>`,
      });
      expect(page.rootInstance.hasIconStartSlot).toBe(false);
      expect(page.rootInstance.hasIconEndSlot).toBe(false);
      expect(page.rootInstance.isIconOnly).toBe(false);
    });
    it('should detect start icon slot', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `
      <wpp-button>
        <span slot="icon-start">Start Icon</span>
      </wpp-button>
    `,
      });
      expect(page.rootInstance.hasIconStartSlot).toBe(true);
      expect(page.rootInstance.hasIconEndSlot).toBe(false);
      expect(page.rootInstance.isIconOnly).toBe(true);
    });
    it('should detect end icon slot', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `
      <wpp-button>
        <span slot="icon-end">End Icon</span>
      </wpp-button>
    `,
      });
      expect(page.rootInstance.hasIconStartSlot).toBe(false);
      expect(page.rootInstance.hasIconEndSlot).toBe(true);
      expect(page.rootInstance.isIconOnly).toBe(true);
    });
    it('should detect both icon slots', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `
      <wpp-button>
        <span slot="icon-start">Start Icon</span>
        <span slot="icon-end">End Icon</span>
      </wpp-button>
    `,
      });
      expect(page.rootInstance.hasIconStartSlot).toBe(true);
      expect(page.rootInstance.hasIconEndSlot).toBe(true);
      expect(page.rootInstance.isIconOnly).toBe(false);
    });
    it('should detect main content with icon', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `
      <wpp-button>
        <span slot="icon-start">Start Icon</span>
        Main Content
      </wpp-button>
    `,
      });
      expect(page.rootInstance.hasIconStartSlot).toBe(true);
      expect(page.rootInstance.isIconOnly).toBe(false);
    });
    it('should update slot data when content changes', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button></wpp-button>`,
      });
      // Initial state
      expect(page.rootInstance.hasIconStartSlot).toBe(false);
      expect(page.rootInstance.hasIconEndSlot).toBe(false);
      // Add icon-start slot dynamically
      if (!page.root)
        return;
      page.root.innerHTML = '<span slot="icon-start">Start Icon</span>';
      await page.waitForChanges();
      page.rootInstance.updateSlotData();
      expect(page.rootInstance.hasIconStartSlot).toBe(true);
      expect(page.rootInstance.isIconOnly).toBe(true);
    });
  });
  describe('eventHandlers', () => {
    describe('handleClick', () => {
      it('should emit click event', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button></wpp-button>`,
        });
        if (!page.root)
          return;
        const mockEvent = new Event('click');
        mockEvent.stopPropagation = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
      });
      it('should not emit click event when disabled', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button disabled></wpp-button>`,
        });
        if (!page.root)
          return;
        const mockEvent = new Event('click');
        mockEvent.stopPropagation = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
      });
      it('should not emit click event when loading', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button loading></wpp-button>`,
        });
        if (!page.root)
          return;
        const mockEvent = new Event('click');
        mockEvent.stopPropagation = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        expect(mockEvent.stopPropagation).toHaveBeenCalled();
      });
      it('should submit the form when type is submit', async () => {
        const form = document.createElement('form');
        const page = await newSpecPage({
          components: [WppButton],
          template: () => h("wpp-button-v3-4-0", { form: form, type: "submit" }),
        });
        const mockEvent = new Event('click');
        form.requestSubmit = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        await page.waitForChanges();
        expect(form.requestSubmit).toHaveBeenCalled();
        form.remove();
      });
      it('should reset the form when type is reset', async () => {
        const form = document.createElement('form');
        const page = await newSpecPage({
          components: [WppButton],
          template: () => h("wpp-button-v3-4-0", { form: form, type: "reset" }),
        });
        const mockEvent = new Event('click');
        form.reset = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        expect(form.reset).toHaveBeenCalled();
        form.remove();
      });
      it('should submit when form params as a string (form ID)', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          template: () => (h("form", { id: "test-form" }, h("wpp-button-v3-4-0", { form: "test-form", type: "submit" }))),
        });
        const form = page.root?.closest('form');
        const mockEvent = new Event('click');
        form.requestSubmit = jest.fn();
        Object.defineProperty(mockEvent, 'currentTarget', {
          value: page.root,
          enumerable: true,
        });
        page.rootInstance.handleClick(mockEvent);
        expect(form.requestSubmit).toHaveBeenCalled();
        form.remove();
      });
      it('should submit when form params is not defined', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          template: () => (h("form", null, h("wpp-button-v3-4-0", { type: "submit" }))),
        });
        const form = page.root?.closest('form');
        const mockEvent = new Event('click');
        form.requestSubmit = jest.fn();
        Object.defineProperty(mockEvent, 'currentTarget', {
          value: page.root,
          enumerable: true,
        });
        page.rootInstance.handleClick(mockEvent);
        expect(form.requestSubmit).toHaveBeenCalled();
      });
    });
    describe('onBlur', () => {
      it('should call onBlur when blur event is triggered', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button></wpp-button>`,
        });
        page?.root?.blur();
        await page.waitForChanges();
        expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.NONE);
      });
    });
    describe('onMouseDown', () => {
      it('should call onMouseDown when mouse down event is triggered', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button></wpp-button>`,
        });
        page?.root?.dispatchEvent(new MouseEvent('mousedown'));
        await page.waitForChanges();
        expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.MOUSE);
      });
    });
    describe('onKeyUp', () => {
      it('should call onKeyUp when key up event is triggered', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button></wpp-button>`,
        });
        page?.root?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
        await page.waitForChanges();
        expect(page.rootInstance.focusType).toBe(FOCUS_TYPE.TAB);
      });
    });
    describe('onKeyDown', () => {
      it('should call onKeyDown when `Enter` key down event is triggered', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button></wpp-button>`,
        });
        page?.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        await page.waitForChanges();
        const mockEvent = new Event('click');
        mockEvent.stopPropagation = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
      });
      it('should call onKeyDown when `Space` key down event is triggered', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button></wpp-button>`,
        });
        page?.root?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        await page.waitForChanges();
        const mockEvent = new Event('click');
        mockEvent.stopPropagation = jest.fn();
        page.rootInstance.handleClick(mockEvent);
        expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
      });
      it('should return undefined if button is disabled', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button disabled></wpp-button>`,
        });
        if (!page.root)
          throw new Error('Root not found');
        const component = page.rootInstance;
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        const result = component['onKeyDown'](event);
        expect(result).toBeUndefined();
      });
      it('should return undefined if button is loading', async () => {
        const page = await newSpecPage({
          components: [WppButton],
          html: `<wpp-button loading></wpp-button>`,
        });
        if (!page.root)
          throw new Error('Root not found');
        const component = page.rootInstance;
        const event = new KeyboardEvent('keydown', { key: 'Enter' });
        const result = component['onKeyDown'](event);
        expect(result).toBeUndefined();
      });
    });
  });
  describe('getSpinnerColor', () => {
    it('should return `var(--wpp-grey-color-000)` when variant is primary', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button variant="primary"></wpp-button>`,
      });
      expect(page.rootInstance.getSpinnerColor()).toBe('var(--wpp-grey-color-000)');
    });
    it('should return `var(--wpp-grey-color-000)` when variant is destructive', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button variant="destructive"></wpp-button>`,
      });
      expect(page.rootInstance.getSpinnerColor()).toBe('var(--wpp-grey-color-000)');
    });
    it('should return `var(--wpp-primary-color-500)` when variant is secondary', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button variant="secondary"></wpp-button>`,
      });
      expect(page.rootInstance.getSpinnerColor()).toBe('var(--wpp-primary-color-500)');
    });
    it('should return `var(--wpp-danger-color-500)` when variant is destructive-secondary', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button variant="destructive-secondary"></wpp-button>`,
      });
      expect(page.rootInstance.getSpinnerColor()).toBe('var(--wpp-danger-color-500)');
    });
    it('should return `var(--wpp-grey-color-1000)` when button inverted and variant is primary', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button variant="primary" inverted></wpp-button>`,
      });
      expect(page.rootInstance.getSpinnerColor()).toBe('var(--wpp-grey-color-1000)');
    });
    it('should return `var(--wpp-grey-color-000)` when button inverted and variant is secondary', async () => {
      const page = await newSpecPage({
        components: [WppButton],
        html: `<wpp-button variant="secondary" inverted></wpp-button>`,
      });
      expect(page.rootInstance.getSpinnerColor()).toBe('var(--wpp-grey-color-000)');
    });
  });
});
describe('wpp-button snapshots', () => {
  it('should render primary button', async () => {
    const page = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button></wpp-button>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled primary button with size m', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button size="m" disabled/>`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render primary button with loading spinner and size s', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button size="s" loading={true} />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render destructive button', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button variant="destructive" />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render disabled destructive button with size s', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button size="s" variant="destructive" disabled/>`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render destructive-secondary button with size m and loading', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button size="m" variant="destructive-secondary" loading={true} />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render secondary button', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button variant="secondary" />`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render disabled secondary button with size s', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button size="s" variant="secondary" disabled/>`,
    });
    expect(root).toMatchSnapshot();
  });
  it('should render secondary button with size m and loading', async () => {
    const { root } = await newSpecPage({
      components: [WppButton],
      html: `<wpp-button size="m" variant="secondary" loading />`,
    });
    expect(root).toMatchSnapshot();
  });
});
