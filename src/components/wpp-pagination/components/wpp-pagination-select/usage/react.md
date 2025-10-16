```tsx
import { WppPaginationSelect } from '@wppopen/components-library-react'
import { PageChangeEventDetail } from '@wppopen/components-library'

export const PaginationSelectExample = () => {
  const handleChange = (event: CustomEvent<PageChangeEventDetail>) => {
    console.log('value :>> ', event.detail.page);
  }

  return (
    <WppPaginationSelect
      count={10}
      activePageNumber={6}
      pageSelectThreshold={5}
      onWppChange={handleChange}
    />
  )
}
```
