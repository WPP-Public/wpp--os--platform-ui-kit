import { newSpecPage } from '@stencil/core/testing';
import { WppSkeleton } from '../wpp-skeleton';
describe('wpp-skeleton', () => {
  describe('Initialization', () => {
    it('should create component instance', () => {
      const component = new WppSkeleton();
      expect(component).toBeTruthy();
    });
    it('should have default variant as rectangle', () => {
      const component = new WppSkeleton();
      expect(component.variant).toBe('rectangle');
    });
    it('should have undefined width by default', () => {
      const component = new WppSkeleton();
      expect(component.width).toBeUndefined();
    });
    it('should have undefined height by default', () => {
      const component = new WppSkeleton();
      expect(component.height).toBeUndefined();
    });
  });
  describe('Rendering', () => {
    it('renders component', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton />`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('renders component with custom width and height', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton width='99px' height='99px' />`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('CSS classes', () => {
    it('should have wpp-skeleton class', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton />`,
      });
      expect(page.root?.classList.contains('wpp-skeleton')).toBe(true);
    });
    it('should have wpp-animated class (skeleton is always animated)', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton />`,
      });
      expect(page.root?.classList.contains('wpp-animated')).toBe(true);
    });
    it('should have wpp-rectangle class for rectangle variant', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton variant="rectangle" />`,
      });
      expect(page.root?.classList.contains('wpp-rectangle')).toBe(true);
    });
    it('should have wpp-circle class for circle variant', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton variant="circle" />`,
      });
      expect(page.root?.classList.contains('wpp-circle')).toBe(true);
    });
  });
  describe('Accessibility', () => {
    it('should have aria-hidden true', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton />`,
      });
      expect(page.root?.getAttribute('aria-hidden')).toBe('true');
    });
  });
  describe('CSS Variables', () => {
    it('should set --skeleton-width CSS variable', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton width='120px' />`,
      });
      expect(page.root?.style.getPropertyValue('--skeleton-width')).toBe('120px');
    });
    it('should set --skeleton-height CSS variable', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton height='80px' />`,
      });
      expect(page.root?.style.getPropertyValue('--skeleton-height')).toBe('80px');
    });
    it('should add px unit to numeric width', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton width='100' />`,
      });
      expect(page.root?.style.getPropertyValue('--skeleton-width')).toBe('100px');
    });
    it('should add px unit to numeric height', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton height='50' />`,
      });
      expect(page.root?.style.getPropertyValue('--skeleton-height')).toBe('50px');
    });
    it('should preserve units when provided', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton width='50%' height='10rem' />`,
      });
      expect(page.root?.style.getPropertyValue('--skeleton-width')).toBe('50%');
      expect(page.root?.style.getPropertyValue('--skeleton-height')).toBe('10rem');
    });
    it('should set empty string for undefined width/height', async () => {
      const page = await newSpecPage({
        components: [WppSkeleton],
        html: `<wpp-skeleton />`,
      });
      expect(page.root?.style.getPropertyValue('--skeleton-width')).toBe('');
      expect(page.root?.style.getPropertyValue('--skeleton-height')).toBe('');
    });
  });
});
