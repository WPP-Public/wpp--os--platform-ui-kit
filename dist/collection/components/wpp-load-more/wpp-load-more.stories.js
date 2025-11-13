import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Navigation/Load More',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    totalItems: {
      control: { type: 'number' },
      defaultValue: 100,
    },
    itemsLoaded: {
      control: { type: 'number' },
      defaultValue: 30,
    },
    showProgressBar: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    loading: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    incrementBy: {
      control: { type: 'number' },
      defaultValue: 10,
    },
  },
};
export const LoadMore = (args) => {
  let currentItemsLoaded = args.itemsLoaded;
  let isLoading = args.loading;
  const handleLoadMoreClicked = () => {
    if (!isLoading && currentItemsLoaded < args.totalItems) {
      isLoading = true;
      const loadMoreComponent = document.querySelector('#load-more-component');
      if (loadMoreComponent) {
        loadMoreComponent.loading = isLoading;
      }
      setTimeout(() => {
        currentItemsLoaded = Math.min(currentItemsLoaded + args.incrementBy, args.totalItems);
        isLoading = false;
        if (loadMoreComponent) {
          loadMoreComponent.itemsLoaded = currentItemsLoaded;
          loadMoreComponent.loading = isLoading;
        }
      }, 1000);
    }
  };
  return html `
    <wpp-load-more-v3-3-1
      id="load-more-component"
      .totalItems="${args.totalItems}"
      .itemsLoaded="${currentItemsLoaded}"
      .showProgressBar="${args.showProgressBar}"
      .loading="${isLoading}"
      .disabled="${args.disabled}"
      .incrementBy="${args.incrementBy}"
      @wppClickLoadMore="${handleLoadMoreClicked}"
    ></wpp-load-more-v3-3-1>
  `;
};
LoadMore.args = {
  totalItems: 100,
  itemsLoaded: 30,
  showProgressBar: true,
  loading: false,
  disabled: false,
  incrementBy: 10,
};
