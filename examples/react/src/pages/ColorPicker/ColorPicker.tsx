import React, { useState } from 'react'
import styles from './ColorPicker.module.scss'
import { WppColorPicker, WppTypography } from '@platform-ui-kit/components-library-react'
import themeJson from '@platform-ui-kit/components-library/dist/collection/wpp-theme.json'
import { ChangeColorEventDetails, Theme } from '@platform-ui-kit/components-library/components'

const theme = themeJson as Theme

const SAVED_COLORS = ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91']

const ColorPicker = () => {
  console.log('Theme', theme)
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
    <div className={styles.colorPickers}>
      <WppTypography class={styles.sectionTitle} type="2xl-heading">
        Default mode: "theme"
      </WppTypography>
      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            Hex
          </WppTypography>
          <WppColorPicker onWppChange={handleChangeColor} onWppSaveColor={handleSaveColor} type="hex" />
        </div>

        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            Hex and disabled
          </WppTypography>
          <WppColorPicker onWppChange={handleChangeColor} onWppSaveColor={handleSaveColor} disabled type="hex" />
        </div>
        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            Hex with Theme object passed
          </WppTypography>
          <WppColorPicker
            themeColors={theme}
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            type="hex"
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            RGBA
          </WppTypography>
          <WppColorPicker onWppChange={handleChangeColor} onWppSaveColor={handleSaveColor} type="rgba" />
        </div>

        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            RGBA and disabled
          </WppTypography>
          <WppColorPicker onWppChange={handleChangeColor} onWppSaveColor={handleSaveColor} disabled type="rgba" />
        </div>
      </div>

      <WppTypography class={styles.sectionTitle} type="2xl-heading">
        Mode: "custom"
      </WppTypography>

      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            Hex
          </WppTypography>
          <WppColorPicker
            savedColors={savedColors}
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            onWppRemoveSavedColor={handleRemoveSavedColor}
            mode="custom"
          />
        </div>

        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            RGBA
          </WppTypography>
          <WppColorPicker
            savedColors={savedColors}
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            onWppRemoveSavedColor={handleRemoveSavedColor}
            mode="custom"
            type="rgba"
          />
        </div>
      </div>

      <WppTypography class={styles.sectionTitle} type="2xl-heading">
        Mode: "theme and custom"
      </WppTypography>

      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            Hex
          </WppTypography>
          <WppColorPicker
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            onWppRemoveSavedColor={handleRemoveSavedColor}
            savedColors={savedColors}
            mode="theme and custom"
          />
        </div>

        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            RGBA
          </WppTypography>
          <WppColorPicker
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            onWppRemoveSavedColor={handleRemoveSavedColor}
            savedColors={savedColors}
            mode="theme and custom"
            type="rgba"
          />
        </div>
      </div>

      <WppTypography class={styles.sectionTitle} type="2xl-heading">
        With initial color:
      </WppTypography>

      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            Hex
          </WppTypography>
          <WppColorPicker
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            onWppRemoveSavedColor={handleRemoveSavedColor}
            savedColors={savedColors}
            mode="theme and custom"
            initialColor="#CC4B00"
          />
        </div>

        <div className={styles.sectionItem}>
          <WppTypography class={styles.sectionItemTitle} type="2xl-heading">
            RGBA
          </WppTypography>
          <WppColorPicker
            onWppChange={handleChangeColor}
            onWppSaveColor={handleSaveColor}
            onWppRemoveSavedColor={handleRemoveSavedColor}
            savedColors={savedColors}
            mode="theme and custom"
            type="rgba"
            initialColor="rgba(204, 75, 0, 1)"
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
