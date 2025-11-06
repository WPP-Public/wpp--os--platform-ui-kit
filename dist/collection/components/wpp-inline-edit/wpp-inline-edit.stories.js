import { html } from 'lit-html';
import useState from 'storybook-addon-state';
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
export const Input = args => {
  const [mode, setMode] = useState('mode', 'read');
  const [value, setValue] = useState('value', 'with input width');
  const [modeDefault, setModeDefault] = useState('modeDefault', 'read');
  const [valueDefault, setValueDefault] = useState('valueDefault', 'default width');
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
  const handleInputValueChangeDefault = (event) => {
    setValueDefault(event.detail.value);
  };
  return html `
    <div style="display: flex; gap: 20px;">
      <!-- Inline Edit with inputWidth -->
      <wpp-inline-edit-v2-22-0
        .value="${value}"
        .placeholder="${args.placeholder}"
        .mode="${mode}"
        .inputWidth="${args.inputWidth}"
        @wppModeChange="${handleInputModeChange}"
      >
        <wpp-input-v2-22-0
          size="s"
          slot="form-element"
          .value="${value}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleInputValueChange}"
        ></wpp-input-v2-22-0>
      </wpp-inline-edit-v2-22-0>

      <!-- Inline Edit without inputWidth (default width) -->
      <wpp-inline-edit-v2-22-0
        .value="${valueDefault}"
        .placeholder="${args.placeholder}"
        .mode="${modeDefault}"
        @wppModeChange="${handleInputModeChangeDefault}"
      >
        <wpp-input-v2-22-0
          size="s"
          slot="form-element"
          .value="${valueDefault}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleInputValueChangeDefault}"
        ></wpp-input-v2-22-0>
      </wpp-inline-edit-v2-22-0>
    </div>
  `;
};
Input.args = {
  placeholder: 'placeholder',
  inputWidth: '300px',
};
export const TextArea = args => {
  const [mode, setMode] = useState('mode', 'read');
  const [value, setValue] = useState('value', 'textarea value');
  const [modeDefault, setModeDefault] = useState('modeDefault', 'read');
  const [valueDefault, setValueDefault] = useState('valueDefault', 'textarea default width value');
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
      <wpp-inline-edit-v2-22-0
        .value="${value}"
        .placeholder="${args.placeholder}"
        .mode="${mode}"
        .inputWidth="${args.inputWidth}"
        .dropdownConfig="${{ placement: 'bottom-start' }}"
        @wppModeChange="${handleTextareaModeChange}"
      >
        <wpp-textarea-input-v2-22-0
          slot="form-element"
          .value="${value}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleTextareaValueChange}"
        ></wpp-textarea-input-v2-22-0>
      </wpp-inline-edit-v2-22-0>

      <!-- TextArea without inputWidth (default width) -->
      <wpp-inline-edit-v2-22-0
        .value="${valueDefault}"
        .placeholder="${args.placeholder}"
        .mode="${modeDefault}"
        .dropdownConfig="${{ placement: 'bottom-start' }}"
        @wppModeChange="${handleTextareaModeChangeDefault}"
      >
        <wpp-textarea-input-v2-22-0
          slot="form-element"
          .value="${valueDefault}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleTextareaValueChangeDefault}"
        ></wpp-textarea-input-v2-22-0>
      </wpp-inline-edit-v2-22-0>
    </div>
  `;
};
TextArea.args = {
  placeholder: 'placeholder',
  inputWidth: '300px',
};
