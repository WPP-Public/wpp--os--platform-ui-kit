import { useLocation } from 'react-router-dom'

import styles from './PageLinkExample.module.scss'

export const PageLinkExample = () => {
  const { pathname } = useLocation()

  return (
    <div className={styles.wrapper}>
      <p>
        <b>Page link:</b> {pathname}
      </p>
    </div>
  )
}
