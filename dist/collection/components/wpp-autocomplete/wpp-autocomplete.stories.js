import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
const helperCreateElement = (type, props, children) => ({
  type,
  props: props || {},
  ...(children && { children: Array.isArray(children) ? children : [children] }),
});
export default {
  title: 'Design System/Components/Selection and input/Autocomplete',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    dropdownConfig: {
      control: 'object',
    },
    type: {
      options: ['regular', 'extended'],
      control: { type: 'select' },
    },
    required: { control: { type: 'boolean' } },
    multiple: { control: { type: 'boolean' } },
    simpleSearch: { control: { type: 'boolean' } },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
    persistentSearch: { control: { type: 'boolean' } },
  },
};
const createHero = (name, src = '') => ({
  id: name,
  label: name,
  value: name.toLowerCase(),
  slots: [helperCreateElement('wpp-avatar', { slot: 'left', size: 'xs', name, src })],
});
const heroes = [
  createHero('Gandalf the GreyGandalf the GreyGandalf the GreyGandalf the Grey', 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028'),
  createHero('Aragorn', 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028'),
  createHero('Gimli'),
  createHero('Boromir'),
  createHero('Galadriel'),
  createHero('Elrond'),
  createHero('Legolas', 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028'),
  createHero('Arwen'),
  ...Array.from(Array(20)).map((_, index) => createHero(`No Name ${index}`)),
];
const suggestions = [
  { id: 'Aragorn', label: 'Aragorn', value: 'aragorn' },
  { id: 'Boromir', label: 'Boromir', value: 'boromir' },
  { id: 'Elrond', label: 'Elrond', value: 'elrond' },
];
export const Regular = {
  render: args => {
    const [value, setValue] = useState([]);
    return html ` <wpp-autocomplete-v4-0-0
      .list="${heroes}"
      .loading="${args.loading}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .limitSelectedItems="${args.limitSelectedItems}"
      .placeholder="${args.placeholder}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .dropdownConfig="${args.dropdownConfig}"
      .locales="${args.locales}"
      .labelConfig="${args.labelConfig}"
      .type="${args.type}"
      .value="${value}"
      .multiple="${args.multiple}"
      .showCreateNewElement="${args.showCreateNewElement}"
      .displayBtnWhenListEmpty="${args.displayBtnWhenListEmpty}"
      .simpleSearch="${args.simpleSearch}"
      .dropdownWidth="${args.dropdownWidth}"
      .size="${args.size}"
      .suggestions="${args.suggestions}"
      .persistentSearch="${args.persistentSearch}"
      name="regular-autocomplete"
      @wppChange="${(e) => setValue(e.detail.value)}"
      @wppSearchValueChange="${(e) => console.log('onWppSearchValueChange', e.detail)}"
      @wppCreateNewOption="${(e) => console.log('onWppCreateNewOption', e.detail)}"
    ></wpp-autocomplete-v4-0-0>`;
  },
  args: {
    loading: false,
    disabled: false,
    required: true,
    limitSelectedItems: 0,
    placeholder: 'Search',
    dropdownWidth: 'auto',
    message: '',
    type: 'regular',
    size: 'm',
    locales: {
      nothingFound: 'Nothing found',
      loading: 'Loading...',
      selected: count => `${count} selected`,
      showMore: 'Show More',
      showLess: 'Show Less',
      suggestionTitle: 'Suggestions',
      createNewElement: query => `Create "${query}"`,
      clearMultiple: 'Clear selections',
      clearSingle: 'Clear selection',
    },
    labelConfig: {
      icon: '',
      text: 'Add heroes',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    multiple: false,
    suggestions,
    showCreateNewElement: false,
    displayBtnWhenListEmpty: true,
    simpleSearch: true,
    persistentSearch: false,
  },
};
export const Extended = {
  render: args => {
    const [value, setValue] = useState([]);
    return html ` <wpp-autocomplete-v4-0-0
      style="--wpp-autocomplete-extended-selected-values-wrapper-padding: 2px 10px 10px 10px;"
      .list="${heroes}"
      .loading="${args.loading}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .limitSelectedItems="${args.limitSelectedItems}"
      .placeholder="${args.placeholder}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .dropdownConfig="${args.dropdownConfig}"
      .locales="${args.locales}"
      .labelConfig="${args.labelConfig}"
      .type="${args.type}"
      .value="${value}"
      .suggestions="${args.suggestions}"
      .multiple="${args.multiple}"
      .showCreateNewElement="${args.showCreateNewElement}"
      .displayBtnWhenListEmpty="${args.displayBtnWhenListEmpty}"
      .simpleSearch="${args.simpleSearch}"
      .dropdownWidth="${args.dropdownWidth}"
      .size="${args.size}"
      .persistentSearch="${args.persistentSearch}"
      name="extended-autocomplete"
      @wppChange="${(e) => setValue(e.detail.value)}"
      @wppSearchValueChange="${(e) => console.log('onWppSearchValueChange', e.detail)}"
    >
    </wpp-autocomplete-v4-0-0>`;
  },
  args: {
    loading: false,
    disabled: false,
    required: true,
    limitSelectedItems: 0,
    placeholder: 'Search',
    dropdownWidth: 'auto',
    message: '',
    type: 'extended',
    size: 'm',
    suggestions,
    locales: {
      nothingFound: 'Nothing found',
      loading: 'Loading...',
      selected: count => `${count} selected`,
      showMore: 'Show More',
      showLess: 'Show Less',
      suggestionTitle: 'Suggestions',
      createNewElement: query => `Create "${query}"`,
      clearMultiple: 'Clear selections',
      clearSingle: 'Clear selection',
    },
    labelConfig: {
      icon: '',
      text: 'Add heroes',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    multiple: true,
    showCreateNewElement: false,
    displayBtnWhenListEmpty: true,
    simpleSearch: true,
    persistentSearch: false,
  },
};
const fruitsList = [
  {
    id: 1,
    label: 'Avocado',
    value: 'avocado',
  },
  {
    id: 2,
    label: 'Blueberry',
    value: 'blueberry',
    slots: [helperCreateElement('wpp-icon-mail', { slot: 'left' })],
  },
  {
    id: 3,
    label: 'Cherry',
    value: 'cherry',
    slots: [
      helperCreateElement('wpp-icon-available-checkmark', { slot: 'left' }),
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }, helperCreateElement('wpp-icon-plus', { slot: 'icon-start' })),
    ],
  },
  {
    id: 4,
    label: 'Durian',
    value: 'durian',
    slots: [helperCreateElement('wpp-icon-chevron', { slot: 'right' })],
  },
  {
    id: 5,
    label: 'Elderberry',
    value: 'elderberry',
    slots: [
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }),
    ],
  },
  {
    id: 6,
    label: 'Carambola',
    value: 'carambola',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 7,
    label: 'Grape',
    value: 'grape',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }, helperCreateElement('wpp-icon-plus', { slot: 'icon-start' })),
    ],
  },
  {
    id: 8,
    label: 'Orange',
    value: 'orange',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        variant: 'square',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 9,
    label: 'Apple',
    value: 'apple',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    id: 10,
    label: 'Grapefruit',
    value: 'grapefruit',
    slots: [helperCreateElement('span', { slot: 'caption', children: 'Caption' })],
  },
  {
    id: 11,
    label: 'Watermelon',
    value: 'watermelon',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        variant: 'square',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    id: 12,
    label: 'Pear',
    value: 'pear',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        variant: 'square',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
      helperCreateElement('wpp-typography', {
        slot: 'right',
        type: 's-body',
      }, helperCreateElement('span', { children: 'Text' })),
    ],
  },
  {
    id: 13,
    label: 'Mango',
    value: 'mango',
    slots: [
      helperCreateElement('wpp-icon-star', { slot: 'left' }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Tropical', variant: 'info' }),
    ],
  },
  {
    id: 14,
    label: 'Dragon Fruit',
    value: 'dragon-fruit',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        variant: 'square',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
      helperCreateElement('span', { slot: 'caption', children: 'Exotic fruit' }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Premium', variant: 'warning' }),
    ],
  },
  {
    id: 15,
    label: 'Kiwi',
    value: 'kiwi',
    slots: [helperCreateElement('wpp-icon-available-checkmark', { slot: 'left' })],
  },
  {
    id: 16,
    label: 'Passion Fruit',
    value: 'passion-fruit',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }, helperCreateElement('wpp-icon-heart', { slot: 'icon-start' })),
    ],
  },
  {
    id: 17,
    label: 'Papaya',
    value: 'papaya',
  },
  {
    id: 18,
    label: 'Lychee',
    value: 'lychee',
    slots: [
      helperCreateElement('span', { slot: 'caption', children: 'Sweet and aromatic' }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Seasonal', variant: 'neutral' }),
    ],
  },
];
const staticSuggestionWithSlots = [
  {
    id: 1,
    label: 'Avacado',
    value: 'avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
    value: 'blueberry',
    slots: [helperCreateElement('wpp-icon-mail', { slot: 'left' })],
  },
  {
    id: 3,
    label: 'Cherry',
    value: 'cherry',
    slots: [
      helperCreateElement('wpp-icon-available-checkmark', { slot: 'left' }),
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }, helperCreateElement('wpp-icon-plus', { slot: 'icon-start' })),
    ],
  },
  {
    id: 4,
    label: 'Durian',
    value: 'durian',
    slots: [helperCreateElement('wpp-icon-chevron', { slot: 'right' })],
  },
  {
    id: 5,
    label: 'Elderberry',
    value: 'elderberry',
    slots: [
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }),
    ],
  },
  {
    id: 6,
    label: 'Сarambola',
    value: 'carambola',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 7,
    label: 'Grape',
    value: 'grape',
    slots: [
      helperCreateElement('wpp-action-button', {
        slot: 'right',
        variant: 'secondary',
      }, helperCreateElement('wpp-icon-plus', { slot: 'icon-start' })),
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 8,
    label: 'Orange',
    value: 'orange',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        variant: 'square',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
    ],
  },
  {
    id: 9,
    label: 'Apple',
    value: 'apple',
    slots: [
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 'xs',
        src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
      }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    id: 10,
    label: 'Grapefruit',
    value: 'grapefruit',
    slots: [helperCreateElement('span', { slot: 'caption', children: 'Caption' })],
  },
  {
    id: 11,
    label: 'Watermelon',
    value: 'watermelon',
    slots: [
      helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        variant: 'square',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    id: 13,
    label: 'Pear',
    value: 'pear',
    slots: [
      helperCreateElement('span', { slot: 'caption', children: 'Caption' }),
      helperCreateElement('wpp-avatar', {
        slot: 'left',
        size: 's',
        variant: 'square',
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
      }),
      helperCreateElement('wpp-typography', {
        slot: 'right',
        type: 's-body',
      }, helperCreateElement('span', { children: 'Text' })),
    ],
  },
];
export const RegularSlotSuggestions = {
  render: args => {
    const [value, setValue] = useState([]);
    return html ` <wpp-autocomplete-v4-0-0
      .list="${fruitsList}"
      .loading="${args.loading}"
      .disabled="${args.disabled}"
      .required="${args.required}"
      .limitSelectedItems="${args.limitSelectedItems}"
      .placeholder="${args.placeholder}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .dropdownConfig="${args.dropdownConfig}"
      .locales="${args.locales}"
      .labelConfig="${args.labelConfig}"
      .type="${args.type}"
      .value="${value}"
      .multiple="${args.multiple}"
      .showCreateNewElement="${args.showCreateNewElement}"
      .displayBtnWhenListEmpty="${args.displayBtnWhenListEmpty}"
      .simpleSearch="${args.simpleSearch}"
      .dropdownWidth="${args.dropdownWidth}"
      .size="${args.size}"
      .suggestions="${args.suggestions}"
      .persistentSearch="${args.persistentSearch}"
      name="regular-slot-autocomplete"
      @wppChange="${(e) => setValue(e.detail.value)}"
      @wppSearchValueChange="${(e) => console.log('onWppSearchValueChange', e.detail)}"
      @wppCreateNewOption="${(e) => console.log('onWppCreateNewOption', e.detail)}"
    >
    </wpp-autocomplete-v4-0-0>`;
  },
  args: {
    loading: false,
    disabled: false,
    required: true,
    limitSelectedItems: 0,
    placeholder: 'Search',
    dropdownWidth: 'auto',
    message: '',
    type: 'regular',
    size: 'm',
    locales: {
      nothingFound: 'Nothing found',
      loading: 'Loading...',
      selected: count => `${count} selected`,
      showMore: 'Show More',
      showLess: 'Show Less',
      suggestionTitle: 'Suggestions',
      createNewElement: query => `Create "${query}"`,
      clearMultiple: 'Clear selections',
      clearSingle: 'Clear selection',
    },
    labelConfig: {
      icon: '',
      text: 'Fruits List',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    multiple: false,
    suggestions: staticSuggestionWithSlots,
    showCreateNewElement: false,
    displayBtnWhenListEmpty: true,
    simpleSearch: true,
    persistentSearch: false,
  },
};
