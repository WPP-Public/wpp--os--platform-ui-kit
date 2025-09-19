import styles from './index.module.scss'
import { WppTypography } from '@platform-ui-kit/components-library-react'

export const ItalicTextClipping = () => (
  <div className={styles.typography} data-testid="typography-div">
    {/* Display Typographies */}
    <WppTypography className={styles.caption} type="5xl-display">
      5xl-display
    </WppTypography>

    <WppTypography className={styles.caption} type="4xl-display">
      4xl-display
    </WppTypography>

    {/* Heading Typographies */}
    <WppTypography className={styles.caption} type="3xl-heading">
      3xl-heading
    </WppTypography>

    <WppTypography className={styles.caption} type="2xl-heading">
      2xl-heading
    </WppTypography>

    <WppTypography className={styles.caption} type="xl-heading">
      xl-heading
    </WppTypography>

    {/* Body Typographies */}
    <WppTypography className={styles.caption} type="l-strong">
      l-strong
    </WppTypography>
    <WppTypography className={styles.caption} type="l-midi">
      l-midi
    </WppTypography>
    <WppTypography className={styles.caption} type="l-body">
      l-body
    </WppTypography>

    <WppTypography className={styles.caption} type="m-strong">
      m-strong
    </WppTypography>
    <WppTypography className={styles.caption} type="m-midi">
      m-midi
    </WppTypography>
    <WppTypography className={styles.caption} type="m-body">
      m-body
    </WppTypography>

    <WppTypography className={styles.caption} type="s-strong">
      s-strong
    </WppTypography>
    <WppTypography className={styles.caption} type="s-midi">
      s-midi
    </WppTypography>
    <WppTypography className={styles.caption} type="s-body">
      s-body
    </WppTypography>

    <WppTypography className={styles.caption} type="xs-strong">
      xs-strong
    </WppTypography>
    <WppTypography className={styles.caption} type="xs-midi">
      xs-midi
    </WppTypography>
    <WppTypography className={styles.caption} type="xs-body">
      xs-body
    </WppTypography>

    <WppTypography className={styles.caption} type="2xs-strong">
      2xs-strong
    </WppTypography>
  </div>
)
