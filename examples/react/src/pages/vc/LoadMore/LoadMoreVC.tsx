import { useState } from 'react'
import { WppLoadMore } from '@platform-ui-kit/components-library-react'
import styles from './LoadMoreVC.module.scss'

export const LoadMoreVCPage = () => {
  const [itemsLoaded, setItemsLoaded] = useState(30)
  const [loading, setLoading] = useState(false)
  const totalItems = 100
  const incrementBy = 20

  const handleLoadMore = (e: { detail: { newItemsLoaded: number; incrementBy: number } }) => {
    setLoading(true)
    setTimeout(() => {
      setItemsLoaded(e.detail.newItemsLoaded)
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <h1>Load More</h1>
      <div className={styles.container}>
        <div className={styles.loadMore}>
          <h3>with progress bar</h3>
          <WppLoadMore
            totalItems={totalItems}
            itemsLoaded={itemsLoaded}
            showProgressBar
            loading={loading}
            incrementBy={incrementBy}
            onWppClickLoadMore={handleLoadMore}
          />
        </div>

        <div className={styles.loadMore}>
          <h3>without progress bar</h3>
          <WppLoadMore totalItems={totalItems} itemsLoaded={50} />
        </div>

        <div className={styles.loadMore}>
          <h3>Disabled</h3>
          <WppLoadMore totalItems={totalItems} showProgressBar disabled itemsLoaded={50} />
        </div>
      </div>
    </>
  )
}
