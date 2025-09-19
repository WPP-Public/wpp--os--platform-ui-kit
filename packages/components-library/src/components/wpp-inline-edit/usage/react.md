```tsx
import React, { useState } from 'react'

import { WppInlineEdit } from '@platform-ui-kit/components-library-react'

export const InlineEditVCPage = () => {
  const [inputMode, setInputMode] = useState('read')
  const [textareaMode, setTextareaMode] = useState('read')
  const [inputText, setInputText] = useState('input value')
  const [textareaText, setTextareaText] = useState('textarea value')

  return (
    <>
      <div>
        <h3>Inline Edit Input</h3>
        <WppInlineEdit
          value={inputText}
          mode={inputMode}
          inputWidth="300px"
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            setInputMode(event.detail.mode)
            if (event.detail.mode === 'read') {
              event.detail.closePopover()
            }
          }}
        >
          <WppInput
            size="s"
            slot="form-element"
            value={inputText}
            onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
              setInputText(e.detail.value)
            }}
          />
        </WppInlineEdit>
      </div>

      <div className={styles.block}>
        <h3>Inline Edit Textarea</h3>
        <WppInlineEdit
          mode={textareaMode}
          value={textareaText}
          inputWidth="300px"
          dropdownConfig={{
            placement: 'bottom-start',
          }}
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            setTextareaMode(event.detail.mode)
            if (event.detail.mode === 'read') {
              event.detail.closePopover()
            }
          }}
        >
          <WppTextareaInput
            slot="form-element"
            size="s"
            value={textareaText}
            onWppChange={(e: WppTextareaInputCustomEvent<InputChangeEventDetail>) => {
              setTextareaText(e.detail.value)
            }}
          />
        </WppInlineEdit>
      </div>
    </>
  )
}

```
