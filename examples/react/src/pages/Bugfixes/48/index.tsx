import { WppInput } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'
import styles from './index.module.scss'

export const InputTooltipTruncation = () => {
  const [inputStr, setInputStr] = useState(
    'hsdjfmgshd,jsfgahsdfkj adhsflkjadhsfkjlahsdkjfhasdfhjsdfgshasdjhfggaasdkjfghasdkjfhgaskdjfhass kjdfhak  sdhfaak jsdhfasjdksdaf..',
  )

  return (
    <div>
      <div className={styles.wrapper}>
        <WppInput value={inputStr} onWppChange={(e: any) => setInputStr(e.detail.value)} />
      </div>
    </div>
  )
}
