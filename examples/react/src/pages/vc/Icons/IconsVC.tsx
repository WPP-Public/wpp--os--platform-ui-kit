import React from 'react'
import { WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './IconsVC.module.scss'
import { icons } from './config'

export const IconsVCPage = () => (
  <div className={styles.icons} data-testid="icons-container">
    {icons.map((sector, i) => (
      <div className={styles.container} key={sector.title + i}>
        <WppTypography type="xl-heading" tag="h3" className={styles.title}>
          {sector.title}
        </WppTypography>
        <div className={styles.iconsList}>
          {sector.icons.map(icon => (
            <div className={styles.info} key={icon.name}>
              <WppTypography type="xs-body" className={styles.name}>
                {icon.name}
              </WppTypography>
              {icon.html}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)
