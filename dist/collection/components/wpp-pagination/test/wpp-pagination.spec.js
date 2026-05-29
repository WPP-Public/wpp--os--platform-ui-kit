import { newSpecPage } from '@stencil/core/testing';
import { WppPagination } from '../wpp-pagination';
import { h } from '@stencil/core';
describe('wpp-pagination', () => {
  it('renders component with 78 pages', async () => {
    const itemsPerPage = [10, 11, 12, 13];
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-1-0", { count: 78, itemsPerPage: itemsPerPage }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 100 pages and with 13 itemsPerPage option', async () => {
    const itemsPerPage = [10, 11, 12, 13];
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-1-0", { count: 100, itemsPerPage: itemsPerPage, selectedItemPerPage: 13 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 100 pages and with 5 active page number', async () => {
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-1-0", { count: 100, activePageNumber: 5 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('single itemsPerPage option', () => {
    it('hides the entire items-per-page section when itemsPerPage has only one option', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 50, itemsPerPage: [10] }),
      });
      const shadowRoot = page.root?.shadowRoot;
      const labelEl = shadowRoot?.querySelector('[part="per-page-label"]');
      const selectEl = shadowRoot?.querySelector('wpp-select');
      const dividerEl = shadowRoot?.querySelector('wpp-divider');
      expect(labelEl).toBeNull();
      expect(selectEl).toBeNull();
      expect(dividerEl).toBeNull();
    });
    it('shows items-per-page section when itemsPerPage has multiple options', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 50, itemsPerPage: [10, 20, 50] }),
      });
      const shadowRoot = page.root?.shadowRoot;
      const labelEl = shadowRoot?.querySelector('[part="per-page-label"]');
      const selectEl = shadowRoot?.querySelector('wpp-select');
      const dividerEl = shadowRoot?.querySelector('wpp-divider');
      expect(labelEl).not.toBeNull();
      expect(selectEl).not.toBeNull();
      expect(dividerEl).not.toBeNull();
    });
    it('only displays page range text with single itemsPerPage option', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 100, itemsPerPage: [25], activePageNumber: 2 }),
      });
      const rangeEl = page.root?.shadowRoot?.querySelector('[part="range"]');
      expect(rangeEl?.textContent?.trim()).toBe('26-50 of 100 items');
    });
    it('renders snapshot correctly with single itemsPerPage', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 200, itemsPerPage: [6], selectedItemPerPage: 6 }),
      });
      const shadowRoot = page.root?.shadowRoot;
      expect(shadowRoot?.querySelector('[part="per-page-label"]')).toBeNull();
      expect(shadowRoot?.querySelector('wpp-select')).toBeNull();
      expect(shadowRoot?.querySelector('wpp-divider')).toBeNull();
      expect(shadowRoot?.querySelector('[part="range"]')).not.toBeNull();
      expect(page.root).toMatchSnapshot();
    });
    it('handles empty itemsPerPage array gracefully', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 50, itemsPerPage: [] }),
      });
      const shadowRoot = page.root?.shadowRoot;
      // Empty array length !== 1, so items-per-page section is shown (no options in select)
      expect(shadowRoot?.querySelector('[part="per-page-label"]')).not.toBeNull();
      expect(shadowRoot?.querySelector('wpp-select')).not.toBeNull();
    });
    it('renders with default itemsPerPage when not provided', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 100 }),
      });
      const shadowRoot = page.root?.shadowRoot;
      // Default itemsPerPage=[5,10,20,50] has 4 items, so section is shown
      expect(shadowRoot?.querySelector('[part="per-page-label"]')).not.toBeNull();
      expect(shadowRoot?.querySelector('wpp-select')).not.toBeNull();
      expect(shadowRoot?.querySelector('wpp-divider')).not.toBeNull();
      expect(shadowRoot?.querySelector('[part="range"]')).not.toBeNull();
    });
    it('still emits initial wppChange event with single itemsPerPage', async () => {
      const wppChangeSpy = jest.fn();
      await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-1-0", { count: 50, itemsPerPage: [10], onWppChange: wppChangeSpy }),
      });
      expect(wppChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: { page: 1, itemsPerPage: 10 },
      }));
    });
  });
});
