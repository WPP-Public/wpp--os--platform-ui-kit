import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
const meta = {
  title: 'Design System/Components/Actions/Action button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
};
export default meta;
// === Primary ===
export const Primary = {
  args: {
    text: 'Button',
    disabled: false,
    loading: false,
    showIconStart: false,
    showIconEnd: false,
  },
  render: args => html `
    <wpp-action-button-v3-6-0
      .disabled=${args.disabled}
      .loading=${args.loading}
      variant="primary"
      @click=${() => console.log('Button clicked')}
    >
      ${args.showIconStart
    ? html `<wpp-icon-plus-v3-6-0
            slot="icon-start"
            @click=${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}
          ></wpp-icon-plus-v3-6-0>`
    : null}
      ${args.text}
      ${args.showIconEnd
    ? html `<wpp-icon-plus-v3-6-0
            slot="icon-end"
            @click=${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}
          ></wpp-icon-plus-v3-6-0>`
    : null}
    </wpp-action-button-v3-6-0>
  `,
};
// === Secondary ===
export const Secondary = {
  ...Primary,
  render: args => html `
    <wpp-action-button-v3-6-0
      .disabled=${args.disabled}
      .loading=${args.loading}
      variant="secondary"
      @click=${() => console.log('Button clicked')}
    >
      ${args.showIconStart
    ? html `<wpp-icon-plus-v3-6-0
            slot="icon-start"
            @click=${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}
          ></wpp-icon-plus-v3-6-0>`
    : null}
      ${args.text}
      ${args.showIconEnd
    ? html `<wpp-icon-plus-v3-6-0
            slot="icon-end"
            @click=${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}
          ></wpp-icon-plus-v3-6-0>`
    : null}
    </wpp-action-button-v3-6-0>
  `,
};
// === Inverted ===
export const Inverted = {
  ...Primary,
  render: args => html `
    <div style=${styleMap({ backgroundColor: 'var(--wpp-grey-color-800)', padding: '24px' })}>
      <wpp-action-button-v3-6-0
        .disabled=${args.disabled}
        .loading=${args.loading}
        variant="inverted"
        @click=${() => console.log('Button clicked')}
      >
        ${args.showIconStart
    ? html `<wpp-icon-plus-v3-6-0
              slot="icon-start"
              @click=${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}
            ></wpp-icon-plus-v3-6-0>`
    : null}
        ${args.text}
        ${args.showIconEnd
    ? html `<wpp-icon-plus-v3-6-0
              slot="icon-end"
              @click=${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}
            ></wpp-icon-plus-v3-6-0>`
    : null}
      </wpp-action-button-v3-6-0>
    </div>
  `,
};
// === Destructive ===
export const Destructive = {
  ...Primary,
  render: args => html `
    <wpp-action-button-v3-6-0
      .disabled=${args.disabled}
      .loading=${args.loading}
      variant="destructive"
      @click=${() => console.log('Button clicked')}
    >
      ${args.showIconStart
    ? html `<wpp-icon-plus-v3-6-0
            slot="icon-start"
            @click=${(e) => {
      e.stopPropagation();
      console.log('Left icon clicked');
    }}
          ></wpp-icon-plus-v3-6-0>`
    : null}
      ${args.text}
      ${args.showIconEnd
    ? html `<wpp-icon-plus-v3-6-0
            slot="icon-end"
            @click=${(e) => {
      e.stopPropagation();
      console.log('Right icon clicked');
    }}
          ></wpp-icon-plus-v3-6-0>`
    : null}
    </wpp-action-button-v3-6-0>
  `,
};
