import {
  WppIconGrid,
  WppIconDataViewCards,
  WppIconDataViewList,
  WppSegmentedControl,
  WppSegmentedControlItem,
} from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'

export const OneItemSegmentedControl = () => (
  <div>
    <div className="control-bars">
      <div>
        <h2>Segmented Control Bar - M Size</h2>
        <h3>Text Variant</h3>
        <div className={styles.container}>
          <div className={styles.margin}>
            <p>Single Item</p>
            <WppSegmentedControl value="1">
              <WppSegmentedControlItem variant="text" value="1">
                Item 1
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <p>Segmented Control with auto width</p>
            <WppSegmentedControl value="1">
              <WppSegmentedControlItem variant="text" value="1">
                Item 1
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="2">
                Item 2
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="3" disabled={true}>
                Item 3
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="4" counter={3}>
                Item 4
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="5" counter={3} disabled>
                Item 5
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>
        </div>

        <h3>Icon Variant</h3>
        <div className={styles.container}>
          <div className={styles.margin}>
            <p>Single item</p>
            <WppSegmentedControl value="1" variant="icon">
              <WppSegmentedControlItem variant="icon" value="1">
                <WppIconGrid />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <p>Segmented Control with auto width</p>
            <WppSegmentedControl value="1" variant="icon">
              <WppSegmentedControlItem variant="icon" value="1">
                <WppIconGrid />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="2">
                <WppIconDataViewList />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="3" disabled>
                <WppIconDataViewCards />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="4" counter={3}>
                <WppIconDataViewList />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="5" counter={3} disabled>
                <WppIconDataViewList />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>
        </div>
      </div>

      <div className={styles.small}>
        <h2>Segmented Control Bar - S Size</h2>
        <h3>Text Variant</h3>
        <div className={styles.container}>
          <div className={styles.margin}>
            <p>Single item</p>
            <WppSegmentedControl value="1" size="s">
              <WppSegmentedControlItem variant="text" value="1">
                Item 1
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <p>Segmented Control with auto width</p>
            <WppSegmentedControl value="1" size="s">
              <WppSegmentedControlItem variant="text" value="1">
                Item 1
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="2">
                Item 2
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="3" disabled={true}>
                Item 3
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="4" counter={3}>
                Item 4
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="text" value="5" counter={3} disabled>
                Item 5
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>
        </div>

        <h3>Icon Variant</h3>
        <div className={styles.container}>
          <div className={styles.margin}>
            <p>Single item</p>
            <WppSegmentedControl value="1" size="s" variant="icon">
              <WppSegmentedControlItem variant="icon" value="1">
                <WppIconGrid />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <p>Segmented Control with auto width</p>
            <WppSegmentedControl value="1" size="s" variant="icon">
              <WppSegmentedControlItem variant="icon" value="1">
                <WppIconGrid />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="2">
                <WppIconDataViewList />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="3" disabled>
                <WppIconDataViewCards />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="4" counter={3}>
                <WppIconDataViewList />
              </WppSegmentedControlItem>
              <WppSegmentedControlItem variant="icon" value="5" counter={3} disabled>
                <WppIconDataViewList />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>
        </div>
      </div>
    </div>
  </div>
)
