import styles from './index.module.scss'
import SingleChildDependableSelects from './SingleChildDependableSelects'
import MultipleChildDependableSelects from './MultipleChildDependableSelects'

const DependableMultipleSelects = ({ type }: { type: 'multiple' | 'single' }) => (
  <div className={styles.pageContainer}>
    {/* <WppTypography className={styles.pageTitle} type="xl-heading">
      Multi-Select Components Testing
    </WppTypography> */}

    <div className={styles.componentsContainer}>
      {type === 'multiple' ? <MultipleChildDependableSelects /> : <SingleChildDependableSelects />}
    </div>
  </div>
)

export default DependableMultipleSelects
