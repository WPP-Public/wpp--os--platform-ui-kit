import { html } from 'lit-html';
import { getSelectStoryList, selectStoryArgTypes } from '../../wpp-select.stories-shared';
export default {
  title: 'Design System/Components/Selection and input/Select/Border Only Validation State',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: selectStoryArgTypes,
};
export const BorderOnlyValidationState = (args) => {
  const messageType = args.messageType ?? undefined;
  return html `
    <div style="display: flex; flex-direction: column; gap: 24px; width: 320px;">
      <wpp-select-v4-4-0
        type="single"
        name="single-border-only-warning"
        .message=${args.message}
        .labelConfig=${{ text: 'Single warning border only' }}
        .placeholder=${args.placeholder}
        .messageType=${messageType}
        .messageInTooltip=${args.messageInTooltip}
        .size=${args.size}
        .disabled=${args.disabled}
        .required=${args.required}
        .dropdownConfig=${args.dropdownConfig}
        .withSearch=${args.withSearch}
        .consistentSearch=${args.consistentSearch}
        .maximumSelectedItems=${args.maximumSelectedItems}
        .list=${getSelectStoryList('single')}
        .value=${null}
      ></wpp-select-v4-4-0>

      <wpp-select-v4-4-0
        type="multiple"
        name="multiple-border-only-error"
        .message=${args.message}
        .labelConfig=${{ text: 'Multiple error border only' }}
        .placeholder=${args.placeholder}
        .messageType=${messageType === 'warning' ? 'error' : messageType}
        .messageInTooltip=${args.messageInTooltip}
        .size=${args.size}
        .disabled=${args.disabled}
        .required=${args.required}
        .dropdownConfig=${args.dropdownConfig}
        .withSearch=${args.withSearch}
        .consistentSearch=${args.consistentSearch}
        .showSelectAllText=${args.showSelectAllText}
        .showSelectAllOption=${args.showSelectAllOption}
        .maximumSelectedItems=${args.maximumSelectedItems}
        .list=${getSelectStoryList('multiple')}
        .value=${[]}
      ></wpp-select-v4-4-0>

      <wpp-select-v4-4-0
        type="combined"
        name="combined-border-only-warning"
        .message=${args.message}
        .labelConfig=${{ text: 'Combined warning border only' }}
        .placeholder=${args.placeholder}
        .messageType=${messageType}
        .messageInTooltip=${args.messageInTooltip}
        .size=${args.size}
        .disabled=${args.disabled}
        .required=${args.required}
        .dropdownConfig=${args.dropdownConfig}
        .withSearch=${args.withSearch}
        .consistentSearch=${args.consistentSearch}
        .list=${getSelectStoryList('single')}
        .value=${null}
      ></wpp-select-v4-4-0>
    </div>
  `;
};
BorderOnlyValidationState.args = {
  placeholder: 'Choose option',
  message: '',
  messageType: 'warning',
  messageInTooltip: true,
  size: 'm',
  disabled: false,
  required: true,
  withSearch: false,
  showSelectAllText: true,
  showSelectAllOption: true,
  dropdownConfig: undefined,
  consistentSearch: false,
};
BorderOnlyValidationState.parameters = {
  controls: { hideNoControlsWarning: true },
};
