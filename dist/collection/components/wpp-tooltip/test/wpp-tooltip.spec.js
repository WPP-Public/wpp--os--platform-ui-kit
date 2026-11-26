import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTooltip } from '../wpp-tooltip';
import { WppTooltip as WppInternalTooltip } from '../components/wpp-internal-tooltip/wpp-internal-tooltip';
import * as tooltipConfigModule from '../../../common/menuListConfig';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import * as dialogFocus from '../../../utils/dialog-focus';
const createTooltipInstance = (reference = document.createElement('button'), id = 1) => ({
  clearDelayTimeouts: jest.fn(),
  destroy: jest.fn(),
  disable: jest.fn(),
  enable: jest.fn(),
  hide: jest.fn(),
  hideWithInteractivity: jest.fn(),
  id,
  plugins: [],
  popper: document.createElement('div'),
  popperInstance: null,
  props: { ...jest.requireActual('tippy.js').default.defaultProps },
  reference,
  setContent: jest.fn(),
  setProps: jest.fn(),
  show: jest.fn(),
  state: { isEnabled: true, isVisible: false, isDestroyed: false, isMounted: false, isShown: false },
  unmount: jest.fn(),
});
describe('wpp-tooltip', () => {
  it('does not nest a second tooltip role inside the tippy box for standard content', async () => {
    const page = await newSpecPage({
      components: [WppTooltip, WppInternalTooltip],
      html: `<wpp-tooltip text="Tooltip"></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    // tippy already sets role="tooltip" on .tippy-box, which wraps this content
    expect(page.root?.shadowRoot?.querySelector('wpp-internal-tooltip')?.hasAttribute('role')).toBe(false);
  });
  it('does not nest a second tooltip role inside the tippy box for custom content', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    page.rootInstance.config = { allowHTML: true };
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.tooltip-custom-content')?.hasAttribute('role')).toBe(false);
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
  });
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with text and value', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text='Tooltip' value='100'></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with error state', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text='Tooltip' error></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render component with right placement', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text='Tooltip' error placement='right'></wpp-tooltip>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it.each([false, true])('keeps content hidden until instance creation with allowHTML=%s', async (allowHTML) => {
    const factory = tooltipConfigModule.menuListConfig;
    let hiddenDuringCreation;
    const createTooltip = jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation(options => {
      hiddenDuringCreation = page.rootInstance.hidden;
      return Object.assign(factory(options), { destroy: jest.fn() });
    });
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text="Tooltip"><button>Anchor</button></wpp-tooltip>`,
    });
    try {
      if (!page.root) {
        throw new Error('Expected tooltip host');
      }
      page.root.config = { allowHTML };
      await page.waitForChanges();
      expect(page.rootInstance.hidden).toBe(true);
      expect(page.root.shadowRoot?.querySelector('.content-wrapper')?.classList.contains('hidden')).toBe(true);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(createTooltip).toHaveBeenCalledTimes(1);
      expect(hiddenDuringCreation).toBe(true);
      expect(page.rootInstance.hidden).toBe(false);
      expect(page.root.shadowRoot?.querySelector('.content-wrapper')?.classList.contains('hidden')).toBe(false);
      page.rootInstance.disconnectedCallback();
    }
    finally {
      createTooltip.mockRestore();
    }
  });
  it('uses the disabled prop for initial rendering and skips tooltip creation', async () => {
    const createTooltip = jest.spyOn(tooltipConfigModule, 'menuListConfig');
    try {
      const page = await newSpecPage({
        components: [WppTooltip],
        html: `<wpp-tooltip disabled><button>Anchor</button></wpp-tooltip>`,
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(page.root?.shadowRoot?.querySelector('.content-wrapper')?.classList.contains('hidden')).toBe(true);
      expect(createTooltip).not.toHaveBeenCalled();
    }
    finally {
      createTooltip.mockRestore();
    }
  });
  it('cancels pending creation on disconnect and recreates once on reconnect', async () => {
    const tooltipInstance = createTooltipInstance();
    const createTooltip = jest.spyOn(tooltipConfigModule, 'menuListConfig').mockReturnValue(tooltipInstance);
    try {
      const page = await newSpecPage({
        components: [WppTooltip],
        html: `<wpp-tooltip><button>Anchor</button></wpp-tooltip>`,
      });
      page.rootInstance.disconnectedCallback();
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(createTooltip).not.toHaveBeenCalled();
      page.rootInstance.connectedCallback();
      expect(createTooltip).toHaveBeenCalledTimes(1);
      page.rootInstance.connectedCallback();
      expect(createTooltip).toHaveBeenCalledTimes(1);
      page.rootInstance.disconnectedCallback();
    }
    finally {
      createTooltip.mockRestore();
    }
  });
  it('reads custom HTML content as plain text', async () => {
    const configSpy = jest
      .spyOn(tooltipConfigModule, 'menuListConfig')
      .mockImplementation(() => ({ destroy: jest.fn(), setProps: jest.fn(), state: { isDestroyed: false } }));
    const page = await newSpecPage({
      components: [WppTooltip],
      template: () => (h("wpp-tooltip-v4-7-0", { config: { allowHTML: true } }, h("button", null, "Plan"), h("div", { slot: "tooltip-content" }, h("strong", null, "Bold"), " and ", h("em", null, "more")))),
    });
    // The instance is created on the next task, after the custom content has moved into the tooltip
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(page.body.querySelector('button')?.getAttribute('aria-description')).toBe('Bold and more');
    configSpy.mockRestore();
  });
});
describe('wpp-tooltip full coverage', () => {
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
  it('updates config when changed', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.tippyInstance = { setProps: jest.fn() };
    instance.updateConfig({ placement: 'bottom' }, {});
    expect(instance.tippyInstance.setProps).toHaveBeenCalled();
  });
  it('updates arrow when theme/error/warning changes', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.tippyInstance = {
      setProps: jest.fn(),
      popperInstance: { update: jest.fn() },
    };
    instance.updateTheme();
    expect(instance.tippyInstance.setProps).toHaveBeenCalled();
    expect(instance.tippyInstance.popperInstance.update).toHaveBeenCalled();
  });
  it('updates text and triggers reposition', async () => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip text="old"></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.contentEl = { text: '' };
    instance.tippyInstance = {
      setProps: jest.fn(),
      popperInstance: { update: jest.fn() },
    };
    instance.textChanged('new', 'old');
    expect(instance.contentEl.text).toBe('new');
  });
  it('destroys tooltip when disabled', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    const destroy = jest.fn();
    instance.tippyInstance = { destroy };
    instance.handleDisabledChange(true);
    expect(destroy).toHaveBeenCalled();
    expect(instance.tippyInstance).toBeUndefined();
  });
  it('recreates tooltip when enabled', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.createTippyInstance = jest.fn();
    instance.handleDisabledChange(false);
    expect(instance.createTippyInstance).toHaveBeenCalled();
  });
  it('sets anchorRef on slot change', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip><div>Anchor</div></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    const fakeSlot = {
      assignedElements: jest.fn().mockReturnValue([document.createElement('div')]),
    };
    instance.slotRef = fakeSlot;
    instance['handleSlotChange']();
    expect(instance.anchorRef).toBeDefined();
  });
  it('runs componentDidLoad and keeps content hidden when no instance is created', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.createTippyInstance = jest.fn();
    instance.componentDidLoad();
    jest.runAllTimers();
    expect(instance.createTippyInstance).toHaveBeenCalled();
    expect(instance.hidden).toBe(true);
  });
  it('recreates tooltip on connectedCallback if destroyed', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.tippyInstance = {
      setProps: jest.fn(),
      state: { isDestroyed: true },
    };
    instance.createTippyInstance = jest.fn();
    instance.connectedCallback();
    expect(instance.createTippyInstance).toHaveBeenCalled();
  });
  it('handles onShow with fixed width', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.anchorRef = document.createElement('div');
    instance.customContentEl = document.createElement('div');
    instance.dropdownWidth = '200px';
    const popper = { style: {} };
    jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation(((config) => {
      config.onShow?.({ popper });
      return { popper };
    }));
    instance.createTippyInstance();
    expect(popper.style.width).toBe('200px');
    expect(popper.style.maxWidth).toBe('200px');
  });
  it('handles onShow with auto width', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.anchorRef = document.createElement('div');
    instance.customContentEl = document.createElement('div');
    instance.dropdownWidth = 'auto';
    const popper = { style: {} };
    jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation(((config) => {
      config.onShow?.({ popper });
      return { popper };
    }));
    instance.createTippyInstance();
    expect(popper.style.maxWidth).toBe('350px');
  });
  describe('describing the trigger', () => {
    let configSpy;
    // Renders a tooltip around `trigger` with tippy stubbed, so only the component's own wiring is under test
    const renderTooltip = async (attrs, trigger) => {
      configSpy = jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation(() => ({
        destroy: jest.fn(),
        setProps: jest.fn(),
        state: { isDestroyed: false },
      }));
      const page = await newSpecPage({
        components: [WppTooltip, WppInternalTooltip],
        html: `<wpp-tooltip ${attrs}>${trigger}</wpp-tooltip>`,
      });
      await page.waitForChanges();
      return page;
    };
    afterEach(() => {
      configSpy.mockRestore();
    });
    it('gives a plain trigger the tooltip text as its description before the tooltip is shown', async () => {
      const page = await renderTooltip('header="Price" text="Monthly total" value="$100"', '<button>Plan</button>');
      const trigger = page.body.querySelector('button');
      expect(trigger?.getAttribute('aria-description')).toBe('Price Monthly total $100');
      expect(trigger?.hasAttribute('aria-describedby')).toBe(false);
    });
    it('passes the description to a wpp trigger through ariaProps, keeping its other aria props', async () => {
      const page = await renderTooltip('text="Deletes the file"', '<wpp-button-v4-7-0></wpp-button-v4-7-0>');
      const trigger = page.body.querySelector('wpp-button-v4-7-0');
      trigger.ariaProps = { label: 'Delete' };
      page.rootInstance.updateAnchorDescription();
      expect(trigger.ariaProps).toEqual({ label: 'Delete', description: 'Deletes the file' });
      expect(trigger.hasAttribute('aria-describedby')).toBe(false);
    });
    it('follows a text change', async () => {
      const page = await renderTooltip('text="Before"', '<button>Plan</button>');
      page.root?.setAttribute('text', 'After');
      await page.waitForChanges();
      expect(page.body.querySelector('button')?.getAttribute('aria-description')).toBe('After');
    });
    it('removes the description when the tooltip is disabled', async () => {
      const page = await renderTooltip('text="Hint"', '<button>Plan</button>');
      page.root?.setAttribute('disabled', '');
      await page.waitForChanges();
      expect(page.body.querySelector('button')?.hasAttribute('aria-description')).toBe(false);
    });
  });
  it('calls config.onShow when provided', async () => {
    const onShow = jest.fn();
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.anchorRef = document.createElement('div');
    instance.customContentEl = document.createElement('div');
    instance.config = { onShow };
    jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation((config) => {
      config.onShow?.({
        popper: {
          style: {},
        },
      });
      return {};
    });
    instance.createTippyInstance();
    expect(onShow).toHaveBeenCalled();
  });
  describe('showing tooltip on focus', () => {
    // Shows a tooltip whose anchor has the given focus and hover states, with the deepest focused element's
    // `:focus-visible` state
    const showWith = async ({ focused = false, hovered = false, focusVisible = false }) => {
      const page = await newSpecPage({
        components: [WppTooltip],
        html: `<wpp-tooltip></wpp-tooltip>`,
      });
      const instance = page.rootInstance;
      const reference = {
        matches: jest.fn((selector) => ({ ':focus-within': focused, ':hover': hovered })[selector] ?? false),
      };
      const onShow = jest.fn();
      let result;
      const activeElementSpy = jest
        .spyOn(dialogFocus, 'getDeepActiveElement')
        .mockReturnValue({ matches: (selector) => selector === ':focus-visible' && focusVisible });
      const menuListConfigSpy = jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation((config) => {
        result = config.onShow?.({ reference, popper: { style: {} } });
        return {};
      });
      instance.anchorRef = document.createElement('div');
      instance.customContentEl = document.createElement('div');
      instance.config = { onShow };
      instance.createTippyInstance();
      // Restoring every mock would also restore the earlier tests' spies, while their tooltips' timers are pending
      activeElementSpy.mockRestore();
      menuListConfigSpy.mockRestore();
      return { result, onShow };
    };
    it('should not show when the anchor got the focus from the pointer', async () => {
      const { result, onShow } = await showWith({ focused: true });
      expect(result).toBe(false);
      expect(onShow).not.toHaveBeenCalled();
    });
    it('should show when the anchor got the focus from the keyboard', async () => {
      const { result, onShow } = await showWith({ focused: true, focusVisible: true });
      expect(result).not.toBe(false);
      expect(onShow).toHaveBeenCalled();
    });
    it('should show when the focused anchor is hovered', async () => {
      const { result } = await showWith({ focused: true, hovered: true });
      expect(result).not.toBe(false);
    });
    it('should show when the anchor is hovered without the focus', async () => {
      const { result } = await showWith({ hovered: true });
      expect(result).not.toBe(false);
    });
  });
  it('covers getArrowBgColor logic', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.error = true;
    expect(instance.getArrowBgColor()).toBeDefined();
    instance.error = false;
    instance.warning = true;
    expect(instance.getArrowBgColor()).toBeDefined();
    instance.warning = false;
    instance.theme = 'dark';
    expect(instance.getArrowBgColor()).toBeDefined();
  });
  it('adds tabindex when anchorTabIndex is provided', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip anchor-tab-index="1"></wpp-tooltip>`,
    });
    const anchor = page.root?.shadowRoot?.querySelector('.anchor');
    expect(anchor?.getAttribute('tabindex')).toBe('1');
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
        components: [WppTooltip],
        html: `<wpp-tooltip></wpp-tooltip>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(2);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppTooltip],
        html: `<wpp-tooltip></wpp-tooltip>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
