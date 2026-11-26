// Action mode finds an item's menus by their versioned tags, which is what the browser renders. A spec page
// renders the plain tags, so the lookup is mapped back to them here; otherwise no menu is ever found.
jest.mock('../../../utils/utils', () => ({
  ...jest.requireActual('../../../utils/utils'),
  transformToVersionedTag: (tag) => tag,
}));
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTree } from '../wpp-tree';
describe('wpp-tree: action mode on an open item', () => {
  // An open item's children are rendered inside it, next to its own icon slots
  const openParent = (parent) => [
    {
      title: 'Cars',
      id: 'p',
      open: true,
      ...parent,
      children: [{ title: 'Toyota', id: 'c', iconsEnd: [{ icon: 'wpp-icon-info', name: 'remove' }] }],
    },
  ];
  const render = async (data) => {
    const page = await newSpecPage({
      components: [WppTree],
      template: () => h("wpp-tree-v4-7-0", { data: data }),
    });
    await page.waitForChanges();
    const press = async (key) => {
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key }));
      await page.waitForChanges();
    };
    const trigger = (itemId) => page.root?.shadowRoot?.querySelector(`[data-item-id="${itemId}"] > [slot] wpp-icon-more`);
    return { page, press, trigger };
  };
  it("F2 on an item without actions stays on the item instead of focusing a child's menu", async () => {
    const { page, press, trigger } = await render(openParent({}));
    const childFocus = jest.spyOn(trigger('c'), 'focus');
    await press('Home');
    await press('F2');
    expect(childFocus).not.toHaveBeenCalled();
    expect(page.root?.shadowRoot?.querySelector('[role="tree"]')?.getAttribute('aria-activedescendant')).toBe('tree-item-p');
  });
  it("Enter in action mode never opens a child's menu", async () => {
    const { press, trigger } = await render(openParent({ iconsStart: [{ icon: 'wpp-icon-info', name: 'remove' }] }));
    const ownFocus = jest.spyOn(trigger('p'), 'focus');
    const childClick = jest.spyOn(trigger('c'), 'click');
    await press('Home');
    await press('F2');
    await press('Enter');
    expect(ownFocus).toHaveBeenCalled();
    expect(childClick).not.toHaveBeenCalled();
  });
});
