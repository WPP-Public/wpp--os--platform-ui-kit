import { WppActionButton, WppButton, WppFloatingButton } from '@platform-ui-kit/components-library-react'
import { useState } from 'react'
import styles from './index.module.scss'

export const ButtonLoadingStateExample = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (buttonType: string) => (event: any) => {
    console.log(`${buttonType} clicked!`, event)
    alert(`${buttonType} clicked!`)

    if (buttonType === 'WppButton' || buttonType === 'WppActionButton' || buttonType === 'WppFloatingButton') {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 2000)
    }
  }

  return (
    <div className={styles.container}>
      <h1>Bugfix 31702: Fix onClick events for WppButton WppActionButton WppFloatingButton loading state</h1>
      <p>
        This example demonstrates that the <code>Button</code> component will stop triggering the <code>onClick</code>
        event when it is in a <strong>loading</strong> state, preventing multiple event triggers.
      </p>
      <p>
        Focus the buttons below using the <strong>Tab</strong> key, then press the <strong>Enter</strong> or
        <strong>Space</strong> key to trigger the <code>onClick</code> event. The button will simulate a loading state
        for 2 seconds.
      </p>
      <div className={styles.buttons}>
        <WppButton className={styles.button} loading={isLoading} onClick={handleClick('WppButton')}>
          Click Me
        </WppButton>
        <WppActionButton loading={isLoading} onClick={handleClick('WppActionButton')}>
          Click Me
        </WppActionButton>
        <WppFloatingButton loading={isLoading} onClick={handleClick('WppFloatingButton')}>
          Click Me
        </WppFloatingButton>
      </div>
    </div>
  )
}
