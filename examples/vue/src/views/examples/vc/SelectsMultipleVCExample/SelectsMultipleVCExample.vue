<script setup lang="ts">
import { WppSelect, WppIconClock } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'
import { SAMPLE_LIST_MULTIPLE } from '../../SingleSelect/consts'

const value = ref([])

const handleChange = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value.value = event.detail.value
}
</script>

<template>
  <div class="multiple">
    <h2>Multiple Selects</h2>

    <div class="select" data-testid="multiple-selects">
      <WppSelect
        name="wpp-multiple-select"
        type="multiple"
        size="m"
        placeholder="Choose options"
        class="item"
        required
        :labelConfig="{ text: 'Regular Multiple Select with left Icon' }"
        :list="SAMPLE_LIST_MULTIPLE"
        :value="value"
        @wppChange="handleChange"
      >
        <WppIconClock slot="icon-start" />
      </WppSelect>
      <WppSelect
        name="wpp-multiple-select"
        type="multiple"
        size="m"
        placeholder="Choose options"
        class="item"
        required
        withFolder
        :labelConfig="{ text: 'Multiple Select with folder' }"
        data-testid="multiple-select-with-folder"
        :showSelectAllText="false"
        :list="SAMPLE_LIST_MULTIPLE"
        :value="value"
        @wppChange="handleChange"
      >
      </WppSelect>

      <div class="multipleContainer" data-testid="multiple-select-container">
        <WppSelect
          name="wpp-multiple-select"
          type="multiple"
          size="m"
          placeholder="Choose options"
          class="item"
          required
          withFolder
          withSearch
          data-testid="search-and-folder-multiple-select"
          :labelConfig="{ text: 'Multiple Select with search' }"
          :list="SAMPLE_LIST_MULTIPLE"
          :value="value"
          @wppChange="handleChange"
        >
        </WppSelect>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 30px;
}

.item p {
  margin: 0;
}

.select {
  margin-right: 15px;
  margin-bottom: 15px;
}

.multiple {
  height: 500px;
}

.multiple .select {
  display: grid;
  width: 100%;
  grid-column-gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  height: 550px;
}

.selectRange {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 550px;
  width: 100%;
}

.selectRange .item {
  min-width: 250px;
  padding: 8px;
}

.multipleContainer {
  height: 500px;
}

.flexRow {
  display: flex;
  flex-direction: row;
  min-height: 480px;
  margin-bottom: 16px;
}

.dependableItem {
  width: 500px;
  margin-right: 20px;
}
</style>
