import { WppButton, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { COUNTDOWN } from './config'
import { SAMPLE_LIST_1, SAMPLE_LIST_COMBINED, SAMPLE_LIST_MULTIPLE } from '../../SingleSelect/consts'

const SelectsBlurAndFocusEvents = () => {
  const multipleSelectRef = useRef<HTMLWppSelectElement | null>(null)
  const singleSelectRef = useRef<HTMLWppSelectElement | null>(null)
  const combinedSelectRef = useRef<HTMLWppSelectElement | null>(null)
  const textSelectRef = useRef<HTMLWppSelectElement | null>(null)

  const [multipleItems, setMultipleItems] = useState<any[] | undefined>(['car', 'long'])
  const [singleItems, setSingleItems] = useState<string>('car')

  const [activeRef, setActiveRef] = useState<React.MutableRefObject<HTMLWppSelectElement | null>>(
    useRef<HTMLWppSelectElement | null>(null),
  )
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => {
          const currentTimeValue = prevTime - 1

          if (currentTimeValue === 0) {
            activeRef?.current?.blur()
          }

          return currentTimeValue
        })
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timeRemaining])

  const setTimer = (): void => {
    setTimeRemaining(COUNTDOWN)
  }

  const handleResetClick = () => {
    setMultipleItems([])
  }

  const handleFocus = (refElement: React.MutableRefObject<HTMLWppSelectElement | null>) => {
    if (refElement?.current) {
      refElement?.current?.setFocus()
    }
  }

  const handleBlur = (refElement: React.MutableRefObject<HTMLWppSelectElement | null>) => {
    if (refElement?.current) {
      setActiveRef(refElement)
      setTimer()
    }
  }

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-16076">
            Bugfix #16076 - All components based on inputs should be stateless
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <div className={styles.pageSection}>
          <div className={styles.btnsContainer}>
            <WppButton onClick={() => handleFocus(multipleSelectRef)} data-testid="focus-btn">
              Focus Multiple Select
            </WppButton>
            <WppButton class={styles.blurBtn} onClick={() => handleBlur(multipleSelectRef)} data-testid="focus-btn">
              Blur Multiple Select
            </WppButton>
            <WppTypography type="m-strong">{activeRef === multipleSelectRef ? timeRemaining : 0}</WppTypography>
          </div>
          <WppSelect
            ref={multipleSelectRef}
            placeholder="Choose options"
            type="multiple"
            required
            withFolder
            withSearch
            labelConfig={{ text: 'Multiple Select with search' }}
            onWppChange={(e: CustomEvent) => setMultipleItems(e.detail.value)}
            className={styles.item}
            value={multipleItems}
            list={SAMPLE_LIST_MULTIPLE}
          ></WppSelect>
          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={handleResetClick} data-testid="reset-button">
              Reset
            </WppButton>
          </div>
        </div>
        <div className={styles.pageSection}>
          <div className={styles.btnsContainer}>
            <WppButton onClick={() => handleFocus(singleSelectRef)} data-testid="focus-btn">
              Focus Single Select
            </WppButton>
            <WppButton class={styles.blurBtn} onClick={() => handleBlur(singleSelectRef)} data-testid="focus-btn">
              Blur Single Select
            </WppButton>
            <WppTypography type="m-strong">{activeRef === singleSelectRef ? timeRemaining : 0}</WppTypography>
          </div>
          <WppSelect
            ref={singleSelectRef}
            placeholder="Choose options"
            type="single"
            required
            withSearch
            labelConfig={{ text: 'Single Select with search' }}
            data-testid="single-select"
            onWppChange={(e: CustomEvent) => setSingleItems(e.detail.value)}
            className={styles.item}
            value={singleItems}
            list={SAMPLE_LIST_1}
          ></WppSelect>
        </div>
        <div className={styles.pageSection}>
          <div className={styles.btnsContainer}>
            <WppButton onClick={() => handleFocus(combinedSelectRef)} data-testid="focus-btn">
              Focus Combined Select
            </WppButton>
            <WppButton class={styles.blurBtn} onClick={() => handleBlur(combinedSelectRef)} data-testid="focus-btn">
              Blur Combined Select
            </WppButton>
            <WppTypography type="m-strong">{activeRef === combinedSelectRef ? timeRemaining : 0}</WppTypography>
          </div>
          <WppSelect
            ref={combinedSelectRef}
            className={styles.select}
            type="combined"
            placeholder="Placeholder"
            labelConfig={{ text: 'Donate sum' }}
            value="usd"
            inputValue="100"
            list={SAMPLE_LIST_COMBINED}
          ></WppSelect>
        </div>
        <div className={styles.pageSection}>
          <div className={styles.btnsContainer}>
            <WppButton onClick={() => handleFocus(textSelectRef)} data-testid="focus-btn">
              Focus Text Select
            </WppButton>
            <WppButton class={styles.blurBtn} onClick={() => handleBlur(textSelectRef)} data-testid="focus-btn">
              Blur Text Select
            </WppButton>
            <WppTypography type="m-strong">{activeRef === textSelectRef ? timeRemaining : 0}</WppTypography>
          </div>
          <WppSelect list={SAMPLE_LIST_1} ref={textSelectRef} type="text" placeholder="Placeholder"></WppSelect>
        </div>
      </div>
    </div>
  )
}

export default SelectsBlurAndFocusEvents
