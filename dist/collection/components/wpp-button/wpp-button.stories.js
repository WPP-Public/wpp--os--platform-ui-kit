import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
const meta = {
  title: 'Design System/Components/Actions/Regular button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    buttonWidth: {
      options: [undefined, '170px', '300px'],
      control: { type: 'select' },
    },
  },
};
export default meta;
// Primary
export const Primary = {
  args: {
    text: 'Button',
    size: 'm',
    disabled: false,
    inverted: false,
    loading: false,
    showIconStart: false,
    showIconEnd: false,
  },
  render: args => {
    const divStyles = args.inverted
      ? { backgroundColor: 'var(--wpp-grey-color-900)', padding: '24px' }
      : { padding: '24px' };
    return html `
      <div style=${styleMap(divStyles)}>
        <style>
          .wpp-button::part(button) {
            width: ${args.buttonWidth};
          }
        </style>

        <wpp-button-v4-1-0
          .size=${args.size}
          .text=${args.text}
          .disabled=${args.disabled}
          .inverted=${args.inverted}
          .loading=${args.loading}
          variant="primary"
          @click=${() => console.log('Button clicked')}
        >
          ${args.showIconStart
      ? html `<wpp-icon-plus-v4-1-0
                slot="icon-start"
                @click=${(e) => {
        e.stopPropagation();
        console.log('Left icon clicked');
      }}
              ></wpp-icon-plus-v4-1-0>`
      : null}
          ${args.text}
          ${args.showIconEnd
      ? html `<wpp-icon-chevron-v4-1-0
                slot="icon-end"
                direction="down"
                @click=${(e) => {
        e.stopPropagation();
        console.log('Right icon clicked');
      }}
              ></wpp-icon-chevron-v4-1-0>`
      : null}
        </wpp-button-v4-1-0>
      </div>
    `;
  },
};
// Secondary
export const Secondary = {
  ...Primary,
  render: args => {
    const divStyles = args.inverted
      ? { backgroundColor: 'var(--wpp-grey-color-900)', padding: '24px' }
      : { padding: '24px' };
    return html `
      <div style=${styleMap(divStyles)}>
        <style>
          .wpp-button::part(button) {
            width: ${args.buttonWidth};
          }
        </style>

        <wpp-button-v4-1-0
          .size=${args.size}
          .disabled=${args.disabled}
          .inverted=${args.inverted}
          .loading=${args.loading}
          variant="secondary"
          @click=${() => console.log('Button clicked')}
        >
          ${args.showIconStart
      ? html `<wpp-icon-plus-v4-1-0
                slot="icon-start"
                @click=${(e) => {
        e.stopPropagation();
        console.log('Left icon clicked');
      }}
              ></wpp-icon-plus-v4-1-0>`
      : null}
          ${args.text}
          ${args.showIconEnd
      ? html `<wpp-icon-chevron-v4-1-0
                slot="icon-end"
                direction="down"
                @click=${(e) => {
        e.stopPropagation();
        console.log('Right icon clicked');
      }}
              ></wpp-icon-chevron-v4-1-0>`
      : null}
        </wpp-button-v4-1-0>
      </div>
    `;
  },
};
export const Destructive = {
  args: {
    text: 'Button',
    size: 'm',
    disabled: false,
    loading: false,
    showIconStart: false,
    showIconEnd: false,
  },
  render: args => html `
    <div style=${styleMap({ padding: '24px' })}>
      <style>
        .wpp-button::part(button) {
          width: ${args.buttonWidth};
        }
      </style>

      <wpp-button-v4-1-0
        .size=${args.size}
        .disabled=${args.disabled}
        .loading=${args.loading}
        variant=${'destructive'}
        @click=${() => console.log('Button clicked')}
      >
        ${args.showIconStart
    ? html `<wpp-icon-plus-v4-1-0
              slot="icon-start"
              @click=${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}
            ></wpp-icon-plus-v4-1-0>`
    : null}
        ${args.text}
        ${args.showIconEnd
    ? html `<wpp-icon-chevron-v4-1-0
              slot="icon-end"
              direction="down"
              @click=${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}
            ></wpp-icon-chevron-v4-1-0>`
    : null}
      </wpp-button-v4-1-0>
    </div>
  `,
};
export const DestructiveSecondary = {
  args: {
    text: 'Button',
    size: 'm',
    disabled: false,
    loading: false,
    showIconStart: false,
    showIconEnd: false,
  },
  render: args => html `
    <div style=${styleMap({ padding: '24px' })}>
      <style>
        .wpp-button::part(button) {
          width: ${args.buttonWidth};
        }
      </style>

      <wpp-button-v4-1-0
        .size=${args.size}
        .disabled=${args.disabled}
        .loading=${args.loading}
        variant=${'destructive-secondary'}
        @click=${() => console.log('Button clicked')}
      >
        ${args.showIconStart
    ? html `<wpp-icon-plus-v4-1-0
              slot="icon-start"
              @click=${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}
            ></wpp-icon-plus-v4-1-0>`
    : null}
        ${args.text}
        ${args.showIconEnd
    ? html `<wpp-icon-chevron-v4-1-0
              slot="icon-end"
              direction="down"
              @click=${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}
            ></wpp-icon-chevron-v4-1-0>`
    : null}
      </wpp-button-v4-1-0>
    </div>
  `,
};
