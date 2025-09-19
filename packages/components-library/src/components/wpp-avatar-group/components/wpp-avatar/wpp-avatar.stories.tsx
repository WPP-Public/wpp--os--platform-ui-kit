import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../../../components'
import { AVATAR_COLORS_VARIANTS } from '../../consts'

import { WppAvatar } from './wpp-avatar'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Data display/Avatar',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    size: {
      options: ['xs', 's', 'm', 'l', 'xl', '2xl'],
      control: { type: 'select' },
    },
    src: {
      type: 'string',
    },
    interactable: { control: { type: 'boolean' } },
    withTooltip: { control: { type: 'boolean' } },
    amountOfHiddenAvatars: {
      type: 'number',
    },
    color: {
      options: AVATAR_COLORS_VARIANTS,
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppAvatar>

export const User: Story<Components.WppAvatar> = (args: Components.WppAvatar) => html`
  <wpp-avatar-v3-1-1
    .name="${args.name}"
    .size="${args.size}"
    .src="${args.src}"
    .withTooltip="${args.withTooltip}"
    .tooltipConfig="${args.tooltipConfig}"
    .color="${args.color}"
    .interactable="${args.interactable}"
    @wppClick="${(e: any) => console.log('onWppClick', e)}"
  />
`

User.args = {
  name: 'Test Avatar',
  size: 'xs',
  src: 'https://img.freepik.com/premium-photo/portrait-smiling-young-man-looking-camera_33839-1731.jpg',
  withTooltip: true,
  color: '',
  tooltipConfig: {
    placement: 'bottom',
  },
  interactable: false,
}

User.parameters = {
  controls: { exclude: ['amountOfHiddenAvatars', 'icon'] },
}

export const Logo: Story<Components.WppAvatar> = (args: Components.WppAvatar) => html`
  <wpp-avatar-v3-1-1
    variant="square"
    .name="${args.name}"
    .size="${args.size}"
    .src="${args.src}"
    .withTooltip="${args.withTooltip}"
    .tooltipConfig="${args.tooltipConfig}"
    .color="${args.color}"
    .interactable="${args.interactable}"
    @wppClick="${(e: any) => console.log('onWppClick', e)}"
  />
`

Logo.args = {
  name: 'Linkedin',
  size: 'xs',
  src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
  withTooltip: true,
  color: '',
  tooltipConfig: {
    placement: 'bottom',
  },
  interactable: false,
}

Logo.parameters = {
  controls: { exclude: ['amountOfHiddenAvatars', 'color', 'icon'] },
}

export const Icon: Story<Components.WppAvatar> = (args: Components.WppAvatar) => html`
  <wpp-avatar-v3-1-1
    .icon="${args.icon}"
    .size="${args.size}"
    .interactable="${args.interactable}"
    .ariaProps="${args.ariaProps}"
  />
`

Icon.args = {
  icon: 'wpp-icon-premium',
  size: 'xs',
  interactable: false,
  ariaProps: { label: 'Premium' },
}

Icon.parameters = {
  controls: { exclude: ['amountOfHiddenAvatars', 'src', 'withTooltip', 'tooltipPlacement', 'name', 'color'] },
}
