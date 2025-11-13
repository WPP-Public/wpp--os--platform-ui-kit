import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
export default {
  title: 'Design System/Components/Data display/Tree',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    loading: { control: { type: 'boolean' } },
    skeletonNumberItems: { control: { type: 'number' } },
    multiple: { control: { type: 'boolean' } },
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
              {
                title: 'Camry 3.5',
                id: '0-0-2-1',
              },
              {
                title: 'Camry Hybrid',
                id: '0-0-2-2',
              },
              {
                title: 'Camry Hybrid Camry Hybrid Camry Hybrid Camry Hybrid Camry Hybrid',
                id: '0-0-2-3',
              },
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
            iconEnd: {
              icon: 'wpp-icon-sad',
              name: 'edit',
            },
          },
          {
            title: 'Superb',
            id: '0-1-1',
          },
          {
            title: 'Octavia',
            id: '0-1-2',
          },
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
  {
    title: 'Motorcycle',
    id: '1',
  },
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
      {
        title: 'B-52',
        id: '2-0',
      },
      {
        title: 'MIG-21',
        id: '2-1',
      },
    ],
  },
];
const locales = {
  nothingFound: 'No result',
};
export const Tree = (args) => {
  const [treeState, setTreeState] = useState(data);
  const handleTreeChange = ({ detail }) => {
    setTreeState(detail.treeState);
  };
  return html `<wpp-tree-v3-3-1
    .multiple=${args.multiple}
    .data=${treeState}
    .search="${args.search}"
    .locales=${args.locales}
    .loading=${args.loading}
    .skeletonNumberItems=${args.skeletonNumberItems}
    .withItemsTruncation=${args.withItemsTruncation}
    @wppChange="${handleTreeChange}"
  ></wpp-tree-v3-3-1>`;
};
Tree.args = {
  multiple: false,
  withItemsTruncation: false,
  locales,
  loading: false,
  skeletonNumberItems: 5,
  search: '',
};
export const TreeWithCustomSearch = (args) => {
  const [treeState, setTreeState] = useState(data);
  const handleTreeChange = ({ detail }) => {
    setTreeState(detail.treeState);
  };
  return html `
    <Fragment>
      <wpp-typography-v3-3-1 .type=${'l-strong'}>
        Single tree with custom search: the search string should match exactly the title of the tree-item (case
        sensitive).
      </wpp-typography-v3-3-1>
      <wpp-tree-v3-3-1
        .multiple=${args.multiple}
        .data=${treeState}
        .search="${args.search}"
        .locales=${args.locales}
        .withItemsTruncation=${args.withItemsTruncation}
        .searchConfig=${args.searchConfig}
        @wppChange="${handleTreeChange}"
      ></wpp-tree-v3-3-1>
    </Fragment>
  `;
};
TreeWithCustomSearch.args = {
  multiple: false,
  withItemsTruncation: false,
  locales,
  search: '',
  searchConfig: {
    isMatchingSearch: (item, search) => item.title === search,
  },
};
