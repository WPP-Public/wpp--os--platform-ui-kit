import React from 'react'
import { WppTypography } from '@platform-ui-kit/components-library-react'

import styles from './ImagesVC.module.scss'
import { images } from './config'

export const ImagesVCPage = () => (
  <>
    {images.map(section => (
      <div className={styles.container} key={section.title}>
        <WppTypography type="xl-heading" tag="h3">
          {section.title}
        </WppTypography>
        <div className={styles.section}>
          {section.images.map(image => (
            <div className={styles.item} key={image.name}>
              {image.html}
              <WppTypography type="xs-body" className={styles.info}>
                {image.name}
              </WppTypography>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
)
