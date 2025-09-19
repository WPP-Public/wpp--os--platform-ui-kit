import styles from './index.module.scss'
import SingleChildDependableSelects from './SingleChildDependableSelects'
import MultipleChildDependableSelects from './MultipleChildDependableSelects'
import { WppTypography } from '@platform-ui-kit/components-library-react'

const MultiSelectPage = () => (
  <div className={styles.pageContainer}>
    <WppTypography className={styles.pageTitle} type="xl-heading">
      Multi-Select Components Testing
    </WppTypography>

    <div className={styles.componentsContainer}>
      <SingleChildDependableSelects />
      <MultipleChildDependableSelects />
    </div>
  </div>
)

export default MultiSelectPage
