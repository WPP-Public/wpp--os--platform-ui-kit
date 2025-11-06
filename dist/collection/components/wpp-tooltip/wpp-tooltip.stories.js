import { html } from 'lit-html';
import readme from './readme.md';
import { styleMap } from 'lit-html/directives/style-map';
export default {
  title: 'Design System/Components/Feedback/Tooltip',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    config: {
      control: 'object',
    },
    wordBreak: {
      options: ['break-word', 'break-all', 'auto-phrase'],
      control: { type: 'select' },
    },
    theme: {
      options: ['dark', 'light'],
      control: { type: 'select' },
    },
  },
};
export const Text = (args) => html `
  <wpp-tooltip-v2-22-0
    .dropdownWidth="${args.dropdownWidth}"
    .text="${args.text}"
    .config="${args.config}"
    .theme="${args.theme}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v2-22-0 variant="primary">Button</wpp-button-v2-22-0>
  </wpp-tooltip-v2-22-0>
`;
Text.args = {
  text: 'Tooltip Text',
  config: {},
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
Text.parameters = {
  layout: 'centered',
};
export const TitleAndText = (args) => html `
  <wpp-tooltip-v2-22-0
    .dropdownWidth="${args.dropdownWidth}"
    .header="${args.header}"
    .text="${args.text}"
    .theme="${args.theme}"
    .config="${args.config}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v2-22-0 variant="primary">Button</wpp-button-v2-22-0>
  </wpp-tooltip-v2-22-0>
`;
TitleAndText.args = {
  header: 'Title',
  text: 'Some description text',
  config: {},
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
TitleAndText.parameters = {
  layout: 'centered',
};
export const Value = (args) => html ` <wpp-tooltip-v2-22-0
  .text="${args.text}"
  .value="${args.value}"
  .theme="${args.theme}"
  .config="${args.config}"
  .dropdownWidth="${args.dropdownWidth}"
  .wordBreak="${args.wordBreak}"
>
  <wpp-button-v2-22-0 variant="primary">Button</wpp-button-v2-22-0>
</wpp-tooltip-v2-22-0>`;
Value.args = {
  text: 'Label',
  value: '$100,000',
  config: {},
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
Value.parameters = {
  layout: 'centered',
};
export const Error = (args) => html ` <wpp-tooltip-v2-22-0
  .text="${args.text}"
  .config="${args.config}"
  .dropdownWidth="${args.dropdownWidth}"
  .wordBreak="${args.wordBreak}"
  error
>
  <wpp-button-v2-22-0 variant="destructive">Error tooltip</wpp-button-v2-22-0>
</wpp-tooltip-v2-22-0>`;
Error.args = {
  text: 'Tooltip Text',
  config: {},
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
Error.parameters = {
  layout: 'centered',
};
export const Placement = (args) => html ` <wpp-typography-v2-22-0
    type="s-body"
    style="margin-bottom: 25px"
  >
    The page can be scrolled to move the block to the side of the screen and test how the tooltip shows up. The tooltip
    can only appear when is enough space for it, otherwise, it will be mirrored
  </wpp-typography-v2-22-0>
  <div
    id="wrapper"
    style="width:100%; height: 100%; background-color: var(--wpp-grey-color-100); border-radius: 10px;
    margin: auto; border: 2px dashed var(--wpp-primary-color-600);"
  >
    <div style="display: inline-block; margin: 750px 1300px 1000px 700px">
      <wpp-tooltip-v2-22-0
        .text="${args.text}"
        .config="${args.config}"
        .theme="${args.theme}"
        .dropdownWidth="${args.dropdownWidth}"
        .wordBreak="${args.wordBreak}"
      >
        <wpp-button-v2-22-0 variant="primary">Button</wpp-button-v2-22-0>
      </wpp-tooltip-v2-22-0>
    </div>
  </div>`;
Placement.args = {
  text: 'Tooltip Text',
  config: {
    placement: 'top',
  },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
Placement.parameters = {
  layout: 'centered',
};
export const Warning = (args) => html `
  <wpp-tooltip-v2-22-0
    .wordBreak="${args.wordBreak}"
    .dropdownWidth="${args.dropdownWidth}"
    .text="${args.text}"
    .config="${args.config}"
    warning
  >
    <wpp-button-v2-22-0 variant="primary">Warning Tooltip</wpp-button-v2-22-0>
  </wpp-tooltip-v2-22-0>
`;
Warning.args = {
  text: 'Warning Text',
  config: { placement: 'bottom' },
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
Warning.parameters = {
  layout: 'centered',
};
const styles = {
  listItemDark: {
    '--wpp-typography-s-body-color': 'var(--wpp-grey-color-000)',
    '--li-bg-color-hover': 'var(--wpp-grey-color-700)',
    '--li-bg-color-active': 'var(--wpp-grey-color-600)',
  },
};
export const CustomContent = (args) => html `
  <wpp-tooltip-v2-22-0
    .dropdownWidth="${args.dropdownWidth}"
    .text="${args.text}"
    .config="${args.config}"
    .theme="${args.theme}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v2-22-0 data-testid="allow-html-tooltip-button">Tooltip with Custom Content</wpp-button-v2-22-0>
    <div slot="tooltip-content">
      <wpp-list-item-v2-22-0 style=${args.theme === 'dark' ? styleMap(styles.listItemDark) : {}}>
        <span slot="label">List Item</span>
      </wpp-list-item-v2-22-0>

      <wpp-list-item-v2-22-0 style=${args.theme === 'dark' ? styleMap(styles.listItemDark) : {}}>
        <span slot="label">List Item</span>
      </wpp-list-item-v2-22-0>

      <wpp-list-item-v2-22-0 style=${args.theme === 'dark' ? styleMap(styles.listItemDark) : {}}>
        <span slot="label">List Item</span>
      </wpp-list-item-v2-22-0>
    </div>
  </wpp-tooltip-v2-22-0>
`;
CustomContent.args = {
  text: 'Tooltip Text',
  config: {
    allowHTML: true,
    placement: 'right',
  },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
CustomContent.parameters = {
  layout: 'centered',
};
export const MultilineText = (args) => html `
  <wpp-tooltip-v2-22-0
    .dropdownWidth="${args.dropdownWidth}"
    .text="${args.text}"
    .config="${args.config}"
    .wordBreak="${args.wordBreak}"
    .theme="${args.theme}"
  >
    <wpp-button-v2-22-0 variant="primary">Tooltip text on multiple lines</wpp-button-v2-22-0>
  </wpp-tooltip-v2-22-0>
`;
MultilineText.args = {
  text: 'Lorem ipsum\n\nDolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation\n\nFugiat nulla pariatur',
  config: {
    placement: 'top',
  },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
MultilineText.parameters = {
  layout: 'centered',
};
