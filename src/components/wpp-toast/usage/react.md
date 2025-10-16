```tsx
import React, { useRef, useEffect, useState } from 'react'
import { WppToastContainer, WppButton } from '@wppopen/components-library-react'

export const useToast = () => {
  const [toastRef, setToastRef] = useState<HTMLWppToastContainerElement | null>()

  const showToast = (config: any) => {
    toastRef?.addToast(config)
  }

  useEffect(() => {
    setToastRef(document.querySelector('wpp-toast-container'))
  })

  return {
    showToast,
  }
}

export const ToastExample = () => {
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
        variant: 'tertiary',
        disabled: false,
        loading: false,
        onClick: () => console.log('primaryBtn'),
      },
      maxMessageLines: 2,
      icon: {
        name: 'wpp-icon-phone'
      }
    })
  }

  return (
    <>
      <WppButton variant="secondary" onClick={handleAddToast}>
        Add Toast
      </WppButton>
      <WppToastContainer maxToastsToDisplay={5} ref={childRef} />
    </>
  )
}
```
