import { WppProgressIndicator } from '@platform-ui-kit/components-library-react'
import styles from './ProgressIndicatorsVC.module.scss'

export const ProgressIndicatorsVCPage = () => (
  <div className="progress-indicators-container">
    <div className="progress-indicator-items">
      <h2 className={styles.title}>Linear Progress Indicators</h2>
      <h4>Default (value not provided, shows indeterminate)</h4>
      <WppProgressIndicator ariaProps={{ label: 'Default - indeterminate' }} className={styles.item} />

      <h4>Indicator with Progress (85%)</h4>
      <WppProgressIndicator ariaProps={{ label: 'With progess' }} className={styles.item} value={85} />

      <h4>Indicator with Progress and Percentage (45%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Progress and Percentage' }}
        className={styles.item}
        isShowPercentage
        value={45}
      />

      <h4>Indicator with Text (no value, still indeterminate)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'With text - indeterminate' }}
        className={styles.item}
        label="Loading..."
      />

      <h4>Indicator with Fixed Width (500px)</h4>
      <WppProgressIndicator ariaProps={{ label: 'Indicator with Fixed Width' }} className={styles.item} width={500} />

      <h4>Indicator with All Properties (800px, 15%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Indicator with All Properties' }}
        className={styles.item}
        isShowPercentage
        value={15}
        width={800}
        label="Progressing..."
      />

      <h4>Indicator with Progress and Percentage (1%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Indicator with Progress and Percentage' }}
        className={styles.item}
        isShowPercentage
        value={1}
      />

      <h4>Indicator with Progress and Percentage (100%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Indicator with Progress and Percentage' }}
        className={styles.item}
        isShowPercentage
        value={100}
        label="Completed"
      />

      <h4>**New Intermediate State (0% empty bar)**</h4>
      <WppProgressIndicator
        className={styles.item}
        isShowPercentage
        value={0}
        forceIntermediateEmptyState
        label="Just started (0%)"
        ariaProps={{ label: 'New Intermediate State' }}
      />
    </div>

    <div className="indicator-items">
      <h2 className={styles.title}>Circle Progress Indicators</h2>
      <h4>Default (value not provided, shows indeterminate)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
      />

      <h4>Indicator with Progress (85%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        value={85}
      />

      <h4>Indicator with Progress and Percentage (45%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        isShowPercentage
        value={45}
      />

      <h4>Indicator with Text (no value, indeterminate)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        label="Circular Load..."
      />

      <h4>Indicator with Fixed Width (150px)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        width={150}
      />

      <h4>Indicator with All Properties (300px and 15%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        isShowPercentage
        value={15}
        width={300}
        label="Circle Progress..."
      />

      <h4>Indicator with Progress and Percentage (1%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        isShowPercentage
        value={1}
      />

      <h4>Indicator with Progress and Percentage (100%)</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        variant="circle"
        isShowPercentage
        value={100}
        label="Circle Complete"
      />

      <h4>**New Intermediate State (0% empty bar)**</h4>
      <WppProgressIndicator
        ariaProps={{ label: 'Circle Progress Indicators' }}
        className={styles.item}
        isShowPercentage
        variant="circle"
        value={0}
        forceIntermediateEmptyState
        label="Just started (0%)"
      />
    </div>
  </div>
)
