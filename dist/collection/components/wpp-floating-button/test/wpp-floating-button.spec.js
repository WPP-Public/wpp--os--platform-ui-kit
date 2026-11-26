import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFloatingButton } from '../wpp-floating-button';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-floating-button', () => {
  it('should render primary floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-7-0", null),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-7-0", { disabled: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render loading floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-7-0", { loading: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing accessibility', () => {
    const getButton = (page) => page.root?.shadowRoot?.querySelector('button');
    it('should name the icon-only button from the default locale', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", null),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Add');
    });
    it('should name the button from locales when ariaProps has no label', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", { locales: { label: 'Ajouter' } }),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Ajouter');
    });
    it('should prefer ariaProps.label over locales', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => (h("wpp-floating-button-v4-7-0", { ariaProps: { label: 'Create project' }, locales: { label: 'Ajouter' } })),
      });
      expect(getButton(page).getAttribute('aria-label')).toBe('Create project');
    });
    describe('with ariaProps.labelledby', () => {
      const renderWithLabel = async (ariaProps) => {
        const page = await newSpecPage({
          components: [WppFloatingButton],
          html: `<span id="create-label">Create project</span><span id="team-label"> for the team </span><wpp-floating-button></wpp-floating-button>`,
        });
        const host = page.body.querySelector('wpp-floating-button');
        host.ariaProps = ariaProps;
        await page.waitForChanges();
        return host.shadowRoot?.querySelector('button');
      };
      it('should name the button from the text of the labelling elements in the page', async () => {
        const button = await renderWithLabel({ labelledby: 'create-label team-label' });
        expect(button.getAttribute('aria-label')).toBe('Create project for the team');
        expect(button.hasAttribute('aria-labelledby')).toBe(false);
      });
      it('should prefer the labelling elements over ariaProps.label', async () => {
        const button = await renderWithLabel({ label: 'Add item', labelledby: 'create-label' });
        expect(button.getAttribute('aria-label')).toBe('Create project');
      });
      it('should fall back to the default name when the ids name nothing', async () => {
        const button = await renderWithLabel({ labelledby: 'missing-label' });
        expect(button.getAttribute('aria-label')).toBe('Add');
        expect(button.hasAttribute('aria-labelledby')).toBe(false);
      });
    });
    it('should not expose the transient pressed visual as a toggle state', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", null),
      });
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('pressed')).toBe(true);
      expect(getButton(page).hasAttribute('aria-pressed')).toBe(false);
    });
    it('should paint the focus ring when focus is moved here by script after a key press', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", null),
      });
      // The browser decides `:focus-visible`; the mock DOM cannot, so answer for it.
      getButton(page).matches = (selector) => selector === ':focus-visible';
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(true);
    });
    it('should not paint the focus ring when the browser would not show focus', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", null),
      });
      getButton(page).matches = () => false;
      page.root?.dispatchEvent(new MouseEvent('mousedown'));
      page.root?.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(getButton(page).classList.contains('tab-focus')).toBe(false);
    });
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", null),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-7-0", null),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
