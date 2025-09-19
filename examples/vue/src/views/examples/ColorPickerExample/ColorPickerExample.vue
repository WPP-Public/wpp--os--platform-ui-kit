<script setup lang="ts">
import { ref } from 'vue'
import { WppColorPicker, WppTypography } from '@platform-ui-kit/components-library-vue'
import themeJson from '@platform-ui-kit/components-library/dist/collection/wpp-theme.json'
import type { Theme } from '@platform-ui-kit/components-library'

const SAVED_COLORS = ['#7AB6FF', '#45E4B6', '#ECC707', '#FF9E66', '#FF7A91']
const color = ref<string | undefined>(undefined)
const savedColors = ref<string[]>(SAVED_COLORS)
const theme: Theme = themeJson

const handleSaveColor = (event: CustomEvent<string>) => {
  console.log('Saving color:', event.detail)
  const newColor = event.detail
  savedColors.value = [...savedColors.value, newColor]
}

const handleRemoveSavedColor = (event: CustomEvent<string>) => {
  console.log('Removing color:', event.detail)
  const color: string = event.detail
  const newSavedColors = savedColors.value.filter(item => item !== color)

  savedColors.value = newSavedColors
}

const handleChangeColor = (event: CustomEvent) => {
  const emittedColor = event.detail
  console.log('Changing color:', emittedColor)

  if (emittedColor === color.value) return

  if (typeof emittedColor === 'string') {
    color.value = emittedColor
  } else {
    color.value = emittedColor.hexValue
  }
}
</script>

<template>
  <div className="colorPickers">
    <WppTypography className="sectionTitle" type="2xl-heading"> Default mode: "theme" </WppTypography>
    <div className="section">
      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> Hex </WppTypography>
        <WppColorPicker @wppChange="handleChangeColor" @wppSaveColor="handleSaveColor" type="hex" />
      </div>

      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> Hex and disabled </WppTypography>
        <WppColorPicker @wppChange="handleChangeColor" @wppSaveColor="handleSaveColor" disabled type="hex" />
      </div>

      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> Hex with Theme object passed </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          :themeColors="theme"
          type="hex"
        />
      </div>
    </div>

    <div className="section">
      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> RGBA </WppTypography>
        <WppColorPicker @wppChange="handleChangeColor" @wppSaveColor="handleSaveColor" type="rgba" />
      </div>

      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> RGBA and disabled </WppTypography>
        <WppColorPicker @wppChange="handleChangeColor" @wppSaveColor="handleSaveColor" disabled type="rgba" />
      </div>
    </div>

    <WppTypography className="sectionTitle" type="2xl-heading"> Mode: "custom" </WppTypography>

    <div className="section">
      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> Hex </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          @wppRemoveSavedColor="handleRemoveSavedColor"
          :savedColors="savedColors"
          mode="theme"
        />
      </div>

      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> RGBA </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          @wppRemoveSavedColor="handleRemoveSavedColor"
          :savedColors="savedColors"
          mode="theme"
          type="rgba"
        />
      </div>
    </div>

    <WppTypography className="sectionTitle" type="2xl-heading"> Mode: "theme and custom" </WppTypography>

    <div className="section">
      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> Hex </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          @wppRemoveSavedColor="handleRemoveSavedColor"
          :savedColors="savedColors"
          mode="theme and custom"
        />
      </div>

      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> RGBA </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          @wppRemoveSavedColor="handleRemoveSavedColor"
          :savedColors="savedColors"
          mode="theme and custom"
          type="rgba"
        />
      </div>
    </div>

    <WppTypography className="sectionTitle" type="2xl-heading"> With initial color: </WppTypography>

    <div className="section">
      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> Hex </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          @wppRemoveSavedColor="handleRemoveSavedColor"
          :savedColors="savedColors"
          mode="theme and custom"
          initialColor="#CC4B00"
        />
      </div>

      <div className="sectionItem">
        <WppTypography className="sectionItemTitle" type="2xl-heading"> RGBA </WppTypography>
        <WppColorPicker
          @wppChange="handleChangeColor"
          @wppSaveColor="handleSaveColor"
          @wppRemoveSavedColor="handleRemoveSavedColor"
          :savedColors="savedColors"
          mode="theme and custom"
          type="rgba"
          initialColor="rgba(204, 75, 0, 1)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.colorPickers {
  padding: 50px;
  height: 120vh;
}
.section {
  display: flex;
  margin-bottom: 40px;
}
.sectionTitle {
  margin-bottom: 10px;
  margin-top: 20px;
}

.sectionItemTitle {
  margin-bottom: 20px;
}

.sectionItem {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.sectionItem:last-child {
  margin-right: 0;
}
</style>
