import { newSpecPage } from '@stencil/core/testing';
import { WppDivider } from '../wpp-divider';
describe('wpp-divider', () => {
  describe('Initialization', () => {
    it('should create component instance', () => {
      const component = new WppDivider();
      expect(component).toBeTruthy();
    });
    it('should have default vertical as false', () => {
      const component = new WppDivider();
      expect(component.vertical).toBe(false);
    });
    it('should have default resizable as false', () => {
      const component = new WppDivider();
      expect(component.resizable).toBe(false);
    });
  });
  describe('Rendering', () => {
    it('should render divider with width 300px', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider style="--wpp-divider-width: 300px"></wpp-divider>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render vertical divider with height 300px', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider vertical style="--wpp-divider-height: 300px"></wpp-divider>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should render resizable divider with correct class', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider resizable></wpp-divider>`,
      });
      const innerDiv = page.root?.shadowRoot?.querySelector('.resizable');
      expect(innerDiv).toBeTruthy();
    });
  });
  describe('Accessibility', () => {
    it('should have role separator', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider></wpp-divider>`,
      });
      expect(page.root?.getAttribute('role')).toBe('separator');
    });
    it('should have aria-orientation horizontal for horizontal divider', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider></wpp-divider>`,
      });
      expect(page.root?.getAttribute('aria-orientation')).toBe('horizontal');
    });
    it('should have aria-orientation vertical for vertical divider', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider vertical></wpp-divider>`,
      });
      expect(page.root?.getAttribute('aria-orientation')).toBe('vertical');
    });
  });
  describe('CSS classes', () => {
    it('should have wpp-divider class on host', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider></wpp-divider>`,
      });
      expect(page.root?.classList.contains('wpp-divider')).toBe(true);
    });
    it('should have wpp-divider-line class on inner div', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider></wpp-divider>`,
      });
      const innerDiv = page.root?.shadowRoot?.querySelector('.wpp-divider-line');
      expect(innerDiv).toBeTruthy();
    });
    it('should have vertical class when vertical prop is true', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider vertical></wpp-divider>`,
      });
      const innerDiv = page.root?.shadowRoot?.querySelector('.vertical');
      expect(innerDiv).toBeTruthy();
    });
    it('should have resizable class when resizable prop is true', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider resizable></wpp-divider>`,
      });
      const innerDiv = page.root?.shadowRoot?.querySelector('.resizable');
      expect(innerDiv).toBeTruthy();
    });
    it('should have both vertical and resizable classes when both props are true', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider vertical resizable></wpp-divider>`,
      });
      const innerDiv = page.root?.shadowRoot?.querySelector('.vertical.resizable');
      expect(innerDiv).toBeTruthy();
    });
  });
  describe('Parts', () => {
    it('should have body part on inner div', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider></wpp-divider>`,
      });
      const innerDiv = page.root?.shadowRoot?.querySelector('[part="body"]');
      expect(innerDiv).toBeTruthy();
    });
    it('should export body part from host', async () => {
      const page = await newSpecPage({
        components: [WppDivider],
        html: `<wpp-divider></wpp-divider>`,
      });
      expect(page.root?.getAttribute('exportparts')).toContain('body');
    });
  });
});
