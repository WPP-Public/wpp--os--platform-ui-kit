export const treeDataSample = [
  {
    title: 'Cars',
    id: '0',
    open: true,
    children: [
      {
        title: 'Toyota',
        isNotSelectable: true,
        open: true,
        id: '0-0',
        iconsEnd: [
          { icon: `wpp-icon-info`, name: 'remove' },
          { icon: 'wpp-icon-cross', name: 'save' },
        ],
        children: [
          { title: 'Avalon', id: '0-0-0', disabled: true },
          {
            title: 'Prius',
            id: '0-0-1',
            disabled: true,
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
          },
          {
            title: 'Camry Variants',
            id: '0-0-2',
            open: true,
            iconsEnd: [
              { icon: `wpp-icon-arrow`, name: 'remove' },
              { icon: 'wpp-icon-cross', name: 'save' },
            ],
            children: [
              { title: 'Camry 3.5', id: '0-0-2-1' },
              { title: 'Camry Hybrid', id: '0-0-2-2' },
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
        children: [
          { title: 'Passat', id: '0-2-0' },
          { title: 'Tiguan', id: '0-2-1' },
          { title: 'Touareg', id: '0-2-2' },
        ],
      },
    ],
  },
  { title: 'Motorcycle', id: '1' },
  {
    title: 'Planes',
    id: '2',
    disabled: true,
    children: [
      { title: 'B-52', id: '2-0' },
      { title: 'MIG-21', id: '2-1' },
    ],
  },
];
