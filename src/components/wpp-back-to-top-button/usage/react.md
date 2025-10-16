```tsx
import { useState, useEffect } from 'react'
import { WppBackToTopButton } from '@wppopen/components-library-react'
import { debounce } from 'utils'

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
      {showBackToTop && <WppBackToTopButton onClick={handleBackToTopClick} />}
    </div>
  )
}
```
