import { newSpecPage } from '@stencil/core/testing';
import { WppSpinner } from '../wpp-spinner';
describe('wpp-spinner', () => {
  describe('Initialization', () => {
    it('should create component instance', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.rootInstance).toBeTruthy();
    });
    it('should have default color', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.rootInstance.color).toBe('var(--wpp-primary-color-500)');
    });
    it('should have default size as s', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.rootInstance.size).toBe('s');
    });
    it('should have undefined ariaProps by default', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.rootInstance.ariaProps).toBeUndefined();
    });
  });
  describe('Rendering', () => {
    it('should render loading spinner', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render loading spinner with prop color and size m', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner color="var(--wpp-danger-color-300)" size="m"/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render svg element', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const svg = page.root?.shadowRoot?.querySelector('svg');
      expect(svg).toBeTruthy();
    });
    it('should render circle element inside svg', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle).toBeTruthy();
    });
  });
  describe('CSS classes', () => {
    it('should have wpp-spinner class on host', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.root?.classList.contains('wpp-spinner')).toBe(true);
    });
    it('should have wpp-size-s class by default', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.root?.classList.contains('wpp-size-s')).toBe(true);
    });
    it('should have wpp-size-m class when size is m', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="m"/>`,
      });
      expect(page.root?.classList.contains('wpp-size-m')).toBe(true);
    });
    it('should have wpp-size-l class when size is l', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="l"/>`,
      });
      expect(page.root?.classList.contains('wpp-size-l')).toBe(true);
    });
    it('should have spinner class on svg', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const svg = page.root?.shadowRoot?.querySelector('.spinner');
      expect(svg).toBeTruthy();
    });
    it('should have size class on svg', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="m"/>`,
      });
      const svg = page.root?.shadowRoot?.querySelector('.size-m');
      expect(svg).toBeTruthy();
    });
  });
  describe('SVG attributes', () => {
    it('should have correct cx and cy for size s', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="s"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('cx')).toBe('7');
      expect(circle?.getAttribute('cy')).toBe('7');
    });
    it('should have correct cx and cy for size m', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="m"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('cx')).toBe('16');
      expect(circle?.getAttribute('cy')).toBe('16');
    });
    it('should have correct cx and cy for size l', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="l"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('cx')).toBe('32');
      expect(circle?.getAttribute('cy')).toBe('32');
    });
    it('should have correct radius for size s', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="s"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('r')).toBe('6');
    });
    it('should have correct radius for size m', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="m"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('r')).toBe('14');
    });
    it('should have correct radius for size l', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="l"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('r')).toBe('29');
    });
    it('should have stroke color from prop', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner color="red"/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('stroke')).toBe('red');
    });
    it('should have transparent fill', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('fill')).toBe('transparent');
    });
    it('should have stroke-linecap round', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const circle = page.root?.shadowRoot?.querySelector('circle');
      expect(circle?.getAttribute('stroke-linecap')).toBe('round');
    });
  });
  describe('Accessibility', () => {
    it('should have aria-hidden true when no ariaProps label', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.root?.getAttribute('aria-hidden')).toBe('true');
    });
    it('should have role status when ariaProps label is provided', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      page.rootInstance.ariaProps = { label: 'Loading' };
      await page.waitForChanges();
      expect(page.root?.getAttribute('role')).toBe('status');
    });
    it('should have aria-live polite when announced', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      page.rootInstance.ariaProps = { label: 'Loading' };
      await page.waitForChanges();
      expect(page.root?.getAttribute('aria-live')).toBe('polite');
    });
    it('should have aria-label when announced', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      page.rootInstance.ariaProps = { label: 'Loading content' };
      await page.waitForChanges();
      expect(page.root?.getAttribute('aria-label')).toBe('Loading content');
    });
    it('svg should have aria-hidden true', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const svg = page.root?.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
    it('svg should have focusable false', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      const svg = page.root?.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('focusable')).toBe('false');
    });
  });
  describe('CSS class behavior', () => {
    it('should apply correct host CSS classes for default size', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner/>`,
      });
      expect(page.root?.classList.contains('wpp-spinner')).toBe(true);
      expect(page.root?.classList.contains('wpp-size-s')).toBe(true);
    });
    it('should apply correct spinner CSS classes on svg', async () => {
      const page = await newSpecPage({
        components: [WppSpinner],
        html: `<wpp-spinner size="m"/>`,
      });
      const svg = page.root?.shadowRoot?.querySelector('svg');
      expect(svg?.classList.contains('spinner')).toBe(true);
      expect(svg?.classList.contains('size-m')).toBe(true);
    });
  });
});
