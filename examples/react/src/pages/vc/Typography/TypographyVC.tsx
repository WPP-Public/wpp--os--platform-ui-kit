import { WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './TypographyVC.module.scss'

export const TypographyVCPage = () => (
  <div className={styles.typography} data-testid="typography-div">
    {/* Display Typographies */}
    <WppTypography type="5xl-display">5xl-display</WppTypography>

    <WppTypography type="4xl-display">4xl-display</WppTypography>

    {/* Heading Typographies */}
    <WppTypography type="3xl-heading">3xl-heading</WppTypography>

    <WppTypography type="2xl-heading">2xl-heading</WppTypography>

    <WppTypography type="xl-heading">xl-heading</WppTypography>

    {/* Body Typographies */}
    <WppTypography type="l-strong">l-strong</WppTypography>
    <WppTypography type="l-midi">l-midi</WppTypography>
    <WppTypography type="l-body">l-body</WppTypography>

    <WppTypography type="m-strong">m-strong</WppTypography>
    <WppTypography type="m-midi">m-midi</WppTypography>
    <WppTypography type="m-body">m-body</WppTypography>

    <WppTypography type="s-strong">s-strong</WppTypography>
    <WppTypography type="s-midi">s-midi</WppTypography>
    <WppTypography type="s-body">s-body</WppTypography>

    <WppTypography type="xs-strong">xs-strong</WppTypography>
    <WppTypography type="xs-midi">xs-midi</WppTypography>
    <WppTypography type="xs-body">xs-body</WppTypography>

    <WppTypography type="2xs-strong">2xs-strong</WppTypography>
  </div>
)
