import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Actions/Regular button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
  },
};
export const Primary = (args) => {
  const divStyles = args.inverted
    ? {
      backgroundColor: 'var(--wpp-grey-color-900)',
      padding: '24px',
    }
    : { padding: '24px' };
  return html ` <div style=${styleMap(divStyles)}>
    <wpp-button-v2-22-0
      .size="${args.size}"
      .text="${args.text}"
      .disabled="${args.disabled}"
      .inverted="${args.inverted}"
      .loading="${args.loading}"
      variant="primary"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.showIconStart
    ? html `
            <wpp-icon-plus-v2-22-0
              slot="icon-start"
              @click="${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}"
            ></wpp-icon-plus-v2-22-0>
          `
    : null}
      ${args.text}
      ${args.showIconEnd
    ? html `
            <wpp-icon-chevron-v2-22-0
              slot="icon-end"
              direction="down"
              @click="${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}"
            ></wpp-icon-chevron-v2-22-0>
          `
    : null}
    </wpp-button-v2-22-0>
  </div>`;
};
Primary.args = {
  text: 'Button',
  size: 'm',
  disabled: false,
  inverted: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
};
export const Secondary = (args) => {
  const divStyles = args.inverted
    ? {
      backgroundColor: 'var(--wpp-grey-color-900)',
      padding: '24px',
    }
    : { padding: '24px' };
  return html ` <div style=${styleMap(divStyles)}>
    <wpp-button-v2-22-0
      .size="${args.size}"
      .disabled="${args.disabled}"
      .inverted="${args.inverted}"
      .loading="${args.loading}"
      variant="secondary"
      @click="${() => console.log('Button clicked')}"
    >
      ${args.showIconStart
    ? html `
            <wpp-icon-plus-v2-22-0
              slot="icon-start"
              @click="${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}"
            ></wpp-icon-plus-v2-22-0>
          `
    : null}
      ${args.text}
      ${args.showIconEnd
    ? html `
            <wpp-icon-chevron-v2-22-0
              slot="icon-end"
              direction="down"
              @click="${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}"
            ></wpp-icon-chevron-v2-22-0>
          `
    : null}
    </wpp-button-v2-22-0>
  </div>`;
};
Secondary.args = {
  text: 'Button',
  size: 'm',
  disabled: false,
  inverted: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
};
export const Destructive = (args) => html ` <wpp-button-v2-22-0
  .size="${args.size}"
  .disabled="${args.disabled}"
  .loading="${args.loading}"
  .variant="${args.secondary ? 'destructive-secondary' : 'destructive'}"
  @click="${() => console.log('Button clicked')}"
  >${args.text}</wpp-button-v2-22-0
>`;
Destructive.args = {
  text: 'Button',
  size: 'm',
  disabled: false,
  loading: false,
  secondary: false,
};
