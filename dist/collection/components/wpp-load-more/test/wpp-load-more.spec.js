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
});
