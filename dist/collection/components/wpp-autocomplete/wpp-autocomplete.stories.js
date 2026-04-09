import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
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
const createHero = (name, url = '') => ({
  id: name,
  label: name,
  url,
});
const heroes = [
  createHero('Gandalf the GreyGandalf the GreyGandalf the GreyGandalf the Grey', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYDcyNktWzouj_yLb_KGClIxW2_M0j6ryN-A&usqp=CAU'),
  createHero('Aragorn', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_Hsd1xsxyq8L97dlCg2jv_idnNptlzYrVA&usqp=CAU'),
  createHero('Gimli'),
  createHero('Boromir'),
  createHero('Galadriel'),
  createHero('Elrond'),
  createHero('Legolas', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsW08Y5TbumreAtqyc3IrMU1GHNSJjQLOw3w&usqp=CAU'),
  createHero('Arwen'),
  ...Array.from(Array(20)).map((_, index) => createHero(`No Name ${index}`)),
];
const suggestions = [
  { id: 'Aragorn', label: 'Aragorn' },
  { id: 'Boromir', label: 'Boromir' },
  { id: 'Elrond', label: 'Elrond' },
];
export const Regular = {
  render: args => {
    const [value, setValue] = useState([]);
    return html ` <wpp-autocomplete-v3-6-0
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
      .suggestionsTitle="${args.suggestionsTitle}"
      .persistentSearch="${args.persistentSearch}"
      name="regular-autocomplete"
      @wppChange="${(e) => setValue(e.detail.value)}"
      @wppSearchValueChange="${(e) => console.log('onWppSearchValueChange', e.detail)}"
      @wppCreateNewOption="${(e) => console.log('onWppCreateNewOption', e.detail)}"
    >
      <div slot="selected-values">
        ${value.map(selectedValue => html `
            <wpp-pill-v3-6-0
              label="${selectedValue.label}"
              value="${selectedValue.id}"
              removable="${true}"
              type="display"
              .maxLength="${20}"
              @wppClose="${() => setValue(value.filter(i => i.id !== selectedValue.id))}"
            >
              <wpp-avatar-v3-6-0
                name="${selectedValue.label}"
                size="xs"
                src="${selectedValue.url}"
                slot="icon-start"
              />
            </wpp-pill-v3-6-0>
          `)}
      </div>
      ${heroes.map(hero => html `
          <wpp-list-item-v3-6-0 .value="${hero}">
            <wpp-avatar-v3-6-0 size="xs" src="${hero.url}" name="${hero.label}" slot="left"></wpp-avatar-v3-6-0>
            <p slot="label">${hero.label}</p>
          </wpp-list-item-v3-6-0>
        `)}
    </wpp-autocomplete-v3-6-0>`;
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
    suggestionsTitle: 'Suggested fruits',
    size: 'm',
    locales: {
      nothingFound: 'Nothing found',
      beginTyping: 'Begin typing',
      more: 'more',
      showMore: 'more',
      showLess: 'Show less',
      selected: count => `${count} selected`,
      loading: 'Loading...',
      createNewElement: 'Create new element',
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
    return html ` <wpp-autocomplete-v3-6-0
      style="--wpp-autocomplete-extended-selected-values-wrapper-padding: 2px 10px 10px 10px;"
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
      .suggestionsTitle="${args.suggestionsTitle}"
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
      <div slot="selected-values">
        ${value.map(selectedValue => html `
            <wpp-pill-v3-6-0
              label="${selectedValue.label}"
              value="${selectedValue.id}"
              disabled="${args.disabled}"
              removable="${true}"
              type="display"
              .maxLength="${20}"
              @wppClose="${() => setValue(value.filter(i => i.id !== selectedValue.id))}"
            >
              <wpp-avatar-v3-6-0
                name="${selectedValue.label}"
                size="xs"
                src="${selectedValue.url}"
                slot="icon-start"
              />
            </wpp-pill-v3-6-0>
          `)}
      </div>
      ${heroes.map(hero => html `
          <wpp-list-item-v3-6-0 .value="${hero}">
            <wpp-avatar-v3-6-0 size="xs" src="${hero.url}" name="${hero.label}" slot="left"></wpp-avatar-v3-6-0>
            <p slot="label">${hero.label}</p>
          </wpp-list-item-v3-6-0>
        `)}
    </wpp-autocomplete-v3-6-0>`;
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
      beginTyping: 'Begin typing',
      more: 'more',
      showMore: 'more',
      showLess: 'Show less',
      selected: count => `${count} selected`,
      loading: 'Loading...',
      createNewElement: 'Create new element',
    },
    suggestionsTitle: 'Suggested fruits',
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
const helperCreateElement = (type, props, children) => ({
  type,
  props: props || {},
  ...(children && { children: Array.isArray(children) ? children : [children] }),
});
const staticSuggestionWithSlots = [
  {
    id: 1,
    label: 'Avacado',
  },
  {
    id: 2,
    label: 'Blueberry',
    slots: [helperCreateElement('wpp-icon-mail', { slot: 'left' })],
  },
  {
    id: 3,
    label: 'Cherry',
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
    slots: [helperCreateElement('wpp-icon-chevron', { slot: 'right' })],
  },
  {
    id: 5,
    label: 'Elderberry',
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
    slots: [helperCreateElement('span', { slot: 'caption', children: 'Caption' })],
  },
  {
    id: 11,
    label: 'Watermelon',
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
    return html ` <wpp-autocomplete-v3-6-0
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
      .suggestionsTitle="${args.suggestionsTitle}"
      .persistentSearch="${args.persistentSearch}"
      name="regular-slot-autocomplete"
      @wppChange="${(e) => setValue(e.detail.value)}"
      @wppSearchValueChange="${(e) => console.log('onWppSearchValueChange', e.detail)}"
      @wppCreateNewOption="${(e) => console.log('onWppCreateNewOption', e.detail)}"
    >
      <div slot="selected-values">
        ${value.map(selectedValue => html `
            <wpp-pill-v3-6-0
              label="${selectedValue.label}"
              value="${selectedValue.id}"
              removable="${true}"
              type="display"
              .maxLength="${20}"
              @wppClose="${() => setValue(value.filter(i => i.id !== selectedValue.id))}"
            >
              <wpp-avatar-v3-6-0
                name="${selectedValue.label}"
                size="xs"
                src="${selectedValue.url}"
                slot="icon-start"
              />
            </wpp-pill-v3-6-0>
          `)}
      </div>
      ${heroes.map(hero => html `
          <wpp-list-item-v3-6-0 .value="${hero}">
            <wpp-avatar-v3-6-0 size="xs" src="${hero.url}" name="${hero.label}" slot="left"></wpp-avatar-v3-6-0>
            <p slot="label">${hero.label}</p>
          </wpp-list-item-v3-6-0>
        `)}
    </wpp-autocomplete-v3-6-0>`;
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
    suggestionsTitle: 'Suggested fruits',
    size: 'm',
    locales: {
      nothingFound: 'Nothing found',
      beginTyping: 'Begin typing',
      more: 'more',
      showMore: 'more',
      showLess: 'Show less',
      selected: count => `${count} selected`,
      loading: 'Loading...',
      createNewElement: 'Create new element',
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
    suggestions: staticSuggestionWithSlots,
    showCreateNewElement: false,
    displayBtnWhenListEmpty: true,
    simpleSearch: true,
    persistentSearch: false,
  },
};
