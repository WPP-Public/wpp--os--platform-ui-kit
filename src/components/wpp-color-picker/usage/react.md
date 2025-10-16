```tsx
import React, { useState } from 'react'
import { WppColorPicker, WppTypography } from '@wppopen/components-library-react'
import { ChangeColorEventDetails, Theme } from '@wppopen/components-library/components'

const SAVED_COLORS = ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91']

const ColorPicker = () => {
  const [color, setColor] = useState<ChangeColorEventDetails>()
  const [savedColors, setSavedColors] = useState<string[]>(SAVED_COLORS)

  const handleSaveColor = (event: CustomEvent<string>) => {
    console.log('Saving color:', event.detail)
    const color: string = event.detail

    setSavedColors([...savedColors, color])
  }

  const handleRemoveSavedColor = (event: CustomEvent<string>) => {
    console.log('Removing color:', event.detail)
    const color: string = event.detail
    const newSavedColors = savedColors.filter(item => item !== color)

    setSavedColors(newSavedColors)
  }

  const handleChangeColor = (event: CustomEvent<ChangeColorEventDetails>) => {
    console.log('Changing color:', event.detail)
    const emittedColor: ChangeColorEventDetails = event.detail

    if (emittedColor === color) return

    if (typeof emittedColor === 'string') {
      setColor(emittedColor)
    } else {
      setColor(emittedColor.hexValue)
    }
  }

  return (
    <div>
      <WppTypography type="2xl-heading">Hex Color Picker</WppTypography>
      <WppColorPicker
        onWppChange={handleChangeColor}
        onWppSaveColor={handleSaveColor}
        onWppRemoveSavedColor={handleRemoveSavedColor}
        savedColors={savedColors}
        mode="theme and custom"
        type="hex"
      />
    </div>
  )
}
```
