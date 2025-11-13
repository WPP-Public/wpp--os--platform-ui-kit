import { html } from 'lit-html';
const handleTypographyType = (size) => {
  if (size === 's')
    return 's-strong';
  if (size === 'm')
    return 'm-strong';
  if (size === 'l')
    return 'l-strong';
  if (size === 'xl')
    return 'xl-heading';
  if (size === '2xl')
    return '2xl-heading';
};
export default {
  title: 'Design System/Components/Data display/Accordion',
  component: 'wpp-accordion',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    expanded: { control: 'boolean' },
    size: {
      options: ['s', 'm', 'l', 'xl', '2xl'],
      control: 'select',
    },
    withTag: { control: 'boolean' },
    header: { control: 'text' },
    withActions: { control: 'boolean' },
    withDivider: { control: 'boolean' },
  },
};
export const Accordion = {
  render: args => html `
    <div style="width: 600px">
      <wpp-accordion-v3-3-1 .size="${args.size}" .withTag="${args.withTag}" .disabled="${args.disabled}">
        <wpp-typography-v3-3-1 slot="header" type=${handleTypographyType(args.size)}>
          Commitments & Responsibilities
        </wpp-typography-v3-3-1>
        <wpp-typography-v3-3-1>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look
          like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
          default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the
          like). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look
          like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
          default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the
          like). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum. It is a long established fact that a reader will be distracted by
          the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look
          like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
          default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various
          versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the
          like).
        </wpp-typography-v3-3-1>
        ${args.withTag ? html `<wpp-tag-v3-3-1 slot="tags" label="Neutral" variant="neutral"></wpp-tag-v3-3-1>` : null}
      </wpp-accordion-v3-3-1>

      <wpp-accordion-v3-3-1
        .disabled="${args.disabled}"
        .withTag="${args.withTag}"
        .expanded="${args.expanded}"
        .size="${args.size}"
        key="${args.header}"
      >
        <wpp-typography-v3-3-1 slot="header" type=${handleTypographyType(args.size)}>
          ${args.header}
        </wpp-typography-v3-3-1>
        <wpp-typography-v3-3-1 type="s-body">
          Dive into our constant search for cutting edge scientific discoveries and game-changing technologies, for more
          and more transparency and trust in our products, with no compromise on quality, efficacy and safety.
        </wpp-typography-v3-3-1>
        ${args.withActions
    ? html `
              <div style="display: flex; align-items: center" slot="actions">
                <wpp-action-button-v3-3-1 .disabled="${args.disabled}" variant="secondary" style="margin-right: 4px">
                  Actions 2
                  <wpp-icon-premium-v3-3-1 slot="icon-start"></wpp-icon-premium-v3-3-1>
                </wpp-action-button-v3-3-1>
                <wpp-action-button-v3-3-1 .disabled="${args.disabled}" variant="secondary">
                  Actions 1
                  <wpp-icon-edit-v3-3-1 slot="icon-start"></wpp-icon-edit-v3-3-1>
                </wpp-action-button-v3-3-1>
              </div>
            `
    : null}
        ${args.withTag
    ? html `<wpp-tag-v3-3-1
              slot="tags"
              label="Neutral"
              variant="neutral"
              .disabled="${args.disabled}"
            ></wpp-tag-v3-3-1>`
    : null}
      </wpp-accordion-v3-3-1>

      <wpp-accordion-v3-3-1
        .size="${args.size}"
        .withTag="${args.withTag}"
        .withDivider="${args.withDivider}"
        .disabled="${args.disabled}"
      >
        <wpp-typography-v3-3-1 slot="header" type=${handleTypographyType(args.size)}>
          Governance & Ethics
        </wpp-typography-v3-3-1>
        <wpp-typography-v3-3-1 type="s-body">
          Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a
          business imperative for ensuring sustainable success.
        </wpp-typography-v3-3-1>
        ${args.withTag ? html `<wpp-tag-v3-3-1 slot="tags" label="Neutral" variant="neutral"></wpp-tag-v3-3-1>` : null}
      </wpp-accordion-v3-3-1>
    </div>
  `,
  args: {
    disabled: false,
    expanded: false,
    size: 'm',
    header: 'Exploring the Convergence of Beauty, Science, and Technology to Shape the Future of Sustainable Innovations and Advanced Personal Care Solutions',
    withDivider: false,
    withActions: false,
    withTag: false,
  },
};
