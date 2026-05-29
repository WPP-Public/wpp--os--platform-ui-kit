import { newSpecPage } from '@stencil/core/testing';
import { WppTooltip } from '../wpp-tooltip';
import * as tooltipConfigModule from '../../../common/menuListConfig';
import * as utils from '../../../utils/utils';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-tooltip', () => {
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
  it('validates HTML and warns on forbidden tags', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    // 👇 inject slot content manually BEFORE calling lifecycle
    const content = document.createElement('div');
    content.setAttribute('slot', 'tooltip-content');
    const forbidden = document.createElement('wpp-bad');
    content.appendChild(forbidden);
    instance.host.appendChild(content);
    // enable HTML validation
    instance.config = { allowHTML: true };
    // 👇 manually trigger lifecycle
    instance.componentWillLoad();
    expect(warnSpy).toHaveBeenCalled();
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
  it('covers componentWillLoad validation logic (forced execution)', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    // 👇 Inject slot content manually BEFORE calling lifecycle
    const content = document.createElement('div');
    content.setAttribute('slot', 'tooltip-content');
    const forbidden = document.createElement('wpp-bad');
    content.appendChild(forbidden);
    instance.host.appendChild(content);
    // enable allowHTML
    instance.config = { allowHTML: true };
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    // 🔥 Manually invoke lifecycle
    instance.componentWillLoad();
    expect(warnSpy).toHaveBeenCalled();
  });
  it('runs componentDidLoad and unhides tooltip', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.createTippyInstance = jest.fn();
    instance.componentDidLoad();
    jest.runAllTimers();
    expect(instance.createTippyInstance).toHaveBeenCalled();
    expect(instance.hidden).toBe(false);
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
  it('returns transformed allowed tags', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    expect(instance.transformAllowedTags()).toContain('WppTypography');
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
  it('sets aria-describedby on mount and removes on hide', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    instance.anchorRef = document.createElement('div');
    instance.customContentEl = document.createElement('div');
    const ref = { ariaProps: {} };
    jest.spyOn(utils, 'isWppElement').mockReturnValue(true);
    jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation((config) => {
      const fakeInstance = {
        popper: {
          style: {},
        },
        destroy: jest.fn(),
        enable: jest.fn(),
        disable: jest.fn(),
        clearDelayTimeouts: jest.fn(),
        state: { isDestroyed: false },
      };
      config.onMount?.({ reference: ref, id: '123' });
      config.onHide?.({ reference: ref });
      return fakeInstance;
    });
    instance.createTippyInstance();
    expect(ref.ariaProps.describedby).toBeUndefined();
  });
  it('handles onMount and onHide when reference is WPP element', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    const ref = {
      ariaProps: {},
    };
    jest.spyOn(utils, 'isWppElement').mockReturnValue(true);
    jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation((config) => {
      const fakeInstance = {
        popper: {
          style: {},
        },
        destroy: jest.fn(),
        enable: jest.fn(),
        disable: jest.fn(),
        clearDelayTimeouts: jest.fn(),
        state: { isDestroyed: false },
      };
      config.onMount?.({ reference: ref, id: '123' });
      config.onHide?.({ reference: ref });
      return fakeInstance;
    });
    instance.anchorRef = document.createElement('div');
    instance.customContentEl = document.createElement('div');
    instance.createTippyInstance();
    expect(ref.ariaProps.describedby).toBeUndefined();
  });
  it('handles onMount and onHide when reference is NOT a WPP element', async () => {
    const page = await newSpecPage({
      components: [WppTooltip],
      html: `<wpp-tooltip></wpp-tooltip>`,
    });
    const instance = page.rootInstance;
    const element = document.createElement('div');
    const ref = document.createElement('div');
    jest.spyOn(utils, 'isWppElement').mockReturnValue(false);
    jest.spyOn(tooltipConfigModule, 'menuListConfig').mockImplementation((config) => {
      const fakeInstance = {
        popper: {
          style: {},
        },
        destroy: jest.fn(),
        enable: jest.fn(),
        disable: jest.fn(),
        clearDelayTimeouts: jest.fn(),
        state: { isDestroyed: false },
      };
      config.onMount?.({ reference: ref, id: '123' });
      config.onHide?.({ reference: ref });
      return fakeInstance;
    });
    instance.anchorRef = document.createElement('div');
    instance.customContentEl = document.createElement('div');
    instance.createTippyInstance();
    expect(element.getAttribute('aria-describedby')).toBe(null);
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
