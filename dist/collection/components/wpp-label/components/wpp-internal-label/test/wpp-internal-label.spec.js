import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppInternalLabel } from '../wpp-internal-label';
describe('wpp-internal-label', () => {
  const renderLabel = async (typography) => {
    const page = await newSpecPage({
      components: [WppInternalLabel],
      template: () => h("wpp-internal-label-v4-7-0", { labelText: "Label", typography: typography }),
    });
    return page.root;
  };
  // The label colours live in SCSS, which a spec page cannot evaluate, so these guard the two
  // hooks the colours hang off instead: the host classes that `:host(.s-strong)` and
  // `:host(.s-body)` select, and the `text` part consumers style from outside. Renaming any of
  // them drops a label colour silently. The rendered colours themselves are verified in a browser.
  describe('styling hooks', () => {
    it('marks the host with the s-body class by default', async () => {
      const host = await renderLabel();
      expect(host.classList.contains('s-body')).toBe(true);
      expect(host.classList.contains('s-strong')).toBe(false);
    });
    it('marks the host with the s-strong class when that typography is requested', async () => {
      const host = await renderLabel('s-strong');
      expect(host.classList.contains('s-strong')).toBe(true);
      expect(host.classList.contains('s-body')).toBe(false);
    });
    it('exposes the label text as the "text" part', async () => {
      const host = await renderLabel();
      expect(host.shadowRoot?.querySelector('[part="text"]')).not.toBeNull();
    });
  });
});
