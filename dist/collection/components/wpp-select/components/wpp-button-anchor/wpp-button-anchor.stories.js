import { html } from 'lit-html';
import { selectStoryArgTypes } from '../../wpp-select.stories-shared';
const getList = () => [
  { value: 1, label: 'Car' },
  { value: 2, disabled: true, label: 'House' },
  { value: 3, label: 'Tree' },
];
export default {
  title: 'Design System/Components/Selection and input/Select/Button Anchor',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: selectStoryArgTypes,
};
export const ButtonAnchor = (args) => {
  let selectedValue = null;
  const handleChange = (event) => {
    selectedValue = event.detail.value;
    const updatedEl = document.querySelector('#button-anchor-select');
    if (updatedEl)
      updatedEl.value = selectedValue;
  };
  const renderAnchor = () => {
    switch (args.anchorComponent) {
      case 'WppActionButton':
        return html ` <wpp-action-button-v4-4-0 slot="anchor-button"> ${args.anchorLabel} </wpp-action-button-v4-4-0> `;
      case 'WppActionButtonWithIcon':
        return html `
          <wpp-action-button-v4-4-0 slot="anchor-button">
            <wpp-icon-plus-v4-4-0 slot="icon-start"></wpp-icon-plus-v4-4-0>
            ${args.anchorLabel}
          </wpp-action-button-v4-4-0>
        `;
      case 'WppButton':
      default:
        return html ` <wpp-button-v4-4-0 slot="anchor-button"> ${args.anchorLabel} </wpp-button-v4-4-0> `;
    }
  };
  return html `
    <wpp-select-v4-4-0
      id="button-anchor-select"
      type="single"
      name="button-anchor-select"
      .message=${args.message}
      .messageType=${args.messageType}
      .placeholder=${args.placeholder}
      .size=${args.size}
      .messageInTooltip=${args.messageInTooltip}
      .disabled=${args.disabled}
      .required=${args.required}
      .dropdownConfig=${args.dropdownConfig}
      .labelConfig=${args.labelConfig}
      .withSearch=${args.withSearch}
      .consistentSearch=${args.consistentSearch}
      .dropdownWidth=${args.dropdownWidth}
      .list=${getList()}
      .value=${selectedValue}
      @wppChange=${handleChange}
    >
      ${renderAnchor()}
      ${args.showIconStart
    ? html `
            <wpp-icon-clock-v4-4-0
              slot="icon-start"
              @click="${(e) => {
      e.stopPropagation();
    }}"
            ></wpp-icon-clock-v4-4-0>
          `
    : null}
    </wpp-select-v4-4-0>
  `;
};
ButtonAnchor.args = {
  message: '',
  messageType: undefined,
  placeholder: 'Select option',
  size: 'm',
  dropdownWidth: 'auto',
  disabled: false,
  required: false,
  withSearch: false,
  consistentSearch: false,
  showIconStart: false,
  anchorComponent: 'WppButton',
  anchorLabel: 'Open Select',
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: { optional: 'Optional' },
  },
};
ButtonAnchor.argTypes = {
  anchorComponent: {
    options: ['WppButton', 'WppActionButton', 'WppActionButtonWithIcon'],
    control: { type: 'select' },
  },
  anchorLabel: { control: { type: 'text' } },
};
ButtonAnchor.parameters = {
  controls: {
    exclude: [
      'maximumSelectedItems',
      'withFolder',
      'showSelectAllText',
      'placeholder',
      'size',
      'disabled',
      'showIconStart',
    ],
  },
  docs: { description: { story: 'Select anchored to a customizable button component.' } },
};
