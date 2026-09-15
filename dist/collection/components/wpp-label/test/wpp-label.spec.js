import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppLabel } from '../wpp-label';
import { WppInternalLabel } from '../components/wpp-internal-label/wpp-internal-label';
describe('wpp-label', () => {
  // The info icon is the only thing left in a disabled field that could take focus, so it must not
  // be a tab stop — otherwise Tab lands on the help icon of an otherwise inert control.
  describe('info icon focusability', () => {
    const mkLabel = (props = {}) => newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => (h("wpp-label-v4-4-0", { config: { text: 'Test label', description: 'More info', icon: 'wpp-icon-info' }, typography: "s-body", ...props })),
    });
    const iconOf = (page) => page.root?.querySelector('wpp-internal-label')?.shadowRoot?.querySelector('[part="icon-wrapper"]');
    it('exposes the info icon as a button when the field is enabled', async () => {
      const icon = iconOf(await mkLabel());
      expect(icon?.getAttribute('role')).toBe('button');
      expect(icon?.getAttribute('tabindex')).toBe('0');
      expect(icon?.getAttribute('aria-label')).toBe('Show info');
    });
    it('takes the info icon out of the tab order when the field is disabled', async () => {
      const icon = iconOf(await mkLabel({ disabled: true }));
      expect(icon?.getAttribute('role')).toBe('none');
      expect(icon?.getAttribute('tabindex')).toBe('-1');
      expect(icon?.hasAttribute('aria-label')).toBe(false);
    });
    // Consumers whose own control is the tab stop (wpp-radio, wpp-checkbox) pass this to suppress
    // the icon; it used to be ignored whenever the label had no description.
    it('honours an explicit tabIndex of -1 from the tooltip config', async () => {
      const page = await newSpecPage({
        components: [WppLabel, WppInternalLabel],
        template: () => h("wpp-label-v4-4-0", { config: { text: 'Test label' }, tooltipConfig: { tabIndex: -1 } }),
      });
      const icon = page.root?.querySelector('wpp-internal-label')?.shadowRoot?.querySelector('[part="icon-wrapper"]');
      expect(icon?.getAttribute('role')).toBe('none');
      expect(icon?.getAttribute('tabindex')).toBe('-1');
    });
  });
  it('should render label with text and disabled state', async () => {
    const labelConfig = {
      text: 'Test label',
    };
    const page = await newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => h("wpp-label-v4-4-0", { config: labelConfig, disabled: true, typography: "s-body" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render label with optional text and icon', async () => {
    const labelConfig = {
      text: 'Test label',
      icon: 'wpp-icon-edit',
    };
    const page = await newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => h("wpp-label-v4-4-0", { config: labelConfig, typography: "s-body" }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render label with all text and icon with tooltip description ', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppLabel, WppInternalLabel],
      template: () => h("wpp-label-v4-4-0", { config: labelConfig, optional: true, typography: "s-body" }),
    });
    expect(page.root).toMatchSnapshot();
  });
});
