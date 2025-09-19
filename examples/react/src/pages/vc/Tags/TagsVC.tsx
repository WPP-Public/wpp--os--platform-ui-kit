import { WppIconAsk, WppIconDrag, WppIconPlus, WppIconSearch, WppTag } from '@platform-ui-kit/components-library-react'
import styles from './TagsVC.module.scss'

export const TagsVCPage = () => (
  <div className="tags">
    <div>
      <h3>With Variants</h3>
      <WppTag className={styles.item} label="Neutral" variant="neutral" />

      <WppTag className={styles.item} label="Warning" variant="warning" />

      <WppTag className={styles.item} label="Positive" variant="positive" />

      <WppTag className={styles.item} label="Negative" variant="negative" />
    </div>

    <div>
      <h3>With Icons</h3>
      <WppTag className={styles.item} label="Neutral" variant="neutral" withIcon>
        <WppIconAsk slot="icon-start" />
      </WppTag>

      <WppTag className={styles.item} label="Warning" variant="warning" withIcon>
        <WppIconSearch slot="icon-start" />
      </WppTag>

      <WppTag className={styles.item} label="Positive" variant="positive" withIcon>
        <WppIconPlus slot="icon-start" />
      </WppTag>

      <WppTag className={styles.item} label="Negative" variant="negative" withIcon>
        <WppIconDrag slot="icon-start" />
      </WppTag>
    </div>

    <div>
      <h3>With categoricalColorIndex</h3>

      <WppTag className={styles.item} label="Color Index 1" variant="Cat-1" />
      <WppTag className={styles.item} label="Color Index 2" variant="Cat-2" />
      <WppTag className={styles.item} label="Color Index 3" variant="Cat-3" />
      <WppTag className={styles.item} label="Color Index 4" variant="Cat-4" />
      <WppTag className={styles.item} label="Color Index 5" variant="Cat-5" />
      <WppTag className={styles.item} label="Color Index 6" variant="Cat-6" />
      <WppTag className={styles.item} label="Color Index 7" variant="Cat-7" />
      <WppTag className={styles.item} label="Color Index 8" variant="Cat-8" />
      <WppTag className={styles.item} label="Color Index 9" variant="Cat-9" />
    </div>

    <div>
      <h3>With truncation</h3>
      <WppTag className={styles.item} label="Truncation" variant="warning" maxLabelLength={5} />
    </div>
  </div>
)
