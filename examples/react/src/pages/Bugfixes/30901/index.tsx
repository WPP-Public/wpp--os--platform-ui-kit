import { WppActionButton, WppButton, WppFloatingButton } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'

export const ButtonsEnterKeyFix = () => {
  const handleClick = (buttonType: string) => (event: any) => {
    console.log(`${buttonType} clicked!`, event)
    alert(`${buttonType} clicked!`)
  }

  return (
    <div className={styles.container}>
      <h1>Bugfix 30901: WppButton Enter Key Support</h1>
      <p>
        This example demonstrates that the <code>Button</code> component now triggers the <code>onClick</code> event
        when the Enter key is pressed while the button is focused.
      </p>
      <p>
        Focus the button below using the <strong>Tab</strong> key, then press the <strong>Enter</strong> key to trigger
        the <code>onClick</code> event.
      </p>
      <div className={styles.buttons}>
        <WppButton className={styles.button} onClick={handleClick('WppButton')}>
          Click Me
        </WppButton>
        <WppActionButton onClick={handleClick('WppActionButton')}>Click Me</WppActionButton>
        <WppFloatingButton onClick={handleClick('WppFloatingButton')}>Click Me</WppFloatingButton>
      </div>
    </div>
  )
}
