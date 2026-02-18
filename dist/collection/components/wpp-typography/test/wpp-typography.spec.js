import { newSpecPage } from '@stencil/core/testing';
import { WppTypography } from '../wpp-typography';
describe('wpp-typography', () => {
  describe('Initialization', () => {
    it('should create component instance', () => {
      const component = new WppTypography();
      expect(component).toBeTruthy();
    });
    it('should have default type as m-body', () => {
      const component = new WppTypography();
      expect(component.type).toBe('m-body');
    });
    it('should have default tag as span', () => {
      const component = new WppTypography();
      expect(component.tag).toBe('span');
    });
    it('should have default color', () => {
      const component = new WppTypography();
      expect(component.color).toBe('var(--wpp-text-color)');
    });
  });
  describe('Rendering', () => {
    it('renders component', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('renders component with tag h1 and "l-heading" type', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography tag='h1' type='l-heading'>Preview Heading</wpp-typography>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography>Test Content</wpp-typography>`,
      });
      expect(page.root?.textContent).toBe('Test Content');
    });
    it('should render with span tag by default', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography>Content</wpp-typography>`,
      });
      const span = page.root?.shadowRoot?.querySelector('span');
      expect(span).toBeTruthy();
    });
    it('should render with h1 tag', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography tag="h1">Heading</wpp-typography>`,
      });
      const h1 = page.root?.shadowRoot?.querySelector('h1');
      expect(h1).toBeTruthy();
    });
    it('should render with h2 tag', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography tag="h2">Heading</wpp-typography>`,
      });
      const h2 = page.root?.shadowRoot?.querySelector('h2');
      expect(h2).toBeTruthy();
    });
    it('should render with p tag', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography tag="p">Paragraph</wpp-typography>`,
      });
      const p = page.root?.shadowRoot?.querySelector('p');
      expect(p).toBeTruthy();
    });
  });
  describe('CSS classes', () => {
    it('should have wpp-typography class on host', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      expect(page.root?.classList.contains('wpp-typography')).toBe(true);
    });
    it('should have typography class on inner element', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.typography');
      expect(innerEl).toBeTruthy();
    });
    it('should have type class for m-body', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="m-body"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.wpp-typography-m-body');
      expect(innerEl).toBeTruthy();
    });
    it('should have type class for l-strong', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="l-strong"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.wpp-typography-l-strong');
      expect(innerEl).toBeTruthy();
    });
    it('should have italic class for emphasis type', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="m-emphasis"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.italic');
      expect(innerEl).toBeTruthy();
    });
    it('should not have italic class for non-emphasis type', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="m-body"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.italic');
      expect(innerEl).toBeNull();
    });
    it('should have type-m class for m- types', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="m-body"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.type-m');
      expect(innerEl).toBeTruthy();
    });
    it('should have type-l class for l- types', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="l-strong"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.type-l');
      expect(innerEl).toBeTruthy();
    });
    it('should have type-s class for s- types', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="s-body"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.type-s');
      expect(innerEl).toBeTruthy();
    });
    it('should have type-xs class for xs- types', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="xs-body"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.type-xs');
      expect(innerEl).toBeTruthy();
    });
    it('should have type-2xl class for 2xl- types', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="2xl-heading"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.type-2xl');
      expect(innerEl).toBeTruthy();
    });
    it('should have type-3xl class for 3xl- types', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="3xl-heading"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('.type-3xl');
      expect(innerEl).toBeTruthy();
    });
  });
  describe('Color', () => {
    it('should apply color as CSS variable', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography color="var(--wpp-danger-color-500)"></wpp-typography>`,
      });
      const style = page.root?.getAttribute('style');
      expect(style).toContain('--typography-color');
    });
    it('should have default color style', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      const style = page.root?.getAttribute('style');
      expect(style).toContain('--typography-color: var(--wpp-text-color)');
    });
  });
  describe('Parts', () => {
    it('should have typography part on inner element', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('[part="typography"]');
      expect(innerEl).toBeTruthy();
    });
    it('should have inner part on slot element', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      const slot = page.root?.shadowRoot?.querySelector('slot[part="inner"]');
      expect(slot).toBeTruthy();
    });
    it('should have exportparts attribute on host', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography></wpp-typography>`,
      });
      expect(page.root?.getAttribute('exportparts')).toBe('typography, inner');
    });
  });
  describe('Type attribute reflection', () => {
    it('should reflect type attribute', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="l-strong"></wpp-typography>`,
      });
      expect(page.root?.getAttribute('type')).toBe('l-strong');
    });
  });
  describe('Typography CSS class behavior', () => {
    it('should apply correct CSS classes for m-body type', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="m-body"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('span');
      expect(innerEl?.classList.contains('typography')).toBe(true);
      expect(innerEl?.classList.contains('type-m')).toBe(true);
      expect(innerEl?.classList.contains('wpp-typography-m-body')).toBe(true);
      expect(innerEl?.classList.contains('italic')).toBe(false);
    });
    it('should apply italic class for emphasis type', async () => {
      const page = await newSpecPage({
        components: [WppTypography],
        html: `<wpp-typography type="m-emphasis"></wpp-typography>`,
      });
      const innerEl = page.root?.shadowRoot?.querySelector('span');
      expect(innerEl?.classList.contains('italic')).toBe(true);
    });
  });
});
