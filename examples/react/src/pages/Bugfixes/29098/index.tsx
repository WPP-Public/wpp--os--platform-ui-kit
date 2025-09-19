import React, { FC } from 'react'

import { WppSelect } from '@platform-ui-kit/components-library-react'
import { SelectTypes } from '@platform-ui-kit/components-library'

import styles from './index.module.scss'

const LIST = [
  {
    value: 0,
    label: 'None',
  },
  {
    value: 'thor',
    label: 'Thor',
  },
  {
    value: 'avatar',
    label: 'Avatar',
  },
]

const SelectExample: FC<{ type: SelectTypes }> = ({ type }) => (
  <WppSelect
    placeholder="Choose option"
    value={type === 'multiple' ? [''] : ''}
    type={type}
    inputValue="Lorem ipsum"
    required
    data-testid={`wpp-select-${type}`}
    labelConfig={{ text: `${type.charAt(0).toUpperCase() + type.slice(1)} select` }}
    list={LIST}
  ></WppSelect>
)

const FalsyValueSelecting = () => (
  <div>
    <div>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-29098">Bugfix #29098 - Select: value of items cannot be falsy</a>
      </h1>
    </div>
    <div className={styles.page}>
      <SelectExample type="combined" />
      <SelectExample type="single" />
      <SelectExample type="multiple" />
    </div>
  </div>
)

export default FalsyValueSelecting
