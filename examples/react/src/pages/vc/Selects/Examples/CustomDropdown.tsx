import React, { useRef, useState } from 'react'

import { WppInput, WppIconChevron, WppPopover, WppListItem } from '@platform-ui-kit/components-library-react'

const OPTIONS_LIST = ['Admin', 'Country Admin', 'User']

const CustomDropdown = () => {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(false)
  const popoverRef = useRef<HTMLWppPopoverElement>(null)

  const handleOptionSelect = (selectedOption: string) => {
    setSelectedOption(selectedOption)
    popoverRef.current?.closePopover()
  }

  const style: Record<string, string> = { '--wpp-list-item-width': '200px' }

  return (
    <WppPopover
      ref={popoverRef}
      config={{
        onShow: () => setIsActive(true),
        onHide: () => setIsActive(false),
        triggerElementWidth: true,
      }}
    >
      <WppInput
        value={selectedOption}
        slot="trigger-element"
        placeholder="Select user role"
        labelConfig={{ text: 'Role (Custom dropdown using WppInput + WppPoppover)' }}
        required
      >
        <WppIconChevron slot="icon-end" direction={isActive ? 'up' : 'down'} />
      </WppInput>
      <div style={style}>
        {/* Any other content here */}
        {OPTIONS_LIST.map(option => (
          <WppListItem
            key={option}
            checked={selectedOption === option}
            onWppChangeListItem={() => handleOptionSelect(option)}
          >
            <p slot="label">{option}</p>
          </WppListItem>
        ))}
      </div>
    </WppPopover>
  )
}

export default CustomDropdown
