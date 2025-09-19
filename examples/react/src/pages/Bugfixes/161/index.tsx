import { useState } from 'react'
import styles from './index.module.scss'
import { WppTooltip, WppButton, WppActionButton } from '@platform-ui-kit/components-library-react'

const SHORT_TEXT = 'Short Text'
const LONG_TEXT =
  'This is a much longer tooltip text to test dynamic alignment and resizing when transitioning from short text.'

export const TooltipDynamicTextUpdate = () => {
  const [tooltipText, setTooltipText] = useState<string>(SHORT_TEXT)
  const [placement, setPlacement] = useState<'top' | 'right' | 'bottom' | 'left'>('top')

  const handleMouseEnter = () => {
    setTimeout(() => {
      setTooltipText(prevText => (prevText === SHORT_TEXT ? LONG_TEXT : SHORT_TEXT))
    }, 3000)
  }

  const handleReverseText = () => {
    setTooltipText(prevText => (prevText === SHORT_TEXT ? LONG_TEXT : SHORT_TEXT))
  }

  const handlePlacementChange = () => {
    const placements = ['top', 'right', 'bottom', 'left']
    const nextIndex = (placements.indexOf(placement) + 1) % placements.length

    setPlacement(placements[nextIndex] as 'top' | 'right' | 'bottom' | 'left')
  }

  return (
    <div>
      {/* Hover to Toggle (3s Delay) */}
      <div className={styles.buttonContainer}>
        <WppTooltip text={tooltipText} config={{ placement }}>
          <WppButton onMouseEnter={handleMouseEnter} data-testid="hoverButton">
            Hover (Toggle After 3s)
          </WppButton>
        </WppTooltip>
      </div>

      {/* Reverse Text Immediately via Button */}
      <div className={styles.buttonContainer}>
        <WppActionButton variant="secondary" onClick={handleReverseText} data-testid="reverseTextButton">
          Reverse Tooltip Text (Instant)
        </WppActionButton>
      </div>

      {/* Change Placement */}
      <div className={styles.buttonContainer}>
        <WppActionButton variant="secondary" onClick={handlePlacementChange} data-testid="changePlacementButton">
          Change Tooltip Placement (Current: {placement})
        </WppActionButton>
      </div>

      <p>
        Current Tooltip Text: <strong>{tooltipText}</strong>
      </p>
    </div>
  )
}
