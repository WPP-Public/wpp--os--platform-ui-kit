import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import useState from 'storybook-addon-state'

import { Components } from '../../components'

import { WppTopbar } from './wpp-topbar'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Navigation/Top Bar',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    navigation: {
      control: 'object',
    },
    nativeLink: { control: { type: 'boolean' } },
  },
} as Meta<typeof WppTopbar>

const initNavigation = [
  {
    label: 'Home',
    value: 'home',
    path: '/home',
  },
  {
    chevronOnly: true,
    value: 'learning',
    children: [
      {
        label: 'Guided tour',
        value: 'guidedTour',
        path: '/topbar/learning/guided-tour',
      },
      {
        label: 'Case studies',
        value: 'caseStudies',
        path: '/topbar/learning/case-studies',
      },
      {
        label: 'Community',
        value: 'community',
        path: '/topbar/learning/community',
        children: [
          {
            label: 'People',
            value: 'people',
            path: '/topbar/learning/people',
          },
          {
            label: 'Workers',
            value: 'workers',
            path: '/topbar/learning/workers',
          },
        ],
      },
    ],
  },
  {
    label: 'Client services',
    value: 'clientServices',
    path: '/client-services',
  },
  {
    label: 'Learning',
    value: 'learning',
    children: [
      {
        label: 'Guided tour',
        value: 'guidedTour',
        path: '/learning/guided-tour',
      },
      {
        label: 'Case studies',
        value: 'caseStudies',
        path: '/learning/case-studies',
      },
      {
        label: 'Community',
        value: 'community',
        path: '/learning/community',
      },
    ],
  },
  {
    label: 'Marketplace',
    value: 'marketplace',
    path: '/marketplace',
  },
  {
    label: 'Dev portal',
    value: 'devPortal',
    path: '/devPortal',
  },
]

export const NoLogo: Story<Components.WppTopbar> = (args: Components.WppTopbar) => {
  const [value, setValue] = useState('value', initNavigation[0].value)

  const handleTopbarItemChange = (event: CustomEvent) => {
    setValue(event.detail.value)
  }

  return html` <wpp-topbar-v3-1-1
    .navigation="${args.navigation}"
    .value="${value}"
    @wppChange="${handleTopbarItemChange}"
    .nativeLink=${args.nativeLink}
  >
    <div slot="app" style="display: flex; margin-right: 32px">
      <wpp-typography-v3-1-1 style="white-space: nowrap" type="m-strong" tag="h3"> APP Name</wpp-typography-v3-1-1>
    </div>
  </wpp-topbar-v3-1-1>`
}

NoLogo.args = {
  navigation: initNavigation,
  nativeLink: false,
}

export const WithLogo: Story<Components.WppTopbar> = (args: Components.WppTopbar) => {
  const [value, setValue] = useState('value', initNavigation[0].value)

  const handleTopbarItemChange = (event: CustomEvent) => {
    console.log('event.detail :>> ', event.detail)
    setValue(event.detail.value)
  }

  return html` <wpp-topbar-v3-1-1
    .navigation="${args.navigation}"
    .value="${value}"
    @wppChange="${handleTopbarItemChange}"
    .nativeLink=${args.nativeLink}
  >
    <div slot="app" style="display: flex; align-items: center; margin-right: 32px">
      <img
        src="https://easydrawingguides.com/wp-content/uploads/2018/09/Impossible-Triangle-09.png"
        style="display: flex; width: 40px; height: 40px; max-width: 40px; margin-right: 12px"
      />
      <wpp-typography-v3-1-1 class="application-name" style="white-space: nowrap" type="m-strong" tag="h3">
        APP Name
      </wpp-typography-v3-1-1>
    </div>
  </wpp-topbar-v3-1-1>`
}

WithLogo.args = {
  navigation: initNavigation,
  nativeLink: false,
}
