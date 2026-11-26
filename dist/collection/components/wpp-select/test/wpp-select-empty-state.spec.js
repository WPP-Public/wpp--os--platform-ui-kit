import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSelect } from '../wpp-select';
import { WppTypography } from '../../wpp-typography/wpp-typography';
describe('wpp-select: empty state colour', () => {
  it('renders the empty state in grey-700 rather than the default text colour', async () => {
    const page = await newSpecPage({
      components: [WppSelect, WppTypography],
      template: () => h("wpp-select-v4-7-0", { type: "multiple", list: [], value: [], placeholder: "Choose option" }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    page.rootInstance['isOpen'] = true;
    await page.waitForChanges();
    const emptyState = page.root?.shadowRoot?.querySelector('.nothing-found');
    expect(emptyState).toBeTruthy();
    // wpp-typography writes its `color` prop as an inline custom property on its own host,
    // so a `--wpp-typography-color` set by an ancestor can never reach it. The colour has
    // to ride the prop.
    expect(emptyState.style.getPropertyValue('--typography-color')).toBe('var(--wpp-grey-color-700)');
  });
});
