import { html } from 'lit-html';
import { getSelectStoryList, selectStoryArgTypes } from '../../wpp-select.stories-shared';
export default {
  title: 'Design System/Components/Selection and input/Select/Single',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: selectStoryArgTypes,
};
export const Single = (args) => {
  let selectedValue = null;
  const handleChange = (event) => {
    selectedValue = event.detail.value;
    const updatedEl = document.querySelector('wpp-select-v4-3-0');
    if (updatedEl)
      updatedEl.value = selectedValue;
  };
  return html `
    <wpp-select-v4-4-0
      type="single"
      name="single-select"
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
      .maximumSelectedItems=${args.maximumSelectedItems}
      .dropdownWidth=${args.dropdownWidth}
      .list=${getSelectStoryList('single')}
      .value=${selectedValue}
      @wppChange=${handleChange}
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
Single.args = {
  message: '',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
  consistentSearch: false,
  size: 'm',
  disabled: false,
  messageInTooltip: false,
  required: true,
  withSearch: false,
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
Single.parameters = {
  controls: { exclude: ['placeholder'] },
};
