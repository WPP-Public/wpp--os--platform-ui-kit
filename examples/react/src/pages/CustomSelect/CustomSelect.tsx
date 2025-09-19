import React, { useRef, useState } from 'react'

import { WppPopover, WppSelect, WppButton } from '@platform-ui-kit/components-library-react'

import styles from './CustomSelect.module.scss'

const OPTIONS_LIST = ['Add', 'Reset', 'Edit']

export const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const popoverRef = useRef<HTMLWppPopoverElement>(null)

  const handleOptionSelect = (selectedOption: string) => {
    setSelectedOption(selectedOption)

    popoverRef.current?.closePopover()
  }

  return (
    <div>
      <WppPopover
        ref={popoverRef}
        config={{
          triggerElementWidth: true,
          onShow: () => {
            setIsOpened(true)
          },
          onHide: () => {
            setIsOpened(false)
          },
        }}
      >
        <WppSelect
          displayValue={selectedOption}
          slot="trigger-element"
          isDropdownOpen={isOpened}
          placeholder="Select action"
          labelConfig={{ text: 'Action (Custom select using WppSelect + WppPoppover)' }}
          required
        ></WppSelect>
        {/* Any other content here */}
        <div className={styles.list}>
          {OPTIONS_LIST.map((optionName, i) => (
            <WppButton
              key={i}
              className={styles.option}
              variant={selectedOption === optionName ? 'primary' : 'secondary'}
              onClick={() => handleOptionSelect(optionName)}
            >
              {optionName}
            </WppButton>
          ))}
        </div>
      </WppPopover>
    </div>
  )
}
