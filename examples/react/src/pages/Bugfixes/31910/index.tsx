import { useState } from 'react'
import { WppInlineEdit, WppInput } from '@platform-ui-kit/components-library-react'
import { InlineEditMode } from '@platform-ui-kit/components-library'
import styles from './index.module.scss'

import { InputChangeEventDetail, InlineEditChangeModeEventDetail } from '@platform-ui-kit/components-library'
import {
  WppInlineEditCustomEvent,
  WppInputCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'

export const InlineEditInputWidth = () => {
  const [inputMode1, setInputMode1] = useState<InlineEditMode>('read')
  const [inputText1, setInputText1] = useState('')
  const [inputWidth, setInputWidth] = useState('300px')

  return (
    <div className={styles.container}>
      <h2>Inline Edit Component with Dynamic Width</h2>
      <p>
        Use the input below to specify a custom width for the editable input field (e.g., <code>300px</code>,{' '}
        <code>calc(100% - 68px)</code>, or <code>100vw</code>). This demonstrates the flexibility of dynamically
        adjusting the width of the inline edit input.
      </p>

      {/* Input to set custom width */}
      <div className={styles.input}>
        <WppInput
          name="wpp-input"
          placeholder="e.g., 300px, calc(100% - 68px), 100vw"
          data-testid="regular-m-input"
          value={inputWidth}
          onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
            setInputWidth(e.detail.value!)
          }}
          className={styles.inputWidthField}
          required
          autoFocus
          labelConfig={{
            text: 'Input Width',
            description: 'Description',
          }}
        />
      </div>

      <div className={styles.block} data-testid="input-inline-edit-container">
        <WppInlineEdit
          value={inputText1}
          mode={inputMode1}
          inputWidth={inputWidth}
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            console.log(event.detail)
            setInputMode1(event.detail.mode)
            if (event.detail.mode === 'read') {
              event.detail.closePopover()
            }
          }}
          data-testid="default-input-inline-edit"
        >
          <WppInput
            size="s"
            slot="form-element"
            name="test"
            value={inputText1}
            onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
              setInputText1(e.detail.value!)
            }}
          />
        </WppInlineEdit>
      </div>
    </div>
  )
}
