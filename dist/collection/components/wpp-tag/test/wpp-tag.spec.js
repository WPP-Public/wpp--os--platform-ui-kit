import { newSpecPage } from '@stencil/core/testing';
import { WppTag } from '../wpp-tag';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-tag', () => {
  it('default init', async () => {
    const myTag = new WppTag();
    expect(myTag).toBeTruthy();
  });
  describe('default set props', () => {
    it('should set default maxLabelLength to 30 (deprecated prop)', async () => {
      const myTag = new WppTag();
      expect(myTag.maxLabelLength).toBe(30);
    });
    it('should set default tooltipConfig to an empty object', async () => {
      const myTag = new WppTag();
      expect(myTag.tooltipConfig).toEqual({});
    });
    it('should set default disabled to "false"', async () => {
      const myTag = new WppTag();
      expect(myTag.disabled).toBeFalsy();
    });
    it('should not set a variant by default', async () => {
      const myTag = new WppTag();
      expect(myTag.variant).toBeUndefined();
    });
    it('should not set label by default', async () => {
      const myTag = new WppTag();
      expect(myTag.label).toBeUndefined();
    });
    it('should not set hasIconStartSlot', async () => {
      const myTag = new WppTag();
      expect(myTag.hasIconStartSlot).toBeFalsy();
    });
  });
  describe('componentWillLoad', () => {
    it('should initialize with no icon-start slot content', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag></wpp-tag>`,
      });
      expect(page.rootInstance.hasIconStartSlot).toBeFalsy();
    });
    it('should detect icon-start slot content', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag><wpp-icon-drag slot="icon-start"/></wpp-tag>`,
      });
      expect(page.rootInstance.hasIconStartSlot).toBeTruthy();
    });
    it('should update slot data when content changes dynamically', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag></wpp-tag>`,
      });
      // Initial state
      expect(page.rootInstance.hasIconStartSlot).toBeFalsy();
      // Add icon-start slot dynamically
      if (!page.root)
        return;
      page.root.innerHTML = '<wpp-icon-drag slot="icon-start"/>';
      await page.waitForChanges();
      page.rootInstance.updateSlotData();
      expect(page.rootInstance.hasIconStartSlot).toBeTruthy();
    });
  });
  describe('rendering', () => {
    it('renders label without tooltip when text does not overflow', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label="Short Label"></wpp-tag>`,
      });
      const typographyEl = page.root?.shadowRoot?.querySelector('wpp-typography');
      expect(typographyEl).not.toBeNull();
      expect(typographyEl?.textContent?.trim()).toBe('Short Label');
      const tooltipEl = page?.root?.shadowRoot?.querySelector('wpp-tooltip');
      expect(tooltipEl).toBeNull();
    });
    it('renders a tooltip with truncated text when maxLabelLength is set (deprecated)', async () => {
      const longLabel = 'This is a long label that should get truncated.';
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label='This is a long label that should get truncated.' max-label-length="30"></wpp-tag>`,
      });
      const tooltipEl = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      expect(tooltipEl).not.toBeNull();
      const tooltipTextEl = tooltipEl?.querySelector('[part="tooltip-text"]');
      const expectedTruncated = `${longLabel.substring(0, 29)}…`;
      expect(tooltipTextEl?.textContent).toBe(expectedTruncated);
    });
    it('applies the proper host classes based on variant and disabled props', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label="Neutral" disabled variant="neutral"></wpp-tag>`,
      });
      expect(page?.root?.classList.contains('wpp-tag')).toBeTruthy();
      expect(page?.root?.classList.contains('wpp-neutral')).toBeTruthy();
      expect(page?.root?.classList.contains('wpp-disabled')).toBeTruthy();
    });
  });
  describe('overflow detection', () => {
    it('should initialize isOverflowTruncated to false', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label="Short Label"></wpp-tag>`,
      });
      expect(page.rootInstance.isOverflowTruncated).toBe(false);
    });
    it('should not show tooltip when text fits within container', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label="Short"></wpp-tag>`,
      });
      // In jsdom, scrollWidth === clientWidth (no real overflow), so no tooltip
      const tooltipEl = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      expect(tooltipEl).toBeNull();
    });
    it('should show tooltip when isOverflowTruncated is true', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label="Some label text"></wpp-tag>`,
      });
      // Simulate overflow detection
      page.rootInstance.isOverflowTruncated = true;
      await page.waitForChanges();
      const tooltipEl = page.root?.shadowRoot?.querySelector('wpp-tooltip');
      expect(tooltipEl).not.toBeNull();
      expect(tooltipEl?.getAttribute('text')).toBe('Some label text');
    });
    it('should render label-text element with proper CSS classes for truncation', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label="Test Label"></wpp-tag>`,
      });
      const labelTextEl = page.root?.shadowRoot?.querySelector('.label-text');
      expect(labelTextEl).not.toBeNull();
      expect(labelTextEl?.getAttribute('part')).toBe('tooltip-text');
    });
  });
  describe('snapshots', () => {
    it('should render tag with default props', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag><wpp-tag/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render tag with neutral variant', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag variant="neutral"><wpp-tag/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render tag with long label (truncated via default maxLabelLength)', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label='This is a very long label that exceeds the maximum allowed characters.'></wpp-tag>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render disabled tag', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag disabled></wpp-tag>`,
      });
      expect(page.root).toMatchSnapshot();
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
        components: [WppTag],
        html: `<wpp-tag label='This is a very long label that exceeds the maximum allowed characters.'></wpp-tag>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label='This is a very long label that exceeds the maximum allowed characters.'></wpp-tag>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
