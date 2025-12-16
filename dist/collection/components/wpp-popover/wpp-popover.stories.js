import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import './wpp-popover-stories.css';
export default {
  title: 'Design System/Components/Surfaces/Popover',
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
    ariaProps: {
      control: 'object',
    },
  },
};
const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 8px 7px 16px',
    maxWidth: 'calc(100% - 30px)',
  },
  divider: {
    '--divider-bg-color': 'var(--wpp-grey-color-300)',
  },
  text: {
    height: 'fit-content',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '8px',
  },
  button: {
    marginRight: '4px',
  },
};
export const Popover = (args) => {
  const handleTextPlacement = (withActions, withScroll) => {
    if (!withActions && !withScroll)
      return 'inherit';
    return 'space-between';
  };
  const getPadding = (withHeader, withScroll, withActions) => {
    if (!withHeader && !withScroll && !withActions)
      return '12px 16px 16px 16px';
    return '8px 12px 8px 16px';
  };
  return html `
    <wpp-popover-v3-4-0
      .config="${args.config}"
      .closable="${args.withHeader && args.closable}"
      .dropdownWidth="${args.dropdownWidth}"
      .ariaProps="${args.ariaProps}"
    >
      <wpp-button-v3-4-0 variant="secondary" slot="trigger-element">Trigger Button</wpp-button-v3-4-0>
      <div
        style="display: flex; flex-direction: column; width:100%; height:200px; justify-content: ${handleTextPlacement(args.withActions, args.withScroll)}"
      >
        ${args.withHeader
    ? html `<div style=${styleMap(styles.header)}>
              <wpp-typography-v3-4-0 type="m-strong">Title</wpp-typography-v3-4-0>
            </div>`
    : null}
        ${args.withScroll
    ? html ` ${args.withHeader
      ? html `<wpp-divider-v3-4-0 style=${styleMap(styles.divider)}></wpp-divider-v3-4-0>`
      : null}
              <div
                style="display: flex; overflow-y: auto; padding: ${getPadding(args.withHeader, args.withScroll, args.withActions)}"
                class="body"
              >
                <wpp-typography-v3-4-0 type="s-body" style=${styleMap(styles.text)} class="text">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                  release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                  software like Aldus PageMaker including.
                </wpp-typography-v3-4-0>
              </div>
              ${args.withActions
      ? html `<wpp-divider-v3-4-0 style=${styleMap(styles.divider)}></wpp-divider-v3-4-0>`
      : null}`
    : html ` <div
              style="display: flex; overflow-y: auto; padding: ${getPadding(args.withHeader, args.withScroll, args.withActions)}"
              class="body"
            >
              <wpp-typography-v3-4-0 type="s-body" style=${styleMap(styles.text)} class="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.It has been the industry's
                standard text
              </wpp-typography-v3-4-0>
            </div>`}
        ${args.withActions
    ? html ` <div style=${styleMap(styles.actions)}>
              <wpp-action-button-v3-4-0 variant="secondary" style=${styleMap(styles.button)}>
                Button
              </wpp-action-button-v3-4-0>

              <wpp-action-button-v3-4-0 variant="primary">Button</wpp-action-button-v3-4-0>
            </div>`
    : null}
      </div>
    </wpp-popover-v3-4-0>
  `;
};
Popover.args = {
  withHeader: true,
  withActions: true,
  withScroll: true,
  closable: true,
  config: {},
  dropdownWidth: '260px',
  ariaProps: {
    label: 'popover label',
  },
};
export const PopoverWithSearch = (args) => html `
  <wpp-popover-v3-4-0
    .dropdownWidth="${args.dropdownWidth}"
    .persistantSearch="${args.persistantSearch}"
    .withSearch="${args.withSearch}"
    .searchName="${args.searchName}"
    .searchValue="${args.searchValue}"
    @wppSearchChange="${(e) => {
  console.log('On change search event:', e);
  const el = document.querySelector('.wpp-popover');
  if (el) {
    const popoverEl = el;
    popoverEl.searchValue = e.detail.value;
  }
}}"
  >
    <wpp-button-v3-4-0 variant="secondary" slot="trigger-element">Trigger Button</wpp-button-v3-4-0>
    <div style="display: flex; flex-direction: column; width:100%; height:200px; padding: 10px 20px;">
      <wpp-typography-v3-4-0 type="s-body">Content inside the popover.</wpp-typography-v3-4-0>
    </div>
  </wpp-popover-v3-4-0>
`;
PopoverWithSearch.args = {
  dropdownWidth: '260px',
  withSearch: true,
  persistantSearch: false,
  searchName: 'Popover search',
  searchValue: '',
};
PopoverWithSearch.parameters = {
  controls: { exclude: ['config'] },
};
