import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Selection and input/Segmented Control',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppSegmentedControl>

export const Text: StoryObj<Components.WppSegmentedControl & Components.WppSegmentedControlItem & { text: string }> = (
  args: Components.WppSegmentedControl & Components.WppSegmentedControlItem & { text: string },
) =>
  html` <wpp-segmented-control-v3-2-0
    .size="${args.size}"
    .width="${args.width}"
    .hugContentOff="${args.hugContentOff}"
    variant="text"
    value="games"
    @wppChange="${(event: any) => console.log(event.detail.value)}"
  >
    <wpp-segmented-control-item-v3-2-0 .hug-content-off=${args.hugContentOff} value="houses" .disabled=${args.disabled}>
      Houses
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 .hug-content-off="${args.hugContentOff}" .counter=${args.counter} value="cars">
      ${args.text}
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 .hug-content-off="${args.hugContentOff}" value="food">
      Food
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0
      .hug-content-off="${args.hugContentOff}"
      value="drinks"
      .disabled=${args.disabled}
    >
      Drinks
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 .hug-content-off="${args.hugContentOff}" value="fruits">
      Fruits
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 .hug-content-off="${args.hugContentOff}" value="games">
      Games
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0
      .hug-content-off="${args.hugContentOff}"
      .value="${10}"
      .disabled=${args.disabled}
    >
      Number
    </wpp-segmented-control-item-v3-2-0>
  </wpp-segmented-control-v3-2-0>`

Text.args = {
  size: 'm',
  text: 'Cars',
  disabled: false,
  hugContentOff: false,
  counter: 0,
  width: 'auto',
}

export const Icon: StoryObj<Components.WppSegmentedControlItem> = (args: Components.WppSegmentedControlItem) =>
  html` <wpp-segmented-control-v3-2-0 .size="${args.size}" variant="icon" value="grid">
    <wpp-segmented-control-item-v3-2-0 variant="icon" value="grid">
      <wpp-icon-home-v3-2-0 />
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 .disabled="${args.disabled}" variant="icon" value="list">
      <wpp-icon-board-v3-2-0 />
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 variant="icon" value="grid2">
      <wpp-icon-globe-v3-2-0 />
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 variant="icon" value="list2">
      <wpp-icon-design-v3-2-0 />
    </wpp-segmented-control-item-v3-2-0>
    <wpp-segmented-control-item-v3-2-0 variant="icon" value="list3">
      <wpp-icon-styleguide-v3-2-0 />
    </wpp-segmented-control-item-v3-2-0>
  </wpp-segmented-control-v3-2-0>`

Icon.args = {
  disabled: false,
  size: 'm',
}
