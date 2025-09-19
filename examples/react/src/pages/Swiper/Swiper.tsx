import { register } from 'swiper/element/bundle'
import '@platform-ui-kit/components-library/dist/collection/swiper.css'

import styles from './Swiper.module.scss'
import GallerySwiper from './GallerySwiper'

register()

export const SwiperPage = () => (
  <>
    <div data-testid="regular-carousel">
      <h2>Regular</h2>
      <swiper-container navigation pagination-clickable={true}>
        <swiper-slide>
          <div className={styles.slide} style={{ backgroundColor: 'lightgray' }}>
            Slide 1
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className={styles.slide} style={{ backgroundColor: 'lightsalmon' }}>
            Slide 2
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className={styles.slide} style={{ backgroundColor: 'lightgreen' }}>
            Slide 3
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className={styles.slide} style={{ backgroundColor: 'lightpink' }}>
            Slide 4
          </div>
        </swiper-slide>
        <swiper-slide>
          <div className={styles.slide} style={{ backgroundColor: 'lightskyblue' }}>
            Slide 5
          </div>
        </swiper-slide>
      </swiper-container>
    </div>

    <div data-testid="gallery-carousel">
      <h2>Gallery</h2>
      <GallerySwiper />
    </div>

    <h2>Contrast to dark slides</h2>
    <swiper-container class={styles.contrast} navigation pagination-clickable={true}>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'black' }}>
          Slide 1
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'darkred' }}>
          Slide 2
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'darkgreen' }}>
          Slide 3
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'purple' }}>
          Slide 4
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className={styles.slide} style={{ backgroundColor: 'darkblue' }}>
          Slide 5
        </div>
      </swiper-slide>
    </swiper-container>

    <h2>Gallery</h2>
    <GallerySwiper isContrast={true} />
  </>
)
