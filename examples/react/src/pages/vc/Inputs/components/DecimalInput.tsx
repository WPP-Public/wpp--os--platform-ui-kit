import React, { useRef, useState } from 'react'
import { InputChangeEventDetail } from '@platform-ui-kit/components-library'
import { WppInput } from '@platform-ui-kit/components-library-react'
import { WppInputCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'

interface IProps {
  size: 'm' | 's'
  labelText: string
  className?: string
}

const DecimalInput = ({ size, className, labelText }: IProps) => {
  const [inputValues, setInputValues] = useState<string | undefined>(undefined)
  const inputRef = useRef<null | HTMLWppInputElement>(null)

  const validateLength = (event: WppInputCustomEvent<InputChangeEventDetail>) => {
    const inputValue = event.detail.value

    setInputValues(inputValue)
  }

  return (
    <>
      <WppInput
        ref={inputRef}
        labelConfig={{
          text: labelText,
        }}
        required
        name={'wpp-decimal-input-1'}
        className={className}
        type="decimal"
        size={size}
        data-testid="boundaries-values-input"
        onWppChange={validateLength}
        value={inputValues}
        minLength={3}
        maxLength={8}
        placeholder="12,23"
      />
    </>
  )
}

export default DecimalInput
