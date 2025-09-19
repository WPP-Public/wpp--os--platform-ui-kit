import { WppInlineEdit, WppInput } from '@platform-ui-kit/components-library-react'
import React, { useState } from 'react'
import {
  WppInlineEditCustomEvent,
  WppInputCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'
import {
  InlineEditChangeModeEventDetail,
  InlineEditMode,
  InputChangeEventDetail,
} from '@platform-ui-kit/components-library'

export const InlineEditSeveralIssues = () => {
  const [inputText, setInputText] = useState('')
  const [inputMode, setInputMode] = useState<InlineEditMode>('read')
  const [inputText2, setInputText2] = useState('')
  const [inputMode2, setInputMode2] = useState<InlineEditMode>('read')

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
            if (event.detail.mode === 'read') event.detail.closePopover()
          }}
        >
          <WppInput
            size="s"
            slot="form-element"
            name="test"
            type="number"
            required
            minLength={3}
            maxLength={10}
            value={inputText}
            onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
              setInputText(e.detail.value!)
            }}
          />
        </WppInlineEdit>

        <h3>Inline Edit Input2</h3>
        <WppInlineEdit
          value={inputText2}
          mode={inputMode2}
          inputWidth="300px"
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            setInputMode2(event.detail.mode)
            if (event.detail.mode === 'read') event.detail.closePopover()
          }}
        >
          <WppInput
            size="s"
            slot="form-element"
            name="test"
            type="number"
            required
            minLength={2}
            maxLength={8}
            value={inputText2}
            onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
              setInputText2(e.detail.value!)
            }}
          />
        </WppInlineEdit>
      </div>
    </>
  )
}
