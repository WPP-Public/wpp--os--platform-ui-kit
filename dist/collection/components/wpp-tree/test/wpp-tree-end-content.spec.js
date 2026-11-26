// Action mode finds an item's end content by its versioned tags, which is what the browser renders. A spec page
// renders the plain tags, so the lookup is mapped back to them here; otherwise the avatar is never found.
jest.mock('../../../utils/utils', () => ({
  ...jest.requireActual('../../../utils/utils'),
  transformToVersionedTag: (tag) => tag,
}));
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTree } from '../wpp-tree';
import { WppTreeItem } from '../components/wpp-tree-item/wpp-tree-item';
describe('wpp-tree: action mode on end content', () => {
  it('focuses an end-content avatar through its setFocus, which reaches a tooltip avatar too', async () => {
    const data = [
      {
        title: 'Subtask 2.1',
        id: 'a',
        endContent: { contentType: 'avatar', props: { name: 'User 1', withTooltip: true } },
      },
    ];
    const page = await newSpecPage({
      components: [WppTree, WppTreeItem],
      template: () => h("wpp-tree-v4-7-0", { data: data }),
    });
    await page.waitForChanges();
    const item = page.root?.shadowRoot?.querySelector('[data-item-id="a"]');
    const avatar = item?.shadowRoot?.querySelector('wpp-avatar[part="tree-item-end-avatar"]');
    // A tooltip avatar's host is not focusable; only its setFocus reaches the button inside it
    const setFocus = jest.fn();
    avatar.setFocus = setFocus;
    for (const key of ['Home', 'F2']) {
      page.root?.dispatchEvent(new KeyboardEvent('keydown', { key }));
      await page.waitForChanges();
    }
    expect(setFocus).toHaveBeenCalledTimes(1);
  });
});
