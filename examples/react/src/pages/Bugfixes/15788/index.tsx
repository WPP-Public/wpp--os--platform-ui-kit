import React, { useRef, useEffect, useState } from 'react'
import { WppToastContainer, WppButton, WppActionButton } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'

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

const FastClickingButtonInSafari = () => {
  const [isDisabled, setIsDisabled] = useState(true)

  const childRef = useRef(null)

  const { showToast } = useToast()

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

  const handleToggle = () => setIsDisabled(!isDisabled)

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-15788">
            Bugfix #15788 - issue with disabled state after clicking quickly many times
          </a>
        </h1>
      </div>
      <div className={styles.buttons}>
        <WppButton variant="secondary" onClick={handleAddToast} disabled={isDisabled}>
          Add Toast
        </WppButton>

        <WppActionButton onClick={handleToggle} className={styles.stateButton}>
          Make button {isDisabled ? 'active' : 'disabled'}
        </WppActionButton>

        <WppToastContainer maxToastsToDisplay={5} ref={childRef} />
      </div>
    </div>
  )
}

export default FastClickingButtonInSafari
