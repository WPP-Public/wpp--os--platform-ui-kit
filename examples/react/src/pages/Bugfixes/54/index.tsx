import { WppButton, WppIconPlus } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'

const DestructiveSecondaryDisabledButtonWithIcon = () => (
  <div className={styles.actionDestructiveButtons}>
    <WppButton data-testid="plus-icon-action-destructive-button" variant="destructive-secondary">
      <WppIconPlus slot="icon-start" />
      Plus Icon
    </WppButton>

    <WppButton disabled data-testid="plus-icon-action-destructive-button" variant="destructive-secondary">
      <WppIconPlus slot="icon-start" />
      Plus Icon
    </WppButton>
  </div>
)

export default DestructiveSecondaryDisabledButtonWithIcon
