import { WppSkeleton } from '@platform-ui-kit/components-library-react'
import styles from './SkeletonVC.module.scss'

export const SkeletonVCPage = () => (
  <div className={styles.container}>
    <h2>Skeleton Examples</h2>

    {/* Card Skeleton Example */}
    <section>
      <h3>Card Skeleton</h3>
      <div data-testid="card-skeleton-with-animation" className={styles.cardSkeleton}>
        <WppSkeleton width="60%" height="30px" style={{ marginBottom: '16px' }} />
        <WppSkeleton width="90%" height="16px" style={{ marginBottom: '8px' }} />
        <WppSkeleton width="80%" height="16px" style={{ marginBottom: '24px' }} />
        <div className={styles.skeletonRow}>
          <WppSkeleton width="70%" height="8px" />
          <WppSkeleton width="30%" height="8px" />
        </div>
      </div>
    </section>

    {/* Card Skeleton Example - Animation Off */}
    <section>
      <h3>Card Skeleton - Animation Off</h3>
      <div data-testid="card-skeleton-no-animation" className={styles.cardSkeleton}>
        <WppSkeleton animation={false} width="60%" height="30px" style={{ marginBottom: '16px' }} />
        <WppSkeleton animation={false} width="90%" height="16px" style={{ marginBottom: '8px' }} />
        <WppSkeleton animation={false} width="80%" height="16px" style={{ marginBottom: '24px' }} />
        <div className={styles.skeletonRow}>
          <WppSkeleton animation={false} width="70%" height="8px" />
          <WppSkeleton animation={false} width="30%" height="8px" />
        </div>
      </div>
    </section>

    {/* Table Skeleton Example */}
    <section>
      <h3>Table Skeleton</h3>
      <div data-testid="table-skeleton" className={styles.tableSkeleton}>
        <div className={styles.row}>
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <WppSkeleton key={index} width="100%" height="20px" />
            ))}
        </div>
        {Array(5)
          .fill(null)
          .map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {Array(5)
                .fill(null)
                .map((_, colIndex) => (
                  <WppSkeleton key={`${rowIndex}-${colIndex}`} width="100%" height="16px" />
                ))}
            </div>
          ))}
      </div>
    </section>

    {/* Custom Layout Example */}
    <section>
      <h3>Custom Layout</h3>
      <div data-testid="custom-layout-skeleton" className={styles.customLayout}>
        <WppSkeleton variant="circle" width="50px" height="50px" />
        <div className={styles.customLayoutText}>
          <WppSkeleton width="80%" height="20px" style={{ marginBottom: '8px' }} />
          <WppSkeleton width="60%" height="16px" />
        </div>
      </div>
    </section>
  </div>
)
