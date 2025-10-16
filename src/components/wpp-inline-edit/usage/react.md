```tsx
import React, { useState } from 'react'

import { WppInlineEdit, WppInput, WppTextareaInput } from '@platform-ui-kit/components-library-react'
import { InputChangeEventDetail, InlineEditChangeModeEventDetail } from '@platform-ui-kit/components-library'
import {
  InlineEditConfirmDetail,
  WppInlineEditCustomEvent,
  WppInputCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'

const simulateServerRequest = (value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.length < 5) {
        reject(new Error(`The value needs to be at least 5 characters long! Current length: ${value.length}`))
      } else {
        resolve()
      }
    }, 1000)
  })
}

export const InlineEditVCPage = () => {
  const [inputMode, setInputMode] = useState('read')
  const [textareaMode, setTextareaMode] = useState('read')
  const [inputText, setInputText] = useState('input value')
  const [textareaText, setTextareaText] = useState('textarea value')

  const handleConfirm = (event: WppInlineEditCustomEvent<InlineEditConfirmDetail>) => {
    const { value, waitUntil } = event.detail

    waitUntil(simulateServerRequest(value))
  }

  return (
    <>
      <div>
        <h3>Inline Edit Input</h3>
        <WppInlineEdit
          className={styles.withErrorItem}
          value={inputText}
          mode={inputMode}
          inputWidth="300px"
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            setInputMode(event.detail.mode)
          }}
          onWppConfirm={handleConfirm}
        >
          <WppInput
            size="s"
            slot="form-element"
            name="Input Example"
            value={inputText}
            onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
              setInputText(e.detail.value!)
            }}
          />
        </WppInlineEdit>
      </div>

      <div className={styles.block}>
        <h3>Inline Edit Textarea</h3>
        <WppInlineEdit
          value={textareaText}
          mode={textareaMode}
          inputWidth="300px"
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            setTextareaMode(event.detail.mode)
          }}
          onWppConfirm={handleConfirm}
        >
          <WppTextareaInput
            size="s"
            slot="form-element"
            name="Textarea Example"
            value={textareaText}
            onWppChange={(e: CustomEvent) => {
              setTextareaText(e.detail.value!)
            }}
          />
        </WppInlineEdit>
      </div>
    </>
  )
}
```
