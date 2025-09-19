import React from 'react'
import { WppLabel } from '@platform-ui-kit/components-library-react'
import styles from './LabelsVC.module.scss'

export const LabelsVCPage = () => (
  <div className={styles.container} data-testid="labels-container">
    <div className={styles.labels}>
      <h3>Regular Labels</h3>
      <WppLabel className={styles.label} config={{ text: 'Regular Label' }} typography="s-body" />

      <WppLabel className={styles.label} disabled config={{ text: 'Disabled Regular Label' }} typography="s-body" />

      <WppLabel className={styles.label} optional config={{ text: 'Optional Regular Label' }} typography="s-body" />

      <WppLabel
        className={styles.label}
        htmlFor="email"
        config={{ text: 'Regular Label with htmlFor' }}
        typography="s-body"
      />

      <WppLabel
        className={styles.label}
        htmlFor="fname"
        optional
        disabled
        config={{ text: 'All In Regular Label' }}
        typography="s-body"
      />

      <WppLabel
        className={styles.label}
        config={{
          icon: 'wpp-icon-info',
          text: 'Label with info icon',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }}
        tooltipConfig={{
          placement: 'right',
        }}
        typography="s-body"
      />

      <WppLabel config={{ text: 'Default Label' }} data-testid="default-label"></WppLabel>
    </div>

    <div className="accent-labels">
      <h3>Accent Labels</h3>
      <WppLabel className={styles.label} config={{ text: 'Accent Label' }} typography="s-strong" />

      <WppLabel className={styles.label} disabled typography="s-strong" config={{ text: 'Disabled Accent Label' }} />

      <WppLabel className={styles.label} optional typography="s-strong" config={{ text: 'Optional Accent Label' }} />

      <WppLabel
        className={styles.label}
        htmlFor="email"
        typography="s-strong"
        config={{ text: 'Accent Label with htmlFor' }}
      />

      <WppLabel
        className={styles.label}
        htmlFor="fname"
        optional
        disabled
        typography="s-strong"
        config={{ text: 'All In Accent Label' }}
      />

      <WppLabel
        className={styles.label}
        typography="s-strong"
        data-testid="tooltip-label"
        config={{
          icon: 'wpp-icon-info',
          text: 'Accent Label with info icon',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }}
        tooltipConfig={{
          placement: 'left',
        }}
      />
    </div>
  </div>
)
