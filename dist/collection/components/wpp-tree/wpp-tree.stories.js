import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
export default {
  title: 'Design System/Components/Data display/Tree',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    loading: { control: { type: 'boolean' } },
    skeletonNumberItems: { control: { type: 'number' } },
    multiple: { control: { type: 'boolean' } },
    lazyConfig: { control: { type: 'object' } },
    defaultSelectedIds: { control: { type: 'object' } },
    disableOpenCloseAnimation: { control: { type: 'boolean' } },
    withItemsTruncation: { control: { type: 'boolean' } },
    search: { control: { type: 'text' } },
    locales: { control: { type: 'object' } },
  },
};
const data = [
  {
    title: 'Cars',
    id: '0',
    open: true,
    'data-testid': 'tree-item-cars',
    children: [
      {
        title: 'Toyota',
        id: '0-0',
        iconsEnd: [
          { icon: `wpp-icon-info`, name: 'remove' },
          { icon: 'wpp-icon-cross', name: 'save' },
        ],
        'data-testid': 'tree-item-toyota',
        children: [
          {
            title: 'Avalon',
            id: '0-0-0',
            disabled: true,
            'data-testid': 'tree-item-avalon',
          },
          {
            title: 'Prius',
            id: '0-0-1',
            disabled: true,
            'data-testid': 'tree-item-prius',
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
          },
          {
            title: 'Camry Variants',
            id: '0-0-2',
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
            children: [
              { title: 'Camry 3.5', id: '0-0-2-1' },
              { title: 'Camry Hybrid', id: '0-0-2-2' },
              { title: 'Camry Hybrid Camry Hybrid Camry Hybrid Camry Hybrid Camry Hybrid', id: '0-0-2-3' },
            ],
          },
        ],
      },
      {
        title: 'Skoda',
        id: '0-1',
        children: [
          {
            title: 'Kodiaq',
            id: '0-1-0',
            someProps: true,
            iconEnd: { icon: 'wpp-icon-sad', name: 'edit' },
          },
          { title: 'Superb', id: '0-1-1' },
          { title: 'Octavia', id: '0-1-2' },
        ],
      },
      {
        title: 'Volkswagen',
        id: '0-2',
        endContent: {
          contentType: 'text',
          props: {
            text: 'Due in 3 days',
          },
        },
        children: [
          {
            title: 'Passat',
            id: '0-2-0',
            endContent: {
              contentType: 'tag',
              props: {
                label: 'Positive',
                variant: 'positive',
                icon: 'wpp-icon-trend-ascend',
                className: 'tree-end-content-tag',
              },
            },
          },
          {
            title: 'Tiguan',
            id: '0-2-1',
            endContent: {
              contentType: 'avatar',
              props: {
                src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
                alt: 'User Avatar',
                name: 'User 1',
                color: 'var(--wpp-dataviz-color-cat-dark-1)',
              },
            },
          },
          {
            title: 'Touareg',
            id: '0-2-2',
            endContent: {
              contentType: 'avatarGroup',
              props: {
                avatars: [
                  {
                    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
                    name: 'User 1',
                  },
                  { src: '', name: 'User 2' },
                  { src: '', name: 'User 3' },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  { title: 'Motorcycle', id: '1' },
  {
    title: 'Planes',
    id: '2',
    disabled: true,
    endContent: {
      contentType: 'tag',
      props: {
        label: 'Positive',
        variant: 'positive',
        icon: 'wpp-icon-trend-ascend',
        className: 'tree-end-content-tag',
      },
    },
    children: [
      { title: 'B-52', id: '2-0' },
      { title: 'MIG-21', id: '2-1' },
    ],
  },
];
const locales = {
  nothingFound: 'No result',
};
// Lazy loader function - shared across stories
// Each node with hasChildren: true can trigger lazy loading
const lazyLoader = async (item) => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));
  switch (String(item.id)) {
    case '0': // Cars
      return {
        items: [
          { title: 'Toyota', id: '0-0', hasChildren: true },
          { title: 'Skoda', id: '0-1' },
          { title: 'Volkswagen', id: '0-2' },
        ],
      };
    case '0-0': // Toyota
      return {
        items: [
          { title: 'Avalon', id: '0-0-0' },
          { title: 'Prius', id: '0-0-1' },
          { title: 'Camry', id: '0-0-2' },
        ],
      };
    case '2': // Planes
      return {
        items: [
          { title: 'B-52', id: '2-0' },
          { title: 'MIG-21', id: '2-1' },
        ],
      };
    default:
      return { items: [] };
  }
};
// Lazy data (hasChildren but no children loaded yet)
const lazyData = [
  { title: 'Cars', id: '0', hasChildren: true },
  { title: 'Motorcycle', id: '1' },
  { title: 'Planes', id: '2', hasChildren: true },
];
export const Tree = (args) => {
  const hasLazyConfig = !!args.lazyConfig;
  const [treeState, setTreeState] = useState(hasLazyConfig ? lazyData : data);
  const handleTreeChange = ({ detail }) => {
    setTreeState(detail.treeState);
  };
  // Build lazyConfig with the loadChildren function if lazyConfig is provided
  const finalLazyConfig = hasLazyConfig
    ? {
      ...args.lazyConfig,
      loadChildren: lazyLoader,
    }
    : undefined;
  return html `<wpp-tree-v4-0-0
    .multiple=${args.multiple}
    .data=${treeState}
    .search="${args.search}"
    .locales=${args.locales}
    .withItemsTruncation=${args.withItemsTruncation}
    .lazyConfig=${finalLazyConfig}
    @wppChange="${handleTreeChange}"
  ></wpp-tree-v4-0-0>`;
};
Tree.args = {
  multiple: false,
  withItemsTruncation: true,
  locales,
  search: '',
  lazyConfig: undefined,
  disableOpenCloseAnimation: false,
  defaultSelectedIds: [],
};
Tree.argTypes = {
  skeletonNumberItems: { table: { disable: true } },
  loading: { table: { disable: true } },
};
export const TreeWithCustomSearch = (args) => {
  const hasLazyConfig = !!args.lazyConfig;
  const [treeState, setTreeState] = useState(hasLazyConfig ? lazyData : data);
  const handleTreeChange = ({ detail }) => {
    setTreeState(detail.treeState);
  };
  // Build lazyConfig with the loadChildren function if lazyConfig is provided
  const finalLazyConfig = hasLazyConfig
    ? {
      ...args.lazyConfig,
      loadChildren: lazyLoader,
    }
    : undefined;
  return html `
    <div>
      <wpp-typography-v4-0-0 .type=${'l-strong'}>
        Single tree with custom search: the search string should match exactly the title of the tree-item (case
        sensitive).
      </wpp-typography-v4-0-0>
      <wpp-tree-v4-0-0
        .multiple=${args.multiple}
        .data=${treeState}
        .search="${args.search}"
        .locales=${args.locales}
        .withItemsTruncation=${args.withItemsTruncation}
        .searchConfig=${args.searchConfig}
        .lazyConfig=${finalLazyConfig}
        @wppChange="${handleTreeChange}"
      ></wpp-tree-v4-0-0>
    </div>
  `;
};
TreeWithCustomSearch.args = {
  multiple: false,
  withItemsTruncation: true,
  locales,
  search: '',
  disableOpenCloseAnimation: false,
  searchConfig: {
    isMatchingSearch: (item, search) => item.title === search,
  },
  lazyConfig: undefined,
};
TreeWithCustomSearch.argTypes = {
  skeletonNumberItems: { table: { disable: true } },
  loading: { table: { disable: true } },
};
export const TreeLoading = (args) => {
  const [treeState, setTreeState] = useState(data);
  const handleTreeChange = ({ detail }) => {
    setTreeState(detail.treeState);
  };
  return html `
    <div>
      <wpp-typography-v4-0-0 .type=${'l-strong'}>
        Tree in loading state: Use this to show a skeleton placeholder while the tree data is being fetched initially.
      </wpp-typography-v4-0-0>
      <wpp-tree-v4-0-0
        .data=${treeState}
        .loading=${args.loading}
        .skeletonNumberItems=${args.skeletonNumberItems}
        @wppChange="${handleTreeChange}"
      ></wpp-tree-v4-0-0>
    </div>
  `;
};
TreeLoading.args = {
  loading: true,
  skeletonNumberItems: 5,
};
TreeLoading.argTypes = {
  multiple: { table: { disable: true } },
  withItemsTruncation: { table: { disable: true } },
  search: { table: { disable: true } },
  locales: { table: { disable: true } },
  lazyConfig: { table: { disable: true } },
};
// Data with some nodes already open on load
const dataWithOpenNodes = [
  {
    title: 'Cars',
    id: '0',
    open: true,
    children: [
      {
        title: 'Toyota',
        id: '0-0',
        open: true,
        children: [
          { title: 'Avalon', id: '0-0-0' },
          { title: 'Prius', id: '0-0-1' },
          {
            title: 'Camry Variants',
            id: '0-0-2',
            children: [
              { title: 'Camry 3.5', id: '0-0-2-1' },
              { title: 'Camry Hybrid', id: '0-0-2-2' },
            ],
          },
        ],
      },
      { title: 'Skoda', id: '0-1' },
      { title: 'Volkswagen', id: '0-2' },
    ],
  },
  { title: 'Motorcycle', id: '1' },
  {
    title: 'Planes',
    id: '2',
    children: [
      { title: 'B-52', id: '2-0' },
      { title: 'MIG-21', id: '2-1' },
    ],
  },
];
export const TreeOpenOnLoad = () => {
  const [treeState, setTreeState] = useState(dataWithOpenNodes);
  const handleTreeChange = ({ detail }) => {
    setTreeState(detail.treeState);
  };
  const handleExpandAll = () => {
    const treeEl = document.querySelector('#tree-open-on-load');
    treeEl?.expandAll();
  };
  const handleCollapseAll = () => {
    const treeEl = document.querySelector('#tree-open-on-load');
    treeEl?.collapseAll();
  };
  return html `
    <div>
      <wpp-typography-v4-0-0 .type=${'l-strong'}>
        Open on Load: Set <code>open: true</code> on items in your data to have them expanded initially. Use
        <code>expandAll()</code> / <code>collapseAll()</code> methods for global control.
      </wpp-typography-v4-0-0>
      <div style="display: flex; gap: 8px; margin: 12px 0;">
        <wpp-button-v4-0-0 @click=${handleExpandAll}>Expand All</wpp-button-v4-0-0>
        <wpp-button-v4-0-0 variant="secondary" @click=${handleCollapseAll}>Collapse All</wpp-button-v4-0-0>
      </div>
      <wpp-tree-v4-0-0 id="tree-open-on-load" .data=${treeState} @wppChange="${handleTreeChange}"></wpp-tree-v4-0-0>
    </div>
  `;
};
TreeOpenOnLoad.argTypes = {
  multiple: { table: { disable: true } },
  withItemsTruncation: { table: { disable: true } },
  search: { table: { disable: true } },
  locales: { table: { disable: true } },
  lazyConfig: { table: { disable: true } },
  loading: { table: { disable: true } },
  skeletonNumberItems: { table: { disable: true } },
  defaultSelectedIds: { table: { disable: true } },
  disableOpenCloseAnimation: { table: { disable: true } },
};
