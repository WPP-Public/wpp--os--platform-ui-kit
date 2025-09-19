import React, { FC } from 'react'

import { WppSelect } from '@platform-ui-kit/components-library-react'
import { SelectTypes } from '@platform-ui-kit/components-library'

import styles from './index.module.scss'

const LIST = [
  {
    label: 'None',
    value: '',
  },
  {
    label: 'Thor',
    value: 'thor',
  },
  {
    label: 'Avatar',
    value: 'avatar',
  },
]

const SelectExample: FC<{ type: SelectTypes }> = ({ type }) => (
  <WppSelect
    value={type === 'multiple' ? [''] : ''}
    type={type}
    inputValue="Lorem ipsum"
    required
    labelConfig={{ text: `${type.charAt(0).toUpperCase() + type.slice(1)} select` }}
    list={LIST}
  ></WppSelect>
)

const EmptyValueSelecting = () => (
  <div>
    <div>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-14413">
          Bugfix #14413 - Combined Input: input is empty without a placeholder
        </a>
      </h1>
    </div>
    <div className={styles.page}>
      <SelectExample type="combined" />
      <SelectExample type="single" />
      <SelectExample type="multiple" />
    </div>
  </div>
)

export default EmptyValueSelecting
