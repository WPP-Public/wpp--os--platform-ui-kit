import { Fragment } from 'react'

import { WppGrid, WppActionButton, WppInput } from '@platform-ui-kit/components-library-react'

import img from './assets/google_img.jpeg'
import styles from './GridsVC.module.scss'

const ids = [1, 2, 3]

export const GridsVCPage = () => (
  <div className="grids">
    <h2 className={styles.mainTitle}>Grid examples</h2>

    <div className={styles.list}>
      <WppGrid container rowSpacing={2}>
        <WppGrid item all={16}>
          <WppGrid container fullWidth>
            {ids.map(id => (
              <Fragment key={id}>
                <WppGrid item all={8}>
                  <div className={styles.item}>
                    <h3 className={styles.cardTitle}>Scale</h3>
                    <p className={styles.number}>50,000</p>
                    <h3 className={styles.subtitle}>Products on the platform</h3>
                  </div>
                </WppGrid>
              </Fragment>
            ))}
          </WppGrid>
        </WppGrid>

        <WppGrid item all={8}>
          <h3 className={styles.title}>Resources</h3>
          <p>Product summary</p>
        </WppGrid>

        <WppGrid item all={14}>
          <div>
            <h3 className={styles.title}>Benefits</h3>
            <p>
              Manage interactive experiences with ease: combining human experience and technology effectively can help
              consumers learn and engage with content in new ways. However, these unique experiences can be hard to
              monitor, expensive to update, and difficult to track. By centralising experience management, Interactive
              Experience Management can make the process{' '}
            </p>
          </div>
        </WppGrid>
      </WppGrid>
    </div>

    <div className={styles.list}>
      <WppGrid container justifyContent="center" rowSpacing={2}>
        {ids.map(id => (
          <Fragment key={id}>
            <WppGrid item>
              <div className={styles.card}>
                <div className={styles.image}>
                  <img src="https://mui.com/static/images/grid/complex.jpg" alt="image" />
                </div>
                <div className={styles.body}>
                  <div className={styles.description}>
                    <div>
                      <p>Standard license</p>
                      <p>Full resolution 1920x1080</p>
                      <p>ID: {id}</p>
                    </div>
                    <div className={styles.price}>
                      <p>$19.00</p>
                    </div>
                  </div>
                  <div className={styles.remove}>
                    <WppActionButton variant="secondary">Remove</WppActionButton>
                  </div>
                </div>
              </div>
            </WppGrid>
          </Fragment>
        ))}
      </WppGrid>
    </div>

    <br />

    <div className={styles.container}>
      <h3 className={styles.gridTitle}>Current realisation with percent width</h3>
      <div className={styles.gridWrapper}>
        <WppGrid container fullWidth>
          <WppGrid item all={6}>
            <WppInput placeholder="Placeholder" />
          </WppGrid>
          <WppGrid item all={6}>
            <WppInput placeholder="Placeholder" />
          </WppGrid>
          <WppGrid item all={6}>
            <WppInput placeholder="Placeholder" />
          </WppGrid>
        </WppGrid>
        <br />
        <WppGrid container fullWidth>
          <WppGrid item all={6}>
            <WppInput placeholder="Placeholder" />
          </WppGrid>
          <WppGrid item all={6}>
            <WppInput placeholder="Placeholder" />
          </WppGrid>
        </WppGrid>
      </div>
    </div>

    <br />
    <br />

    <WppGrid container className={styles.grid}>
      <WppGrid item all={6} alignItems="flex-end">
        <WppGrid container fluid>
          <WppGrid item all={24}>
            <div className={styles.content}>
              <h3>Scale</h3>
              <p>50,000</p>
              <h3>Products on the platform</h3>
              <h3>Scale</h3>
              <p>50,000</p>
            </div>
          </WppGrid>
          <WppGrid item all={24}>
            <div className={styles.content}>
              <h3>Scale</h3>
              <p>50,000</p>
              <h3>Products on the platform</h3>
              <h3>Scale</h3>
              <p>50,000</p>
            </div>
          </WppGrid>
        </WppGrid>
      </WppGrid>

      <WppGrid item all={6}>
        <div className={styles.content}>
          <h3>Resources</h3>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
          <p>Product summary</p>
        </div>
      </WppGrid>

      <WppGrid item all={12}>
        <WppGrid container fullWidth direction="column">
          <WppGrid item all={24}>
            <WppGrid container fullWidth>
              <WppGrid item all={16}>
                <div className={`${styles.content} ${styles.hidePadding}`}>
                  <img src={img} className={styles.img} />
                </div>
              </WppGrid>
              <WppGrid item all={8}>
                <WppGrid container fullWidth>
                  <WppGrid item all={24}>
                    <div className={`${styles.content} ${styles.fixed}`}>
                      <img src={img} className={styles.img} />
                    </div>
                  </WppGrid>
                  <WppGrid item all={24}>
                    <div className={`${styles.content} ${styles.fixed}`}>
                      <img src={img} className={styles.img} />
                    </div>
                  </WppGrid>
                </WppGrid>
              </WppGrid>
            </WppGrid>
          </WppGrid>
          <WppGrid item all={24}>
            <WppGrid container fullWidth>
              <WppGrid item all={8}>
                <div className={`${styles.content} ${styles.small}`}>
                  <img src={img} className={styles.img} />
                </div>
              </WppGrid>
              <WppGrid item all={16}>
                <div className={`${styles.content} ${styles.small}`}>
                  <img src={img} className={styles.img} />
                </div>
              </WppGrid>
            </WppGrid>
          </WppGrid>
        </WppGrid>
      </WppGrid>
    </WppGrid>
  </div>
)
