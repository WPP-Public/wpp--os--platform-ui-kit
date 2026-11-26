import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppLoadMore } from '../wpp-load-more';
import { WppButton } from '../../wpp-button/wpp-button';
import { WppProgressIndicator } from '../../wpp-progress-indicator/wpp-progress-indicator';
describe('wpp-load-more', () => {
  it('should render load more component', async () => {
    const page = await newSpecPage({
      components: [WppLoadMore, WppButton, WppProgressIndicator],
      html: `<wpp-load-more
               total-items="100"
               items-loaded="30"
               show-progress-bar="true"
               loading="false">
             </wpp-load-more>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render load more component with progress bar hidden', async () => {
    const page = await newSpecPage({
      components: [WppLoadMore, WppButton, WppProgressIndicator],
      html: `<wpp-load-more
               total-items="100"
               items-loaded="30"
               show-progress-bar="false"
               loading="false">
             </wpp-load-more>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render load more component in loading state', async () => {
    const page = await newSpecPage({
      components: [WppLoadMore, WppButton, WppProgressIndicator],
      html: `<wpp-load-more
               total-items="100"
               items-loaded="30"
               show-progress-bar="true"
               loading="true">
             </wpp-load-more>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should emit wppClickLoadMore event when button is clicked', async () => {
    const page = await newSpecPage({
      components: [WppLoadMore, WppButton, WppProgressIndicator],
      html: `<wpp-load-more
               total-items="100"
               items-loaded="30"
               show-progress-bar="true"
               loading="false">
             </wpp-load-more>`,
    });
    const loadMore = page.rootInstance;
    const wppClickLoadMore = jest.fn();
    loadMore.wppClickLoadMore = {
      emit: wppClickLoadMore,
    };
    await page.waitForChanges();
    const button = page.root?.shadowRoot?.querySelector('wpp-button');
    if (button) {
      button.click();
      await page.waitForChanges();
      expect(wppClickLoadMore).toHaveBeenCalled();
    }
    else {
      fail('Button not found');
    }
  });
  it('should update progress percentage on itemsLoaded change', async () => {
    const page = await newSpecPage({
      components: [WppLoadMore, WppButton, WppProgressIndicator],
      html: `<wpp-load-more
               total-items="100"
               items-loaded="30"
               show-progress-bar="true"
               loading="false">
             </wpp-load-more>`,
    });
    const loadMore = page.rootInstance;
    page.root?.setAttribute('items-loaded', '50');
    await page.waitForChanges();
    expect(loadMore.progressPercentage).toBe(50);
  });
  describe('Testing accessibility', () => {
    const getProgressText = (page) => page.root?.shadowRoot?.querySelector('[part="progress-text"]');
    const getButton = (page) => page.root?.shadowRoot?.querySelector('.load-more-button');
    it('should announce the progress text politely when more items load', async () => {
      const page = await newSpecPage({
        components: [WppLoadMore, WppButton, WppProgressIndicator],
        template: () => h("wpp-load-more-v4-7-0", { totalItems: 100, itemsLoaded: 30, showProgressBar: true }),
      });
      expect(getProgressText(page).getAttribute('aria-live')).toBe('polite');
      expect(getProgressText(page).textContent).toBe('30 of 100 items');
      page.root?.setAttribute('items-loaded', '50');
      await page.waitForChanges();
      expect(getProgressText(page).textContent).toBe('50 of 100 items');
    });
    it('should name the progress bar from the progress text', async () => {
      const page = await newSpecPage({
        components: [WppLoadMore, WppButton, WppProgressIndicator],
        template: () => h("wpp-load-more-v4-7-0", { totalItems: 100, itemsLoaded: 30, showProgressBar: true }),
      });
      const progressBar = page.root?.shadowRoot?.querySelector('[role="progressbar"]');
      expect(progressBar.getAttribute('aria-labelledby')).toBe(getProgressText(page).id);
    });
    it('should render the button and progress text from locales', async () => {
      const page = await newSpecPage({
        components: [WppLoadMore, WppButton, WppProgressIndicator],
        template: () => (h("wpp-load-more-v4-7-0", { totalItems: 100, itemsLoaded: 30, showProgressBar: true, locales: { loadMore: 'Mehr laden', itemsProgress: (loaded, total) => `${loaded} von ${total} Elementen` } })),
      });
      expect(getButton(page).textContent).toBe('Mehr laden');
      expect(getProgressText(page).textContent).toBe('30 von 100 Elementen');
    });
    it('should keep the default for a locale key that is not supplied', async () => {
      const page = await newSpecPage({
        components: [WppLoadMore, WppButton, WppProgressIndicator],
        template: () => (h("wpp-load-more-v4-7-0", { totalItems: 100, itemsLoaded: 30, showProgressBar: true, locales: { loadMore: 'Mehr laden' } })),
      });
      expect(getButton(page).textContent).toBe('Mehr laden');
      expect(getProgressText(page).textContent).toBe('30 of 100 items');
    });
  });
});
