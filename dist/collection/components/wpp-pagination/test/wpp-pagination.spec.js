import { newSpecPage } from '@stencil/core/testing';
import { WppPagination } from '../wpp-pagination';
import { h } from '@stencil/core';
describe('wpp-pagination', () => {
  it('renders component with 78 pages', async () => {
    const itemsPerPage = [10, 11, 12, 13];
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-0-0", { count: 78, itemsPerPage: itemsPerPage }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 100 pages and with 13 itemsPerPage option', async () => {
    const itemsPerPage = [10, 11, 12, 13];
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-0-0", { count: 100, itemsPerPage: itemsPerPage, selectedItemPerPage: 13 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with 100 pages and with 5 active page number', async () => {
    const page = await newSpecPage({
      components: [WppPagination],
      template: () => h("wpp-pagination-v4-0-0", { count: 100, activePageNumber: 5 }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('single itemsPerPage option', () => {
    it('renders plain text instead of select when itemsPerPage has only one option', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-0-0", { count: 50, itemsPerPage: [10] }),
      });
      const selectEl = page.root?.shadowRoot?.querySelector('wpp-select');
      expect(selectEl).toBeNull();
      const perPageValueEl = page.root?.shadowRoot?.querySelector('.single-item-per-page');
      expect(perPageValueEl).not.toBeNull();
      expect(perPageValueEl?.textContent?.trim()).toBe('10');
    });
    it('renders select dropdown when itemsPerPage has multiple options', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-0-0", { count: 50, itemsPerPage: [10, 20, 50] }),
      });
      const selectEl = page.root?.shadowRoot?.querySelector('wpp-select');
      expect(selectEl).not.toBeNull();
      const singleItemEl = page.root?.shadowRoot?.querySelector('.single-item-per-page');
      expect(singleItemEl).toBeNull();
    });
    it('displays correct page range with single itemsPerPage option', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-0-0", { count: 100, itemsPerPage: [25], activePageNumber: 2 }),
      });
      const rangeEl = page.root?.shadowRoot?.querySelector('[part="range"]');
      expect(rangeEl?.textContent?.trim()).toBe('26-50 of 100 items');
    });
    it('renders correctly with single itemsPerPage and selectedItemPerPage', async () => {
      const page = await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-0-0", { count: 200, itemsPerPage: [6], selectedItemPerPage: 6 }),
      });
      const selectEl = page.root?.shadowRoot?.querySelector('wpp-select');
      expect(selectEl).toBeNull();
      const perPageValueEl = page.root?.shadowRoot?.querySelector('.single-item-per-page');
      expect(perPageValueEl).not.toBeNull();
      expect(perPageValueEl?.textContent?.trim()).toBe('6');
      expect(page.root).toMatchSnapshot();
    });
    it('still emits initial wppChange event with single itemsPerPage', async () => {
      const wppChangeSpy = jest.fn();
      await newSpecPage({
        components: [WppPagination],
        template: () => h("wpp-pagination-v4-0-0", { count: 50, itemsPerPage: [10], onWppChange: wppChangeSpy }),
      });
      expect(wppChangeSpy).toHaveBeenCalledWith(expect.objectContaining({
        detail: { page: 1, itemsPerPage: 10 },
      }));
    });
  });
});
