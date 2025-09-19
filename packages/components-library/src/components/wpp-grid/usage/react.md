```tsx
import { WppGrid } from '@platform-ui-kit/components-library-react'
​
export const GridExample = () => (
   <WppGrid container rowSpacing={4}>
      <WppGrid item all={16}>
        <WppGrid container makeFullWidth>
          <WppGrid item all={8}>
            <div>
              <h3>Scale</h3>
              <p>50,000</p>
              <h3 >Products on the platform</h3>
            </div>
          </WppGrid>
        </WppGrid>
      </WppGrid>
​
        <WppGrid item all={8}>
          <h3>Resources</h3>
          <p>Product summary</p>
        </WppGrid>
​
        <WppGrid item all={14}>
          <div>
            <h3>Benefits</h3>
            <p>Manage interactive experiences with ease: combining human experience and technology effectively can help consumers learn and engage with content in new ways. However, these unique experiences can be hard to monitor, expensive to update, and difficult to track. By centralising experience management, Interactive Experience Management can make the process </p>
          </div>
        </WppGrid>
    </WppGrid>
)
```
