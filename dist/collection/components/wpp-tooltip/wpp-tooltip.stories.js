import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Feedback/Tooltip',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
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
export const TitleAndText = (args) => html `
  <wpp-tooltip-v4-2-0
    .dropdownWidth="${args.dropdownWidth}"
    .header="${args.header}"
    .text="${args.text}"
    .theme="${args.theme}"
    .config="${args.config}"
    .wordBreak="${args.wordBreak}"
    .warning="${args.warning}"
    .error="${args.error}"
  >
    <wpp-button-v4-2-0 variant="${args.error ? 'destructive' : 'primary'}">
      ${args.error ? 'Error tooltip' : args.warning ? 'Warning tooltip' : 'Tooltip'}
    </wpp-button-v4-2-0>
  </wpp-tooltip-v4-2-0>
`;
TitleAndText.args = {
  header: 'Title',
  text: 'Lorem ipsum\n\nDolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation\n\nFugiat nulla pariatur',
  config: { placement: 'bottom' },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
  warning: false,
  error: false,
};
TitleAndText.parameters = {
  layout: 'centered',
};
export const Value = (args) => html ` <wpp-tooltip-v4-2-0
    .text="${args.text}"
    .value="${args.value}"
    .theme="${args.theme}"
    .config="${args.config}"
    .dropdownWidth="${args.dropdownWidth}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v4-2-0 variant="primary">Button</wpp-button-v4-2-0>
  </wpp-tooltip-v4-2-0>`;
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
const styles = {
  typographyDark: 'var(--wpp-grey-color-000)',
  typographyLight: 'var(--wpp-grey-color-900)',
};
export const TextShortcut = (args) => html `
  <wpp-tooltip-v4-2-0
    .dropdownWidth="${args.dropdownWidth}"
    .text="${args.text}"
    .config="${args.config}"
    .theme="${args.theme}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v4-2-0 data-testid="allow-html-tooltip-button">Tooltip with Shortcut</wpp-button-v4-2-0>
    <div slot="tooltip-content" style="display: flex; align-items: center; gap: 10px;">
      <wpp-typography-v4-2-0
        tag="h2"
        type="m-body"
        color=${args.theme === 'dark' ? styles.typographyDark : styles.typographyLight}
        >${args.text}
      </wpp-typography-v4-2-0>
      <wpp-tag-v4-2-0 variant="neutral" label="S" />
    </div>
  </wpp-tooltip-v4-2-0>
`;
TextShortcut.args = {
  text: 'Tooltip Text',
  config: {
    allowHTML: true,
    placement: 'right',
  },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
};
TextShortcut.parameters = {
  layout: 'centered',
};
