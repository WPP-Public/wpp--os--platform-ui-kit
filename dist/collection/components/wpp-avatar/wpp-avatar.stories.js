import { html } from 'lit-html';
import { AVATAR_COLORS_VARIANTS } from '../wpp-avatar-group/const';
export default {
  title: 'Design System/Components/Data display/Avatar',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    name: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
    size: {
      options: ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl'],
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
};
export const User = {
  render: args => html `
    <wpp-avatar-v3-4-0
      .name="${args.name}"
      .size="${args.size}"
      .src="${args.src}"
      .withTooltip="${args.withTooltip}"
      .tooltipConfig="${args.tooltipConfig}"
      .color="${args.color}"
      .interactable="${args.interactable}"
      @wppClick="${(e) => console.log('onWppClick', e)}"
    />
  `,
  args: {
    name: 'Test Avatar',
    size: 'xs',
    src: 'https://img.freepik.com/premium-photo/portrait-smiling-young-man-looking-camera_33839-1731.jpg',
    withTooltip: true,
    color: '',
    tooltipConfig: {
      placement: 'bottom',
    },
    interactable: false,
  },
};
User.parameters = {
  controls: { exclude: ['amountOfHiddenAvatars', 'icon'] },
};
export const Logo = {
  render: args => html `
    <wpp-avatar-v3-4-0
      variant="square"
      .name="${args.name}"
      .size="${args.size}"
      .src="${args.src}"
      .withTooltip="${args.withTooltip}"
      .tooltipConfig="${args.tooltipConfig}"
      .color="${args.color}"
      .interactable="${args.interactable}"
      @wppClick="${(e) => console.log('onWppClick', e)}"
    />
  `,
  args: {
    name: 'Linkedin',
    size: 'xs',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
    withTooltip: true,
    color: '',
    tooltipConfig: {
      placement: 'bottom',
    },
    interactable: false,
  },
};
Logo.parameters = {
  controls: { exclude: ['amountOfHiddenAvatars', 'color', 'icon'] },
};
export const Icon = {
  render: args => html `
    <wpp-avatar-v3-4-0
      .icon="${args.icon}"
      .size="${args.size}"
      .interactable="${args.interactable}"
      .ariaProps="${args.ariaProps}"
    />
  `,
  args: {
    icon: 'wpp-icon-premium',
    size: 'xs',
    interactable: false,
    ariaProps: { label: 'Premium' },
  },
};
Icon.parameters = {
  controls: { exclude: ['amountOfHiddenAvatars', 'src', 'withTooltip', 'tooltipPlacement', 'name', 'color'] },
};
