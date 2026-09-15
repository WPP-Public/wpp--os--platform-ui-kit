import { newSpecPage } from '@stencil/core/testing';
import { WppPagination } from '../wpp-pagination';
import { WppPaginationSelect } from '../components/wpp-pagination-select/wpp-pagination-select';
import { WppPaginationItem } from '../components/wpp-pagination-item/wpp-pagination-item';
import { h } from '@stencil/core';
describe('wpp-pagination', () => {
  it('renders component with 78 pages', async () => {
    const itemsPerPage = [10, 11, 12, 13];
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-4-0", { count: 78, itemsPerPage: itemsPerPage }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 100 pages and with 13 itemsPerPage option', async () => {
    const itemsPerPage = [10, 11, 12, 13];
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-4-0", { count: 100, itemsPerPage: itemsPerPage, selectedItemPerPage: 13 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 100 pages and with 5 active page number', async () => {
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-4-0", { count: 100, activePageNumber: 5 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('single itemsPerPage option', () => {
    it('hides the entire items-per-page section when itemsPerPage has only one option', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-4-0", { count: 50, itemsPerPage: [10] }),
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
        template: () => h("wpp-pagination-v4-4-0", { count: 50, itemsPerPage: [10, 20, 50] }),
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
        template: () => h("wpp-pagination-v4-4-0", { count: 100, itemsPerPage: [25], activePageNumber: 2 }),
      });
      const rangeEl = page.root?.shadowRoot?.querySelector('[part="range"]');
      expect(rangeEl?.textContent?.trim()).toBe('26-50 of 100 items');
    });
    it('renders snapshot correctly with single itemsPerPage', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-4-0", { count: 200, itemsPerPage: [6], selectedItemPerPage: 6 }),
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
        template: () => h("wpp-pagination-v4-4-0", { count: 50, itemsPerPage: [] }),
      });
      const shadowRoot = page.root?.shadowRoot;
      // Empty array length !== 1, so items-per-page section is shown (no options in select)
      expect(shadowRoot?.querySelector('[part="per-page-label"]')).not.toBeNull();
      expect(shadowRoot?.querySelector('wpp-select')).not.toBeNull();
    });
    it('renders with default itemsPerPage when not provided', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-4-0", { count: 100 }),
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
        template: () => h("wpp-pagination-v4-4-0", { count: 50, itemsPerPage: [10], onWppChange: wppChangeSpy }),
      });
      expect(wppChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: { page: 1, itemsPerPage: 10 },
      }));
    });
  });
  describe('accessibility (WPPOPENDS-1499)', () => {
    const mkPage = (template) => newSpecPage({
      components: [WppPagination, WppPaginationSelect, WppPaginationItem],
      template,
    });
    const getSelectRoot = (page) => page.root?.shadowRoot?.querySelector('wpp-pagination-select')?.shadowRoot;
    it('exposes the pagination as a labelled navigation landmark', async () => {
      const page = await mkPage(() => h("wpp-pagination-v4-4-0", { count: 50 }));
      expect(page.root?.getAttribute('role')).toBe('navigation');
      expect(page.root?.getAttribute('aria-label')).toBe('Pagination');
    });
    // Two paginations on one page (a table with controls above and below, say) would otherwise be
    // two navigation landmarks sharing a name, which assistive tech cannot tell apart. The label
    // is a locale so the consumer can distinguish them.
    it('takes a custom navigation label from the locales', async () => {
      const page = await mkPage(() => h("wpp-pagination-v4-4-0", { count: 50, locales: { paginationLabel: 'Results pages' } }));
      expect(page.root?.getAttribute('aria-label')).toBe('Results pages');
    });
    it('names the items-per-page select, including the current value', async () => {
      const page = await mkPage(() => h("wpp-pagination-v4-4-0", { count: 50 }));
      const select = page.root?.shadowRoot?.querySelector('wpp-select');
      expect(select?.ariaProps?.label).toBe('Items per page: 5');
    });
    it('marks page buttons with button semantics and aria-current on the active page', async () => {
      const page = await mkPage(() => h("wpp-pagination-v4-4-0", { count: 30, itemsPerPage: [10], activePageNumber: 2 }));
      const items = getSelectRoot(page)?.querySelectorAll('wpp-pagination-item') ?? [];
      expect(items).toHaveLength(3);
      expect(items[1].getAttribute('role')).toBe('button');
      expect(items[1].getAttribute('aria-label')).toBe('Page 2');
      expect(items[1].getAttribute('aria-current')).toBe('page');
      expect(items[0].hasAttribute('aria-current')).toBe(false);
    });
    it('selects a page with Enter and Space', async () => {
      const changeSpy = jest.fn();
      const page = await mkPage(() => (h("wpp-pagination-v4-4-0", { count: 30, itemsPerPage: [10], activePageNumber: 1, onWppChange: changeSpy })));
      const items = getSelectRoot(page)?.querySelectorAll('wpp-pagination-item') ?? [];
      changeSpy.mockClear();
      items[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: expect.objectContaining({ page: 3 }) }));
    });
    it('names the prev/next chevrons and reflects their disabled bounds', async () => {
      const page = await mkPage(() => h("wpp-pagination-v4-4-0", { count: 30, itemsPerPage: [10], activePageNumber: 1 }));
      const root = getSelectRoot(page);
      const prev = root?.querySelector('[part="icon-left"]');
      const next = root?.querySelector('[part="icon-right"]');
      expect(prev?.getAttribute('role')).toBe('button');
      expect(prev?.getAttribute('aria-label')).toBe('Previous page');
      expect(prev?.getAttribute('aria-disabled')).toBe('true');
      expect(prev?.getAttribute('tabindex')).toBe('-1');
      expect(next?.getAttribute('aria-label')).toBe('Next page');
      expect(next?.getAttribute('aria-disabled')).toBe('false');
      expect(next?.getAttribute('tabindex')).toBe('0');
    });
    it('changes page when a chevron is activated by keyboard', async () => {
      const changeSpy = jest.fn();
      const page = await mkPage(() => (h("wpp-pagination-v4-4-0", { count: 30, itemsPerPage: [10], activePageNumber: 2, onWppChange: changeSpy })));
      const next = getSelectRoot(page)?.querySelector('[part="icon-right"]');
      changeSpy.mockClear();
      next?.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await page.waitForChanges();
      expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: expect.objectContaining({ page: 3 }) }));
    });
    it('labels the numeric page input and bounds it to the page count', async () => {
      const page = await mkPage(() => h("wpp-pagination-v4-4-0", { count: 500, itemsPerPage: [10], pageSelectThreshold: 8 }));
      const input = getSelectRoot(page)?.querySelector('input.input-page');
      expect(input?.getAttribute('aria-label')).toBe('Page number');
      expect(input?.getAttribute('min')).toBe('1');
      expect(input?.getAttribute('max')).toBe('50');
      expect(input?.hasAttribute('title')).toBe(false);
      expect(getSelectRoot(page)?.getElementById(input?.getAttribute('aria-describedby') ?? '')?.textContent).toBe('50');
    });
  });
});
