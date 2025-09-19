import { WppSelect } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'
import React from 'react'

const LIST = [
  {
    value: '',
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
  {
    value: 'belial',
    label: 'Belial',
  },
  {
    value: 'freya',
    label: 'Freya',
  },
  {
    value: 'zaken',
    label: 'Zaken',
  },
]

const DropdownMaxHeightCssVariable = () => (
  <div>
    <div className={styles.link}>
      <h1 style={{ textDecoration: 'underline' }}>
        <a href="https://jira.uhub.biz/browse/WPPLONOP-14803">
          Bugfix #14803 - css var --input-select-dropdown-max-height doesn’t work
        </a>
      </h1>
    </div>
    <div className={styles.page}>
      <WppSelect
        value=""
        type="single"
        inputValue="Lorem ipsum"
        required
        withSearch
        labelConfig={{ text: `Single select` }}
        className={styles.styledSelect}
        list={LIST}
      ></WppSelect>
    </div>
  </div>
)

export default DropdownMaxHeightCssVariable
