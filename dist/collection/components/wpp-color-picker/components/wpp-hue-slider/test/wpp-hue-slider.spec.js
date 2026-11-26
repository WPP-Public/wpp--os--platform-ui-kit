import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { HueSlider } from '../wpp-hue-slider';
describe('wpp-hue-slider', () => {
  // The mock canvas has no 2D drawing API; without a context the component skips drawing, as it does in
  // a browser that cannot provide one.
  beforeAll(() => {
    jest.spyOn(Object.getPrototypeOf(document.createElement('canvas')), 'getContext').mockReturnValue(null);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const setup = async (hue) => {
    const page = await newSpecPage({
      components: [HueSlider],
      template: () => h("wpp-hue-slider-v4-7-0", { hue: hue, label: "Hue" }),
    });
    const slider = page.root?.shadowRoot?.querySelector('[role="slider"]');
    const emitted = [];
    page.root?.addEventListener('hueChanged', (e) => emitted.push(e.detail));
    return { page, slider, emitted };
  };
  // The mock DOM gives the canvas no size, as a browser does while the picker's popover is closed, so this
  // also covers a slider that first renders before it is on the page.
  describe('marker position', () => {
    it('should place the marker from the hue, not from the size of the track', async () => {
      const { slider } = await setup(180);
      expect(slider.style.left).toBe('clamp(8px, 50%, calc(100% - 8px))');
    });
  });
  describe('Testing accessibility', () => {
    it('should expose the hue as a named, focusable slider', async () => {
      const { slider } = await setup(120);
      expect(slider.getAttribute('aria-label')).toBe('Hue');
      expect(slider.getAttribute('tabindex')).toBe('0');
      expect(slider.getAttribute('aria-valuemin')).toBe('0');
      expect(slider.getAttribute('aria-valuemax')).toBe('360');
      expect(slider.getAttribute('aria-valuenow')).toBe('120');
    });
    it('should step the hue with the slider keys', async () => {
      const { slider, emitted } = await setup(120);
      for (const key of ['ArrowRight', 'ArrowLeft', 'PageUp', 'PageDown', 'Home', 'End']) {
        slider.dispatchEvent(new KeyboardEvent('keydown', { key }));
      }
      expect(emitted).toEqual([121, 119, 130, 110, 0, 360]);
    });
    it('should keep the hue within its bounds', async () => {
      const { slider, emitted } = await setup(360);
      slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(emitted).toEqual([360]);
    });
    it('should ignore other keys', async () => {
      const { slider, emitted } = await setup(120);
      slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      expect(emitted).toEqual([]);
    });
  });
});
