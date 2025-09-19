import { useState, useEffect } from 'react'
import { WppTypography, WppCard, WppBackToTopButton } from '@platform-ui-kit/components-library-react'

import { cards } from '../Banners/config'
import './BackToTopButton.scss'
import { debounce } from '../../utils'

const Card = ({ title, src }: { title: string; src: string }) => (
  <WppCard className="card-item" key={title}>
    <img src={src} alt="" />
    <div className="content">
      <WppTypography type="xl-heading" className="title">
        {title}
      </WppTypography>
    </div>
  </WppCard>
)

export const BackToTopButton = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const debouncedScrollHandler = debounce(() => {
      setShowBackToTop(window.scrollY > 200)
    }, 50)

    window.addEventListener('scroll', debouncedScrollHandler)

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler)
    }
  }, [])

  const handleBackToTopClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="page">
      <div className="cards-list">
        {[...cards, ...cards].map(card => (
          <Card {...card} />
        ))}
      </div>
      {showBackToTop && <WppBackToTopButton onClick={handleBackToTopClick} data-testid="backToTopButton" />}
    </div>
  )
}
