import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { OpacitySlider } from '../wpp-opacity-slider';
describe('wpp-opacity-slider', () => {
  // The mock canvas has no 2D drawing API; without a context the component skips drawing, as it does in
  // a browser that cannot provide one.
  beforeAll(() => {
    jest.spyOn(Object.getPrototypeOf(document.createElement('canvas')), 'getContext').mockReturnValue(null);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const setup = async (opacity) => {
    const page = await newSpecPage({
      components: [OpacitySlider],
      template: () => h("wpp-opacity-slider-v4-7-0", { hexColor: "#FF0000", opacity: opacity, label: "Opacity" }),
    });
    const slider = page.root?.shadowRoot?.querySelector('[role="slider"]');
    const emitted = [];
    page.root?.addEventListener('opacityChanged', (e) => emitted.push(e.detail));
    return { page, slider, emitted };
  };
  // The mock DOM gives the canvas no size, as a browser does while the picker's popover is closed, so these
  // also cover a slider that first renders before it is on the page.
  describe('marker position', () => {
    it('should place the marker from the opacity, not from the size of the track', async () => {
      const { page, slider } = await setup(1);
      expect(slider.style.left).toBe('clamp(8px, 100%, calc(100% - 8px))');
      page.root?.setAttribute('opacity', '0.25');
      await page.waitForChanges();
      expect(slider.style.left).toBe('clamp(8px, 25%, calc(100% - 8px))');
    });
  });
  describe('Testing accessibility', () => {
    it('should expose the opacity as a named slider with a percentage value', async () => {
      const { slider } = await setup(0.5);
      expect(slider.getAttribute('aria-label')).toBe('Opacity');
      expect(slider.getAttribute('tabindex')).toBe('0');
      expect(slider.getAttribute('aria-valuenow')).toBe('50');
      expect(slider.getAttribute('aria-valuetext')).toBe('50%');
    });
    it('should step the opacity with the slider keys', async () => {
      const { slider, emitted } = await setup(0.5);
      for (const key of ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End']) {
        slider.dispatchEvent(new KeyboardEvent('keydown', { key }));
      }
      expect(emitted).toEqual([0.51, 0.49, 0.6, 0.4, 0, 1]);
    });
  });
});
