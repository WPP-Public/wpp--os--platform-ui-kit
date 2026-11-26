import { newSpecPage } from '@stencil/core/testing';
import { WppSortButton } from '../wpp-sort-button';
describe('wpp-sort-button', () => {
  it('should render sort button', async () => {
    const page = await newSpecPage({
      components: [WppSortButton],
      html: `<wpp-sort-button />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled sort button', async () => {
    const page = await newSpecPage({
      components: [WppSortButton],
      html: `<wpp-sort-button .disabled=${true} />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing accessibility', () => {
    const getButton = (page) => page.root?.shadowRoot?.querySelector('button');
    it('should not expose the transient pressed visual as a toggle state', async () => {
      const page = await newSpecPage({
        components: [WppSortButton],
        html: `<wpp-sort-button>Sort</wpp-sort-button>`,
      });
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('pressed')).toBe(true);
      expect(getButton(page).hasAttribute('aria-pressed')).toBe(false);
    });
    it('should paint the focus ring when focus is moved here by script after a key press', async () => {
      const page = await newSpecPage({
        components: [WppSortButton],
        html: `<wpp-sort-button>Sort</wpp-sort-button>`,
      });
      // The browser decides `:focus-visible`; the mock DOM cannot, so answer for it.
      getButton(page).matches = (selector) => selector === ':focus-visible';
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(true);
    });
    it('should not paint the focus ring when the browser would not show focus', async () => {
      const page = await newSpecPage({
        components: [WppSortButton],
        html: `<wpp-sort-button>Sort</wpp-sort-button>`,
      });
      getButton(page).matches = () => false;
      page.root?.dispatchEvent(new MouseEvent('mousedown'));
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(false);
    });
  });
});
