import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { useState } from 'storybook/internal/preview-api'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Selection and input/Search',
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
    showOptions: { control: { type: 'boolean' } },
    simpleSearch: { control: { type: 'boolean' } },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppSearch>

type SearchStoryArgs = Components.WppSearch

interface Hero {
  id: string
  label: string
  url: string
}

const createHero = (name: string, url = ''): Hero => ({
  id: name,
  label: name,
  url,
})

const heroes: Hero[] = [
  createHero(
    'Gandalf the GreyGandalf the GreyGandalf the GreyGandalf the Grey',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYDcyNktWzouj_yLb_KGClIxW2_M0j6ryN-A&usqp=CAU',
  ),
  createHero(
    'Aragorn',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_Hsd1xsxyq8L97dlCg2jv_idnNptlzYrVA&usqp=CAU',
  ),
  createHero('Gimli'),
  createHero('Boromir'),
  createHero('Galadriel'),
  createHero('Elrond'),
  createHero(
    'Legolas',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsW08Y5TbumreAtqyc3IrMU1GHNSJjQLOw3w&usqp=CAU',
  ),
  createHero('Arwen'),
  ...Array.from(Array(20)).map((_, index) => createHero(`No Name ${index}`)),
]

export const Search: StoryObj<SearchStoryArgs> = (args: SearchStoryArgs) => {
  const [value, setValue] = useState<Hero[]>([])

  return html` <wpp-search-v3-3-0
    .loading="${args.loading}"
    .disabled="${args.disabled}"
    .required="${args.required}"
    .placeholder="${args.placeholder}"
    .highlight="${args.highlight}"
    .message="${args.message}"
    .messageType="${args.messageType}"
    .dropdownConfig="${args.dropdownConfig}"
    .locales="${args.locales}"
    .labelConfig="${args.labelConfig}"
    .value="${value}"
    .openDropdownOnClick="${args.openDropdownOnClick}"
    .simpleSearch="${args.simpleSearch}"
    .dropdownWidth="${args.dropdownWidth}"
    .showOptions="${args.showOptions}"
    .size="${args.size}"
    name="regular-search"
    @wppChange="${(e: any) => setValue(e.detail.value)}"
    @wppSearchValueChange="${(e: any) => console.log('onWppSearchValueChange', e.detail)}"
    @wppCreateNewOption="${(e: any) => console.log('onWppCreateNewOption', e.detail)}"
  >
    ${heroes.map(
      hero => html`
        <wpp-list-item-v3-3-0 .value="${hero}">
          <wpp-avatar-v3-3-0 size="xs" src="${hero.url}" name="${hero.label}" slot="left"></wpp-avatar-v3-3-0>
          <p slot="label">${hero.label}</p>
        </wpp-list-item-v3-3-0>
      `,
    )}
  </wpp-search-v3-3-0>`
}

Search.args = {
  loading: false,
  disabled: false,
  required: true,
  highlight: true,
  placeholder: 'Search',
  dropdownWidth: 'auto',
  message: '',
  size: 'm',
  locales: {
    nothingFound: 'Nothing found',
    loading: 'Loading...',
    dropdownHeader: 'Suggested results',
  },
  labelConfig: {
    icon: '',
    text: 'Add heroes',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
  showOptions: true,
  openDropdownOnClick: false,
  simpleSearch: true,
}
