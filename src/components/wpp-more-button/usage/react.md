```tsx
import { WppMoreButton } from '@wppopen/components-library-react'

export const WppMoreButtons = () => {
  const handleClick = () => {
    console.log('Clicked')
  }

  return (
    <div className={styles.moreBtnSection}>
      <WppMoreButton
        onClick={handleClick}
        ariaProps={{ label: 'More items menu' }}
        data-testid="default-more-btn-m"
        className={styles.moreBtnItem}
      ></WppMoreButton>
      <WppMoreButton
        onClick={handleClick}
        ariaProps={{ label: 'More items menu' }}
        data-testid="default-more-btn-s"
        className={styles.moreBtnItem}
        size="s"
      ></WppMoreButton>
    </div>
  )
}
```

```scss
.moreBtnSection {
  margin-bottom: 20px;

  .moreBtnItem {
    margin-right: 100px;

    &:last-child {
      margin-right: 0;
    }
  }
}
```
