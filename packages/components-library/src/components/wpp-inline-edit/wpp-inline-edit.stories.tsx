import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import useState from 'storybook-addon-state'

import { Components } from '../../components'
import { WppInlineEdit } from './wpp-inline-edit'
import readme from './readme.md'

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
} as Meta<typeof WppInlineEdit>

export const Input: Story<Components.WppInlineEdit> = args => {
  const [mode, setMode] = useState('mode', 'read')
  const [value, setValue] = useState('value', 'with input width')
  const [modeDefault, setModeDefault] = useState('modeDefault', 'read')
  const [valueDefault, setValueDefault] = useState('valueDefault', 'default width')

  const handleInputModeChange = (event: CustomEvent) => {
    setMode(event.detail.mode)
    if (event.detail.mode === 'read') {
      event.detail.closePopover()
    }
  }

  const handleInputValueChange = (event: CustomEvent) => {
    setValue(event.detail.value)
  }

  const handleInputModeChangeDefault = (event: CustomEvent) => {
    setModeDefault(event.detail.mode)
    if (event.detail.mode === 'read') {
      event.detail.closePopover()
    }
  }

  const handleInputValueChangeDefault = (event: CustomEvent) => {
    setValueDefault(event.detail.value)
  }

  return html`
    <div style="display: flex; gap: 20px;">
      <!-- Inline Edit with inputWidth -->
      <wpp-inline-edit-v3-1-1
        .value="${value}"
        .placeholder="${args.placeholder}"
        .mode="${mode}"
        .inputWidth="${args.inputWidth}"
        @wppModeChange="${handleInputModeChange}"
      >
        <wpp-input-v3-1-1
          size="s"
          slot="form-element"
          .value="${value}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleInputValueChange}"
        ></wpp-input-v3-1-1>
      </wpp-inline-edit-v3-1-1>

      <!-- Inline Edit without inputWidth (default width) -->
      <wpp-inline-edit-v3-1-1
        .value="${valueDefault}"
        .placeholder="${args.placeholder}"
        .mode="${modeDefault}"
        @wppModeChange="${handleInputModeChangeDefault}"
      >
        <wpp-input-v3-1-1
          size="s"
          slot="form-element"
          .value="${valueDefault}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleInputValueChangeDefault}"
        ></wpp-input-v3-1-1>
      </wpp-inline-edit-v3-1-1>
    </div>
  `
}

Input.args = {
  placeholder: 'placeholder',
  inputWidth: '300px',
}

export const TextArea: Story<Components.WppInlineEdit> = args => {
  const [mode, setMode] = useState('mode', 'read')
  const [value, setValue] = useState('value', 'textarea value')
  const [modeDefault, setModeDefault] = useState('modeDefault', 'read')
  const [valueDefault, setValueDefault] = useState('valueDefault', 'textarea default width value')

  const handleTextareaModeChange = (event: CustomEvent) => {
    setMode(event.detail.mode)
    if (event.detail.mode === 'read') {
      event.detail.closePopover()
    }
  }

  const handleTextareaValueChange = (event: CustomEvent) => {
    setValue(event.detail.value)
  }

  const handleTextareaModeChangeDefault = (event: CustomEvent) => {
    setModeDefault(event.detail.mode)
    if (event.detail.mode === 'read') {
      event.detail.closePopover()
    }
  }

  const handleTextareaValueChangeDefault = (event: CustomEvent) => {
    setValueDefault(event.detail.value)
  }

  return html`
    <div style="display: flex; gap: 20px;">
      <!-- TextArea with inputWidth -->
      <wpp-inline-edit-v3-1-1
        .value="${value}"
        .placeholder="${args.placeholder}"
        .mode="${mode}"
        .inputWidth="${args.inputWidth}"
        .dropdownConfig="${{ placement: 'bottom-start' }}"
        @wppModeChange="${handleTextareaModeChange}"
      >
        <wpp-textarea-input-v3-1-1
          slot="form-element"
          .value="${value}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleTextareaValueChange}"
        ></wpp-textarea-input-v3-1-1>
      </wpp-inline-edit-v3-1-1>

      <!-- TextArea without inputWidth (default width) -->
      <wpp-inline-edit-v3-1-1
        .value="${valueDefault}"
        .placeholder="${args.placeholder}"
        .mode="${modeDefault}"
        .dropdownConfig="${{ placement: 'bottom-start' }}"
        @wppModeChange="${handleTextareaModeChangeDefault}"
      >
        <wpp-textarea-input-v3-1-1
          slot="form-element"
          .value="${valueDefault}"
          .placeholder="${args.placeholder}"
          @wppChange="${handleTextareaValueChangeDefault}"
        ></wpp-textarea-input-v3-1-1>
      </wpp-inline-edit-v3-1-1>
    </div>
  `
}

TextArea.args = {
  placeholder: 'placeholder',
  inputWidth: '300px',
}
