import React, { useState } from 'react'
import { WppButton, WppInlineMessage } from '@platform-ui-kit/components-library-react'
import styles from './InlineMessagesVC.module.scss'
import { MessageTypes } from '@platform-ui-kit/components-library/dist/types/types/common'

const renderInlineMessageLSize = (type: MessageTypes, message: string, hideCloseBtn: boolean, title: string) => (
  <WppInlineMessage
    key={type}
    className={styles.item}
    size="l"
    actionBtnText="Action"
    titleText={title}
    message={message}
    type={type}
    hideCloseBtn={hideCloseBtn}
    onWppClickCloseBtn={() => {
      console.log('Clicked Close')
    }}
    onWppClickActionBtn={() => {
      console.log('Clicked Action Btn')
    }}
  />
)

const ITEMS = [
  {
    type: 'warning',
    message: 'Warning message',
  },
  {
    type: 'error',
    message: 'Error message',
  },
  {
    type: 'information',
    message: 'Information message',
  },
  {
    type: 'success',
    message: 'Success message',
  },
]

export const InlineMessagesVCPage = () => {
  const [isBtnHidden, setIsBtnHidden] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('Title')

  return (
    <div className={styles.container} data-testid="inline-messages-container">
      <div className={styles.sizeL}>
        <h3>L Size Messages</h3>
        {ITEMS.map(item => renderInlineMessageLSize(item.type as MessageTypes, item.message, isBtnHidden, title))}

        <WppInlineMessage
          titleText={title === '' ? '' : 'Title (auto)'}
          className={styles.item}
          size="l"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          type="information"
          onWppClickCloseBtn={() => {
            console.log('Clicked Close')
          }}
          onWppClickActionBtn={() => {
            console.log('Clicked Action Btn')
          }}
        />

        <WppInlineMessage
          titleText={title === '' ? '' : 'Title (30 symbols)'}
          className={styles.item}
          size="l"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          showTooltipFrom={30}
          type="information"
          data-testid="hover-message"
          onWppClickCloseBtn={() => {
            console.log('Clicked Close')
          }}
          onWppClickActionBtn={() => {
            console.log('Clicked Action Btn')
          }}
        />

        <WppInlineMessage
          titleText={title}
          className={styles.item}
          size="l"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          type="information"
          data-testid="hover-message"
          onWppClickCloseBtn={() => {
            console.log('Clicked Close')
          }}
          onWppClickActionBtn={() => {
            console.log('Clicked Action Btn')
          }}
        />

        <WppButton className={styles.buttonItem} onClick={() => setIsBtnHidden(!isBtnHidden)}>
          {isBtnHidden ? 'Show' : 'Hide'} close button
        </WppButton>
        <WppButton className={styles.buttonItem} onClick={() => setTitle(title === '' ? 'Title' : '')}>
          {title === '' ? 'Add' : 'Remove'} title
        </WppButton>
      </div>

      <div className={styles.size}>
        <h3>M Size Messages</h3>
        <WppInlineMessage className={styles.item} size="m" message="Warning message" type="warning" />

        <WppInlineMessage className={styles.item} size="m" message="Error message" type="error" />

        <WppInlineMessage className={styles.item} size="m" message="Info message" type="information" />

        <WppInlineMessage className={styles.item} size="m" message="Success message" type="success" />

        <WppInlineMessage
          className={styles.item}
          size="m"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          type="information"
          data-testid="hover-message"
        />
      </div>

      <div className={styles.size}>
        <h3>S Size Messages</h3>
        <WppInlineMessage className={styles.item} size="s" message="Warning message" type="warning" />

        <WppInlineMessage className={styles.item} size="s" message="Error message" type="error" />

        <WppInlineMessage className={styles.item} size="s" message="Info message" type="information" />

        <WppInlineMessage className={styles.item} size="s" message="Success message" type="success" />

        <WppInlineMessage
          className={styles.item}
          size="s"
          type="information"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />

        <WppInlineMessage
          className={styles.item}
          size="s"
          type="information"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        />
      </div>
    </div>
  )
}
