```tsx
import React, { useState } from 'react';
import { WppLoadMore } from '@platform-ui-kit/components-library-react';

export const LoadMoreExample = () => {
  const [itemsLoaded, setItemsLoaded] = useState(30);
  const [loading, setLoading] = useState(false);
  const totalItems = 100;
  const incrementBy = 20;

  const handleLoadMore = (e: { detail: { newItemsLoaded: number; incrementBy: number } }) => {
    const { newItemsLoaded, incrementBy } = e.detail;
    setLoading(true);
    setTimeout(() => {
      setItemsLoaded(newItemsLoaded);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <WppLoadMore
        totalItems={totalItems}
        itemsLoaded={itemsLoaded}
        showProgressBar
        loading={loading}
        incrementBy={incrementBy}
        onWppClickLoadMore={handleLoadMore}
      />

      <WppLoadMore
        totalItems={totalItems}
        itemsLoaded={50}
      />
    </>
  );
};
```
