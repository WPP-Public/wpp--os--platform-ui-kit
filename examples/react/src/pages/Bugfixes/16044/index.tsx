import { WppButton, WppSelect } from '@platform-ui-kit/components-library-react'
import React, { useRef, useState } from 'react'
import { SAMPLE_LIST_1, SAMPLE_LIST_2 } from '../../SingleSelect/consts'
import { ListItemInterface } from '@platform-ui-kit/components-library'

const MultiSelectValueSetBeforeOptions = () => {
  const selectRef = useRef<HTMLWppSelectElement>(null)

  const [value, setValue] = useState<string[]>([])
  const [options, setOptions] = useState<ListItemInterface[]>([])
  const loadOptions = () => {
    setOptions(options.length === 6 ? SAMPLE_LIST_2 : SAMPLE_LIST_1)
  }

  return (
    <div>
      <div>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-16044">
            Bugfix #16044 - Select: The component display does not change after set the options
          </a>
        </h1>
      </div>
      <div className="mb-5 flex items-center justify-center gap-10">
        <div className="flex-1">
          <WppSelect
            ref={selectRef}
            withSearch={true}
            showSelectAllText={false}
            withFolder={true}
            required
            type="multiple"
            value={value}
            labelConfig={{ text: 'Multiple Select Without Initial Options' }}
            onWppChange={({ detail }) => {
              console.log('Value changed:', detail.value)
              setValue(detail.value)
            }}
            list={options}
          ></WppSelect>
        </div>
        <div className="flex flex-1 gap-5">
          <WppButton onClick={loadOptions}>Populate Options</WppButton>
        </div>
      </div>
    </div>
  )
}

export default MultiSelectValueSetBeforeOptions
