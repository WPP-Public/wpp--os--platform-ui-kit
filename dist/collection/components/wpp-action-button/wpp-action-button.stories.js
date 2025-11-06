import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Actions/Action button',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
};
export const Primary = (args) => html ` <wpp-action-button-v2-22-0
  .disabled="${args.disabled}"
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
        <wpp-icon-plus-v2-22-0
          slot="icon-end"
          @click="${(e) => {
    e.stopPropagation();
    console.log('Right icon clicked');
  }}"
        ></wpp-icon-plus-v2-22-0>
      `
  : null}
</wpp-action-button-v2-22-0>`;
Primary.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
};
export const Secondary = (args) => html ` <wpp-action-button-v2-22-0
  .disabled="${args.disabled}"
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
        <wpp-icon-plus-v2-22-0
          slot="icon-end"
          @click="${(e) => {
    e.stopPropagation();
    console.log('Right icon clicked');
  }}"
        ></wpp-icon-plus-v2-22-0>
      `
  : null}
</wpp-action-button-v2-22-0>`;
Secondary.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
};
export const Inverted = (args) => html ` <div
  style=${styleMap({
  backgroundColor: 'var(--wpp-grey-color-800)',
  padding: '24px',
})}
>
  <wpp-action-button-v2-22-0
    .disabled="${args.disabled}"
    .loading="${args.loading}"
    variant="inverted"
    @click="${() => console.log('Button clicked')}"
  >
    ${args.text}
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
    ${args.showIconEnd
  ? html `
          <wpp-icon-plus-v2-22-0
            slot="icon-end"
            @click="${(e) => {
    e.stopPropagation();
    console.log('Right icon clicked');
  }}"
          ></wpp-icon-plus-v2-22-0>
        `
  : null}
  </wpp-action-button-v2-22-0>
</div>`;
Inverted.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
};
export const Destructive = (args) => html ` <wpp-action-button-v2-22-0
  .disabled="${args.disabled}"
  .loading="${args.loading}"
  variant="destructive"
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
        <wpp-icon-plus-v2-22-0
          slot="icon-end"
          @click="${(e) => {
    e.stopPropagation();
    console.log('Right icon clicked');
  }}"
        ></wpp-icon-plus-v2-22-0>
      `
  : null}
</wpp-action-button-v2-22-0>`;
Destructive.args = {
  text: 'Button',
  disabled: false,
  loading: false,
  showIconStart: false,
  showIconEnd: false,
};
