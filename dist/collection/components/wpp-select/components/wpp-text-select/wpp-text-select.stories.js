import { html } from 'lit-html';
import { selectStoryArgTypes } from '../../wpp-select.stories-shared';
const LIST_TEXT = [
  {
    value: 'cars',
    label: 'Cars',
  },
  {
    value: 'houses',
    label: 'Houses',
    disabled: true,
  },
  {
    value: 'trains',
    label: 'Trains',
  },
  {
    value: 'long-text',
    label: 'A Bit Longer Text',
  },
  {
    value: 'food',
    label: 'Food',
  },
  {
    value: 'drinks',
    label: 'Drinks',
  },
  {
    value: 'fruits',
    label: 'Fruits',
  },
];
export default {
  title: 'Design System/Components/Selection and input/Select/Text',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: selectStoryArgTypes,
};
export const Text = (args) => {
  let selectedValue = 'Houses';
  const updateChevronState = (isOpen) => {
    const chevron = document.querySelector('#text-select-chevron');
    if (chevron) {
      if (isOpen) {
        chevron.classList.add('isOpen');
      }
      else {
        chevron.classList.remove('isOpen');
      }
    }
  };
  const dropdownConfig = {
    onShow: () => {
      updateChevronState(true);
    },
    onHide: () => {
      updateChevronState(false);
    },
  };
  const handleListItemChange = (item) => {
    selectedValue = item.label;
    const triggerButton = document.querySelector('#text-select-trigger');
    if (triggerButton) {
      const childNodes = Array.from(triggerButton.childNodes);
      const textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
      if (textNode) {
        textNode.textContent = ` ${selectedValue} `;
      }
    }
    const listItems = document.querySelectorAll('.text-select-item');
    listItems.forEach((listItem) => {
      const label = listItem.querySelector('[slot="label"]')?.textContent;
      listItem.checked = label === selectedValue;
    });
  };
  return html `
    <style>
      #text-select-chevron {
        transition: transform 0.2s;
      }
      #text-select-chevron.isOpen {
        transform: rotateZ(180deg);
      }
      #text-select-trigger {
        --wpp-action-button-font-weight: 400;
        --wpp-action-button-secondary-icon-color: var(--wpp-grey-color-600);
        --wpp-action-button-secondary-icon-color-hover: var(--wpp-grey-color-800);
        --wpp-action-button-secondary-icon-color-active: var(--wpp-grey-color-900);
      }
    </style>
    <div style="width: 300px;">
      <wpp-menu-context-v4-4-0 .dropdownConfig=${dropdownConfig}>
        <wpp-action-button-v4-4-0
          id="text-select-trigger"
          slot="trigger-element"
          variant="secondary"
          .disabled="${args.disabled}"
        >
          ${selectedValue || args.placeholder}
          <wpp-icon-chevron-v4-4-0 id="text-select-chevron" slot="icon-end" direction="down"></wpp-icon-chevron-v4-4-0>
        </wpp-action-button-v4-4-0>
        <div>
          ${LIST_TEXT.map(item => html `
              <wpp-list-item-v4-4-0
                class="text-select-item"
                .checked=${item.label === selectedValue}
                @wppChangeListItem=${() => handleListItemChange(item)}
              >
                <span slot="label">${item.label}</span>
              </wpp-list-item-v4-4-0>
            `)}
        </div>
      </wpp-menu-context-v4-4-0>
    </div>
  `;
};
Text.args = {
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
Text.parameters = {
  controls: { exclude: ['placeholder'] },
};
