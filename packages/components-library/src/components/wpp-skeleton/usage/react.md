```tsx
import { WppSkeleton } from '@platform-ui-kit/components-library-react'

export const SkeletonExample = () => (
  <>
    {/* Basic Rectangle Skeleton */}
    <WppSkeleton
      variant="rectangle"
      width="192px"
      height="80px"
    />

    {/* Custom Layout: Card Example */}
    <div style={{ width: '260px', padding: '20px' }}>
      <WppSkeleton width="60%" height="30px" style={{ marginBottom: '16px' }} />
      <WppSkeleton width="90%" height="16px" style={{ marginBottom: '8px' }} />
      <WppSkeleton width="80%" height="16px" style={{ marginBottom: '24px' }} />
      <div style={{ display: 'flex', gap: '40px' }}>
        <WppSkeleton width="70%" height="8px" />
        <WppSkeleton width="30%" height="8px" />
      </div>
    </div>

    {/* Custom Layout: Table Example */}
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '16px' }}>
        {Array(6).fill(null).map((_, index) => (
          <WppSkeleton key={index} width="100%" height="20px" />
        ))}
      </div>
      {Array(5).fill(null).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', marginBottom: '16px' }}
        >
          {Array(6).fill(null).map((_, colIndex) => (
            <WppSkeleton key={`${rowIndex}-${colIndex}`} width="100%" height="16px" />
          ))}
        </div>
      ))}
    </div>

    {/* Custom Layout: Mixed Layout */}
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '20px' }}>
      <WppSkeleton variant="circle" width="50px" height="50px" />
      <div style={{ flex: 1 }}>
        <WppSkeleton width="80%" height="20px" style={{ marginBottom: '8px' }} />
        <WppSkeleton width="60%" height="16px" />
      </div>
    </div>
  </>
)
```
