import { html } from 'lit-html';
import { getSelectStoryList, selectStoryArgTypes } from '../../wpp-select.stories-shared';
export default {
  title: 'Design System/Components/Selection and input/Select/Multiple',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: selectStoryArgTypes,
};
export const Multiple = (args) => {
  let selectedValue = [];
  const handleChange = (event) => {
    selectedValue = event.detail.value;
    const updatedEl = document.querySelector('wpp-select-v4-3-0');
    if (updatedEl)
      updatedEl.value = selectedValue;
  };
  const handleApply = () => {
    console.log('Apply clicked — selection confirmed');
  };
  return html `
    <wpp-select-v4-4-0
      type="multiple"
      name="multiple-select"
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
      .withFolder=${args.withFolder}
      .showSelectAllText=${args.showSelectAllText}
      .showSelectAllOption=${args.showSelectAllOption}
      .consistentSearch=${args.consistentSearch}
      .dropdownWidth=${args.dropdownWidth}
      .value=${selectedValue}
      .maximumSelectedItems="${args.maximumSelectedItems}"
      .list=${getSelectStoryList('multiple')}
      @wppChange=${handleChange}
      @wppApply=${handleApply}
    >
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
Multiple.args = {
  message: '',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
  size: 'm',
  messageInTooltip: false,
  disabled: false,
  required: true,
  withSearch: false,
  withFolder: true,
  showSelectAllText: true,
  showSelectAllOption: true,
  consistentSearch: false,
  showIconStart: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
};
Multiple.parameters = {
  controls: { exclude: ['placeholder'] },
};
