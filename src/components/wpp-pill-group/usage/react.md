```tsx
import React from 'react'
import { WppPill, WppPillGroup } from '@platform-ui-kit/components-library-react'
import { PillGroupChangeEvent } from '@platform-ui-kit/components-library'

export const PillGroupExample = () => {
  const handlePillGroupChange = (event: CustomEvent<PillGroupChangeEvent>) => {
    console.log('event.detail =>', event.detail)
  }

  const handlePillClose = () => {
    console.log('onWppClose')
  }

  const handlePillDragPress = (event: CustomEvent<MouseEvent>) => {
    console.log('event.detail =>', event.detail)
  }

  return (
    <>
      <WppPillGroup type="multiple" value={['item-a', 'item-c']} onWppChange={handlePillGroupChange}>
        <WppPill label="Item A" value="item-a" />
        <WppPill label="Item B" value="item-b" />
        <WppPill label="Item C" value="item-c" />
      </WppPillGroup>

      <WppPillGroup type="single" value="item-a" onWppChange={handlePillGroupChange}>
        <WppPill label="Item A" value="item-a" />
        <WppPill label="Item B" value="item-b" />
        <WppPill label="Item C" value="item-c" />
      </WppPillGroup>

      <WppPillGroup type="display" value="item-a" onWppChange={handlePillGroupChange}>
        <WppPill label="Item A" value="item-a" removable={true} onWppClose={handlePillClose} />
        <WppPill label="Item C" value="item-c" removable={false} />
      </WppPillGroup>

      <WppPillGroup type="draggable" value="item-a" onWppChange={handlePillGroupChange}>
        <WppPill label="Item A" value="item-a" removable={true} onWppClose={handlePillClose} />
        <WppPill label="Item B" value="item-b" removable={true} onWppDragPress={handlePillDragPress} />
      </WppPillGroup>
    </>
  )
}

```
