import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';
import useState from 'storybook-addon-state';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Feedback/Banner',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    type: {
      options: ['warning', 'information'],
      control: { type: 'select' },
    },
  },
};
const initNavigation = [
  {
    label: 'Home',
    value: 'home',
    path: '/home',
  },
  {
    label: 'Client services',
    value: 'clientServices',
    path: '/client-services',
  },
  {
    label: 'Learning',
    value: 'learning',
    children: [
      {
        label: 'Guided tour',
        value: 'guidedTour',
        path: '/learning/guided-tour',
      },
      {
        label: 'Case studies',
        value: 'caseStudies',
        path: '/learning/case-studies',
      },
      {
        label: 'Community',
        value: 'community',
        path: '/learning/community',
      },
    ],
  },
  {
    label: 'Marketplace',
    value: 'marketplace',
    path: '/marketplace',
  },
  {
    label: 'Dev portal',
    value: 'devPortal',
    path: '/devPortal',
  },
];
const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 2px rgb(52 58 63 / 5%), 0 2px 8px rgb(52 58 63 / 12%)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    zIndex: '100',
    position: 'sticky',
    backgroundColor: 'white',
    top: '0',
  },
  app: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '32px',
  },
  appName: {
    whiteSpace: 'nowrap',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    top: '0',
    position: 'sticky',
    backgroundColor: '#f8f9fb',
  },
  banner: {
    top: '48px',
  },
  body: {
    padding: '24px 38px',
    backgroundColor: '#f8f9fb',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    width: '270px',
    display: 'inline-flex',
    justifyContent: 'space-between',
  },
  scrollWrapper: {
    height: '1000px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export const NoTopBar = (args) => html ` <wpp-banner-v2-22-0
  .show="${true}"
  .closable="${args.closable}"
  .type="${args.type}"
>
  Warning message
  ${args.withActions
  ? html `
        ${args.type === 'warning'
    ? html ` <wpp-action-button-v2-22-0 variant="secondary" slot="actions">Action</wpp-action-button-v2-22-0>`
    : null}
        ${args.type === 'information'
    ? html ` <wpp-action-button-v2-22-0 variant="inverted" slot="actions">Action</wpp-action-button-v2-22-0>`
    : null}
        </div>
      `
  : null}
</wpp-banner-v2-22-0>`;
NoTopBar.args = {
  type: 'warning',
  closable: false,
  withActions: false,
};
export const WithTopBar = (args) => {
  const [isToShowBanner, setIsToShowBanner] = useState('showBanner', false);
  const [value, setValue] = useState('value', initNavigation[0].value);
  const handleTopbarItemChange = (event) => {
    setValue(event.detail.value);
  };
  const handleBannerShowStateChange = (event) => {
    setIsToShowBanner(event.detail.show);
  };
  const handleShowBanner = () => {
    setIsToShowBanner(true);
  };
  const handleCloseBanner = () => {
    setIsToShowBanner(false);
  };
  return html ` <div style=${styleMap(styles.page)}>
    <div style=${styleMap(styles.header)}>
      <wpp-topbar-v2-22-0 .navigation="${initNavigation}" .value="${value}" @wppChange="${handleTopbarItemChange}">
        <div slot="app" style=${styleMap(styles.app)}>
          <wpp-typography-v2-22-0 type="m-strong" tag="h3" style=${styleMap(styles.appName)}>
            APP Name
          </wpp-typography-v2-22-0>
        </div>
      </wpp-topbar-v2-22-0>
    </div>
    <div style=${styleMap(styles.container)}>
      <wpp-banner-v2-22-0
        .type="${args.type}"
        .show="${isToShowBanner}"
        .closable="${args.closable}"
        @wppClose="${handleBannerShowStateChange}"
        style=${styleMap(styles.banner)}
      >
        Banners should be used thoughtfully for only the most important information and can contain maximum 1 line of
        text.
        ${args.withActions
    ? html `
              ${args.type === 'warning'
      ? html `<wpp-action-button-v2-22-0 variant="secondary" slot="actions">
                    Action
                  </wpp-action-button-v2-22-0>`
      : null}
              ${args.type === 'information'
      ? html ` <wpp-action-button-v2-22-0 variant="inverted" slot="actions">Action</wpp-action-button-v2-22-0>`
      : null}
            `
    : null}
      </wpp-banner-v2-22-0>
      <div style=${styleMap(styles.body)}>
        <div style=${styleMap(styles.section)}>
          <wpp-typography-v2-22-0 type="3xl-heading">Scrollable section</wpp-typography-v2-22-0>
          <div style=${styleMap(styles.actions)}>
            <wpp-button-v2-22-0 variant="secondary" @click="${handleShowBanner}"> Show Banner</wpp-button-v2-22-0>
            <wpp-button-v2-22-0 variant="primary" @click="${handleCloseBanner}"> Close Banner</wpp-button-v2-22-0>
          </div>
        </div>
        <div style=${styleMap(styles.scrollWrapper)} />
      </div>
    </div>
  </div>`;
};
WithTopBar.args = {
  type: 'information',
  closable: false,
  withActions: false,
};
