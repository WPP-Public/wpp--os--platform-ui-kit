import React, { FC, PropsWithChildren } from 'react'
import { WppButton } from '@platform-ui-kit/components-library-react'

import styles from './index.module.scss'

export const MovingPlacesWrapper: FC<PropsWithChildren<{ title: string; onButtonClick: () => void }>> = ({
  children,
  title,
  onButtonClick,
}) => (
  <div className={styles.example}>
    <h3>{title}</h3>
    <WppButton onClick={onButtonClick}>Move places</WppButton>
    <br />
    {children}
  </div>
)
