import { WppToggle } from '@platform-ui-kit/components-library-react'
import styles from './Toggles.module.scss'

export const TogglesPage = () => {
  const labelConfig = {
    text: 'Label Text',
  }

  const labelConfigIcon = {
    icon: 'wpp-icon-info',
    text: 'Label with Icon',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  const labelConfigTest = {
    text: 'Label Test',
    description: 'Description',
    locales: {
      optional: 'Optional',
    },
  }

  return (
    <div className="toggles">
      <h3>With Label</h3>
      <WppToggle
        name="focus-toggle"
        className={styles.item}
        labelConfig={labelConfig}
        required
        autoFocus
        data-testid="focus-toggle"
      />

      <WppToggle
        name="toggle-with-label"
        className={styles.item}
        labelConfig={labelConfigTest}
        required
        data-testid="toggle-with-label"
      />

      <WppToggle
        name="toggle-with-icon"
        className={styles.item}
        labelConfig={labelConfigIcon}
        data-testid="toggle-with-icon"
        required
      />

      <WppToggle
        name="toggle-with-optional-label"
        className={styles.item}
        labelConfig={labelConfig}
        data-testid="toggle-with-optional-label"
      />

      <WppToggle name="toggle-with-disabled" className={styles.item} labelConfig={labelConfig} disabled required />

      <WppToggle
        name="controlled-toggle"
        className={styles.item}
        labelConfig={{
          text: 'Controlled Toggle',
        }}
        required
        controlled
        data-testid="controlled-toggle"
      />

      <h3>Without Label</h3>
      <WppToggle
        name="toggle-without-label"
        ariaProps={{ label: 'no label' }}
        className={styles.item}
        data-testid="toggle-without-label"
      />
    </div>
  )
}
