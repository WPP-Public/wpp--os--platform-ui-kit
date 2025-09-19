<script setup>
import { ref } from 'vue'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-vue'
import { SAMPLE_LIST_2 } from './consts'

const value = ref([])

const handleChange = event => {
  console.log('On Change single', event.detail)
  value.value = event.detail.value
}
</script>

<template>
  <div class="container">
    <div class="section">
      <WppTypography type="2xl-heading">Default Select</WppTypography>

      <div class="content">
        <WppSelect
          type="text"
          name="select-component"
          class="selectItem"
          data-testid="default-text-select-m"
          :list="SAMPLE_LIST_2"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
          autoFocus
          @wppChange="handleChange"
        />

        <WppSelect
          type="text"
          name="select-component"
          class="selectItem"
          data-testid="default-text-select-s"
          :list="SAMPLE_LIST_2"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          autoFocus
          size="s"
          @wppChange="handleChange"
        />
      </div>
    </div>

    <div class="section">
      <WppTypography type="2xl-heading">Disabled Select</WppTypography>

      <div class="content">
        <WppSelect
          type="text"
          name="select-component"
          class="selectItem"
          data-testid="disabled-text-select-m"
          disabled
          :list="SAMPLE_LIST_2"
          :label-config="{ text: 'Size M' }"
          placeholder="Choose option"
          :value="value"
        />

        <WppSelect
          type="text"
          name="select-component"
          class="selectItem"
          data-testid="disabled-text-select-s"
          disabled
          :list="SAMPLE_LIST_2"
          :label-config="{ text: 'Size S' }"
          placeholder="Choose option"
          :value="value"
          size="s"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 50px;
}

.item {
  margin-bottom: 20px;
}

.selectsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
  width: 900px;
  margin-top: 50px;
  padding: 10px;
  overflow: hidden;
  border: 1px solid black;
  border-radius: 20px;
}

.section {
  width: 900px;
  margin-bottom: 40px;
}

.content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.selectItem {
  width: 300px;
}

.scenarios {
  width: 900px;
}

.scenario {
  margin-top: 20px;
  margin-bottom: 60px;
}

.title {
  margin-bottom: 20px;
}

.subTitle {
  display: block;
  margin: 10px 0;
}

.truncationContainer {
  flex-direction: column;
}

.selectItem {
  margin-bottom: 20px;
}

.selectItem:last-child {
  margin-bottom: 0;
}

.selects {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.selects .selectItem {
  width: 300px;
}

.actions {
  margin-bottom: 20px;
}

.actions .buttonItem {
  margin-right: 20px;
  margin-bottom: 10px;
}
</style>
