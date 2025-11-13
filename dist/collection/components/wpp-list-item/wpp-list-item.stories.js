import { html } from 'lit-html';
import slotUsage from './slotUsage.md';
import readMe from './readme.md';
export default {
  title: 'Design System/Components/Data Display/List Item',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  notes: {
    'Slots Usage': slotUsage,
    Examples: readMe,
  },
  argTypes: {
    singleLineOptions: {
      options: [
        'default',
        'with-action-btn',
        'with-chevron',
        'with-tag',
        'with-toggle',
        'with-text',
        'with-icon',
        'with-icon-and-action-btn',
        'with-icon-and-chevron',
        'with-icon-and-tag',
        'with-icon-and-toggle',
        'with-icon-and-text',
        'with-avatar',
        'with-avatar-and-action-btn',
        'with-avatar-and-chevron',
        'with-avatar-and-tag',
        'with-avatar-and-toggle',
        'with-avatar-and-text',
        'with-logo',
        'with-logo-and-action-btn',
        'with-logo-and-chevron',
        'with-logo-and-tag',
        'with-logo-and-toggle',
        'with-logo-and-text',
      ],
      control: { type: 'select' },
    },
    twoLineOptions: {
      options: [
        'default',
        'with-action-btn',
        'with-chevron',
        'with-tag',
        'with-toggle',
        'with-text',
        'with-icon',
        'with-icon-and-action-btn',
        'with-icon-and-chevron',
        'with-icon-and-tag',
        'with-icon-and-toggle',
        'with-icon-and-text',
        'with-avatar',
        'with-avatar-and-action-btn',
        'with-avatar-and-chevron',
        'with-avatar-and-tag',
        'with-avatar-and-toggle',
        'with-avatar-and-text',
        'with-logo',
        'with-logo-and-action-btn',
        'with-logo-and-chevron',
        'with-logo-and-tag',
        'with-logo-and-toggle',
        'with-logo-and-text',
      ],
      control: { type: 'select' },
    },
    labelText: { type: 'string' },
    subtitleText: { type: 'string' },
    labelTypography: {
      control: 'object',
      description: 'Custom Typography for the label (type, color, fontSize, fontWeight)',
    },
    captionTypography: {
      control: 'object',
      description: 'Custom Typography for the caption (type, color, fontSize, fontWeight)',
    },
  },
};
const lineOptionMap = {
  // Basic right content variants
  'with-action-btn': _disabled => html `
    <wpp-action-button-v3-3-1 variant="secondary" slot="right" .ariaProps=${{ label: 'Add' }}>
      <wpp-icon-plus-v3-3-1 slot="icon-start"></wpp-icon-plus-v3-3-1>
    </wpp-action-button-v3-3-1>
  `,
  'with-chevron': () => html `<wpp-icon-chevron-v3-3-1 slot="right"></wpp-icon-chevron-v3-3-1>`,
  'with-tag': disabled => html `
    <wpp-tag-v3-3-1 ?disabled="${disabled}" label="Text" variant="positive" slot="right"></wpp-tag-v3-3-1>
  `,
  'with-toggle': () => html `<wpp-toggle-v3-3-1 slot="right" .ariaProps=${{ label: 'no label' }} .name="toggle"></wpp-toggle-v3-3-1>`,
  'with-text': () => html `<wpp-typography-v3-3-1 slot="right" type="s-body">Text</wpp-typography-v3-3-1>`,
  // Icon left variants
  'with-icon': () => html `<wpp-icon-document-v3-3-1 slot="left"></wpp-icon-document-v3-3-1>`,
  'with-icon-and-action-btn': disabled => html `
    <wpp-icon-document-v3-3-1 slot="left"></wpp-icon-document-v3-3-1>
    ${lineOptionMap['with-action-btn'](disabled)}
  `,
  'with-icon-and-chevron': disabled => html `
    <wpp-icon-document-v3-3-1 slot="left"></wpp-icon-document-v3-3-1>
    ${lineOptionMap['with-chevron'](disabled)}
  `,
  'with-icon-and-tag': disabled => html `
    <wpp-icon-document-v3-3-1 slot="left"></wpp-icon-document-v3-3-1>
    ${lineOptionMap['with-tag'](disabled)}
  `,
  'with-icon-and-toggle': disabled => html `
    <wpp-icon-document-v3-3-1 slot="left"></wpp-icon-document-v3-3-1>
    ${lineOptionMap['with-toggle'](disabled)}
  `,
  'with-icon-and-text': disabled => html `
    <wpp-icon-document-v3-3-1 slot="left"></wpp-icon-document-v3-3-1>
    ${lineOptionMap['with-text'](disabled)}
  `,
  // Avatar left variants
  'with-avatar': (disabled, size = 'xs') => html `
    <wpp-avatar-v3-3-1
      size=${size}
      src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
      slot="left"
      role="presentation"
      name="image"
    ></wpp-avatar-v3-3-1>
  `,
  'with-avatar-and-action-btn': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-avatar'](disabled, size)} ${lineOptionMap['with-action-btn'](disabled)}
  `,
  'with-avatar-and-chevron': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-avatar'](disabled, size)} ${lineOptionMap['with-chevron'](disabled)}
  `,
  'with-avatar-and-tag': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-avatar'](disabled, size)} ${lineOptionMap['with-tag'](disabled)}
  `,
  'with-avatar-and-toggle': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-avatar'](disabled, size)} ${lineOptionMap['with-toggle'](disabled)}
  `,
  'with-avatar-and-text': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-avatar'](disabled, size)} ${lineOptionMap['with-text'](disabled)}
  `,
  // Logo left variants
  'with-logo': (disabled, size = 'xs') => html `
    <wpp-avatar-v3-3-1
      size=${size}
      variant="square"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
      slot="left"
    ></wpp-avatar-v3-3-1>
  `,
  'with-logo-and-action-btn': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)} ${lineOptionMap['with-action-btn'](disabled)}
  `,
  'with-logo-and-chevron': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)} ${lineOptionMap['with-chevron'](disabled)}
  `,
  'with-logo-and-tag': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)}
    <wpp-tag-v3-3-1 ?disabled="${disabled}" label="Text" variant="neutral" slot="right"></wpp-tag-v3-3-1>
  `,
  'with-logo-and-toggle': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)} ${lineOptionMap['with-toggle'](disabled)}
  `,
  'with-logo-and-text': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)}
    <wpp-typography-v3-3-1 slot="right" type="s-body" style="color:var(--wpp-grey-color-800)">
      Text
    </wpp-typography-v3-3-1>
  `,
  // Default or no special slots
  default: () => html ``,
};
function getListItemContent(lineOption, size = 'xs', disabled) {
  const templateFunc = lineOptionMap[lineOption || 'default'] || lineOptionMap['default'];
  return templateFunc(disabled, size);
}
function getListItemRightContent(option, disabled) {
  // For multiple scenario, we only return "tag" or "text" if requested
  if (option === 'with-tag') {
    return lineOptionMap['with-tag'](disabled);
  }
  if (option === 'with-text') {
    return lineOptionMap['with-text'](disabled);
  }
  return html ``;
}
function getOneListItemOption(singleLineOption, multiple, disabled) {
  return multiple
    ? getListItemRightContent(singleLineOption, disabled)
    : getListItemContent(singleLineOption, 'xs', disabled);
}
function getTwoListItemOption(twoLineOption, multiple, disabled) {
  return multiple ? getListItemRightContent(twoLineOption, disabled) : getListItemContent(twoLineOption, 's', disabled);
}
export const SingleLine = (args) => html `
  <div style="width: 500px">
    <wpp-list-item-v3-3-1
      .multiple="${args.multiple}"
      .nonInteractive="${args.nonInteractive}"
      .disabled="${args.disabled}"
      .selectable="${args.selectable}"
      .isExtended="${args.isExtended}"
      ?checked="${args.checked}"
      .labelTypography="${args.labelTypography}"
      .captionTypography="${args.captionTypography}"
    >
      ${args.subtitleText && args.subtitleText.length > 0
  ? html `<span slot="subtitle">${args.subtitleText}</span>`
  : ''}
      ${getOneListItemOption(args.singleLineOptions, args.multiple, args.disabled)}
      <span slot="label">${args.labelText}</span>
    </wpp-list-item-v3-3-1>
  </div>
`;
SingleLine.args = {
  multiple: false,
  nonInteractive: false,
  disabled: false,
  selectable: false,
  singleLineOptions: 'default',
  labelText: 'Text',
  isExtended: false,
  checked: false,
  subtitleText: 'Subtitle Text',
  labelTypography: {
    type: 's-body',
  },
  captionTypography: {
    type: 's-body',
    color: 'var(--wpp-success-color-400)',
  },
};
SingleLine.parameters = {
  controls: { exclude: ['twoLineOptions'] },
};
export const TwoLine = (args) => html `
  <div style="width: 500px">
    <wpp-list-item-v3-3-1
      .multiple="${args.multiple}"
      .nonInteractive="${args.nonInteractive}"
      .disabled="${args.disabled}"
      .selectable="${args.selectable}"
      .isExtended="${args.isExtended}"
      ?checked="${args.checked}"
      .labelTypography="${args.labelTypography}"
      .captionTypography="${args.captionTypography}"
    >
      ${args.subtitleText && args.subtitleText.length > 0
  ? html `<span slot="subtitle">${args.subtitleText}</span>`
  : ''}
      ${getTwoListItemOption(args.twoLineOptions, args.multiple, args.disabled)}
      <span slot="label">${args.labelText}</span>
      <span slot="caption">${args.labelText}</span>
    </wpp-list-item-v3-3-1>
  </div>
`;
TwoLine.args = {
  multiple: false,
  nonInteractive: false,
  disabled: false,
  selectable: false,
  twoLineOptions: 'default',
  labelText: 'Text',
  isExtended: false,
  checked: false,
  subtitleText: 'Subtitle Text',
  labelTypography: {
    type: 's-body',
  },
  captionTypography: {
    type: 's-body',
    color: 'var(--wpp-success-color-400)',
  },
};
TwoLine.parameters = {
  controls: { exclude: ['singleLineOptions'] },
};
export const DynamicWidth = {
  render: args => html `
    <div>
      <wpp-typography-v3-3-1 type="xl-heading">Current width: ${args.width}</wpp-typography-v3-3-1>
      <wpp-list-item-v3-3-1
        style="width: ${args.width}; --wpp-list-item-width: 100%; margin-top: 20px"
        .multiple="${args.multiple}"
        .nonInteractive="${args.nonInteractive}"
        .disabled="${args.disabled}"
        .selectable="${args.selectable}"
        .isExtended="${args.isExtended}"
        ?checked="${args.checked}"
        .labelTooltipConfig="${args.labelTooltipConfig}"
      >
        ${args.subtitleText && args.subtitleText.length > 0
    ? html `<span slot="subtitle">${args.subtitleText}</span>`
    : ''}
        ${getTwoListItemOption(args.twoLineOptions, args.multiple)}
        <p slot="label">${args.labelText}</p>
      </wpp-list-item-v3-3-1>
    </div>
  `,
  args: {
    multiple: false,
    nonInteractive: false,
    disabled: false,
    selectable: false,
    twoLineOptions: 'default',
    labelText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc',
    isExtended: false,
    checked: false,
    width: '40%',
    labelTooltipConfig: {
      placement: 'bottom',
    },
    subtitleText: 'Subtitle Text',
    labelTypography: {
      type: 's-body',
    },
    captionTypography: {
      type: 's-body',
      color: 'var(--wpp-success-color-400)',
    },
  },
};
DynamicWidth.parameters = {
  controls: { exclude: ['singleLineOptions'] },
};
