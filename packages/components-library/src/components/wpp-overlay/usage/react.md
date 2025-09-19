```tsx
import React, { useState } from 'react'
import { WppOverlay, WppTypography, WppButton } from '@platform-ui-kit/components-library-react'
import styles from './Overlay.module.scss'

const OverlayExample = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  const handleOverlayClick = () => {
    console.log('Overlay Clicked:')
  }

  return (
    <div className={styles.container}>
      <div className={styles.scenarios}>
        <WppTypography className={styles.scenarioTitle} type="xl-heading">
          Scenario: render overlay in the body of a page.
        </WppTypography>

        <div className={styles.section}>
          <div className={styles.header}>
            <WppTypography className={styles.text} type="s-body">
              Header
            </WppTypography>
          </div>
          <div className={styles.body}>
            <WppTypography className={styles.text} type="s-body">
              Body
            </WppTypography>
            <WppOverlay isVisible={isVisible} onWppClick={handleOverlayClick} />
          </div>
        </div>
      </div>

      <WppButton
        className={styles.button}
        variant="primary"
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      >
        Toggle overlay
      </WppButton>
    </div>
  )
}
```

```scss
.container {
  padding: 20px 50px;

  .text {
    margin: 10px 0;
    display: block;
  }

  .scenarios {
    .scenarioTitle {
      margin-bottom: 20px;
    }

    .section {
      width: 100%;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 20px;
      border: 1px solid var(--wpp-grey-color-300);
      border-radius: var(--wpp-border-radius-m);
      background-color: var(--wpp-grey-color-100);

      .header {
        height: 50px;
        border-bottom: 1px solid var(--wpp-grey-color-300);
        width: 100%;
        padding-left: 20px;
        box-sizing: border-box;
      }

      .body {
        height: 100%;
        width: 100%;
        position: relative;
        padding: 20px;
        box-sizing: border-box;
      }
    }
  }
}
```
