import { newSpecPage } from '@stencil/core/testing';
import { WppOverlay } from '../wpp-overlay';
describe('wpp-action-button', () => {
  describe('Testing initialisation', () => {
    it('Test default init', async () => {
      const myBtn = new WppOverlay();
      expect(myBtn).toBeTruthy();
    });
    it('Test default properties on component', () => {
      const myBtn = new WppOverlay();
      // Testing default property initialisation
      expect(myBtn.isHidden).toBeFalsy();
      expect(myBtn.isVisible).toBeFalsy();
      expect(myBtn.zIndex).toEqual(900);
    });
  });
  describe('Test componentWillLoad', () => {
    it('should set isHidden to true if isVisible=false', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="false"></wpp-overlay>`,
      });
      // isVisible is false, so isHidden should be true
      expect(page.rootInstance.isHidden).toBe(true);
    });
    it('should leave isHidden as default (false) when isVisible=true', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="true"></wpp-overlay>`,
      });
      // isVisible is true, so isHidden should be false
      expect(page.rootInstance.isHidden).toBe(false);
    });
  });
  describe('Test handleVisibleChange', () => {
    it('should update isHidden after visibility change to false', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="false"></wpp-overlay>`,
      });
      if (!page.root) {
        throw new Error('Root element is not defined');
      }
      // isVisible is false, so isHidden should be true
      expect(page.rootInstance.isHidden).toBe(true);
      // Change isVisible to true
      page.root.isVisible = true;
      await page.waitForChanges();
      expect(page.rootInstance.isHidden).toBe(false);
    });
    it('should update isHidden after visibility change to false', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="true"></wpp-overlay>`,
      });
      if (!page.root) {
        throw new Error('Root element is not defined');
      }
      expect(page.rootInstance.isHidden).toBe(false);
      page.root.isVisible = false;
      // Wait for setTimeout to complete
      await new Promise(resolve => setTimeout(resolve, 200));
      await page.waitForChanges();
      expect(page.rootInstance.isHidden).toBe(true);
    });
  });
  describe('Test handleClick', () => {
    it('should emit wppClick when clicked', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="true"></wpp-overlay>`,
      });
      // Spy on the wppClick event emitter
      const emitSpy = jest.spyOn(page.rootInstance.wppClick, 'emit');
      // Get the overlay element from the shadow DOM
      const overlayEl = page.root?.shadowRoot?.querySelector('.overlay');
      expect(overlayEl).toBeTruthy();
      // Click the overlay element
      overlayEl?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await page.waitForChanges();
      // Check if the wppClick event was emitted
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith();
    });
  });
  describe('Testing snapshots', () => {
    it('When isVisible="false"', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="false"></wpp-overlay>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('When isVisible="true"', async () => {
      const page = await newSpecPage({
        components: [WppOverlay],
        html: `<wpp-overlay is-visible="true"></wpp-overlay>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});
