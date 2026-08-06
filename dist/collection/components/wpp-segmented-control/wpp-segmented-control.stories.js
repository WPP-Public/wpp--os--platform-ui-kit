import { html } from 'lit-html';
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
};
export const Text = (args) => html ` <wpp-segmented-control-v4-3-0
    .size="${args.size}"
    .width="${args.width}"
    .hugContentOff="${args.hugContentOff}"
    variant="text"
    value="games"
    @wppChange="${(event) => console.log(event.detail.value)}"
  >
    <wpp-segmented-control-item-v4-3-0 .hug-content-off=${args.hugContentOff} value="houses" .disabled=${args.disabled}>
      Houses
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 .hug-content-off="${args.hugContentOff}" .counter=${args.counter} value="cars">
      ${args.text}
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 .hug-content-off="${args.hugContentOff}" value="food">
      Food
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0
      .hug-content-off="${args.hugContentOff}"
      value="drinks"
      .disabled=${args.disabled}
    >
      Drinks
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 .hug-content-off="${args.hugContentOff}" value="fruits">
      Fruits
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 .hug-content-off="${args.hugContentOff}" value="games">
      Games
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0
      .hug-content-off="${args.hugContentOff}"
      .value="${10}"
      .disabled=${args.disabled}
    >
      Number
    </wpp-segmented-control-item-v4-3-0>
  </wpp-segmented-control-v4-3-0>`;
Text.args = {
  size: 'm',
  text: 'Cars',
  disabled: false,
  hugContentOff: false,
  counter: 0,
  width: 'auto',
};
export const Icon = (args) => html ` <wpp-segmented-control-v4-3-0 .size="${args.size}" variant="icon" value="grid">
    <wpp-segmented-control-item-v4-3-0 variant="icon" value="grid" .ariaProps=${{ tab: { label: 'Home' } }}>
      <wpp-icon-home-v4-3-0 />
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0
      .disabled="${args.disabled}"
      variant="icon"
      value="list"
      .ariaProps="${{ tab: { label: 'Dashboard' } }}"
    >
      <wpp-icon-board-v4-3-0 />
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 variant="icon" value="grid2" .ariaProps="${{ tab: { label: 'Web' } }}">
      <wpp-icon-globe-v4-3-0 />
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 variant="icon" value="list2" .ariaProps="${{ tab: { label: 'Design' } }}">
      <wpp-icon-design-v4-3-0 />
    </wpp-segmented-control-item-v4-3-0>
    <wpp-segmented-control-item-v4-3-0 variant="icon" value="list3" .ariaProps="${{ tab: { label: 'Phone' } }}">
      <wpp-icon-styleguide-v4-3-0 />
    </wpp-segmented-control-item-v4-3-0>
  </wpp-segmented-control-v4-3-0>`;
Icon.args = {
  disabled: false,
  size: 'm',
};
