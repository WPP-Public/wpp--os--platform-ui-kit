import { html } from 'lit-html';
import slotUsage from './slotUsage.md';
import readMe from './readme.md';
/** Every left/right slot combination, available while `multiple` is off. */
const singleSelectionOptions = [
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
];
/**
 * While `multiple` is on the component owns the left slot with its selection checkbox, so only the
 * right slot variants remain — these are exactly the options `getListItemRightContent` renders.
 */
const multipleSelectionOptions = ['with-action-btn', 'with-tag', 'with-text'];
const multipleOptionsDescription = 'The selection checkbox owns the left slot while `multiple` is on, so only right slot content is available';
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
      options: singleSelectionOptions,
      control: { type: 'select' },
      if: { arg: 'multiple', truthy: false },
    },
    singleLineMultipleOptions: {
      name: 'singleLineOptions',
      options: multipleSelectionOptions,
      control: { type: 'select' },
      description: multipleOptionsDescription,
      if: { arg: 'multiple', truthy: true },
    },
    twoLineOptions: {
      options: singleSelectionOptions,
      control: { type: 'select' },
      if: { arg: 'multiple', truthy: false },
    },
    twoLineMultipleOptions: {
      name: 'twoLineOptions',
      options: multipleSelectionOptions,
      control: { type: 'select' },
      description: multipleOptionsDescription,
      if: { arg: 'multiple', truthy: true },
    },
    labelText: { type: 'string' },
    subtitleText: { type: 'string' },
  },
};
/** Controls hidden on stories rendering a single-line list item. */
const singleLineOnlyControls = { exclude: ['twoLineOptions', 'twoLineMultipleOptions'] };
/** Controls hidden on stories rendering a two-line list item. */
const twoLineOnlyControls = { exclude: ['singleLineOptions', 'singleLineMultipleOptions'] };
const lineOptionMap = {
  // Basic right content variants
  'with-action-btn': _disabled => html `
    <wpp-action-button-v4-3-0 variant="secondary" slot="right" .ariaProps=${{ label: 'Add' }}>
      <wpp-icon-plus-v4-3-0 slot="icon-start"></wpp-icon-plus-v4-3-0>
    </wpp-action-button-v4-3-0>
  `,
  'with-chevron': () => html `<wpp-icon-chevron-v4-3-0 slot="right"></wpp-icon-chevron-v4-3-0>`,
  'with-tag': disabled => html `
    <wpp-tag-v4-3-0 ?disabled="${disabled}" label="Text" variant="positive" slot="right"></wpp-tag-v4-3-0>
  `,
  'with-toggle': () => html `<wpp-toggle-v4-3-0 slot="right" .ariaProps=${{ label: 'no label' }} .name="toggle"></wpp-toggle-v4-3-0>`,
  'with-text': () => html `<wpp-typography-v4-3-0 slot="right" type="s-body">Text</wpp-typography-v4-3-0>`,
  // Icon left variants
  'with-icon': () => html `<wpp-icon-document-v4-3-0 slot="left"></wpp-icon-document-v4-3-0>`,
  'with-icon-and-action-btn': disabled => html `
    <wpp-icon-document-v4-3-0 slot="left"></wpp-icon-document-v4-3-0>
    ${lineOptionMap['with-action-btn'](disabled)}
  `,
  'with-icon-and-chevron': disabled => html `
    <wpp-icon-document-v4-3-0 slot="left"></wpp-icon-document-v4-3-0>
    ${lineOptionMap['with-chevron'](disabled)}
  `,
  'with-icon-and-tag': disabled => html `
    <wpp-icon-document-v4-3-0 slot="left"></wpp-icon-document-v4-3-0>
    ${lineOptionMap['with-tag'](disabled)}
  `,
  'with-icon-and-toggle': disabled => html `
    <wpp-icon-document-v4-3-0 slot="left"></wpp-icon-document-v4-3-0>
    ${lineOptionMap['with-toggle'](disabled)}
  `,
  'with-icon-and-text': disabled => html `
    <wpp-icon-document-v4-3-0 slot="left"></wpp-icon-document-v4-3-0>
    ${lineOptionMap['with-text'](disabled)}
  `,
  // Avatar left variants
  'with-avatar': (disabled, size = 'xs') => html `
    <wpp-avatar-v4-3-0
      size=${size}
      src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
      slot="left"
      role="presentation"
      name="image"
    ></wpp-avatar-v4-3-0>
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
    <wpp-avatar-v4-3-0
      size=${size}
      variant="square"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU"
      slot="left"
    ></wpp-avatar-v4-3-0>
  `,
  'with-logo-and-action-btn': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)} ${lineOptionMap['with-action-btn'](disabled)}
  `,
  'with-logo-and-chevron': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)} ${lineOptionMap['with-chevron'](disabled)}
  `,
  'with-logo-and-tag': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)}
    <wpp-tag-v4-3-0 ?disabled="${disabled}" label="Text" variant="neutral" slot="right"></wpp-tag-v4-3-0>
  `,
  'with-logo-and-toggle': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)} ${lineOptionMap['with-toggle'](disabled)}
  `,
  'with-logo-and-text': (disabled, size = 'xs') => html `
    ${lineOptionMap['with-logo'](disabled, size)}
    <wpp-typography-v4-3-0 slot="right" type="s-body" style="color:var(--wpp-grey-color-800)">
      Text
    </wpp-typography-v4-3-0>
  `,
  // Default or no special slots
  default: () => html ``,
};
function getListItemContent(lineOption, size = 'xs', disabled) {
  const templateFunc = lineOptionMap[lineOption || 'default'] || lineOptionMap['default'];
  return templateFunc(disabled, size);
}
function getListItemRightContent(option, disabled) {
  // For multiple scenario, we only return "tag", "text", or "action-btn" if requested
  if (option === 'with-tag') {
    return lineOptionMap['with-tag'](disabled);
  }
  if (option === 'with-text') {
    return lineOptionMap['with-text'](disabled);
  }
  if (option === 'with-action-btn') {
    return lineOptionMap['with-action-btn'](disabled);
  }
  return html ``;
}
function getOneListItemOption(args) {
  return args.multiple
    ? getListItemRightContent(args.singleLineMultipleOptions, args.disabled)
    : getListItemContent(args.singleLineOptions, 'xs', args.disabled);
}
function getTwoListItemOption(args) {
  return args.multiple
    ? getListItemRightContent(args.twoLineMultipleOptions, args.disabled)
    : getListItemContent(args.twoLineOptions, 'xs', args.disabled);
}
export const SingleLine = (args) => html `
  <div style="width: 500px">
    <wpp-list-item-v4-3-0
      .multiple="${args.multiple}"
      .nonInteractive="${args.nonInteractive}"
      .disabled="${args.disabled}"
      .selectable="${args.selectable}"
      .isExtended="${args.isExtended}"
      ?checked="${args.checked}"
    >
      ${args.subtitleText && args.subtitleText.length > 0
  ? html `<span slot="subtitle">${args.subtitleText}</span>`
  : ''}
      ${getOneListItemOption(args)}
      <span slot="label">${args.labelText}</span>
    </wpp-list-item-v4-3-0>
  </div>
`;
SingleLine.args = {
  multiple: false,
  nonInteractive: false,
  disabled: false,
  selectable: false,
  singleLineOptions: 'default',
  singleLineMultipleOptions: 'with-tag',
  labelText: 'Text',
  isExtended: false,
  checked: false,
  subtitleText: 'Subtitle Text',
};
SingleLine.parameters = {
  controls: singleLineOnlyControls,
};
export const TwoLine = (args) => html `
  <div style="width: 500px">
    <wpp-list-item-v4-3-0
      .multiple="${args.multiple}"
      .nonInteractive="${args.nonInteractive}"
      .disabled="${args.disabled}"
      .selectable="${args.selectable}"
      .isExtended="${args.isExtended}"
      ?checked="${args.checked}"
    >
      ${args.subtitleText && args.subtitleText.length > 0
  ? html `<span slot="subtitle">${args.subtitleText}</span>`
  : ''}
      ${getTwoListItemOption(args)}
      <span slot="label">${args.labelText}</span>
      <span slot="caption">${args.labelText}</span>
    </wpp-list-item-v4-3-0>
  </div>
`;
TwoLine.args = {
  multiple: false,
  nonInteractive: false,
  disabled: false,
  selectable: false,
  twoLineOptions: 'default',
  twoLineMultipleOptions: 'with-tag',
  labelText: 'Text',
  isExtended: false,
  checked: false,
  subtitleText: 'Subtitle Text',
};
TwoLine.parameters = {
  controls: twoLineOnlyControls,
};
export const DynamicWidth = {
  render: args => html `
    <div>
      <wpp-typography-v4-3-0 type="xl-heading">Current width: ${args.width}</wpp-typography-v4-3-0>
      <wpp-list-item-v4-3-0
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
        ${getTwoListItemOption(args)}
        <p slot="label">${args.labelText}</p>
      </wpp-list-item-v4-3-0>
    </div>
  `,
  args: {
    multiple: false,
    nonInteractive: false,
    disabled: false,
    selectable: false,
    twoLineOptions: 'default',
    twoLineMultipleOptions: 'with-tag',
    labelText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc',
    isExtended: false,
    checked: false,
    width: '40%',
    labelTooltipConfig: {
      placement: 'bottom',
    },
    subtitleText: 'Subtitle Text',
  },
};
export const TooltipConfig = {
  render: args => html `
    <div style="width: 500px">
      <wpp-list-item-v4-3-0
        .multiple="${args.multiple}"
        .nonInteractive="${args.nonInteractive}"
        .disabled="${args.disabled}"
        .selectable="${args.selectable}"
        .width="${args.width}"
        .isExtended="${args.isExtended}"
        ?checked="${args.checked}"
        .tooltipConfig="${args.tooltipConfig}"
      >
        ${args.subtitleText && args.subtitleText.length > 0
    ? html `<span slot="subtitle">${args.subtitleText}</span>`
    : ''}
        ${getOneListItemOption(args)}
        <span slot="label">${args.labelText}</span>

        <wpp-icon-warning-v4-3-0 style="margin-left: 10px" slot="right" />
      </wpp-list-item-v4-3-0>
    </div>
  `,
  args: {
    multiple: false,
    nonInteractive: false,
    disabled: false,
    width: '100%',
    selectable: false,
    singleLineOptions: 'default',
    singleLineMultipleOptions: 'with-tag',
    labelText: 'Warning Messeage On Right Icon',
    isExtended: false,
    checked: false,
    tooltipConfig: {
      rightSlot: {
        warning: true,
        header: 'Custom Tooltip',
        text: 'This is a custom tooltip for Warning Message Left Slot',
        config: { placement: 'bottom' },
      },
    },
    subtitleText: 'Subtitle Text',
  },
  parameters: {
    controls: singleLineOnlyControls,
  },
};
DynamicWidth.parameters = {
  controls: twoLineOnlyControls,
};
export const CustomTypography = {
  render: args => html `
    <div style="width: 500px">
      <wpp-list-item-v4-3-0
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
        ${getTwoListItemOption(args)}
        <span slot="label">${args.labelText}</span>
        <span slot="caption">${args.captionText}</span>
      </wpp-list-item-v4-3-0>
    </div>
  `,
  args: {
    multiple: false,
    nonInteractive: false,
    disabled: false,
    selectable: false,
    isExtended: false,
    checked: false,
    twoLineOptions: 'default',
    twoLineMultipleOptions: 'with-tag',
    labelText: 'Text',
    captionText: 'Caption Text',
    subtitleText: 'Subtitle Text',
    labelTypography: {
      type: 's-strong',
      color: 'var(--wpp-brand-color)',
    },
    captionTypography: {
      type: 'xs-body',
      color: 'var(--wpp-success-color-400)',
    },
  },
  argTypes: {
    labelTypography: {
      control: 'object',
      description: 'Custom Typography for the label (type, color)',
    },
    captionTypography: {
      control: 'object',
      description: 'Custom Typography for the caption (type, color)',
    },
    captionText: { type: 'string' },
  },
  parameters: {
    controls: { exclude: [...twoLineOnlyControls.exclude, 'width'] },
  },
};
