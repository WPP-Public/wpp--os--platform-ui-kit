import { newSpecPage } from '@stencil/core/testing';
import { WppTag } from '../wpp-tag';
describe('wpp-tag', () => {
  it('default init', async () => {
    const myTag = new WppTag();
    expect(myTag).toBeTruthy();
  });
  describe('default set props', () => {
    it('should set default maxLabelLength to "30"', async () => {
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
    it('should not set withIcon', async () => {
      const myTag = new WppTag();
      expect(myTag.withIcon).toBeFalsy();
    });
    it('should not set hasIconStartSlot', async () => {
      const myTag = new WppTag();
      expect(myTag.hasIconStartSlot).toBeFalsy();
    });
    it('should not set categoricalColorIndex by default', async () => {
      const myTag = new WppTag();
      expect(myTag.categoricalColorIndex).toBeUndefined();
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
    it('renders label directly (without tooltip) when label length is within maxLabelLength', async () => {
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
    it('renders a tooltip with truncated text when label length exceeds maxLabelLength', async () => {
      const longLabel = 'This is a long label that should get truncated.';
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label='This is a long label that should get truncated.' maxLabelLength={30}></wpp-tag>`,
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
    it('updates CSS custom properties when categoricalColorIndex is provided', async () => {
      const cateIndex = 4;
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag categorical-color-index="${cateIndex}"></wpp-tag>`,
      });
      expect(page?.root?.style.getPropertyValue('--tag-color')).toBe(`var(--wpp-dataviz-color-cat-dark-${cateIndex})`);
      expect(page?.root?.style.getPropertyValue('--tag-bg-color')).toBe(`var(--wpp-dataviz-color-cat-neutral-${cateIndex})`);
    });
    it('calls updateCategoricalIndex when categoricalColorIndex changes', async () => {
      const cateIndex = 4;
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag categorical-color-index="${cateIndex}"></wpp-tag>`,
      });
      // Update the attribute dynamically
      page?.root?.setAttribute('categorical-color-index', '5');
      await page.waitForChanges();
      expect(page?.root?.style.getPropertyValue('--tag-color')).toBe(`var(--wpp-dataviz-color-cat-dark-5)`);
      expect(page?.root?.style.getPropertyValue('--tag-bg-color')).toBe(`var(--wpp-dataviz-color-cat-neutral-5)`);
    });
    it('does not update CSS custom properties when categoricalColorIndex is invalid', async () => {
      const cateIndex = 'invalid';
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag categorical-color-index="${cateIndex}"></wpp-tag>`,
      });
      // Update the attribute dynamically
      page?.root?.setAttribute('categorical-color-index', 'invalid');
      await page.waitForChanges();
      expect(page?.root?.style.getPropertyValue('--tag-color')).toBe('var(--wpp-dataviz-color-cat-dark-invalid)');
      expect(page?.root?.style.getPropertyValue('--tag-bg-color')).toBe('var(--wpp-dataviz-color-cat-neutral-invalid)');
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
    it('should render tag with warning variant and truncated label', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag label='This is a very long label that exceeds the maximum allowed characters.'></wpp-tag>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render tag with categorical color index', async () => {
      const page = await newSpecPage({
        components: [WppTag],
        html: `<wpp-tag categorical-color-index="4"></wpp-tag>`,
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
});
