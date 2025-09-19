import {
  WppIconGrid,
  WppIconDataViewCards,
  WppIconDataViewList,
  WppSegmentedControl,
  WppSegmentedControlItem,
} from '@platform-ui-kit/components-library-react'
import styles from './SegmentedControlsVC.module.scss'

export const SegmentedControlsVCPage = () => (
  <div>
    <div className="control-bars">
      <div>
        <h2>Segmented Control Bar - M Size</h2>
        <h3>Text Variant</h3>
        <div className={styles.container}>
          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width',
              }}
              required
              value="1"
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width - selected disabled item',
              }}
              required
              value="5"
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff',
              }}
              required
              value="4"
              width="600px"
              hugContentOff
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff - selected disabled item',
              }}
              required
              value="5"
              width="600px"
              hugContentOff
            >
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
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width',
              }}
              required
              value="1"
              variant="icon"
            >
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
              <WppSegmentedControlItem variant="icon" value="5">
                <WppIconDataViewList />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width - selected disabled item',
              }}
              required
              value="3"
              variant="icon"
            >
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
              <WppSegmentedControlItem variant="icon" value="5">
                <WppIconDataViewList />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff',
              }}
              required
              value="4"
              width="500px"
              hugContentOff
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff - selected disabled item',
              }}
              required
              value="5"
              width="500px"
              hugContentOff
            >
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
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width',
              }}
              required
              value="1"
              size="s"
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width - selected disabled item',
              }}
              required
              value="5"
              size="s"
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff',
              }}
              required
              value="4"
              size="s"
              width="600px"
              hugContentOff
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff - selected disabled item',
              }}
              required
              value="5"
              size="s"
              width="600px"
              hugContentOff
            >
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
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width',
              }}
              required
              value="1"
              size="s"
              variant="icon"
            >
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
              <WppSegmentedControlItem variant="icon" value="5">
                <WppIconDataViewList />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with auto width - selected disabled item',
              }}
              required
              value="3"
              size="s"
              variant="icon"
            >
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
              <WppSegmentedControlItem variant="icon" value="5">
                <WppIconDataViewList />
              </WppSegmentedControlItem>
            </WppSegmentedControl>
          </div>

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff',
              }}
              required
              variant="icon"
              value="4"
              size="s"
              width="500px"
              hugContentOff
            >
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

          <div className={styles.margin}>
            <WppSegmentedControl
              labelConfig={{
                text: 'Segmented Control with fixed width and hugContentOff - selected disabled item',
              }}
              required
              variant="icon"
              value="5"
              size="s"
              width="500px"
              hugContentOff
            >
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
