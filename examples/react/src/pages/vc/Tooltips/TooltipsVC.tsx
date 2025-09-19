import { useCallback, useState } from 'react'
import { WppButton, WppListItem, WppTooltip, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './TooltipsVC.module.scss'
import { TooltipThemeTypes } from '@platform-ui-kit/components-library'

export const TooltipsVCPage = () => {
  const [placement, setPlacement] = useState<'top' | 'bottom'>('top')
  const [theme, setTheme] = useState<TooltipThemeTypes>('dark')

  const handleCopyBtnClick = () => setPlacement(prevPlacement => (prevPlacement === 'top' ? 'bottom' : 'top'))

  const handleChangeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const handleOnShow = useCallback(() => {
    console.log('Tooltip')
  }, [])

  return (
    <div data-testid="tooltips">
      <div className={styles.container}>
        <h2 className={styles.title}>Tooltips</h2>
        <div className={styles.containerTooltips}>
          <WppTooltip
            config={{
              placement: 'right',
            }}
            header="Header Text"
            text={`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`}
            value="$100,000"
            data-testid="right-tooltip-button"
          >
            <WppButton className={styles.button}>Right</WppButton>
          </WppTooltip>

          <WppTooltip
            config={{ placement: 'top' }}
            text={`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`}
            value="$100,000"
            data-testid="top-tooltip-button"
          >
            <WppButton className={styles.button}>With word-break: break-word</WppButton>
          </WppTooltip>

          <WppTooltip config={{ placement: 'left' }} header="Header Only" data-testid="left-tooltip-button">
            <WppButton className={styles.button}>Left</WppButton>
          </WppTooltip>

          <WppTooltip
            config={{ placement: 'top' }}
            text={`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`}
            value="$100,000"
            wordBreak="break-all"
            data-testid="top-tooltip-button"
          >
            <WppButton className={styles.button}>With word-break: break-all</WppButton>
          </WppTooltip>

          <WppTooltip
            config={{ placement: 'top' }}
            text={`Price\n\nAnd then another row and a row that is really really long because why not we can have such\n\nAnd the Last row`}
            value="$100,000"
            wordBreak="auto-phrase"
            data-testid="top-tooltip-button"
          >
            <WppButton className={styles.button}>With word-break: auto-phrase</WppButton>
          </WppTooltip>

          <WppTooltip
            config={{
              placement,
              hideOnClick: false,
              onShow: handleOnShow,
            }}
            text="Tooltip info"
          >
            <WppButton className={styles.button} onClick={handleCopyBtnClick} data-testid="tippyButton">
              Click to update position
            </WppButton>
          </WppTooltip>

          <WppTooltip
            config={{
              placement: 'top',
              trigger: 'click',
            }}
            text="Tooltip info"
            ariaProps={{ describedby: '#my-custom-tooltip-content' }}
          >
            <WppButton data-testid="tippyButton">Tooltip triggered by click</WppButton>
          </WppTooltip>
        </div>

        <div className={styles.customTooltipContainer}>
          <WppTypography className={styles.customContentTitle} type="2xl-heading">
            Tooltips with custom content
          </WppTypography>
          <WppTooltip theme={theme} config={{ placement: 'right', allowHTML: true }}>
            <WppButton className={styles.button} data-testid="allow-html-tooltip-button">
              Custom Content Tooltip (with WppListItem)
            </WppButton>
            <div
              slot="tooltip-content"
              className={`${styles.customContentContainer} ${theme === 'light' ? styles.light : ''}`}
            >
              <WppListItem className={styles.item}>
                <span slot="label">List Item</span>
              </WppListItem>

              <WppListItem className={styles.item}>
                <span slot="label">List Item</span>
              </WppListItem>

              <WppListItem className={styles.item}>
                <span slot="label">List Item</span>
              </WppListItem>
            </div>
          </WppTooltip>

          <WppTooltip theme={theme} config={{ placement: 'right', allowHTML: true }}>
            <WppButton className={styles.button}>Custom Content Tooltip (with WppTypography)</WppButton>
            <div slot="tooltip-content">
              <WppTypography tag="h2" type="m-strong">
                Bold Content
              </WppTypography>
              <WppTypography tag="p" type="s-body">
                Body content
              </WppTypography>
            </div>
          </WppTooltip>

          <div className={styles['theme-container']}>
            <WppButton className={styles.changeBtn} onClick={handleChangeTheme} data-testid="change-theme-of-tooltip">
              Change theme
            </WppButton>
            <WppTypography type="l-strong">Current theme: {theme}</WppTypography>
          </div>
        </div>

        <div className={styles.otherTooltipsContainer}>
          <h2 className={styles.title}>Other types of Tooltips</h2>
          <WppTooltip config={{ placement: 'bottom' }} text="Warning Message" warning data-testid="warning-tooltip">
            <WppButton variant="primary" className={styles.button}>
              Warning Tooltip
            </WppButton>
          </WppTooltip>
          <WppTooltip config={{ placement: 'bottom' }} text="Error Message" error data-testid="error-tooltip">
            <WppButton variant="destructive" className={styles.button}>
              Error Tooltip
            </WppButton>
          </WppTooltip>
        </div>
        <div className={styles.otherTooltipsContainer}>
          <h4 className={styles.title}>Title + Text</h4>
          <WppTooltip
            config={{ placement: 'bottom' }}
            text="Warning Message"
            header="Title"
            warning
            data-testid="warning-tooltip"
          >
            <WppButton variant="primary" className={styles.button}>
              Warning Tooltip
            </WppButton>
          </WppTooltip>
          <WppTooltip
            config={{ placement: 'bottom' }}
            text="Error Message"
            header="Title"
            error
            data-testid="error-tooltip"
          >
            <WppButton variant="destructive" className={styles.button}>
              Error Tooltip
            </WppButton>
          </WppTooltip>
        </div>
      </div>
    </div>
  )
}
