import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Selection and input/Inline Edit',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: false,
      },
    },
    notes: readme,
  },
};
export const Input = {
  render: args => {
    const [mode, setMode] = useState('read');
    const [value, setValue] = useState('with input width');
    const [modeDefault, setModeDefault] = useState('read');
    const [valueDefault, _] = useState('default width');
    const handleInputModeChange = (event) => {
      setMode(event.detail.mode);
      if (event.detail.mode === 'read') {
        event.detail.closePopover();
      }
    };
    const handleInputValueChange = (event) => {
      setValue(event.detail.value);
    };
    const handleInputModeChangeDefault = (event) => {
      setModeDefault(event.detail.mode);
      if (event.detail.mode === 'read') {
        event.detail.closePopover();
      }
    };
    return html `
      <div style="display: flex; gap: 20px;">
        <!-- Inline Edit with inputWidth -->
        <wpp-inline-edit-v3-5-0
          .value="${value}"
          .placeholder="${args.placeholder}"
          .mode="${mode}"
          .inputWidth="${args.inputWidth}"
          @wppModeChange="${handleInputModeChange}"
        >
          <wpp-input-v3-5-0
            size="s"
            slot="form-element"
            .value="${value}"
            .placeholder="${args.placeholder}"
            .mode="${mode}"
            .inputWidth="${args.inputWidth}"
            @wppChange="${handleInputValueChange}"
          >
        </wpp-inline-edit-v3-5-0>

        <!-- Inline Edit without inputWidth (default width) -->
        <wpp-inline-edit-v3-5-0
          .value="${valueDefault}"
          .placeholder="${args.placeholder}"
          .mode="${modeDefault}"
          @wppModeChange="${handleInputModeChangeDefault}"
        >
          <wpp-input-v3-5-0
            size="s"
            slot="form-element"
            .value="${valueDefault}"
            .placeholder="${args.placeholder}"
          ></wpp-input-v3-5-0>
        </wpp-inline-edit-v3-5-0>
      </div>
    `;
  },
  args: {
    placeholder: 'placeholder',
    inputWidth: '300px',
  },
};
export const TextArea = {
  render: args => {
    const [mode, setMode] = useState('read');
    const [value, setValue] = useState('textarea value');
    const [modeDefault, setModeDefault] = useState('read');
    const [valueDefault, setValueDefault] = useState('textarea default width value');
    const handleTextareaModeChange = (event) => {
      setMode(event.detail.mode);
      if (event.detail.mode === 'read') {
        event.detail.closePopover();
      }
    };
    const handleTextareaValueChange = (event) => {
      setValue(event.detail.value);
    };
    const handleTextareaModeChangeDefault = (event) => {
      setModeDefault(event.detail.mode);
      if (event.detail.mode === 'read') {
        event.detail.closePopover();
      }
    };
    const handleTextareaValueChangeDefault = (event) => {
      setValueDefault(event.detail.value);
    };
    return html `
      <div style="display: flex; gap: 20px;">
        <!-- TextArea with inputWidth -->
        <wpp-inline-edit-v3-5-0
          .value="${value}"
          .placeholder="${args.placeholder}"
          .mode="${mode}"
          .inputWidth="${args.inputWidth}"
          .dropdownConfig="${{ placement: 'bottom-start' }}"
          @wppModeChange="${handleTextareaModeChange}"
        >
          <wpp-textarea-input-v3-5-0
            slot="form-element"
            .value="${value}"
            .placeholder="${args.placeholder}"
            @wppChange="${handleTextareaValueChange}"
          ></wpp-textarea-input-v3-5-0>
        </wpp-inline-edit-v3-5-0>

        <!-- TextArea without inputWidth (default width) -->
        <wpp-inline-edit-v3-5-0
          .value="${valueDefault}"
          .placeholder="${args.placeholder}"
          .mode="${modeDefault}"
          .dropdownConfig="${{ placement: 'bottom-start' }}"
          @wppModeChange="${handleTextareaModeChangeDefault}"
        >
          <wpp-textarea-input-v3-5-0
            slot="form-element"
            .value="${valueDefault}"
            .placeholder="${args.placeholder}"
            @wppChange="${handleTextareaValueChangeDefault}"
          ></wpp-textarea-input-v3-5-0>
        </wpp-inline-edit-v3-5-0>
      </div>
    `;
  },
  args: {
    placeholder: 'placeholder',
    inputWidth: '300px',
  },
};
export const WithServerValidations = {
  render: args => {
    const [mode, setMode] = useState('read');
    const [value, setValue] = useState('Initial value');
    const handleInputModeChange = (event) => {
      setMode(event.detail.mode);
      if (event.detail.mode === 'read') {
        event.detail.closePopover();
      }
    };
    const handleInputValueChange = (event) => {
      setValue(event.detail.value);
    };
    const onConfirm = (ev) => {
      ev.preventDefault();
      const { value, waitUntil } = ev.detail;
      const simulateServerRequest = new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value.length < 5) {
            reject(new Error('The value needs to be at least 5 characters long!'));
          }
          else {
            resolve();
          }
        }, 1000);
      });
      waitUntil(simulateServerRequest);
    };
    return html `
    <div>
      <wpp-typography-v3-5-0 style="margin-bottom: 20px;">
        The example simulates server validations for the input when the "Confirm" button is clicked. The text needs to be at least 5 characters long.
      </wpp-typography-v3-5-0>
      <div style="display: flex; gap: 20px;">
        <!-- Inline Edit with inputWidth -->
        <wpp-inline-edit-v3-5-0
          .value="${value}"
          .placeholder="${args.placeholder}"
          .mode="${mode}"
          .inputWidth="${args.inputWidth}"
          @wppModeChange="${handleInputModeChange}"
          @wppConfirm=${onConfirm}
        >
          <wpp-input-v3-5-0
            size="s"
            slot="form-element"
            .value="${value}"
            .placeholder="${args.placeholder}"
            .mode="${mode}"
            .inputWidth="${args.inputWidth}"
            @wppChange="${handleInputValueChange}"
          >
        </wpp-inline-edit-v3-5-0>
      </div>
    </div>
    `;
  },
  args: {
    placeholder: 'placeholder',
    inputWidth: '300px',
  },
};
