import { WppButton, WppListItem, WppMenuContext } from '@platform-ui-kit/components-library-react'
import React from 'react'
import styles from './index.module.scss'

const EventNotTriggeringMenuContext = () => (
  <div>
    <div className={styles.container}>
      <WppMenuContext>
        <WppButton className={styles.button} size="s" slot="trigger-element" disabled={true}>
          One
        </WppButton>
        <WppListItem value={'ONE'} onWppChangeListItem={() => console.log('CLICK ONE')}>
          <p slot="label">ONE</p>
        </WppListItem>
      </WppMenuContext>

      <WppMenuContext>
        <WppButton size="s" slot="trigger-element" disabled={false}>
          Two
        </WppButton>
        <WppListItem value={'TWO'} onWppChangeListItem={() => console.log('CLICK TWO')}>
          <p slot="label">TWO</p>
        </WppListItem>
      </WppMenuContext>
    </div>
  </div>
)

export default EventNotTriggeringMenuContext
