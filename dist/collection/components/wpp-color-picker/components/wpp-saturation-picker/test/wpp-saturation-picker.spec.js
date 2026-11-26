import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { SaturationPicker } from '../wpp-saturation-picker';
describe('wpp-saturation-picker', () => {
  // The mock canvas has no 2D drawing API; without a context the component skips drawing, as it does in
  // a browser that cannot provide one.
  beforeAll(() => {
    jest.spyOn(Object.getPrototypeOf(document.createElement('canvas')), 'getContext').mockReturnValue(null);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const setup = async () => {
    const page = await newSpecPage({
      components: [SaturationPicker],
      template: () => (h("wpp-saturation-picker-v4-7-0", { hue: 0, saturation: 50, value: 80, label: "Saturation and brightness", valueText: "Saturation 50%, brightness 80%" })),
    });
    const slider = page.root?.shadowRoot?.querySelector('[role="slider"]');
    const emitted = [];
    page.root?.addEventListener('saturationChanged', (e) => {
      const { saturation, saturationValue } = e.detail;
      emitted.push(`${saturation}/${saturationValue}`);
    });
    return { page, slider, emitted };
  };
  // The mock DOM gives the canvas no size, as a browser does while the picker's popover is closed, so this
  // also covers an area that first renders before it is on the page.
  describe('marker position', () => {
    it('should place the marker from saturation and brightness, not from the size of the area', async () => {
      const { page, slider } = await setup();
      expect(slider.style.left).toBe('50%');
      expect(slider.style.top).toBe('20%');
      slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await page.waitForChanges();
      expect(slider.style.left).toBe('51%');
    });
  });
  describe('Testing accessibility', () => {
    it('should expose the area as a named slider with readable value text', async () => {
      const { slider } = await setup();
      expect(slider.getAttribute('aria-label')).toBe('Saturation and brightness');
      expect(slider.getAttribute('tabindex')).toBe('0');
      expect(slider.getAttribute('aria-valuenow')).toBe('50');
      expect(slider.getAttribute('aria-valuetext')).toBe('Saturation 50%, brightness 80%');
    });
    it('should change saturation horizontally and brightness vertically', async () => {
      const { slider, emitted } = await setup();
      for (const key of ['ArrowRight', 'ArrowUp', 'PageDown', 'Home', 'End']) {
        slider.dispatchEvent(new KeyboardEvent('keydown', { key }));
      }
      expect(emitted).toEqual(['51/80', '51/81', '51/71', '0/71', '100/71']);
    });
  });
});
