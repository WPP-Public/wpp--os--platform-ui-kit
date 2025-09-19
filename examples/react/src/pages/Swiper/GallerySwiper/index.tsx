import styles from '../Swiper.module.scss'

const GallerySwiper = ({ isContrast }: { isContrast?: boolean }) => (
  <swiper-container
    slides-per-view={1.8}
    space-between={0}
    centered-slides={true}
    coverflow-effect-depth={800}
    coverflow-effect-rotate={0}
    coverflow-effect-slide-shadows={false}
    effect="coverflow"
    navigation
    pagination-clickable={true}
    class={`${styles.gallerySwiper} ${isContrast ? styles.contrast : ''}`}
  >
    <div slot="slide-0" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-1" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-2" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-3" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-4" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-5" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-6" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-7" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-8" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
    <div slot="slide-9" className={styles.slideContent}>
      <div className={styles.slide} style={{ backgroundColor: isContrast ? '#8508E8' : '#E7EAEE' }}></div>
    </div>
  </swiper-container>
)

export default GallerySwiper
