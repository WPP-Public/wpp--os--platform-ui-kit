import React, { useState } from 'react'

import styles from './StickyBar.module.scss'
import { WppStickyBar, WppTypography, WppButton } from '@platform-ui-kit/components-library-react'
import { invalidButtonsList, largerTabsList, validButtonsList, validTabsList } from './consts'

import {
  StickyBarButtonItem,
  StickyBarTabItem,
} from '@platform-ui-kit/components-library/dist/types/components/wpp-sticky-bar/types'
import { WppStickyBarCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'

export const StickyBarPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [stickyBarTitle, setStickyBarTitle] = useState<string>('Page title')
  const [hasBackButton, setHasBackButton] = useState<boolean>(true)
  const [listOfButtons, setListOfButtons] = useState<StickyBarButtonItem[]>(validButtonsList)
  const [listOfTabs, setListOfTabs] = useState<StickyBarTabItem[]>(validTabsList)
  const [scrollTreshold, setScrollTreshold] = useState<number>(300)
  const [offsetFromTop, setOffsetFromTop] = useState<number | undefined>(undefined)

  const handleChangeButtons = (change: 'slice' | 'refresh' | 'clear' | 'update') => {
    if (change === 'clear') {
      setListOfButtons([])

      return
    }

    if (change === 'update') {
      setListOfButtons(invalidButtonsList)

      return
    }

    setListOfButtons(change === 'slice' ? validButtonsList.slice(0, 2) : validButtonsList)
  }

  const handleChangePage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div className={`wpp ${styles.osBar}`}>
        <header>
          <WppTypography type="2xl-heading">OS-bar</WppTypography>
        </header>
      </div>
      {currentPage === 0 && (
        <WppStickyBar
          onWppClickBackIcon={() => {
            console.log('Has Clicked Back Icon')
          }}
          onWppClickBtn={(event: WppStickyBarCustomEvent<StickyBarButtonItem>) => console.log(event)}
          buttons={listOfButtons}
          barTitle={stickyBarTitle}
          withBackButton={hasBackButton}
          scrollTreshold={scrollTreshold}
          offsetFromTop={offsetFromTop}
        ></WppStickyBar>
      )}
      {currentPage === 1 && (
        <WppStickyBar
          onWppClickBackIcon={() => {
            console.log('Has Clicked Back Icon')
          }}
          onWppClickBtn={(event: WppStickyBarCustomEvent<StickyBarButtonItem>) => console.log(event)}
          variant="two-lines"
          buttons={listOfButtons}
          barTitle={stickyBarTitle}
          withBackButton={hasBackButton}
          scrollTreshold={scrollTreshold}
          offsetFromTop={offsetFromTop}
        >
          <div className={styles.stickyContent} slot="content">
            <WppTypography className={styles.testText} type="xl-heading">
              This is a test
            </WppTypography>
          </div>
        </WppStickyBar>
      )}
      {currentPage === 2 && (
        <WppStickyBar
          onWppClickBackIcon={() => {
            console.log('Has Clicked Back Icon')
          }}
          onWppClickBtn={(event: WppStickyBarCustomEvent<StickyBarButtonItem>) => console.log(event)}
          onWppClickTab={(event: WppStickyBarCustomEvent<StickyBarTabItem>) => console.log(event)}
          variant="two-lines-with-tabs"
          buttons={listOfButtons}
          tabs={listOfTabs}
          barTitle={stickyBarTitle}
          withBackButton={hasBackButton}
          scrollTreshold={scrollTreshold}
          offsetFromTop={offsetFromTop}
        ></WppStickyBar>
      )}
      {currentPage === 3 && (
        <WppStickyBar
          onWppClickBackIcon={() => {
            console.log('Has Clicked Back Icon')
          }}
          scrollTreshold={scrollTreshold}
          variant="blank"
          offsetFromTop={offsetFromTop}
        >
          <div className={styles.stickyContent} slot="content">
            <div className={styles.contentBtns}>
              <WppButton>Test</WppButton>
            </div>
            <WppTypography className={styles.testText} type="xl-heading">
              This is a test
            </WppTypography>
          </div>
        </WppStickyBar>
      )}
      <div className={styles.container}>
        <div className={styles.options}>
          <WppButton className={styles.configBtn} onClick={() => handleChangePage(0)} variant="primary">
            One line Bar
          </WppButton>
          <WppButton className={styles.configBtn} onClick={() => handleChangePage(1)} variant="primary">
            Two line Bar
          </WppButton>
          <WppButton className={styles.configBtn} onClick={() => handleChangePage(2)} variant="primary">
            Two line Bar with tabs
          </WppButton>
          <WppButton className={styles.configBtn} onClick={() => handleChangePage(3)} variant="primary">
            Blank
          </WppButton>
        </div>

        <div className={styles.additionalSpace}>
          <WppTypography type="2xl-heading">Additional space on page</WppTypography>
          <div className={styles.config}>
            <WppButton className={styles.configBtn} onClick={() => handleChangeButtons('slice')} variant="primary">
              Change to 2 buttons
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => handleChangeButtons('refresh')} variant="primary">
              Change to 4 buttons
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => handleChangeButtons('clear')} variant="primary">
              No buttons
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => handleChangeButtons('update')} variant="destructive">
              Update to 2 primary buttons
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => setListOfTabs(validTabsList)} variant="primary">
              Change to 5 tabs
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => setListOfTabs(largerTabsList)} variant="primary">
              Change to 7 tabs
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => setListOfTabs([])} variant="primary">
              No tabs
            </WppButton>
            <WppButton className={styles.configBtn} onClick={() => setHasBackButton(!hasBackButton)} variant="primary">
              {hasBackButton ? 'Hide' : 'Show'} back button
            </WppButton>
            <WppButton
              className={styles.configBtn}
              onClick={() => setStickyBarTitle(stickyBarTitle.length > 0 ? '' : 'Page title')}
              variant="primary"
            >
              {stickyBarTitle.length > 0 ? 'Hide' : 'Show'} bar title
            </WppButton>
            <WppButton
              className={styles.configBtn}
              onClick={() => setScrollTreshold(scrollTreshold === 500 ? 300 : 500)}
              variant="primary"
            >
              Change scroll treshold to {scrollTreshold === 500 ? 300 : 500}
            </WppButton>
            <WppButton
              className={styles.configBtn}
              onClick={() => setOffsetFromTop(offsetFromTop === 100 || offsetFromTop === undefined ? 90 : 100)}
              variant="primary"
            >
              Change offsetFromTop to {offsetFromTop === 100 || offsetFromTop === undefined ? 90 : 100}
            </WppButton>
          </div>
        </div>
      </div>
    </>
  )
}
