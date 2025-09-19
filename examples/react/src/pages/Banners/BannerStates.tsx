import { WppBanner, WppActionButton } from '@platform-ui-kit/components-library-react'

import styles from './BannerStates.module.scss'

export const BannerStates = () => (
  <div>
    <h2>Information Banners</h2>
    <p>Default Info Banner</p>
    <WppBanner type="information" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect your store
    </WppBanner>

    <p>Closable Info Banner</p>
    <WppBanner type="information" className={styles.banner} show closable>
      USPS has updated their rates. Make sure you know how these changes affect your store
    </WppBanner>

    <p>Info Banner with Action Button</p>
    <WppBanner type="information" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect store
      <div slot="actions">
        <WppActionButton variant="inverted">Close</WppActionButton>
      </div>
    </WppBanner>

    <p>Closable Info Banner with Action Button</p>
    <WppBanner type="information" className={styles.banner} show closable>
      USPS has updated their rates. Make sure you know how these changes affect your store. USPS has updated their
      rates. Make sure you know how these changes affect your store. Make sure you know how these changes affect your
      store. Make sure you know how these changes affect your store. Make sure you know how these changes affect your
      store
      <div slot="actions">
        <WppActionButton variant="inverted">Close</WppActionButton>
      </div>
    </WppBanner>

    <p>Closable Info Banner with Disabled Action Button</p>
    <WppBanner type="information" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect store
      <div slot="actions">
        <WppActionButton variant="inverted" disabled>
          Close
        </WppActionButton>
      </div>
    </WppBanner>

    <p>Closable Info Banner with Loading Action Button</p>
    <WppBanner type="information" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect store
      <div slot="actions">
        <WppActionButton variant="inverted" loading>
          Close
        </WppActionButton>
      </div>
    </WppBanner>

    <h2 className={styles.title}>Warning Banners</h2>
    <p>Default Warning Banner</p>
    <WppBanner type="warning" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect your store
    </WppBanner>

    <p>Closable Warning Banner</p>
    <WppBanner type="warning" className={styles.banner} show closable>
      USPS has updated their rates. Make sure you know how these changes affect your store
    </WppBanner>

    <p>Warning Banner with Action Button</p>
    <WppBanner type="warning" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect store
      <div slot="actions">
        <WppActionButton variant="inverted">Close</WppActionButton>
      </div>
    </WppBanner>

    <p>Closable Warning Banner with Action Button</p>
    <WppBanner type="warning" className={styles.banner} show closable>
      USPS has updated their rates. Make sure you know how these changes affect your store. USPS has updated their
      rates. Make sure you know how these changes affect your store
      <div slot="actions">
        <WppActionButton variant="inverted">Close</WppActionButton>
      </div>
    </WppBanner>

    <p>Closable Warning Banner with Disabled Action Button</p>
    <WppBanner type="warning" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect store
      <div slot="actions">
        <WppActionButton variant="inverted" disabled>
          Close
        </WppActionButton>
      </div>
    </WppBanner>

    <p>Closable Warning Banner with Loading Action Button</p>
    <WppBanner type="warning" className={styles.banner} show>
      USPS has updated their rates. Make sure you know how these changes affect store
      <div slot="actions">
        <WppActionButton variant="inverted" loading>
          Close
        </WppActionButton>
      </div>
    </WppBanner>
  </div>
)
