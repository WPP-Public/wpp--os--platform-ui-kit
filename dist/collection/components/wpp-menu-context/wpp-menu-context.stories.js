import { html } from 'lit-html';
const customViewports = {
  size: {
    name: 'XLarge',
    styles: {
      width: '1800px',
      height: '1963px',
    },
  },
};
export default {
  title: 'Design System/Components/Data display/Menu Context',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    viewport: {
      viewports: customViewports,
    },
    argTypes: {
      listWidth: {
        control: { type: 'text' },
      },
      additionalItemsCount: {
        control: { type: 'number' },
      },
      additionalItemsCountForFirstNestedContext: {
        control: { type: 'number' },
      },
      additionalItemsCountForSecondNestedContext: {
        control: { type: 'number' },
      },
      header: {
        control: { type: 'text' },
      },
      withDivider: {
        options: [true, false],
        control: { type: 'boolean' },
      },
      dropdownConfig: {
        control: 'object',
      },
    },
  },
};
export const MenuGroup = (args) => html ` <wpp-menu-context-v3-5-0 .listWidth="${args.listWidth}" .dropdownConfig="${args.dropdownConfig}">
    <wpp-icon-button-v3-5-0 slot="trigger-element">
      <wpp-icon-more-v3-5-0 direction="horizontal" />
    </wpp-icon-button-v3-5-0>
    <div>
      <wpp-menu-group-v3-5-0 header="admin">
        <wpp-list-item-v3-5-0><p slot="label">Tenant</p></wpp-list-item-v3-5-0>
        <wpp-list-item-v3-5-0><p slot="label">Client</p></wpp-list-item-v3-5-0>
        <wpp-menu-context-v3-5-0 .appendToListWrapper="${true}">
          <wpp-list-item-v3-5-0 slot="trigger-element" .isExtended="${true}">
            <p slot="label">Apps & Roles</p>
          </wpp-list-item-v3-5-0>
          <div>
            <wpp-menu-group-v3-5-0 header="Apps" />
            <wpp-list-item-v3-5-0>
              <p slot="label">Marketing App 1</p>
            </wpp-list-item-v3-5-0>
            <wpp-menu-context-v3-5-0 .appendToListWrapper="${true}" .listWidth="${args.listWidth}">
              <wpp-list-item-v3-5-0 slot="trigger-element" .isExtended="${true}">
                <p slot="label">Marketing App 2</p>
              </wpp-list-item-v3-5-0>
              <div>
                <wpp-list-item-v3-5-0>
                  <p slot="label">Sub App 1</p>
                </wpp-list-item-v3-5-0>
                <wpp-list-item-v3-5-0>
                  <p slot="label">Sub App 2</p>
                </wpp-list-item-v3-5-0>
                <wpp-list-item-v3-5-0>
                  <p slot="label">Sub App 3</p>
                </wpp-list-item-v3-5-0>
              </div>
            </wpp-menu-context-v3-5-0>
            <wpp-list-item-v3-5-0>
              <p slot="label">Marketing App 3</p>
            </wpp-list-item-v3-5-0>
            <wpp-menu-group-v3-5-0 header="Roles" />
            <wpp-list-item-v3-5-0>
              <p slot="label">Programme Role 1</p>
            </wpp-list-item-v3-5-0>
            <wpp-list-item-v3-5-0>
              <p slot="label">Programme Role 2</p>
            </wpp-list-item-v3-5-0>
            <wpp-list-item-v3-5-0>
              <p slot="label">Programme Role 3</p>
            </wpp-list-item-v3-5-0>
          </div>
        </wpp-menu-context-v3-5-0>
        <wpp-list-item-v3-5-0><p slot="label">Users & groups</p></wpp-list-item-v3-5-0>
      </wpp-menu-group-v3-5-0>
      <wpp-menu-group-v3-5-0 .header="${args.header}" .withDivider="${args.withDivider}">
        <wpp-list-item-v3-5-0><p slot="label">Text</p></wpp-list-item-v3-5-0>
        <wpp-list-item-v3-5-0><p slot="label">Settings</p></wpp-list-item-v3-5-0>
        <wpp-list-item-v3-5-0><p slot="label">Send feedback</p></wpp-list-item-v3-5-0>
      </wpp-menu-group-v3-5-0>
      <wpp-list-item-v3-5-0>
        <wpp-icon-logout-v3-5-0 slot="left"></wpp-icon-logout-v3-5-0>
        <p slot="label">Sign out</p>
      </wpp-list-item-v3-5-0>
    </div>
  </wpp-menu-context-v3-5-0>`;
MenuGroup.args = {
  listWidth: '150px',
  header: 'group title',
  withDivider: true,
  dropdownConfig: {},
};
MenuGroup.parameters = {
  controls: {
    exclude: [
      'additionalItemsCount',
      'additionalItemsCountForFirstNestedContext',
      'additionalItemsCountForSecondNestedContext',
    ],
  },
};
