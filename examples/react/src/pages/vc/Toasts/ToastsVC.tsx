import React, { useRef, useEffect, useState } from 'react'
import { WppToastContainer, WppButton, WppToast } from '@platform-ui-kit/components-library-react'
import styles from './ToastsVC.module.scss'
import { ButtonState } from '@platform-ui-kit/components-library'

export const useToast = () => {
  const [toastRef, setToastRef] = useState<HTMLWppToastContainerElement | null>()

  const showToast = (config: any) => {
    toastRef?.addToast(config)
  }

  useEffect(() => {
    setToastRef(document.querySelector<HTMLWppToastContainerElement>('.wpp-toast-container'))
  })

  return {
    showToast,
  }
}

export const ToastsVCPage = () => {
  const childRef = useRef(null)

  const { showToast } = useToast()

  const primaryButton: ButtonState = {
    label: 'Button',
    variant: 'inverted' as const,
    disabled: false,
    loading: false,
    onClick: () => console.log('Clicked'),
  }

  const handleAddToast = () => {
    showToast({
      message: `Successful message`,
      type: 'success',
      header: 'Title',
      duration: 4000,
      primaryBtn: {
        label: 'Button',
        variant: 'inverted' as const,
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
    })
  }

  const handleAddCustomToast = () => {
    showToast({
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
      type: 'success',
      header: 'Title',
      duration: 4000,
      primaryBtn: {
        label: 'Button',
        variant: 'inverted' as const,
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
      maxMessageLines: 2,
      icon: {
        name: 'wpp-icon-phone',
      },
    })
  }

  const handleAddToastWithLongText = () => {
    showToast({
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`,
      type: 'success',
      header: 'Title',
      duration: 4000,
      primaryBtn: {
        label: 'Button',
        variant: 'inverted' as const,
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
      icon: {
        url: 'https://mui.com/static/images/avatar/1.jpg',
      },
    })
  }

  return (
    <div>
      <div className={styles.toastBtnsWrapper}>
        <WppButton variant="secondary" onClick={handleAddToast} data-testid="add-toast-button">
          Add Toast
        </WppButton>

        <WppButton variant="secondary" onClick={handleAddCustomToast} data-testid="add-toast-with-custom-icon-button">
          Add Toast with custom icon
        </WppButton>

        <WppButton
          variant="secondary"
          onClick={handleAddToastWithLongText}
          data-testid="add-toast-with-long-text-button"
        >
          Add Toast with long text
        </WppButton>
      </div>

      <WppToastContainer maxToastsToDisplay={5} ref={childRef} />

      <div className="toasts-container">
        <h3>Chat Input Message Toasts</h3>
        <div className={styles.chatItems}>
          <WppToast className={styles.chatItem} message="Error" type="error" variant="chat" duration={600000} />
          <WppToast className={styles.chatItem} message="Success" type="success" variant="chat" duration={600000} />
          <WppToast
            className={styles.chatItem}
            message="Information"
            type="information"
            variant="chat"
            duration={600000}
          />
        </div>

        <div className={styles.items}>
          <h3> Default Message Toasts</h3>
          <WppToast
            className={styles.item}
            header="Error Header Text"
            message="Error Message Text"
            type="error"
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Warning Header Text"
            message="Warning Message Text"
            type="warning"
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Info Header"
            message="Info Message Text"
            type="information"
            duration={60000}
          />

          <WppToast
            className={`${styles.item} ${styles.withMargin}`}
            header="Success Header Text"
            message="Success Message Text"
            type="success"
            duration={60000}
          />

          <WppToast className={styles.item} message="Text without header" type="error" duration={60000} />

          <WppToast
            className={styles.item}
            header="Header text without message text"
            message=""
            type="warning"
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Very long header message Very long header message Very long header message Very long header message "
            message="Very long message Very long message Very long message Very long message Very long message Very long message "
            type="information"
            duration={60000}
          />

          <WppToast
            className={styles.item}
            message="Very long message Very long message Very long message Very long message Very long message Very long message "
            type="information"
            duration={60000}
          />
        </div>

        <div className={styles.items}>
          <h3> Message Toasts with Action Button</h3>
          <WppToast
            className={styles.item}
            header="Error Header Text"
            message="Error Message Text"
            type="error"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Warning Header Text"
            message="Warning Message Text"
            type="warning"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Info Header"
            message="Info Message Text"
            type="information"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={`${styles.item} ${styles.withMargin}`}
            header="Success Header Text"
            message="Success Message Text"
            type="success"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={styles.item}
            message="Text without header"
            type="error"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Header text without message text"
            message=""
            type="warning"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={styles.item}
            header="Very long header message Very long header message Very long header message Very long header message "
            message="Very long message Very long message Very long message Very long message Very long message Very long message "
            type="information"
            primaryBtn={primaryButton}
            ariaProps={{ label: 'Button' }}
            duration={60000}
          />

          <WppToast
            className={styles.item}
            message="Very long message Very long message Very long message Very long message Very long message Very long message "
            type="information"
            primaryBtn={primaryButton}
            duration={60000}
            ariaProps={{ label: 'Button' }}
          />
        </div>
      </div>
    </div>
  )
}
