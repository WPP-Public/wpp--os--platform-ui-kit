import { newSpecPage } from '@stencil/core/testing';
import { WppAvatar } from '../wpp-avatar';
import { transformToVersionedTag } from '../../../utils/utils';
const FOCUS_TYPE = {
  KEYBOARD: 'keyboard',
  TAB_FOCUS: 'tab-focus',
  FOCUS: 'focus',
  IDLE: 'idle',
};
const RAW_ICON = 'wpp-icon-test'; // passed to component
const TEST_ICON = transformToVersionedTag(RAW_ICON); // actual rendered tag
const EXPECTED_SIZES = {
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
  '2xl': 48,
  '3xl': 56,
  '4xl': 64,
};
describe('wpp-avatar', () => {
  it('should initialize with correct default values', () => {
    const a = new WppAvatar();
    // base object check
    expect(a).toBeTruthy();
    // default primitive values
    expect(a.name).toBe('');
    expect(a.size).toBe('xs');
    expect(a.variant).toBe('circle');
    expect(a.interactable).toBe(false);
    expect(a.withTooltip).toBe(false);
    expect(a.role).toBe('button');
    // nested objects
    expect(a.tooltipConfig).toBeDefined();
    expect(a.tooltipConfig.placement).toBe('bottom');
  });
  it('should set border radius based on size when variant is square', async () => {
    const expectedBorderRadiusMap = {
      xs: 'var(--wpp-border-radius-xs)',
      s: 'var(--wpp-border-radius-s)',
      m: 'var(--wpp-border-radius-m)',
      l: 'var(--wpp-border-radius-m)',
      xl: 'var(--wpp-border-radius-m)',
      '2xl': 'var(--wpp-border-radius-l)',
      '3xl': 'var(--wpp-border-radius-l)',
      '4xl': 'var(--wpp-border-radius-l)',
    };
    for (const size of Object.keys(expectedBorderRadiusMap)) {
      const page = await newSpecPage({
        components: [WppAvatar],
        html: `<wpp-avatar variant="square" size="${size}"></wpp-avatar>`,
      });
      await page.waitForChanges();
      const el = page.root;
      expect(el.style.getPropertyValue('--avatar-border-radius')).toBe(expectedBorderRadiusMap[size]);
    }
  });
  it('should set border radius to 120px when variant is circle', async () => {
    const sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'];
    for (const size of sizes) {
      const page = await newSpecPage({
        components: [WppAvatar],
        html: `<wpp-avatar variant="circle" size="${size}"></wpp-avatar>`,
      });
      await page.waitForChanges();
      const el = page.root;
      expect(el.style.getPropertyValue('--avatar-border-radius')).toBe('120px');
    }
  });
  it('should reset image failure state when src changes', () => {
    const a = new WppAvatar();
    a.isImageFailedToLoad = true;
    a.srcChange();
    expect(a.isImageFailedToLoad).toBe(false);
  });
  it('onBlur → focusType idle', () => {
    const a = new WppAvatar();
    a['onBlur']();
    expect(a.focusType).toBe(FOCUS_TYPE.IDLE);
  });
  it('onMouseDown → focusType mouse', () => {
    const a = new WppAvatar();
    a['onMouseDown']();
    expect(a.focusType).toBe(FOCUS_TYPE.FOCUS);
  });
  it('onKeyUp Tab → focusType tab-focus', () => {
    const a = new WppAvatar();
    a['onKeyUp']({ key: 'Tab' });
    expect(a.focusType).toBe(FOCUS_TYPE.TAB_FOCUS);
  });
  it('onKeyDown Enter/Space triggers click', () => {
    const a = new WppAvatar();
    const clickSpy = jest.spyOn(a, 'handleClick');
    a['onKeyDown']({ key: 'Enter', preventDefault: jest.fn() });
    a['onKeyDown']({ key: ' ', preventDefault: jest.fn() });
    expect(clickSpy).toHaveBeenCalled();
  });
  it('should show abbreviation when image fails to load', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar src="img.png" name="Akash"></wpp-avatar>`,
    });
    await page.waitForChanges();
    const img = page.root?.shadowRoot?.querySelector('img');
    // Simulate error event
    img?.dispatchEvent(new Event('error'));
    await page.waitForChanges();
    const text = page.root?.shadowRoot?.textContent || '';
    expect(text).toContain('A');
  });
  it('should show +N hidden avatars', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar amount-of-hidden-avatars="5"></wpp-avatar>`,
    });
    await page.waitForChanges();
    const txt = page.root?.shadowRoot?.textContent || '';
    expect(txt).toContain('+5');
  });
  for (const [size, expected] of Object.entries(EXPECTED_SIZES)) {
    it(`returns ${expected} for size="${size}"`, async () => {
      const page = await newSpecPage({
        components: [WppAvatar],
        html: `<wpp-avatar icon="${RAW_ICON}" size="${size}"></wpp-avatar>`,
      });
      await page.waitForChanges();
      // Find the rendered icon (shadow DOM)
      const iconEl = page.root?.shadowRoot?.querySelector(TEST_ICON) || page.root?.querySelector(TEST_ICON);
      expect(iconEl).not.toBeNull();
      expect(iconEl?.getAttribute('width')).toBe(String(expected));
      expect(iconEl?.getAttribute('height')).toBe(String(expected));
    });
  }
  it('should emit wppClick when handleClick is called and interactable is true', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar name="Akash" interactable="true"></wpp-avatar>`,
    });
    const root = page.root;
    const instance = page.rootInstance;
    // Listen for event
    const spy = jest.fn();
    root.addEventListener('wppClick', spy);
    // Invoke the method directly
    instance.handleClick(new MouseEvent('click'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  describe('wppClick event and interactable prop (WPPOPENDS-1169)', () => {
    it('should NOT emit wppClick when interactable is false (default)', async () => {
      const page = await newSpecPage({
        components: [WppAvatar],
        html: `<wpp-avatar name="Test User"></wpp-avatar>`,
      });
      const root = page.root;
      const instance = page.rootInstance;
      const spy = jest.fn();
      root.addEventListener('wppClick', spy);
      instance.handleClick(new MouseEvent('click'));
      await page.waitForChanges();
      expect(spy).not.toHaveBeenCalled();
    });
    it('should NOT emit wppClick when interactable is explicitly set to false', async () => {
      const page = await newSpecPage({
        components: [WppAvatar],
        html: `<wpp-avatar name="Test User" interactable="false"></wpp-avatar>`,
      });
      const root = page.root;
      const instance = page.rootInstance;
      const spy = jest.fn();
      root.addEventListener('wppClick', spy);
      instance.handleClick(new MouseEvent('click'));
      await page.waitForChanges();
      expect(spy).not.toHaveBeenCalled();
    });
    it('should emit wppClick when interactable is true', async () => {
      const page = await newSpecPage({
        components: [WppAvatar],
        html: `<wpp-avatar name="Test User" interactable="true"></wpp-avatar>`,
      });
      const root = page.root;
      const instance = page.rootInstance;
      const spy = jest.fn();
      root.addEventListener('wppClick', spy);
      instance.handleClick(new MouseEvent('click'));
      await page.waitForChanges();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)'></wpp-avatar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with abbreviation message when image source was not provided', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' with-tooltip name='Test Avatar'></wpp-avatar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with number of hidden avatars when number was provided', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' amount-of-hidden-avatars='4'></wpp-avatar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with image when source was provided', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' with-tooltip name='Test Avatar' size='m' src='https://mui.com/static/images/avatar/1.jpg'></wpp-avatar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with abbreviation when flag with-tooltip is disabled', async () => {
    const page = await newSpecPage({
      components: [WppAvatar],
      html: `<wpp-avatar color='var(--wpp-dataviz-color-cat-neutral-4)' name='Test Avatar'></wpp-avatar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
