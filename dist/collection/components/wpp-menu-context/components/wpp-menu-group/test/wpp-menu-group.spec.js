import { newSpecPage } from '@stencil/core/testing';
import { WppMenuGroup } from '../wpp-menu-group';
import { GROUP_ROLE, PRESENTATION_ROLE } from '../../../constants';
describe('wpp-menu-group', () => {
  it('renders base component', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group></wpp-menu-group>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root?.getAttribute('role')).toBe(GROUP_ROLE);
  });
  it('should render header when it was provided', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group header="Actions"></wpp-menu-group>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root?.getAttribute('role')).toBe(GROUP_ROLE);
    expect(page.root?.getAttribute('aria-label')).toBe('Actions');
  });
  it('should render divider when flag was enabled', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group header="Actions" with-divider></wpp-menu-group>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root?.getAttribute('role')).toBe(GROUP_ROLE);
    expect(page.root?.getAttribute('aria-label')).toBe('Actions');
  });
  it('uses presentation semantics for divider-only groups', async () => {
    const page = await newSpecPage({
      components: [WppMenuGroup],
      html: `<wpp-menu-group with-divider></wpp-menu-group>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root?.getAttribute('role')).toBe(PRESENTATION_ROLE);
  });
});
