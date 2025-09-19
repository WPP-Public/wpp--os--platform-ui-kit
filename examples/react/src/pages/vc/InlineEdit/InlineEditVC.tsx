import React, { useState } from 'react'

import { WppInlineEdit, WppInput, WppTextareaInput } from '@platform-ui-kit/components-library-react'
import { InlineEditMode } from '@platform-ui-kit/components-library'

import styles from './InlineEditVC.module.scss'
import {
  InputChangeEventDetail,
  InlineEditChangeModeEventDetail,
  TextareaInputChangeEventDetail,
} from '@platform-ui-kit/components-library'
import {
  WppInlineEditCustomEvent,
  WppInputCustomEvent,
  WppTextareaInputCustomEvent,
} from '@platform-ui-kit/components-library/dist/types/components'

export const InlineEditVCPage = () => {
  const [inputMode1, setInputMode1] = useState<InlineEditMode>('read')
  const [inputMode2, setInputMode2] = useState<InlineEditMode>('read')
  const [textareaMode, setTextareaMode] = useState<InlineEditMode>('read')
  const [inputText1, setInputText1] = useState('')
  const [inputText2, setInputText2] = useState('')
  const [textareaText, setTextareaText] = useState('text area value')

  return (
    <div className={styles.container}>
      <div className={styles.block} data-testid="input-inline-edit-container">
        <h3>Inline Edit Input (With inputWidth)</h3>
        <WppInlineEdit
          value={inputText1}
          mode={inputMode1}
          inputWidth="300px"
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

        <p className={styles.bottomItem}>Icon Placement test</p>
        <WppInlineEdit
          value={inputText1}
          mode={inputMode1}
          inputWidth="300px"
          dropdownConfig={{ placement: 'bottom' }}
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            setInputMode1(event.detail.mode)
            if (event.detail.mode === 'read') {
              event.detail.closePopover()
            }
          }}
          data-testid="bottom-input-inline-edit"
        >
          <WppInput size="s" slot="form-element" name="test" value={inputText1} />
        </WppInlineEdit>
      </div>

      {/* Example without inputWidth prop to use the default width */}
      <div className={styles.block} data-testid="input-inline-edit-container-default">
        <h3>Inline Edit Input (Default Width)</h3>
        <WppInlineEdit
          value={inputText2}
          mode={inputMode2}
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            console.log(event.detail)
            setInputMode2(event.detail.mode)
            if (event.detail.mode === 'read') {
              event.detail.closePopover()
            }
          }}
          data-testid="default-width-input-inline-edit"
        >
          <WppInput
            size="s"
            slot="form-element"
            name="test"
            value={inputText2}
            onWppChange={(e: WppInputCustomEvent<InputChangeEventDetail>) => {
              setInputText2(e.detail.value!)
            }}
          />
        </WppInlineEdit>
      </div>

      <div className={styles.block} data-testid="textarea-inline-edit-container">
        <h3>Inline Edit Textarea</h3>
        <WppInlineEdit
          mode={textareaMode}
          value={textareaText}
          inputWidth="300px"
          dropdownConfig={{
            placement: 'bottom-start',
          }}
          onWppModeChange={(event: WppInlineEditCustomEvent<InlineEditChangeModeEventDetail>) => {
            console.log(event.detail)
            setTextareaMode(event.detail.mode)
            if (event.detail.mode === 'read') {
              event.detail.closePopover()
            }
          }}
          data-testid="default-textarea-inline-edit"
        >
          <WppTextareaInput
            slot="form-element"
            size="s"
            rows={3}
            value={textareaText}
            onWppChange={(e: WppTextareaInputCustomEvent<TextareaInputChangeEventDetail>) => {
              setTextareaText(e.detail.value!)
            }}
          />
        </WppInlineEdit>

        <p className={styles.bottomItem}>Icon Placement test</p>
        <WppInlineEdit
          mode={textareaMode}
          value={textareaText}
          inputWidth="300px"
          dropdownConfig={{
            placement: 'bottom',
          }}
          data-testid="bottom-textarea-inline-edit"
        >
          <WppTextareaInput slot="form-element" size="s" rows={3} value={textareaText} />
        </WppInlineEdit>
      </div>
    </div>
  )
}
